/* ============================================
   COFFEE 中文 – Flashcards Module
   Lật thẻ 3D, chọn cấp độ/chủ đề, auto-play, lưu tiến độ
   ============================================ */

const FlashcardsApp = (() => {
  let deck = [];
  let currentIndex = 0;
  let isFlipped = false;
  let autoPlayTimer = null;
  let isAutoPlaying = false;
  let currentHSK = 'all';
  let currentTopic = 'all';

  function init() {
    _renderFilters();
    _applyFilters();
    _bindEvents();
  }

  function _renderFilters() {
    const filterContainer = document.getElementById('flashcardFilters');
    if (!filterContainer) return;

    const hskOptions = [
      { value: 'all', label: 'Tất cả cấp độ' },
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
      <div class="filter-bar justify-center">
        <div class="filter-group">
          <label for="fcHskFilter" class="filter-label">HSK 2015 / Bổ sung:</label>
          <select id="fcHskFilter" class="form-select">
            ${hskOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <label for="fcTopicFilter" class="filter-label">Chủ đề:</label>
          <select id="fcTopicFilter" class="form-select">
            ${topicOptions.map(o => `<option value="${o.value}">${o.label}</option>`).join('')}
          </select>
        </div>
        <div class="filter-group">
          <button id="fcShuffleBtn" class="btn btn-secondary btn-sm" title="Xáo trộn danh sách thẻ">🔀 Xáo thẻ</button>
        </div>
      </div>
    `;

    document.getElementById('fcHskFilter').addEventListener('change', (e) => {
      currentHSK = e.target.value;
      _applyFilters();
    });

    document.getElementById('fcTopicFilter').addEventListener('change', (e) => {
      currentTopic = e.target.value;
      _applyFilters();
    });

    document.getElementById('fcShuffleBtn').addEventListener('click', () => {
      deck = App.shuffleArray(deck);
      currentIndex = 0;
      isFlipped = false;
      _renderCurrentCard();
      App.showToast('Đã xáo trộn danh sách thẻ!', 'default');
    });
  }

  function _applyFilters() {
    if (typeof VOCABULARY_DATA === 'undefined') return;

    let words = [...VOCABULARY_DATA];
    if (currentHSK !== 'all') {
      words = words.filter(w => String(w.hsk) === currentHSK);
    }
    if (currentTopic !== 'all') {
      words = words.filter(w => w.topic === currentTopic);
    }

    deck = words;
    currentIndex = 0;
    isFlipped = false;
    _renderCurrentCard();
  }

  function _renderCurrentCard() {
    const cardContainer = document.getElementById('flashcardBox');
    const counterEl = document.getElementById('cardCounter');
    const knownBtn = document.getElementById('markKnownBtn');
    const reviewBtn = document.getElementById('markReviewBtn');
    if (!cardContainer) return;

    if (deck.length === 0) {
      cardContainer.innerHTML = `
        <div class="empty-state">
          <div class="empty-state-icon">🃏</div>
          <h3>Không có thẻ nào phù hợp</h3>
          <p>Vui lòng chọn bộ lọc khác để tiếp tục học.</p>
        </div>`;
      if (counterEl) counterEl.textContent = '0 / 0';
      return;
    }

    const word = deck[currentIndex];
    const isLearned = StorageManager.isWordLearned(word.id);
    const badgeClass = App.getHSKBadgeClass(word.hsk);
    const badgeLabel = App.getHSKLabel(word.hsk);

    if (counterEl) {
      counterEl.textContent = `${currentIndex + 1} / ${deck.length}`;
    }

    const cardHtml = `
      <div class="flashcard-container" id="fcWrapper" onclick="FlashcardsApp.flipCard()">
        <div class="flashcard ${isFlipped ? 'flipped' : ''}" id="mainFlashcard">
          <!-- Mặt trước -->
          <div class="flashcard-face flashcard-front">
            <div style="position:absolute;top:20px;left:24px;display:flex;align-items:center;gap:8px;">
              <span class="badge ${badgeClass}">${badgeLabel}</span>
              <span style="font-size:0.85rem;color:var(--latte);opacity:0.8;">${word.type}</span>
            </div>
            <div style="position:absolute;top:20px;right:24px;">
              <button class="audio-btn" onclick="event.stopPropagation(); App.speak('${word.simplified}', {button: this})" title="Nghe phát âm">🔊</button>
            </div>
            <div style="font-size:3rem;margin-bottom:8px;">${word.icon || '☕'}</div>
            <div class="card-chinese">${word.simplified}</div>
            <div class="card-hint">Nhấp vào thẻ hoặc bấm phím Cách để xem mặt sau</div>
          </div>
          <!-- Mặt sau -->
          <div class="flashcard-face flashcard-back">
            <div style="position:absolute;top:16px;right:20px;">
              <button class="audio-btn" onclick="event.stopPropagation(); App.speak('${word.simplified}', {button: this})" title="Nghe phát âm">🔊</button>
            </div>
            <div class="card-pinyin">${word.pinyin}</div>
            <div class="card-meaning">${word.meaningVi}</div>
            ${word.meaningEn ? `<div style="font-size:0.9rem;color:var(--muted);margin-top:-8px;margin-bottom:12px;">${word.meaningEn}</div>` : ''}
            <div class="card-example">
              <div class="example-chinese">${word.example}</div>
              <div style="color:var(--caramel);font-style:italic;font-size:0.85rem;margin-bottom:4px;">${word.examplePinyin}</div>
              <div style="color:var(--coffee-brown);font-size:0.85rem;">${word.exampleVi}</div>
            </div>
          </div>
        </div>
      </div>
    `;

    cardContainer.innerHTML = cardHtml;

    // Cập nhật nút trạng thái
    if (knownBtn) {
      knownBtn.className = `btn btn-sm ${isLearned ? 'btn-primary' : 'btn-secondary'}`;
      knownBtn.innerHTML = isLearned ? '✓ Đã thuộc' : 'Đánh dấu Đã thuộc';
    }
  }

  function flipCard() {
    isFlipped = !isFlipped;
    const cardEl = document.getElementById('mainFlashcard');
    if (cardEl) {
      cardEl.classList.toggle('flipped', isFlipped);
    }
  }

  function nextCard() {
    if (deck.length === 0) return;
    isFlipped = false;
    currentIndex = (currentIndex + 1) % deck.length;
    _renderCurrentCard();
  }

  function prevCard() {
    if (deck.length === 0) return;
    isFlipped = false;
    currentIndex = (currentIndex - 1 + deck.length) % deck.length;
    _renderCurrentCard();
  }

  function markCurrentKnown() {
    if (deck.length === 0) return;
    const word = deck[currentIndex];
    StorageManager.markWordLearned(word.id);
    App.showToast(`Đã thuộc từ: ${word.simplified} (${word.meaningVi})`, 'success');
    _renderCurrentCard();
    setTimeout(() => nextCard(), 400);
  }

  function toggleAutoPlay(btnEl) {
    isAutoPlaying = !isAutoPlaying;
    if (isAutoPlaying) {
      if (btnEl) {
        btnEl.classList.add('btn-caramel');
        btnEl.classList.remove('btn-secondary');
        btnEl.innerHTML = '⏸ Dừng tự chuyển';
      }
      autoPlayTimer = setInterval(() => {
        if (!isFlipped) {
          flipCard();
        } else {
          nextCard();
        }
      }, 3500);
      App.showToast('Bật chế độ tự động chuyển thẻ', 'default');
    } else {
      if (btnEl) {
        btnEl.classList.remove('btn-caramel');
        btnEl.classList.add('btn-secondary');
        btnEl.innerHTML = '▶ Tự động chuyển thẻ';
      }
      clearInterval(autoPlayTimer);
      autoPlayTimer = null;
      App.showToast('Đã dừng tự chuyển', 'default');
    }
  }

  function _bindEvents() {
    // Điều hướng bằng phím mũi tên & phím cách
    window.addEventListener('keydown', (e) => {
      if (['INPUT', 'TEXTAREA', 'SELECT'].includes(e.target.tagName)) return;
      if (e.code === 'Space') {
        e.preventDefault();
        flipCard();
      } else if (e.code === 'ArrowRight') {
        e.preventDefault();
        nextCard();
      } else if (e.code === 'ArrowLeft') {
        e.preventDefault();
        prevCard();
      }
    });

    const prevBtn = document.getElementById('prevCardBtn');
    const nextBtn = document.getElementById('nextCardBtn');
    const knownBtn = document.getElementById('markKnownBtn');
    const autoBtn = document.getElementById('autoPlayBtn');

    if (prevBtn) prevBtn.addEventListener('click', prevCard);
    if (nextBtn) nextBtn.addEventListener('click', nextCard);
    if (knownBtn) knownBtn.addEventListener('click', markCurrentKnown);
    if (autoBtn) autoBtn.addEventListener('click', function() { toggleAutoPlay(this); });
  }

  return { init, flipCard, nextCard, prevCard, markCurrentKnown, toggleAutoPlay };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('flashcardBox')) {
    FlashcardsApp.init();
  }
});
