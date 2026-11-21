(() => {
  'use strict';

  // Set the address that receives messages from the contact form.
  const CONTACT_EMAIL = 'jhonmarksantos012@gmail.com';

  const root = document.documentElement;
  const $ = (selector, scope = document) => scope.querySelector(selector);
  const $$ = (selector, scope = document) => Array.from(scope.querySelectorAll(selector));
  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- Toast ---------- */
  const toastEl = $('#toast');
  let toastTimer;

  const showToast = (message) => {
    toastEl.textContent = message;
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove('show'), 3200);
  };

  /* ---------- Theme ---------- */
  const themeToggle = $('#themeToggle');
  const themeColor = $('meta[name="theme-color"]');

  const applyTheme = (theme) => {
    root.setAttribute('data-theme', theme);
    themeToggle.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
    if (themeColor) themeColor.setAttribute('content', theme === 'dark' ? '#0a0a0a' : '#fafafa');
  };

  applyTheme(root.getAttribute('data-theme') === 'light' ? 'light' : 'dark');

  themeToggle.addEventListener('click', () => {
    const next = root.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
    root.classList.add('theme-transition');
    applyTheme(next);
    try { localStorage.setItem('theme', next); } catch (e) { /* storage unavailable */ }
    setTimeout(() => root.classList.remove('theme-transition'), 450);
  });

  /* ---------- Header and mobile menu ---------- */
  const header = $('#siteHeader');
  const menuToggle = $('#menuToggle');

  const setMenu = (open) => {
    header.classList.toggle('menu-open', open);
    menuToggle.setAttribute('aria-expanded', String(open));
    menuToggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
  };

  menuToggle.addEventListener('click', () => setMenu(!header.classList.contains('menu-open')));
  $$('.nav-link').forEach((link) => link.addEventListener('click', () => setMenu(false)));
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape') setMenu(false); });
  document.addEventListener('click', (e) => {
    if (header.classList.contains('menu-open') && !header.contains(e.target)) setMenu(false);
  });
  window.addEventListener('resize', () => { if (window.innerWidth > 860) setMenu(false); });

  /* ---------- Scroll state: header border, back-to-top ---------- */
  const toTop = $('#toTop');

  const onScroll = () => {
    header.classList.toggle('scrolled', window.scrollY > 8);
    toTop.classList.toggle('visible', window.scrollY > 600);
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  $$('[data-top]').forEach((btn) => btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: reducedMotion ? 'auto' : 'smooth' });
  }));

  /* ---------- Active nav link ---------- */
  const navLinks = $$('.nav-link');
  const sections = $$('main section[id]');

  if ('IntersectionObserver' in window) {
    const sectionObserver = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        navLinks.forEach((link) => {
          const active = link.getAttribute('href') === `#${entry.target.id}`;
          link.classList.toggle('active', active);
          if (active) link.setAttribute('aria-current', 'true');
          else link.removeAttribute('aria-current');
        });
      });
    }, { rootMargin: '-40% 0px -55% 0px' });

    sections.forEach((section) => sectionObserver.observe(section));
  }

  /* ---------- Scroll reveal ---------- */
  const revealItems = $$('.reveal');

  if ('IntersectionObserver' in window && !reducedMotion) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('is-visible');
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add('is-visible'));
  }

  /* ---------- Hero code typing ---------- */
  const codeOutput = $('#codeOutput');

  const codeHtml = [
    '<span class="t-kw">const</span> developer <span class="t-pun">=</span> <span class="t-pun">{</span>',
    '  <span class="t-key">name</span><span class="t-pun">:</span> <span class="t-str">"Jhon Mark Santos"</span><span class="t-pun">,</span>',
    '  <span class="t-key">role</span><span class="t-pun">:</span> <span class="t-str">"Aspiring Full-Stack Developer"</span><span class="t-pun">,</span>',
    '  <span class="t-key">frontend</span><span class="t-pun">:</span> <span class="t-pun">[</span><span class="t-str">"HTML"</span><span class="t-pun">,</span> <span class="t-str">"CSS"</span><span class="t-pun">,</span> <span class="t-str">"JavaScript"</span><span class="t-pun">],</span>',
    '  <span class="t-key">backend</span><span class="t-pun">:</span> <span class="t-pun">[</span><span class="t-str">"PHP"</span><span class="t-pun">,</span> <span class="t-str">"Laravel"</span><span class="t-pun">],</span>',
    '  <span class="t-key">database</span><span class="t-pun">:</span> <span class="t-pun">[</span><span class="t-str">"MySQL"</span><span class="t-pun">,</span> <span class="t-str">"MariaDB"</span><span class="t-pun">],</span>',
    '  <span class="t-key">openToWork</span><span class="t-pun">:</span> <span class="t-bool">true</span><span class="t-pun">,</span>',
    '<span class="t-pun">};</span>'
  ].join('\n');

  // Returns the markup truncated to `count` visible characters, keeping tags intact.
  const sliceHtml = (html, count) => {
    let out = '';
    let visible = 0;
    let i = 0;
    while (i < html.length && visible < count) {
      if (html[i] === '<') {
        const end = html.indexOf('>', i);
        out += html.slice(i, end + 1);
        i = end + 1;
      } else {
        out += html[i];
        visible += 1;
        i += 1;
      }
    }
    return out;
  };

  if (codeOutput) {
    const total = codeHtml.replace(/<[^>]*>/g, '').length;

    if (reducedMotion) {
      codeOutput.innerHTML = codeHtml;
    } else {
      let shown = 0;
      setTimeout(() => {
        const timer = setInterval(() => {
          shown += 2;
          const done = shown >= total;
          codeOutput.innerHTML = sliceHtml(codeHtml, shown) + (done ? '' : '<span class="caret"></span>');
          if (done) clearInterval(timer);
        }, 22);
      }, 500);
    }
  }

  /* ---------- Placeholder links ---------- */
  const placeholderPattern = /your-username|your\.email|your-domain/i;

  document.addEventListener('click', (e) => {
    const link = e.target.closest('a[href]');
    if (!link || !placeholderPattern.test(link.getAttribute('href'))) return;
    e.preventDefault();
    showToast('This is a placeholder link. Replace it in index.html.');
  });

  /* ---------- Logo fallbacks ---------- */
  const initials = (alt) => alt.replace(/ (logo|icon)$/i, '').split(/\s+/).map((w) => w[0]).join('').slice(0, 3);

  const handleLogoError = (img) => {
    if (img.dataset.fallback && !img.dataset.fallbackTried) {
      img.dataset.fallbackTried = 'true';
      img.src = img.dataset.fallback;
      return;
    }
    const badge = document.createElement('span');
    badge.className = 'logo-fallback';
    badge.textContent = initials(img.alt);
    img.replaceWith(badge);
  };

  document.addEventListener('error', (e) => {
    if (e.target instanceof HTMLImageElement && e.target.closest('.logo')) handleLogoError(e.target);
  }, true);

  $$('.logo img').forEach((img) => {
    if (img.complete && img.naturalWidth === 0) handleLogoError(img);
  });

  /* ---------- Contact form ---------- */
  const form = $('#contactForm');
  const status = $('#formStatus');

  const rules = {
    name: (v) => (v.length < 2 ? 'Enter your full name (at least 2 characters).' : ''),
    email: (v) => {
      if (!v) return 'Enter your email address.';
      return /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? '' : 'Enter a valid email address, like you@example.com.';
    },
    subject: (v) => (v.length < 3 ? 'Enter a subject (at least 3 characters).' : ''),
    message: (v) => (v.length < 10 ? 'Write a message of at least 10 characters.' : '')
  };

  const validateField = (input) => {
    const message = rules[input.name](input.value.trim());
    const field = input.closest('.field');
    const errorEl = $(`#${input.name}-error`);
    field.classList.toggle('invalid', Boolean(message));
    input.setAttribute('aria-invalid', String(Boolean(message)));
    errorEl.textContent = message;
    return !message;
  };

  const fields = $$('input, textarea', form);

  fields.forEach((input) => {
    input.setAttribute('aria-describedby', `${input.name}-error`);
    input.addEventListener('blur', () => validateField(input));
    input.addEventListener('input', () => {
      if (input.closest('.field').classList.contains('invalid')) validateField(input);
    });
  });

  const setStatus = (message, isError = false) => {
    status.textContent = message;
    status.classList.toggle('is-error', isError);
  };

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    setStatus('');

    const results = fields.map(validateField);
    if (results.includes(false)) {
      const firstInvalid = fields.find((input) => input.getAttribute('aria-invalid') === 'true');
      if (firstInvalid) firstInvalid.focus();
      setStatus('Fix the highlighted fields and try again.', true);
      return;
    }

    if (placeholderPattern.test(CONTACT_EMAIL)) {
      setStatus('Your message looks good, but no email address is set up yet. Add yours as CONTACT_EMAIL in js/script.js.', true);
      return;
    }

    const data = Object.fromEntries(fields.map((input) => [input.name, input.value.trim()]));
    const body = `${data.message}\n\nFrom: ${data.name} <${data.email}>`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(data.subject)}&body=${encodeURIComponent(body)}`;

    setStatus('Message successfully sent!');
    window.location.href = mailto;
  });

  /* ---------- Footer year ---------- */
  const year = $('#year');
  if (year) year.textContent = new Date().getFullYear();
})();
