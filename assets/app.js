/* ZAFAR shared UI: small, dependency-free behaviours for low-data pages. */
(() => {
  const icons = {
    home: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 10 9-7 9 7v10a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1z"/></svg>',
    paper: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 2h8l4 4v16H6z"/><path d="M14 2v5h5M9 12h6M9 16h6"/></svg>',
    key: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="8" cy="15" r="3"/><path d="m10.2 12.8 7.3-7.3 2 2-1.5 1.5 1.4 1.4-2.1 2.1-1.4-1.4-3.7 3.8"/></svg>',
    book: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5.5A2.5 2.5 0 0 1 6.5 3H11v17H6.5A2.5 2.5 0 0 0 4 22zM20 5.5A2.5 2.5 0 0 0 17.5 3H13v17h4.5A2.5 2.5 0 0 1 20 22z"/></svg>',
    heart: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.8 4.8a5.4 5.4 0 0 0-7.6 0L12 6l-1.2-1.2a5.4 5.4 0 0 0-7.6 7.6L12 21l8.8-8.6a5.4 5.4 0 0 0 0-7.6z"/></svg>',
    help: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"/><path d="M9.5 9a2.6 2.6 0 1 1 4.2 2.1c-1 .75-1.7 1.2-1.7 2.4M12 17.2h.01"/></svg>',
    search: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="10.8" cy="10.8" r="6.2"/><path d="m16 16 4.2 4.2"/></svg>',
    filter: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 6h16M7 12h10M10 18h4"/></svg>',
    download: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 3v11M8 10l4 4 4-4M5 20h14"/></svg>',
    arrow: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h13M14 7l5 5-5 5"/></svg>',
    chevron: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m8 10 4 4 4-4"/></svg>',
    close: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m6 6 12 12M18 6 6 18"/></svg>',
    wifiOff: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2 2l20 20M5 9.2A12.6 12.6 0 0 1 9.1 7M2.7 5.2A17.7 17.7 0 0 1 12 2.5a17.5 17.5 0 0 1 8.2 2M8.4 12.6A6.4 6.4 0 0 1 12 11.5a6.5 6.5 0 0 1 3.2.8M12 19.2h.01"/></svg>',
    wifi: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3.2 8.5a13.2 13.2 0 0 1 17.6 0M6.5 12a8.4 8.4 0 0 1 11 0M9.8 15.4a3.6 3.6 0 0 1 4.4 0M12 19.2h.01"/></svg>',
    star: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m12 3 2.8 5.7 6.2.9-4.5 4.4 1.1 6.2-5.6-3-5.6 3 1.1-6.2L3 9.6l6.2-.9z"/></svg>',
    menu: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M5 12h14M5 6h14M5 18h14"/></svg>',
    plus: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 5v14M5 12h14"/></svg>',
    clock: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="8.5"/><path d="M12 7v5l3 2"/></svg>',
    bulb: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 18h6M10 21h4M8.3 14.8a6 6 0 1 1 7.4 0c-.8.6-1.3 1.5-1.4 2.5H9.7c-.1-1-.6-1.9-1.4-2.5z"/></svg>',
    mail: '<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"/><path d="m4 7 8 6 8-6"/></svg>',
    settings: '<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="3"/><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2.3 2.3-.1-.1a1.7 1.7 0 0 0-1.9-.3 1.7 1.7 0 0 0-1 1.6v.2h-3.2v-.2a1.7 1.7 0 0 0-1-1.6 1.7 1.7 0 0 0-1.9.3l-.1.1L6 17l.1-.1a1.7 1.7 0 0 0 .3-1.9 1.7 1.7 0 0 0-1.6-1H4.6v-3.2h.2a1.7 1.7 0 0 0 1.6-1 1.7 1.7 0 0 0-.3-1.9L6 7.8 8.3 5l.1.1a1.7 1.7 0 0 0 1.9.3 1.7 1.7 0 0 0 1-1.6V3.6h3.2v.2a1.7 1.7 0 0 0 1 1.6 1.7 1.7 0 0 0 1.9-.3l.1-.1 2.3 2.3-.1.1a1.7 1.7 0 0 0-.3 1.9 1.7 1.7 0 0 0 1.6 1h.2V14H21a1.7 1.7 0 0 0-1.6 1z"/></svg>',
    check: '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m5 12 4.2 4.2L19 6.5"/></svg>'
  };
  window.zIcon = (name) => icons[name] || '';

  const navItems = [
    ['home', 'Home', 'home.html'],
    ['paper', 'Past papers', 'past-papers.html'],
    ['key', 'Marking keys', 'marking-keys.html'],
    ['book', 'Books & notes', 'books-notes.html'],
    ['heart', 'Saved', 'favorites.html'],
    ['help', 'Help', 'help.html']
  ];
  const page = document.body.dataset.page;
  const linkMarkup = (mobile = false) => navItems.map(([icon, label, href], index) => {
    const active = page === href.replace('.html', '') ? ' active' : '';
    const hide = mobile && index > 4 ? ' mobile-more' : '';
    return `<a class="nav-link${active}${hide}" href="${href}">${icons[icon]}<span>${mobile && label === 'Books & notes' ? 'Books' : label}</span></a>`;
  }).join('');

  function shell() {
    const target = document.querySelector('[data-app-shell]');
    if (!target) return;
    target.innerHTML = `
      <header class="app-header">
        <div class="app-header-inner">
          <a class="brand" href="home.html" aria-label="Zafar home"><span class="brand-mark">${icons.book}</span><span>ZAFAR</span></a>
          <div class="header-spacer"></div>
          <label class="header-search"><span class="screen-reader-text">Search library</span>${icons.search}<input data-global-search type="search" placeholder="Search resources" autocomplete="off"></label>
          <a class="icon-button" href="help.html" aria-label="Help center">${icons.help}</a>
          <button class="user-pill" type="button" data-user-menu aria-label="Open account menu"><span class="user-avatar">KM</span><span>Kumbukani</span>${icons.chevron}</button>
        </div>
      </header>
      <div class="app-layout">
        <aside class="app-sidebar" aria-label="Main navigation">
          <span class="sidebar-label">Your library</span>
          <nav>${linkMarkup()}</nav>
          <div class="sidebar-bottom">
            <div class="data-tip"><strong>${icons.wifi} Built for your data</strong>Files are compressed for smaller downloads whenever possible.</div>
            <a class="nav-link" href="help.html">${icons.settings}<span>Settings & support</span></a>
          </div>
        </aside>
        <main class="page-main" id="main-content"></main>
      </div>
      <nav class="mobile-nav" aria-label="Main navigation">${linkMarkup(true)}</nav>
      <div class="toast-region" aria-live="polite" aria-atomic="true"></div>`;
    const content = document.querySelector('[data-page-content]');
    const main = target.querySelector('#main-content');
    if (content && main) {
      if (content.tagName === 'TEMPLATE') main.append(content.content.cloneNode(true));
      else {
        main.append(...content.childNodes);
        content.remove();
      }
    }
  }

  function toast(title, text) {
    const region = document.querySelector('.toast-region') || makeToastRegion();
    const note = document.createElement('div');
    note.className = 'toast';
    note.innerHTML = `${icons.check}<div><strong>${title}</strong><span>${text || ''}</span></div>`;
    region.replaceChildren(note);
    window.setTimeout(() => note.remove(), 3300);
  }
  function makeToastRegion() {
    const region = document.createElement('div');
    region.className = 'toast-region';
    region.setAttribute('aria-live', 'polite');
    document.body.append(region);
    return region;
  }

  function authDialog() {
    const dialog = document.querySelector('[data-auth-dialog]');
    if (!dialog) return;
    const showAuth = (mode = 'login') => {
      dialog.dataset.mode = mode;
      const isRegister = mode === 'register';
      const isReset = mode === 'reset';
      dialog.querySelector('[data-auth-title]').textContent = isReset ? 'Reset your password' : (isRegister ? 'Create your free account' : 'Welcome back');
      dialog.querySelector('[data-auth-copy]').textContent = isReset ? 'Enter your email and we’ll send a reset link.' : (isRegister ? 'No fees, no fuss. Start finding study resources.' : 'Sign in to continue where you left off.');
      dialog.querySelector('[data-name-field]').classList.toggle('hidden', !isRegister);
      dialog.querySelector('[data-password-field]').classList.toggle('hidden', isReset);
      dialog.querySelector('[data-remember]').classList.toggle('hidden', isReset);
      dialog.querySelector('[data-forgot]').classList.toggle('hidden', isReset);
      dialog.querySelector('[data-terms]').classList.toggle('hidden', !isRegister);
      dialog.querySelector('[data-auth-submit]').textContent = isReset ? 'Send reset link' : (isRegister ? 'Create account' : 'Sign in');
      dialog.querySelector('[data-auth-switch]').innerHTML = isReset ? 'Remembered it? <button type="button" data-mode="login">Sign in</button>' : (isRegister ? 'Already have an account? <button type="button" data-mode="login">Sign in</button>' : 'New to ZAFAR? <button type="button" data-mode="register">Create a free account</button>');
      dialog.querySelector('[data-auth-success]').classList.add('hidden');
      if (!dialog.open) dialog.showModal();
    };
    document.querySelectorAll('[data-auth-trigger]').forEach(button => button.addEventListener('click', () => showAuth(button.dataset.authTrigger || 'login')));
    dialog.addEventListener('click', (event) => {
      const modeButton = event.target.closest('[data-mode]');
      if (modeButton) showAuth(modeButton.dataset.mode);
      if (event.target.closest('[data-close-auth]')) dialog.close();
      if (event.target === dialog) dialog.close();
    });
    dialog.querySelector('form').addEventListener('submit', (event) => {
      event.preventDefault();
      const mode = dialog.dataset.mode;
      const success = dialog.querySelector('[data-auth-success]');
      if (mode === 'reset') {
        success.textContent = 'Reset link sent. Check your inbox and spam folder.';
        success.classList.remove('hidden');
      } else if (mode === 'register') {
        success.textContent = 'Account created. Check your email for a verification link before you begin downloading.';
        success.classList.remove('hidden');
        dialog.dataset.mode = 'verify';
        dialog.querySelector('[data-auth-submit]').textContent = 'Continue to library';
      } else {
        window.location.href = 'home.html';
      }
    });
  }

  function applyResourceVisibility() {
    const input = document.querySelector('[data-resource-search]');
    const term = input?.value.trim().toLowerCase() || '';
    const selectTerms = [...document.querySelectorAll('[data-filter-row] select')]
      .map(select => select.value.toLowerCase())
      .filter(value => value && !value.startsWith('all ') && value !== 'any year');
    const activeChip = document.querySelector('.chip.active')?.textContent.trim().toLowerCase() || '';
    const chipTerm = activeChip.startsWith('all ') ? '' : activeChip;
    const entries = [...document.querySelectorAll('[data-resource]')];
    let visible = 0;
    entries.forEach(entry => {
      const text = entry.textContent.toLowerCase();
      const matches = (!term || text.includes(term)) && selectTerms.every(value => text.includes(value)) && (!chipTerm || text.includes(chipTerm));
      entry.classList.toggle('hidden', !matches);
      if (matches) visible++;
    });
    const empty = document.querySelector('[data-empty-results]');
    if (empty) empty.classList.toggle('hidden', visible !== 0);
    const count = document.querySelector('.results-meta b');
    if (count && (term || selectTerms.length || chipTerm)) count.textContent = `${visible} result${visible === 1 ? '' : 's'}`;
  }

  function updateFavorites() {
    if (page !== 'favorites') return;
    const items = document.querySelectorAll('.resource-list [data-resource]');
    const count = items.length;
    const summary = document.querySelector('.favorites-summary p');
    if (summary) summary.innerHTML = `<b>${count} resource${count === 1 ? '' : 's'} saved.</b> Save anything useful so it is easier to find on your next visit.`;
    document.querySelector('.empty-favorites')?.classList.toggle('hidden', count !== 0);
    document.querySelector('.resource-list')?.classList.toggle('hidden', count === 0);
  }

  function resourceInteractions() {
    document.addEventListener('change', (event) => {
      if (event.target.closest('[data-filter-row]')) applyResourceVisibility();
    });
    document.addEventListener('click', (event) => {
      const save = event.target.closest('.save-button');
      if (save) {
        const saved = save.classList.toggle('saved');
        save.setAttribute('aria-pressed', String(saved));
        const item = save.closest('[data-resource]');
        const name = item?.dataset.resource || 'Resource';
        toast(saved ? 'Saved to your list' : 'Removed from saved', saved ? `${name} will be easy to find later.` : `${name} is no longer in your saved list.`);
        if (!saved && page === 'favorites') {
          window.setTimeout(() => {
            item?.remove();
            updateFavorites();
          }, 180);
        }
        return;
      }
      const download = event.target.closest('.download-button');
      if (download) {
        download.classList.add('loading');
        download.disabled = true;
        const item = download.closest('[data-resource]');
        const name = item?.dataset.resource || 'This file';
        toast('Preparing your download', `${name} is being made ready for your device.`);
        window.setTimeout(() => {
          download.classList.remove('loading');
          download.disabled = false;
          toast('Download ready', 'In the live app this file will now save to your device.');
        }, 900);
      }
      const filterButton = event.target.closest('[data-filters-toggle]');
      if (filterButton) {
        const panel = document.querySelector('[data-filter-row]');
        panel?.classList.toggle('open');
        filterButton.setAttribute('aria-expanded', String(panel?.classList.contains('open')));
      }
      const clearButton = event.target.closest('[data-clear-filters]');
      if (clearButton) {
        document.querySelectorAll('[data-filter-row] select').forEach(select => select.selectedIndex = 0);
        document.querySelector('[data-filter-row]')?.classList.remove('open');
        applyResourceVisibility();
        toast('Filters cleared', 'Showing all available resources.');
      }
      const chip = event.target.closest('.chip');
      if (chip) {
        chip.parentElement.querySelectorAll('.chip').forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        applyResourceVisibility();
      }
      const tab = event.target.closest('[data-tab]');
      if (tab) {
        tab.parentElement.querySelectorAll('[data-tab]').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
      }
      const collectionTab = event.target.closest('[data-collection-tab]');
      if (collectionTab) {
        const type = collectionTab.dataset.collectionTab;
        collectionTab.parentElement.querySelectorAll('[data-collection-tab]').forEach(t => t.classList.remove('active'));
        collectionTab.classList.add('active');
        document.querySelectorAll('.book-row[data-material]').forEach(row => row.classList.toggle('hidden', type !== 'all' && row.dataset.material !== type));
      }
    });
  }

  function setNetworkState() {
    const banner = document.querySelector('[data-network-banner]');
    if (!banner) return;
    const update = () => {
      const offline = !navigator.onLine;
      banner.classList.toggle('show', offline);
      if (offline) banner.innerHTML = `${icons.wifiOff}<span>You’re offline. Saved items remain available; new downloads will retry when you reconnect.</span>`;
    };
    window.addEventListener('offline', update);
    window.addEventListener('online', () => { update(); toast('You’re back online', 'Your library is ready to use.'); });
    update();
  }

  function localSearch() {
    const inputs = document.querySelectorAll('[data-resource-search], [data-help-search]');
    inputs.forEach(input => input.addEventListener('input', () => {
      if (input.hasAttribute('data-resource-search')) {
        applyResourceVisibility();
        return;
      }
      const term = input.value.trim().toLowerCase();
      const entries = [...document.querySelectorAll('[data-faq-item]')];
      entries.forEach(entry => entry.classList.toggle('hidden', !!term && !entry.textContent.toLowerCase().includes(term)));
    }));
    document.querySelectorAll('[data-global-search]').forEach(input => input.addEventListener('keydown', (event) => {
      if (event.key === 'Enter' && input.value.trim()) window.location.href = `past-papers.html?q=${encodeURIComponent(input.value.trim())}`;
    }));
  }

  function userMenu() {
    document.addEventListener('click', (event) => {
      const button = event.target.closest('[data-user-menu]');
      if (button) toast('Account menu', 'Account settings will be available here in the full app.');
    });
  }

  document.addEventListener('DOMContentLoaded', () => {
    shell();
    authDialog();
    resourceInteractions();
    setNetworkState();
    localSearch();
    userMenu();
    updateFavorites();
    const query = new URLSearchParams(window.location.search).get('q');
    const search = document.querySelector('[data-resource-search]');
    if (query && search) { search.value = query; search.dispatchEvent(new Event('input')); }
  });
})();
