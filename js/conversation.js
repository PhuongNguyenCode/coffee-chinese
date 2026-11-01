/* ============================================
   COFFEE 中文 – Conversation & Roleplay Module
   10 Tình huống đối thoại thực tế, phát âm, từ vựng mới & tương tác nhập vai
   ============================================ */

const ConversationApp = (() => {
  let currentScenarioIndex = 0;
  let currentLineIndex = 0;
  let isRoleplayMode = false;
  let userRole = 'customer'; // 'customer' | 'barista'
  let roleplayHistory = [];

  function init() {
    _renderScenarioSelector();
    _loadScenario(0);
  }

  function _renderScenarioSelector() {
    const listEl = document.getElementById('scenarioList');
    if (!listEl || typeof CONVERSATIONS_DATA === 'undefined') return;

    listEl.innerHTML = CONVERSATIONS_DATA.map((conv, i) => `
      <div class="card card-flat p-4 mb-3 cursor-pointer scenario-item ${i === 0 ? 'active' : ''}" 
           id="scenarioItem_${i}" onclick="ConversationApp.switchScenario(${i})">
        <div class="flex items-center gap-3">
          <div style="font-size:1.8rem;">${conv.icon}</div>
          <div style="flex:1;">
            <div class="font-semibold text-base">${conv.title}</div>
            <div class="chinese-text text-caramel text-sm">${conv.titleCn}</div>
          </div>
          <span class="badge ${App.getHSKBadgeClass(conv.level)}">HSK ${conv.level}</span>
        </div>
      </div>
    `).join('');
  }

  function switchScenario(index) {
    currentScenarioIndex = index;
    currentLineIndex = 0;
    isRoleplayMode = false;
    roleplayHistory = [];

    document.querySelectorAll('.scenario-item').forEach(el => el.classList.remove('active'));
    const target = document.getElementById(`scenarioItem_${index}`);
    if (target) target.classList.add('active');

    _loadScenario(index);
  }

  function _loadScenario(index) {
    const stage = document.getElementById('conversationStage');
    if (!stage || typeof CONVERSATIONS_DATA === 'undefined') return;

    const conv = CONVERSATIONS_DATA[index];

    stage.innerHTML = `
      <div class="card p-6 shadow-card animate-fade-in">
        <!-- Tiêu đề & Chế độ -->
        <div class="flex flex-wrap items-center justify-between gap-4 mb-6 pb-4 border-b">
          <div>
            <span class="badge ${App.getHSKBadgeClass(conv.level)} mb-2">Cấp độ: HSK ${conv.level}</span>
            <h2 class="font-heading text-3xl">${conv.icon} ${conv.title}</h2>
            <div class="chinese-text text-caramel text-xl font-medium">${conv.titleCn}</div>
            <p class="text-muted text-sm mt-1">${conv.description}</p>
          </div>
          <div class="flex items-center gap-2">
            <button class="btn ${!isRoleplayMode ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="ConversationApp.setMode(false)">
              📖 Chế Độ Học Tập
            </button>
            <button class="btn ${isRoleplayMode ? 'btn-primary' : 'btn-secondary'} btn-sm" onclick="ConversationApp.setMode(true)">
              🎭 Chế Độ Nhập Vai (Role-play)
            </button>
          </div>
        </div>

        <!-- Khung kịch bản -->
        <div id="conversationDisplayArea">
          ${!isRoleplayMode ? _renderStudyMode(conv) : _renderRoleplayMode(conv)}
        </div>
      </div>
    `;
  }

  function setMode(roleplay) {
    isRoleplayMode = roleplay;
    currentLineIndex = 0;
    roleplayHistory = [];
    _loadScenario(currentScenarioIndex);
  }

  function _renderStudyMode(conv) {
    return `
      <div class="max-w-3xl mx-auto">
        <div class="conversation-thread mb-6">
          ${conv.lines.map((line, i) => `
            <div class="conversation-bubble speaker-${line.speaker === 'customer' ? 'a' : 'b'} mb-6 p-5">
              <div class="flex items-center justify-between mb-2">
                <span class="speaker-name font-bold text-xs" style="color:var(--caramel-dark);">
                  ${line.speakerName} (${line.speaker === 'customer' ? '顾客' : '咖啡师'})
                </span>
                <button class="audio-btn btn-sm" onclick="App.speak('${line.cn.replace(/'/g, "\\'")}', {button: this})" title="Phát âm câu này">
                  🔊
                </button>
              </div>
              <div class="chinese-text text-2xl font-medium mb-1">${line.cn}</div>
              <div class="pinyin-text text-base mb-2">${line.pinyin}</div>
              <div class="vietnamese-text text-base opacity-90 mb-3">${line.vi}</div>

              ${line.newWords && line.newWords.length > 0 ? `
                <div class="p-3 rounded text-xs" style="background:rgba(184, 121, 69, 0.08);border-left:3px solid var(--caramel);">
                  <strong class="text-caramel">Từ mới trong câu:</strong>
                  <div class="flex flex-wrap gap-3 mt-1">
                    ${line.newWords.map(nw => `
                      <span><b class="chinese-text text-sm">${nw.word}</b> (${nw.pinyin}): ${nw.meaning}</span>
                    `).join(' · ')}
                  </div>
                </div>
              ` : ''}
            </div>
          `).join('')}
        </div>

        <div class="flex justify-between items-center pt-4 border-t">
          <button class="btn btn-secondary" ${currentScenarioIndex === 0 ? 'disabled' : ''} onclick="ConversationApp.switchScenario(${currentScenarioIndex - 1})">
            ← Tình huống trước
          </button>
          <button class="btn btn-caramel" onclick="ConversationApp.playAllLines()">
            ▶ Đọc Tự Động Toàn Bài
          </button>
          <button class="btn btn-primary" ${currentScenarioIndex === CONVERSATIONS_DATA.length - 1 ? 'disabled' : ''} onclick="ConversationApp.switchScenario(${currentScenarioIndex + 1})">
            Tình huống kế tiếp →
          </button>
        </div>
      </div>
    `;
  }

  function _renderRoleplayMode(conv) {
    return `
      <div class="max-w-2xl mx-auto">
        <!-- Chọn vai diễn -->
        <div class="p-4 rounded-lg mb-6 flex items-center justify-between" style="background:var(--cream);">
          <span class="font-semibold text-sm">Chọn vai của bạn:</span>
          <div class="flex gap-2">
            <button class="chip ${userRole === 'customer' ? 'active' : ''}" onclick="ConversationApp.selectRole('customer')">
              🧑 Khách Hàng (顾客)
            </button>
            <button class="chip ${userRole === 'barista' ? 'active' : ''}" onclick="ConversationApp.selectRole('barista')">
              ☕ Barista (咖啡师)
            </button>
          </div>
        </div>

        <!-- Màn hình chat mô phỏng -->
        <div id="roleplayChatBox" class="p-4 rounded-lg mb-6 border" style="min-height:280px;max-height:420px;overflow-y:auto;background:var(--white);border-color:var(--cream-dark);">
          <div class="text-center text-muted text-xs mb-4">
            — Bắt đầu kịch bản mô phỏng giao tiếp —
          </div>
          ${roleplayHistory.map(item => `
            <div class="conversation-bubble speaker-${item.role === 'customer' ? 'a' : 'b'} mb-3">
              <div class="speaker-name text-xs">${item.speakerName}</div>
              <div class="chinese-text text-xl mb-1">${item.cn}</div>
              <div class="pinyin-text text-sm mb-1">${item.pinyin}</div>
              <div class="vietnamese-text text-sm">${item.vi}</div>
            </div>
          `).join('')}
        </div>

        <!-- Khu vực chọn câu trả lời của người dùng -->
        <div class="p-4 rounded-lg border shadow-sm" style="background:var(--white);border-color:var(--cream-dark);">
          <div class="font-semibold text-sm mb-3">
            Lựa chọn câu phản hồi của bạn (${userRole === 'customer' ? 'Khách hàng' : 'Barista'}):
          </div>
          <div class="flex flex-col gap-2" id="roleplayChoiceOptions">
            ${_renderRoleplayChoices(conv)}
          </div>
        </div>
      </div>
    `;
  }

  function _renderRoleplayChoices(conv) {
    const choices = conv.roleplayOptions ? conv.roleplayOptions[userRole] : [];
    if (!choices || choices.length === 0) {
      return `<div class="text-sm text-muted">Không có tùy chọn đối thoại thêm cho vai này.</div>`;
    }

    return choices.map((opt, i) => `
      <button class="quiz-option text-left p-3" onclick="ConversationApp.chooseDialogueOption(${i})">
        <div class="chinese-text font-medium text-lg">${opt.cn}</div>
        <div class="pinyin-text text-xs">${opt.pinyin}</div>
        <div class="vietnamese-text text-xs text-muted">${opt.vi}</div>
      </button>
    `).join('');
  }

  function selectRole(role) {
    userRole = role;
    roleplayHistory = [];
    _loadScenario(currentScenarioIndex);
  }

  function chooseDialogueOption(optionIndex) {
    const conv = CONVERSATIONS_DATA[currentScenarioIndex];
    const userChoices = conv.roleplayOptions[userRole];
    const selected = userChoices[optionIndex];

    // Đưa lời của người dùng vào lịch sử
    roleplayHistory.push({
      role: userRole,
      speakerName: userRole === 'customer' ? 'Bạn (Khách hàng)' : 'Bạn (Barista)',
      cn: selected.cn,
      pinyin: selected.pinyin,
      vi: selected.vi
    });

    // Phát âm câu nói của người dùng
    App.speak(selected.cn);

    // Mô phỏng phản hồi tự động của bên còn lại
    const oppositeRole = userRole === 'customer' ? 'barista' : 'customer';
    const oppositeChoices = conv.roleplayOptions[oppositeRole];

    if (oppositeChoices && oppositeChoices.length > 0) {
      setTimeout(() => {
        const reply = oppositeChoices[Math.floor(Math.random() * oppositeChoices.length)];
        roleplayHistory.push({
          role: oppositeRole,
          speakerName: oppositeRole === 'customer' ? 'Khách hàng (顾客)' : 'Barista (咖啡师)',
          cn: reply.cn,
          pinyin: reply.pinyin,
          vi: reply.vi
        });
        App.speak(reply.cn);
        _refreshRoleplayBox();
      }, 1000);
    }

    _refreshRoleplayBox();
  }

  function _refreshRoleplayBox() {
    const chatBox = document.getElementById('roleplayChatBox');
    if (!chatBox) return;

    chatBox.innerHTML = `
      <div class="text-center text-muted text-xs mb-4">— Kịch bản tương tác —</div>
      ${roleplayHistory.map(item => `
        <div class="conversation-bubble speaker-${item.role === 'customer' ? 'a' : 'b'} mb-3">
          <div class="speaker-name text-xs">${item.speakerName}</div>
          <div class="chinese-text text-xl mb-1">${item.cn}</div>
          <div class="pinyin-text text-sm mb-1">${item.pinyin}</div>
          <div class="vietnamese-text text-sm">${item.vi}</div>
        </div>
      `).join('')}
    `;
    chatBox.scrollTop = chatBox.scrollHeight;
  }

  function playAllLines() {
    const conv = CONVERSATIONS_DATA[currentScenarioIndex];
    if (!conv || !conv.lines) return;

    let idx = 0;
    function play() {
      if (idx >= conv.lines.length) {
        App.showToast('Đã đọc xong toàn bộ tình huống!', 'success');
        return;
      }
      const line = conv.lines[idx];
      const u = new SpeechSynthesisUtterance(line.cn);
      u.lang = 'zh-CN';
      u.rate = 0.95;
      u.onend = () => {
        idx++;
        setTimeout(play, 900);
      };
      window.speechSynthesis.speak(u);
    }

    window.speechSynthesis.cancel();
    play();
  }

  return {
    init,
    switchScenario,
    setMode,
    selectRole,
    chooseDialogueOption,
    playAllLines
  };
})();

document.addEventListener('DOMContentLoaded', () => {
  if (document.getElementById('scenarioList')) {
    ConversationApp.init();
  }
});
