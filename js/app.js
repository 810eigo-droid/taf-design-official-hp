/* ===== Custom cursor ===== */
(function(){
  if (matchMedia('(max-width:900px)').matches) return;
  const dot = document.createElement('div');
  dot.className = 'cursor-dot';
  const ring = document.createElement('div');
  ring.className = 'cursor-ring';
  document.body.appendChild(dot); document.body.appendChild(ring);
  let mx=window.innerWidth/2, my=window.innerHeight/2;
  let rx=mx, ry=my;
  document.addEventListener('mousemove', e=>{ mx=e.clientX; my=e.clientY; dot.style.transform=`translate(${mx}px,${my}px) translate(-50%,-50%)`; });
  function loop(){ rx += (mx-rx)*0.18; ry += (my-ry)*0.18; ring.style.transform=`translate(${rx}px,${ry}px) translate(-50%,-50%)`; requestAnimationFrame(loop); }
  loop();
  // hover detection
  function bindHover(){
    const hover = 'a, button, .blob-btn, .work-list .row, .faq-item, .voice-card, .plan, .ticket, .hscroll-card, [data-cursor]';
    document.querySelectorAll(hover).forEach(el=>{
      el.addEventListener('mouseenter',()=>{ ring.classList.add('is-hover'); });
      el.addEventListener('mouseleave',()=>{ ring.classList.remove('is-hover'); ring.classList.remove('is-view'); });
    });
    document.querySelectorAll('[data-cursor="view"], .hscroll-card .ph, .voice-card, .work-list .row, .about .left .ph').forEach(el=>{
      el.addEventListener('mouseenter',()=>{ ring.classList.add('is-view'); });
      el.addEventListener('mouseleave',()=>{ ring.classList.remove('is-view'); });
    });
  }
  bindHover();
  window._bindCursorHover = bindHover;
  document.addEventListener('mouseleave', ()=> document.body.classList.add('cursor-hide'));
  document.addEventListener('mouseenter', ()=> document.body.classList.remove('cursor-hide'));
})();

/* ===== Magnetic dots in FV ===== */
(function(){
  const host = document.querySelector('.fv-dots');
  if (!host) return;
  const cols = 28, rows = 18;
  const dots = [];
  for (let r=0;r<rows;r++){
    for (let c=0;c<cols;c++){
      const el = document.createElement('span');
      el.className='mdot';
      el.style.cssText = `position:absolute;width:2px;height:2px;background:rgba(26,42,58,.35);border-radius:50%;`;
      host.appendChild(el);
      dots.push({el, c, r, x:0, y:0, tx:0, ty:0});
    }
  }
  function place(){
    const w = host.clientWidth, h = host.clientHeight;
    const stepX = w/(cols+1), stepY = h/(rows+1);
    dots.forEach(d=>{
      d.bx = stepX*(d.c+1);
      d.by = stepY*(d.r+1);
      d.el.style.left = d.bx+'px';
      d.el.style.top = d.by+'px';
    });
  }
  place();
  window.addEventListener('resize', place);
  let mx=-9999,my=-9999;
  host.addEventListener('mousemove', e=>{
    const r = host.getBoundingClientRect();
    mx = e.clientX - r.left; my = e.clientY - r.top;
  });
  host.parentElement.addEventListener('mouseleave', ()=>{ mx=-9999; my=-9999 });
  function tick(){
    dots.forEach(d=>{
      const dx = mx - d.bx, dy = my - d.by;
      const dist2 = dx*dx + dy*dy;
      const R = 140;
      if (dist2 < R*R){
        const f = (1 - Math.sqrt(dist2)/R) * 0.6;
        d.tx = dx * f;
        d.ty = dy * f;
      } else {
        d.tx *= 0.85; d.ty *= 0.85;
      }
      d.x += (d.tx - d.x)*0.18;
      d.y += (d.ty - d.y)*0.18;
      d.el.style.transform = `translate(${d.x}px,${d.y}px)`;
      // boost size near cursor
      const close = dist2 < 60*60;
      d.el.style.background = close ? 'rgba(197,160,89,.9)' : 'rgba(26,42,58,.32)';
    });
    requestAnimationFrame(tick);
  }
  tick();
})();

/* ===== Polygon carousel (FV right) ===== */
(function(){
  const slides = document.querySelectorAll('.poly-slide');
  const dots = document.querySelectorAll('.poly-dots b');
  const cap = document.querySelector('.poly-caption');
  if (!slides.length) return;
  const data = [
    {cat:"BRANDING / 2025", ttl:"和菓子店「松籟堂」のリブランディングと公式EC"},
    {cat:"WEB / 2024",     ttl:"中小製造業の自社サイトリニューアル + 採用LP"},
    {cat:"LP / 2025",      ttl:"医療法人向けキャンペーンランディングページ"},
  ];
  let i = 0;
  function tick(){
    slides.forEach((s,idx)=> s.classList.toggle('active', idx===i));
    dots.forEach((d,idx)=> d.classList.toggle('on', idx===i));
    if (cap){
      cap.querySelector('.cat').textContent = data[i].cat;
      cap.querySelector('.ttl').textContent = data[i].ttl;
      cap.querySelector('.idx').textContent = String(i+1).padStart(2,'0');
    }
    i = (i+1)%slides.length;
  }
  tick();
  setInterval(tick, 4000);
})();

/* ===== Scroll progress ===== */
(function(){
  const fill = document.querySelector('.scroll-rail .fill');
  const pct  = document.querySelector('.scroll-rail .pct');
  const almost = document.querySelector('.almost');
  if (!fill || !pct) return;
  function upd(){
    const h = document.documentElement.scrollHeight - window.innerHeight;
    const p = h>0 ? (window.scrollY/h) : 0;
    fill.style.height = s(p*100).toFixed(2)+'%';
    pct.textContent = String(Math.round(p*100)).padStart(2,'0');
    if (almost) almost.classList.toggle('show', p>0.8 && p<0.98);
  }
  upd(); window.addEventListener('scroll', upd, {passive:true});
})();

/* ===== Loader (T&F line draw) ===== */
(function(){
  const loader = document.querySelector('.loader');
  const fire = () => {
    document.body.classList.add('is-loaded');
    document.dispatchEvent(new CustomEvent('fv:reveal-start'));
  };
  if (!loader){ fire(); return; }
  setTimeout(()=> {
    loader.classList.add('done');
    fire();
  }, 1900);
})();

/* ===== Glitch countup (and intersection-trigger animations) ===== */
(function(){
  const els = document.querySelectorAll('[data-count]');
  function animate(el){
    if (el.dataset.done) return;
    el.dataset.done = '1';
    const target = parseInt(el.dataset.count, 10);
    const duration = 900;
    const start = performance.now();
    el.classList.add('glitching');
    function frame(t){
      const k = Math.min(1, (t-start)/duration);
      const e = 1 - Math.pow(1-k, 3);
      const v = Math.floor(target * e);
      el.textContent = v.toLocaleString();
      if (k<1) requestAnimationFrame(frame); else { el.textContent = target.toLocaleString(); el.classList.remove('glitching'); }
    }
    requestAnimationFrame(frame);
  }
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if (e.isIntersecting) animate(e.target); });
  }, {threshold:0.5});
  els.forEach(el=> io.observe(el));

  // .in-view trigger for various sections
  const io2 = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if (e.isIntersecting) e.target.classList.add('in-view'); });
  }, {threshold:0.25});
  document.querySelectorAll('[data-reveal]').forEach(el=> io2.observe(el));
})();

/* ===== Wave text — split into chars on hover ===== */
(function(){
  document.querySelectorAll('.wave').forEach(el=>{
    if (el.dataset.done) return;
    el.dataset.done='1';
    const txt = el.textContent;
    el.textContent='';
    [...txt].forEach((c,i)=>{
      const s = document.createElement('span');
      s.className='ch';
      s.style.animationDelay = (i*0.04)+'s';
      s.textContent = c === ' ' ? '\u00a0' : c;
      el.appendChild(s);
    });
  });
})();

/* ===== Closing — drop-in characters ===== */
(function(){
  const h = document.querySelector('.closing h2');
  if (!h) return;
  const txt = h.textContent.trim();
  h.textContent='';
  [...txt].forEach((c,i)=>{
    const s = document.createElement('span');
    s.className='ch';
    s.style.animationDelay = (0.3 + i*0.07)+'s';
    s.textContent = c;
    h.appendChild(s);
  });
})();

/* ===== Highlight intersection ===== */
(function(){
  const io = new IntersectionObserver(entries=>{
    entries.forEach(e=>{ if (e.isIntersecting) e.target.classList.add('lit'); });
  }, {threshold:.6});
  document.querySelectorAll('.hl').forEach(el=> io.observe(el));
})();

/* ===== FAQ typewriter ===== */
(function(){
  document.querySelectorAll('.faq-item').forEach(item=>{
    const ans = item.querySelector('.answer .typ');
    if (!ans) return;
    const original = ans.textContent;
    ans.dataset.full = original;
    ans.textContent = '';
    item.addEventListener('toggle', ()=>{
      if (item.open){
        ans.textContent='';
        const full = ans.dataset.full;
        let i = 0;
        const speed = 14;
        function step(){
          if (!item.open) return;
          ans.textContent = full.slice(0,i++);
          if (i<=full.length) setTimeout(step, speed);
        }
        step();
      } else {
        ans.textContent = '';
      }
    });
  });
})();

/* ===== Subtle parallax horizontal drift ===== */
(function(){
  const els = document.querySelectorAll('[data-parax]');
  function upd(){
    const sy = window.scrollY;
    els.forEach(el=>{
      const k = parseFloat(el.dataset.parax);
      el.style.transform = `translateX(${(sy*k).toFixed(1)}px)`;
    });
  }
  upd(); window.addEventListener('scroll', upd, {passive:true});
})();

/* ===== Easter egg: free-consult button emoji flicker ===== */
(function(){
  document.querySelectorAll('[data-egg]').forEach(el=>{
    const original = el.innerHTML;
    const egg = el.dataset.egg;
    let t;
    el.addEventListener('mouseenter', ()=>{
      el.innerHTML = egg;
      clearTimeout(t);
      t = setTimeout(()=> el.innerHTML = original, 400);
    });
  });
})();

/* ===== Rebind cursor hover after dynamic changes ===== */
window.addEventListener('load', ()=>{ if (window._bindCursorHover) window._bindCursorHover(); });

/* ===== Topnav: 60px → 52px shrink on scroll ===== */
(function(){
  const nav = document.querySelector('[data-topnav]');
  if (!nav) return;
  let ticking = false;
  function upd(){
    nav.classList.toggle('is-scrolled', window.scrollY > 8);
    ticking = false;
  }
  window.addEventListener('scroll', ()=>{
    if (!ticking){ requestAnimationFrame(upd); ticking = true; }
  }, { passive: true });
  upd();
})();

/* ===== FV main copy: split into chars for stagger fade-in ===== */
(function(){
  const targets = document.querySelectorAll('.fv-main [data-fv-stagger]');
  if (!targets.length) return;
  let globalIndex = 0;
  targets.forEach(target => {
    const txt = target.textContent;
    target.textContent = '';
    [...txt].forEach((ch) => {
      const span = document.createElement('span');
      span.className = 'fv-ch';
      span.style.transitionDelay = (0.06 + globalIndex * 0.045) + 's';
      span.textContent = ch === ' ' ? ' ' : ch;
      target.appendChild(span);
      globalIndex++;
    });
  });
})();

/* ===== FV reveal: fade + 12px slide on intersect ===== */
/* (Deferred until loader is done so animations play in view of user) */
(function(){
  function setup(){
    const els = document.querySelectorAll('[data-fv-reveal]');
    if (els.length){
      const io = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const el = entry.target;
          el.classList.add('is-in');
          el.querySelectorAll('.fv-ch').forEach(ch => ch.classList.add('is-in'));
          io.unobserve(el);
        });
      }, { threshold: 0.15, rootMargin: '0px 0px -6% 0px' });
      els.forEach(el => io.observe(el));
    }

    const chars = document.querySelectorAll('.fv-main .fv-ch');
    if (chars.length){
      const io2 = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting){
            entry.target.classList.add('is-in');
            io2.unobserve(entry.target);
          }
        });
      }, { threshold: 0.3 });
      chars.forEach(ch => io2.observe(ch));
    }
  }
  if (document.body.classList.contains('is-loaded')) setup();
  else document.addEventListener('fv:reveal-start', setup, { once: true });
})();

/* ===== FV: count-up "2" in "2万円から" ===== */
(function(){
  function setup(){
    const els = document.querySelectorAll('[data-count-fv]');
    if (!els.length) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        io.unobserve(el);
        const target = parseInt(el.dataset.countFv, 10) || 0;
        const duration = 500;
        const start = performance.now();
        function frame(t){
          const k = Math.min(1, (t - start) / duration);
          const eased = 1 - Math.pow(1 - k, 3);
          el.textContent = Math.floor(target * eased);
          if (k < 1) requestAnimationFrame(frame);
          else el.textContent = target;
        }
        setTimeout(() => requestAnimationFrame(frame), 1100);
      });
    }, { threshold: 0.6 });
    els.forEach(el => io.observe(el));
  }
  if (document.body.classList.contains('is-loaded')) setup();
  else document.addEventListener('fv:reveal-start', setup, { once: true });
})();

/* ===== FV badge tap feedback (covers cases where :active flickers) ===== */
(function(){
  document.querySelectorAll('.fv-badge').forEach(btn => {
    btn.addEventListener('touchstart', () => btn.classList.add('is-tap'), { passive: true });
    btn.addEventListener('touchend',   () => setTimeout(() => btn.classList.remove('is-tap'), 120), { passive: true });
    btn.addEventListener('touchcancel',() => btn.classList.remove('is-tap'), { passive: true });
  });
})();

// ============================================== 
// スマホFV：スクロールで画像をフェードイン
// ============================================== 
(function() {
  
  const blocks = document.querySelectorAll('.fv-mobile-block');
  if (!blocks.length) return;
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.15,
    rootMargin: '0px 0px -10% 0px'
  });
  
  blocks.forEach(block => observer.observe(block));
})();

/* ========================================================
   セクション4:共感・問題提起 スクロールアニメ
   ======================================================== */
(function () {
  const cards = document.querySelectorAll('[data-em-card]');
  if (!cards.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          // 少し遅延させて順番に表示
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  cards.forEach((card) => observer.observe(card));
})();

/* ========================================================
   セクション5:進化セクション スクロールアニメ
   ======================================================== */
(function () {
  const feats = document.querySelectorAll('[data-ev-feat]');
  if (!feats.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 150);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.25,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  feats.forEach((feat) => observer.observe(feat));
})();

/* ========================================================
   セクション7:信頼の証 スクロールアニメ
   ======================================================== */
(function () {
  // スタンプとリスト両方を観察
  const stamp = document.querySelector('[data-tr-stamp]');
  const items = document.querySelectorAll('[data-tr-item]');

  if (!stamp && !items.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  if (stamp) observer.observe(stamp);
  items.forEach((item) => observer.observe(item));
})();

/* ========================================================
   セクション8:幻想と低価格の秘密 スクロールアニメ
   ======================================================== */
(function () {
  const alert = document.querySelector('[data-th-alert]');
  const vsCards = document.querySelectorAll('[data-th-vs]');
  const formulas = document.querySelectorAll('[data-th-formula]');
  const roles = document.querySelectorAll('[data-th-role]');

  const all = [
    ...(alert ? [alert] : []),
    ...vsCards,
    ...formulas,
    ...roles
  ];

  if (!all.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 100);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  all.forEach((el) => observer.observe(el));
})();

/* ========================================================
   セクション9:お客様の声 スクロールアニメ
   ======================================================== */
(function () {
  const stars = document.querySelector('[data-vc-stars]');
  const cards = document.querySelectorAll('[data-vc-card]');

  const all = [
    ...(stars ? [stars] : []),
    ...cards
  ];

  if (!all.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 80);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  all.forEach((el) => observer.observe(el));
})();

/* ========================================================
   セクション10:料金プラン スクロールアニメ
   ======================================================== */
(function () {
  const steps = document.querySelectorAll('[data-pr-step]');
  if (!steps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  steps.forEach((step) => observer.observe(step));
})();

/* ========================================================
   セクション11:月額パートナープラン スクロールアニメ
   ======================================================== */
(function () {
  const plans = document.querySelectorAll('[data-pp-plan]');
  if (!plans.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 150);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  plans.forEach((plan) => observer.observe(plan));
})();

/* ========================================================
   セクション12:制作の流れ スクロールアニメ
   ======================================================== */
(function () {
  const steps = document.querySelectorAll('[data-fl-step]');
  if (!steps.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  steps.forEach((step) => observer.observe(step));
})();

/* ========================================================
   セクション13:売れるLPを作るコツ スクロールアニメ
   ======================================================== */
(function () {
  const fades = document.querySelectorAll('[data-tp-fade]');
  const points = document.querySelectorAll('[data-tp-point]');

  const all = [...fades, ...points];
  if (!all.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry, i) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            entry.target.classList.add('is-visible');
          }, i * 120);
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: '0px 0px -10% 0px'
    }
  );

  all.forEach((el) => observer.observe(el));
})();
