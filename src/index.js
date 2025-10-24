import { PLUGIN_NAME, PLUGIN_VERSION } from "./constants.js";
import { RisuAPI } from "./core/risu-api.js";
import "./ui/styles.js"; // CSS 자동 import (webpack이 처리)
import { injectScripts } from "./utils/script-injector.js";
import { App } from "./ui/components/main.js";
import { checkForUpdates } from "./core/update-manager.js";

function printPackageVersion() {
  console.log(`${PLUGIN_NAME} v${PLUGIN_VERSION} loaded`);
  return `${PLUGIN_NAME} v${PLUGIN_VERSION}`;
}

// 애플리케이션 실행
(async () => {
  // 업데이트 체크 (백그라운드, silent 모드)
  checkForUpdates({ silent: true }).catch(err => {
    console.warn('[App] Update check failed:', err);
  });

  // 외부 스크립트 주입
  injectScripts();
  // CSS는 webpack에 의해 자동으로 주입됨
  const app = new App();
  await app.initialize();

  printPackageVersion();

  // 언로드 핸들러 등록
  if (globalThis?.__pluginApis__?.onUnload) {
    globalThis.__pluginApis__.onUnload(() => {
      app.destroy();
    });
  }
})();
