/* ============================================
   COFFEE 中文 – Main JavaScript
   Shared utilities, initialization, speech
   ============================================ */

const App = (() => {
  // --- Initialization ---
  function init() {
    Navigation.renderNav();
    Navigation.renderFooter();
    _initScrollAnimations();
    _initBackToTop();
    _initToastContainer();
  }

  // --- Speech Synthesis ---
  function speak(text, options = {}) {
    if (!('speechSynthesis' in window)) {
      showToast('Trình duyệt không hỗ trợ đọc giọng nói.', 'warning');
      return;
    }

    window.speechSynthesis.cancel();

    const settings = StorageManager.getSettings();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'zh-CN';
    utterance.rate = options.rate || settings.speechRate || 1;
    utterance.pitch = options.pitch || 1;

    // Try to find Chinese voice
    const voices = window.speechSynthesis.getVoices();
    const zhVoice = voices.find(v => v.lang === 'zh-CN') ||
                    voices.find(v => v.lang.startsWith('zh'));
    if (zhVoice) utterance.voice = zhVoice;

    // Button animation
    if (options.button) {
      options.button.classList.add('playing');
      utterance.onend = () => options.button.classList.remove('playing');
      utterance.onerror = () => options.button.classList.remove('playing');
    }

    window.speechSynthesis.speak(utterance);
  }

  // Ensure voices loaded
  if ('speechSynthesis' in window) {
    window.speechSynthesis.onvoiceschanged = () => {
      window.speechSynthesis.getVoices();
    };
  }

  // --- Toast Notifications ---
  function _initToastContainer() {
    if (!document.querySelector('.toast-container')) {
      const container = document.createElement('div');
      container.className = 'toast-container';
      container.setAttribute('aria-live', 'polite');
      document.body.appendChild(container);
    }
  }

  function showToast(message, type = 'default', duration = 3000) {
    const container = document.querySelector('.toast-container');
    if (!container) return;

    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const icons = { success: '✓', error: '✗', warning: '⚠', default: 'ℹ' };
    toast.innerHTML = `<span>${icons[type] || icons.default}</span><span>${message}</span>`;

    container.appendChild(toast);
    requestAnimationFrame(() => toast.classList.add('show'));

    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, duration);
  }

  // --- Scroll Animations (IntersectionObserver) ---
  function _initScrollAnimations() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('in-view');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

    document.querySelectorAll('.scroll-animate').forEach(el => observer.observe(el));
    // Re-observe dynamically added elements
    window._scrollObserver = observer;
  }

  function observeElements(selector) {
    if (window._scrollObserver) {
      document.querySelectorAll(selector).forEach(el => {
        window._scrollObserver.observe(el);
      });
    }
  }

  // --- Back to Top ---
  function _initBackToTop() {
    const btn = document.createElement('button');
    btn.className = 'back-to-top';
    btn.innerHTML = '↑';
    btn.setAttribute('aria-label', 'Back to top');
    document.body.appendChild(btn);

    window.addEventListener('scroll', () => {
      btn.classList.toggle('visible', window.scrollY > 400);
    }, { passive: true });

    btn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  // --- Modal Management ---
  function openModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';

    // Close on overlay click
    modal.addEventListener('click', (e) => {
      if (e.target === modal) closeModal(modalId);
    });

    // Close on Escape
    const handler = (e) => {
      if (e.key === 'Escape') {
        closeModal(modalId);
        document.removeEventListener('keydown', handler);
      }
    };
    document.addEventListener('keydown', handler);
  }

  function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    if (!modal) return;
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  // --- Utility Functions ---
  function shuffleArray(array) {
    const arr = [...array];
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  function debounce(func, wait = 300) {
    let timeout;
    return function (...args) {
      clearTimeout(timeout);
      timeout = setTimeout(() => func.apply(this, args), wait);
    };
  }

  function formatDate(dateStr) {
    if (!dateStr) return '';
    return new Date(dateStr).toLocaleDateString('vi-VN', {
      year: 'numeric', month: 'long', day: 'numeric'
    });
  }

  function getHSKBadgeClass(level) {
    if (typeof level === 'string' && level.toLowerCase() === 'coffee') return 'badge-coffee';
    return `badge-hsk${level}`;
  }

  function getHSKLabel(level) {
    if (typeof level === 'string' && level.toLowerCase() === 'coffee') return 'Bổ sung · Cà phê';
    return `HSK ${level}`;
  }

  function createPagination(totalItems, itemsPerPage, currentPage, callback) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    if (totalPages <= 1) return '';

    let html = '<div class="pagination">';
    html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="(${callback.name || 'changePage'})(${currentPage - 1})">‹</button>`;

    const start = Math.max(1, currentPage - 2);
    const end = Math.min(totalPages, currentPage + 2);

    if (start > 1) {
      html += `<button class="pagination-btn" onclick="(${callback.name || 'changePage'})(1)">1</button>`;
      if (start > 2) html += `<span style="padding: 0 4px; color: var(--muted)">…</span>`;
    }

    for (let i = start; i <= end; i++) {
      html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="(${callback.name || 'changePage'})(${i})">${i}</button>`;
    }

    if (end < totalPages) {
      if (end < totalPages - 1) html += `<span style="padding: 0 4px; color: var(--muted)">…</span>`;
      html += `<button class="pagination-btn" onclick="(${callback.name || 'changePage'})(${totalPages})">${totalPages}</button>`;
    }

    html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="(${callback.name || 'changePage'})(${currentPage + 1})">›</button>`;
    html += '</div>';
    return html;
  }

  function getVocabById(id) {
    if (typeof VOCABULARY_DATA === 'undefined') return null;
    return VOCABULARY_DATA.find(w => w.id === id);
  }

  function renderVocabCard(word, options = {}) {
    const isLearned = StorageManager.isWordLearned(word.id);
    const isFav = StorageManager.isFavorite(word.id);
    const levelLabel = App.getHSKLabel(word.hsk);
    const badgeClass = App.getHSKBadgeClass(word.hsk);

    return `
      <div class="vocab-card scroll-animate" data-id="${word.id}" onclick="${options.onClick || `showWordDetail('${word.id}')`}">
        <div class="vocab-card-top">
          <div>
            <div class="chinese">${word.simplified}</div>
            <div class="pinyin">${word.pinyin}</div>
          </div>
          <div class="vocab-card-actions">
            <button class="audio-btn" onclick="event.stopPropagation(); App.speak('${word.simplified}', {button: this})" 
                    aria-label="Phát âm ${word.simplified}" title="Phát âm (giọng tổng hợp)">
              🔊
            </button>
            <button class="favorite-btn ${isFav ? 'active' : ''}" 
                    onclick="event.stopPropagation(); toggleFav('${word.id}', this)" 
                    aria-label="${isFav ? 'Bỏ yêu thích' : 'Thêm yêu thích'}">
              ${isFav ? '❤️' : '🤍'}
            </button>
          </div>
        </div>
        <div class="meaning">${word.meaningVi}</div>
        <div style="display:flex;align-items:center;gap:8px;margin-top:8px;">
          <span class="badge ${badgeClass}">${levelLabel}</span>
          <span class="word-type">${word.type}</span>
          ${isLearned ? '<span class="status-dot status-learned" title="Đã học"></span>' : ''}
        </div>
      </div>`;
  }

  return {
    init,
    speak,
    showToast,
    openModal,
    closeModal,
    shuffleArray,
    debounce,
    formatDate,
    getHSKBadgeClass,
    getHSKLabel,
    createPagination,
    getVocabById,
    renderVocabCard,
    observeElements
  };
})();

// Initialize when DOM ready
document.addEventListener('DOMContentLoaded', () => {
  App.init();
});
