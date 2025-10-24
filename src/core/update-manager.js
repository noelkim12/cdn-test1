import { PLUGIN_NAME, PLUGIN_VERSION } from "../constants.js";

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
 * 업데이트 확인 UI
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
      title: "업데이트 준비 완료",
      primary: "지금 업데이트",
      later: "나중에",
      skip: "이번 버전 건너뛰기",
      notes: "노트 보기",
    },
    i18n
  );

  const root = document.createElement("div");
  root.setAttribute("role", "dialog");
  root.setAttribute("aria-modal", "true");
  root.setAttribute("class", "cu-root");

  const card = document.createElement("div");
  card.className = "cu-card";
  card.innerHTML = `
      <div class="cu-title">
        <h3>${t.title}${name ? ` · ${name}` : ""}</h3>
        <span class="cu-pill">v${currentVersion} → v${manifest.version}</span>
      </div>
      <div class="cu-sub">
        ${new Date(manifest.released_at || Date.now()).toLocaleDateString()} ·
        ${manifest.mandatory ? "필수 업데이트" : "선택 업데이트"}
      </div>
      <ul class="cu-list" aria-label="변경사항">
        ${
          (manifest.notes || [])
            .slice(0, 8)
            .map(
              (n) =>
                `<li class="${(n.type || "").trim()}">${escapeHtml(
                  n.text || ""
                )}</li>`
            )
            .join("") || "<li>세부 변경사항은 릴리스 노트를 참고해주세요</li>"
        }
      </ul>
      <div class="cu-actions">
        ${
          !mandatory
            ? `<button class="cu-btn ghost js-later">${t.later}</button>`
            : ""
        }
        ${
          !mandatory
            ? `<button class="cu-btn ghost js-skip">${t.skip}</button>`
            : ""
        }
        <button class="cu-btn primary js-update">${t.primary}</button>
      </div>
    `;
  root.appendChild(card);

  const p = new Promise((resolve) => {
    const onCleanup = (result) => {
      document.removeEventListener("keydown", onKey);
      root.remove();
      resolve(result);
    };
    const onKey = (e) => {
      if (e.key === "Escape" && !mandatory) onCleanup({ action: "later" });
      if (e.key === "Enter") onCleanup({ action: "update" });
    };
    root.addEventListener("click", (e) => {
      if (!mandatory && e.target === root) onCleanup({ action: "later" });
    });
    card
      .querySelector(".js-update")
      .addEventListener("click", () =>
        onCleanup({ action: "update", url: manifest.url })
      );
    if (!mandatory) {
      card
        .querySelector(".js-later")
        .addEventListener("click", () => onCleanup({ action: "later" }));
      card
        .querySelector(".js-skip")
        .addEventListener("click", () =>
          onCleanup({ action: "skip", skipVersion: manifest.version })
        );
    }
    document.addEventListener("keydown", onKey);
    setTimeout(() => card.querySelector(".js-update")?.focus(), 0);
  });

  document.body.appendChild(root);
  return p;

  function escapeHtml(s) {
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
      // 새 버전으로 업데이트 (페이지 리로드)
      console.log("[UpdateManager] Updating to version", latestVersion);
      window.location.reload();
      return { available: true, action: "updating", version: latestVersion };
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
