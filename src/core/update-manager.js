function confirmUpdate(opts) {
    const {
      name, currentVersion, manifest, i18n = {},
      mandatory = manifest.mandatory === true
    } = opts;
  
    const t = Object.assign({
      title: '업데이트 준비 완료',
      primary: '지금 업데이트',
      later: '나중에',
      skip: '이번 버전 건너뛰기',
      notes: '노트 보기'
    }, i18n);
  
    const root = document.createElement('div');
    root.setAttribute('role', 'dialog');
    root.setAttribute('aria-modal', 'true');
    root.style.cssText = `
      position: fixed; inset: 0; z-index: 2147483646;
      display: grid; place-items: center;
      background: rgba(0,0,0,.4);
    `;
  
    const style = document.createElement('style');
    style.textContent = `
      .cu-card { width: min(520px, 92vw); border-radius: 16px; padding: 20px;
        background: var(--bg, #111); color: var(--fg, #eaeaea);
        box-shadow: 0 10px 30px rgba(0,0,0,.35); transform: scale(.97);
        animation: cu-pop .16s ease-out forwards;
      }
      .cu-title { display:flex; justify-content:space-between; align-items:center; gap:12px; }
      .cu-title h3 { margin: 0; font-size: 18px; font-weight:700; }
      .cu-pill { font: 12px/1.8 system-ui; padding: 0 8px; border-radius: 999px;
        background: #2a2a2a; color: #cfcfcf; }
      .cu-sub { margin: 8px 0 12px; color: #9aa0a6; font: 13px/1.5 system-ui; }
      .cu-list { margin: 10px 0 16px; padding-left: 18px; max-height: 180px; overflow:auto; }
      .cu-list li { margin: 6px 0; }
      .cu-list .feat::marker { content: "✨ "; }
      .cu-list .fix::marker  { content: "🔧 "; }
      .cu-list .perf::marker { content: "⚡ "; }
      .cu-list .break::marker{ content: "⚠️ "; }
      .cu-actions { display:flex; gap:8px; justify-content:flex-end; }
      .cu-btn { border: 0; padding: 10px 12px; border-radius: 10px; cursor: pointer; font-weight:600; }
      .cu-btn.primary { background:#4f7cff; color:white; }
      .cu-btn.ghost { background:transparent; color:#cfcfcf; }
      .cu-btn:hover { filter: brightness(1.05); }
      @media (prefers-color-scheme: light) {
        :root { --bg: #fff; --fg:#111; }
        .cu-card { background: #fff; color:#111; }
        .cu-pill { background:#eef2ff; color:#1f3fb3; }
        .cu-sub { color:#4b5563; }
      }
      @media (prefers-reduced-motion: reduce) {
        .cu-card { animation: none; transform:none; }
      }
      @keyframes cu-pop { to { transform: scale(1); } }
    `;
    root.appendChild(style);
  
    const card = document.createElement('div');
    card.className = 'cu-card';
    card.innerHTML = `
      <div class="cu-title">
        <h3>${t.title}${name ? ` · ${name}` : ''}</h3>
        <span class="cu-pill">v${currentVersion} → v${manifest.version}</span>
      </div>
      <div class="cu-sub">
        ${new Date(manifest.released_at || Date.now()).toLocaleDateString()} ·
        ${manifest.mandatory ? '필수 업데이트' : '선택 업데이트'}
      </div>
      <ul class="cu-list" aria-label="변경사항">
        ${(manifest.notes || []).slice(0,8).map(n =>
          `<li class="${(n.type||'').trim()}">${escapeHtml(n.text||'')}</li>`
        ).join('') || '<li>세부 변경사항은 릴리스 노트를 참고해</li>'}
      </ul>
      <div class="cu-actions">
        ${!mandatory ? `<button class="cu-btn ghost js-later">${t.later}</button>` : ''}
        ${!mandatory ? `<button class="cu-btn ghost js-skip">${t.skip}</button>` : ''}
        <button class="cu-btn primary js-update">${t.primary}</button>
      </div>
    `;
    root.appendChild(card);
  
    const p = new Promise(resolve => {
      const onCleanup = (result) => {
        document.removeEventListener('keydown', onKey);
        root.remove();
        resolve(result);
      };
      const onKey = (e) => {
        if (e.key === 'Escape' && !mandatory) onCleanup({ action: 'later' });
        if (e.key === 'Enter') onCleanup({ action: 'update' });
      };
      root.addEventListener('click', (e) => {
        if (!mandatory && e.target === root) onCleanup({ action: 'later' });
      });
      card.querySelector('.js-update').addEventListener('click', () => onCleanup({ action: 'update', url: manifest.url }));
      if (!mandatory) {
        card.querySelector('.js-later').addEventListener('click', () => onCleanup({ action: 'later' }));
        card.querySelector('.js-skip').addEventListener('click', () => onCleanup({ action: 'skip', skipVersion: manifest.version }));
      }
      document.addEventListener('keydown', onKey);
      setTimeout(() => card.querySelector('.js-update')?.focus(), 0);
    });
  
    document.body.appendChild(root);
    return p;
  
    function escapeHtml(s){ return String(s).replace(/[&<>"']/g, m => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[m])) }
  