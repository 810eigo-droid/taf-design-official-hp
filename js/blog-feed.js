(() => {
  'use strict';
  const origin = 'https://taf-design.com';
  const plainText = value => {
    const doc = new DOMParser().parseFromString(String(value || ''), 'text/html');
    return doc.body.textContent || '';
  };
  const safeUrl = value => {
    if (!value) return null;
    try { const url = new URL(value, origin); return url.origin === origin && url.protocol === 'https:' ? url.href : null; }
    catch (_) { return null; }
  };
  document.querySelectorAll('[data-taf-blog]').forEach(root => {
    const grid = root.querySelector('.taf-blog-grid');
    const status = root.querySelector('.taf-blog-status');
    const more = root.querySelector('[data-blog-more]');
    const limit = 6;
    let page = 1;
    let busy = false;
    const seen = new Set();
    async function load() {
      if (busy) return;
      busy = true;
      if (more) more.disabled = true;
      root.setAttribute('aria-busy', 'true');
      status.textContent = '記事を読み込んでいます…';
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 12000);
      try {
        const url = new URL('/wp-json/wp/v2/posts', origin);
        url.search = new URLSearchParams({per_page: String(limit), page: String(page), status: 'publish', orderby: 'date', order: 'desc', _embed: 'wp:featuredmedia', _fields: 'id,date,link,title,_links,_embedded'}).toString();
        const response = await fetch(url, {signal: controller.signal, credentials: 'omit'});
        if (!response.ok) throw new Error('Unable to load posts');
        const posts = await response.json();
        if (!Array.isArray(posts)) throw new Error('Invalid response');
        const fragment = document.createDocumentFragment();
        posts.forEach(post => {
          const href = safeUrl(post.link);
          if (!href || seen.has(post.id)) return;
          seen.add(post.id);
          const card = document.createElement('a');
          card.className = 'taf-blog-card'; card.href = href;
          const media = post._embedded?.['wp:featuredmedia']?.[0];
          const src = safeUrl(media?.media_details?.sizes?.medium_large?.source_url || media?.source_url || '');
          if (src && media) {
            const img = document.createElement('img'); img.src = src; img.alt = ''; img.loading = 'lazy'; img.decoding = 'async';
            img.addEventListener('error', () => img.remove(), {once:true}); card.append(img);
          }
          const body = document.createElement('div'); body.className = 'taf-blog-card-body';
          if (/^\d{4}-\d{2}-\d{2}/.test(post.date || '')) {
            const time = document.createElement('time'); time.dateTime = post.date.slice(0,10); time.textContent = post.date.slice(0,10).replaceAll('-', '.'); body.append(time);
          }
          const heading = document.createElement('h3'); heading.textContent = plainText(post.title?.rendered) || '記事を読む'; body.append(heading); card.append(body); fragment.append(card);
        });
        if (page === 1) grid.replaceChildren();
        grid.append(fragment);
        status.textContent = seen.size ? '' : '公開記事はまだありません。';
        const totalPages = Number(response.headers.get('X-WP-TotalPages'));
        if (more) { more.hidden = totalPages > 0 ? page >= totalPages : posts.length < limit; more.textContent = 'さらに記事を見る'; }
        page += 1;
      } catch (_) {
        status.textContent = grid.children.length ? '最新情報を取得できませんでした。表示中の記事はそのまま読めます。' : '記事を取得できませんでした。時間をおいて再度お試しください。';
        if (more) { more.hidden = false; more.textContent = '再読み込み'; }
      } finally {
        clearTimeout(timeout); busy = false; root.removeAttribute('aria-busy'); if (more) more.disabled = false;
      }
    }
    if (more) more.addEventListener('click', load);
    load();
  });

  // Short labels are editorial; new posts use their title until a label is added.
  const topicLabels = {"1291": "会員サイトを始めたい", "1183": "2万円でHPを作れる理由", "1131": "メールの迷惑メール率を確認したい", "1041": "無料でメルマガを始めたい", "1019": "フォームのメールが届かない"};
  document.querySelectorAll('[data-blog-topics]').forEach(async list => {
    const notice = list.parentElement.querySelector('[data-topics-status]');
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 30000);
    async function allPages(endpoint, fields) {
      const items = new Map();
      for (let page = 1; ; page++) {
        const url = new URL('/wp-json/wp/v2/' + endpoint, origin);
        const params = {per_page:'100',page:String(page),_fields:fields};
        if (endpoint === 'posts') Object.assign(params,{status:'publish',orderby:'date',order:'desc'});
        else params.hide_empty = 'true';
        url.search = new URLSearchParams(params).toString();
        const response = await fetch(url,{signal:controller.signal,credentials:'omit'});
        if (!response.ok) throw new Error('Topics unavailable');
        const rows = await response.json();
        if (!Array.isArray(rows)) throw new Error('Invalid topics');
        rows.forEach(row => items.set(row.id,row));
        const pages = Number(response.headers.get('X-WP-TotalPages'));
        if (pages > 0 ? page >= pages : rows.length < 100) break;
      }
      return [...items.values()];
    }
    try {
      const [posts,categories] = await Promise.all([
        allPages('posts','id,link,title,categories'),allPages('categories','id,name')
      ]);
      const names = new Map(categories.map(c => [c.id,plainText(c.name)]));
      const groups = new Map();
      posts.forEach(post => {
        if (!safeUrl(post.link)) return;
        const ids = Array.isArray(post.categories) && post.categories.length ? [...new Set(post.categories)] : [0];
        ids.forEach(id => {
          if (!groups.has(id)) groups.set(id,[]);
          groups.get(id).push(post);
        });
      });
      const fragment = document.createDocumentFragment();
      groups.forEach((posts,id) => {
        const section = document.createElement('section'); section.className = 'taf-topic-group';
        const heading = document.createElement('h4'); heading.textContent = names.get(id) || 'その他の記事';
        const ul = document.createElement('ul');
        posts.forEach(post => {
          const li = document.createElement('li'); const a = document.createElement('a');
          a.href = safeUrl(post.link); a.textContent = topicLabels[post.id] || plainText(post.title?.rendered) || '記事を読む';
          const arrow = document.createElement('span'); arrow.textContent = ' →'; arrow.setAttribute('aria-hidden','true');
          a.append(arrow); li.append(a); ul.append(li);
        });
        section.append(heading,ul); fragment.append(section);
      });
      list.replaceChildren(fragment);
      notice.textContent = groups.size ? '' : '公開記事はまだありません。';
    } catch (_) {
      notice.textContent = '最新の一覧を取得できませんでした。表示中の項目から記事を読めます。';
    } finally { clearTimeout(timeout); }
  });
})();
