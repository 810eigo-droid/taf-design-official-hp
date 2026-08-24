(function () {
  'use strict';

  // 読み込みに失敗した画像は非表示にする
  document.querySelectorAll('img').forEach(function (img) {
    img.addEventListener('error', function () { img.style.display = 'none'; });
    if (img.complete && img.naturalWidth === 0) { img.style.display = 'none'; }
  });

  var prefersReduced = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // FV上部の小見出しを一文字ずつ波打って出現させる
  var cat = document.querySelector('.fv-cat');
  if (cat && !prefersReduced) {
    var text = cat.textContent;
    cat.textContent = '';
    var frag = document.createDocumentFragment();
    for (var i = 0; i < text.length; i++) {
      var span = document.createElement('span');
      span.className = 'wave-char';
      span.textContent = text.charAt(i) === ' ' ? ' ' : text.charAt(i);
      span.style.animationDelay = (i * 0.045).toFixed(3) + 's';
      frag.appendChild(span);
    }
    cat.appendChild(frag);
  }

  var supportsIO = 'IntersectionObserver' in window;

  // スクロール連動フェードイン
  var fadeTargets = document.querySelectorAll('.fade-in');
  if (supportsIO && fadeTargets.length) {
    var fadeObserver = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          fadeObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    fadeTargets.forEach(function (el) { fadeObserver.observe(el); });
  } else {
    fadeTargets.forEach(function (el) { el.classList.add('is-visible'); });
  }

  // FVが画面外に出たら追従CTAバーを表示
  var sticky = document.getElementById('stickybar');
  var fv = document.getElementById('fv');
  if (sticky) {
    if (supportsIO && fv) {
      new IntersectionObserver(function (entries) {
        sticky.classList.toggle('is-visible', !entries[0].isIntersecting);
      }, { threshold: 0.1 }).observe(fv);
    } else {
      sticky.classList.add('is-visible');
    }
  }
})();
