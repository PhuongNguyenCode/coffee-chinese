/* ============================================
   COFFEE 中文 – Vocabulary Page Module
   Search, filter, sort, pagination, detail modal
   ============================================ */

const VocabularyPage = (() => {
  let filteredWords = [];
  let currentPage = 1;
  const ITEMS_PER_PAGE = 20;
  let currentSearch = '';
  let currentHSK = 'all';
  let currentTopic = 'all';
  let currentSort = 'default';

  function init() {
    filteredWords = [...VOCABULARY_DATA];
    _renderFilters();
    _renderWords();
    _bindEvents();
  }

  function _renderFilters() {
    const filterContainer = document.getElementById('filters');
    if (!filterContainer) return;

    const hskOptions = [
      { value: 'all', label: 'Tất cả HSK' },
      { value: '1', label: 'HSK 1' },
      { value: '2', label: 'HSK 2' },
      { value: '3', label: 'HSK 3' },
      { value: '4', label: 'HSK 4' },
      { value: '5', label: 'HSK 5' },
      { value: '6', label: 'HSK 6' },
      { value: 'coffee', label: '☕ Từ bổ sung · Cà phê' }
    ];

    const topicOptions = [{ value: 'all', label: 'Tất cả chủ đề' }];
    if (typeof TOPIC_LIST !== 'undefined') {
      TOPIC_LIST.forEach(t => topicOptions.push({ value: t.id, label: `${t.icon} ${t.nameVi}` }));
    }

    filterContainer.innerHTML = `
      <div class="filter-bar">
        <div class="search-bar">
          <span class="search-icon">🔍</span>
          <input type="text" id="vocabSearch" class="form-input" placeholder="Tìm kiếm tiếng Trung, Pinyin hoặc tiếng Việt..." aria-label="Tìm kiếm từ vựng">
        </div>
        <div class="filter-group">
          <label for="hskFilter" class="filter-label">HSK 2015 / Bổ sung:</label>
          <select id="hskFilter" class="form-select" aria-label="Lọc theo HSK">
            ${hskOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label for="topicFilter" class="filter-label">Chủ đề:</label>
          <select id="topicFilter" class="form-select" aria-label="Lọc theo chủ đề">
            ${topicOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label for="sortFilter" class="filter-label">Sắp xếp:</label>
          <select id="sortFilter" class="form-select" aria-label="Sắp xếp">
            <option value="default">Mặc định</option>
            <option value="pinyin-asc">Pinyin A-Z</option>
            <option value="pinyin-desc">Pinyin Z-A</option>
            <option value="hsk-asc">HSK Thấp → Cao</option>
            <option value="hsk-desc">HSK Cao → Thấp</option>
            <option value="learned">Đã học</option>
            <option value="unlearned">Chưa học</option>
          </select>
        </div>
      </div>
      <div id="filterInfo" class="mb-4" style="font-size:var(--text-sm);color:var(--muted);"></div>`;
  }

  function _applyFilters() {
    let words = [...VOCABULARY_DATA];

    // Search
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      words = words.filter(w =>
        w.simplified.includes(q) ||
        (w.traditional && w.traditional.includes(q)) ||
        w.pinyin.toLowerCase().includes(q) ||
        w.meaningVi.toLowerCase().includes(q) ||
        (w.meaningEn && w.meaningEn.toLowerCase().includes(q))
      );
    }

    // HSK filter
    if (currentHSK !== 'all') {
      words = words.filter(w => String(w.hsk) === currentHSK);
    }

    // Topic filter
    if (currentTopic !== 'all') {
      words = words.filter(w => w.topic === currentTopic);
    }

    // Sort
    switch (currentSort) {
      case 'pinyin-asc':
        words.sort((a, b) => a.pinyin.localeCompare(b.pinyin));
        break;
      case 'pinyin-desc':
        words.sort((a, b) => b.pinyin.localeCompare(a.pinyin));
        break;
      case 'hsk-asc':
        words.sort((a, b) => {
          const ha = a.hsk === 'coffee' ? 7 : a.hsk;
          const hb = b.hsk === 'coffee' ? 7 : b.hsk;
          return ha - hb;
        });
        break;
      case 'hsk-desc':
        words.sort((a, b) => {
          const ha = a.hsk === 'coffee' ? 7 : a.hsk;
          const hb = b.hsk === 'coffee' ? 7 : b.hsk;
          return hb - ha;
        });
        break;
      case 'learned':
        words.sort((a, b) => {
          const la = StorageManager.isWordLearned(a.id) ? 0 : 1;
          const lb = StorageManager.isWordLearned(b.id) ? 0 : 1;
          return la - lb;
        });
        break;
      case 'unlearned':
        words.sort((a, b) => {
          const la = StorageManager.isWordLearned(a.id) ? 1 : 0;
          const lb = StorageManager.isWordLearned(b.id) ? 1 : 0;
          return la - lb;
        });
        break;
    }

    filteredWords = words;
    currentPage = 1;
    _renderWords();
  }

  function _renderWords() {
    const container = document.getElementById('vocabGrid');
    const infoEl = document.getElementById('filterInfo');
    if (!container) return;

    const totalWords = filteredWords.length;
    const start = (currentPage - 1) * ITEMS_PER_PAGE;
    const end = start + ITEMS_PER_PAGE;
    const pageWords = filteredWords.slice(start, end);
    const learnedCount = filteredWords.filter(w => StorageManager.isWordLearned(w.id)).length;

    if (infoEl) {
      const displayStart = totalWords === 0 ? 0 : start + 1;
      infoEl.textContent = `Hiển thị ${displayStart}–${Math.min(end, totalWords)} / ${totalWords} từ vựng · ${learnedCount} đã học`;
    }

    if (pageWords.length === 0) {
      container.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">📖</div>
          <h3>Không tìm thấy từ vựng</h3>
          <p>Thử thay đổi bộ lọc hoặc từ khóa tìm kiếm.</p>
        </div>`;
      const paginationContainer = document.getElementById('vocabPagination');
      if (paginationContainer) paginationContainer.innerHTML = '';
      return;
    }

    container.innerHTML = `
      <div class="grid grid-3 gap-4 vocab-grid">
        ${pageWords.map(word => App.renderVocabCard(word)).join('')}
      </div>`;

    // Pagination
    const paginationContainer = document.getElementById('vocabPagination');
    if (paginationContainer) {
      const totalPages = Math.ceil(totalWords / ITEMS_PER_PAGE);
      if (totalPages <= 1) {
        paginationContainer.innerHTML = '';
        return;
      }
      let html = '<div class="pagination">';
      html += `<button class="pagination-btn" ${currentPage === 1 ? 'disabled' : ''} onclick="VocabularyPage.changePage(${currentPage - 1})">‹</button>`;
      const rangeStart = Math.max(1, currentPage - 2);
      const rangeEnd = Math.min(totalPages, currentPage + 2);
      if (rangeStart > 1) {
        html += `<button class="pagination-btn" onclick="VocabularyPage.changePage(1)">1</button>`;
        if (rangeStart > 2) html += `<span style="padding:0 4px;color:var(--muted)">…</span>`;
      }
      for (let i = rangeStart; i <= rangeEnd; i++) {
        html += `<button class="pagination-btn ${i === currentPage ? 'active' : ''}" onclick="VocabularyPage.changePage(${i})">${i}</button>`;
      }
      if (rangeEnd < totalPages) {
        if (rangeEnd < totalPages - 1) html += `<span style="padding:0 4px;color:var(--muted)">…</span>`;
        html += `<button class="pagination-btn" onclick="VocabularyPage.changePage(${totalPages})">${totalPages}</button>`;
      }
      html += `<button class="pagination-btn" ${currentPage === totalPages ? 'disabled' : ''} onclick="VocabularyPage.changePage(${currentPage + 1})">›</button>`;
      html += '</div>';
      paginationContainer.innerHTML = html;
    }

    App.observeElements('.scroll-animate');
  }

  function changePage(page) {
    currentPage = page;
    _renderWords();
    window.scrollTo({ top: document.getElementById('vocabGrid').offsetTop - 100, behavior: 'smooth' });
  }

  function _bindEvents() {
    const searchInput = document.getElementById('vocabSearch');
    const hskSelect = document.getElementById('hskFilter');
    const topicSelect = document.getElementById('topicFilter');
    const sortSelect = document.getElementById('sortFilter');

    if (searchInput) {
      searchInput.addEventListener('input', App.debounce((e) => {
        currentSearch = e.target.value.trim();
        _applyFilters();
      }, 300));
    }

    if (hskSelect) {
      hskSelect.addEventListener('change', (e) => {
        currentHSK = e.target.value;
        _applyFilters();
      });
    }

    if (topicSelect) {
      topicSelect.addEventListener('change', (e) => {
        currentTopic = e.target.value;
        _applyFilters();
      });
    }

    if (sortSelect) {
      sortSelect.addEventListener('change', (e) => {
        currentSort = e.target.value;
        _applyFilters();
      });
    }

    // Check URL params
    const params = new URLSearchParams(window.location.search);
    if (params.get('hsk')) {
      currentHSK = params.get('hsk');
      if (hskSelect) hskSelect.value = currentHSK;
    }
    if (params.get('topic')) {
      currentTopic = params.get('topic');
      if (topicSelect) topicSelect.value = currentTopic;
    }
    if (currentHSK !== 'all' || currentTopic !== 'all') {
      _applyFilters();
    }
  }

  return { init, changePage };
})();

// Global functions for vocab cards
function showWordDetail(wordId) {
  const word = App.getVocabById(wordId);
  if (!word) return;

  const isLearned = StorageManager.isWordLearned(wordId);
  const isFav = StorageManager.isFavorite(wordId);

  let modalEl = document.getElementById('wordDetailModal');
  if (!modalEl) {
    modalEl = document.createElement('div');
    modalEl.id = 'wordDetailModal';
    modalEl.className = 'modal-overlay';
    document.body.appendChild(modalEl);
  }

  modalEl.innerHTML = `
    <div class="modal" role="dialog" aria-modal="true">
      <div class="modal-header">
        <h3 style="font-family:var(--font-chinese);font-size:var(--text-2xl);">${word.simplified}</h3>
        <button class="modal-close" onclick="App.closeModal('wordDetailModal')" aria-label="Đóng">×</button>
      </div>
      <div class="modal-body">
        <div style="text-align:center;margin-bottom:var(--space-6);">
          <div style="font-size:3rem;margin-bottom:var(--space-2);">${word.icon || '📝'}</div>
          <div class="word-chinese" style="font-size:var(--text-5xl);">${word.simplified}</div>
          ${word.traditional !== word.simplified ? `<div style="color:var(--muted);font-size:var(--text-lg);">繁: ${word.traditional}</div>` : ''}
          <div class="word-pinyin" style="font-size:var(--text-xl);">${word.pinyin}</div>
          <button class="audio-btn" onclick="App.speak('${word.simplified}', {button:this})" style="margin:var(--space-3) auto;" aria-label="Phát âm" title="Phát âm (giọng tổng hợp trình duyệt)">🔊</button>
        </div>
        
        <div style="background:var(--cream);border-radius:var(--radius-md);padding:var(--space-4);margin-bottom:var(--space-4);">
          <div style="font-size:var(--text-xl);font-weight:600;color:var(--espresso);margin-bottom:var(--space-2);">
            ${word.meaningVi}
          </div>
          ${word.meaningEn ? `<div style="color:var(--muted);font-size:var(--text-sm);">${word.meaningEn}</div>` : ''}
          <div style="margin-top:var(--space-2);display:flex;gap:var(--space-2);align-items:center;">
            <span class="badge ${App.getHSKBadgeClass(word.hsk)}">${App.getHSKLabel(word.hsk)}</span>
            <span class="word-type">${word.type}</span>
          </div>
        </div>

        <div style="margin-bottom:var(--space-4);">
          <h4 style="font-size:var(--text-sm);font-weight:600;margin-bottom:var(--space-2);color:var(--muted);">VÍ DỤ</h4>
          <div style="background:var(--white);border:1px solid var(--cream-dark);border-radius:var(--radius-md);padding:var(--space-4);">
            <div style="font-family:var(--font-chinese);font-size:var(--text-lg);margin-bottom:var(--space-1);">${word.example}</div>
            <div style="color:var(--caramel);font-style:italic;font-size:var(--text-sm);margin-bottom:var(--space-1);">${word.examplePinyin}</div>
            <div style="color:var(--coffee-brown);font-size:var(--text-sm);">${word.exampleVi}</div>
            <button class="audio-btn btn-sm" onclick="App.speak('${word.example.replace(/'/g, "\\'")}', {button:this})" style="margin-top:var(--space-2);" aria-label="Phát âm ví dụ" title="Phát âm ví dụ">🔊</button>
          </div>
        </div>

        <div style="display:flex;gap:var(--space-3);flex-wrap:wrap;">
          <button class="btn ${isLearned ? 'btn-ghost' : 'btn-primary'}" onclick="toggleLearned('${wordId}')">
            ${isLearned ? '✓ Đã học' : '📝 Đánh dấu đã học'}
          </button>
          <button class="btn btn-ghost" onclick="toggleFav('${wordId}'); showWordDetail('${wordId}');">
            ${isFav ? '❤️ Bỏ yêu thích' : '🤍 Thêm yêu thích'}
          </button>
        </div>
      </div>
    </div>`;

  App.openModal('wordDetailModal');
}

function toggleFav(wordId, btnEl) {
  const isFav = StorageManager.toggleFavorite(wordId);
  if (btnEl) {
    btnEl.classList.toggle('active', isFav);
    btnEl.innerHTML = isFav ? '❤️' : '🤍';
    btnEl.setAttribute('aria-label', isFav ? 'Bỏ yêu thích' : 'Thêm yêu thích');
  }
  App.showToast(isFav ? 'Đã thêm vào yêu thích' : 'Đã bỏ yêu thích', isFav ? 'success' : 'default');
}

function toggleLearned(wordId) {
  const isLearned = StorageManager.isWordLearned(wordId);
  if (isLearned) {
    StorageManager.markWordUnlearned(wordId);
    App.showToast('Đã bỏ đánh dấu học', 'default');
  } else {
    StorageManager.markWordLearned(wordId);
    App.showToast('Đã đánh dấu là đã học!', 'success');
  }
  showWordDetail(wordId);
}

// Init on page load
document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('vocabGrid')) {
    VocabularyPage.init();
  }
});
