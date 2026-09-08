document.addEventListener('DOMContentLoaded', () => {

  /* mobile nav */
  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('nav.primary');
  if (toggle && nav) {
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('is-open');
    });
    nav.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
      nav.classList.remove('open');
    }));
  }

  /* listing filter chips (properties.html) */
  const chips = document.querySelectorAll('.chip[data-filter]');
  const cards = document.querySelectorAll('[data-tags]');
  if (chips.length && cards.length) {
    chips.forEach(chip => {
      chip.addEventListener('click', () => {
        chips.forEach(c => c.classList.remove('active'));
        chip.classList.add('active');
        const filter = chip.dataset.filter;
        cards.forEach(card => {
          const tags = card.dataset.tags.split(',');
          card.style.display = (filter === 'all' || tags.includes(filter)) ? '' : 'none';
        });
      });
    });
  }

  /* apply filters passed in from the hero search widget (properties.html?location=..&type=..&use=..) */
  if (cards.length) {
    const params = new URLSearchParams(window.location.search);
    const wanted = ['location', 'type', 'use']
      .map(key => (params.get(key) || '').toLowerCase())
      .filter(val => val && val !== 'any');

    if (wanted.length) {
      chips.forEach(c => c.classList.remove('active'));
      let matchCount = 0;
      cards.forEach(card => {
        const tags = card.dataset.tags.split(',');
        const isMatch = wanted.every(w => tags.includes(w));
        card.style.display = isMatch ? '' : 'none';
        if (isMatch) matchCount++;
      });
      const notice = document.querySelector('#search-notice');
      if (notice) {
        notice.hidden = false;
        notice.textContent = matchCount
          ? `Showing ${matchCount} match${matchCount === 1 ? '' : 'es'} for your search.`
          : `No exact matches — here's everything we have. Try WhatsApp for options not listed yet.`;
        if (!matchCount) cards.forEach(card => { card.style.display = ''; });
      }
    }
  }

  /* hero search widget -> redirect to properties.html with filters as query params */
  const heroSearch = document.querySelector('#hero-search-form');
  if (heroSearch) {
    heroSearch.addEventListener('submit', (e) => {
      e.preventDefault();
      const data = new FormData(heroSearch);
      const params = new URLSearchParams();
      for (const [key, value] of data.entries()) {
        if (value && value.toLowerCase() !== 'any') params.set(key, value.toLowerCase());
      }
      window.location.href = `properties.html${params.toString() ? '?' + params.toString() : ''}`;
    });
  }

  /* FAQ accordion */
  document.querySelectorAll('.faq-item').forEach(item => {
    const q = item.querySelector('.faq-q');
    q.addEventListener('click', () => {
      const open = item.classList.contains('open');
      item.closest('.faq-list').querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!open) item.classList.add('open');
    });
  });

  /* reveal on scroll */
  const observer = new IntersectionObserver(entries => {
    entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('in'); });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));

  /* contact form -> whatsapp handoff (demo behaviour, no backend) */
  const form = document.querySelector('#viewing-form');
  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const name = form.querySelector('[name="name"]').value || 'there';
      const msg = `Hello Enjani Realty, my name is ${name}. I'd like to schedule a viewing / get more information.`;
      window.open(`https://wa.me/254700000000?text=${encodeURIComponent(msg)}`, '_blank');
    });
  }
});
