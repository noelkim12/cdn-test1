export const PLUGIN_NAME = "CDN TEST";
export const PLUGIN_VERSION = "0.1";
export const RANDOM_HASH = "";

/**
 * 외부 스크립트 목록
 * NPM에 등록되지 않은 스크립트를 별도로 등록할 때 사용
 * 외부 스크립트를 사용하기 위해서는 모듈 로드 후 해당 모듈을 사용하는 파일에서 사용할 수 있도록 설정해야 함
 * @type {Array<{src: string, global: string}>}
 * @param {string} src - 스크립트 URL
 * @param {string} global - 스크립트를 사용할 수 있도록 설정할 전역 변수 이름
 */
export const EXTERNAL_SCRIPTS = [
  /* 
  {
    src: "https://cdn.jsdelivr.net/npm/idb@8/build/umd.js",
    global: "idb"
  },
  {
    src: "https://cdn.jsdelivr.net/npm/winbox@0.2.82/dist/winbox.bundle.min.js",
    global: "WinBox"
  }
   */
];
