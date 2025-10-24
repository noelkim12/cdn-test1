import { PLUGIN_NAME, PLUGIN_VERSION } from "../constants.js";
import { RisuAPI } from "./risu-api.js";
import { showAlert } from "../ui/components/updateManager/alert-dialog.js";

/**
 * unpkg에서 최신 버전의 메타데이터를 파싱
 * @returns {Promise<Object|null>} manifest 객체 또는 null
 */
async function fetchLatestManifest() {
  try {
    const url = `https://unpkg.com/${PLUGIN_NAME}@latest/dist/${PLUGIN_NAME}.js`;

    // HEAD 요청으로 redirect된 최종 URL 확인
    const headResponse = await fetch(url, {
      method: "HEAD",
      redirect: "follow",
    });

    // 실제 resolved 버전 확인 (예: https://unpkg.com/cdn-test1@0.2.0/dist/cdn_test1.js)
    const resolvedUrl = headResponse.url;
    const versionMatch = resolvedUrl.match(/@([\d.]+)\//);

    if (!versionMatch) {
      throw new Error("Version not found in resolved URL");
    }

    const latestVersion = versionMatch[1];

    // 실제 파일 내용에서 배너 메타데이터 추출 (옵션)
    const content = await fetch(resolvedUrl).then((r) => r.text());
    const bannerRegex =
      /\/\/@name (.+?)\n\/\/@display-name (.+?)\n\/\/@version (.+?)\n\/\/@description (.+?)(?:\n|$)/;
    const bannerMatch = content.match(bannerRegex);

    // 릴리즈 노트 가져오기
    const notesUrl = `https://unpkg.com/${PLUGIN_NAME}@${latestVersion}/dist/release-notes.json`;
    let releaseData = {};

    try {
      const notesResponse = await fetch(notesUrl);
      if (notesResponse.ok) {
        const allNotes = await notesResponse.json();
        releaseData = allNotes[latestVersion] || {};
      }
    } catch (error) {
      console.warn("[UpdateManager] Failed to fetch release notes:", error);
    }

    return {
      version: latestVersion,
      url: resolvedUrl,
      name: bannerMatch?.[1]?.trim() || PLUGIN_NAME,
      displayName:
        bannerMatch?.[2]?.trim() || `${PLUGIN_NAME}_v${latestVersion}`,
      description: bannerMatch?.[4]?.trim() || "",
      mandatory: releaseData.mandatory || false,
      notes: releaseData.notes || [],
      released_at: releaseData.released_at || new Date().toISOString(),
    };
  } catch (error) {
    console.error("[UpdateManager] Failed to fetch manifest:", error);
    return null;
  }
}

/**
 * 버전 비교 (semver 기반)
 * @param {string} v1 - 비교할 버전 1
 * @param {string} v2 - 비교할 버전 2
 * @returns {number} v1 > v2: 1, v1 < v2: -1, v1 === v2: 0
 */
function compareVersions(v1, v2) {
  const parts1 = v1.split(".").map(Number);
  const parts2 = v2.split(".").map(Number);

  for (let i = 0; i < Math.max(parts1.length, parts2.length); i++) {
    const p1 = parts1[i] || 0;
    const p2 = parts2[i] || 0;
    if (p1 > p2) return 1;
    if (p1 < p2) return -1;
  }
  return 0;
}

/**
 * 플러그인 스크립트 파싱 (script-updater.js 로직 재사용)
 * @param {string} scriptContent - unpkg에서 fetch한 스크립트 내용
 * @returns {Object} 파싱된 플러그인 데이터
 */
function parsePluginScript(scriptContent) {
  const splitedJs = scriptContent.split("\n");

  let name = "";
  let displayName = undefined;
  let arg = {};
  let realArg = {};
  let customLink = [];

  for (const line of splitedJs) {
    // V1 플러그인 체크 (지원하지 않음)
    if (line.startsWith("//@risu-name") || line.startsWith("//@risu-display-name")) {
      throw new Error("V1 plugin is not supported. Please use V2 plugin.");
    }

    // name 파싱
    if (line.startsWith("//@name")) {
      const provided = line.slice(7).trim();
      if (provided === "") {
        throw new Error("Plugin name must be longer than 0");
      }
      name = provided;
    }

    // display-name 파싱
    if (line.startsWith("//@display-name")) {
      const provided = line.slice("//@display-name".length + 1).trim();
      if (provided === "") {
        throw new Error("Plugin display name must be longer than 0");
      }
      displayName = provided;
    }

    // link 파싱
    if (line.startsWith("//@link")) {
      const link = line.split(" ")[1];
      if (!link || link === "") {
        throw new Error("Plugin link is empty");
      }
      if (!link.startsWith("https")) {
        throw new Error("Plugin link must start with https");
      }
      const hoverText = line.split(" ").slice(2).join(" ").trim();
      customLink.push({
        link: link,
        hoverText: hoverText || undefined,
      });
    }

    // arg 파싱
    if (line.startsWith("//@risu-arg") || line.startsWith("//@arg")) {
      const provided = line.trim().split(" ");
      if (provided.length < 3) {
        throw new Error("Plugin argument is incorrect");
      }
      const provKey = provided[1];

      if (provided[2] !== "int" && provided[2] !== "string") {
        throw new Error(`Unknown argument type: ${provided[2]}`);
      }

      if (provided[2] === "int") {
        arg[provKey] = "int";
        realArg[provKey] = 0;
      } else if (provided[2] === "string") {
        arg[provKey] = "string";
        realArg[provKey] = "";
      }
    }
  }

  if (name.length === 0) {
    throw new Error("Plugin name not found");
  }

  return {
    name: name,
    script: scriptContent,
    realArg: realArg,
    arguments: arg,
    displayName: displayName,
    version: 2,
    customLink: customLink,
  };
}

/**
 * realArg 병합 (기존 값 보존 + 새 key 추가)
 * @param {Object} oldRealArg - 기존 플러그인의 realArg
 * @param {Object} newArguments - 새 플러그인의 arguments
 * @returns {Object} 병합된 realArg
 */
function mergeRealArgs(oldRealArg, newArguments) {
  const merged = {};

  // 새 arguments를 기준으로 순회
  for (const [key, type] of Object.entries(newArguments)) {
    // 기존 값이 있으면 보존, 없으면 기본값
    if (oldRealArg && key in oldRealArg) {
      merged[key] = oldRealArg[key]; // 기존 사용자 입력 값 보존
    } else {
      // 새로 추가된 arg는 기본값
      merged[key] = type === "int" ? 0 : "";
    }
  }

  return merged;
}

/**
 * 플러그인 스크립트 업데이트
 * @param {Object} manifest - fetchLatestManifest()로 가져온 매니페스트
 * @returns {Promise<Object>} {success: boolean, error?: Error}
 */
async function updatePluginScript(manifest) {
  try {
    // 1. unpkg에서 최신 스크립트 fetch
    console.log("[UpdateManager] Fetching latest script from unpkg:", manifest.url);
    const scriptContent = await fetch(manifest.url).then((r) => r.text());

    // 2. 스크립트 파싱
    console.log("[UpdateManager] Parsing plugin script...");
    const parsed = parsePluginScript(scriptContent);

    // 3. RisuAPI 싱글톤 인스턴스에서 getDatabase(), setDatabaseLite 가져오기
    const risuAPI = RisuAPI.getInstance();
    if (!risuAPI) {
      throw new Error("RisuAPI is not initialized. Please ensure the plugin is loaded.");
    }

    const getDatabase = risuAPI.getDatabase;
    const setDatabaseLite = risuAPI.setDatabaseLite;

    if (!getDatabase) {
      throw new Error("getDatabase is not available in RisuAPI");
    }

    if (!setDatabaseLite) {
      throw new Error("setDatabaseLite is not available in RisuAPI");
    }

    // 4. 기존 플러그인 찾기 및 백업
    const db = getDatabase();
    const oldPluginIndex = db.plugins.findIndex((p) => p.name === PLUGIN_NAME);
    const backup = oldPluginIndex >= 0 ? { ...db.plugins[oldPluginIndex] } : null;

    console.log("[UpdateManager] Old plugin found:", oldPluginIndex >= 0, backup?.name);

    // 5. realArg 병합 (기존 값 보존 + 새 key 추가)
    const mergedRealArg = mergeRealArgs(backup?.realArg, parsed.arguments);

    // 6. 새 플러그인 데이터 생성
    const newPlugin = {
      ...parsed,
      realArg: mergedRealArg,
    };

    console.log("[UpdateManager] New plugin data prepared:", newPlugin.name, newPlugin.displayName);

    // 7. DB 업데이트
    if (oldPluginIndex >= 0) {
      db.plugins[oldPluginIndex] = newPlugin;
      console.log("[UpdateManager] Replaced existing plugin at index", oldPluginIndex);
    } else {
      db.plugins.push(newPlugin);
      console.log("[UpdateManager] Added new plugin");
    }

    // 8. 저장 및 오류 처리
    try {
      setDatabaseLite(db);
      console.log("[UpdateManager] Database saved successfully");
      return { success: true };
    } catch (saveError) {
      console.error("[UpdateManager] Database save failed:", saveError);
      // 롤백
      if (backup && oldPluginIndex >= 0) {
        db.plugins[oldPluginIndex] = backup;
        console.log("[UpdateManager] Rolled back to previous plugin");
      } else if (oldPluginIndex === -1) {
        db.plugins.pop();
        console.log("[UpdateManager] Removed newly added plugin");
      }
      return { success: false, error: saveError };
    }
  } catch (error) {
    console.error("[UpdateManager] Plugin update failed:", error);
    return { success: false, error };
  }
}

/**
 * 업데이트 확인 UI (Web Components 사용)
 */
function confirmUpdate(opts) {
  const {
    name,
    currentVersion,
    manifest,
    i18n = {},
    mandatory = manifest.mandatory === true,
  } = opts;

  const t = Object.assign(
    {
      title: "플러그인 업데이트 준비 완료",
      primary: "지금 업데이트",
      later: "나중에",
      skip: "이번 버전 건너뛰기",
    },
    i18n
  );

  // UpdateDialog Custom Element 생성
  const dialog = document.createElement("update-dialog");

  // 속성 설정
  if (name) dialog.setAttribute("name", name);
  dialog.setAttribute("current-version", currentVersion);
  dialog.setAttribute("version", manifest.version);
  dialog.setAttribute("released-at", manifest.released_at || new Date().toISOString());
  if (mandatory) dialog.setAttribute("mandatory", "");
  dialog.setAttribute("notes", JSON.stringify(manifest.notes || []));

  // 다국어 설정
  dialog.setAttribute("title", t.title);
  dialog.setAttribute("btn-update", t.primary);
  dialog.setAttribute("btn-later", t.later);
  dialog.setAttribute("btn-skip", t.skip);

  // Promise로 사용자 액션 대기
  const promise = new Promise((resolve) => {
    const handler = (event) => {
      const { action, skipVersion } = event.detail;

      // 결과 구성
      const result = { action };
      if (action === "update") {
        result.url = manifest.url;
      } else if (action === "skip") {
        result.skipVersion = skipVersion;
      }

      // 정리 및 resolve
      dialog.removeEventListener("update-action", handler);
      dialog.remove();
      resolve(result);
    };

    dialog.addEventListener("update-action", handler);
  });

  document.body.appendChild(dialog);
  return promise;
}

/**
 * 업데이트 체크 및 사용자 확인
 * @param {Object} options - 옵션
 * @param {boolean} [options.silent=false] - silent 모드 (로그 최소화)
 * @param {boolean} [options.force=false] - skip 버전 무시
 * @param {Object} [options.i18n={}] - 다국어 텍스트
 * @returns {Promise<Object>} 업데이트 결과
 */
export async function checkForUpdates(options = {}) {
  const { silent = false, force = false, i18n = {} } = options;

  try {
    const manifest = await fetchLatestManifest();

    if (!manifest) {
      if (!silent) console.log("[UpdateManager] Unable to check for updates");
      return { available: false, error: "fetch_failed" };
    }

    const currentVersion = PLUGIN_VERSION;
    const latestVersion = manifest.version;

    // Skip 버전 확인
    const skipKey = `${PLUGIN_NAME}_skip_version`;
    const skipVersion = localStorage.getItem(skipKey);
    if (!force && skipVersion === latestVersion) {
      if (!silent)
        console.log(
          `[UpdateManager] Version ${latestVersion} is skipped by user`
        );
      return { available: false, skipped: true, version: latestVersion };
    }

    // 버전 비교
    const comparison = compareVersions(latestVersion, currentVersion);

    if (comparison <= 0) {
      if (!silent)
        console.log(`[UpdateManager] Already up to date (${currentVersion})`);
      return {
        available: false,
        current: currentVersion,
        latest: latestVersion,
      };
    }

    console.log(
      `[UpdateManager] New version available: ${currentVersion} → ${latestVersion}`
    );

    // 사용자 확인 UI 표시
    const result = await confirmUpdate({
      name: PLUGIN_NAME,
      currentVersion,
      manifest,
      i18n,
    });

    // 결과 처리
    if (result.action === "update") {
      // 플러그인 스크립트 업데이트
      console.log("[UpdateManager] Updating to version", latestVersion);
      const updateResult = await updatePluginScript(manifest);

      if (updateResult.success) {
        console.log("[UpdateManager] Plugin script updated successfully");
        // 업데이트 성공 알림 표시 후 리로드
        await showAlert("업데이트가 완료되었습니다.\n\n업데이트된 스크립트를 적용하기 위해\n페이지를 새로고침합니다.");
        window.location.reload();
        return { available: true, action: "updated", version: latestVersion };
      } else {
        console.error("[UpdateManager] Plugin update failed:", updateResult.error);
        alert(
          `업데이트 실패: ${updateResult.error?.message || "알 수 없는 오류"}\n\n페이지를 새로고침하여 다시 시도해주세요.`
        );
        return {
          available: true,
          action: "update_failed",
          error: updateResult.error,
        };
      }
    } else if (result.action === "skip") {
      localStorage.setItem(skipKey, result.skipVersion);
      console.log("[UpdateManager] Skipped version", result.skipVersion);
      return {
        available: true,
        action: "skipped",
        version: result.skipVersion,
      };
    } else {
      console.log("[UpdateManager] Update postponed");
      return { available: true, action: "later", version: latestVersion };
    }
  } catch (error) {
    console.error("[UpdateManager] Check failed:", error);
    return { available: false, error: error.message };
  }
}

export { confirmUpdate };
