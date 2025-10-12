import { PLUGIN_NAME, PLUGIN_VERSION } from "./constants.js";
import { RisuAPI } from "./core/risu-api.js";
import { injectStyles } from "./ui/styles.js";
import { injectScripts } from "./utils/script-injector.js";
import { App } from "./ui/components/main.js";

// 애플리케이션 실행
(async () => {
  // 외부 스크립트 주입
  injectScripts();
  const app = new App();
  await app.initialize();

  // 언로드 핸들러 등록
  if (globalThis.__pluginApis__?.onUnload) {
    globalThis.__pluginApis__.onUnload(() => {
      app.destroy();
    });
  }
})();
