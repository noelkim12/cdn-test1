//@name cdn-test1
//@display-name cdn-test1_v0.5.0
//@version 0.5.0
//@description Cdn Test1 for RISU AI
//@unpkg https://unpkg.com/cdn-test1@0.5.0/dist/cdn_test1.js
var cdnTest1;
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

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
   true ? "0.5.0" : 0;

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
/******/ 			// no module.id needed
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
/************************************************************************/
var __webpack_exports__ = {};

// EXTERNAL MODULE: ./src/constants.js
var constants = __webpack_require__(521);
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



;// ./src/index.js






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