const SITE_URL = 'https://abdulrhman-sa.github.io/';
const $ = (selector, parent = document) => parent.querySelector(selector);
const $$ = (selector, parent = document) => [...parent.querySelectorAll(selector)];
const root = document.documentElement;
const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
const menu = $('#siteMenu');
const menuButton = $('#menuButton');
const langButton = $('#langButton');
const themeButton = $('#themeButton');
const toast = $('#toast');
let language = root.lang === 'en' ? 'en' : 'ar';
let dictionary = {};
let projects = [];
let menuOpen = false;
let toastTimer;
let lastMenuFocus = null;

function save(key, value) {
  try { localStorage.setItem(key, value); } catch (_) { /* Private mode: still usable. */ }
}

async function json(path) {
  const response = await fetch(path, { cache: 'no-cache' });
  if (!response.ok) throw new Error(`Failed to load ${path}: ${response.status}`);
  return response.json();
}

// HTML is restricted to trusted translation keys that contain fixed markup.
const markupKeys = new Set(['aboutTitle', 'projectsTitle', 'contactTitle']);
function translatePage() {
  $$('[data-i18n]').forEach(node => {
    const key = node.dataset.i18n;
    if (typeof dictionary[key] !== 'string') return;
    if (markupKeys.has(key)) node.innerHTML = dictionary[key];
    else node.textContent = dictionary[key];
  });
  langButton.textContent = language === 'ar' ? 'EN' : 'عربي';
  langButton.setAttribute('aria-label', language === 'ar' ? 'Switch to English' : 'التبديل إلى العربية');
  menuButton.setAttribute('aria-label', dictionary[menuOpen ? 'menuOpened' : 'menuClosed'] || 'Menu');
  $('#exploreButton').setAttribute('aria-label', language === 'ar' ? 'انتقل إلى نبذة عني' : 'Explore the about section');
  document.title = `Abdulrhman Saeed AL-Asmri — ${language === 'ar' ? 'الموقع الشخصي' : 'Portfolio'}`;
  $('meta[name="description"]').content = language === 'ar'
    ? 'الموقع الشخصي لعبدالرحمن سعيد الأسمري — Abdulrhman Saeed AL-Asmri.'
    : 'The personal portfolio of Abdulrhman Saeed AL-Asmri.';
  updateThemeLabel();
}

async function setLanguage(next) {
  if (!['ar', 'en'].includes(next)) return;
  try {
    const data = await json(`/data/${next}.json`);
    language = next;
    dictionary = data;
    root.lang = next;
    root.dir = next === 'ar' ? 'rtl' : 'ltr';
    save('asa-lang', next);
    translatePage();
    renderProjects();
  } catch (error) {
    console.error('Translation unavailable:', error);
    showToast(language === 'ar' ? 'تعذّر تغيير اللغة الآن' : 'Language unavailable');
  }
}

function updateThemeLabel() {
  const isLight = root.dataset.theme === 'light';
  themeButton.setAttribute('aria-label', dictionary[isLight ? 'themeToDark' : 'themeToLight'] || 'Toggle theme');
  themeButton.setAttribute('aria-pressed', String(isLight));
  $('meta[name="theme-color"]').content = isLight ? '#f6f4f0' : '#12121b';
}

function toggleTheme() {
  const next = root.dataset.theme === 'light' ? 'dark' : 'light';
  root.dataset.theme = next;
  save('asa-theme', next);
  updateThemeLabel();
}

function toggleMenu(force) {
  const next = typeof force === 'boolean' ? force : !menuOpen;
  if (next === menuOpen) return;
  menuOpen = next;
  menu.classList.toggle('open', next);
  menu.setAttribute('aria-hidden', String(!next));
  menu.inert = !next;
  menuButton.setAttribute('aria-expanded', String(next));
  menuButton.classList.toggle('active', next);
  menuButton.setAttribute('aria-label', dictionary[next ? 'menuOpened' : 'menuClosed'] || 'Menu');
  document.body.classList.toggle('menu-open', next);
  if (next) {
    lastMenuFocus = document.activeElement;
    $('.nav-link', menu).focus({ preventScroll: true });
  } else {
    (lastMenuFocus?.isConnected ? lastMenuFocus : menuButton)?.focus({ preventScroll: true });
  }
}

function showToast(message) {
  clearTimeout(toastTimer);
  toast.textContent = message;
  toast.classList.add('visible');
  toastTimer = setTimeout(() => toast.classList.remove('visible'), 2900);
}

async function copyLink() {
  try {
    await navigator.clipboard.writeText(SITE_URL);
    showToast(dictionary.copied || 'Link copied');
  } catch (_) {
    // No insecure clipboard fallback: show a selectable link in the message.
    showToast(dictionary.copyFailed || SITE_URL);
  }
}

async function shareLink() {
  if (navigator.share) {
    try { await navigator.share({ title: 'Abdulrhman Saeed AL-Asmri', url: SITE_URL }); }
    catch (error) { if (error?.name !== 'AbortError') showToast(dictionary.shareFailed || 'Sharing unavailable'); }
  } else {
    await copyLink();
  }
}

function validHref(url) {
  try {
    const parsed = new URL(url);
    return ['https:', 'http:'].includes(parsed.protocol) ? parsed.href : null;
  } catch (_) { return null; }
}

function projectText(value) {
  if (typeof value === 'string') return value;
  if (value && typeof value === 'object') return value[language] || value.en || value.ar || '';
  return '';
}

function renderProjects() {
  const list = $('#projectsList');
  if (!projects.length) {
    list.innerHTML = `<div class="empty-state reveal is-visible"><span class="empty-glyph" aria-hidden="true">✳</span><div class="empty-heading"><span class="empty-kicker">THE ARCHIVE</span><h3></h3><p></p></div><span class="empty-corner" aria-hidden="true">↗</span></div>`;
    $('h3', list).textContent = dictionary.emptyTitle || 'هنا تبدأ الحكاية.';
    $('p', list).textContent = dictionary.emptyBody || 'لم تُضَف مشاريع بعد.';
    return;
  }
  list.replaceChildren();
  projects.forEach((project, index) => {
    if (!project || !project.title) return;
    const item = document.createElement('article');
    item.className = 'project-row reveal is-visible';
    const heading = document.createElement('h3');
    heading.textContent = projectText(project.title);
    const detail = document.createElement('p');
    detail.textContent = projectText(project.description);
    const counter = document.createElement('span');
    counter.className = 'project-number';
    counter.textContent = String(index + 1).padStart(2, '0');
    const copy = document.createElement('div');
    copy.className = 'project-copy';
    copy.append(heading, detail);
    item.append(counter, copy);
    const href = validHref(project.url);
    if (href) {
      const anchor = document.createElement('a');
      anchor.href = href;
      anchor.target = '_blank';
      anchor.rel = 'noopener noreferrer';
      anchor.className = 'project-open';
      anchor.textContent = `${dictionary.openProject || 'View project'} ↗`;
      item.append(anchor);
    }
    list.append(item);
  });
}

function initializeReveals() {
  const nodes = $$('.reveal');
  if (!('IntersectionObserver' in window) || reduceMotion.matches) {
    nodes.forEach(node => node.classList.add('is-visible'));
    return;
  }
  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.09, rootMargin: '0px 0px -24px 0px' });
  nodes.forEach(node => observer.observe(node));
}

function initializePointer() {
  if (!window.matchMedia('(pointer: fine)').matches || reduceMotion.matches) return;
  const art = $('.hero-art');
  let frame = null;
  let x = 0;
  let y = 0;
  art?.addEventListener('pointermove', event => {
    const bounds = art.getBoundingClientRect();
    x = ((event.clientX - bounds.left) / bounds.width - .5) * 12;
    y = ((event.clientY - bounds.top) / bounds.height - .5) * 12;
    if (frame) return;
    frame = requestAnimationFrame(() => {
      art.style.setProperty('--tilt-x', `${(-y).toFixed(2)}deg`);
      art.style.setProperty('--tilt-y', `${x.toFixed(2)}deg`);
      frame = null;
    });
  }, { passive: true });
  art?.addEventListener('pointerleave', () => {
    art.style.setProperty('--tilt-x', '0deg');
    art.style.setProperty('--tilt-y', '0deg');
  });
}

function initializeScroll() {
  const bar = $('#progressFill');
  let running = false;
  const update = () => {
    const total = document.documentElement.scrollHeight - innerHeight;
    const progress = total > 0 ? (scrollY / total) * 100 : 0;
    bar.style.width = `${Math.max(0, Math.min(100, progress))}%`;
    running = false;
  };
  window.addEventListener('scroll', () => {
    if (!running) { running = true; requestAnimationFrame(update); }
  }, { passive: true });
  window.addEventListener('resize', update, { passive: true });
  update();
}

menuButton.addEventListener('click', () => toggleMenu());
$$('.nav-link', menu).forEach(link => link.addEventListener('click', () => toggleMenu(false)));
window.addEventListener('keydown', event => {
  if (event.key === 'Escape' && menuOpen) toggleMenu(false);
  if (event.key === 'Tab' && menuOpen) {
    const focusable = $$('a[href]', menu);
    if (!focusable.length) return;
    const first = focusable[0];
    const last = focusable.at(-1);
    if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
    else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
  }
});
langButton.addEventListener('click', () => setLanguage(language === 'ar' ? 'en' : 'ar'));
themeButton.addEventListener('click', toggleTheme);
$('#copyButton').addEventListener('click', copyLink);
$('#shareButton').addEventListener('click', shareLink);
$('#footerYear').textContent = new Date().getFullYear();
initializeScroll();
initializePointer();
initializeReveals();
setLanguage(language);
json('/data/projects.json').then(data => {
  if (Array.isArray(data)) { projects = data; renderProjects(); }
}).catch(error => console.warn('Project data unavailable:', error));
