(() => {
  const menu = document.getElementById('navLinks');
  const menuToggle = document.getElementById('menuToggle');
  const searchToggle = document.getElementById('searchToggle');
  const searchPanel = document.getElementById('searchPanel');
  const searchClose = document.getElementById('searchClose');
  const bagToggle = document.getElementById('bagToggle');
  const bagPanel = document.getElementById('bagPanel');
  const scrim = document.getElementById('scrim');
  const searchInput = document.getElementById('siteSearch');

  function closePanels() {
    searchPanel.classList.remove('is-open');
    bagPanel.classList.remove('is-open');
    scrim.classList.remove('is-visible');
    searchPanel.setAttribute('aria-hidden', 'true');
    bagPanel.setAttribute('aria-hidden', 'true');
    searchToggle.setAttribute('aria-expanded', 'false');
    bagToggle.setAttribute('aria-expanded', 'false');
  }
  function openPanel(panel) {
    closePanels();
    panel.classList.add('is-open');
    panel.setAttribute('aria-hidden', 'false');
    scrim.classList.add('is-visible');
    if (panel === searchPanel) {
      searchToggle.setAttribute('aria-expanded', 'true');
      setTimeout(() => searchInput.focus(), 80);
    } else bagToggle.setAttribute('aria-expanded', 'true');
  }
  menuToggle.addEventListener('click', () => {
    const isOpen = menu.classList.toggle('is-open');
    menuToggle.classList.toggle('is-active', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Menyuni yopish' : 'Menyuni ochish');
  });
  menu.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
    menu.classList.remove('is-open');
    menuToggle.classList.remove('is-active');
    menuToggle.setAttribute('aria-expanded', 'false');
  }));
  searchToggle.addEventListener('click', () => searchPanel.classList.contains('is-open') ? closePanels() : openPanel(searchPanel));
  bagToggle.addEventListener('click', () => bagPanel.classList.contains('is-open') ? closePanels() : openPanel(bagPanel));
  searchClose.addEventListener('click', closePanels);
  scrim.addEventListener('click', closePanels);
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closePanels(); });
  searchInput.addEventListener('keydown', event => {
    if (event.key === 'Enter' && searchInput.value.trim()) {
      const term = encodeURIComponent(searchInput.value.trim());
      window.open(`https://www.apple.com/search/${term}`, '_blank', 'noopener');
    }
  });
})();
