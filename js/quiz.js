/* ============================================
   COFFEE 中文 – Quiz Application Module
   7 định dạng bài tập kiểm tra, đồng hồ, chấm điểm và lưu lịch sử
   ============================================ */

const QuizApp = (() => {
  let questions = [];
  let currentQuestionIndex = 0;
  let userAnswers = [];
  let score = 0;
  let timerInterval = null;
  let timeLeft = 30;
  let isTimerEnabled = false;
  let selectedLevel = 'all';
  let selectedTopic = 'all';
  let selectedType = 'mixed';
  let questionCount = 10;
  let arrangeSelectedWords = [];

  function init() {
    _renderConfigForm();
    _bindConfigEvents();
  }

  function _renderConfigForm() {
    const configContainer = document.getElementById('quizConfig');
    if (!configContainer) return;

    const topicOptions = [{ value: 'all', label: 'Tất cả chủ đề' }];
    if (typeof TOPIC_LIST !== 'undefined') {
      TOPIC_LIST.forEach(t => topicOptions.push({ value: t.id, label: `${t.icon} ${t.nameVi}` }));
    }

    configContainer.innerHTML = `
      <div class="card p-6 max-w-2xl mx-auto shadow-card">
        <h3 class="mb-4 text-center font-heading">⚙️ Thiết Lập Bài Kiểm Tra</h3>
        <div class="grid grid-2 gap-4 mb-4">
          <div class="form-group">
            <label class="form-label" for="quizTypeSelect">Dạng câu hỏi:</label>
            <select id="quizTypeSelect" class="form-select">
              <option value="mixed">🌟 Tổng hợp tất cả các dạng</option>
              <option value="cn-to-vi">🇨🇳 Chữ Hán ➡️ Nghĩa tiếng Việt</option>
              <option value="vi-to-cn">🇻🇳 Tiếng Việt ➡️ Chọn Chữ Hán</option>
              <option value="pinyin-to-cn">🔤 Pinyin ➡️ Chọn Chữ Hán</option>
              <option value="listening">🎧 Luyện nghe phát âm</option>
              <option value="fill-blank">✏️ Điền từ vào chỗ trống</option>
              <option value="arrange">🔀 Sắp xếp trật tự câu</option>
              <option value="image-vocab">🖼️ Nhìn biểu tượng đoán từ</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="quizLevelSelect">Cấp độ HSK:</label>
            <select id="quizLevelSelect" class="form-select">
              <option value="all">Tất cả cấp độ</option>
              <option value="1">HSK 1</option>
              <option value="2">HSK 2</option>
              <option value="3">HSK 3</option>
              <option value="4">HSK 4</option>
              <option value="5">HSK 5</option>
              <option value="6">HSK 6</option>
              <option value="coffee">☕ Từ vựng Cà phê chuyên sâu</option>
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="quizTopicSelect">Chủ đề bài học:</label>
            <select id="quizTopicSelect" class="form-select">
              ${topicOptions.map(t => `<option value="${t.value}">${t.label}</option>`).join('')}
            </select>
          </div>
          <div class="form-group">
            <label class="form-label" for="quizCountSelect">Số lượng câu:</label>
            <select id="quizCountSelect" class="form-select">
              <option value="10">10 câu hỏi</option>
              <option value="15">15 câu hỏi</option>
              <option value="20">20 câu hỏi</option>
            </select>
          </div>
        </div>
        <div class="flex items-center justify-between mb-6 p-4 rounded-md" style="background:var(--cream);">
          <div>
            <div style="font-weight:600;font-size:var(--text-sm);">Bật đồng hồ đếm ngược</div>
            <div style="font-size:var(--text-xs);color:var(--muted);">30 giây cho mỗi câu hỏi</div>
          </div>
          <label class="toggle-switch">
            <input type="checkbox" id="quizTimerToggle">
            <span class="toggle-slider"></span>
          </label>
        </div>
        <button id="startQuizBtn" class="btn btn-primary w-full py-3 font-semibold" style="width:100%;">
          Bắt Đầu Làm Bài Kiểm Tra →
        </button>
      </div>
    `;
  }

  function _bindConfigEvents() {
    const startBtn = document.getElementById('startQuizBtn');
    if (!startBtn) return;

    startBtn.addEventListener('click', () => {
      selectedType = document.getElementById('quizTypeSelect').value;
      selectedLevel = document.getElementById('quizLevelSelect').value;
      selectedTopic = document.getElementById('quizTopicSelect').value;
      questionCount = parseInt(document.getElementById('quizCountSelect').value, 10);
      isTimerEnabled = document.getElementById('quizTimerToggle').checked;

      _generateAndStartQuiz();
    });

    // Kiểm tra query parameter ví dụ ?level=1
    const params = new URLSearchParams(window.location.search);
    if (params.get('level')) {
      const lvl = params.get('level');
      const lvlSelect = document.getElementById('quizLevelSelect');
      if (lvlSelect) lvlSelect.value = lvl;
    }
  }

  function _generateAndStartQuiz() {
    if (typeof VOCABULARY_DATA === 'undefined' || typeof QuizGenerator === 'undefined') {
      App.showToast('Không tải được dữ liệu bài tập!', 'error');
      return;
    }

    let words = [...VOCABULARY_DATA];
    if (selectedLevel !== 'all') {
      words = words.filter(w => String(w.hsk) === selectedLevel);
    }
    if (selectedTopic !== 'all') {
      words = words.filter(w => w.topic === selectedTopic);
    }

    if (words.length < 4 && selectedType !== 'fill-blank' && selectedType !== 'arrange') {
      App.showToast('Số từ vựng thuộc nhóm này không đủ 4 từ để tạo đáp án trắc nghiệm. Vui lòng chọn mở rộng cấp độ!', 'warning');
      return;
    }

    switch (selectedType) {
      case 'cn-to-vi':
        questions = QuizGenerator.generateCnToVi(words, questionCount);
        break;
      case 'vi-to-cn':
        questions = QuizGenerator.generateViToCn(words, questionCount);
        break;
      case 'pinyin-to-cn':
        questions = QuizGenerator.generatePinyinToCn(words, questionCount);
        break;
      case 'listening':
        questions = QuizGenerator.generateListening(words, questionCount);
        break;
      case 'fill-blank':
        questions = QuizGenerator.generateFillBlank(questionCount);
        break;
      case 'arrange':
        questions = QuizGenerator.generateArrange(questionCount);
        break;
      case 'image-vocab':
        questions = QuizGenerator.generateImageVocab(words, questionCount);
        break;
      case 'mixed':
      default:
        questions = QuizGenerator.generateMixed(words, questionCount);
        break;
    }

    if (questions.length === 0) {
      App.showToast('Không thể tạo câu hỏi từ cấu hình này!', 'error');
      return;
    }

    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;

    document.getElementById('quizConfig').classList.add('hidden');
    document.getElementById('quizPlayArea').classList.remove('hidden');

    _renderQuestion(currentQuestionIndex);
  }

  function _renderQuestion(idx) {
    _stopTimer();
    const q = questions[idx];
    const playArea = document.getElementById('quizQuestionContainer');
    const progressEl = document.getElementById('quizProgressTracker');
    if (!playArea) return;

    if (progressEl) {
      progressEl.innerHTML = `
        <div class="flex items-center justify-between mb-2">
          <span style="font-size:var(--text-sm);font-weight:600;">Câu ${idx + 1} / ${questions.length}</span>
          ${isTimerEnabled ? `<div class="quiz-timer" id="quizTimerDisplay">⏱ <span id="timerSec">30</span>s</div>` : ''}
        </div>
        <div class="quiz-progress-bar">
          ${questions.map((_, i) => {
            let status = '';
            if (i < idx) {
              status = userAnswers[i]?.isCorrect ? 'correct' : 'incorrect';
            } else if (i === idx) {
              status = 'answered';
            }
            return `<div class="quiz-progress-dot ${status}"></div>`;
          }).join('')}
        </div>
      `;
    }

    let qBody = '';
    const hasAnswered = userAnswers[idx] !== null;

    if (q.type === QUIZ_TYPES.LISTENING) {
      qBody = `
        <div class="text-center py-4">
          <div style="font-size:var(--text-lg);color:var(--muted);margin-bottom:12px;">Bấm nút để nghe đoạn âm thanh phát âm:</div>
          <button class="btn btn-caramel btn-lg" onclick="App.speak('${q.audioText}', {button: this})">
            🔊 Bấm để Nghe (zh-CN)
          </button>
        </div>
        <div class="grid grid-2 gap-3 mt-6">
          ${q.options.map((opt, i) => `
            <button class="quiz-option ${hasAnswered ? (i === q.correctIndex ? 'correct' : (userAnswers[idx].selected === i ? 'incorrect' : '')) : ''}"
                    onclick="QuizApp.handleOptionSelect(${i})" ${hasAnswered ? 'disabled' : ''}>
              ${opt}
            </button>
          `).join('')}
        </div>
      `;
    } else if (q.type === QUIZ_TYPES.IMAGE_VOCAB) {
      qBody = `
        <div class="text-center py-4">
          <div style="font-size:4.5rem;margin-bottom:8px;">${q.icon}</div>
          <div style="color:var(--muted);font-size:var(--text-sm);">Gợi ý ý nghĩa: ${q.hint}</div>
        </div>
        <div class="grid grid-2 gap-3 mt-4">
          ${q.options.map((opt, i) => `
            <button class="quiz-option ${hasAnswered ? (i === q.correctIndex ? 'correct' : (userAnswers[idx].selected === i ? 'incorrect' : '')) : ''}"
                    onclick="QuizApp.handleOptionSelect(${i})" ${hasAnswered ? 'disabled' : ''}>
              <span class="chinese-text font-medium text-lg">${opt}</span>
            </button>
          `).join('')}
        </div>
      `;
    } else if (q.type === QUIZ_TYPES.FILL_BLANK) {
      qBody = `
        <div class="text-center py-4">
          <div class="chinese-text text-3xl font-semibold mb-2">${q.sentence}</div>
          <div class="pinyin-text text-base mb-1">${q.sentencePinyin}</div>
          <div class="vietnamese-text text-sm">${q.vi}</div>
        </div>
        <div class="grid grid-2 gap-3 mt-4">
          ${q.options.map((opt, i) => `
            <button class="quiz-option ${hasAnswered ? (opt === q.answer ? 'correct' : (userAnswers[idx].selectedText === opt ? 'incorrect' : '')) : ''}"
                    onclick="QuizApp.handleFillBlankSelect('${opt}')" ${hasAnswered ? 'disabled' : ''}>
              <span class="chinese-text font-medium text-lg">${opt}</span>
            </button>
          `).join('')}
        </div>
      `;
    } else if (q.type === QUIZ_TYPES.ARRANGE) {
      qBody = `
        <div class="text-center py-4">
          <div style="color:var(--muted);font-size:var(--text-sm);margin-bottom:4px;">Hãy nhấp vào các từ để ghép thành câu hoàn chỉnh:</div>
          <div class="vietnamese-text font-semibold text-lg mb-4">"${q.vi}"</div>
          <div id="arrangeOutputBox" class="p-4 border-2 border-dashed rounded-lg mb-4 text-center chinese-text text-2xl font-semibold" style="min-height:56px;border-color:var(--latte);background:var(--cream);">
            ${hasAnswered ? userAnswers[idx].selectedText : arrangeSelectedWords.join('')}
          </div>
          ${!hasAnswered ? `
            <div class="flex flex-wrap gap-2 justify-center mb-4">
              ${q.words.map((w, i) => `
                <button class="chip font-medium text-base py-2 px-4" id="arrBtn_${i}" onclick="QuizApp.clickArrangeWord('${w}', 'arrBtn_${i}')">
                  ${w}
                </button>
              `).join('')}
            </div>
            <div class="flex gap-3 justify-center">
              <button class="btn btn-secondary btn-sm" onclick="QuizApp.resetArrange()">↺ Làm lại câu này</button>
              <button class="btn btn-primary btn-sm" onclick="QuizApp.submitArrange()">Xác nhận đáp án</button>
            </div>
          ` : ''}
        </div>
      `;
    } else {
      // Dạng trắc nghiệm 4 đáp án thông thường
      qBody = `
        <div class="text-center py-4">
          <div class="chinese-text text-4xl font-semibold mb-2">${q.question}</div>
          ${q.questionPinyin ? `<div class="pinyin-text text-lg mb-1">${q.questionPinyin}</div>` : ''}
          ${q.questionMeaning ? `<div class="vietnamese-text text-sm">${q.questionMeaning}</div>` : ''}
        </div>
        <div class="grid grid-2 gap-3 mt-4">
          ${q.options.map((opt, i) => `
            <button class="quiz-option ${hasAnswered ? (i === q.correctIndex ? 'correct' : (userAnswers[idx].selected === i ? 'incorrect' : '')) : ''}"
                    onclick="QuizApp.handleOptionSelect(${i})" ${hasAnswered ? 'disabled' : ''}>
              <span class="${q.type === 'vi-to-cn' || q.type === 'pinyin-to-cn' ? 'chinese-text font-medium text-lg' : ''}">${opt}</span>
            </button>
          `).join('')}
        </div>
      `;
    }

    playArea.innerHTML = `
      <div class="card p-6 shadow-card animate-fade-in">
        ${qBody}
        ${hasAnswered ? `
          <div class="mt-6 p-4 rounded-md ${userAnswers[idx].isCorrect ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}" style="background:${userAnswers[idx].isCorrect ? '#E8F5E9' : '#FFEBEE'};color:${userAnswers[idx].isCorrect ? '#2E7D32' : '#C62828'};">
            <div class="font-semibold text-base mb-1">
              ${userAnswers[idx].isCorrect ? '✓ Chính xác!' : '✗ Chưa đúng!'}
            </div>
            <div class="text-sm">${q.explanation || ''}</div>
          </div>
          <div class="mt-6 text-right">
            ${idx < questions.length - 1 ? `
              <button class="btn btn-primary" onclick="QuizApp.nextQuestion()">Câu Tiếp Theo →</button>
            ` : `
              <button class="btn btn-caramel" onclick="QuizApp.showFinalResults()">Xem Kết Quả Cuối Cùng 🏁</button>
            `}
          </div>
        ` : ''}
      </div>
    `;

    if (isTimerEnabled && !hasAnswered) {
      _startTimer();
    }
  }

  function _startTimer() {
    timeLeft = 30;
    const display = document.getElementById('timerSec');
    const timerBox = document.getElementById('quizTimerDisplay');
    if (timerInterval) clearInterval(timerInterval);

    timerInterval = setInterval(() => {
      timeLeft--;
      if (display) display.textContent = timeLeft;
      if (timerBox) {
        if (timeLeft <= 5) timerBox.className = 'quiz-timer danger';
        else if (timeLeft <= 10) timerBox.className = 'quiz-timer warning';
      }

      if (timeLeft <= 0) {
        _stopTimer();
        _handleTimeOut();
      }
    }, 1000);
  }

  function _stopTimer() {
    if (timerInterval) {
      clearInterval(timerInterval);
      timerInterval = null;
    }
  }

  function _handleTimeOut() {
    App.showToast('Hết thời gian trả lời!', 'warning');
    const q = questions[currentQuestionIndex];
    userAnswers[currentQuestionIndex] = {
      isCorrect: false,
      selected: -1,
      selectedText: 'Hết giờ'
    };
    _renderQuestion(currentQuestionIndex);
  }

  function handleOptionSelect(optIndex) {
    if (userAnswers[currentQuestionIndex] !== null) return;
    _stopTimer();
    const q = questions[currentQuestionIndex];
    const isCorrect = optIndex === q.correctIndex;
    if (isCorrect) score++;

    userAnswers[currentQuestionIndex] = {
      isCorrect,
      selected: optIndex,
      selectedText: q.options[optIndex]
    };

    _renderQuestion(currentQuestionIndex);
  }

  function handleFillBlankSelect(optText) {
    if (userAnswers[currentQuestionIndex] !== null) return;
    _stopTimer();
    const q = questions[currentQuestionIndex];
    const isCorrect = optText === q.answer;
    if (isCorrect) score++;

    userAnswers[currentQuestionIndex] = {
      isCorrect,
      selectedText: optText
    };

    _renderQuestion(currentQuestionIndex);
  }

  function clickArrangeWord(word, btnId) {
    arrangeSelectedWords.push(word);
    const btn = document.getElementById(btnId);
    if (btn) {
      btn.disabled = true;
      btn.style.opacity = '0.3';
    }
    const box = document.getElementById('arrangeOutputBox');
    if (box) box.textContent = arrangeSelectedWords.join('');
  }

  function resetArrange() {
    arrangeSelectedWords = [];
    const q = questions[currentQuestionIndex];
    q.words.forEach((_, i) => {
      const btn = document.getElementById(`arrBtn_${i}`);
      if (btn) {
        btn.disabled = false;
        btn.style.opacity = '1';
      }
    });
    const box = document.getElementById('arrangeOutputBox');
    if (box) box.textContent = '';
  }

  function submitArrange() {
    if (userAnswers[currentQuestionIndex] !== null) return;
    if (arrangeSelectedWords.length === 0) {
      App.showToast('Vui lòng chọn các từ trước khi xác nhận!', 'warning');
      return;
    }
    _stopTimer();
    const q = questions[currentQuestionIndex];
    const builtSentence = arrangeSelectedWords.join('');
    const cleanCorrect = q.correct.replace(/[。？！]/g, '');
    const cleanBuilt = builtSentence.replace(/[。？！]/g, '');

    const isCorrect = cleanBuilt === cleanCorrect;
    if (isCorrect) score++;

    userAnswers[currentQuestionIndex] = {
      isCorrect,
      selectedText: builtSentence
    };

    arrangeSelectedWords = [];
    _renderQuestion(currentQuestionIndex);
  }

  function nextQuestion() {
    if (currentQuestionIndex < questions.length - 1) {
      currentQuestionIndex++;
      _renderQuestion(currentQuestionIndex);
    } else {
      showFinalResults();
    }
  }

  function showFinalResults() {
    _stopTimer();
    const playArea = document.getElementById('quizPlayArea');
    if (!playArea) return;

    const percentage = Math.round((score / questions.length) * 100);

    // Lưu vào LocalStorage
    StorageManager.addQuizResult({
      score: score,
      total: questions.length,
      percentage: percentage,
      type: selectedType,
      level: selectedLevel
    });

    playArea.innerHTML = `
      <div class="card p-8 text-center max-w-xl mx-auto shadow-card animate-fade-in">
        <div class="text-5xl mb-4">${percentage >= 80 ? '🏆' : (percentage >= 50 ? '☕' : '🌱')}</div>
        <h2 class="font-heading mb-2">Hoàn Thành Bài Kiểm Tra!</h2>
        <p class="text-muted mb-6">Bạn đã nỗ lực rất tuyệt vời trên hành trình chinh phục tiếng Trung cà phê.</p>
        
        <div class="quiz-score-circle">
          <div class="score-value">${percentage}%</div>
          <div class="score-label">${score} / ${questions.length} câu đúng</div>
        </div>

        <div class="grid grid-2 gap-4 mb-6 text-left">
          <div class="p-4 rounded-md" style="background:#E8F5E9;">
            <div style="font-size:var(--text-xs);color:#2E7D32;font-weight:600;">SỐ CÂU ĐÚNG</div>
            <div style="font-size:var(--text-2xl);font-weight:700;color:#2E7D32;">${score} câu</div>
          </div>
          <div class="p-4 rounded-md" style="background:#FFEBEE;">
            <div style="font-size:var(--text-xs);color:#C62828;font-weight:600;">SỐ CÂU SAI</div>
            <div style="font-size:var(--text-2xl);font-weight:700;color:#C62828;">${questions.length - score} câu</div>
          </div>
        </div>

        <div class="flex gap-4 justify-center">
          <button class="btn btn-secondary" onclick="QuizApp.restartQuiz()">🔄 Làm Lại Lượt Này</button>
          <a href="quiz.html" class="btn btn-primary">Tạo Bài Mới ⚙️</a>
          <a href="progress.html" class="btn btn-ghost">Xem Tiến Độ 📊</a>
        </div>
      </div>
    `;
  }

  function restartQuiz() {
    currentQuestionIndex = 0;
    userAnswers = new Array(questions.length).fill(null);
    score = 0;
    _renderQuestion(0);
  }

  return {
    init,
    handleOptionSelect,
    handleFillBlankSelect,
    clickArrangeWord,
    resetArrange,
    submitArrange,
    nextQuestion,
    showFinalResults,
    restartQuiz
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('quizConfig')) {
    QuizApp.init();
  }
});
