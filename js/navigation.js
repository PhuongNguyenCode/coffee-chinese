/* ============================================
   COFFEE 中文 – Navigation Component
   Shared nav and footer, injected into all pages
   ============================================ */

const Navigation = (() => {
  // Detect if we're at root or in pages/ directory
  function getBasePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      return '../';
    }
    return '';
  }

  function getPagePath() {
    const path = window.location.pathname;
    if (path.includes('/pages/')) {
      return '';
    }
    return 'pages/';
  }

  function getCurrentPage() {
    const path = window.location.pathname.split('/').pop().replace('.html', '');
    return path || 'index';
  }

  function renderNav() {
    const base = getBasePath();
    const page = getPagePath();
    const current = getCurrentPage();

    const navItems = [
      { id: 'index', label: 'Home', href: `${base}index.html`, icon: '☕' },
      { id: 'vocabulary', label: 'Vocabulary', href: `${page}vocabulary.html`, icon: '📖' },
      { id: 'lessons', label: 'Lessons', href: `${page}lessons.html`, icon: '📚' },
      {
        id: 'practice', label: 'Practice', icon: '✏️', dropdown: [
          { id: 'flashcards', label: 'Flashcards', href: `${page}flashcards.html`, icon: '🃏' },
          { id: 'quiz', label: 'Quiz', href: `${page}quiz.html`, icon: '❓' },
          { id: 'listening', label: 'Listening', href: `${page}listening.html`, icon: '🎧' },
          { id: 'conversation', label: 'Conversation', href: `${page}conversation.html`, icon: '💬' },
          { id: 'writing', label: 'Writing', href: `${page}writing.html`, icon: '✍️' }
        ]
      },
      { id: 'progress', label: 'Progress', href: `${page}progress.html`, icon: '📊' }
    ];

    const practicePages = ['flashcards', 'quiz', 'listening', 'conversation', 'writing'];
    const isPracticePage = practicePages.includes(current);

    const navEl = document.getElementById('main-nav');
    if (!navEl) return;

    navEl.className = 'main-nav';
    navEl.setAttribute('role', 'navigation');
    navEl.setAttribute('aria-label', 'Main Navigation');

    let linksHTML = '';
    let mobileLinksHTML = '';

    navItems.forEach(item => {
      if (item.dropdown) {
        const isActive = isPracticePage;
        linksHTML += `
          <div class="nav-dropdown">
            <a href="#" class="nav-link ${isActive ? 'active' : ''}" aria-haspopup="true" aria-expanded="false" onclick="event.preventDefault()">
              ${item.label} <span style="font-size:0.7em;margin-left:2px">▾</span>
            </a>
            <div class="nav-dropdown-content" role="menu">
              ${item.dropdown.map(sub => `
                <a href="${sub.href}" class="nav-dropdown-item ${current === sub.id ? 'active' : ''}" role="menuitem">
                  <span class="item-icon">${sub.icon}</span> ${sub.label}
                </a>
              `).join('')}
            </div>
          </div>`;

        // Mobile - flatten dropdown
        item.dropdown.forEach(sub => {
          mobileLinksHTML += `
            <a href="${sub.href}" class="mobile-nav-link ${current === sub.id ? 'active' : ''}">
              <span class="link-icon">${sub.icon}</span> ${sub.label}
            </a>`;
        });
      } else {
        const isActive = current === item.id;
        linksHTML += `
          <a href="${item.href}" class="nav-link ${isActive ? 'active' : ''}">${item.label}</a>`;
        mobileLinksHTML += `
          <a href="${item.href}" class="mobile-nav-link ${isActive ? 'active' : ''}">
            <span class="link-icon">${item.icon}</span> ${item.label}
          </a>`;
      }
    });

    // Add favorites and profile to mobile
    mobileLinksHTML += `
      <a href="${page}favorites.html" class="mobile-nav-link ${current === 'favorites' ? 'active' : ''}">
        <span class="link-icon">❤️</span> Favorites
      </a>
      <a href="${page}profile.html" class="mobile-nav-link ${current === 'profile' ? 'active' : ''}">
        <span class="link-icon">👤</span> Profile
      </a>`;

    navEl.innerHTML = `
      <div class="nav-container">
        <a href="${base}index.html" class="nav-logo" aria-label="COFFEE 中文 Home">
          <span class="nav-logo-icon">☕</span>
          <span class="nav-logo-text">COFFEE <span class="chinese">中文</span></span>
        </a>
        <div class="nav-links">
          ${linksHTML}
          <a href="${page}favorites.html" class="nav-link ${current === 'favorites' ? 'active' : ''}" data-tooltip="Favorites">❤️</a>
          <a href="${page}profile.html" class="nav-link ${current === 'profile' ? 'active' : ''}" data-tooltip="Profile">👤</a>
        </div>
        <button class="nav-mobile-toggle" aria-label="Toggle menu" aria-expanded="false">
          <span></span><span></span><span></span>
        </button>
      </div>
      <div class="nav-mobile-menu" id="mobileMenu" role="menu">
        ${mobileLinksHTML}
      </div>`;

    _initNavEvents(navEl);
  }

  function _initNavEvents(navEl) {
    // Mobile toggle
    const toggle = navEl.querySelector('.nav-mobile-toggle');
    const menu = navEl.querySelector('#mobileMenu');

    if (toggle && menu) {
      toggle.addEventListener('click', () => {
        const isOpen = toggle.classList.toggle('active');
        menu.classList.toggle('active');
        toggle.setAttribute('aria-expanded', isOpen);
        document.body.style.overflow = isOpen ? 'hidden' : '';
      });
    }

    // Scroll effect
    let lastScroll = 0;
    window.addEventListener('scroll', () => {
      const scrollY = window.scrollY;
      navEl.classList.toggle('scrolled', scrollY > 10);
      lastScroll = scrollY;
    }, { passive: true });

    // Dropdown keyboard/click support
    const dropdowns = navEl.querySelectorAll('.nav-dropdown');
    dropdowns.forEach(dd => {
      const trigger = dd.querySelector('.nav-link');
      trigger.addEventListener('click', (e) => {
        e.preventDefault();
        const isOpen = dd.classList.toggle('open');
        trigger.setAttribute('aria-expanded', String(isOpen));
      });
    });

    // Close dropdown on outside click
    document.addEventListener('click', (e) => {
      dropdowns.forEach(dd => {
        if (!dd.contains(e.target)) {
          dd.classList.remove('open');
          const trigger = dd.querySelector('.nav-link');
          if (trigger) trigger.setAttribute('aria-expanded', 'false');
        }
      });
    });
  }

  function renderFooter() {
    const base = getBasePath();
    const page = getPagePath();

    const footerEl = document.getElementById('main-footer');
    if (!footerEl) return;

    footerEl.className = 'main-footer';
    footerEl.setAttribute('role', 'contentinfo');

    footerEl.innerHTML = `
      <div class="container">
        <div class="footer-grid">
          <div class="footer-brand">
            <div class="footer-logo">☕ COFFEE <span class="chinese">中文</span></div>
            <p>Learn Chinese through the art and culture of coffee. From bean to cup, from character to conversation.</p>
          </div>
          <div class="footer-column">
            <h4>Learn</h4>
            <ul>
              <li><a href="${page}vocabulary.html">Vocabulary</a></li>
              <li><a href="${page}lessons.html">Lessons</a></li>
              <li><a href="${page}flashcards.html">Flashcards</a></li>
              <li><a href="${page}quiz.html">Quiz</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Practice</h4>
            <ul>
              <li><a href="${page}listening.html">Listening</a></li>
              <li><a href="${page}conversation.html">Conversation</a></li>
              <li><a href="${page}writing.html">Writing</a></li>
              <li><a href="${page}progress.html">Progress</a></li>
            </ul>
          </div>
          <div class="footer-column">
            <h4>Account</h4>
            <ul>
              <li><a href="${page}favorites.html">Favorites</a></li>
              <li><a href="${page}profile.html">Profile</a></li>
            </ul>
          </div>
        </div>
        <div class="footer-bottom">
          <span>© 2024 COFFEE 中文. Learn Chinese. Love Coffee.</span>
          <span>Made with ☕ and ❤️</span>
        </div>
      </div>`;
  }

  return { renderNav, renderFooter, getBasePath, getPagePath, getCurrentPage };
})();
