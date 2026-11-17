(() => {
  document.querySelectorAll('[data-carousel]').forEach(viewport => {
    const trackId = viewport.dataset.carousel;
    const track = document.getElementById(trackId);
    if (!track) return;
    const slides = Array.from(track.children);
    const dots = document.querySelector(`[data-dots-for="${trackId}"]`);
    let index = 0;
    let startX = 0;
    let deltaX = 0;
    let pointerDown = false;

    function maxIndex() {
      return Math.max(0, slides.length - Math.max(1, Math.floor(viewport.clientWidth / (slides[0].getBoundingClientRect().width + 16))));
    }
    function update(nextIndex) {
      const max = maxIndex();
      index = Math.min(Math.max(nextIndex, 0), max);
      const slide = slides[0];
      const gap = parseFloat(getComputedStyle(track).gap) || 0;
      const offset = index * (slide.getBoundingClientRect().width + gap);
      track.style.transform = `translateX(${-offset}px)`;
      if (dots) dots.querySelectorAll('.dot').forEach((dot, i) => dot.classList.toggle('is-active', i === index));
    }
    document.querySelectorAll(`[data-carousel-next="${trackId}"]`).forEach(button => button.addEventListener('click', () => update(index >= maxIndex() ? 0 : index + 1)));
    document.querySelectorAll(`[data-carousel-prev="${trackId}"]`).forEach(button => button.addEventListener('click', () => update(index <= 0 ? maxIndex() : index - 1)));
    if (dots) dots.querySelectorAll('.dot').forEach(dot => dot.addEventListener('click', () => update(Number(dot.dataset.slide))));
    viewport.addEventListener('keydown', event => {
      if (event.key === 'ArrowRight') { event.preventDefault(); update(index + 1); }
      if (event.key === 'ArrowLeft') { event.preventDefault(); update(index - 1); }
    });
    viewport.addEventListener('pointerdown', event => { pointerDown = true; startX = event.clientX; deltaX = 0; viewport.setPointerCapture(event.pointerId); });
    viewport.addEventListener('pointermove', event => { if (pointerDown) deltaX = event.clientX - startX; });
    viewport.addEventListener('pointerup', () => {
      if (!pointerDown) return;
      if (Math.abs(deltaX) > 45) update(index + (deltaX < 0 ? 1 : -1));
      pointerDown = false;
    });
    viewport.addEventListener('pointercancel', () => { pointerDown = false; });
    window.addEventListener('resize', () => update(index));
    update(0);
  });
})();
