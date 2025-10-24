//@name cdn-test1
//@display-name cdn-test1_v0.4.0
//@version 0.4.0
//@description Cdn Test1 for RISU AI
//@unpkg https://unpkg.com/cdn-test1@0.4.0/dist/cdn_test1.js
var cdnTest1;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ 56:
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {



/* istanbul ignore next  */
function setAttributesWithoutAttributes(styleElement) {
  var nonce =  true ? __webpack_require__.nc : 0;
  if (nonce) {
    styleElement.setAttribute("nonce", nonce);
  }
}
module.exports = setAttributesWithoutAttributes;

/***/ }),

/***/ 72:
/***/ ((module) => {



var stylesInDOM = [];
function getIndexByIdentifier(identifier) {
  var result = -1;
  for (var i = 0; i < stylesInDOM.length; i++) {
    if (stylesInDOM[i].identifier === identifier) {
      result = i;
      break;
    }
  }
  return result;
}
function modulesToDom(list, options) {
  var idCountMap = {};
  var identifiers = [];
  for (var i = 0; i < list.length; i++) {
    var item = list[i];
    var id = options.base ? item[0] + options.base : item[0];
    var count = idCountMap[id] || 0;
    var identifier = "".concat(id, " ").concat(count);
    idCountMap[id] = count + 1;
    var indexByIdentifier = getIndexByIdentifier(identifier);
    var obj = {
      css: item[1],
      media: item[2],
      sourceMap: item[3],
      supports: item[4],
      layer: item[5]
    };
    if (indexByIdentifier !== -1) {
      stylesInDOM[indexByIdentifier].references++;
      stylesInDOM[indexByIdentifier].updater(obj);
    } else {
      var updater = addElementStyle(obj, options);
      options.byIndex = i;
      stylesInDOM.splice(i, 0, {
        identifier: identifier,
        updater: updater,
        references: 1
      });
    }
    identifiers.push(identifier);
  }
  return identifiers;
}
function addElementStyle(obj, options) {
  var api = options.domAPI(options);
  api.update(obj);
  var updater = function updater(newObj) {
    if (newObj) {
      if (newObj.css === obj.css && newObj.media === obj.media && newObj.sourceMap === obj.sourceMap && newObj.supports === obj.supports && newObj.layer === obj.layer) {
        return;
      }
      api.update(obj = newObj);
    } else {
      api.remove();
    }
  };
  return updater;
}
module.exports = function (list, options) {
  options = options || {};
  list = list || [];
  var lastIdentifiers = modulesToDom(list, options);
  return function update(newList) {
    newList = newList || [];
    for (var i = 0; i < lastIdentifiers.length; i++) {
      var identifier = lastIdentifiers[i];
      var index = getIndexByIdentifier(identifier);
      stylesInDOM[index].references--;
    }
    var newLastIdentifiers = modulesToDom(newList, options);
    for (var _i = 0; _i < lastIdentifiers.length; _i++) {
      var _identifier = lastIdentifiers[_i];
      var _index = getIndexByIdentifier(_identifier);
      if (stylesInDOM[_index].references === 0) {
        stylesInDOM[_index].updater();
        stylesInDOM.splice(_index, 1);
      }
    }
    lastIdentifiers = newLastIdentifiers;
  };
};

/***/ }),

/***/ 113:
/***/ ((module) => {



/* istanbul ignore next  */
function styleTagTransform(css, styleElement) {
  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css;
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild);
    }
    styleElement.appendChild(document.createTextNode(css));
  }
}
module.exports = styleTagTransform;

/***/ }),

/***/ 300:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   m: () => (/* binding */ RisuAPI)
/* harmony export */ });
/* harmony import */ var _constants_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(521);


class RisuAPI {
  constructor(pluginApis) {
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
  }

  async initialize() {
    try {
      this.getDatabase = eval("getDatabase");
      globalThis.__pluginApis__.getDatabase = this.getDatabase;
      return true;
    } catch (error) {
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] Failed to add getDatabase:`, error);
      return false;
    }
  }
}


/***/ }),

/***/ 314:
/***/ ((module) => {



/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
module.exports = function (cssWithMappingToString) {
  var list = [];

  // return the list of modules as css string
  list.toString = function toString() {
    return this.map(function (item) {
      var content = "";
      var needLayer = typeof item[5] !== "undefined";
      if (item[4]) {
        content += "@supports (".concat(item[4], ") {");
      }
      if (item[2]) {
        content += "@media ".concat(item[2], " {");
      }
      if (needLayer) {
        content += "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {");
      }
      content += cssWithMappingToString(item);
      if (needLayer) {
        content += "}";
      }
      if (item[2]) {
        content += "}";
      }
      if (item[4]) {
        content += "}";
      }
      return content;
    }).join("");
  };

  // import a list of modules into the list
  list.i = function i(modules, media, dedupe, supports, layer) {
    if (typeof modules === "string") {
      modules = [[null, modules, undefined]];
    }
    var alreadyImportedModules = {};
    if (dedupe) {
      for (var k = 0; k < this.length; k++) {
        var id = this[k][0];
        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }
    for (var _k = 0; _k < modules.length; _k++) {
      var item = [].concat(modules[_k]);
      if (dedupe && alreadyImportedModules[item[0]]) {
        continue;
      }
      if (typeof layer !== "undefined") {
        if (typeof item[5] === "undefined") {
          item[5] = layer;
        } else {
          item[1] = "@layer".concat(item[5].length > 0 ? " ".concat(item[5]) : "", " {").concat(item[1], "}");
          item[5] = layer;
        }
      }
      if (media) {
        if (!item[2]) {
          item[2] = media;
        } else {
          item[1] = "@media ".concat(item[2], " {").concat(item[1], "}");
          item[2] = media;
        }
      }
      if (supports) {
        if (!item[4]) {
          item[4] = "".concat(supports);
        } else {
          item[1] = "@supports (".concat(item[4], ") {").concat(item[1], "}");
          item[4] = supports;
        }
      }
      list.push(item);
    }
  };
  return list;
};

/***/ }),

/***/ 521:
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   AF: () => (/* binding */ PLUGIN_NAME),
/* harmony export */   jN: () => (/* binding */ PLUGIN_VERSION),
/* harmony export */   rZ: () => (/* binding */ EXTERNAL_SCRIPTS)
/* harmony export */ });
/* unused harmony exports PLUGIN_DESCRIPTION, RANDOM_HASH */
/**
 * 빌드 타임 상수 (webpack DefinePlugin으로 주입)
 * 개발 환경(webpack 없이 직접 실행)을 위한 fallback 제공
 */
const PLUGIN_NAME =
   true ? "cdn-test1" : 0;

const PLUGIN_VERSION =
   true ? "0.4.0" : 0;

const PLUGIN_DESCRIPTION =
  (/* unused pure expression or super */ null && ( true ? "Cdn Test1 for RISU AI" : 0));

const RANDOM_HASH = "";

/**
 * 외부 스크립트 목록
 * NPM에 등록되지 않은 스크립트를 별도로 등록할 때 사용
 * 외부 스크립트를 사용하기 위해서는 모듈 로드 후 해당 모듈을 사용하는 파일에서 사용할 수 있도록 설정해야 함
 * @type {Array<{src: string, global: string}>}
 * @param {string} src - 스크립트 URL
 * @param {string} global - 스크립트를 사용할 수 있도록 설정할 전역 변수 이름
 */
const EXTERNAL_SCRIPTS = [
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


/***/ }),

/***/ 540:
/***/ ((module) => {



/* istanbul ignore next  */
function insertStyleElement(options) {
  var element = document.createElement("style");
  options.setAttributes(element, options.attributes);
  options.insert(element, options.options);
  return element;
}
module.exports = insertStyleElement;

/***/ }),

/***/ 601:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

/***/ }),

/***/ 628:
/***/ ((module, __webpack_exports__, __webpack_require__) => {

/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   A: () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(601);
/* harmony import */ var _node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(314);
/* harmony import */ var _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1__);
// Imports


var ___CSS_LOADER_EXPORT___ = _node_modules_css_loader_dist_runtime_api_js__WEBPACK_IMPORTED_MODULE_1___default()((_node_modules_css_loader_dist_runtime_noSourceMaps_js__WEBPACK_IMPORTED_MODULE_0___default()));
___CSS_LOADER_EXPORT___.push([module.id, "@import url(https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css);"]);
___CSS_LOADER_EXPORT___.push([module.id, "@import url(//fonts.googleapis.com/earlyaccess/notosanskr.css);"]);
// Module
___CSS_LOADER_EXPORT___.push([module.id, `
  /* Pretendard 폰트 CDN */
  
  /* 전체 폰트 설정 */
  .rb-box * {
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif !important;
    font-weight: 600;
    font-size: 19px;
  }
  
  /* 기본 스타일 - 암시장 테마 */
  .rb-box {
    z-index:99999 !important;
    pointer-events: auto;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
    border: 2px solid #ff6b35;
    box-shadow: 0 0 20px rgba(255, 107, 53, 0.3);
  }
  .rb-wrap {
    display:flex;
    flex-direction:column;
    min-height:100%;
    height:100%;
    background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 50%, #0f0f0f 100%);
    overflow:hidden; /* 자식 요소에서 스크롤 처리 */
    z-index:99999;
    pointer-events: auto;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
    position: relative;
  }
  
  /* 암시장 배경 패턴 */
  .rb-wrap::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background-image: 
      radial-gradient(circle at 20% 20%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 80% 80%, rgba(255, 107, 53, 0.1) 0%, transparent 50%),
      radial-gradient(circle at 40% 60%, rgba(255, 107, 53, 0.05) 0%, transparent 50%);
    pointer-events: none;
    z-index: 0;
  }

  /* WinBox body 영역 높이 설정 */
  .wb-body {
    height: 100% !important;
    display: flex !important;
    flex-direction: column !important;
    overflow: hidden !important;
  }

  /* WinBox 컨테이너 높이 보장 */
  .winbox.rb-box {
    display: flex !important;
    flex-direction: column !important;
  }

  /* wb-body 직접 자식 요소들이 전체 높이를 차지하도록 */
  .wb-body > * {
    flex: 1;
    min-height: 0;
    overflow: hidden;
  }

  /* 암시장 상점 스타일 */
  .rb-blackmarket-game {
    width: 100%;
    height: 100%;
    min-height: 100%;
    padding: 20px;
    background: transparent;
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    flex: 1;
    min-height: 0;
    font-family: 'Pretendard', 'Noto Sans KR', system-ui, sans-serif;
    position: relative;
    z-index: 1;
  }

  /* 상점 헤더 */
  .rb-shop-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding: 15px 20px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #ff6b35;
    border-radius: 10px;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.2);
  }

  .rb-shop-title {
    color: #ff6b35;
    font-size: 24px;
    font-weight: 700;
    margin: 0;
    text-shadow: 0 0 10px rgba(255, 107, 53, 0.5);
  }

  .rb-player-info {
    display: flex;
    gap: 20px;
    align-items: center;
  }

  .rb-money-display, .rb-cart-count {
    background: rgba(255, 107, 53, 0.1);
    padding: 8px 15px;
    border-radius: 20px;
    color: #ff6b35;
    font-weight: 600;
    border: 1px solid rgba(255, 107, 53, 0.3);
  }

  /* 네비게이션 */
  .rb-shop-nav {
    display: flex;
    gap: 10px;
    margin-bottom: 20px;
  }

  .rb-nav-btn {
    flex: 1;
    padding: 12px 20px;
    background: linear-gradient(135deg, #2a2a2a 0%, #1a1a1a 100%);
    border: 1px solid #444;
    border-radius: 8px;
    color: #ccc;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-nav-btn:hover {
    background: linear-gradient(135deg, #3a3a3a 0%, #2a2a2a 100%);
    border-color: #ff6b35;
  }

  .rb-nav-btn.active {
    background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
    border-color: #ff6b35;
    color: #fff;
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }

  /* 상점 컨테이너 */
  .rb-shop-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  /* 카테고리 필터 */
  .rb-category-filter {
    display: flex;
    gap: 8px;
    margin-bottom: 20px;
    flex-wrap: wrap;
  }

  .rb-category-btn {
    padding: 8px 16px;
    background: rgba(255, 107, 53, 0.1);
    border: 1px solid rgba(255, 107, 53, 0.3);
    border-radius: 20px;
    color: #ff6b35;
    font-size: 14px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-category-btn:hover {
    background: rgba(255, 107, 53, 0.2);
  }

  .rb-category-btn.active {
    background: #ff6b35;
    color: #fff;
    box-shadow: 0 2px 8px rgba(255, 107, 53, 0.3);
  }

  /* 상품 그리드 */
  .rb-products-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    flex: 1;
    overflow-y: auto;
    padding-right: 5px;
  }

  .rb-products-grid::-webkit-scrollbar {
    width: 6px;
  }

  .rb-products-grid::-webkit-scrollbar-track {
    background: rgba(255, 107, 53, 0.1);
    border-radius: 3px;
  }

  .rb-products-grid::-webkit-scrollbar-thumb {
    background: #ff6b35;
    border-radius: 3px;
  }

  /* 상품 카드 */
  .rb-product-card {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #444;
    border-radius: 12px;
    padding: 20px;
    transition: all 0.3s ease;
    position: relative;
    overflow: hidden;
  }

  .rb-product-card:hover {
    transform: translateY(-5px);
    box-shadow: 0 8px 25px rgba(255, 107, 53, 0.2);
    border-color: #ff6b35;
  }

  .rb-product-card::before {
    content: '';
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    height: 3px;
    background: linear-gradient(90deg, #ff6b35, #e55a2b);
  }

  /* 희귀도별 색상 */
  .rb-rarity-common::before { background: #888; }
  .rb-rarity-uncommon::before { background: #4CAF50; }
  .rb-rarity-rare::before { background: #2196F3; }
  .rb-rarity-legendary::before { background: #FF9800; }

  .rb-product-icon {
    font-size: 32px;
    text-align: center;
    margin-bottom: 15px;
  }

  .rb-product-info {
    margin-bottom: 15px;
  }

  .rb-product-name {
    color: #fff;
    font-size: 18px;
    font-weight: 700;
    margin: 0 0 8px 0;
  }

  .rb-product-description {
    color: #ccc;
    font-size: 14px;
    margin: 0 0 12px 0;
    line-height: 1.4;
  }

  .rb-product-details {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .rb-product-price {
    color: #ff6b35;
    font-size: 16px;
    font-weight: 700;
  }

  .rb-product-stock {
    color: #888;
    font-size: 12px;
  }

  .rb-product-actions {
    margin-top: 15px;
  }

  .rb-add-cart-btn {
    width: 100%;
    padding: 10px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
    border: none;
    border-radius: 8px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-add-cart-btn:hover:not(.disabled) {
    background: linear-gradient(135deg, #e55a2b 0%, #d44a1b 100%);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }

  .rb-add-cart-btn.disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* 인벤토리 스타일 */
  .rb-inventory-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .rb-inventory-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    gap: 15px;
    flex: 1;
    overflow-y: auto;
  }

  .rb-inventory-item {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #444;
    border-radius: 10px;
    padding: 15px;
    display: flex;
    align-items: center;
    gap: 15px;
  }

  .rb-item-icon {
    font-size: 24px;
  }

  .rb-item-info {
    flex: 1;
  }

  .rb-item-info h4 {
    color: #fff;
    margin: 0 0 5px 0;
    font-size: 16px;
  }

  .rb-item-info p {
    color: #ccc;
    margin: 0;
    font-size: 14px;
  }

  .rb-sell-btn {
    padding: 8px 12px;
    background: #dc3545;
    border: none;
    border-radius: 6px;
    color: #fff;
    font-size: 12px;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-sell-btn:hover {
    background: #c82333;
  }

  /* 장바구니 스타일 */
  .rb-cart-container {
    flex: 1;
    display: flex;
    flex-direction: column;
    min-height: 0;
  }

  .rb-cart-items {
    flex: 1;
    overflow-y: auto;
    margin-bottom: 20px;
  }

  .rb-cart-item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 12px 15px;
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #444;
    border-radius: 8px;
    margin-bottom: 10px;
  }

  .rb-cart-item-info {
    display: flex;
    flex-direction: column;
    gap: 4px;
  }

  .rb-cart-item-name {
    color: #fff;
    font-weight: 600;
  }

  .rb-cart-item-price {
    color: #ff6b35;
    font-size: 14px;
  }

  .rb-remove-item-btn {
    background: #dc3545;
    border: none;
    border-radius: 4px;
    color: #fff;
    padding: 4px 8px;
    cursor: pointer;
    font-size: 12px;
  }

  .rb-cart-summary {
    background: linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%);
    border: 1px solid #ff6b35;
    border-radius: 10px;
    padding: 20px;
  }

  .rb-total-price {
    color: #ff6b35;
    font-size: 18px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 15px;
  }

  .rb-cart-actions {
    display: flex;
    gap: 10px;
  }

  .rb-remove-all-btn {
    flex: 1;
    padding: 10px;
    background: #6c757d;
    border: none;
    border-radius: 6px;
    color: #fff;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-remove-all-btn:hover {
    background: #5a6268;
  }

  .rb-purchase-btn {
    flex: 2;
    padding: 12px;
    background: linear-gradient(135deg, #ff6b35 0%, #e55a2b 100%);
    border: none;
    border-radius: 6px;
    color: #fff;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s ease;
  }

  .rb-purchase-btn:hover:not(.disabled) {
    background: linear-gradient(135deg, #e55a2b 0%, #d44a1b 100%);
    box-shadow: 0 4px 15px rgba(255, 107, 53, 0.3);
  }

  .rb-purchase-btn.disabled {
    background: #666;
    cursor: not-allowed;
    opacity: 0.6;
  }

  /* 빈 상태 */
  .rb-empty-state {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    text-align: center;
    color: #888;
  }

  .rb-empty-state h3 {
    color: #ccc;
    margin-bottom: 10px;
  }

  /* 통계 요약 영역 */
  .rb-stats-summary {
    margin-top: 15px;
    padding: 13px 20px;
    border-radius: 10px;
    border: 1px solid #bfbfbf;
    background: #f8f9fa;
  }

  .rb-stats-list {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    list-style: none;
    padding: 0;
    margin: 0;
  }

  .rb-stats-list li {
    display: flex;
    height: 20px;
    align-items: center;
    position: relative;
  }

  .rb-stats-list li:not(:first-child) {
    padding-left: 22px;
    border-left: 1px solid #bfbfbf;
  }

  .rb-stats-list li p {
    font-size: 19px;
    color: #333;
    margin: 0;
  }

  .rb-stats-list li span {
    display: block;
    font-size: 20px;
    font-weight: 600;
    margin-left: 10px;
    color: #17A2B8;
  }

  .rb-input-field {
    opacity: 0;
    z-index: -999;
    position: absolute;
  }

  .rb-content-box {
    padding: 13px 20px 0;
    border-radius: 10px;
    border: 1px solid #bfbfbf;
    flex: 1;
    display: flex;
    flex-direction: column;
  }

  .rb-typing-text {
    flex: 1;
    overflow-y: auto;
    min-height: 0;
  }

  .rb-typing-text::-webkit-scrollbar {
    width: 0;
  }

  .rb-typing-text p {
    text-align: justify;
    letter-spacing: 1px;
    word-break: break-all;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif !important;
  }

  .rb-typing-text p span {
    position: relative;
    display: inline-block;
    animation: fadeInUp 0.5s ease;
  }

  .rb-typing-text p span.space {
    min-width: 8px;
    max-width: 19px;
  }
  .rb-typing-text p span.space.correct {
    min-width: 8px;
    max-width: 8px;
  }

  .rb-typing-text p span.correct {
    color: #56964f;
  }

  .rb-typing-text p span.incorrect {
    color: #cb3439;
    outline: 1px solid #fff;
    background: #ffc0cb;
    border-radius: 4px;
    display: inline-block;
  }

  .rb-typing-text p span.active {
    color: #17A2B8;
    position: relative;
  }

  .rb-typing-text p span.typing-current {
    font-weight: 600;
  }

  .rb-content {
    margin-top: 17px;
    display: flex;
    padding: 12px 0;
    flex-wrap: wrap;
    align-items: center;
    justify-content: space-between;
    border-top: 1px solid #bfbfbf;
  }

  .rb-try-again-btn {
    outline: none;
    border: none;
    width: 105px;
    color: #fff;
    padding: 8px 0;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    background: #17A2B8;
    transition: transform 0.3s ease;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif !important;
  }

  .rb-try-again-btn:active {
    transform: scale(0.97);
  }
  .rb-stats-btn {
    outline: none;
    border: none;
    width: 105px;
    color: #fff;
    padding: 8px 0;
    font-size: 16px;
    cursor: pointer;
    border-radius: 5px;
    background: #333;
    transition: transform 0.3s ease;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif !important;
  }

  .rb-stats-btn:active {
    transform: scale(0.97);
  }

  /* 통계 뷰어 스타일 */
  .rb-total-stats {
    margin-bottom: 30px;
  }

  .rb-total-stats h3,
  .rb-daily-stats h3 {
    margin: 0 0 15px 0;
    font-size: 18px;
    color: #333;
    font-weight: 600;
  }

  .rb-stats-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(150px, 1fr));
    gap: 15px;
    margin-bottom: 20px;
  }

  .rb-stat-card {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    border-left: 4px solid #17A2B8;
    text-align: center;
  }

  .rb-stat-label {
    font-size: 12px;
    color: #666;
    margin-bottom: 5px;
    font-weight: 500;
  }

  .rb-stat-value {
    font-size: 20px;
    font-weight: 700;
    color: #17A2B8;
  }

  .rb-daily-list {
    max-height: 300px;
    overflow-y: auto;
  }

  .rb-daily-item {
    background: #f8f9fa;
    padding: 15px;
    border-radius: 8px;
    margin-bottom: 10px;
    border-left: 4px solid #17A2B8;
  }

  .rb-daily-date {
    font-size: 14px;
    font-weight: 600;
    color: #333;
    margin-bottom: 10px;
  }

  .rb-daily-stats {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(120px, 1fr));
    gap: 10px;
  }

  .rb-daily-stat {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 13px;
  }

  .rb-label {
    color: #666;
    font-weight: 500;
  }

  .rb-value {
    color: #17A2B8;
    font-weight: 600;
  }

  .rb-loading,
  .rb-empty,
  .rb-error {
    text-align: center;
    padding: 40px 20px;
    color: #999;
    font-size: 14px;
  }

  .rb-error {
    color: #cb3439;
  }

  .rb-result-details {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    width: calc(100% - 140px);
    justify-content: space-between;
  }

  .rb-result-details li {
    display: flex;
    height: 20px;
    list-style: none;
    position: relative;
    align-items: center;
  }

  .rb-result-details li:not(:first-child) {
    padding-left: 22px;
    border-left: 1px solid #bfbfbf;
  }

  .rb-result-details li p {
    font-size: 19px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif !important;
  }

  .rb-result-details li span {
    display: block;
    font-size: 20px;
    margin-left: 10px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif !important;
  }

  /* 타이핑 통계 스타일 */
  .rb-stats-container {
    width: 100%;
    padding: 20px;
    background: #fff;
    border-radius: 10px;
    box-sizing: border-box;
  }

  .rb-stats-header {
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #17A2B8;
  }

  .rb-stats-header h2 {
    margin: 0;
    font-size: 24px;
    color: #333;
    font-family:  'Pretendard', 'Noto Sans KR', system-ui, sans-serif !important;
  }

  .rb-stats-content {
    min-height: 200px;
  }

  .rb-stats-empty {
    text-align: center;
    padding: 40px 20px;
    color: #999;
  }

  .rb-stats-empty p {
    margin: 5px 0;
    font-size: 16px;
  }

  .rb-stats-list {
    display: flex;
    flex-direction: row;
    gap: 10px;
  }

  .rb-stat-item {
    display: flex;
    align-items: center;
    padding: 15px;
    background: #f8f9fa;
    border-radius: 8px;
    border-left: 4px solid #17A2B8;
  }

  .rb-stat-rank {
    font-size: 20px;
    font-weight: bold;
    color: #17A2B8;
    min-width: 40px;
  }

  .rb-stat-details {
    flex: 1;
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    margin: 0 15px;
  }

  .rb-stat-details span {
    padding: 4px 8px;
    background: #fff;
    border-radius: 4px;
    font-size: 14px;
    color: #333;
  }

  .rb-stat-time {
    font-size: 12px;
    color: #999;
  }

  /* 모바일 반응형 (≤768px) */
  @media (max-width: 768px) {
    .rb-typing-game {
      padding: 15px;
    }
    .rb-typing-text p {
      font-size: 18px;
    }
    .rb-result-details {
      width: 100%;
    }
    .rb-stats-btn {
      width: 100%;
      margin-top: 15px;
    }
    .rb-try-again-btn {
      width: 100%;
      margin-top: 15px;
    }
    .rb-result-details li:not(:first-child) {
      border-left: 0;
      padding: 0;
    }
    .rb-stats-summary {
      margin-top: 12px;
      padding: 10px 15px;
    }
    .rb-stats-list {
      flex-direction: column;
      gap: 8px;
    }
    .rb-stats-list li {
      width: 100%;
      justify-content: space-between;
    }
    .rb-stats-list li:not(:first-child) {
      border-left: 0;
      padding-left: 0;
      padding-top: 8px;
      border-top: 1px solid #bfbfbf;
    }
    .rb-stats-list li p {
      font-size: 16px;
    }
    .rb-stats-list li span {
      font-size: 18px;
    }
    .rb-stat-item {
      flex-direction: column;
      align-items: flex-start;
      gap: 10px;
    }
    .rb-stat-details {
      margin: 0;
    }
    .rb-toolbar {
      padding:12px 16px;
      gap:10px;
    }
    .rb-title {
      font-size:16px;
      color:#f0f2f5;
    }
    .rb-btn {
      padding:10px 16px;
      font-size:14px;
      min-height:44px; /* 터치 영역 확보 */
      color:#e8eaed;
    }
    .rb-item {
      padding:16px 18px;
      min-height:60px;
      font-size:15px; /* 모바일 가독성 향상 */
    }
    .rb-item > div {
      line-height:1.6;
    }
    .rb-page {
      padding:16px;
    }
    .rb-field {
      margin-bottom:16px;
    }
    .rb-field label {
      color:#c4c7cc;
    }
    .rb-field input, .rb-field textarea {
      padding:12px 14px;
      font-size:16px; /* iOS zoom 방지 */
      min-height:44px;
      color:#e8eaed;
    }
    .rb-tab {
      padding:10px 16px;
      font-size:13px;
    }
    .rb-tab-icon {
      font-size:18px;
    }
    .rb-preview-content {
      padding:12px;
    }
    .rb-preview-grid {
      gap:10px;
    }
    .rb-upload-icon {
      font-size:40px;
    }
    .rb-upload-text {
      font-size:13px;
    }
    .rb-spinner {
      width:40px;
      height:40px;
      border-width:3px;
    }
    .rb-loading-text {
      font-size:13px;
    }
    .rb-tooltip {
      max-width:260px;
      left:50% !important;
      right:auto !important;
      transform:translateX(-50%);
    }
    .rb-tooltip img {
      width:120px;
      height:120px;
    }
  }

  /* 태블릿 (769px ~ 1024px) */
  @media (min-width: 769px) and (max-width: 1024px) {
    .rb-toolbar {
      padding:11px 14px;
    }
    .rb-title {
      color:#eef0f3;
    }
    .rb-btn {
      padding:9px 14px;
      color:#e8eaed;
    }
    .rb-item {
      padding:15px 17px;
      font-size:14.5px;
    }
  }

  /* 데스크탑 (≥1025px) */
  @media (min-width: 1025px) {
    .rb-wrap {
      max-height:calc(100vh - 100px);
    }
    .rb-list {
      max-height:calc(100vh - 200px);
    }
    .rb-page {
      max-height:calc(100vh - 200px);
    }
  }

  @keyframes fadeInUp { 
    0% {
      opacity: 0;
      transform: translateY(20px);
    }
    100% {
      opacity: 1;
      transform: translateY(0);
    }
  }
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 659:
/***/ ((module) => {



var memo = {};

/* istanbul ignore next  */
function getTarget(target) {
  if (typeof memo[target] === "undefined") {
    var styleTarget = document.querySelector(target);

    // Special case to return head of iframe instead of iframe itself
    if (window.HTMLIFrameElement && styleTarget instanceof window.HTMLIFrameElement) {
      try {
        // This will throw an exception if access to iframe is blocked
        // due to cross-origin restrictions
        styleTarget = styleTarget.contentDocument.head;
      } catch (e) {
        // istanbul ignore next
        styleTarget = null;
      }
    }
    memo[target] = styleTarget;
  }
  return memo[target];
}

/* istanbul ignore next  */
function insertBySelector(insert, style) {
  var target = getTarget(insert);
  if (!target) {
    throw new Error("Couldn't find a style target. This probably means that the value for the 'insert' parameter is invalid.");
  }
  target.appendChild(style);
}
module.exports = insertBySelector;

/***/ }),

/***/ 825:
/***/ ((module) => {



/* istanbul ignore next  */
function apply(styleElement, options, obj) {
  var css = "";
  if (obj.supports) {
    css += "@supports (".concat(obj.supports, ") {");
  }
  if (obj.media) {
    css += "@media ".concat(obj.media, " {");
  }
  var needLayer = typeof obj.layer !== "undefined";
  if (needLayer) {
    css += "@layer".concat(obj.layer.length > 0 ? " ".concat(obj.layer) : "", " {");
  }
  css += obj.css;
  if (needLayer) {
    css += "}";
  }
  if (obj.media) {
    css += "}";
  }
  if (obj.supports) {
    css += "}";
  }
  var sourceMap = obj.sourceMap;
  if (sourceMap && typeof btoa !== "undefined") {
    css += "\n/*# sourceMappingURL=data:application/json;base64,".concat(btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))), " */");
  }

  // For old IE
  /* istanbul ignore if  */
  options.styleTagTransform(css, styleElement, options.options);
}
function removeStyleElement(styleElement) {
  // istanbul ignore if
  if (styleElement.parentNode === null) {
    return false;
  }
  styleElement.parentNode.removeChild(styleElement);
}

/* istanbul ignore next  */
function domAPI(options) {
  if (typeof document === "undefined") {
    return {
      update: function update() {},
      remove: function remove() {}
    };
  }
  var styleElement = options.insertStyleElement(options);
  return {
    update: function update(obj) {
      apply(styleElement, options, obj);
    },
    remove: function remove() {
      removeStyleElement(styleElement);
    }
  };
}
module.exports = domAPI;

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			id: moduleId,
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/nonce */
/******/ 	(() => {
/******/ 		__webpack_require__.nc = undefined;
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./src/constants.js
var constants = __webpack_require__(521);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/injectStylesIntoStyleTag.js
var injectStylesIntoStyleTag = __webpack_require__(72);
var injectStylesIntoStyleTag_default = /*#__PURE__*/__webpack_require__.n(injectStylesIntoStyleTag);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleDomAPI.js
var styleDomAPI = __webpack_require__(825);
var styleDomAPI_default = /*#__PURE__*/__webpack_require__.n(styleDomAPI);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertBySelector.js
var insertBySelector = __webpack_require__(659);
var insertBySelector_default = /*#__PURE__*/__webpack_require__.n(insertBySelector);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/setAttributesWithoutAttributes.js
var setAttributesWithoutAttributes = __webpack_require__(56);
var setAttributesWithoutAttributes_default = /*#__PURE__*/__webpack_require__.n(setAttributesWithoutAttributes);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/insertStyleElement.js
var insertStyleElement = __webpack_require__(540);
var insertStyleElement_default = /*#__PURE__*/__webpack_require__.n(insertStyleElement);
// EXTERNAL MODULE: ./node_modules/style-loader/dist/runtime/styleTagTransform.js
var styleTagTransform = __webpack_require__(113);
var styleTagTransform_default = /*#__PURE__*/__webpack_require__.n(styleTagTransform);
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/ui/styles.css
var styles = __webpack_require__(628);
;// ./src/ui/styles.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(styles/* default */.A, options);




       /* harmony default export */ const ui_styles = (styles/* default */.A && styles/* default */.A.locals ? styles/* default */.A.locals : undefined);

;// ./src/ui/styles.js
/**
 * CSS 스타일 관리 모듈
 *
 * CSS 파일을 별도로 분리하여 가독성과 유지보수성을 향상시켰습니다.
 * - styles.css: 모든 스타일 정의
 * - webpack이 자동으로 번들에 포함시킵니다.
 */

// CSS 파일 import (webpack의 css-loader와 style-loader가 처리)


// injectStyles 함수는 더 이상 필요하지 않지만 하위 호환성을 위해 유지
function injectStyles() {
  // CSS는 webpack에 의해 자동으로 주입되므로 이 함수는 아무것도 하지 않습니다.
  // 하위 호환성을 위해 함수만 export합니다.
}

;// ./src/utils/script-injector.js


function injectScripts() {
  constants/* EXTERNAL_SCRIPTS */.rZ.forEach((scriptConfig) => {
    const existingScript = document.querySelector(
      `script[src="${scriptConfig.src}"]`
    );
    if (existingScript) {
      return;
    }

    const script = document.createElement("script");
    script.src = scriptConfig.src;
    script.type = "text/javascript";

    document.body.appendChild(script);
  });
}

;// ./src/ui/components/ui/menu-button.js

/**
 * 블랙마켓 메뉴 버튼 컴포넌트
 * RISU AI의 메뉴 영역에 표시되는 버튼
 */
  class MenuButton extends HTMLElement {
  connectedCallback() {
    this.innerHTML = `
      <div class="flex items-center cursor-pointer hover:text-green-500 transition-colors">
        <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
          <!-- 페도라 모자 -->
          <ellipse cx="10" cy="7" rx="6" ry="1"></ellipse>
          <path d="M6 7 L7 4 C7 3 8 2 10 2 C12 2 13 3 13 4 L14 7"></path>
          
          <!-- 얼굴 -->
          <circle cx="10" cy="11" r="4"></circle>
          
          <!-- 선글라스 -->
          <line x1="7" y1="10" x2="13" y2="10" stroke-width="2"></line>
          <circle cx="8.5" cy="10" r="1" fill="currentColor"></circle>
          <circle cx="11.5" cy="10" r="1" fill="currentColor"></circle>
          
          <!-- 정장 -->
          <path d="M6 15 L7 17 M14 15 L13 17"></path>
          <line x1="10" y1="15" x2="10" y2="18"></line>
        </svg>
        <span class="ml-2">블랙마켓</span>
      </div>
    `;
  }
}

// 커스텀 엘리먼트 등록
if (!customElements.get(`menu-button-${constants/* PLUGIN_NAME */.AF}`)) {
  customElements.define(`menu-button-${constants/* PLUGIN_NAME */.AF}`, MenuButton);
}

const MENU_BUTTON_TAG = `menu-button-${constants/* PLUGIN_NAME */.AF}`;

// EXTERNAL MODULE: ./src/core/risu-api.js
var risu_api = __webpack_require__(300);
;// ./node_modules/winbox/dist/winbox.bundle.min.js
/**
 * WinBox.js v0.2.82 (Bundle)
 * Author and Copyright: Thomas Wilkerling
 * Licence: Apache-2.0
 * Hosted by Nextapps GmbH
 * https://github.com/nextapps-de/winbox
 */
(function(){'use strict';var e,aa=document.createElement("style");aa.innerHTML="@keyframes wb-fade-in{0%{opacity:0}to{opacity:.85}}.winbox{position:fixed;left:0;top:0;background:#0050ff;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22);transition:width .3s,height .3s,left .3s,top .3s;transition-timing-function:cubic-bezier(.3,1,.3,1);contain:layout size;text-align:left;touch-action:none}.wb-body,.wb-header{position:absolute;left:0}.wb-header{top:0;width:100%;height:35px;line-height:35px;color:#fff;overflow:hidden;z-index:1}.wb-body{top:35px;right:0;bottom:0;overflow:auto;-webkit-overflow-scrolling:touch;overflow-scrolling:touch;will-change:contents;background:#fff;margin-top:0!important;contain:strict;z-index:0}.wb-control *,.wb-icon{background-repeat:no-repeat}.wb-drag{height:100%;padding-left:10px;cursor:move}.wb-title{font-family:Arial,sans-serif;font-size:14px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.wb-icon{display:none;width:20px;height:100%;margin:-1px 8px 0-3px;float:left;background-size:100%;background-position:center}.wb-e,.wb-w{width:10px;top:0}.wb-n,.wb-s{left:0;height:10px;position:absolute}.wb-n{top:-5px;right:0;cursor:n-resize;z-index:2}.wb-e{position:absolute;right:-5px;bottom:0;cursor:w-resize;z-index:2}.wb-s{bottom:-5px;right:0;cursor:n-resize;z-index:2}.wb-nw,.wb-sw,.wb-w{left:-5px}.wb-w{position:absolute;bottom:0;cursor:w-resize;z-index:2}.wb-ne,.wb-nw,.wb-sw{width:15px;height:15px;z-index:2;position:absolute}.wb-nw{top:-5px;cursor:nw-resize}.wb-ne,.wb-sw{cursor:ne-resize}.wb-ne{top:-5px;right:-5px}.wb-se,.wb-sw{bottom:-5px}.wb-se{position:absolute;right:-5px;width:15px;height:15px;cursor:nw-resize;z-index:2}.wb-control{float:right;height:100%;max-width:100%;text-align:center}.wb-control *{display:inline-block;width:30px;height:100%;max-width:100%;background-position:center;cursor:pointer}.no-close .wb-close,.no-full .wb-full,.no-header .wb-header,.no-max .wb-max,.no-min .wb-min,.no-resize .wb-body~div,.wb-body .wb-hide,.wb-show,.winbox.hide,.winbox.min .wb-body>*,.winbox.min .wb-full,.winbox.min .wb-min,.winbox.modal .wb-full,.winbox.modal .wb-max,.winbox.modal .wb-min{display:none}.winbox.max .wb-drag,.winbox.min .wb-drag{cursor:default}.wb-min{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNiAyIj48cGF0aCBmaWxsPSIjZmZmIiBkPSJNOCAwaDdhMSAxIDAgMCAxIDAgMkgxYTEgMSAwIDAgMSAwLTJoN3oiLz48L3N2Zz4=);background-size:14px auto;background-position:center calc(50% + 6px)}.wb-max{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9IiNmZmYiIHZpZXdCb3g9IjAgMCA5NiA5NiI+PHBhdGggZD0iTTIwIDcxLjMxMUMxNS4zNCA2OS42NyAxMiA2NS4yMyAxMiA2MFYyMGMwLTYuNjMgNS4zNy0xMiAxMi0xMmg0MGM1LjIzIDAgOS42NyAzLjM0IDExLjMxMSA4SDI0Yy0yLjIxIDAtNCAxLjc5LTQgNHY1MS4zMTF6Ii8+PHBhdGggZD0iTTkyIDc2VjM2YzAtNi42My01LjM3LTEyLTEyLTEySDQwYy02LjYzIDAtMTIgNS4zNy0xMiAxMnY0MGMwIDYuNjMgNS4zNyAxMiAxMiAxMmg0MGM2LjYzIDAgMTItNS4zNyAxMi0xMnptLTUyIDRjLTIuMjEgMC00LTEuNzktNC00VjM2YzAtMi4yMSAxLjc5LTQgNC00aDQwYzIuMjEgMCA0IDEuNzkgNCA0djQwYzAgMi4yMS0xLjc5IDQtNCA0SDQweiIvPjwvc3ZnPg==);background-size:17px auto}.wb-close{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9Ii0xIC0xIDE4IDE4Ij48cGF0aCBmaWxsPSIjZmZmIiBkPSJtMS42MTMuMjEuMDk0LjA4M0w4IDYuNTg1IDE0LjI5My4yOTNsLjA5NC0uMDgzYTEgMSAwIDAgMSAxLjQwMyAxLjQwM2wtLjA4My4wOTRMOS40MTUgOGw2LjI5MiA2LjI5M2ExIDEgMCAwIDEtMS4zMiAxLjQ5N2wtLjA5NC0uMDgzTDggOS40MTVsLTYuMjkzIDYuMjkyLS4wOTQuMDgzQTEgMSAwIDAgMSAuMjEgMTQuMzg3bC4wODMtLjA5NEw2LjU4NSA4IC4yOTMgMS43MDdBMSAxIDAgMCAxIDEuNjEzLjIxeiIvPjwvc3ZnPg==);background-size:15px auto;background-position:5px center}.wb-full{background-image:url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIGZpbGw9Im5vbmUiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLWxpbmVjYXA9InJvdW5kIiBzdHJva2Utd2lkdGg9IjIuNSIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNOCAzSDVhMiAyIDAgMCAwLTIgMnYzbTE4IDBWNWEyIDIgMCAwIDAtMi0yaC0zbTAgMThoM2EyIDIgMCAwIDAgMi0ydi0zTTMgMTZ2M2EyIDIgMCAwIDAgMiAyaDMiLz48L3N2Zz4=);background-size:16px auto}.winbox.max .wb-body~div,.winbox.min .wb-body~div,.winbox.modal .wb-body~div,.winbox.modal .wb-drag,body.wb-lock iframe{pointer-events:none}.winbox.max{box-shadow:none}.winbox.max .wb-body{margin:0!important}.winbox iframe{position:absolute;width:100%;height:100%;border:0}body.wb-lock .winbox{will-change:left,top,width,height;transition:none}.winbox.modal:before{content:'';position:absolute;top:0;left:0;right:0;bottom:0;background:inherit;border-radius:inherit}.winbox.modal:after{content:'';position:absolute;top:-50vh;left:-50vw;right:-50vw;bottom:-50vh;background:#0d1117;animation:wb-fade-in .2s ease-out forwards;z-index:-1}.no-animation{transition:none}.no-shadow{box-shadow:none}.no-header .wb-body{top:0}.no-move:not(.min) .wb-title{pointer-events:none}.wb-body .wb-show{display:revert}";
var h=document.getElementsByTagName("head")[0];h.firstChild?h.insertBefore(aa,h.firstChild):h.appendChild(aa);var ba=document.createElement("div");ba.innerHTML="<div class=wb-header><div class=wb-control><span class=wb-min></span><span class=wb-max></span><span class=wb-full></span><span class=wb-close></span></div><div class=wb-drag><div class=wb-icon></div><div class=wb-title></div></div></div><div class=wb-body></div><div class=wb-n></div><div class=wb-s></div><div class=wb-w></div><div class=wb-e></div><div class=wb-nw></div><div class=wb-ne></div><div class=wb-se></div><div class=wb-sw></div>";function k(a,b,c,f){a&&a.addEventListener(b,c,f||!1)}function l(a,b){var c=window,f=m;c&&c.removeEventListener(a,b,f||!1)}function t(a,b){a.stopPropagation();b&&a.preventDefault()}function u(a,b,c){c=""+c;a["_s_"+b]!==c&&(a.style.setProperty(b,c),a["_s_"+b]=c)};/*
 self.max &&*/
var x=[],A=[],ca={capture:!0,passive:!1},m={capture:!0,passive:!0},B,da=0,E=10,F,J,ha,K,P,ia;
function U(a,b){if(!(this instanceof U))return new U(a);B||ja();if(a){if(b){var c=a;a=b}if("string"===typeof a)c=a;else{var f=a.id;var d=a.index;var n=a.root;var p=a.template;c=c||a.title;var v=a.icon;var L=a.mount;var Q=a.html;var g=a.url;var q=a.width;var r=a.height;var w=a.minwidth;var C=a.minheight;var y=a.maxwidth;var z=a.maxheight;var ea=a.autosize;var D=a.overflow;var G=a.min;var H=a.max;var I=a.hidden;var fa=a.modal;var X=a.x||(fa?"center":0);var Y=a.y||(fa?"center":0);var M=a.top;var N=a.left;
var R=a.bottom;var S=a.right;var la=a.background;var O=a.border;var T=a.header;var Z=a["class"];var ma=a.oncreate;var ra=a.onclose;var sa=a.onfocus;var ta=a.onblur;var ua=a.onmove;var va=a.onresize;var wa=a.onfullscreen;var xa=a.onmaximize;var ya=a.onminimize;var za=a.onrestore;var Aa=a.onhide;var Ba=a.onshow;var Ca=a.onload}}this.g=(p||ba).cloneNode(!0);this.g.id=this.id=f||"winbox-"+ ++da;this.g.className="winbox"+(Z?" "+("string"===typeof Z?Z:Z.join(" ")):"")+(fa?" modal":"");this.g.winbox=this;
this.window=this.g;this.body=this.g.getElementsByClassName("wb-body")[0];this.h=T||35;A.push(this);la&&this.setBackground(la);O?u(this.body,"margin",O+(isNaN(O)?"":"px")):O=0;T&&(b=this.g.getElementsByClassName("wb-header")[0],u(b,"height",T+"px"),u(b,"line-height",T+"px"),u(this.body,"top",T+"px"));c&&this.setTitle(c);v&&this.setIcon(v);L?this.mount(L):Q?this.body.innerHTML=Q:g&&this.setUrl(g,Ca);M=M?V(M,P):0;R=R?V(R,P):0;N=N?V(N,K):0;S=S?V(S,K):0;c=K-N-S;v=P-M-R;y=y?V(y,c):c;z=z?V(z,v):v;w=w?V(w,
y):150;C=C?V(C,z):this.h;ea?((n||B).appendChild(this.body),q=Math.max(Math.min(this.body.clientWidth+2*O+1,y),w),r=Math.max(Math.min(this.body.clientHeight+this.h+O+1,z),C),this.g.appendChild(this.body)):(q=q?V(q,y):Math.max(y/2,w)|0,r=r?V(r,z):Math.max(z/2,C)|0);X=X?V(X,c,q):N;Y=Y?V(Y,v,r):M;this.x=X;this.y=Y;this.width=q;this.height=r;this.s=w;this.o=C;this.m=y;this.l=z;this.top=M;this.right=S;this.bottom=R;this.left=N;this.index=d;this.j=D;this.focused=this.hidden=this.full=this.max=this.min=!1;
this.onclose=ra;this.onfocus=sa;this.onblur=ta;this.onmove=ua;this.onresize=va;this.onfullscreen=wa;this.onmaximize=xa;this.onminimize=ya;this.onrestore=za;this.onhide=Aa;this.onshow=Ba;I?this.hide():this.focus();if(d||0===d)this.index=d,u(this.g,"z-index",d),d>E&&(E=d);H?this.maximize():G?this.minimize():this.resize().move();ka(this);(n||B).appendChild(this.g);ma&&ma.call(this,a)}U["new"]=function(a){return new U(a)};U.stack=function(){return A};
function V(a,b,c){"string"===typeof a&&("center"===a?a=(b-c)/2+.5|0:"right"===a||"bottom"===a?a=b-c:(c=parseFloat(a),a="%"===(""+c!==a&&a.substring((""+c).length))?b/100*c+.5|0:c));return a}
function ja(){B=document.body;B[J="requestFullscreen"]||B[J="msRequestFullscreen"]||B[J="webkitRequestFullscreen"]||B[J="mozRequestFullscreen"]||(J="");ha=J&&J.replace("request","exit").replace("mozRequest","mozCancel").replace("Request","Exit");k(window,"resize",function(){na();oa()});k(B,"mousedown",function(){ia=!1},!0);k(B,"mousedown",function(){if(!ia){var a=A.length;if(a)for(--a;0<=a;a--){var b=A[a];if(b.focused){b.blur();break}}}});na()}
function ka(a){W(a,"drag");W(a,"n");W(a,"s");W(a,"w");W(a,"e");W(a,"nw");W(a,"ne");W(a,"se");W(a,"sw");k(a.g.getElementsByClassName("wb-min")[0],"click",function(b){t(b);a.min?a.restore().focus():a.minimize()});k(a.g.getElementsByClassName("wb-max")[0],"click",function(b){t(b);a.max?a.restore().focus():a.maximize().focus()});J?k(a.g.getElementsByClassName("wb-full")[0],"click",function(b){t(b);a.fullscreen().focus()}):a.addClass("no-full");k(a.g.getElementsByClassName("wb-close")[0],"click",function(b){t(b);
a.close()||(a=null)});k(a.g,"mousedown",function(){ia=!0},!0);k(a.body,"mousedown",function(){a.focus()},!0)}function pa(a){x.splice(x.indexOf(a),1);oa();a.removeClass("min");a.min=!1;a.g.title=""}function oa(){for(var a=x.length,b={},c={},f=0,d;f<a;f++)d=x[f],d=d.left+":"+d.top,c[d]?c[d]++:(b[d]=0,c[d]=1);f=0;for(var n,p;f<a;f++)d=x[f],n=d.left+":"+d.top,p=Math.min((K-d.left-d.right)/c[n],250),d.resize(p+1|0,d.h,!0).move(d.left+b[n]*p|0,P-d.bottom-d.h,!0),b[n]++}
function W(a,b){function c(g){t(g,!0);a.focus();if("drag"===b){if(a.min){a.restore();return}if(!a.g.classList.contains("no-max")){var q=Date.now(),r=q-Q;Q=q;if(300>r){a.max?a.restore():a.maximize();return}}}a.min||(B.classList.add("wb-lock"),(p=g.touches)&&(p=p[0])?(g=p,k(window,"touchmove",f,m),k(window,"touchend",d,m)):(k(window,"mousemove",f,m),k(window,"mouseup",d,m)),v=g.pageX,L=g.pageY)}function f(g){t(g);p&&(g=g.touches[0]);var q=g.pageX;g=g.pageY;var r=q-v,w=g-L,C=a.width,y=a.height,z=a.x,
ea=a.y,D;if("drag"===b){if(a.g.classList.contains("no-move"))return;a.x+=r;a.y+=w;var G=D=1}else{if("e"===b||"se"===b||"ne"===b){a.width+=r;var H=1}else if("w"===b||"sw"===b||"nw"===b)a.x+=r,a.width-=r,G=H=1;if("s"===b||"se"===b||"sw"===b){a.height+=w;var I=1}else if("n"===b||"ne"===b||"nw"===b)a.y+=w,a.height-=w,D=I=1}H&&(a.width=Math.max(Math.min(a.width,a.m,K-a.x-a.right),a.s),H=a.width!==C);I&&(a.height=Math.max(Math.min(a.height,a.l,P-a.y-a.bottom),a.o),I=a.height!==y);(H||I)&&a.resize();G&&
(a.max&&(a.x=(q<K/3?a.left:q>K/3*2?K-a.width-a.right:K/2-a.width/2)+r),a.x=Math.max(Math.min(a.x,a.j?K-30:K-a.width-a.right),a.j?30-a.width:a.left),G=a.x!==z);D&&(a.max&&(a.y=a.top+w),a.y=Math.max(Math.min(a.y,a.j?P-a.h:P-a.height-a.bottom),a.top),D=a.y!==ea);if(G||D)a.max&&a.restore(),a.move();if(H||G)v=q;if(I||D)L=g}function d(g){t(g);B.classList.remove("wb-lock");p?(l("touchmove",f),l("touchend",d)):(l("mousemove",f),l("mouseup",d))}var n=a.g.getElementsByClassName("wb-"+b)[0];if(n){var p,v,L,
Q=0;k(n,"mousedown",c,ca);k(n,"touchstart",c,ca)}}function na(){var a=document.documentElement;K=a.clientWidth;P=a.clientHeight}e=U.prototype;e.mount=function(a){this.unmount();a.i||(a.i=a.parentNode);this.body.textContent="";this.body.appendChild(a);return this};e.unmount=function(a){var b=this.body.firstChild;if(b){var c=a||b.i;c&&c.appendChild(b);b.i=a}return this};
e.setTitle=function(a){var b=this.g.getElementsByClassName("wb-title")[0];a=this.title=a;var c=b.firstChild;c?c.nodeValue=a:b.textContent=a;return this};e.setIcon=function(a){var b=this.g.getElementsByClassName("wb-icon")[0];u(b,"background-image","url("+a+")");u(b,"display","inline-block");return this};e.setBackground=function(a){u(this.g,"background",a);return this};
e.setUrl=function(a,b){var c=this.body.firstChild;c&&"iframe"===c.tagName.toLowerCase()?c.src=a:(this.body.innerHTML='<iframe src="'+a+'"></iframe>',b&&(this.body.firstChild.onload=b));return this};e.focus=function(a){if(!1===a)return this.blur();if(!this.focused){a=A.length;if(1<a)for(var b=1;b<=a;b++){var c=A[a-b];if(c.focused){c.blur();A.push(A.splice(A.indexOf(this),1)[0]);break}}u(this.g,"z-index",++E);this.index=E;this.addClass("focus");this.focused=!0;this.onfocus&&this.onfocus()}return this};
e.blur=function(a){if(!1===a)return this.focus();this.focused&&(this.removeClass("focus"),this.focused=!1,this.onblur&&this.onblur());return this};e.hide=function(a){if(!1===a)return this.show();if(!this.hidden)return this.onhide&&this.onhide(),this.hidden=!0,this.addClass("hide")};e.show=function(a){if(!1===a)return this.hide();if(this.hidden)return this.onshow&&this.onshow(),this.hidden=!1,this.removeClass("hide")};
e.minimize=function(a){if(!1===a)return this.restore();F&&qa();this.max&&(this.removeClass("max"),this.max=!1);this.min||(x.push(this),oa(),this.g.title=this.title,this.addClass("min"),this.min=!0,this.focused&&(this.blur(),Da()),this.onminimize&&this.onminimize());return this};function Da(){var a=A.length;if(a)for(--a;0<=a;a--){var b=A[a];if(!b.min){b.focus();break}}}
e.restore=function(){F&&qa();this.min&&(pa(this),this.resize().move(),this.onrestore&&this.onrestore());this.max&&(this.max=!1,this.removeClass("max").resize().move(),this.onrestore&&this.onrestore());return this};e.maximize=function(a){if(!1===a)return this.restore();F&&qa();this.min&&pa(this);this.max||(this.addClass("max").resize(K-this.left-this.right,P-this.top-this.bottom,!0).move(this.left,this.top,!0),this.max=!0,this.onmaximize&&this.onmaximize());return this};
e.fullscreen=function(a){this.min&&(pa(this),this.resize().move());if(!F||!qa())this.body[J](),F=this,this.full=!0,this.onfullscreen&&this.onfullscreen();else if(!1===a)return this.restore();return this};function qa(){F.full=!1;if(document.fullscreen||document.fullscreenElement||document.webkitFullscreenElement||document.mozFullScreenElement)return document[ha](),!0}
e.close=function(a){if(this.onclose&&this.onclose(a))return!0;this.min&&pa(this);A.splice(A.indexOf(this),1);this.unmount();this.g.remove();this.g.textContent="";this.g=this.body=this.g.winbox=null;this.focused&&Da()};e.move=function(a,b,c){a||0===a?c||(this.x=a?a=V(a,K-this.left-this.right,this.width):0,this.y=b?b=V(b,P-this.top-this.bottom,this.height):0):(a=this.x,b=this.y);u(this.g,"left",a+"px");u(this.g,"top",b+"px");this.onmove&&this.onmove(a,b);return this};
e.resize=function(a,b,c){a||0===a?c||(this.width=a?a=V(a,this.m):0,this.height=b?b=V(b,this.l):0,a=Math.max(a,this.s),b=Math.max(b,this.o)):(a=this.width,b=this.height);u(this.g,"width",a+"px");u(this.g,"height",b+"px");this.onresize&&this.onresize(a,b);return this};
e.addControl=function(a){var b=a["class"],c=a.image,f=a.click;a=a.index;var d=document.createElement("span"),n=this.g.getElementsByClassName("wb-control")[0],p=this;b&&(d.className=b);c&&u(d,"background-image","url("+c+")");f&&(d.onclick=function(v){f.call(this,v,p)});n.insertBefore(d,n.childNodes[a||0]);return this};e.removeControl=function(a){(a=this.g.getElementsByClassName(a)[0])&&a.remove();return this};e.addClass=function(a){this.g.classList.add(a);return this};
e.removeClass=function(a){this.g.classList.remove(a);return this};e.toggleClass=function(a){return this.g.classList.contains(a)?this.removeClass(a):this.addClass(a)};window.WinBox=U;}).call(undefined);

;// ./src/ui/components/main.js






// 메인 애플리케이션 클래스
class App {
    constructor() {
      this.risuAPI = null;
      this.observer = null;
      this.moduleBox = null;
      this.moduleBoxRoot = document.createElement("div");
      this.moduleBoxRoot.className = "sample-wrap";
    }
  
    async initialize() {
      // RisuAPI 초기화
      this.risuAPI = new risu_api/* RisuAPI */.m(globalThis.__pluginApis__);
      const accepted = await this.risuAPI.initialize();
  
      if (!accepted) {
        console.log(`[${constants/* PLUGIN_NAME */.AF}] Failed to initialize`);
        return false;
      }
  
      // UI 초기화
      this.initializeUI();
      this.startObserver();
  
      console.log(`[${constants/* PLUGIN_NAME */.AF}] plugin loaded`);
      return true;
    }
  
    initializeUI() {
      // 스타일 주입
      injectStyles();
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
  
    destroy() {
      if (this.observer) this.observer.disconnect();
      console.log(`${constants/* PLUGIN_NAME */.AF} 언로드`);
    }
  }
  
;// ./src/core/update-manager.js


/**
 * unpkg에서 최신 버전의 메타데이터를 파싱
 * @returns {Promise<Object|null>} manifest 객체 또는 null
 */
async function fetchLatestManifest() {
  try {
    const url = `https://unpkg.com/${constants/* PLUGIN_NAME */.AF}@latest/dist/${constants/* PLUGIN_NAME */.AF}.js`;

    // HEAD 요청으로 redirect된 최종 URL 확인
    const headResponse = await fetch(url, {
      method: 'HEAD',
      redirect: 'follow'
    });

    // 실제 resolved 버전 확인 (예: https://unpkg.com/cdn-test1@0.2.0/dist/cdn_test1.js)
    const resolvedUrl = headResponse.url;
    const versionMatch = resolvedUrl.match(/@([\d.]+)\//);

    if (!versionMatch) {
      throw new Error('Version not found in resolved URL');
    }

    const latestVersion = versionMatch[1];

    // 실제 파일 내용에서 배너 메타데이터 추출 (옵션)
    const content = await fetch(resolvedUrl).then(r => r.text());
    const bannerRegex = /\/\/@name (.+?)\n\/\/@display-name (.+?)\n\/\/@version (.+?)\n\/\/@description (.+?)(?:\n|$)/;
    const bannerMatch = content.match(bannerRegex);

    // 릴리즈 노트 가져오기
    const notesUrl = `https://unpkg.com/${constants/* PLUGIN_NAME */.AF}@${latestVersion}/dist/release-notes.json`;
    let releaseData = {};

    try {
      const notesResponse = await fetch(notesUrl);
      if (notesResponse.ok) {
        const allNotes = await notesResponse.json();
        releaseData = allNotes[latestVersion] || {};
      }
    } catch (error) {
      console.warn('[UpdateManager] Failed to fetch release notes:', error);
    }

    return {
      version: latestVersion,
      url: resolvedUrl,
      name: bannerMatch?.[1]?.trim() || constants/* PLUGIN_NAME */.AF,
      displayName: bannerMatch?.[2]?.trim() || `${constants/* PLUGIN_NAME */.AF}_v${latestVersion}`,
      description: bannerMatch?.[4]?.trim() || '',
      mandatory: releaseData.mandatory || false,
      notes: releaseData.notes || [],
      released_at: releaseData.released_at || new Date().toISOString()
    };
  } catch (error) {
    console.error('[UpdateManager] Failed to fetch manifest:', error);
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
  const parts1 = v1.split('.').map(Number);
  const parts2 = v2.split('.').map(Number);

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
        ).join('') || '<li>세부 변경사항은 릴리스 노트를 참고해주세요</li>'}
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
  }

/**
 * 업데이트 체크 및 사용자 확인
 * @param {Object} options - 옵션
 * @param {boolean} [options.silent=false] - silent 모드 (로그 최소화)
 * @param {boolean} [options.force=false] - skip 버전 무시
 * @param {Object} [options.i18n={}] - 다국어 텍스트
 * @returns {Promise<Object>} 업데이트 결과
 */
async function checkForUpdates(options = {}) {
  const {
    silent = false,
    force = false,
    i18n = {}
  } = options;

  try {
    const manifest = await fetchLatestManifest();

    if (!manifest) {
      if (!silent) console.log('[UpdateManager] Unable to check for updates');
      return { available: false, error: 'fetch_failed' };
    }

    const currentVersion = constants/* PLUGIN_VERSION */.jN;
    const latestVersion = manifest.version;

    // Skip 버전 확인
    const skipKey = `${constants/* PLUGIN_NAME */.AF}_skip_version`;
    const skipVersion = localStorage.getItem(skipKey);
    if (!force && skipVersion === latestVersion) {
      if (!silent) console.log(`[UpdateManager] Version ${latestVersion} is skipped by user`);
      return { available: false, skipped: true, version: latestVersion };
    }

    // 버전 비교
    const comparison = compareVersions(latestVersion, currentVersion);

    if (comparison <= 0) {
      if (!silent) console.log(`[UpdateManager] Already up to date (${currentVersion})`);
      return { available: false, current: currentVersion, latest: latestVersion };
    }

    console.log(`[UpdateManager] New version available: ${currentVersion} → ${latestVersion}`);

    // 사용자 확인 UI 표시
    const result = await confirmUpdate({
      name: constants/* PLUGIN_NAME */.AF,
      currentVersion,
      manifest,
      i18n
    });

    // 결과 처리
    if (result.action === 'update') {
      // 새 버전으로 업데이트 (페이지 리로드)
      console.log('[UpdateManager] Updating to version', latestVersion);
      window.location.reload();
      return { available: true, action: 'updating', version: latestVersion };
    } else if (result.action === 'skip') {
      localStorage.setItem(skipKey, result.skipVersion);
      console.log('[UpdateManager] Skipped version', result.skipVersion);
      return { available: true, action: 'skipped', version: result.skipVersion };
    } else {
      console.log('[UpdateManager] Update postponed');
      return { available: true, action: 'later', version: latestVersion };
    }

  } catch (error) {
    console.error('[UpdateManager] Check failed:', error);
    return { available: false, error: error.message };
  }
}



;// ./src/index.js


 // CSS 자동 import (webpack이 처리)




function printPackageVersion() {
  console.log(`${constants/* PLUGIN_NAME */.AF} v${constants/* PLUGIN_VERSION */.jN} loaded`);
  return `${constants/* PLUGIN_NAME */.AF} v${constants/* PLUGIN_VERSION */.jN}`;
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

cdnTest1 = __webpack_exports__;
/******/ })()
;