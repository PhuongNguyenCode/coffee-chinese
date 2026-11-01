/* ============================================
   COFFEE 中文 – Writing & Composition Practice Module
   Luyện viết chữ Hán, gợi ý Pinyin, sắp xếp câu và hoàn thành câu
   ============================================ */

const WritingApp = (() => {
  let mode = 'vocab'; // 'vocab' | 'sentence' | 'complete'
  let currentWords = [];
  let currentIndex = 0;
  let showHint = false;

  // Danh sách câu mẫu cho bài tập sắp xếp và hoàn thành câu
  const SENTENCE_TASKS = [
    {
      id: 'w-s1',
      vi: 'Tôi muốn gọi một ly cà phê Americano đá.',
      words: ['我想', '点', '一杯', '冰', '美式咖啡'],
      correct: '我想点一杯冰美式咖啡',
      pinyin: 'Wǒ xiǎng diǎn yì bēi bīng měishì kāfēi.',
      explanation: 'Cấu trúc: Chủ ngữ (我想) + Động từ (点) + Lượng từ (一杯) + Tính từ (冰) + Danh từ (美式咖啡).'
    },
    {
      id: 'w-s2',
      vi: 'Hạt Arabica thơm hơn hạt Robusta.',
      words: ['阿拉比卡豆', '比', '罗布斯塔豆', '更', '香'],
      correct: '阿拉比卡豆比罗布斯塔豆更香',
      pinyin: 'Ālābǐkǎ dòu bǐ Luóbùsītǎ dòu gèng xiāng.',
      explanation: 'Cấu trúc so sánh chữ 比: A + 比 + B + 更 / 很 + Tính từ.'
    },
    {
      id: 'w-s3',
      vi: 'Ly cà phê này không đắng chút nào.',
      words: ['这杯', '咖啡', '一点儿', '也', '不苦'],
      correct: '这杯咖啡一点儿也不苦',
      pinyin: 'Zhè bēi kāfēi yìdiǎnr yě bù kǔ.',
      explanation: 'Cấu trúc phủ định hoàn toàn: 一点儿也不 + Tính từ (Không hề... chút nào).'
    },
    {
      id: 'w-s4',
      vi: 'Barista dùng ấm rót cổ ngỗng để châm nước.',
      words: ['咖啡师', '用', '手冲壶', '注水'],
      correct: '咖啡师用手冲壶注水',
      pinyin: 'Kāfēishī yòng shǒuchōnghú zhùshuǐ.',
      explanation: 'Cấu trúc phương tiện: Chủ ngữ + 用 + Dụng cụ + Động từ.'
    }
  ];

  const COMPLETE_TASKS = [
    {
      id: 'w-c1',
      prompt: 'Diễn đạt: "Xin hỏi một ly cà phê này bao nhiêu tiền?"',
      template: '请问这杯咖啡___钱？',
      missing: '多少',
      pinyinHint: 'duōshao',
      vi: 'Điền từ để hỏi số lượng/giá cả.',
      explanation: '多少钱 (duōshao qián) là cụm từ chuẩn mực để hỏi giá tiền.'
    },
    {
      id: 'w-c2',
      prompt: 'Diễn đạt: "Tôi muốn đổi thành sữa yến mạch."',
      template: '我想换成___奶。',
      missing: '燕麦',
      pinyinHint: 'yànmài',
      vi: 'Điền tên loại ngũ cốc dùng làm sữa hạt nổi tiếng.',
      explanation: '燕麦 (yànmài) nghĩa là yến mạch (Oat).'
    },
    {
      id: 'w-c3',
      prompt: 'Diễn đạt: "Cà phê Pour-over cần duy trì dòng nước ổn định."',
      template: '手冲咖啡需要保持水流___。',
      missing: '稳定',
      pinyinHint: 'wěndìng',
      vi: 'Điền tính từ mang nghĩa "ổn định, không dao động".',
      explanation: '稳定 (wěndìng) nghĩa là ổn định, vững vàng.'
    }
  ];

  function init() {
    _bindNavTabs();
    _loadVocabMode();
  }

  function _bindNavTabs() {
    const tabVocab = document.getElementById('tabWriteVocab');
    const tabSentence = document.getElementById('tabWriteSentence');
    const tabComplete = document.getElementById('tabWriteComplete');

    if (tabVocab) {
      tabVocab.addEventListener('click', () => {
        mode = 'vocab';
        _setActiveTab(tabVocab);
        _loadVocabMode();
      });
    }

    if (tabSentence) {
      tabSentence.addEventListener('click', () => {
        mode = 'sentence';
        _setActiveTab(tabSentence);
        _loadSentenceMode();
      });
    }

    if (tabComplete) {
      tabComplete.addEventListener('click', () => {
        mode = 'complete';
        _setActiveTab(tabComplete);
        _loadCompleteMode();
      });
    }
  }

  function _setActiveTab(activeBtn) {
    document.querySelectorAll('.writing-tab-btn').forEach(btn => btn.classList.remove('active'));
    activeBtn.classList.add('active');
  }

  /* 1. Luyện viết từ vựng Chữ Hán */
  function _loadVocabMode() {
    if (typeof VOCABULARY_DATA === 'undefined') return;
    currentWords = App.shuffleArray(VOCABULARY_DATA).slice(0, 20);
    currentIndex = 0;
    showHint = false;
    _renderVocabQuestion();
  }

  function _renderVocabQuestion() {
    const stage = document.getElementById('writingStage');
    if (!stage) return;

    const word = currentWords[currentIndex];

    stage.innerHTML = `
      <div class="card p-8 max-w-xl mx-auto shadow-card animate-fade-in text-center">
        <div class="text-xs text-muted mb-2">Câu hỏi ${currentIndex + 1} / ${currentWords.length}</div>
        <div class="text-4xl mb-3">${word.icon || '☕'}</div>
        <div class="text-xs uppercase font-semibold text-caramel tracking-wide mb-1">${word.type} · ${App.getHSKLabel(word.hsk)}</div>
        <h2 class="font-heading text-3xl font-bold mb-4" style="color:var(--espresso);">${word.meaningVi}</h2>

        ${showHint ? `
          <div class="p-3 mb-4 rounded-md inline-block animate-fade-in" style="background:var(--cream);color:var(--caramel);">
            <strong>Gợi ý Pinyin:</strong> ${word.pinyin}
          </div>
        ` : `
          <div class="mb-4">
            <button class="btn btn-ghost btn-sm" onclick="WritingApp.toggleHint()">💡 Xem gợi ý Pinyin</button>
          </div>
        `}

        <div class="writing-input-area mb-4">
          <input type="text" id="hanziInput" class="writing-input" placeholder="Gõ chữ Hán vào đây (Ví dụ: 咖啡)..." autocomplete="off" autofocus>
        </div>

        <div class="flex gap-3 justify-center mb-6">
          <button class="btn btn-secondary" onclick="WritingApp.skipWord()">Bỏ Qua ⏭</button>
          <button class="btn btn-primary" onclick="WritingApp.checkHanziAnswer()">Kiểm Tra Đáp Án ✓</button>
        </div>

        <div id="writingFeedbackBox" class="hidden"></div>
      </div>
    `;

    const input = document.getElementById('hanziInput');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') {
          checkHanziAnswer();
        }
      });
    }
  }

  function toggleHint() {
    showHint = true;
    _renderVocabQuestion();
  }

  function checkHanziAnswer() {
    const input = document.getElementById('hanziInput');
    const feedback = document.getElementById('writingFeedbackBox');
    if (!input || !feedback) return;

    const val = input.value.trim();
    if (!val) {
      App.showToast('Vui lòng gõ chữ Hán cần kiểm tra!', 'warning');
      return;
    }

    const word = currentWords[currentIndex];
    const isCorrect = val === word.simplified || val === word.traditional;

    input.className = `writing-input ${isCorrect ? 'correct' : 'incorrect'}`;
    feedback.className = `writing-feedback ${isCorrect ? 'success' : 'error'}`;
    feedback.innerHTML = `
      <div class="font-bold mb-1">${isCorrect ? '✓ Hoàn toàn chính xác!' : '✗ Chưa đúng rồi!'}</div>
      <div>Đáp án đúng: <b class="chinese-text text-xl">${word.simplified}</b> (${word.pinyin})</div>
      <div class="text-xs text-muted mt-1">Ví dụ: ${word.example}</div>
      <div class="mt-4">
        <button class="btn btn-sm btn-primary" onclick="WritingApp.nextWord()">Câu Kế Tiếp →</button>
      </div>
    `;

    if (isCorrect) {
      StorageManager.markWordLearned(word.id);
      App.speak(word.simplified);
    }
  }

  function skipWord() {
    nextWord();
  }

  function nextWord() {
    if (currentIndex < currentWords.length - 1) {
      currentIndex++;
      showHint = false;
      _renderVocabQuestion();
    } else {
      App.showToast('Bạn đã hoàn thành phiên luyện viết từ vựng này!', 'success');
      _loadVocabMode();
    }
  }

  /* 2. Luyện sắp xếp câu */
  let userArrangedWords = [];
  function _loadSentenceMode() {
    currentIndex = 0;
    userArrangedWords = [];
    _renderSentenceQuestion();
  }

  function _renderSentenceQuestion() {
    const stage = document.getElementById('writingStage');
    if (!stage) return;

    const task = SENTENCE_TASKS[currentIndex];
    const shuffled = App.shuffleArray(task.words);

    stage.innerHTML = `
      <div class="card p-8 max-w-2xl mx-auto shadow-card animate-fade-in">
        <div class="text-xs text-muted mb-2 text-center">Câu ${currentIndex + 1} / ${SENTENCE_TASKS.length}</div>
        <h3 class="font-heading text-2xl text-center mb-2">Sắp Xếp Từ Thành Câu Hoàn Chỉnh</h3>
        <p class="text-center font-medium text-lg mb-6" style="color:var(--espresso);">"${task.vi}"</p>

        <div id="arrangeDropArea" class="p-4 border-2 border-dashed rounded-lg mb-6 text-center chinese-text text-2xl font-semibold" style="min-height:64px;border-color:var(--latte);background:var(--cream);">
          ${userArrangedWords.join(' ')}
        </div>

        <div class="flex flex-wrap gap-2 justify-center mb-6" id="wordsBank">
          ${shuffled.map((w, i) => `
            <button class="chip font-medium text-lg py-2 px-4" id="wb_${i}" onclick="WritingApp.clickWordChip('${w}', 'wb_${i}')">
              ${w}
            </button>
          `).join('')}
        </div>

        <div class="flex gap-3 justify-center mb-4">
          <button class="btn btn-secondary" onclick="WritingApp.resetSentence()">↺ Làm lại</button>
          <button class="btn btn-primary" onclick="WritingApp.checkSentence()">Xác Nhận Đáp Án</button>
        </div>

        <div id="sentenceFeedbackBox" class="hidden"></div>
      </div>
    `;
  }

  function clickWordChip(word, btnId) {
    userArrangedWords.push(word);
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.3';
    }
    const drop = document.getElementById('arrangeDropArea');
    if (drop) drop.textContent = userArrangedWords.join(' ');
  }

  function resetSentence() {
    userArrangedWords = [];
    _renderSentenceQuestion();
  }

  function checkSentence() {
    const task = SENTENCE_TASKS[currentIndex];
    const built = userArrangedWords.join('');
    const cleanCorrect = task.correct.replace(/\s+/g, '');
    const cleanBuilt = built.replace(/\s+/g, '');

    const isCorrect = cleanBuilt === cleanCorrect;
    const fb = document.getElementById('sentenceFeedbackBox');
    if (!fb) return;

    fb.className = `writing-feedback ${isCorrect ? 'success' : 'error'}`;
    fb.innerHTML = `
      <div class="font-bold mb-1">${isCorrect ? '✓ Ghép câu rất chuẩn xác!' : '✗ Trật tự câu chưa đúng rồi!'}</div>
      <div>Câu chuẩn: <b class="chinese-text text-xl">${task.correct}。</b></div>
      <div class="pinyin-text text-sm my-1">${task.pinyin}</div>
      <div class="text-xs text-muted">${task.explanation}</div>
      <div class="mt-4">
        ${currentIndex < SENTENCE_TASKS.length - 1 ? `
          <button class="btn btn-primary btn-sm" onclick="WritingApp.nextSentence()">Câu Kế Tiếp →</button>
        ` : `
          <div class="text-sm font-semibold text-success">Đã hoàn thành toàn bộ bài tập sắp xếp câu!</div>
        `}
      </div>
    `;
    fb.classList.remove('hidden');

    if (isCorrect) {
      App.speak(task.correct);
    }
  }

  function nextSentence() {
    currentIndex++;
    userArrangedWords = [];
    _renderSentenceQuestion();
  }

  /* 3. Hoàn thành câu (Fill missing) */
  function _loadCompleteMode() {
    currentIndex = 0;
    _renderCompleteQuestion();
  }

  function _renderCompleteQuestion() {
    const stage = document.getElementById('writingStage');
    if (!stage) return;

    const task = COMPLETE_TASKS[currentIndex];

    stage.innerHTML = `
      <div class="card p-8 max-w-xl mx-auto shadow-card animate-fade-in text-center">
        <div class="text-xs text-muted mb-2">Câu ${currentIndex + 1} / ${COMPLETE_TASKS.length}</div>
        <h3 class="font-heading text-2xl mb-2">Điền Từ Vào Câu Hoàn Chỉnh</h3>
        <p class="text-muted text-sm mb-4">${task.prompt}</p>

        <div class="p-4 rounded-md mb-6" style="background:var(--cream);">
          <div class="chinese-text text-3xl font-semibold mb-2">${task.template}</div>
          <div class="text-xs text-muted">Gợi ý: ${task.vi} (${task.pinyinHint})</div>
        </div>

        <div class="writing-input-area mb-4">
          <input type="text" id="completeInput" class="writing-input" placeholder="Gõ từ còn thiếu..." autofocus>
        </div>

        <div class="flex gap-3 justify-center mb-4">
          <button class="btn btn-primary" onclick="WritingApp.checkComplete()">Kiểm Tra Đáp Án</button>
        </div>

        <div id="completeFeedbackBox" class="hidden"></div>
      </div>
    `;

    const input = document.getElementById('completeInput');
    if (input) {
      input.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') checkComplete();
      });
    }
  }

  function checkComplete() {
    const input = document.getElementById('completeInput');
    const fb = document.getElementById('completeFeedbackBox');
    if (!input || !fb) return;

    const val = input.value.trim();
    const task = COMPLETE_TASKS[currentIndex];
    const isCorrect = val === task.missing;

    input.className = `writing-input ${isCorrect ? 'correct' : 'incorrect'}`;
    fb.className = `writing-feedback ${isCorrect ? 'success' : 'error'}`;
    fb.innerHTML = `
      <div class="font-bold mb-1">${isCorrect ? '✓ Điền từ rất chính xác!' : '✗ Chưa đúng!'}</div>
      <div>Từ cần điền: <b class="chinese-text text-xl">${task.missing}</b> (${task.pinyinHint})</div>
      <div class="text-xs text-muted mt-1">${task.explanation}</div>
      <div class="mt-4">
        ${currentIndex < COMPLETE_TASKS.length - 1 ? `
          <button class="btn btn-primary btn-sm" onclick="WritingApp.nextComplete()">Câu Kế Tiếp →</button>
        ` : `
          <div class="text-sm font-semibold text-success">Đã hoàn thành xuất sắc các bài tập hoàn thành câu!</div>
        `}
      </div>
    `;
    fb.classList.remove('hidden');

    if (isCorrect) {
      App.speak(task.template.replace('___', task.missing));
    }
  }

  function nextComplete() {
    currentIndex++;
    _renderCompleteQuestion();
  }

  return {
    init,
    toggleHint,
    checkHanziAnswer,
    skipWord,
    nextWord,
    clickWordChip,
    resetSentence,
    checkSentence,
    nextSentence,
    checkComplete,
    nextComplete
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('writingStage')) {
    WritingApp.init();
  }
});
