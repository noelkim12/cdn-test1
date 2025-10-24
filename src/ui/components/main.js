import { PLUGIN_NAME } from "../../constants";
import { MENU_BUTTON_TAG } from "./ui/menu-button";
import { RisuAPI } from "../../core/risu-api";
import "winbox";

// 메인 애플리케이션 클래스
export class App {
    constructor() {
      this.risuAPI = null;
      this.observer = null;
      this.moduleBox = null;
      this.moduleBoxRoot = document.createElement("div");
      this.moduleBoxRoot.className = "sample-wrap";
    }
  
    async initialize() {
      // RisuAPI 싱글톤 인스턴스 가져오기
      this.risuAPI = RisuAPI.getInstance();

      if (!this.risuAPI) {
        console.log(`[${PLUGIN_NAME}] RisuAPI is not initialized`);
        return false;
      }

      // UI 초기화
      this.initializeUI();
      this.startObserver();

      console.log(`[${PLUGIN_NAME}] plugin loaded`);
      return true;
    }
  
    initializeUI() {
    }
  
    openModuleBox() {
      if (this.moduleBox) return;
  
      const winboxConfig = {
        title: "CDN TEST",
        x: "center",
        y: "center",
        width: Math.min(1080, window.innerWidth * 0.9) + "px",
        height: Math.min(800, window.innerHeight * 0.8) + "px",
        mount: this.moduleBoxRoot,
        background: "#0f131a",
        class: ["no-full", "no-max", "no-min", "rb-box"],
        onclose: () => {
          this.moduleBox = null;
          location.hash = "";
        },
      };
  
      this.moduleBox = new WinBox(winboxConfig);
      this.render();
    }
  
    render() {
    }
  
    startObserver() {
      if (this.observer) this.observer.disconnect();
      this.observer = new MutationObserver(() => {
        setTimeout(() => this.attachButton(), 100);
      });
      this.observer.observe(document.body, {
        childList: true,
        subtree: true,
        attributes: true,
        attributeFilter: ["style", "class"],
      });
      setTimeout(() => this.attachButton(), 500);
    }
  
    attachButton() {
      let burgerEl = document.querySelector(
        "div.absolute.right-2.bottom-16.p-5.bg-darkbg.flex.flex-col.gap-3.text-textcolor.rounded-md"
      );
      if (burgerEl && !burgerEl.classList.contains("sample-btn-class")) {
        const buttonDiv = document.createElement(MENU_BUTTON_TAG);
        buttonDiv.addEventListener("click", () => {
          this.openModuleBox();
        });
        burgerEl.appendChild(buttonDiv);
        burgerEl.classList.add("sample-btn-class");
      }
    }
  
    // plugin이 unload될 때 호출되는 함수
    destroy() {
      if (this.observer) this.observer.disconnect();
      console.log(`${PLUGIN_NAME} 언로드`);
    }
  }
  