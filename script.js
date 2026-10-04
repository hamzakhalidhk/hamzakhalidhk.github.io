(() => {
  const root = document.documentElement;
  const themeButton = document.querySelector('.theme-toggle');
  const setTheme = theme => {
    root.dataset.theme = theme;
    themeButton.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`);
    document.querySelector('meta[name="theme-color"]').content = theme === 'dark' ? '#111d19' : '#f6f7f2';
  };
  try { setTheme(localStorage.getItem('hamza-theme') === 'dark' ? 'dark' : 'light'); } catch { setTheme('light'); }
  themeButton.addEventListener('click', () => {
    const theme = root.dataset.theme === 'dark' ? 'light' : 'dark';
    setTheme(theme);
    try { localStorage.setItem('hamza-theme', theme); } catch { /* Theme still works without storage. */ }
  });
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('#navigation');
  const closeMenu = () => { menuButton.setAttribute('aria-expanded', 'false'); navigation.classList.remove('open'); };
  menuButton.addEventListener('click', () => {
    const isOpen = menuButton.getAttribute('aria-expanded') === 'true';
    menuButton.setAttribute('aria-expanded', String(!isOpen));
    navigation.classList.toggle('open', !isOpen);
  });
  navigation.querySelectorAll('a').forEach(link => link.addEventListener('click', closeMenu));
  document.addEventListener('keydown', event => {
    if (event.key === 'Escape' && menuButton.getAttribute('aria-expanded') === 'true') { closeMenu(); menuButton.focus(); }
  });
  const cards = [...document.querySelectorAll('.project-grid:not(.video-grid) .project-card')];
  document.querySelectorAll('.filter').forEach(button => button.addEventListener('click', () => {
    document.querySelectorAll('.filter').forEach(filter => {
      const active = filter === button;
      filter.classList.toggle('active', active);
      filter.setAttribute('aria-pressed', String(active));
    });
    let visible = 0;
    cards.forEach(card => {
      card.hidden = button.dataset.filter !== 'all' && !card.dataset.category.split(' ').includes(button.dataset.filter);
      if (!card.hidden) visible++;
    });
    document.querySelector('#filter-status').textContent = `${visible} projects shown.`;
  }));
  document.querySelector('#copy-email').addEventListener('click', async () => {
    const status = document.querySelector('#copy-status');
    try {
      if (!navigator.clipboard) throw new Error('Clipboard unavailable');
      await navigator.clipboard.writeText('just.hamza.khalid@gmail.com');
      status.textContent = 'Email copied. Let’s talk!';
    } catch {
      status.textContent = 'Select the email above to copy it, or click it to send a message.';
    }
  });
})();
