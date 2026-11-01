/* ============================================
   COFFEE 中文 – Listening Practice Module
   Luyện nghe phát âm, tùy chỉnh tốc độ, chế độ che chữ Hán & kiểm tra nghe
   ============================================ */

const ListeningApp = (() => {
  let currentSpeed = 1;
  let isBlindMode = false;
  let activeTab = 'sentences'; // 'sentences' | 'dialogues'
  let currentDialogueIndex = 0;

  // 10 câu luyện nghe ngắn chọn lọc trong bối cảnh cà phê
  const LISTENING_SENTENCES = [
    {
      id: 'ls-01',
      cn: '早上好！请给我一杯热美式咖啡，不加糖。',
      pinyin: 'Zǎoshang hǎo! Qǐng gěi wǒ yì bēi rè měishì kāfēi, bù jiā táng.',
      vi: 'Chào buổi sáng! Cho tôi một ly cà phê Americano nóng, không thêm đường.',
      question: 'Vị khách này muốn uống loại cà phê nào?',
      options: ['Latte đá thêm đường', 'Americano nóng không đường', 'Cappuccino ít bọt', 'Mocha đá'],
      correct: 1,
      explanation: 'Câu nói rõ: "热美式咖啡，不加糖" (Americano nóng, không thêm đường).'
    },
    {
      id: 'ls-02',
      cn: '这杯手冲咖啡带有清新的柑橘和茉莉花香。',
      pinyin: 'Zhè bēi shǒuchōng kāfēi dàiyǒu qīngxīn de gānjú hé mòlìhuā xiāng.',
      vi: 'Tách cà phê pha tay này mang theo hương cam quýt và hoa nhài thanh khiết.',
      question: 'Tách cà phê này có những nốt hương nào nổi bật?',
      options: ['Socola và caramel', 'Cam quýt và hoa nhài', 'Gỗ sồi và khói', 'Bơ và hạt dẻ'],
      correct: 1,
      explanation: 'Hương vị được nhắc đến là "柑橘" (cam quýt) và "茉莉花香" (hương hoa nhài).'
    },
    {
      id: 'ls-03',
      cn: '我们店里的意式浓缩是用百分之百阿拉比卡豆萃取的。',
      pinyin: 'Wǒmen diàn lǐ de yìshì nóngsuō shì yòng bǎifēnzhībǎi Ālābǐkǎ dòu cuìqǔ de.',
      vi: 'Espresso ở tiệm chúng tôi được chiết xuất từ 100% hạt Arabica.',
      question: 'Quán cà phê sử dụng loại hạt nào để pha Espresso?',
      options: ['100% hạt Robusta', 'Hạt hỗn hợp Arabica và Robusta', '100% hạt Arabica', 'Hạt cà phê Moka'],
      correct: 2,
      explanation: '"百分之百阿拉比卡豆" nghĩa là 100% hạt Arabica.'
    },
    {
      id: 'ls-04',
      cn: '如果您需要外带，自带杯可以享受立减五元的优惠。',
      pinyin: 'Rúguǒ nín xūyào wàidài, zìdài bēi kěyǐ xiǎngshòu lìjiǎn wǔ yuán de yōuhuì.',
      vi: 'Nếu quý khách mang về, tự mang theo bình cá nhân sẽ được giảm trực tiếp 5 tệ.',
      question: 'Để được giảm 5 tệ, khách hàng cần làm gì?',
      options: ['Mua từ hai ly trở lên', 'Tự mang theo cốc cá nhân', 'Đăng ký thẻ thành viên VIP', 'Thanh toán bằng tiền mặt'],
      correct: 1,
      explanation: '"自带杯" (tự mang cốc) được hưởng ưu đãi giảm giá.'
    },
    {
      id: 'ls-05',
      cn: '咖啡粉萃取前需要先进行三十秒的闷蒸。',
      pinyin: 'Kāfēifěn cuìqǔ qián xūyào xiān jìnxíng sānshí miǎo de mènzhēng.',
      vi: 'Bột cà phê trước khi chiết xuất cần được ủ nở trong vòng 30 giây.',
      question: 'Thời gian ủ nở (bloom) được nhắc đến là bao lâu?',
      options: ['15 giây', '30 giây', '45 giây', '60 giây'],
      correct: 1,
      explanation: '"三十秒的闷蒸" = ủ nở 30 giây.'
    },
    {
      id: 'ls-06',
      cn: '这台意式咖啡机的萃取压力保持在九个大气压。',
      pinyin: 'Zhè tái yìshì kāfēijī de cuìqǔ yālì bǎochí zài jiǔ gè dàqìyā.',
      vi: 'Áp suất chiết xuất của chiếc máy pha cà phê Espresso này được duy trì ở mức 9 bar.',
      question: 'Áp suất chiết xuất của máy pha là bao nhiêu?',
      options: ['6 bar', '9 bar', '12 bar', '15 bar'],
      correct: 1,
      explanation: '"九个大气压" = 9 bar áp suất tiêu chuẩn.'
    },
    {
      id: 'ls-07',
      cn: '如果您不喜欢喝太甜的，推荐您选择微糖或者无糖。',
      pinyin: 'Rúguǒ nín bù xǐhuan hē tài tián de, tuījiàn nín xuǎnzé wēitáng huòzhě wútáng.',
      vi: 'Nếu bạn không thích ngọt quá, khuyên bạn nên chọn mức ít đường hoặc không đường.',
      question: 'Barista gợi ý mức độ đường nào cho khách?',
      options: ['Toàn đường (100%)', 'Nửa đường (50%)', 'Ít đường (30%) hoặc không đường', 'Thêm siro mật ong'],
      correct: 2,
      explanation: '"微糖" (ít đường) hoặc "无糖" (không đường).'
    },
    {
      id: 'ls-08',
      cn: '云南保山的水洗咖啡豆酸质非常柔和，口感平衡。',
      pinyin: 'Yúnnán Bǎoshān de shuǐxǐ kāfēidòu suānzhì fēicháng róuhé, kǒugǎn pínghéng.',
      vi: 'Hạt cà phê chế biến ướt Bảo Sơn Vân Nam có vị chua rất êm dịu, hương vị cân bằng.',
      question: 'Hạt cà phê Bảo Sơn trong câu được mô tả thế nào?',
      options: ['Đắng gắt khó uống', 'Chua êm dịu, cân bằng', 'Rất ngọt béo ngậy', 'Có mùi khói đậm'],
      correct: 1,
      explanation: '"酸质非常柔和，口感平衡" = vị chua êm dịu, cân bằng.'
    }
  ];

  function init() {
    _renderSpeedControls();
    _renderSentencesTab();
    _bindEvents();
  }

  function _renderSpeedControls() {
    const container = document.getElementById('listeningControls');
    if (!container) return;

    container.innerHTML = `
      <div class="flex flex-wrap items-center justify-between gap-4 p-4 rounded-lg mb-6 shadow-sm" style="background:var(--white);border:1px solid var(--cream-dark);">
        <div class="flex items-center gap-3">
          <span style="font-weight:600;font-size:var(--text-sm);">Tốc độ giọng đọc:</span>
          <div class="speed-control">
            <button class="speed-btn ${currentSpeed === 0.75 ? 'active' : ''}" onclick="ListeningApp.setSpeed(0.75, this)">0.75x</button>
            <button class="speed-btn ${currentSpeed === 1 ? 'active' : ''}" onclick="ListeningApp.setSpeed(1, this)">1.0x</button>
            <button class="speed-btn ${currentSpeed === 1.25 ? 'active' : ''}" onclick="ListeningApp.setSpeed(1.25, this)">1.25x</button>
          </div>
        </div>

        <div class="flex items-center gap-3">
          <span style="font-weight:500;font-size:var(--text-sm);">Chế độ luyện nghe chép chính tả (Ẩn chữ Hán):</span>
          <label class="toggle-switch">
            <input type="checkbox" id="blindModeToggle" onchange="ListeningApp.toggleBlindMode(this.checked)">
            <span class="toggle-slider"></span>
          </label>
        </div>
      </div>
      <div class="text-xs text-muted mb-4 p-2 rounded" style="background:var(--cream);">
        ℹ️ <em>Lưu ý: Hệ thống sử dụng công nghệ chuyển văn bản thành giọng nói Web Speech Synthesis API chuẩn tiếng Trung phổ thông (zh-CN) của trình duyệt.</em>
      </div>
    `;
  }

  function setSpeed(speed, btnEl) {
    currentSpeed = speed;
    document.querySelectorAll('.speed-btn').forEach(b => b.classList.remove('active'));
    if (btnEl) btnEl.classList.add('active');
    App.showToast(`Đã đổi tốc độ phát: ${speed}x`, 'default');
  }

  function toggleBlindMode(checked) {
    isBlindMode = checked;
    document.querySelectorAll('.listen-text-box').forEach(el => {
      if (isBlindMode) {
        el.classList.add('hidden');
      } else {
        el.classList.remove('hidden');
      }
    });
    App.showToast(isBlindMode ? 'Đã bật chế độ Ẩn chữ - Nghe & Đoán' : 'Đã hiện chữ Hán & Pinyin', 'default');
  }

  function _renderSentencesTab() {
    const listContainer = document.getElementById('listeningContentList');
    if (!listContainer) return;

    listContainer.innerHTML = LISTENING_SENTENCES.map((item, index) => `
      <div class="card mb-6 shadow-card" id="listenCard_${item.id}">
        <div class="card-body">
          <div class="flex items-center justify-between mb-4">
            <span class="badge badge-hsk2">Câu ${index + 1}</span>
            <div class="flex items-center gap-2">
              <button class="btn btn-sm btn-caramel" onclick="ListeningApp.playAudio('${item.cn.replace(/'/g, "\\'")}', this)">
                🔊 Nghe Phát Âm
              </button>
              <button class="btn btn-sm btn-ghost" onclick="ListeningApp.revealText('${item.id}')">
                👁️ Hiện / Ẩn Chữ
              </button>
            </div>
          </div>

          <div class="listen-text-box ${isBlindMode ? 'hidden' : ''}" id="textBox_${item.id}" style="background:var(--cream);padding:var(--space-4);border-radius:var(--radius-md);margin-bottom:var(--space-4);">
            <div class="chinese-text text-xl font-medium mb-1">${item.cn}</div>
            <div class="pinyin-text text-sm mb-2">${item.pinyin}</div>
            <div class="vietnamese-text text-sm">${item.vi}</div>
          </div>

          <div class="p-4 rounded-md border" style="border-color:var(--cream-dark);background:var(--white);">
            <div class="font-semibold text-base mb-3">❓ Câu hỏi kiểm tra: ${item.question}</div>
            <div class="grid grid-2 gap-3" id="optionsBox_${item.id}">
              ${item.options.map((opt, i) => `
                <button class="quiz-option" onclick="ListeningApp.checkAnswer('${item.id}', ${i}, ${item.correct})">
                  ${opt}
                </button>
              `).join('')}
            </div>
            <div class="hidden mt-3 p-3 rounded text-sm" id="feedback_${item.id}"></div>
          </div>
        </div>
      </div>
    `).join('');
  }

  function playAudio(text, btnEl) {
    App.speak(text, { rate: currentSpeed, button: btnEl });
  }

  function revealText(id) {
    const box = document.getElementById(`textBox_${id}`);
    if (box) {
      box.classList.toggle('hidden');
    }
  }

  function checkAnswer(id, selected, correct) {
    const optionsBox = document.getElementById(`optionsBox_${id}`);
    const feedbackBox = document.getElementById(`feedback_${id}`);
    if (!optionsBox) return;

    const buttons = optionsBox.querySelectorAll('.quiz-option');
    buttons.forEach((btn, i) => {
      btn.disabled = true;
      if (i === correct) {
        btn.classList.add('correct');
      } else if (i === selected) {
        btn.classList.add('incorrect');
      }
    });

    if (feedbackBox) {
      feedbackBox.classList.remove('hidden');
      const item = LISTENING_SENTENCES.find(s => s.id === id);
      const isCorrect = selected === correct;
      feedbackBox.style.background = isCorrect ? '#E8F5E9' : '#FFEBEE';
      feedbackBox.style.color = isCorrect ? '#2E7D32' : '#C62828';
      feedbackBox.innerHTML = `<strong>${isCorrect ? '✓ Hoàn toàn chính xác!' : '✗ Chưa đúng!'}</strong> ${item.explanation}`;
    }
  }

  function _bindEvents() {
    const tabSentences = document.getElementById('tabSentencesBtn');
    const tabDialogues = document.getElementById('tabDialoguesBtn');

    if (tabSentences) {
      tabSentences.addEventListener('click', () => {
        activeTab = 'sentences';
        tabSentences.classList.add('active');
        if (tabDialogues) tabDialogues.classList.remove('active');
        _renderSentencesTab();
      });
    }

    if (tabDialogues) {
      tabDialogues.addEventListener('click', () => {
        activeTab = 'dialogues';
        tabDialogues.classList.add('active');
        if (tabSentences) tabSentences.classList.remove('active');
        _renderDialoguesTab();
      });
    }
  }

  function _renderDialoguesTab() {
    const listContainer = document.getElementById('listeningContentList');
    if (!listContainer || typeof CONVERSATIONS_DATA === 'undefined') return;

    listContainer.innerHTML = `
      <div class="mb-4">
        <label class="form-label">Chọn tình huống hội thoại để luyện nghe:</label>
        <select id="dialogueSelectBox" class="form-select mb-4" onchange="ListeningApp.selectDialogue(this.value)">
          ${CONVERSATIONS_DATA.map((c, i) => `<option value="${i}">${c.icon} ${c.title} (${c.titleCn})</option>`).join('')}
        </select>
      </div>
      <div id="dialoguePlayerBox"></div>
    `;

    _renderCurrentDialogue(0);
  }

  function selectDialogue(index) {
    currentDialogueIndex = parseInt(index, 10);
    _renderCurrentDialogue(currentDialogueIndex);
  }

  function _renderCurrentDialogue(idx) {
    const playerBox = document.getElementById('dialoguePlayerBox');
    if (!playerBox || typeof CONVERSATIONS_DATA === 'undefined') return;

    const conv = CONVERSATIONS_DATA[idx];

    playerBox.innerHTML = `
      <div class="card p-6 shadow-card animate-fade-in">
        <div class="flex items-center justify-between mb-6 pb-4 border-b">
          <div>
            <h3 class="font-heading text-2xl">${conv.icon} ${conv.title}</h3>
            <div class="chinese-text text-caramel text-lg">${conv.titleCn}</div>
          </div>
          <button class="btn btn-primary" onclick="ListeningApp.playFullDialogue(${idx})">
            ▶ Phát Toàn Bộ Hội Thoại
          </button>
        </div>

        <div class="conversation-thread max-w-2xl mx-auto">
          ${conv.lines.map((line, lIdx) => `
            <div class="conversation-bubble speaker-${line.speaker === 'customer' ? 'a' : 'b'} mb-4">
              <div class="flex items-center justify-between mb-1">
                <span class="speaker-name font-semibold text-xs">${line.speakerName}</span>
                <button class="audio-btn btn-sm" onclick="App.speak('${line.cn.replace(/'/g, "\\'")}', {rate: ${currentSpeed}, button: this})" title="Nghe câu này">🔊</button>
              </div>
              <div class="chinese-text text-xl mb-1">${line.cn}</div>
              <div class="pinyin-text text-sm mb-1">${line.pinyin}</div>
              <div class="vietnamese-text text-sm opacity-90">${line.vi}</div>
            </div>
          `).join('')}
        </div>
      </div>
    `;
  }

  function playFullDialogue(idx) {
    const conv = CONVERSATIONS_DATA[idx];
    if (!conv || !conv.lines) return;

    let lineIndex = 0;
    function playNextLine() {
      if (lineIndex >= conv.lines.length) {
        App.showToast('Đã phát xong toàn bộ đoạn hội thoại!', 'success');
        return;
      }
      const line = conv.lines[lineIndex];
      const utterance = new SpeechSynthesisUtterance(line.cn);
      utterance.lang = 'zh-CN';
      utterance.rate = currentSpeed;
      utterance.onend = () => {
        lineIndex++;
        setTimeout(playNextLine, 800);
      };
      window.speechSynthesis.speak(utterance);
    }

    window.speechSynthesis.cancel();
    playNextLine();
  }

  return {
    init,
    setSpeed,
    toggleBlindMode,
    playAudio,
    revealText,
    checkAnswer,
    selectDialogue,
    playFullDialogue
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('listeningControls')) {
    ListeningApp.init();
  }
});
