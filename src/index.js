import { PLUGIN_NAME, PLUGIN_VERSION } from "./constants.js";
import { RisuAPI } from "./core/risu-api.js";
import { injectScripts } from "./utils/script-injector.js";
import { App } from "./ui/components/main.js";
import { checkForUpdates } from "./core/update-manager.js";
import "./ui/styles"; // Style Registry
import "./ui/components"; // Web Components 레지스트리

// 애플리케이션 실행
(async () => {
  try {
    // 1. RisuAPI 싱글톤 초기화 (최초 한 번만)
    const risuAPI = RisuAPI.getInstance(globalThis.__pluginApis__);
    const initialized = await risuAPI.initialize();

    if (!initialized) {
      console.error(`[${PLUGIN_NAME}] Failed to initialize RisuAPI`);
      return;
    }

    // 2. 업데이트 체크 (백그라운드, silent 모드-로그 최소화)
    checkForUpdates({ silent: true }).catch(err => {
      console.warn('[App] Update check failed:', err);
    });

    // 3. 외부 스크립트 import(script 태그 추가)
    injectScripts();

    // 4. App 초기화
    const app = new App();
    await app.initialize();

    console.log(`${PLUGIN_NAME} v${PLUGIN_VERSION} loaded`);

    // 5. 언로드 핸들러 등록
    risuAPI.onUnload(() => {
      app.destroy();
    });
    
  } catch (error) {
    console.error(`[${PLUGIN_NAME}] Initialization failed:`, error);
  }
})();
