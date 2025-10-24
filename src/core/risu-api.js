import { PLUGIN_NAME } from '../constants.js';

/**
 * RisuAPI 싱글톤 클래스
 * RisuAI의 플러그인 API를 래핑하여 제공합니다.
 */
export class RisuAPI {
  // 싱글톤 인스턴스
  static _instance = null;

  constructor(pluginApis) {
    // 싱글톤 체크
    if (RisuAPI._instance) {
      console.log(`[${PLUGIN_NAME}] Returning existing RisuAPI instance`);
      return RisuAPI._instance;
    }

    this.risuFetch = pluginApis.risuFetch;
    this.nativeFetch = pluginApis.nativeFetch;
    this.getArg = pluginApis.getArg;
    this.getChar = pluginApis.getChar;
    this.setChar = pluginApis.setChar;
    this.addProvider = pluginApis.addProvider;
    this.addRisuScriptHandler = pluginApis.addRisuScriptHandler;
    this.removeRisuScriptHandler = pluginApis.removeRisuScriptHandler;
    this.addRisuReplacer = pluginApis.addRisuReplacer;
    this.removeRisuReplacer = pluginApis.removeRisuReplacer;
    this.onUnload = pluginApis.onUnload;
    this.setArg = pluginApis.setArg;
    this.getDatabase = null;
    this.setDatabaseLite = null;

    // 싱글톤 인스턴스 저장
    RisuAPI._instance = this;
  }

  async initialize() {
    try {
      // eval은 최초 스크립트 실행 컨텍스트에서만 작동
      // 싱글톤이므로 한 번만 실행되고 이후 재사용됨
      this.getDatabase = eval("getDatabase");
      this.setDatabaseLite = eval("setDatabaseLite");
      console.log(`[${PLUGIN_NAME}] RisuAPI initialized successfully`);
      return true;
    } catch (error) {
      console.log(`[${PLUGIN_NAME}] Failed to initialize RisuAPI:`, error);
      return false;
    }
  }

  /**
   * 싱글톤 인스턴스 가져오기
   * @returns {RisuAPI|null} 초기화된 인스턴스 또는 null
   */
  static getInstance() {
    return RisuAPI._instance;
  }

  /**
   * 싱글톤 인스턴스 리셋 (테스트용)
   */
  static resetInstance() {
    RisuAPI._instance = null;
  }
}
