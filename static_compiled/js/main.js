(() => {
  var __create = Object.create;
  var __defProp = Object.defineProperty;
  var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
  var __getOwnPropNames = Object.getOwnPropertyNames;
  var __getProtoOf = Object.getPrototypeOf;
  var __hasOwnProp = Object.prototype.hasOwnProperty;
  var __commonJS = (cb, mod) => function __require() {
    return mod || (0, cb[__getOwnPropNames(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
  };
  var __copyProps = (to, from, except, desc) => {
    if (from && typeof from === "object" || typeof from === "function") {
      for (let key of __getOwnPropNames(from))
        if (!__hasOwnProp.call(to, key) && key !== except)
          __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
    }
    return to;
  };
  var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
    // If the importer is in node compatibility mode or this is not an ESM
    // file that has been converted to a CommonJS file using a Babel-
    // compatible transform (i.e. "__esModule" has not been set), then set
    // "default" to the CommonJS "module.exports" for node compatibility.
    isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
    mod
  ));

  // node_modules/.pnpm/preline@2.7.0/node_modules/preline/dist/collapse.js
  var require_collapse = __commonJS({
    "node_modules/.pnpm/preline@2.7.0/node_modules/preline/dist/collapse.js"(exports, module) {
      !function(t, e) {
        if ("object" == typeof exports && "object" == typeof module)
          module.exports = e();
        else if ("function" == typeof define && define.amd)
          define([], e);
        else {
          var n = e();
          for (var o in n)
            ("object" == typeof exports ? exports : t)[o] = n[o];
        }
      }(self, () => (() => {
        "use strict";
        var t = { 961: (t2, e2) => {
          Object.defineProperty(e2, "__esModule", { value: true });
          var n2 = function() {
            function t3(t4, e3, n3) {
              this.el = t4, this.options = e3, this.events = n3, this.el = t4, this.options = e3, this.events = {};
            }
            return t3.prototype.createCollection = function(t4, e3) {
              var n3;
              t4.push({ id: (null === (n3 = null == e3 ? void 0 : e3.el) || void 0 === n3 ? void 0 : n3.id) || t4.length + 1, element: e3 });
            }, t3.prototype.fireEvent = function(t4, e3) {
              if (void 0 === e3 && (e3 = null), this.events.hasOwnProperty(t4))
                return this.events[t4](e3);
            }, t3.prototype.on = function(t4, e3) {
              this.events[t4] = e3;
            }, t3;
          }();
          e2.default = n2;
        }, 485: function(t2, e2, n2) {
          var o, i = this && this.__extends || (o = function(t3, e3) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(t4, e4) {
              t4.__proto__ = e4;
            } || function(t4, e4) {
              for (var n3 in e4)
                Object.prototype.hasOwnProperty.call(e4, n3) && (t4[n3] = e4[n3]);
            }, o(t3, e3);
          }, function(t3, e3) {
            if ("function" != typeof e3 && null !== e3)
              throw new TypeError("Class extends value " + String(e3) + " is not a constructor or null");
            function n3() {
              this.constructor = t3;
            }
            o(t3, e3), t3.prototype = null === e3 ? Object.create(e3) : (n3.prototype = e3.prototype, new n3());
          }), s = this && this.__importDefault || function(t3) {
            return t3 && t3.__esModule ? t3 : { default: t3 };
          };
          Object.defineProperty(e2, "__esModule", { value: true });
          var r = n2(292), l = function(t3) {
            function e3(e4, n3, o2) {
              var i2 = t3.call(this, e4, n3, o2) || this;
              return i2.contentId = i2.el.dataset.hsCollapse, i2.content = document.querySelector(i2.contentId), i2.animationInProcess = false, i2.content && i2.init(), i2;
            }
            return i(e3, t3), e3.prototype.elementClick = function() {
              this.content.classList.contains("open") ? this.hide() : this.show();
            }, e3.prototype.init = function() {
              var t4, e4 = this;
              this.createCollection(window.$hsCollapseCollection, this), this.onElementClickListener = function() {
                return e4.elementClick();
              }, (null === (t4 = null == this ? void 0 : this.el) || void 0 === t4 ? void 0 : t4.ariaExpanded) && (this.el.classList.contains("open") ? this.el.ariaExpanded = "true" : this.el.ariaExpanded = "false"), this.el.addEventListener("click", this.onElementClickListener);
            }, e3.prototype.hideAllMegaMenuItems = function() {
              this.content.querySelectorAll(".hs-mega-menu-content.block").forEach(function(t4) {
                t4.classList.remove("block"), t4.classList.add("hidden");
              });
            }, e3.prototype.show = function() {
              var t4, e4 = this;
              if (this.animationInProcess || this.el.classList.contains("open"))
                return false;
              this.animationInProcess = true, this.el.classList.add("open"), (null === (t4 = null == this ? void 0 : this.el) || void 0 === t4 ? void 0 : t4.ariaExpanded) && (this.el.ariaExpanded = "true"), this.content.classList.add("open"), this.content.classList.remove("hidden"), this.content.style.height = "0", setTimeout(function() {
                e4.content.style.height = "".concat(e4.content.scrollHeight, "px"), e4.fireEvent("beforeOpen", e4.el), (0, r.dispatch)("beforeOpen.hs.collapse", e4.el, e4.el);
              }), (0, r.afterTransition)(this.content, function() {
                e4.content.style.height = "", e4.fireEvent("open", e4.el), (0, r.dispatch)("open.hs.collapse", e4.el, e4.el), e4.animationInProcess = false;
              });
            }, e3.prototype.hide = function() {
              var t4, e4 = this;
              if (this.animationInProcess || !this.el.classList.contains("open"))
                return false;
              this.animationInProcess = true, this.el.classList.remove("open"), (null === (t4 = null == this ? void 0 : this.el) || void 0 === t4 ? void 0 : t4.ariaExpanded) && (this.el.ariaExpanded = "false"), this.content.style.height = "".concat(this.content.scrollHeight, "px"), setTimeout(function() {
                e4.content.style.height = "0";
              }), this.content.classList.remove("open"), (0, r.afterTransition)(this.content, function() {
                e4.content.classList.add("hidden"), e4.content.style.height = "", e4.fireEvent("hide", e4.el), (0, r.dispatch)("hide.hs.collapse", e4.el, e4.el), e4.animationInProcess = false;
              }), this.content.querySelectorAll(".hs-mega-menu-content.block").length && this.hideAllMegaMenuItems();
            }, e3.prototype.destroy = function() {
              var t4 = this;
              this.el.removeEventListener("click", this.onElementClickListener), this.content = null, this.animationInProcess = false, window.$hsCollapseCollection = window.$hsCollapseCollection.filter(function(e4) {
                return e4.element.el !== t4.el;
              });
            }, e3.findInCollection = function(t4) {
              return window.$hsCollapseCollection.find(function(n3) {
                return t4 instanceof e3 ? n3.element.el === t4.el : "string" == typeof t4 ? n3.element.el === document.querySelector(t4) : n3.element.el === t4;
              }) || null;
            }, e3.getInstance = function(t4, e4) {
              void 0 === e4 && (e4 = false);
              var n3 = window.$hsCollapseCollection.find(function(e5) {
                return e5.element.el === ("string" == typeof t4 ? document.querySelector(t4) : t4);
              });
              return n3 ? e4 ? n3 : n3.element.el : null;
            }, e3.autoInit = function() {
              window.$hsCollapseCollection || (window.$hsCollapseCollection = []), window.$hsCollapseCollection && (window.$hsCollapseCollection = window.$hsCollapseCollection.filter(function(t4) {
                var e4 = t4.element;
                return document.contains(e4.el);
              })), document.querySelectorAll(".hs-collapse-toggle:not(.--prevent-on-load-init)").forEach(function(t4) {
                window.$hsCollapseCollection.find(function(e4) {
                  var n3;
                  return (null === (n3 = null == e4 ? void 0 : e4.element) || void 0 === n3 ? void 0 : n3.el) === t4;
                }) || new e3(t4);
              });
            }, e3.show = function(t4) {
              var n3 = e3.findInCollection(t4);
              n3 && n3.element.content.classList.contains("hidden") && n3.element.show();
            }, e3.hide = function(t4) {
              var n3 = e3.findInCollection(t4);
              n3 && !n3.element.content.classList.contains("hidden") && n3.element.hide();
            }, e3.on = function(t4, n3, o2) {
              var i2 = e3.findInCollection(n3);
              i2 && (i2.element.events[t4] = o2);
            }, e3;
          }(s(n2(961)).default);
          window.addEventListener("load", function() {
            l.autoInit();
          }), "undefined" != typeof window && (window.HSCollapse = l), e2.default = l;
        }, 292: function(t2, e2) {
          var n2 = this;
          Object.defineProperty(e2, "__esModule", { value: true }), e2.menuSearchHistory = e2.classToClassList = e2.htmlToElement = e2.afterTransition = e2.dispatch = e2.debounce = e2.isJson = e2.isDirectChild = e2.isFormElement = e2.isParentOrElementHidden = e2.isEnoughSpace = e2.isIpadOS = e2.isIOS = e2.getZIndex = e2.getClassPropertyAlt = e2.getClassProperty = e2.stringToBoolean = void 0, e2.getHighestZIndex = function(t3) {
            var e3 = Number.NEGATIVE_INFINITY;
            return t3.forEach(function(t4) {
              var n3 = o(t4);
              "auto" !== n3 && (n3 = parseInt(n3, 10)) > e3 && (e3 = n3);
            }), e3;
          };
          e2.stringToBoolean = function(t3) {
            return "true" === t3;
          };
          e2.getClassProperty = function(t3, e3, n3) {
            return void 0 === n3 && (n3 = ""), (window.getComputedStyle(t3).getPropertyValue(e3) || n3).replace(" ", "");
          };
          e2.getClassPropertyAlt = function(t3, e3, n3) {
            void 0 === n3 && (n3 = "");
            var o2 = "";
            return t3.classList.forEach(function(t4) {
              t4.includes(e3) && (o2 = t4);
            }), o2.match(/:(.*)]/) ? o2.match(/:(.*)]/)[1] : n3;
          };
          var o = function(t3) {
            return window.getComputedStyle(t3).getPropertyValue("z-index");
          };
          e2.getZIndex = o;
          e2.isIOS = function() {
            return !!/iPad|iPhone|iPod/.test(navigator.platform) || navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
          };
          e2.isIpadOS = function() {
            return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
          };
          e2.isDirectChild = function(t3, e3) {
            for (var n3 = t3.children, o2 = 0; o2 < n3.length; o2++)
              if (n3[o2] === e3)
                return true;
            return false;
          };
          e2.isEnoughSpace = function(t3, e3, n3, o2, i2) {
            void 0 === n3 && (n3 = "auto"), void 0 === o2 && (o2 = 10), void 0 === i2 && (i2 = null);
            var s = e3.getBoundingClientRect(), r = i2 ? i2.getBoundingClientRect() : null, l = window.innerHeight, a = r ? s.top - r.top : s.top, c = (i2 ? r.bottom : l) - s.bottom, u = t3.clientHeight + o2;
            return "bottom" === n3 ? c >= u : "top" === n3 ? a >= u : a >= u || c >= u;
          };
          e2.isFormElement = function(t3) {
            return t3 instanceof HTMLInputElement || t3 instanceof HTMLTextAreaElement || t3 instanceof HTMLSelectElement;
          };
          var i = function(t3) {
            return !!t3 && ("none" === window.getComputedStyle(t3).display || i(t3.parentElement));
          };
          e2.isParentOrElementHidden = i;
          e2.isJson = function(t3) {
            if ("string" != typeof t3)
              return false;
            var e3 = t3.trim()[0], n3 = t3.trim().slice(-1);
            if ("{" === e3 && "}" === n3 || "[" === e3 && "]" === n3)
              try {
                return JSON.parse(t3), true;
              } catch (t4) {
                return false;
              }
            return false;
          };
          e2.debounce = function(t3, e3) {
            var o2;
            return void 0 === e3 && (e3 = 200), function() {
              for (var i2 = [], s = 0; s < arguments.length; s++)
                i2[s] = arguments[s];
              clearTimeout(o2), o2 = setTimeout(function() {
                t3.apply(n2, i2);
              }, e3);
            };
          };
          e2.dispatch = function(t3, e3, n3) {
            void 0 === n3 && (n3 = null);
            var o2 = new CustomEvent(t3, { detail: { payload: n3 }, bubbles: true, cancelable: true, composed: false });
            e3.dispatchEvent(o2);
          };
          e2.afterTransition = function(t3, e3) {
            var n3 = function() {
              e3(), t3.removeEventListener("transitionend", n3, true);
            }, o2 = window.getComputedStyle(t3), i2 = o2.getPropertyValue("transition-duration");
            "none" !== o2.getPropertyValue("transition-property") && parseFloat(i2) > 0 ? t3.addEventListener("transitionend", n3, true) : e3();
          };
          e2.htmlToElement = function(t3) {
            var e3 = document.createElement("template");
            return t3 = t3.trim(), e3.innerHTML = t3, e3.content.firstChild;
          };
          e2.classToClassList = function(t3, e3, n3, o2) {
            void 0 === n3 && (n3 = " "), void 0 === o2 && (o2 = "add"), t3.split(n3).forEach(function(t4) {
              return "add" === o2 ? e3.classList.add(t4) : e3.classList.remove(t4);
            });
          };
          e2.menuSearchHistory = { historyIndex: -1, addHistory: function(t3) {
            this.historyIndex = t3;
          }, existsInHistory: function(t3) {
            return t3 > this.historyIndex;
          }, clearHistory: function() {
            this.historyIndex = -1;
          } };
        } }, e = {};
        var n = function n2(o) {
          var i = e[o];
          if (void 0 !== i)
            return i.exports;
          var s = e[o] = { exports: {} };
          return t[o].call(s.exports, s, s.exports, n2), s.exports;
        }(485);
        return n;
      })());
    }
  });

  // node_modules/.pnpm/preline@2.7.0/node_modules/preline/dist/overlay.js
  var require_overlay = __commonJS({
    "node_modules/.pnpm/preline@2.7.0/node_modules/preline/dist/overlay.js"(exports, module) {
      !function(e, t) {
        if ("object" == typeof exports && "object" == typeof module)
          module.exports = t();
        else if ("function" == typeof define && define.amd)
          define([], t);
        else {
          var o = t();
          for (var n in o)
            ("object" == typeof exports ? exports : e)[n] = o[n];
        }
      }(self, () => (() => {
        "use strict";
        var e = { 223: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BREAKPOINTS = t2.COMBO_BOX_ACCESSIBILITY_KEY_SET = t2.SELECT_ACCESSIBILITY_KEY_SET = t2.TABS_ACCESSIBILITY_KEY_SET = t2.OVERLAY_ACCESSIBILITY_KEY_SET = t2.DROPDOWN_ACCESSIBILITY_KEY_SET = t2.POSITIONS = void 0, t2.POSITIONS = { auto: "auto", "auto-start": "auto-start", "auto-end": "auto-end", top: "top", "top-left": "top-start", "top-right": "top-end", bottom: "bottom", "bottom-left": "bottom-start", "bottom-right": "bottom-end", right: "right", "right-start": "right-start", "right-end": "right-end", left: "left", "left-start": "left-start", "left-end": "left-end" }, t2.DROPDOWN_ACCESSIBILITY_KEY_SET = ["Escape", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Home", "End", "Enter"], t2.OVERLAY_ACCESSIBILITY_KEY_SET = ["Escape", "Tab"], t2.TABS_ACCESSIBILITY_KEY_SET = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End"], t2.SELECT_ACCESSIBILITY_KEY_SET = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End", "Escape", "Enter", "Space", "Tab"], t2.COMBO_BOX_ACCESSIBILITY_KEY_SET = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End", "Escape", "Enter"], t2.BREAKPOINTS = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };
        }, 961: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          var o2 = function() {
            function e3(e4, t3, o3) {
              this.el = e4, this.options = t3, this.events = o3, this.el = e4, this.options = t3, this.events = {};
            }
            return e3.prototype.createCollection = function(e4, t3) {
              var o3;
              e4.push({ id: (null === (o3 = null == t3 ? void 0 : t3.el) || void 0 === o3 ? void 0 : o3.id) || e4.length + 1, element: t3 });
            }, e3.prototype.fireEvent = function(e4, t3) {
              if (void 0 === t3 && (t3 = null), this.events.hasOwnProperty(e4))
                return this.events[e4](t3);
            }, e3.prototype.on = function(e4, t3) {
              this.events[e4] = t3;
            }, e3;
          }();
          t2.default = o2;
        }, 850: function(e2, t2, o2) {
          var n, i = this && this.__extends || (n = function(e3, t3) {
            return n = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var o3 in t4)
                Object.prototype.hasOwnProperty.call(t4, o3) && (e4[o3] = t4[o3]);
            }, n(e3, t3);
          }, function(e3, t3) {
            if ("function" != typeof t3 && null !== t3)
              throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
            function o3() {
              this.constructor = e3;
            }
            n(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (o3.prototype = t3.prototype, new o3());
          }), r = this && this.__assign || function() {
            return r = Object.assign || function(e3) {
              for (var t3, o3 = 1, n2 = arguments.length; o3 < n2; o3++)
                for (var i2 in t3 = arguments[o3])
                  Object.prototype.hasOwnProperty.call(t3, i2) && (e3[i2] = t3[i2]);
              return e3;
            }, r.apply(this, arguments);
          }, l = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          var a = o2(292), s = o2(223), c = function(e3) {
            function t3(t4, o3, n2) {
              var i2, l2, c2, d2, u, p, h = e3.call(this, t4, o3, n2) || this;
              h.toggleButtons = Array.from(document.querySelectorAll('[data-hs-overlay="#'.concat(h.el.id, '"]')));
              var f = h.collectToggleParameters(h.toggleButtons), y = t4.getAttribute("data-hs-overlay-options"), v = y ? JSON.parse(y) : {}, m = r(r(r({}, v), f), o3);
              h.hiddenClass = (null == m ? void 0 : m.hiddenClass) || "hidden", h.emulateScrollbarSpace = (null == m ? void 0 : m.emulateScrollbarSpace) || false, h.isClosePrev = null === (i2 = null == m ? void 0 : m.isClosePrev) || void 0 === i2 || i2, h.backdropClasses = null !== (l2 = null == m ? void 0 : m.backdropClasses) && void 0 !== l2 ? l2 : "hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900 bg-opacity-50 dark:bg-opacity-80 dark:bg-neutral-900", h.backdropParent = "string" == typeof m.backdropParent ? document.querySelector(m.backdropParent) : document.body, h.backdropExtraClasses = null !== (c2 = null == m ? void 0 : m.backdropExtraClasses) && void 0 !== c2 ? c2 : "", h.moveOverlayToBody = (null == m ? void 0 : m.moveOverlayToBody) || null, h.openNextOverlay = false, h.autoHide = null, h.initContainer = (null === (d2 = h.el) || void 0 === d2 ? void 0 : d2.parentElement) || null, h.isCloseWhenClickInside = (0, a.stringToBoolean)((0, a.getClassProperty)(h.el, "--close-when-click-inside", "false") || "false"), h.isTabAccessibilityLimited = (0, a.stringToBoolean)((0, a.getClassProperty)(h.el, "--tab-accessibility-limited", "true") || "true"), h.isLayoutAffect = (0, a.stringToBoolean)((0, a.getClassProperty)(h.el, "--is-layout-affect", "false") || "false"), h.hasAutofocus = (0, a.stringToBoolean)((0, a.getClassProperty)(h.el, "--has-autofocus", "true") || "true"), h.hasAbilityToCloseOnBackdropClick = (0, a.stringToBoolean)(h.el.getAttribute("data-hs-overlay-keyboard") || "true");
              var C = (0, a.getClassProperty)(h.el, "--auto-close"), b = (0, a.getClassProperty)(h.el, "--auto-close-equality-type"), g = (0, a.getClassProperty)(h.el, "--opened");
              return h.autoClose = !isNaN(+C) && isFinite(+C) ? +C : s.BREAKPOINTS[C] || null, h.autoCloseEqualityType = null !== (u = b) && void 0 !== u ? u : null, h.openedBreakpoint = (!isNaN(+g) && isFinite(+g) ? +g : s.BREAKPOINTS[g]) || null, h.animationTarget = (null === (p = null == h ? void 0 : h.el) || void 0 === p ? void 0 : p.querySelector(".hs-overlay-animation-target")) || h.el, h.onElementClickListener = [], h.init(), h;
            }
            return i(t3, e3), t3.prototype.elementClick = function() {
              this.el.classList.contains("opened") ? this.close() : this.open();
            }, t3.prototype.overlayClick = function(e4) {
              e4.target.id && "#".concat(e4.target.id) === this.el.id && this.isCloseWhenClickInside && this.hasAbilityToCloseOnBackdropClick && this.close();
            }, t3.prototype.backdropClick = function() {
              this.close();
            }, t3.prototype.init = function() {
              var e4 = this;
              if (this.createCollection(window.$hsOverlayCollection, this), this.isLayoutAffect && this.openedBreakpoint) {
                var o3 = t3.getInstance(this.el, true);
                t3.setOpened(this.openedBreakpoint, o3);
              }
              this.onOverlayClickListener = function(t4) {
                return e4.overlayClick(t4);
              }, this.el.addEventListener("click", this.onOverlayClickListener), this.toggleButtons.length && this.buildToggleButtons();
            }, t3.prototype.buildToggleButtons = function() {
              var e4 = this;
              this.toggleButtons.forEach(function(t4) {
                e4.el.classList.contains("opened") ? t4.ariaExpanded = "true" : t4.ariaExpanded = "false", e4.onElementClickListener.push({ el: t4, fn: function() {
                  return e4.elementClick();
                } }), t4.addEventListener("click", e4.onElementClickListener.find(function(e5) {
                  return e5.el === t4;
                }).fn);
              });
            }, t3.prototype.hideAuto = function() {
              var e4 = this, t4 = parseInt((0, a.getClassProperty)(this.el, "--auto-hide", "0"));
              t4 && (this.autoHide = setTimeout(function() {
                e4.close();
              }, t4));
            }, t3.prototype.checkTimer = function() {
              this.autoHide && (clearTimeout(this.autoHide), this.autoHide = null);
            }, t3.prototype.buildBackdrop = function() {
              var e4 = this, t4 = this.el.classList.value.split(" "), o3 = parseInt(window.getComputedStyle(this.el).getPropertyValue("z-index")), n2 = this.el.getAttribute("data-hs-overlay-backdrop-container") || false;
              this.backdrop = document.createElement("div");
              var i2 = "".concat(this.backdropClasses, " ").concat(this.backdropExtraClasses), r2 = "static" !== (0, a.getClassProperty)(this.el, "--overlay-backdrop", "true"), l2 = "false" === (0, a.getClassProperty)(this.el, "--overlay-backdrop", "true");
              this.backdrop.id = "".concat(this.el.id, "-backdrop"), "style" in this.backdrop && (this.backdrop.style.zIndex = "".concat(o3 - 1));
              for (var s2 = 0, c2 = t4; s2 < c2.length; s2++) {
                var d2 = c2[s2];
                (d2.startsWith("hs-overlay-backdrop-open:") || d2.includes(":hs-overlay-backdrop-open:")) && (i2 += " ".concat(d2));
              }
              l2 || (n2 && (this.backdrop = document.querySelector(n2).cloneNode(true), this.backdrop.classList.remove("hidden"), i2 = "".concat(this.backdrop.classList.toString()), this.backdrop.classList.value = ""), r2 && (this.onBackdropClickListener = function() {
                return e4.backdropClick();
              }, this.backdrop.addEventListener("click", this.onBackdropClickListener, true)), this.backdrop.setAttribute("data-hs-overlay-backdrop-template", ""), this.backdropParent.appendChild(this.backdrop), setTimeout(function() {
                e4.backdrop.classList.value = i2;
              }));
            }, t3.prototype.destroyBackdrop = function() {
              var e4 = document.querySelector("#".concat(this.el.id, "-backdrop"));
              e4 && (this.openNextOverlay && (e4.style.transitionDuration = "".concat(1.8 * parseFloat(window.getComputedStyle(e4).transitionDuration.replace(/[^\d.-]/g, "")), "s")), e4.classList.add("opacity-0"), (0, a.afterTransition)(e4, function() {
                e4.remove();
              }));
            }, t3.prototype.focusElement = function() {
              var e4 = this.el.querySelector("[autofocus]");
              if (!e4)
                return false;
              e4.focus();
            }, t3.prototype.getScrollbarSize = function() {
              var e4 = document.createElement("div");
              e4.style.overflow = "scroll", e4.style.width = "100px", e4.style.height = "100px", document.body.appendChild(e4);
              var t4 = e4.offsetWidth - e4.clientWidth;
              return document.body.removeChild(e4), t4;
            }, t3.prototype.collectToggleParameters = function(e4) {
              var t4 = {};
              return e4.forEach(function(e5) {
                var o3 = e5.getAttribute("data-hs-overlay-options"), n2 = o3 ? JSON.parse(o3) : {};
                t4 = r(r({}, t4), n2);
              }), t4;
            }, t3.prototype.open = function() {
              var e4 = this, t4 = document.querySelectorAll(".hs-overlay.open"), o3 = window.$hsOverlayCollection.find(function(e5) {
                return Array.from(t4).includes(e5.element.el) && !e5.element.isLayoutAffect;
              }), n2 = document.querySelectorAll('[data-hs-overlay="#'.concat(this.el.id, '"]')), i2 = "true" !== (0, a.getClassProperty)(this.el, "--body-scroll", "false");
              if (this.isClosePrev && o3)
                return this.openNextOverlay = true, o3.element.close().then(function() {
                  e4.open(), e4.openNextOverlay = false;
                });
              i2 && (document.body.style.overflow = "hidden", this.emulateScrollbarSpace && (document.body.style.paddingRight = "".concat(this.getScrollbarSize(), "px"))), this.buildBackdrop(), this.checkTimer(), this.hideAuto(), n2.forEach(function(e5) {
                e5.ariaExpanded && (e5.ariaExpanded = "true");
              }), this.el.classList.remove(this.hiddenClass), this.el.setAttribute("aria-overlay", "true"), this.el.setAttribute("tabindex", "-1"), setTimeout(function() {
                if (e4.el.classList.contains("opened"))
                  return false;
                e4.el.classList.add("open", "opened"), e4.isLayoutAffect && document.body.classList.add("hs-overlay-body-open"), e4.fireEvent("open", e4.el), (0, a.dispatch)("open.hs.overlay", e4.el, e4.el), e4.hasAutofocus && e4.focusElement();
              }, 50);
            }, t3.prototype.close = function(e4) {
              var t4 = this;
              void 0 === e4 && (e4 = false), this.isLayoutAffect && document.body.classList.remove("hs-overlay-body-open");
              var o3 = function(e5) {
                if (t4.el.classList.contains("open"))
                  return false;
                document.querySelectorAll('[data-hs-overlay="#'.concat(t4.el.id, '"]')).forEach(function(e6) {
                  e6.ariaExpanded && (e6.ariaExpanded = "false");
                }), t4.el.classList.add(t4.hiddenClass), t4.destroyBackdrop(), t4.fireEvent("close", t4.el), (0, a.dispatch)("close.hs.overlay", t4.el, t4.el), document.querySelector(".hs-overlay.opened") || (document.body.style.overflow = "", t4.emulateScrollbarSpace && (document.body.style.paddingRight = "")), e5(t4.el);
              };
              return new Promise(function(n2) {
                t4.el.classList.remove("open", "opened"), t4.el.removeAttribute("aria-overlay"), t4.el.removeAttribute("tabindex"), e4 ? o3(n2) : (0, a.afterTransition)(t4.animationTarget, function() {
                  return o3(n2);
                });
              });
            }, t3.prototype.destroy = function() {
              var e4 = this;
              this.el.classList.remove("open", "opened", this.hiddenClass), this.isLayoutAffect && document.body.classList.remove("hs-overlay-body-open"), this.el.removeEventListener("click", this.onOverlayClickListener), this.onElementClickListener.length && (this.onElementClickListener.forEach(function(e5) {
                var t4 = e5.el, o3 = e5.fn;
                t4.removeEventListener("click", o3);
              }), this.onElementClickListener = null), this.backdrop && this.backdrop.removeEventListener("click", this.onBackdropClickListener), this.backdrop && (this.backdrop.remove(), this.backdrop = null), window.$hsOverlayCollection = window.$hsOverlayCollection.filter(function(t4) {
                return t4.element.el !== e4.el;
              });
            }, t3.findInCollection = function(e4) {
              return window.$hsOverlayCollection.find(function(o3) {
                return e4 instanceof t3 ? o3.element.el === e4.el : "string" == typeof e4 ? o3.element.el === document.querySelector(e4) : o3.element.el === e4;
              }) || null;
            }, t3.getInstance = function(e4, t4) {
              var o3 = "string" == typeof e4 ? document.querySelector(e4) : e4, n2 = (null == o3 ? void 0 : o3.getAttribute("data-hs-overlay")) ? o3.getAttribute("data-hs-overlay") : e4, i2 = window.$hsOverlayCollection.find(function(e5) {
                return e5.element.el === ("string" == typeof n2 ? document.querySelector(n2) : n2) || e5.element.el === ("string" == typeof n2 ? document.querySelector(n2) : n2);
              });
              return i2 ? t4 ? i2 : i2.element.el : null;
            }, t3.autoInit = function() {
              window.$hsOverlayCollection || (window.$hsOverlayCollection = [], document.addEventListener("keydown", function(e4) {
                return t3.accessibility(e4);
              })), window.$hsOverlayCollection && (window.$hsOverlayCollection = window.$hsOverlayCollection.filter(function(e4) {
                var t4 = e4.element;
                return document.contains(t4.el);
              })), document.querySelectorAll(".hs-overlay:not(.--prevent-on-load-init)").forEach(function(e4) {
                window.$hsOverlayCollection.find(function(t4) {
                  var o3;
                  return (null === (o3 = null == t4 ? void 0 : t4.element) || void 0 === o3 ? void 0 : o3.el) === e4;
                }) || new t3(e4);
              });
            }, t3.open = function(e4) {
              var o3 = t3.findInCollection(e4);
              o3 && o3.element.el.classList.contains(o3.element.hiddenClass) && o3.element.open();
            }, t3.close = function(e4) {
              var o3 = t3.findInCollection(e4);
              o3 && !o3.element.el.classList.contains(o3.element.hiddenClass) && o3.element.close();
            }, t3.setOpened = function(e4, t4) {
              document.body.clientWidth >= e4 ? (document.body.classList.add("hs-overlay-body-open"), t4.element.open()) : t4.element.close(true);
            }, t3.accessibility = function(e4) {
              var t4, o3, n2 = window.$hsOverlayCollection.filter(function(e5) {
                return e5.element.el.classList.contains("open");
              }), i2 = n2[n2.length - 1], r2 = null === (o3 = null === (t4 = null == i2 ? void 0 : i2.element) || void 0 === t4 ? void 0 : t4.el) || void 0 === o3 ? void 0 : o3.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'), l2 = [];
              (null == r2 ? void 0 : r2.length) && r2.forEach(function(e5) {
                (0, a.isParentOrElementHidden)(e5) || l2.push(e5);
              });
              var s2 = i2 && !e4.metaKey;
              if (s2 && !i2.element.isTabAccessibilityLimited && "Tab" === e4.code)
                return false;
              s2 && l2.length && "Tab" === e4.code && (e4.preventDefault(), this.onTab(i2)), s2 && "Escape" === e4.code && (e4.preventDefault(), this.onEscape(i2));
            }, t3.onEscape = function(e4) {
              e4 && e4.element.hasAbilityToCloseOnBackdropClick && e4.element.close();
            }, t3.onTab = function(e4) {
              var t4 = e4.element.el, o3 = Array.from(t4.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'));
              if (0 === o3.length)
                return false;
              var n2 = t4.querySelector(":focus");
              if (n2) {
                for (var i2 = false, r2 = 0, l2 = o3; r2 < l2.length; r2++) {
                  var a2 = l2[r2];
                  if (i2)
                    return void a2.focus();
                  a2 === n2 && (i2 = true);
                }
                o3[0].focus();
              } else
                o3[0].focus();
            }, t3.on = function(e4, o3, n2) {
              var i2 = t3.findInCollection(o3);
              i2 && (i2.element.events[e4] = n2);
            }, t3;
          }(l(o2(961)).default), d = function() {
            if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find(function(e3) {
              return e3.element.moveOverlayToBody;
            }))
              return false;
            window.$hsOverlayCollection.filter(function(e3) {
              return e3.element.moveOverlayToBody;
            }).forEach(function(e3) {
              var t3 = e3.element.moveOverlayToBody, o3 = e3.element.initContainer, n2 = document.querySelector("body"), i2 = e3.element.el;
              if (!o3 && i2)
                return false;
              document.body.clientWidth <= t3 && !(0, a.isDirectChild)(n2, i2) ? n2.appendChild(i2) : document.body.clientWidth > t3 && !o3.contains(i2) && o3.appendChild(i2);
            });
          };
          window.addEventListener("load", function() {
            c.autoInit(), d();
          }), window.addEventListener("resize", function() {
            !function() {
              if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find(function(e3) {
                return e3.element.autoClose;
              }))
                return false;
              window.$hsOverlayCollection.filter(function(e3) {
                return e3.element.autoClose;
              }).forEach(function(e3) {
                var t3 = e3.element, o3 = t3.autoCloseEqualityType, n2 = t3.autoClose;
                ("less-than" === o3 ? document.body.clientWidth <= n2 : document.body.clientWidth >= n2) && e3.element.close(true);
              });
            }(), d(), function() {
              if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find(function(e3) {
                return e3.element.autoClose;
              }))
                return false;
              window.$hsOverlayCollection.filter(function(e3) {
                return e3.element.autoClose;
              }).forEach(function(e3) {
                var t3 = e3.element, o3 = t3.autoCloseEqualityType, n2 = t3.autoClose;
                ("less-than" === o3 ? document.body.clientWidth <= n2 : document.body.clientWidth >= n2) && e3.element.close(true);
              });
            }(), function() {
              if (!window.$hsOverlayCollection.length || !window.$hsOverlayCollection.find(function(e3) {
                return e3.element.el.classList.contains("opened");
              }))
                return false;
              window.$hsOverlayCollection.filter(function(e3) {
                return e3.element.el.classList.contains("opened");
              }).forEach(function(e3) {
                var t3 = parseInt(window.getComputedStyle(e3.element.el).getPropertyValue("z-index")), o3 = document.querySelector("#".concat(e3.element.el.id, "-backdrop"));
                return !!o3 && t3 !== parseInt(window.getComputedStyle(o3).getPropertyValue("z-index")) + 1 && ("style" in o3 && (o3.style.zIndex = "".concat(t3 - 1)), void document.body.classList.add("hs-overlay-body-open"));
              });
            }();
          }), "undefined" != typeof window && (window.HSOverlay = c), t2.default = c;
        }, 292: function(e2, t2) {
          var o2 = this;
          Object.defineProperty(t2, "__esModule", { value: true }), t2.menuSearchHistory = t2.classToClassList = t2.htmlToElement = t2.afterTransition = t2.dispatch = t2.debounce = t2.isJson = t2.isDirectChild = t2.isFormElement = t2.isParentOrElementHidden = t2.isEnoughSpace = t2.isIpadOS = t2.isIOS = t2.getZIndex = t2.getClassPropertyAlt = t2.getClassProperty = t2.stringToBoolean = void 0, t2.getHighestZIndex = function(e3) {
            var t3 = Number.NEGATIVE_INFINITY;
            return e3.forEach(function(e4) {
              var o3 = n(e4);
              "auto" !== o3 && (o3 = parseInt(o3, 10)) > t3 && (t3 = o3);
            }), t3;
          };
          t2.stringToBoolean = function(e3) {
            return "true" === e3;
          };
          t2.getClassProperty = function(e3, t3, o3) {
            return void 0 === o3 && (o3 = ""), (window.getComputedStyle(e3).getPropertyValue(t3) || o3).replace(" ", "");
          };
          t2.getClassPropertyAlt = function(e3, t3, o3) {
            void 0 === o3 && (o3 = "");
            var n2 = "";
            return e3.classList.forEach(function(e4) {
              e4.includes(t3) && (n2 = e4);
            }), n2.match(/:(.*)]/) ? n2.match(/:(.*)]/)[1] : o3;
          };
          var n = function(e3) {
            return window.getComputedStyle(e3).getPropertyValue("z-index");
          };
          t2.getZIndex = n;
          t2.isIOS = function() {
            return !!/iPad|iPhone|iPod/.test(navigator.platform) || navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
          };
          t2.isIpadOS = function() {
            return navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
          };
          t2.isDirectChild = function(e3, t3) {
            for (var o3 = e3.children, n2 = 0; n2 < o3.length; n2++)
              if (o3[n2] === t3)
                return true;
            return false;
          };
          t2.isEnoughSpace = function(e3, t3, o3, n2, i2) {
            void 0 === o3 && (o3 = "auto"), void 0 === n2 && (n2 = 10), void 0 === i2 && (i2 = null);
            var r = t3.getBoundingClientRect(), l = i2 ? i2.getBoundingClientRect() : null, a = window.innerHeight, s = l ? r.top - l.top : r.top, c = (i2 ? l.bottom : a) - r.bottom, d = e3.clientHeight + n2;
            return "bottom" === o3 ? c >= d : "top" === o3 ? s >= d : s >= d || c >= d;
          };
          t2.isFormElement = function(e3) {
            return e3 instanceof HTMLInputElement || e3 instanceof HTMLTextAreaElement || e3 instanceof HTMLSelectElement;
          };
          var i = function(e3) {
            return !!e3 && ("none" === window.getComputedStyle(e3).display || i(e3.parentElement));
          };
          t2.isParentOrElementHidden = i;
          t2.isJson = function(e3) {
            if ("string" != typeof e3)
              return false;
            var t3 = e3.trim()[0], o3 = e3.trim().slice(-1);
            if ("{" === t3 && "}" === o3 || "[" === t3 && "]" === o3)
              try {
                return JSON.parse(e3), true;
              } catch (e4) {
                return false;
              }
            return false;
          };
          t2.debounce = function(e3, t3) {
            var n2;
            return void 0 === t3 && (t3 = 200), function() {
              for (var i2 = [], r = 0; r < arguments.length; r++)
                i2[r] = arguments[r];
              clearTimeout(n2), n2 = setTimeout(function() {
                e3.apply(o2, i2);
              }, t3);
            };
          };
          t2.dispatch = function(e3, t3, o3) {
            void 0 === o3 && (o3 = null);
            var n2 = new CustomEvent(e3, { detail: { payload: o3 }, bubbles: true, cancelable: true, composed: false });
            t3.dispatchEvent(n2);
          };
          t2.afterTransition = function(e3, t3) {
            var o3 = function() {
              t3(), e3.removeEventListener("transitionend", o3, true);
            }, n2 = window.getComputedStyle(e3), i2 = n2.getPropertyValue("transition-duration");
            "none" !== n2.getPropertyValue("transition-property") && parseFloat(i2) > 0 ? e3.addEventListener("transitionend", o3, true) : t3();
          };
          t2.htmlToElement = function(e3) {
            var t3 = document.createElement("template");
            return e3 = e3.trim(), t3.innerHTML = e3, t3.content.firstChild;
          };
          t2.classToClassList = function(e3, t3, o3, n2) {
            void 0 === o3 && (o3 = " "), void 0 === n2 && (n2 = "add"), e3.split(o3).forEach(function(e4) {
              return "add" === n2 ? t3.classList.add(e4) : t3.classList.remove(e4);
            });
          };
          t2.menuSearchHistory = { historyIndex: -1, addHistory: function(e3) {
            this.historyIndex = e3;
          }, existsInHistory: function(e3) {
            return e3 > this.historyIndex;
          }, clearHistory: function() {
            this.historyIndex = -1;
          } };
        } }, t = {};
        var o = function o2(n) {
          var i = t[n];
          if (void 0 !== i)
            return i.exports;
          var r = t[n] = { exports: {} };
          return e[n].call(r.exports, r, r.exports, o2), r.exports;
        }(850);
        return o;
      })());
    }
  });

  // node_modules/.pnpm/preline@2.7.0/node_modules/preline/dist/theme-switch.js
  var require_theme_switch = __commonJS({
    "node_modules/.pnpm/preline@2.7.0/node_modules/preline/dist/theme-switch.js"(exports, module) {
      !function(e, t) {
        if ("object" == typeof exports && "object" == typeof module)
          module.exports = t();
        else if ("function" == typeof define && define.amd)
          define([], t);
        else {
          var n = t();
          for (var o in n)
            ("object" == typeof exports ? exports : e)[o] = n[o];
        }
      }(self, () => (() => {
        "use strict";
        var e = { 961: (e2, t2) => {
          Object.defineProperty(t2, "__esModule", { value: true });
          var n2 = function() {
            function e3(e4, t3, n3) {
              this.el = e4, this.options = t3, this.events = n3, this.el = e4, this.options = t3, this.events = {};
            }
            return e3.prototype.createCollection = function(e4, t3) {
              var n3;
              e4.push({ id: (null === (n3 = null == t3 ? void 0 : t3.el) || void 0 === n3 ? void 0 : n3.id) || e4.length + 1, element: t3 });
            }, e3.prototype.fireEvent = function(e4, t3) {
              if (void 0 === t3 && (t3 = null), this.events.hasOwnProperty(e4))
                return this.events[e4](t3);
            }, e3.prototype.on = function(e4, t3) {
              this.events[e4] = t3;
            }, e3;
          }();
          t2.default = n2;
        }, 502: function(e2, t2, n2) {
          var o, i = this && this.__extends || (o = function(e3, t3) {
            return o = Object.setPrototypeOf || { __proto__: [] } instanceof Array && function(e4, t4) {
              e4.__proto__ = t4;
            } || function(e4, t4) {
              for (var n3 in t4)
                Object.prototype.hasOwnProperty.call(t4, n3) && (e4[n3] = t4[n3]);
            }, o(e3, t3);
          }, function(e3, t3) {
            if ("function" != typeof t3 && null !== t3)
              throw new TypeError("Class extends value " + String(t3) + " is not a constructor or null");
            function n3() {
              this.constructor = e3;
            }
            o(e3, t3), e3.prototype = null === t3 ? Object.create(t3) : (n3.prototype = t3.prototype, new n3());
          }), r = this && this.__assign || function() {
            return r = Object.assign || function(e3) {
              for (var t3, n3 = 1, o2 = arguments.length; n3 < o2; n3++)
                for (var i2 in t3 = arguments[n3])
                  Object.prototype.hasOwnProperty.call(t3, i2) && (e3[i2] = t3[i2]);
              return e3;
            }, r.apply(this, arguments);
          }, s = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          var l = function(e3) {
            function t3(t4, n3) {
              var o2 = e3.call(this, t4, n3) || this, i2 = t4.getAttribute("data-hs-theme-switch"), s2 = i2 ? JSON.parse(i2) : {}, l2 = r(r({}, s2), n3);
              return o2.theme = (null == l2 ? void 0 : l2.theme) || localStorage.getItem("hs_theme") || "default", o2.type = (null == l2 ? void 0 : l2.type) || "change", o2.themeSet = ["light", "dark", "default"], o2.init(), o2;
            }
            return i(t3, e3), t3.prototype.elementChange = function(e4) {
              var t4 = e4.target.checked ? "dark" : "default";
              this.setAppearance(t4), this.toggleObserveSystemTheme();
            }, t3.prototype.elementClick = function(e4) {
              this.setAppearance(e4), this.toggleObserveSystemTheme();
            }, t3.prototype.init = function() {
              this.createCollection(window.$hsThemeSwitchCollection, this), "default" !== this.theme && this.setAppearance(), "click" === this.type ? this.buildSwitchTypeOfClick() : this.buildSwitchTypeOfChange();
            }, t3.prototype.buildSwitchTypeOfChange = function() {
              var e4 = this;
              this.el.checked = "dark" === this.theme, this.toggleObserveSystemTheme(), this.onElementChangeListener = function(t4) {
                return e4.elementChange(t4);
              }, this.el.addEventListener("change", this.onElementChangeListener);
            }, t3.prototype.buildSwitchTypeOfClick = function() {
              var e4 = this, t4 = this.el.getAttribute("data-hs-theme-click-value");
              this.toggleObserveSystemTheme(), this.onElementClickListener = function() {
                return e4.elementClick(t4);
              }, this.el.addEventListener("click", this.onElementClickListener);
            }, t3.prototype.setResetStyles = function() {
              var e4 = document.createElement("style");
              return e4.innerText = "*{transition: unset !important;}", e4.setAttribute("data-hs-appearance-onload-styles", ""), document.head.appendChild(e4), e4;
            }, t3.prototype.addSystemThemeObserver = function() {
              var e4 = this;
              window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", function(t4) {
                t4.matches ? e4.setAppearance("dark", false) : e4.setAppearance("default", false);
              });
            }, t3.prototype.removeSystemThemeObserver = function() {
              window.matchMedia("(prefers-color-scheme: dark)").removeEventListener;
            }, t3.prototype.toggleObserveSystemTheme = function() {
              "auto" === localStorage.getItem("hs_theme") ? this.addSystemThemeObserver() : this.removeSystemThemeObserver();
            }, t3.prototype.setAppearance = function(e4, t4, n3) {
              void 0 === e4 && (e4 = this.theme), void 0 === t4 && (t4 = true), void 0 === n3 && (n3 = true);
              var o2 = document.querySelector("html"), i2 = this.setResetStyles();
              t4 && localStorage.setItem("hs_theme", e4), "auto" === e4 && (e4 = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "default"), o2.classList.remove("light", "dark", "default", "auto"), o2.classList.add(e4), setTimeout(function() {
                return i2.remove();
              }), n3 && window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: e4 }));
            }, t3.prototype.destroy = function() {
              var e4 = this;
              "change" === this.type && this.el.removeEventListener("change", this.onElementChangeListener), "click" === this.type && this.el.removeEventListener("click", this.onElementClickListener), window.$hsThemeSwitchCollection = window.$hsThemeSwitchCollection.filter(function(t4) {
                return t4.element.el !== e4.el;
              });
            }, t3.getInstance = function(e4, t4) {
              var n3 = window.$hsThemeSwitchCollection.find(function(t5) {
                return t5.element.el === ("string" == typeof e4 ? document.querySelector(e4) : e4);
              });
              return n3 ? t4 ? n3 : n3.element.el : null;
            }, t3.autoInit = function() {
              window.$hsThemeSwitchCollection || (window.$hsThemeSwitchCollection = []), window.$hsThemeSwitchCollection && (window.$hsThemeSwitchCollection = window.$hsThemeSwitchCollection.filter(function(e4) {
                var t4 = e4.element;
                return document.contains(t4.el);
              })), document.querySelectorAll("[data-hs-theme-switch]:not(.--prevent-on-load-init)").forEach(function(e4) {
                window.$hsThemeSwitchCollection.find(function(t4) {
                  var n3;
                  return (null === (n3 = null == t4 ? void 0 : t4.element) || void 0 === n3 ? void 0 : n3.el) === e4;
                }) || new t3(e4, { type: "change" });
              }), document.querySelectorAll("[data-hs-theme-click-value]:not(.--prevent-on-load-init)").forEach(function(e4) {
                window.$hsThemeSwitchCollection.find(function(t4) {
                  var n3;
                  return (null === (n3 = null == t4 ? void 0 : t4.element) || void 0 === n3 ? void 0 : n3.el) === e4;
                }) || new t3(e4, { type: "click" });
              });
            }, t3;
          }(s(n2(961)).default);
          window.addEventListener("load", function() {
            l.autoInit();
          }), window.$hsThemeSwitchCollection && window.addEventListener("on-hs-appearance-change", function(e3) {
            window.$hsThemeSwitchCollection.forEach(function(t3) {
              t3.element.el.checked = "dark" === e3.detail;
            });
          }), "undefined" != typeof window && (window.HSThemeSwitch = l), t2.default = l;
        } }, t = {};
        var n = function n2(o) {
          var i = t[o];
          if (void 0 !== i)
            return i.exports;
          var r = t[o] = { exports: {} };
          return e[o].call(r.exports, r, r.exports, n2), r.exports;
        }(502);
        return n;
      })());
    }
  });

  // ../static_src/javascript/main.js
  var import_collapse = __toESM(require_collapse());
  var import_overlay = __toESM(require_overlay());
  var import_theme_switch = __toESM(require_theme_switch());
  document.addEventListener("on-hs-appearance-change", (e) => {
    const theme = e.detail;
    document.documentElement.setAttribute(
      "data-theme",
      theme === "default" ? "light" : "dark"
    );
  });
  var initTheme = () => {
    const isDark = document.documentElement.classList.contains("dark");
    document.documentElement.setAttribute(
      "data-theme",
      isDark ? "dark" : "light"
    );
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      import_collapse.HSCollapse.autoInit();
      import_overlay.HSOverlay.autoInit();
      import_theme_switch.HSThemeSwitch.autoInit();
      initTheme();
    });
  } else {
    import_collapse.HSCollapse.autoInit();
    import_overlay.HSOverlay.autoInit();
    import_theme_switch.HSThemeSwitch.autoInit();
    initTheme();
  }
})();
/*! Bundled license information:

preline/dist/collapse.js:
  (*
   * HSCollapse
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/dist/overlay.js:
  (*
   * HSOverlay
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)

preline/dist/theme-switch.js:
  (*
   * HSThemeSwitch
   * @version: 2.7.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
*/
//# sourceMappingURL=main.js.map
