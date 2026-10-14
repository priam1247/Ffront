/* ZAFAR shared UI — mobile-first, dependency-free behaviours. */
(() => {
  const page = document.body.dataset.page;
  const icon = (name, label = '') => `<svg class="lucide-icon"${label ? ` aria-label="${label}" role="img"` : ' aria-hidden="true"'}><use href="assets/lucide.svg#${name}"></use></svg>`;
  window.zIcon = icon;

  const navItems = [
    ['file-text', 'Papers', 'past-papers.html'],
    ['key-round', 'Keys', 'marking-keys.html'],
    ['book-open', 'Notes', 'books-notes.html'],
    ['heart', 'Saved', 'favorites.html']
  ];

  function navigation() {
    return navItems.map(([name, label, href]) => {
      const active = page === href.replace('.html', '') ? ' active' : '';
      return `<a class="nav-link${active}" href="${href}">${icon(name)}<span>${label}</span></a>`;
    }).join('');
  }

  function mountShell() {
    const target = document.querySelector('[data-app-shell]');
    if (!target) return;
    target.innerHTML = `
      <header class="app-header">
        <div class="app-header-inner">
          <a class="brand" href="past-papers.html" aria-label="ZAFAR papers"><span class="brand-mark">${icon('book-open')}</span><span>ZAFAR</span></a>
          <a class="header-help" href="help.html">${icon('circle-help')}<span>Help</span></a>
        </div>
      </header>
      <main class="page-main" id="main-content"></main>
      <nav class="mobile-nav" aria-label="Library navigation">${navigation()}</nav>
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

  function hydrateLucideIcons() {
    document.querySelectorAll('.brand-mark').forEach(element => { element.innerHTML = icon('book-open'); });
    document.querySelectorAll('.resource-icon').forEach(element => {
      element.innerHTML = icon(element.classList.contains('key') ? 'key-round' : element.classList.contains('book') ? 'book-open' : 'file-text');
    });
    document.querySelectorAll('.download-button').forEach(element => { element.innerHTML = icon('download'); });
    document.querySelectorAll('.save-button').forEach(element => { element.innerHTML = icon('heart'); });
    document.querySelectorAll('.library-search > svg, .help-search > svg').forEach(element => { element.outerHTML = icon('search'); });
    document.querySelectorAll('[data-filters-toggle] svg').forEach(element => { element.outerHTML = icon('filter'); });
  }

  function toast(title, detail) {
    const region = document.querySelector('.toast-region') || (() => {
      const element = document.createElement('div');
      element.className = 'toast-region';
      element.setAttribute('aria-live', 'polite');
      document.body.append(element);
      return element;
    })();
    const message = document.createElement('div');
    message.className = 'toast';
    message.innerHTML = `${icon('check')}<div><strong>${title}</strong><span>${detail || ''}</span></div>`;
    region.replaceChildren(message);
    window.setTimeout(() => message.remove(), 3000);
  }

  function setupAuth() {
    const dialog = document.querySelector('[data-auth-dialog]');
    if (!dialog) return;
    const show = (mode = 'login') => {
      dialog.dataset.mode = mode;
      const register = mode === 'register';
      const reset = mode === 'reset';
      dialog.querySelector('[data-auth-title]').textContent = reset ? 'Reset password' : register ? 'Create your account' : 'Sign in';
      dialog.querySelector('[data-auth-copy]').textContent = reset ? 'Enter your email and we will send a reset link.' : register ? 'Use one account to save useful resources.' : 'Use your account to continue.';
      dialog.querySelector('[data-name-field]').classList.toggle('hidden', !register);
      dialog.querySelector('[data-password-field]').classList.toggle('hidden', reset);
      dialog.querySelector('#auth-password').required = !reset;
      dialog.querySelector('[data-remember]').classList.toggle('hidden', reset);
      dialog.querySelector('[data-forgot]').classList.toggle('hidden', reset);
      dialog.querySelector('[data-terms]').classList.toggle('hidden', !register);
      dialog.querySelector('[data-auth-submit]').textContent = reset ? 'Send reset link' : register ? 'Create account' : 'Sign in';
      dialog.querySelector('[data-auth-switch]').innerHTML = reset
        ? 'Remembered it? <button type="button" data-mode="login">Sign in</button>'
        : register
          ? 'Already registered? <button type="button" data-mode="login">Sign in</button>'
          : 'New here? <button type="button" data-mode="register">Create an account</button>';
      dialog.querySelector('[data-auth-success]').classList.add('hidden');
      if (!dialog.open && typeof dialog.showModal === 'function') dialog.showModal();
    };

    dialog.addEventListener('click', event => {
      const modeButton = event.target.closest('[data-mode]');
      if (modeButton) show(modeButton.dataset.mode);
    });
    dialog.querySelector('form').addEventListener('submit', event => {
      event.preventDefault();
      const success = dialog.querySelector('[data-auth-success]');
      if (dialog.dataset.mode === 'reset') {
        success.textContent = 'Reset link sent. Check your inbox and spam folder.';
        success.classList.remove('hidden');
      } else if (dialog.dataset.mode === 'register') {
        success.textContent = 'Account created. Check your email for a verification link before downloading.';
        success.classList.remove('hidden');
        dialog.dataset.mode = 'verify';
        dialog.querySelector('[data-auth-submit]').textContent = 'Open library';
      } else {
        window.location.href = 'past-papers.html';
      }
    });
  }

  function applyResourceVisibility() {
    const search = document.querySelector('[data-resource-search]');
    const term = search?.value.trim().toLowerCase() || '';
    const filters = [...document.querySelectorAll('[data-filter-row] select')]
      .map(select => select.value.toLowerCase())
      .filter(value => value && !value.startsWith('all ') && value !== 'any year');
    const activeChip = document.querySelector('.chip.active')?.textContent.trim().toLowerCase() || '';
    const chip = activeChip.startsWith('all ') ? '' : activeChip;
    const resources = [...document.querySelectorAll('[data-resource]')];
    let visible = 0;
    resources.forEach(resource => {
      const text = resource.textContent.toLowerCase();
      const matches = (!term || text.includes(term)) && filters.every(value => text.includes(value)) && (!chip || text.includes(chip));
      resource.classList.toggle('hidden', !matches);
      if (matches) visible++;
    });
    document.querySelector('[data-empty-results]')?.classList.toggle('hidden', visible !== 0);
    const count = document.querySelector('.results-meta b');
    if (count && (term || filters.length || chip)) count.textContent = `${visible} result${visible === 1 ? '' : 's'}`;
  }

  function updateFavorites() {
    if (page !== 'favorites') return;
    const count = document.querySelectorAll('.resource-list [data-resource]').length;
    const summary = document.querySelector('.favorites-summary p');
    if (summary) summary.innerHTML = `<b>${count} resource${count === 1 ? '' : 's'} saved.</b> Keep useful material here for your next revision session.`;
    document.querySelector('.empty-favorites')?.classList.toggle('hidden', count !== 0);
    document.querySelector('.resource-list')?.classList.toggle('hidden', count === 0);
  }

  function setupResourceControls() {
    document.addEventListener('change', event => {
      if (event.target.closest('[data-filter-row]')) applyResourceVisibility();
    });
    document.addEventListener('click', event => {
      const save = event.target.closest('.save-button');
      if (save) {
        const saved = save.classList.toggle('saved');
        save.setAttribute('aria-pressed', String(saved));
        const item = save.closest('[data-resource]');
        const title = item?.dataset.resource || 'Resource';
        toast(saved ? 'Saved' : 'Removed', saved ? `${title} is in your saved list.` : `${title} was removed.`);
        if (!saved && page === 'favorites') window.setTimeout(() => { item?.remove(); updateFavorites(); }, 180);
        return;
      }
      const download = event.target.closest('.download-button');
      if (download) {
        download.disabled = true;
        download.classList.add('loading');
        const item = download.closest('[data-resource]');
        toast('Preparing download', `${item?.dataset.resource || 'This file'} is being prepared.`);
        window.setTimeout(() => {
          download.disabled = false;
          download.classList.remove('loading');
          toast('Download ready', 'The file is ready to save on your device.');
        }, 800);
        return;
      }
      const filterButton = event.target.closest('[data-filters-toggle]');
      if (filterButton) {
        const panel = document.querySelector('[data-filter-row]');
        panel?.classList.toggle('open');
        filterButton.setAttribute('aria-expanded', String(panel?.classList.contains('open')));
      }
      const clear = event.target.closest('[data-clear-filters]');
      if (clear) {
        document.querySelectorAll('[data-filter-row] select').forEach(select => { select.selectedIndex = 0; });
        document.querySelector('[data-filter-row]')?.classList.remove('open');
        applyResourceVisibility();
      }
      const chip = event.target.closest('.chip');
      if (chip) {
        chip.parentElement.querySelectorAll('.chip').forEach(button => button.classList.remove('active'));
        chip.classList.add('active');
        applyResourceVisibility();
      }
      const collectionTab = event.target.closest('[data-collection-tab]');
      if (collectionTab) {
        const type = collectionTab.dataset.collectionTab;
        collectionTab.parentElement.querySelectorAll('[data-collection-tab]').forEach(button => button.classList.remove('active'));
        collectionTab.classList.add('active');
        document.querySelectorAll('.book-row[data-material]').forEach(row => row.classList.toggle('hidden', type !== 'all' && row.dataset.material !== type));
      }
    });
  }

  function setupSearch() {
    document.querySelectorAll('[data-resource-search], [data-help-search]').forEach(input => input.addEventListener('input', () => {
      if (input.hasAttribute('data-resource-search')) return applyResourceVisibility();
      const term = input.value.trim().toLowerCase();
      document.querySelectorAll('[data-faq-item]').forEach(item => item.classList.toggle('hidden', !!term && !item.textContent.toLowerCase().includes(term)));
    }));
  }

  function setupNetworkNotice() {
    const banner = document.querySelector('[data-network-banner]');
    if (!banner) return;
    const update = () => {
      const offline = !navigator.onLine;
      banner.classList.toggle('show', offline);
      if (offline) banner.innerHTML = `${icon('wifi-off')}<span>You are offline. Downloads will work when you reconnect.</span>`;
    };
    window.addEventListener('offline', update);
    window.addEventListener('online', () => { update(); toast('Back online', 'Your library is ready.'); });
    update();
  }

  document.addEventListener('DOMContentLoaded', () => {
    mountShell();
    hydrateLucideIcons();
    setupAuth();
    setupResourceControls();
    setupSearch();
    setupNetworkNotice();
    updateFavorites();
    const query = new URLSearchParams(window.location.search).get('q');
    const search = document.querySelector('[data-resource-search]');
    if (query && search) { search.value = query; applyResourceVisibility(); }
  });
})();
