//@name cdn-test1
//@display-name cdn-test1_v0.6.2
//@version 0.6.2
//@description Cdn Test1 for RISU AI
//@unpkg https://unpkg.com/cdn-test1@0.6.2/dist/cdn_test1.js
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


/**
 * RisuAPI 싱글톤 클래스
 * RisuAI의 플러그인 API를 래핑하여 제공합니다.
 */
class RisuAPI {
  // 싱글톤 인스턴스
  static _instance = null;

  constructor(pluginApis) {
    // 싱글톤 체크
    if (RisuAPI._instance) {
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] Returning existing RisuAPI instance`);
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
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] RisuAPI initialized successfully`);
      return true;
    } catch (error) {
      console.log(`[${_constants_js__WEBPACK_IMPORTED_MODULE_0__/* .PLUGIN_NAME */ .AF}] Failed to initialize RisuAPI:`, error);
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
   true ? "0.6.2" : 0;

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

/***/ 565:
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
// Module
___CSS_LOADER_EXPORT___.push([module.id, `/* UpdateDialog 컴포넌트 스타일 */

.cu-root {
  position: fixed;
  inset: 0;
  z-index: 2147483646;
  display: grid;
  place-items: center;
  background: rgba(0, 0, 0, 0.4);
}

.cu-card {
  width: min(520px, 92vw);
  border-radius: 16px;
  padding: 20px;
  background: var(--bg, #111);
  color: var(--fg, #eaeaea);
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.35);
  transform: scale(0.97);
  animation: cu-pop 0.16s ease-out forwards;
}
.cu-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 12px;
}
.cu-title h3 {
  margin: 0;
  font-size: 18px;
  font-weight: 700;
}
.cu-pill {
  font: 12px/1.8 system-ui;
  padding: 0 8px;
  border-radius: 999px;
  background: #2a2a2a;
  color: #cfcfcf;
}
.cu-sub {
  margin: 8px 0 12px;
  color: #9aa0a6;
  font: 13px/1.5 system-ui;
}
.cu-list {
  margin: 10px 0 16px;
  padding-left: 18px;
  max-height: 180px;
  overflow: auto;
}
.cu-list li {
  margin: 6px 0;
}
.cu-list .feat::marker {
  content: "✨ ";
}
.cu-list .fix::marker {
  content: "🔧 ";
}
.cu-list .perf::marker {
  content: "⚡ ";
}
.cu-list .break::marker {
  content: "⚠️ ";
}
.cu-actions {
  display: flex;
  gap: 8px;
  justify-content: flex-end;
}
.cu-btn {
  border: 0;
  padding: 10px 12px;
  border-radius: 10px;
  cursor: pointer;
  font-weight: 600;
}
.cu-btn.primary {
  background: #4f7cff;
  color: white;
}
.cu-btn.ghost {
  background: transparent;
  color: #cfcfcf;
}
.cu-btn:hover {
  filter: brightness(1.05);
}
@media (prefers-color-scheme: light) {
  :root {
    --bg: #fff;
    --fg: #111;
  }
  .cu-card {
    background: #fff;
    color: #111;
  }
  .cu-pill {
    background: #eef2ff;
    color: #1f3fb3;
  }
  .cu-sub {
    color: #4b5563;
  }
}
@media (prefers-reduced-motion: reduce) {
  .cu-card {
    animation: none;
    transform: none;
  }
}
@keyframes cu-pop {
  to {
    transform: scale(1);
  }
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


/***/ }),

/***/ 601:
/***/ ((module) => {



module.exports = function (i) {
  return i[1];
};

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

/***/ 734:
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
___CSS_LOADER_EXPORT___.push([module.id, `/* Pretendard 폰트 CDN */

/* 전체 폰트 설정 */
.rb-box * {
  font-family: "Pretendard", "Noto Sans KR", system-ui, sans-serif !important;
  font-weight: 600;
  font-size: 19px;
}
`, ""]);
// Exports
/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (___CSS_LOADER_EXPORT___);


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
// EXTERNAL MODULE: ./src/core/risu-api.js
var risu_api = __webpack_require__(300);
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
      // RisuAPI 싱글톤 인스턴스 가져오기
      this.risuAPI = risu_api/* RisuAPI */.m.getInstance();

      if (!this.risuAPI) {
        console.log(`[${constants/* PLUGIN_NAME */.AF}] RisuAPI is not initialized`);
        return false;
      }

      // UI 초기화
      this.initializeUI();
      this.startObserver();

      console.log(`[${constants/* PLUGIN_NAME */.AF}] plugin loaded`);
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
    const notesUrl = `https://unpkg.com/${constants/* PLUGIN_NAME */.AF}@${latestVersion}/dist/release-notes.json`;
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
      name: bannerMatch?.[1]?.trim() || constants/* PLUGIN_NAME */.AF,
      displayName:
        bannerMatch?.[2]?.trim() || `${constants/* PLUGIN_NAME */.AF}_v${latestVersion}`,
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
    const risuAPI = risu_api/* RisuAPI */.m.getInstance();
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
    const oldPluginIndex = db.plugins.findIndex((p) => p.name === constants/* PLUGIN_NAME */.AF);
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
async function checkForUpdates(options = {}) {
  const { silent = false, force = false, i18n = {} } = options;

  try {
    const manifest = await fetchLatestManifest();

    if (!manifest) {
      if (!silent) console.log("[UpdateManager] Unable to check for updates");
      return { available: false, error: "fetch_failed" };
    }

    const currentVersion = constants/* PLUGIN_VERSION */.jN;
    const latestVersion = manifest.version;

    // Skip 버전 확인
    const skipKey = `${constants/* PLUGIN_NAME */.AF}_skip_version`;
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
      name: constants/* PLUGIN_NAME */.AF,
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
        // 페이지 리로드하여 새 스크립트 적용
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
// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/ui/styles/base.css
var base = __webpack_require__(734);
;// ./src/ui/styles/base.css

      
      
      
      
      
      
      
      
      

var options = {};

options.styleTagTransform = (styleTagTransform_default());
options.setAttributes = (setAttributesWithoutAttributes_default());
options.insert = insertBySelector_default().bind(null, "head");
options.domAPI = (styleDomAPI_default());
options.insertStyleElement = (insertStyleElement_default());

var update = injectStylesIntoStyleTag_default()(base/* default */.A, options);




       /* harmony default export */ const styles_base = (base/* default */.A && base/* default */.A.locals ? base/* default */.A.locals : undefined);

// EXTERNAL MODULE: ./node_modules/css-loader/dist/cjs.js!./src/ui/styles/update-dialog.css
var update_dialog = __webpack_require__(565);
;// ./src/ui/styles/update-dialog.css

      
      
      
      
      
      
      
      
      

var update_dialog_options = {};

update_dialog_options.styleTagTransform = (styleTagTransform_default());
update_dialog_options.setAttributes = (setAttributesWithoutAttributes_default());
update_dialog_options.insert = insertBySelector_default().bind(null, "head");
update_dialog_options.domAPI = (styleDomAPI_default());
update_dialog_options.insertStyleElement = (insertStyleElement_default());

var update_dialog_update = injectStylesIntoStyleTag_default()(update_dialog/* default */.A, update_dialog_options);




       /* harmony default export */ const styles_update_dialog = (update_dialog/* default */.A && update_dialog/* default */.A.locals ? update_dialog/* default */.A.locals : undefined);

;// ./src/ui/styles/registry.js
/**
 * Style Registry
 * 모든 CSS 스타일을 여기서 중앙 관리합니다.
 */

// 기본 스타일 (폰트, 리셋, 전역 스타일)


// 컴포넌트 스타일


;// ./src/ui/components/updateManager/update-dialog.js
/**
 * UpdateDialog Custom Element
 * 플러그인 업데이트 확인 다이얼로그 컴포넌트
 */

const ELEMENT_TAG = "update-dialog";

class UpdateDialog extends HTMLElement {
  constructor() {
    super();
    this._cleanup = null;
  }

  static get observedAttributes() {
    return [
      "name",
      "current-version",
      "version",
      "released-at",
      "mandatory",
      "notes",
      "title",
      "btn-update",
      "btn-later",
      "btn-skip",
    ];
  }

  connectedCallback() {
    this.render();
    this.attachEventListeners();
    // 포커스 설정
    setTimeout(() => this.querySelector(".js-update")?.focus(), 0);
  }

  disconnectedCallback() {
    if (this._cleanup) {
      this._cleanup();
    }
  }

  get name() {
    return this.getAttribute("name") || "";
  }

  get currentVersion() {
    return this.getAttribute("current-version") || "0.0.0";
  }

  get version() {
    return this.getAttribute("version") || "0.0.0";
  }

  get releasedAt() {
    return this.getAttribute("released-at") || new Date().toISOString();
  }

  get mandatory() {
    return this.hasAttribute("mandatory");
  }

  get notes() {
    const notesAttr = this.getAttribute("notes");
    if (!notesAttr) return [];
    try {
      return JSON.parse(notesAttr);
    } catch {
      return [];
    }
  }

  get i18n() {
    return {
      title: this.getAttribute("title") || "플러그인 업데이트 준비 완료",
      primary: this.getAttribute("btn-update") || "지금 업데이트",
      later: this.getAttribute("btn-later") || "나중에",
      skip: this.getAttribute("btn-skip") || "이번 버전 건너뛰기",
    };
  }

  render() {
    const t = this.i18n;
    const mandatory = this.mandatory;
    const notes = this.notes;

    this.setAttribute("role", "dialog");
    this.setAttribute("aria-modal", "true");
    this.className = "cu-root";

    const releasedDate = new Date(this.releasedAt).toLocaleDateString();
    const updateType = mandatory ? "필수 업데이트" : "선택 업데이트";

    const notesList =
      notes.length > 0
        ? notes
            .slice(0, 8)
            .map(
              (n) =>
                `<li class="${this.escapeHtml(n.type || "").trim()}">${this.escapeHtml(n.text || "")}</li>`
            )
            .join("")
        : "<li>세부 변경사항은 릴리스 노트를 참고해주세요</li>";

    this.innerHTML = `
      <div class="cu-card">
        <div class="cu-title">
          <h3>${t.title}${this.name ? ` · ${this.name}` : ""}</h3>
          <span class="cu-pill">v${this.currentVersion} → v${this.version}</span>
        </div>
        <div class="cu-sub">
          ${releasedDate} · ${updateType}
        </div>
        <ul class="cu-list" aria-label="변경사항">
          ${notesList}
        </ul>
        <div class="cu-actions">
          ${!mandatory ? `<button class="cu-btn ghost js-later">${t.later}</button>` : ""}
          ${!mandatory ? `<button class="cu-btn ghost js-skip">${t.skip}</button>` : ""}
          <button class="cu-btn primary js-update">${t.primary}</button>
        </div>
      </div>
    `;
  }

  attachEventListeners() {
    const card = this.querySelector(".cu-card");
    const mandatory = this.mandatory;

    // 키보드 이벤트
    const onKey = (e) => {
      if (e.key === "Escape" && !mandatory) {
        this.dispatchAction("later");
      }
      if (e.key === "Enter") {
        this.dispatchAction("update");
      }
    };

    // 배경 클릭
    this.addEventListener("click", (e) => {
      if (!mandatory && e.target === this) {
        this.dispatchAction("later");
      }
    });

    // 버튼 클릭
    const updateBtn = card.querySelector(".js-update");
    if (updateBtn) {
      updateBtn.addEventListener("click", () => this.dispatchAction("update"));
    }

    if (!mandatory) {
      const laterBtn = card.querySelector(".js-later");
      const skipBtn = card.querySelector(".js-skip");

      if (laterBtn) {
        laterBtn.addEventListener("click", () => this.dispatchAction("later"));
      }
      if (skipBtn) {
        skipBtn.addEventListener("click", () => this.dispatchAction("skip"));
      }
    }

    document.addEventListener("keydown", onKey);

    // Cleanup 함수 저장
    this._cleanup = () => {
      document.removeEventListener("keydown", onKey);
    };
  }

  dispatchAction(action) {
    const detail = { action };

    if (action === "skip") {
      detail.skipVersion = this.version;
    }

    // Custom Event 발생
    this.dispatchEvent(
      new CustomEvent("update-action", {
        detail,
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
  customElements.define(ELEMENT_TAG, UpdateDialog);
}

const UPDATE_DIALOG_TAG = (/* unused pure expression or super */ null && (ELEMENT_TAG));

;// ./src/ui/components/registry.js
/**
 * Web Components 중앙 레지스트리
 * 모든 Custom Elements를 여기서 관리합니다.
 */

// UI 컴포넌트


// 업데이트 매니저 컴포넌트


;// ./src/index.js





 // Style Registry
 // Web Components 레지스트리

function printPackageVersion() {
  console.log(`${constants/* PLUGIN_NAME */.AF} v${constants/* PLUGIN_VERSION */.jN} loaded`);
  return `${constants/* PLUGIN_NAME */.AF} v${constants/* PLUGIN_VERSION */.jN}`;
}

// 애플리케이션 실행
(async () => {
  try {
    // 1. RisuAPI 싱글톤 초기화 (최초 한 번만)
    const risuAPI = new risu_api/* RisuAPI */.m(globalThis.__pluginApis__);
    const initialized = await risuAPI.initialize();

    if (!initialized) {
      console.error(`[${constants/* PLUGIN_NAME */.AF}] Failed to initialize RisuAPI`);
      return;
    }

    // 2. 업데이트 체크 (백그라운드, silent 모드)
    checkForUpdates({ silent: true }).catch(err => {
      console.warn('[App] Update check failed:', err);
    });

    // 3. 외부 스크립트 주입
    injectScripts();

    // 4. App 초기화 (RisuAPI 싱글톤 사용)
    const app = new App();
    await app.initialize();

    printPackageVersion();

    // 5. 언로드 핸들러 등록
    if (globalThis?.__pluginApis__?.onUnload) {
      globalThis.__pluginApis__.onUnload(() => {
        app.destroy();
      });
    }
  } catch (error) {
    console.error(`[${constants/* PLUGIN_NAME */.AF}] Initialization failed:`, error);
  }
})();

cdnTest1 = __webpack_exports__;
/******/ })()
;