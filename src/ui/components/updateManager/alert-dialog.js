/**
 * AlertDialog Custom Element
 * 간단한 알림 메시지를 표시하는 다이얼로그 컴포넌트
 */

const ELEMENT_TAG = "alert-dialog";

export class AlertDialog extends HTMLElement {
  constructor() {
    super();
    this._cleanup = null;
  }

  static get observedAttributes() {
    return ["message", "btn-confirm"];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    // 포커스 설정
    setTimeout(() => this.querySelector(".js-confirm")?.focus(), 0);
  }

  disconnectedCallback() {
    if (this._cleanup) {
      this._cleanup();
    }
  }

  get message() {
    return this.getAttribute("message") || "";
  }

  get confirmText() {
    return this.getAttribute("btn-confirm") || "확인";
  }

  render() {
    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.className = "cu-root";

    this.innerHTML = `
      <div class="cu-card cu-alert">
        <div class="cu-alert-message">
          ${this.escapeHtml(this.message)}
        </div>
        <div class="cu-actions">
          <button class="cu-btn primary js-confirm">${this.confirmText}</button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const card = this.querySelector(".cu-card");

    // 키보드 이벤트
    const onKey = (e) => {
      if (e.key === "Enter" || e.key === "Escape") {
        this.dispatchConfirm();
      }
    };

    // 확인 버튼 클릭
    const confirmBtn = card.querySelector(".js-confirm");
    if (confirmBtn) {
      confirmBtn.addEventListener("click", () => this.dispatchConfirm());
    }

    document.addEventListener("keydown", onKey);

    // Cleanup 함수 저장
    this._cleanup = () => {
      document.removeEventListener("keydown", onKey);
    };
  }

  dispatchConfirm() {
    // Custom Event 발생
    this.dispatchEvent(
      new CustomEvent("alert-confirm", {
        bubbles: true,
        composed: true,
      })
    );
  }

  escapeHtml(s) {
    return String(s).replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        }[m])
    );
  }
}

// Custom Element 등록
if (!customElements.get(ELEMENT_TAG)) {
  customElements.define(ELEMENT_TAG, AlertDialog);
}

export const ALERT_DIALOG_TAG = ELEMENT_TAG;

/**
 * AlertDialog를 표시하고 사용자 확인을 기다림
 * @param {string} message - 표시할 메시지
 * @param {string} [confirmText="확인"] - 확인 버튼 텍스트
 * @returns {Promise<void>}
 */
export function showAlert(message, confirmText = "확인") {
  return new Promise((resolve) => {
    const dialog = document.createElement(ALERT_DIALOG_TAG);
    dialog.setAttribute("message", message);
    dialog.setAttribute("btn-confirm", confirmText);

    const handler = () => {
      dialog.removeEventListener("alert-confirm", handler);
      dialog.remove();
      resolve();
    };

    dialog.addEventListener("alert-confirm", handler);
    document.body.appendChild(dialog);
  });
}
