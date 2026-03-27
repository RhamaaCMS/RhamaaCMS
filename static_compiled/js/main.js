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

  // node_modules/.pnpm/preline@4.0.1/node_modules/preline/dist/index.js
  var require_dist = __commonJS({
    "node_modules/.pnpm/preline@4.0.1/node_modules/preline/dist/index.js"(exports, module2) {
      !(function(e, t) {
        if ("object" == typeof exports && "object" == typeof module2) module2.exports = t();
        else if ("function" == typeof define && define.amd) define([], t);
        else {
          var i = t();
          for (var n in i) ("object" == typeof exports ? exports : e)[n] = i[n];
        }
      })(self, (() => (() => {
        var e = { 60: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            elementInput(e3, t3) {
              this.onInput(e3, t3);
            }
            elementPaste(e3) {
              this.onPaste(e3);
            }
            elementKeydown(e3, t3) {
              this.onKeydown(e3, t3);
            }
            elementFocusin(e3) {
              this.onFocusIn(e3);
            }
            elementFocusout(e3) {
              this.onFocusOut(e3);
            }
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-pin-input"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.items = this.el.querySelectorAll("[data-hs-pin-input-item]"), this.currentItem = null, this.currentValue = new Array(this.items.length).fill(""), this.placeholders = [], this.availableCharsRE = new RegExp((null == s2 ? void 0 : s2.availableCharsRE) || "^[a-zA-Z0-9]+$"), this.onElementInputListener = [], this.onElementPasteListener = [], this.onElementKeydownListener = [], this.onElementFocusinListener = [], this.onElementFocusoutListener = [], this.init();
            }
            init() {
              this.createCollection(window.$hsPinInputCollection, this), this.items.length && this.build();
            }
            build() {
              this.buildInputItems();
            }
            buildInputItems() {
              this.items.forEach(((e3, t3) => {
                this.placeholders.push(e3.getAttribute("placeholder") || ""), e3.hasAttribute("autofocus") && this.onFocusIn(t3), this.onElementInputListener.push({ el: e3, fn: (e4) => this.elementInput(e4, t3) }), this.onElementPasteListener.push({ el: e3, fn: (e4) => this.elementPaste(e4) }), this.onElementKeydownListener.push({ el: e3, fn: (e4) => this.elementKeydown(e4, t3) }), this.onElementFocusinListener.push({ el: e3, fn: () => this.elementFocusin(t3) }), this.onElementFocusoutListener.push({ el: e3, fn: () => this.elementFocusout(t3) }), e3.addEventListener("input", this.onElementInputListener.find(((t4) => t4.el === e3)).fn), e3.addEventListener("paste", this.onElementPasteListener.find(((t4) => t4.el === e3)).fn), e3.addEventListener("keydown", this.onElementKeydownListener.find(((t4) => t4.el === e3)).fn), e3.addEventListener("focusin", this.onElementFocusinListener.find(((t4) => t4.el === e3)).fn), e3.addEventListener("focusout", this.onElementFocusoutListener.find(((t4) => t4.el === e3)).fn);
              }));
            }
            checkIfNumber(e3) {
              return e3.match(this.availableCharsRE);
            }
            autoFillAll(e3) {
              Array.from(e3).forEach(((e4, t3) => {
                if (!(null == this ? void 0 : this.items[t3])) return false;
                this.items[t3].value = e4, this.items[t3].dispatchEvent(new Event("input", { bubbles: true }));
              }));
            }
            setCurrentValue() {
              this.currentValue = Array.from(this.items).map(((e3) => e3.value));
            }
            toggleCompleted() {
              this.currentValue.includes("") ? this.el.classList.remove("active") : this.el.classList.add("active");
            }
            onInput(e3, t3) {
              const i3 = e3.target.value;
              if (this.currentItem = e3.target, this.currentItem.value = "", this.currentItem.value = i3[i3.length - 1], !this.checkIfNumber(this.currentItem.value)) return this.currentItem.value = this.currentValue[t3] || "", false;
              if (this.setCurrentValue(), this.currentItem.value) {
                if (t3 < this.items.length - 1 && this.items[t3 + 1].focus(), !this.currentValue.includes("")) {
                  const e4 = { currentValue: this.currentValue };
                  this.fireEvent("completed", e4), (0, s.dispatch)("completed.hs.pinInput", this.el, e4);
                }
                this.toggleCompleted();
              } else t3 > 0 && this.items[t3 - 1].focus();
            }
            onKeydown(e3, t3) {
              "Backspace" === e3.key && t3 > 0 && ("" === this.items[t3].value ? (this.items[t3 - 1].value = "", this.items[t3 - 1].focus()) : this.items[t3].value = ""), this.setCurrentValue(), this.toggleCompleted();
            }
            onFocusIn(e3) {
              this.items[e3].setAttribute("placeholder", "");
            }
            onFocusOut(e3) {
              this.items[e3].setAttribute("placeholder", this.placeholders[e3]);
            }
            onPaste(e3) {
              e3.preventDefault(), this.items.forEach(((t3) => {
                document.activeElement === t3 && this.autoFillAll(e3.clipboardData.getData("text"));
              }));
            }
            destroy() {
              this.el.classList.remove("active"), this.items.length && this.items.forEach(((e3) => {
                e3.removeEventListener("input", this.onElementInputListener.find(((t3) => t3.el === e3)).fn), e3.removeEventListener("paste", this.onElementPasteListener.find(((t3) => t3.el === e3)).fn), e3.removeEventListener("keydown", this.onElementKeydownListener.find(((t3) => t3.el === e3)).fn), e3.removeEventListener("focusin", this.onElementFocusinListener.find(((t3) => t3.el === e3)).fn), e3.removeEventListener("focusout", this.onElementFocusoutListener.find(((t3) => t3.el === e3)).fn);
              })), this.items = null, this.currentItem = null, this.currentValue = null, window.$hsPinInputCollection = window.$hsPinInputCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsPinInputCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsPinInputCollection || (window.$hsPinInputCollection = []), window.$hsPinInputCollection && (window.$hsPinInputCollection = window.$hsPinInputCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-pin-input]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsPinInputCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSPinInput = l), t2.default = l;
        }, 97: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              super(e3, t3), this.isOpened = false, this.strength = 0, this.passedRules = /* @__PURE__ */ new Set();
              const i3 = e3.getAttribute("data-hs-strong-password"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.target = (null == s2 ? void 0 : s2.target) ? "string" == typeof (null == s2 ? void 0 : s2.target) ? document.querySelector(s2.target) : s2.target : null, this.hints = (null == s2 ? void 0 : s2.hints) ? "string" == typeof (null == s2 ? void 0 : s2.hints) ? document.querySelector(s2.hints) : s2.hints : null, this.stripClasses = (null == s2 ? void 0 : s2.stripClasses) || null, this.minLength = (null == s2 ? void 0 : s2.minLength) || 6, this.mode = (null == s2 ? void 0 : s2.mode) || "default", this.popoverSpace = (null == s2 ? void 0 : s2.popoverSpace) || 10, this.checksExclude = (null == s2 ? void 0 : s2.checksExclude) || [], this.availableChecks = ["lowercase", "uppercase", "numbers", "special-characters", "min-length"].filter(((e4) => !this.checksExclude.includes(e4))), this.specialCharactersSet = (null == s2 ? void 0 : s2.specialCharactersSet) || "!\"#$%&'()*+,-./:;<=>?@[\\\\\\]^_`{|}~", this.target && this.init();
            }
            targetInput(e3) {
              this.setStrength(e3.target.value);
            }
            targetFocus() {
              this.isOpened = true, this.hints.classList.remove("hidden"), this.hints.classList.add("block"), this.recalculateDirection();
            }
            targetBlur() {
              this.isOpened = false, this.hints.classList.remove("block", "bottom-full", "top-full"), this.hints.classList.add("hidden"), this.hints.style.marginTop = "", this.hints.style.marginBottom = "";
            }
            targetInputSecond() {
              this.setWeaknessText();
            }
            targetInputThird() {
              this.setRulesText();
            }
            init() {
              this.createCollection(window.$hsStrongPasswordCollection, this), this.availableChecks.length && this.build();
            }
            build() {
              this.buildStrips(), this.hints && this.buildHints(), this.setStrength(this.target.value), this.onTargetInputListener = (e3) => this.targetInput(e3), this.target.addEventListener("input", this.onTargetInputListener);
            }
            buildStrips() {
              if (this.el.innerHTML = "", this.stripClasses) for (let e3 = 0; e3 < this.availableChecks.length; e3++) {
                const e4 = (0, s.htmlToElement)("<div></div>");
                (0, s.classToClassList)(this.stripClasses, e4), this.el.append(e4);
              }
            }
            buildHints() {
              this.weakness = this.hints.querySelector("[data-hs-strong-password-hints-weakness-text]") || null, this.rules = Array.from(this.hints.querySelectorAll("[data-hs-strong-password-hints-rule-text]")) || null, this.rules.forEach(((e3) => {
                var t3;
                const i3 = e3.getAttribute("data-hs-strong-password-hints-rule-text");
                (null === (t3 = this.checksExclude) || void 0 === t3 ? void 0 : t3.includes(i3)) && e3.remove();
              })), this.weakness && this.buildWeakness(), this.rules && this.buildRules(), "popover" === this.mode && (this.onTargetFocusListener = () => this.targetFocus(), this.onTargetBlurListener = () => this.targetBlur(), this.target.addEventListener("focus", this.onTargetFocusListener), this.target.addEventListener("blur", this.onTargetBlurListener));
            }
            buildWeakness() {
              this.checkStrength(this.target.value), this.setWeaknessText(), this.onTargetInputSecondListener = () => setTimeout((() => this.targetInputSecond())), this.target.addEventListener("input", this.onTargetInputSecondListener);
            }
            buildRules() {
              this.setRulesText(), this.onTargetInputThirdListener = () => setTimeout((() => this.targetInputThird())), this.target.addEventListener("input", this.onTargetInputThirdListener);
            }
            setWeaknessText() {
              const e3 = this.weakness.getAttribute("data-hs-strong-password-hints-weakness-text"), t3 = JSON.parse(e3);
              this.weakness.textContent = t3[this.strength];
            }
            setRulesText() {
              this.rules.forEach(((e3) => {
                const t3 = e3.getAttribute("data-hs-strong-password-hints-rule-text");
                this.checkIfPassed(e3, this.passedRules.has(t3));
              }));
            }
            togglePopover() {
              const e3 = this.el.querySelector(".popover");
              e3 && e3.classList.toggle("show");
            }
            checkStrength(e3) {
              const t3 = /* @__PURE__ */ new Set(), i3 = { lowercase: /[a-z]+/, uppercase: /[A-Z]+/, numbers: /[0-9]+/, "special-characters": new RegExp(`[${this.specialCharactersSet}]`) };
              let n2 = 0;
              return this.availableChecks.includes("lowercase") && e3.match(i3.lowercase) && (n2 += 1, t3.add("lowercase")), this.availableChecks.includes("uppercase") && e3.match(i3.uppercase) && (n2 += 1, t3.add("uppercase")), this.availableChecks.includes("numbers") && e3.match(i3.numbers) && (n2 += 1, t3.add("numbers")), this.availableChecks.includes("special-characters") && e3.match(i3["special-characters"]) && (n2 += 1, t3.add("special-characters")), this.availableChecks.includes("min-length") && e3.length >= this.minLength && (n2 += 1, t3.add("min-length")), e3.length || (n2 = 0), n2 === this.availableChecks.length ? this.el.classList.add("accepted") : this.el.classList.remove("accepted"), this.strength = n2, this.passedRules = t3, { strength: this.strength, rules: this.passedRules };
            }
            checkIfPassed(e3, t3 = false) {
              const i3 = e3.querySelector("[data-check]"), n2 = e3.querySelector("[data-uncheck]");
              t3 ? (e3.classList.add("active"), i3.classList.remove("hidden"), n2.classList.add("hidden")) : (e3.classList.remove("active"), i3.classList.add("hidden"), n2.classList.remove("hidden"));
            }
            setStrength(e3) {
              const { strength: t3, rules: i3 } = this.checkStrength(e3), n2 = { strength: t3, rules: i3 };
              this.hideStrips(t3), this.fireEvent("change", n2), (0, s.dispatch)("change.hs.strongPassword", this.el, n2);
            }
            hideStrips(e3) {
              Array.from(this.el.children).forEach(((t3, i3) => {
                i3 < e3 ? t3.classList.add("passed") : t3.classList.remove("passed");
              }));
            }
            recalculateDirection() {
              (0, s.isEnoughSpace)(this.hints, this.target, "bottom", this.popoverSpace) ? (this.hints.classList.remove("bottom-full"), this.hints.classList.add("top-full"), this.hints.style.marginBottom = "", this.hints.style.marginTop = `${this.popoverSpace}px`) : (this.hints.classList.remove("top-full"), this.hints.classList.add("bottom-full"), this.hints.style.marginTop = "", this.hints.style.marginBottom = `${this.popoverSpace}px`);
            }
            destroy() {
              this.target.removeEventListener("input", this.onTargetInputListener), this.target.removeEventListener("focus", this.onTargetFocusListener), this.target.removeEventListener("blur", this.onTargetBlurListener), this.target.removeEventListener("input", this.onTargetInputSecondListener), this.target.removeEventListener("input", this.onTargetInputThirdListener), window.$hsStrongPasswordCollection = window.$hsStrongPasswordCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsStrongPasswordCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsStrongPasswordCollection || (window.$hsStrongPasswordCollection = []), window.$hsStrongPasswordCollection && (window.$hsStrongPasswordCollection = window.$hsStrongPasswordCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-strong-password]:not(.--prevent-on-load-init)").forEach(((e3) => {
                if (!window.$hsStrongPasswordCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                }))) {
                  const t3 = e3.getAttribute("data-hs-strong-password"), i3 = t3 ? JSON.parse(t3) : {};
                  new l(e3, i3);
                }
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), document.addEventListener("scroll", (() => {
            if (!window.$hsStrongPasswordCollection) return false;
            const e3 = window.$hsStrongPasswordCollection.find(((e4) => e4.element.isOpened));
            e3 && e3.element.recalculateDirection();
          })), "undefined" != typeof window && (window.HSStrongPassword = l), t2.default = l;
        }, 100: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-toggle-password"), n2 = i3 ? JSON.parse(i3) : {}, o2 = Object.assign(Object.assign({}, n2), t3), l2 = [];
              if ((null == o2 ? void 0 : o2.target) && "string" == typeof (null == o2 ? void 0 : o2.target)) {
                (null == o2 ? void 0 : o2.target.split(",")).forEach(((e4) => {
                  l2.push(document.querySelector(e4));
                }));
              } else (null == o2 ? void 0 : o2.target) && "object" == typeof (null == o2 ? void 0 : o2.target) ? o2.target.forEach(((e4) => l2.push(document.querySelector(e4)))) : o2.target.forEach(((e4) => l2.push(e4)));
              this.target = l2, this.isShown = !!this.el.hasAttribute("type") && this.el.checked, this.eventType = (0, s.isFormElement)(this.el) ? "change" : "click", this.isMultiple = this.target.length > 1 && !!this.el.closest("[data-hs-toggle-password-group]"), this.target && this.init();
            }
            elementAction() {
              this.isShown ? this.hide() : this.show(), this.fireEvent("toggle", this.target), (0, s.dispatch)("toggle.hs.toggle-select", this.el, this.target);
            }
            init() {
              this.createCollection(window.$hsTogglePasswordCollection, this), this.isShown ? this.show() : this.hide(), this.onElementActionListener = () => this.elementAction(), this.el.addEventListener(this.eventType, this.onElementActionListener);
            }
            getMultipleToggles() {
              const e3 = this.el.closest("[data-hs-toggle-password-group]").querySelectorAll("[data-hs-toggle-password]"), t3 = [];
              return e3.forEach(((e4) => {
                t3.push(l.getInstance(e4));
              })), t3;
            }
            show() {
              if (this.isMultiple) {
                this.getMultipleToggles().forEach(((e3) => !!e3 && (e3.isShown = true))), this.el.closest("[data-hs-toggle-password-group]").classList.add("active");
              } else this.isShown = true, this.el.classList.add("active");
              this.target.forEach(((e3) => {
                e3.type = "text";
              }));
            }
            hide() {
              if (this.isMultiple) {
                this.getMultipleToggles().forEach(((e3) => !!e3 && (e3.isShown = false))), this.el.closest("[data-hs-toggle-password-group]").classList.remove("active");
              } else this.isShown = false, this.el.classList.remove("active");
              this.target.forEach(((e3) => {
                e3.type = "password";
              }));
            }
            destroy() {
              this.isMultiple ? this.el.closest("[data-hs-toggle-password-group]").classList.remove("active") : this.el.classList.remove("active"), this.target.forEach(((e3) => {
                e3.type = "password";
              })), this.el.removeEventListener(this.eventType, this.onElementActionListener), this.isShown = false, window.$hsTogglePasswordCollection = window.$hsTogglePasswordCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsTogglePasswordCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsTogglePasswordCollection || (window.$hsTogglePasswordCollection = []), window.$hsTogglePasswordCollection && (window.$hsTogglePasswordCollection = window.$hsTogglePasswordCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-toggle-password]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsTogglePasswordCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSTogglePassword = l), t2.default = l;
        }, 128: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(632)), l = i2(191), a = i2(370), r = i2(852), d = i2(292), c = n(i2(442)), h = n(i2(961));
          class u extends h.default {
            constructor(e3, t3, i3) {
              var n2, r2, d2, c2, h2, u2, p, m, g;
              super(e3, t3, i3);
              const v = e3.getAttribute("data-hs-datepicker") ? JSON.parse(e3.getAttribute("data-hs-datepicker")) : {};
              this.dataOptions = Object.assign(Object.assign({}, v), t3), this.applyUtilityClasses = void 0 !== (null === (n2 = this.dataOptions) || void 0 === n2 ? void 0 : n2.applyUtilityClasses) && (null === (r2 = this.dataOptions) || void 0 === r2 ? void 0 : r2.applyUtilityClasses), this.templatesByType = this.applyUtilityClasses ? l.templates : a.templatesBasedOnUtility;
              const f = void 0 !== (null === (d2 = this.dataOptions) || void 0 === d2 ? void 0 : d2.removeDefaultStyles) && (null === (c2 = this.dataOptions) || void 0 === c2 ? void 0 : c2.removeDefaultStyles);
              this.updatedStyles = _.mergeWith(f ? {} : o.default.defaultStyles, (null === (h2 = this.dataOptions) || void 0 === h2 ? void 0 : h2.styles) || {}, ((e4, t4) => {
                if ("string" == typeof e4 && "string" == typeof t4) return `${e4} ${t4}`;
              }));
              const y = /* @__PURE__ */ new Date(), b = { selectedTheme: null !== (u2 = this.dataOptions.selectedTheme) && void 0 !== u2 ? u2 : "", styles: this.updatedStyles, dateMin: null !== (p = this.dataOptions.dateMin) && void 0 !== p ? p : y.toISOString().split("T")[0], dateMax: null !== (m = this.dataOptions.dateMax) && void 0 !== m ? m : "2470-12-31", mode: null !== (g = this.dataOptions.mode) && void 0 !== g ? g : "default", inputMode: void 0 === this.dataOptions.inputMode || this.dataOptions.inputMode }, w = (e4, t4) => (i4) => {
                null == e4 || e4(i4), null == t4 || t4(i4);
              }, C = (e4) => {
                this.hasTime(e4) && this.initCustomTime(e4);
              }, S = { layouts: { month: this.templatesByType.month(b.selectedTheme) }, onInit: w(this.dataOptions.onInit, ((e4) => {
                "custom-select" !== b.mode || this.dataOptions.inputMode || C(e4);
              })), onShow: w(this.dataOptions.onShow, ((e4) => {
                b.inputMode && requestAnimationFrame((() => {
                  requestAnimationFrame((() => {
                    window.dispatchEvent(new Event("resize"));
                  }));
                })), "custom-select" === b.mode && (this.updateCustomSelects(e4), C(e4));
              })), onHide: w(this.dataOptions.onHide, ((e4) => {
                "custom-select" === b.mode && this.destroySelects(e4.context.mainElement);
              })), onUpdate: w(this.dataOptions.onUpdate, ((e4) => {
                this.updateCalendar(e4.context.mainElement);
              })), onCreateDateEls: w(this.dataOptions.onCreateDateEls, ((e4) => {
                "custom-select" === b.mode && this.updateCustomSelects(e4);
              })), onChangeToInput: w(this.dataOptions.onChangeToInput, ((e4) => {
                if (!e4.context.inputElement) return;
                this.setInputValue(e4.context.inputElement, e4.context.selectedDates);
                const t4 = { selectedDates: e4.context.selectedDates, selectedTime: e4.context.selectedTime, rest: e4.context };
                this.fireEvent("change", t4), (0, s.dispatch)("change.hs.datepicker", this.el, t4);
              })), onChangeTime: w(this.dataOptions.onChangeTime, C), onClickYear: w(this.dataOptions.onClickYear, C), onClickMonth: w(this.dataOptions.onClickMonth, C), onClickArrow: w(this.dataOptions.onClickArrow, ((e4) => {
                "custom-select" === b.mode && setTimeout((() => {
                  this.disableNav(), this.disableOptions(), this.updateCalendar(e4.context.mainElement);
                }));
              })) };
              this.concatOptions = _.merge(S, this.dataOptions);
              const x = Object.assign(Object.assign({}, b), { layouts: { default: this.processCustomTemplate(this.templatesByType.default(b.selectedTheme), "default"), multiple: this.processCustomTemplate(this.templatesByType.multiple(b.selectedTheme), "multiple"), year: this.processCustomTemplate(this.templatesByType.year(b.selectedTheme), "default") } });
              this.concatOptions = _.merge(this.concatOptions, x), this.vanillaCalendar = new o.default(this.el, this.concatOptions), this.init();
            }
            init() {
              var e3, t3;
              this.createCollection(window.$hsDatepickerCollection, this), this.vanillaCalendar.init(), (null === (e3 = this.dataOptions) || void 0 === e3 ? void 0 : e3.selectedDates) && this.setInputValue(this.vanillaCalendar.context.inputElement, this.formatDateArrayToIndividualDates(null === (t3 = this.dataOptions) || void 0 === t3 ? void 0 : t3.selectedDates));
            }
            getTimeParts(e3) {
              const [t3, i3] = e3.split(" "), [n2, s2] = t3.split(":");
              return [n2, s2, i3];
            }
            getCurrentMonthAndYear(e3) {
              const t3 = e3.querySelector('[data-vc="month"]'), i3 = e3.querySelector('[data-vc="year"]');
              return { month: +t3.getAttribute("data-vc-month"), year: +i3.getAttribute("data-vc-year") };
            }
            extractSeparatorFromFormat(e3) {
              const t3 = e3.match(/[^A-Za-z0-9]/);
              return t3 ? t3[0] : ".";
            }
            setInputValue(e3, t3) {
              var i3, n2, s2, o2, l2, a2, r2, d2, c2;
              const h2 = null === (i3 = this.dataOptions) || void 0 === i3 ? void 0 : i3.dateFormat, u2 = h2 ? this.extractSeparatorFromFormat(h2) : null, p = null !== (o2 = null != u2 ? u2 : null === (s2 = null === (n2 = this.dataOptions) || void 0 === n2 ? void 0 : n2.inputModeOptions) || void 0 === s2 ? void 0 : s2.dateSeparator) && void 0 !== o2 ? o2 : ".", m = null !== (r2 = null === (a2 = null === (l2 = this.dataOptions) || void 0 === l2 ? void 0 : l2.inputModeOptions) || void 0 === a2 ? void 0 : a2.itemsSeparator) && void 0 !== r2 ? r2 : ", ", g = null !== (c2 = null === (d2 = this.dataOptions) || void 0 === d2 ? void 0 : d2.selectionDatesMode) && void 0 !== c2 ? c2 : "single";
              if (t3.length && t3.length > 1) if ("multiple" === g) {
                const i4 = [];
                t3.forEach(((e4) => i4.push(h2 ? this.formatDate(e4, h2) : this.changeDateSeparator(e4, p)))), e3.value = i4.join(m);
              } else {
                const i4 = h2 ? this.formatDate(t3[0], h2) : this.changeDateSeparator(t3[0], p), n3 = h2 ? this.formatDate(t3[1], h2) : this.changeDateSeparator(t3[1], p);
                e3.value = [i4, n3].join(m);
              }
              else t3.length && 1 === t3.length ? e3.value = h2 ? this.formatDate(t3[0], h2) : this.changeDateSeparator(t3[0], p) : e3.value = "";
            }
            getLocalizedTodayText(e3) {
              return r.todayTranslations[e3] || "Today";
            }
            changeDateSeparator(e3, t3 = ".", i3 = "-") {
              var n2, s2;
              const o2 = new Date(e3);
              if (null === (n2 = this.dataOptions) || void 0 === n2 ? void 0 : n2.replaceTodayWithText) {
                const e4 = /* @__PURE__ */ new Date();
                if (o2.toDateString() === e4.toDateString()) {
                  const e5 = null === (s2 = this.dataOptions) || void 0 === s2 ? void 0 : s2.dateLocale;
                  return this.getLocalizedTodayText(e5);
                }
              }
              return e3.split(i3).join(t3);
            }
            formatDateArrayToIndividualDates(e3) {
              var t3, i3;
              const n2 = null !== (i3 = null === (t3 = this.dataOptions) || void 0 === t3 ? void 0 : t3.selectionDatesMode) && void 0 !== i3 ? i3 : "single";
              return e3.flatMap(((e4) => {
                if ("string" == typeof e4) {
                  if ("today" === e4.toLowerCase()) {
                    return [(/* @__PURE__ */ new Date()).toISOString().split("T")[0]];
                  }
                  const t4 = e4.match(/^(\d{4}-\d{2}-\d{2})\s*[^a-zA-Z0-9]*\s*(\d{4}-\d{2}-\d{2})$/);
                  if (t4) {
                    const [e5, i4, s2] = t4;
                    return "multiple-ranged" === n2 ? [i4, s2] : ((e6, t5) => {
                      const i5 = new Date(e6), n3 = new Date(t5), s3 = [];
                      for (; i5 <= n3; ) s3.push(i5.toISOString().split("T")[0]), i5.setDate(i5.getDate() + 1);
                      return s3;
                    })(i4.trim(), s2.trim());
                  }
                  return [e4];
                }
                return "number" == typeof e4 ? [new Date(e4).toISOString().split("T")[0]] : e4 instanceof Date ? [e4.toISOString().split("T")[0]] : [];
              }));
            }
            hasTime(e3) {
              const { mainElement: t3 } = e3.context, i3 = t3.querySelector("[data-hs-select].--hours"), n2 = t3.querySelector("[data-hs-select].--minutes"), s2 = t3.querySelector("[data-hs-select].--meridiem");
              return i3 && n2 && s2;
            }
            createArrowFromTemplate(e3, t3 = false) {
              if (!t3) return e3;
              const i3 = (0, d.htmlToElement)(e3);
              return (0, d.classToClassList)(t3, i3), i3.outerHTML;
            }
            concatObjectProperties(e3, t3) {
              const i3 = {};
              return (/* @__PURE__ */ new Set([...Object.keys(e3 || {}), ...Object.keys(t3 || {})])).forEach(((n2) => {
                const s2 = e3[n2] || "", o2 = t3[n2] || "";
                i3[n2] = `${s2} ${o2}`.trim();
              })), i3;
            }
            updateTemplate(e3, t3, i3) {
              if (!t3) return e3;
              const n2 = JSON.parse(e3.match(/data-hs-select='([^']+)'/)[1]), s2 = this.concatObjectProperties(t3, i3), o2 = _.merge(n2, s2);
              return e3.replace(/data-hs-select='[^']+'/, `data-hs-select='${JSON.stringify(o2)}'`);
            }
            initCustomTime(e3) {
              var t3;
              const { mainElement: i3 } = e3.context, n2 = this.getTimeParts(null !== (t3 = e3.selectedTime) && void 0 !== t3 ? t3 : "12:00 PM"), s2 = { hours: i3.querySelector("[data-hs-select].--hours"), minutes: i3.querySelector("[data-hs-select].--minutes"), meridiem: i3.querySelector("[data-hs-select].--meridiem") };
              Object.entries(s2).forEach((([t4, s3]) => {
                if (!c.default.getInstance(s3, true)) {
                  const o2 = new c.default(s3);
                  o2.setValue(n2["meridiem" === t4 ? 2 : "minutes" === t4 ? 1 : 0]), o2.el.addEventListener("change.hs.select", ((s4) => {
                    this.destroySelects(i3);
                    const o3 = "hours" === t4 ? s4.detail.payload : n2[0], l2 = "minutes" === t4 ? s4.detail.payload : n2[1], a2 = "meridiem" === t4 ? s4.detail.payload : n2[2];
                    e3.set({ selectedTime: `${o3}:${l2} ${a2}` }, { dates: false, year: false, month: false });
                  }));
                }
              }));
            }
            initCustomMonths(e3) {
              const { mainElement: t3 } = e3.context, i3 = Array.from(t3.querySelectorAll(".--single-month"));
              i3.length && i3.forEach(((i4, n2) => {
                const s2 = i4.querySelector("[data-hs-select].--month");
                if (c.default.getInstance(s2, true)) return false;
                const o2 = new c.default(s2), { month: l2, year: a2 } = this.getCurrentMonthAndYear(i4);
                o2.setValue(`${l2}`), o2.el.addEventListener("change.hs.select", ((i5) => {
                  this.destroySelects(t3), e3.set({ selectedMonth: +i5.detail.payload - n2 < 0 ? 11 : +i5.detail.payload - n2, selectedYear: +i5.detail.payload - n2 < 0 ? +a2 - 1 : a2 }, { dates: false, time: false });
                }));
              }));
            }
            initCustomYears(e3) {
              const { mainElement: t3 } = e3.context, i3 = Array.from(t3.querySelectorAll(".--single-month"));
              i3.length && i3.forEach(((i4) => {
                const n2 = i4.querySelector("[data-hs-select].--year");
                if (c.default.getInstance(n2, true)) return false;
                const s2 = new c.default(n2), { month: o2, year: l2 } = this.getCurrentMonthAndYear(i4);
                s2.setValue(`${l2}`), s2.el.addEventListener("change.hs.select", ((i5) => {
                  const { dateMax: n3, displayMonthsCount: s3 } = this.vanillaCalendar.context, l3 = new Date(n3).getFullYear(), a2 = new Date(n3).getMonth();
                  this.destroySelects(t3), e3.set({ selectedMonth: o2 > a2 - s3 && +i5.detail.payload === l3 ? a2 - s3 + 1 : o2, selectedYear: i5.detail.payload }, { dates: false, time: false });
                }));
              }));
            }
            generateCustomTimeMarkup() {
              var e3, t3, i3, n2;
              const s2 = null === (e3 = this.updatedStyles) || void 0 === e3 ? void 0 : e3.customSelect, o2 = s2 ? this.updateTemplate(this.templatesByType.hours(this.concatOptions.selectedTheme), (null == s2 ? void 0 : s2.shared) || {}, (null == s2 ? void 0 : s2.hours) || {}) : this.templatesByType.hours(this.concatOptions.selectedTheme), l2 = s2 ? this.updateTemplate(this.templatesByType.minutes(this.concatOptions.selectedTheme), (null == s2 ? void 0 : s2.shared) || {}, (null == s2 ? void 0 : s2.minutes) || {}) : this.templatesByType.minutes(this.concatOptions.selectedTheme), a2 = s2 ? this.updateTemplate(this.templatesByType.meridiem(this.concatOptions.selectedTheme), (null == s2 ? void 0 : s2.shared) || {}, (null == s2 ? void 0 : s2.meridiem) || {}) : this.templatesByType.meridiem(this.concatOptions.selectedTheme);
              return `<div class="--time">${null !== (n2 = null === (i3 = null === (t3 = null == this ? void 0 : this.dataOptions) || void 0 === t3 ? void 0 : t3.templates) || void 0 === i3 ? void 0 : i3.time) && void 0 !== n2 ? n2 : `
			<div class="pt-3 flex justify-center items-center gap-x-2">
        ${o2}
        <span class="text-gray-800 ${"light" !== this.concatOptions.selectedTheme ? "dark:text-white" : ""}">:</span>
        ${l2}
        ${a2}
      </div>
		`}</div>`;
            }
            generateCustomMonthMarkup() {
              var e3, t3, i3;
              const n2 = null !== (t3 = null === (e3 = null == this ? void 0 : this.dataOptions) || void 0 === e3 ? void 0 : e3.mode) && void 0 !== t3 ? t3 : "default", s2 = null === (i3 = this.updatedStyles) || void 0 === i3 ? void 0 : i3.customSelect, o2 = s2 ? this.updateTemplate(this.templatesByType.months(this.concatOptions.selectedTheme), (null == s2 ? void 0 : s2.shared) || {}, (null == s2 ? void 0 : s2.months) || {}) : this.templatesByType.months(this.concatOptions.selectedTheme);
              return "custom-select" === n2 ? o2 : "<#Month />";
            }
            generateCustomYearMarkup() {
              var e3, t3, i3, n2, s2, o2, l2;
              if ("custom-select" === (null !== (t3 = null === (e3 = null == this ? void 0 : this.dataOptions) || void 0 === e3 ? void 0 : e3.mode) && void 0 !== t3 ? t3 : "default")) {
                const e4 = /* @__PURE__ */ new Date(), t4 = null !== (n2 = null === (i3 = null == this ? void 0 : this.dataOptions) || void 0 === i3 ? void 0 : i3.dateMin) && void 0 !== n2 ? n2 : e4.toISOString().split("T")[0], a2 = null !== (o2 = null === (s2 = null == this ? void 0 : this.dataOptions) || void 0 === s2 ? void 0 : s2.dateMax) && void 0 !== o2 ? o2 : "2470-12-31", r2 = new Date(t4), d2 = new Date(a2), c2 = r2.getFullYear(), h2 = d2.getFullYear(), u2 = () => {
                  let e5 = "";
                  for (let t5 = c2; t5 <= h2; t5++) e5 += `<option value="${t5}">${t5}</option>`;
                  return e5;
                }, p = this.templatesByType.years(u2(), this.concatOptions.selectedTheme), m = null === (l2 = this.updatedStyles) || void 0 === l2 ? void 0 : l2.customSelect;
                return m ? this.updateTemplate(p, (null == m ? void 0 : m.shared) || {}, (null == m ? void 0 : m.years) || {}) : p;
              }
              return "<#Year />";
            }
            generateCustomArrowPrevMarkup() {
              var e3, t3;
              return (null === (t3 = null === (e3 = null == this ? void 0 : this.dataOptions) || void 0 === e3 ? void 0 : e3.templates) || void 0 === t3 ? void 0 : t3.arrowPrev) ? this.createArrowFromTemplate(this.dataOptions.templates.arrowPrev, this.updatedStyles.arrowPrev) : "<#ArrowPrev [month] />";
            }
            generateCustomArrowNextMarkup() {
              var e3, t3;
              return (null === (t3 = null === (e3 = null == this ? void 0 : this.dataOptions) || void 0 === e3 ? void 0 : e3.templates) || void 0 === t3 ? void 0 : t3.arrowNext) ? this.createArrowFromTemplate(this.dataOptions.templates.arrowNext, this.updatedStyles.arrowNext) : "<#ArrowNext [month] />";
            }
            parseCustomTime(e3) {
              return e3 = e3.replace(/<#CustomTime\s*\/>/g, this.generateCustomTimeMarkup());
            }
            parseCustomMonth(e3) {
              return e3 = e3.replace(/<#CustomMonth\s*\/>/g, this.generateCustomMonthMarkup());
            }
            parseCustomYear(e3) {
              return e3 = e3.replace(/<#CustomYear\s*\/>/g, this.generateCustomYearMarkup());
            }
            parseArrowPrev(e3) {
              return e3 = e3.replace(/<#CustomArrowPrev\s*\/>/g, this.generateCustomArrowPrevMarkup());
            }
            parseArrowNext(e3) {
              return e3 = e3.replace(/<#CustomArrowNext\s*\/>/g, this.generateCustomArrowNextMarkup());
            }
            processCustomTemplate(e3, t3) {
              var i3, n2, s2, o2;
              const l2 = "default" === t3 ? null === (n2 = null === (i3 = null == this ? void 0 : this.dataOptions) || void 0 === i3 ? void 0 : i3.layouts) || void 0 === n2 ? void 0 : n2.default : null === (o2 = null === (s2 = null == this ? void 0 : this.dataOptions) || void 0 === s2 ? void 0 : s2.layouts) || void 0 === o2 ? void 0 : o2.multiple, a2 = this.parseCustomMonth(null != l2 ? l2 : e3), r2 = this.parseCustomYear(a2), d2 = this.parseCustomTime(r2), c2 = this.parseArrowPrev(d2);
              return this.parseArrowNext(c2);
            }
            disableOptions() {
              const { mainElement: e3, dateMax: t3, displayMonthsCount: i3 } = this.vanillaCalendar.context, n2 = new Date(t3);
              Array.from(e3.querySelectorAll(".--single-month")).forEach(((e4, t4) => {
                var s2;
                const o2 = +(null === (s2 = e4.querySelector('[data-vc="year"]')) || void 0 === s2 ? void 0 : s2.getAttribute("data-vc-year")), l2 = e4.querySelectorAll("[data-hs-select].--month option"), a2 = e4.querySelectorAll("[data-hs-select-dropdown] [data-value]"), r2 = (e5) => +e5.getAttribute("data-value") > n2.getMonth() - i3 + t4 + 1 && o2 === n2.getFullYear();
                Array.from(l2).forEach(((e5) => e5.toggleAttribute("disabled", r2(e5)))), Array.from(a2).forEach(((e5) => e5.classList.toggle("disabled", r2(e5))));
              }));
            }
            disableNav() {
              const { mainElement: e3, dateMax: t3, selectedYear: i3, selectedMonth: n2, displayMonthsCount: s2 } = this.vanillaCalendar.context, o2 = new Date(t3).getFullYear(), l2 = e3.querySelector('[data-vc-arrow="next"]');
              l2.style.visibility = i3 === o2 && n2 + s2 > 11 ? "hidden" : "";
            }
            destroySelects(e3) {
              Array.from(e3.querySelectorAll("[data-hs-select]")).forEach(((e4) => {
                const t3 = c.default.getInstance(e4, true);
                t3 && t3.element.destroy();
              }));
            }
            updateSelect(e3, t3) {
              const i3 = c.default.getInstance(e3, true);
              i3 && i3.element.setValue(t3);
            }
            updateCalendar(e3) {
              const t3 = e3.querySelectorAll(".--single-month");
              t3.length && t3.forEach(((e4) => {
                const { month: t4, year: i3 } = this.getCurrentMonthAndYear(e4);
                this.updateSelect(e4.querySelector("[data-hs-select].--month"), `${t4}`), this.updateSelect(e4.querySelector("[data-hs-select].--year"), `${i3}`);
              }));
            }
            updateCustomSelects(e3) {
              setTimeout((() => {
                this.disableOptions(), this.disableNav(), this.initCustomMonths(e3), this.initCustomYears(e3);
              }));
            }
            getCurrentState() {
              return { selectedDates: this.vanillaCalendar.selectedDates, selectedTime: this.vanillaCalendar.selectedTime };
            }
            formatDate(e3, t3) {
              var i3, n2, s2, o2, l2, a2, r2;
              const d2 = t3 || (null === (i3 = this.dataOptions) || void 0 === i3 ? void 0 : i3.dateFormat), c2 = (null === (n2 = this.dataOptions) || void 0 === n2 ? void 0 : n2.dateLocale) || void 0;
              if (!d2) {
                const t4 = null !== (l2 = null === (o2 = null === (s2 = this.dataOptions) || void 0 === s2 ? void 0 : s2.inputModeOptions) || void 0 === o2 ? void 0 : o2.dateSeparator) && void 0 !== l2 ? l2 : ".";
                return this.changeDateSeparator(e3, t4);
              }
              const h2 = new Date(e3);
              if (isNaN(h2.getTime())) return this.changeDateSeparator(e3);
              let u2 = "", p = 0;
              for (; p < d2.length; ) if ("YYYY" === d2.slice(p, p + 4)) u2 += h2.getFullYear().toString(), p += 4;
              else if ("dddd" === d2.slice(p, p + 4)) {
                const e4 = h2.toLocaleDateString(c2, { weekday: "long" });
                if (null === (a2 = this.dataOptions) || void 0 === a2 ? void 0 : a2.replaceTodayWithText) {
                  const t4 = /* @__PURE__ */ new Date();
                  u2 += h2.toDateString() === t4.toDateString() ? this.getLocalizedTodayText(c2) : e4;
                } else u2 += e4;
                p += 4;
              } else if ("MMMM" === d2.slice(p, p + 4)) u2 += h2.toLocaleDateString(c2, { month: "long" }), p += 4;
              else if ("ddd" === d2.slice(p, p + 3)) {
                const e4 = h2.toLocaleDateString(c2, { weekday: "short" });
                if (null === (r2 = this.dataOptions) || void 0 === r2 ? void 0 : r2.replaceTodayWithText) {
                  const t4 = /* @__PURE__ */ new Date();
                  u2 += h2.toDateString() === t4.toDateString() ? this.getLocalizedTodayText(c2) : e4;
                } else u2 += e4;
                p += 3;
              } else "MMM" === d2.slice(p, p + 3) ? (u2 += h2.toLocaleDateString(c2, { month: "short" }), p += 3) : "YY" === d2.slice(p, p + 2) ? (u2 += h2.getFullYear().toString().slice(-2), p += 2) : "MM" === d2.slice(p, p + 2) ? (u2 += String(h2.getMonth() + 1).padStart(2, "0"), p += 2) : "DD" === d2.slice(p, p + 2) ? (u2 += String(h2.getDate()).padStart(2, "0"), p += 2) : "HH" === d2.slice(p, p + 2) ? (u2 += String(h2.getHours()).padStart(2, "0"), p += 2) : "mm" === d2.slice(p, p + 2) ? (u2 += String(h2.getMinutes()).padStart(2, "0"), p += 2) : "ss" === d2.slice(p, p + 2) ? (u2 += String(h2.getSeconds()).padStart(2, "0"), p += 2) : "Y" === d2[p] ? (u2 += h2.getFullYear().toString(), p += 1) : "M" === d2[p] ? (u2 += String(h2.getMonth() + 1), p += 1) : "D" === d2[p] ? (u2 += String(h2.getDate()), p += 1) : "H" === d2[p] ? (u2 += String(h2.getHours()), p += 1) : "m" === d2[p] ? (u2 += String(h2.getMinutes()), p += 1) : "s" === d2[p] ? (u2 += String(h2.getSeconds()), p += 1) : (u2 += d2[p], p += 1);
              return u2;
            }
            destroy() {
              const e3 = this.el, t3 = e3.id, i3 = e3.parentElement, n2 = e3.nextElementSibling, s2 = {};
              Array.from(e3.attributes).forEach(((e4) => {
                s2[e4.name] = e4.value;
              }));
              const o2 = e3.className, l2 = e3.value;
              this.vanillaCalendar && (this.vanillaCalendar.destroy(), this.vanillaCalendar = null), window.$hsDatepickerCollection = window.$hsDatepickerCollection.filter((({ element: e4 }) => e4.el !== this.el));
              const a2 = document.body.contains(e3), r2 = t3 ? document.getElementById(t3) : null;
              if (!a2 && !r2 && i3) {
                const e4 = document.createElement("input");
                Object.keys(s2).forEach(((t4) => {
                  e4.setAttribute(t4, s2[t4]);
                })), e4.className = o2, e4.value = l2, n2 && n2.parentElement === i3 ? i3.insertBefore(e4, n2) : i3.appendChild(e4), this.el = e4;
              }
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsDatepickerCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsDatepickerCollection || (window.$hsDatepickerCollection = []), document.querySelectorAll(".hs-datepicker:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsDatepickerCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new u(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            u.autoInit();
          })), "undefined" != typeof window && (window.HSDatepicker = u), t2.default = u;
        }, 144: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = n(i2(961));
          class o extends s.default {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-copy-markup"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.defaultHeight = (null == s2 ? void 0 : s2.defaultHeight) || 0, this.init();
            }
            elementInput() {
              this.textareaSetHeight(3);
            }
            init() {
              this.createCollection(window.$hsTextareaAutoHeightCollection, this), this.setAutoHeight();
            }
            setAutoHeight() {
              this.isParentHidden() ? this.callbackAccordingToType() : this.textareaSetHeight(3), this.onElementInputListener = () => this.elementInput(), this.el.addEventListener("input", this.onElementInputListener);
            }
            textareaSetHeight(e3 = 0) {
              this.el.style.height = "auto", this.el.style.height = this.checkIfOneLine() && this.defaultHeight ? `${this.defaultHeight}px` : `${this.el.scrollHeight + e3}px`;
            }
            checkIfOneLine() {
              const e3 = this.el.clientHeight;
              return !(this.el.scrollHeight > e3);
            }
            isParentHidden() {
              return this.el.closest(".hs-overlay.hidden") || this.el.closest('[role="tabpanel"].hidden') || this.el.closest(".hs-collapse.hidden");
            }
            parentType() {
              return this.el.closest(".hs-collapse") ? "collapse" : this.el.closest(".hs-overlay") ? "overlay" : !!this.el.closest('[role="tabpanel"]') && "tabs";
            }
            callbackAccordingToType() {
              var e3;
              if ("collapse" === this.parentType()) {
                const e4 = this.el.closest(".hs-collapse").id, { element: t3 } = window.HSCollapse.getInstance(`[data-hs-collapse="#${e4}"]`, true);
                t3.on("beforeOpen", (() => {
                  if (!this.el) return false;
                  this.textareaSetHeight(3);
                }));
              } else if ("overlay" === this.parentType()) {
                const e4 = window.HSOverlay.getInstance(this.el.closest(".hs-overlay"), true);
                e4.element.on("open", (() => {
                  window.$hsTextareaAutoHeightCollection.filter((({ element: t3 }) => t3.el.closest(".hs-overlay") === e4.element.el)).forEach((({ element: e5 }) => e5.textareaSetHeight(3)));
                }));
              } else {
                if ("tabs" !== this.parentType()) return false;
                {
                  const t3 = null === (e3 = this.el.closest('[role="tabpanel"]')) || void 0 === e3 ? void 0 : e3.id, i3 = document.querySelector(`[data-hs-tab="#${t3}"]`).closest('[role="tablist"]'), { element: n2 } = window.HSTabs.getInstance(i3, true) || null;
                  n2.on("change", ((e4) => {
                    const t4 = document.querySelectorAll(`${e4.current} [data-hs-textarea-auto-height]`);
                    if (!t4.length) return false;
                    t4.forEach(((e5) => {
                      const t5 = window.HSTextareaAutoHeight.getInstance(e5, true) || null;
                      t5 && t5.element.textareaSetHeight(3);
                    }));
                  }));
                }
              }
            }
            destroy() {
              this.el.removeEventListener("input", this.onElementInputListener), window.$hsTextareaAutoHeightCollection = window.$hsTextareaAutoHeightCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsTextareaAutoHeightCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsTextareaAutoHeightCollection || (window.$hsTextareaAutoHeightCollection = []), window.$hsTextareaAutoHeightCollection && (window.$hsTextareaAutoHeightCollection = window.$hsTextareaAutoHeightCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-textarea-auto-height]:not(.--prevent-on-load-init)").forEach(((e3) => {
                if (!window.$hsTextareaAutoHeightCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                }))) {
                  const t3 = e3.getAttribute("data-hs-textarea-auto-height"), i3 = t3 ? JSON.parse(t3) : {};
                  new o(e3, i3);
                }
              }));
            }
          }
          window.addEventListener("load", (() => {
            o.autoInit();
          })), "undefined" != typeof window && (window.HSTextareaAutoHeight = o), t2.default = o;
        }, 158: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.HSDatepicker = t2.HSRangeSlider = t2.HSFileUpload = t2.HSDataTable = t2.HSStaticMethods = t2.HSTreeView = t2.HSTooltip = t2.HSTogglePassword = t2.HSToggleCount = t2.HSThemeSwitch = t2.HSTextareaAutoHeight = t2.HSTabs = t2.HSStrongPassword = t2.HSStepper = t2.HSSelect = t2.HSScrollspy = t2.HSScrollNav = t2.HSRemoveElement = t2.HSPinInput = t2.HSOverlay = t2.HSLayoutSplitter = t2.HSInputNumber = t2.HSDropdown = t2.HSComboBox = t2.HSCollapse = t2.HSCarousel = t2.HSAccordion = t2.HSCopyMarkup = void 0;
          const s = n(i2(248));
          let o, l, a;
          "undefined" != typeof window && (window.HSAccessibilityObserver = new s.default());
          let r = null;
          t2.HSDatepicker = r;
          var d = i2(406);
          Object.defineProperty(t2, "HSCopyMarkup", { enumerable: true, get: function() {
            return n(d).default;
          } });
          var c = i2(740);
          Object.defineProperty(t2, "HSAccordion", { enumerable: true, get: function() {
            return n(c).default;
          } });
          var h = i2(268);
          Object.defineProperty(t2, "HSCarousel", { enumerable: true, get: function() {
            return n(h).default;
          } });
          var u = i2(485);
          Object.defineProperty(t2, "HSCollapse", { enumerable: true, get: function() {
            return n(u).default;
          } });
          var p = i2(809);
          Object.defineProperty(t2, "HSComboBox", { enumerable: true, get: function() {
            return n(p).default;
          } });
          var m = i2(891);
          Object.defineProperty(t2, "HSDropdown", { enumerable: true, get: function() {
            return n(m).default;
          } });
          var g = i2(332);
          Object.defineProperty(t2, "HSInputNumber", { enumerable: true, get: function() {
            return n(g).default;
          } });
          var v = i2(812);
          Object.defineProperty(t2, "HSLayoutSplitter", { enumerable: true, get: function() {
            return n(v).default;
          } });
          var f = i2(850);
          Object.defineProperty(t2, "HSOverlay", { enumerable: true, get: function() {
            return n(f).default;
          } });
          var y = i2(60);
          Object.defineProperty(t2, "HSPinInput", { enumerable: true, get: function() {
            return n(y).default;
          } });
          var b = i2(911);
          Object.defineProperty(t2, "HSRemoveElement", { enumerable: true, get: function() {
            return n(b).default;
          } });
          var w = i2(639);
          Object.defineProperty(t2, "HSScrollNav", { enumerable: true, get: function() {
            return n(w).default;
          } });
          var C = i2(751);
          Object.defineProperty(t2, "HSScrollspy", { enumerable: true, get: function() {
            return n(C).default;
          } });
          var S = i2(442);
          Object.defineProperty(t2, "HSSelect", { enumerable: true, get: function() {
            return n(S).default;
          } });
          var x = i2(887);
          Object.defineProperty(t2, "HSStepper", { enumerable: true, get: function() {
            return n(x).default;
          } });
          var L = i2(97);
          Object.defineProperty(t2, "HSStrongPassword", { enumerable: true, get: function() {
            return n(L).default;
          } });
          var T = i2(166);
          Object.defineProperty(t2, "HSTabs", { enumerable: true, get: function() {
            return n(T).default;
          } });
          var E = i2(144);
          Object.defineProperty(t2, "HSTextareaAutoHeight", { enumerable: true, get: function() {
            return n(E).default;
          } });
          var k = i2(502);
          Object.defineProperty(t2, "HSThemeSwitch", { enumerable: true, get: function() {
            return n(k).default;
          } });
          var I = i2(684);
          Object.defineProperty(t2, "HSToggleCount", { enumerable: true, get: function() {
            return n(I).default;
          } });
          var A = i2(100);
          Object.defineProperty(t2, "HSTogglePassword", { enumerable: true, get: function() {
            return n(A).default;
          } });
          var M = i2(969);
          Object.defineProperty(t2, "HSTooltip", { enumerable: true, get: function() {
            return n(M).default;
          } });
          var O = i2(772);
          Object.defineProperty(t2, "HSTreeView", { enumerable: true, get: function() {
            return n(O).default;
          } });
          var D = i2(957);
          if (Object.defineProperty(t2, "HSStaticMethods", { enumerable: true, get: function() {
            return n(D).default;
          } }), "undefined" != typeof window) {
            try {
              "undefined" != typeof DataTable && "undefined" != typeof jQuery && (t2.HSDataTable = o = i2(814).default);
            } catch (e3) {
              console.warn("HSDataTable: Required dependencies not found"), t2.HSDataTable = o = null;
            }
            try {
              "undefined" != typeof _ && "undefined" != typeof Dropzone && (t2.HSFileUpload = l = i2(234).default);
            } catch (e3) {
              console.warn("HSFileUpload: Required dependencies not found"), t2.HSFileUpload = l = null;
            }
            try {
              "undefined" != typeof noUiSlider && (t2.HSRangeSlider = a = i2(347).default);
            } catch (e3) {
              console.warn("HSRangeSlider: Required dependencies not found"), t2.HSRangeSlider = a = null;
            }
            try {
              "undefined" != typeof VanillaCalendarPro && (t2.HSDatepicker = r = i2(128).default);
            } catch (e3) {
              console.warn("HSDatepicker: Required dependencies not found"), t2.HSDatepicker = r = null;
            }
          }
        }, 166: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961)), l = n(i2(248)), a = i2(223);
          class r extends o.default {
            constructor(e3, t3, i3) {
              var n2, s2;
              super(e3, t3, i3);
              const o2 = e3.getAttribute("data-hs-tabs"), l2 = o2 ? JSON.parse(o2) : {}, r2 = Object.assign(Object.assign({}, l2), t3);
              this.eventType = null !== (n2 = r2.eventType) && void 0 !== n2 ? n2 : "click", this.preventNavigationResolution = "number" == typeof r2.preventNavigationResolution ? r2.preventNavigationResolution : a.BREAKPOINTS[r2.preventNavigationResolution] || null, this.toggles = this.el.querySelectorAll("[data-hs-tab]"), this.extraToggleId = this.el.getAttribute("data-hs-tab-select"), this.extraToggle = this.extraToggleId ? document.querySelector(this.extraToggleId) : null, this.current = Array.from(this.toggles).find(((e4) => e4.classList.contains("active"))), this.currentContentId = (null === (s2 = this.current) || void 0 === s2 ? void 0 : s2.getAttribute("data-hs-tab")) || null, this.currentContent = this.currentContentId ? document.querySelector(this.currentContentId) : null, this.prev = null, this.prevContentId = null, this.prevContent = null, this.onToggleHandler = [], this.init();
            }
            toggle(e3) {
              this.open(e3);
            }
            extraToggleChange(e3) {
              this.change(e3);
            }
            init() {
              this.createCollection(window.$hsTabsCollection, this), this.toggles.forEach(((e3) => {
                const t3 = (t4) => {
                  "click" === this.eventType && this.preventNavigationResolution && document.body.clientWidth <= +this.preventNavigationResolution && t4.preventDefault(), this.toggle(e3);
                }, i3 = (e4) => {
                  this.preventNavigationResolution && document.body.clientWidth <= +this.preventNavigationResolution && e4.preventDefault();
                };
                this.onToggleHandler.push({ el: e3, fn: t3, preventClickFn: i3 }), "click" === this.eventType ? e3.addEventListener("click", t3) : (e3.addEventListener("mouseenter", t3), e3.addEventListener("click", i3));
              })), this.extraToggle && (this.onExtraToggleChangeListener = (e3) => this.extraToggleChange(e3), this.extraToggle.addEventListener("change", this.onExtraToggleChangeListener)), "undefined" != typeof window && (window.HSAccessibilityObserver || (window.HSAccessibilityObserver = new l.default()), this.setupAccessibility());
            }
            open(e3) {
              var t3, i3, n2, o2, l2;
              this.prev = this.current, this.prevContentId = this.currentContentId, this.prevContent = this.currentContent, this.current = e3, this.currentContentId = e3.getAttribute("data-hs-tab"), this.currentContent = this.currentContentId ? document.querySelector(this.currentContentId) : null, (null === (t3 = null == this ? void 0 : this.prev) || void 0 === t3 ? void 0 : t3.ariaSelected) && (this.prev.ariaSelected = "false"), null === (i3 = this.prev) || void 0 === i3 || i3.classList.remove("active"), null === (n2 = this.prevContent) || void 0 === n2 || n2.classList.add("hidden"), (null === (o2 = null == this ? void 0 : this.current) || void 0 === o2 ? void 0 : o2.ariaSelected) && (this.current.ariaSelected = "true"), this.current.classList.add("active"), null === (l2 = this.currentContent) || void 0 === l2 || l2.classList.remove("hidden"), this.fireEvent("change", { el: e3, prev: this.prevContentId, current: this.currentContentId, tabsId: this.el.id }), (0, s.dispatch)("change.hs.tab", e3, { el: e3, prev: this.prevContentId, current: this.currentContentId, tabsId: this.el.id });
            }
            change(e3) {
              const t3 = document.querySelector(`[data-hs-tab="${e3.target.value}"]`);
              t3 && ("hover" === this.eventType ? t3.dispatchEvent(new Event("mouseenter")) : t3.click());
            }
            setupAccessibility() {
              this.accessibilityComponent = window.HSAccessibilityObserver.registerComponent(this.el, { onArrow: (e3) => {
                if (e3.metaKey) return;
                const t3 = "true" === this.el.getAttribute("data-hs-tabs-vertical") || "vertical" === this.el.getAttribute("aria-orientation");
                switch (e3.key) {
                  case (t3 ? "ArrowUp" : "ArrowLeft"):
                    this.onArrow(true);
                    break;
                  case (t3 ? "ArrowDown" : "ArrowRight"):
                    this.onArrow(false);
                    break;
                  case "Home":
                    this.onStartEnd(true);
                    break;
                  case "End":
                    this.onStartEnd(false);
                }
              } }, true, "Tabs", '[role="tablist"]');
            }
            onArrow(e3 = true) {
              const t3 = e3 ? Array.from(this.toggles).reverse() : Array.from(this.toggles), i3 = t3.find(((e4) => document.activeElement === e4));
              let n2 = t3.findIndex(((e4) => e4 === i3));
              n2 = n2 + 1 < t3.length ? n2 + 1 : 0, t3[n2].focus(), t3[n2].click();
            }
            onStartEnd(e3 = true) {
              const t3 = e3 ? Array.from(this.toggles) : Array.from(this.toggles).reverse();
              t3.length && (t3[0].focus(), t3[0].click());
            }
            destroy() {
              this.toggles.forEach(((e3) => {
                var t3;
                const i3 = null === (t3 = this.onToggleHandler) || void 0 === t3 ? void 0 : t3.find((({ el: t4 }) => t4 === e3));
                i3 && ("click" === this.eventType ? e3.removeEventListener("click", i3.fn) : (e3.removeEventListener("mouseenter", i3.fn), e3.removeEventListener("click", i3.preventClickFn)));
              })), this.onToggleHandler = [], this.extraToggle && this.extraToggle.removeEventListener("change", this.onExtraToggleChangeListener), "undefined" != typeof window && window.HSAccessibilityObserver && window.HSAccessibilityObserver.unregisterComponent(this.accessibilityComponent), window.$hsTabsCollection = window.$hsTabsCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsTabsCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsTabsCollection || (window.$hsTabsCollection = []), window.$hsTabsCollection && (window.$hsTabsCollection = window.$hsTabsCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll('[role="tablist"]:not(select):not(.--prevent-on-load-init)').forEach(((e3) => {
                window.$hsTabsCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new r(e3);
              }));
            }
            static open(e3) {
              const t3 = window.$hsTabsCollection.find(((t4) => Array.from(t4.element.toggles).includes("string" == typeof e3 ? document.querySelector(e3) : e3))), i3 = t3 ? Array.from(t3.element.toggles).find(((t4) => t4 === ("string" == typeof e3 ? document.querySelector(e3) : e3))) : null;
              i3 && !i3.classList.contains("active") && t3.element.open(i3);
            }
            static on(e3, t3, i3) {
              const n2 = window.$hsTabsCollection.find(((e4) => Array.from(e4.element.toggles).includes("string" == typeof t3 ? document.querySelector(t3) : t3)));
              n2 && (n2.element.events[e3] = i3);
            }
          }
          window.addEventListener("load", (() => {
            r.autoInit();
          })), "undefined" != typeof window && (window.HSTabs = r), t2.default = r;
        }, 191: (e2, t2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.templates = void 0, t2.templates = { default: (e3 = false) => `<div class="--single-month flex flex-col overflow-hidden">
    <div class="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3" data-vc="header">
      <div class="col-span-1">
        <#CustomArrowPrev />
      </div>
      <div class="col-span-3 flex justify-center items-center gap-x-1">
        <#CustomMonth />
        <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
        <#CustomYear />
      </div>
      <div class="col-span-1 flex justify-end">
        <#CustomArrowNext />
      </div>
    </div>
    <div data-vc="wrapper">
      <div data-vc="content">
        <#Week />
        <#Dates />
      </div>
    </div>
  </div>`, multiple: (e3 = false) => `<div class="relative flex flex-col overflow-hidden">
    <div class="absolute top-2 start-2">
      <#CustomArrowPrev />
    </div>
    <div class="absolute top-2 end-2">
      <#CustomArrowNext />
    </div>
    <div class="sm:flex" data-vc="grid">
      <#Multiple>
        <div class="p-3 space-y-0.5 --single-month" data-vc="column">
          <div class="pb-3" data-vc="header">
            <div class="flex justify-center items-center gap-x-1" data-vc-header="content">
              <#CustomMonth />
              <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
              <#CustomYear />
            </div>
          </div>
          <div data-vc="wrapper">
            <div data-vc="content">
              <#Week />
              <#Dates />
            </div>
          </div>
        </div>
      <#/Multiple>
    </div>
  </div>`, year: (e3 = false) => `<div class="relative bg-white ${"light" !== e3 ? "dark:bg-neutral-900" : ""}" data-vc="header" role="toolbar">
    <div class="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3" data-vc="header">
      <div class="col-span-1">
        <#CustomArrowPrev />
      </div>
      <div class="col-span-3 flex justify-center items-center gap-x-1">
        <#Month />
        <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
        <#Year />
      </div>
      <div class="col-span-1 flex justify-end">
        <#CustomArrowNext />
      </div>
    </div>
  </div>
  <div data-vc="wrapper">
    <div data-vc="content">
      <#Years />
    </div>
  </div>`, month: (e3 = false) => `<div class="pb-3" data-vc="header" role="toolbar">
    <div class="flex justify-center items-center gap-x-1" data-vc-header="content">
      <#Month />
      <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
      <#Year />
    </div>
  </div>
  <div data-vc="wrapper">
    <div data-vc="content">
      <#Months />
    </div>
  </div>`, years: (e3, t3 = false) => `<div class="relative">
      <span class="hidden" data-vc="year"></span>
      <select data-hs-select='{
          "placeholder": "Select year",
          "dropdownScope": "parent",
          "dropdownVerticalFixedPlacement": "bottom",
          "toggleTag": "<button type=\\"button\\"><span data-title></span></button>",
          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-hidden focus:text-gray-600 before:absolute before:inset-0 before:z-1 ${"light" !== t3 ? "dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300" : ""}",
          "dropdownClasses": "mt-2 z-50 w-20 max-h-60 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== t3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
          "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== t3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
          "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span><span class=\\"hidden hs-selected:block\\"><svg class=\\"shrink-0 size-3.5 text-gray-800 ${"light" !== t3 ? "dark:text-neutral-200" : ""}\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polyline points=\\"20 6 9 17 4 12\\"/></svg></span></div>"
        }' class="hidden --year --prevent-on-load-init">
        ${e3}
      </select>
    </div>`, months: (e3 = false) => `<div class="relative">
    <span class="hidden" data-vc="month"></span>
    <select data-hs-select='{
        "placeholder": "Select month",
        "dropdownScope": "parent",
        "dropdownVerticalFixedPlacement": "bottom",
        "toggleTag": "<button type=\\"button\\"><span data-title></span></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-hidden focus:text-gray-600 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300" : ""}",
        "dropdownClasses": "mt-2 z-50 w-32 max-h-60 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
        "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg hs-select-disabled:opacity-50 hs-select-disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
        "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span><span class=\\"hidden hs-selected:block\\"><svg class=\\"shrink-0 size-3.5 text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polyline points=\\"20 6 9 17 4 12\\"/></svg></span></div>"
      }' class="hidden --month --prevent-on-load-init">
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>
  </div>`, hours: (e3 = false) => `<div class="relative">
    <select class="--hours hidden" data-hs-select='{
      "placeholder": "Select option...",
      "dropdownVerticalFixedPlacement": "top",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 px-2 pe-6 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" : ""}",
      "dropdownClasses": "mt-2 z-50 w-full min-w-24 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
      "optionClasses": "hs-selected:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-neutral-800" : ""} py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-gray-700" : ""} ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
      "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span></div>"
    }'>
      <option value="01">01</option>
      <option value="02">02</option>
      <option value="03">03</option>
      <option value="04">04</option>
      <option value="05">05</option>
      <option value="06">06</option>
      <option value="07">07</option>
      <option value="08">08</option>
      <option value="09">09</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12" selected>12</option>
    </select>
    <div class="absolute top-1/2 end-2 -translate-y-1/2">
      <svg class="shrink-0 size-3 text-gray-500 ${"light" !== e3 ? "dark:text-neutral-500" : ""}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </div>
  </div>`, minutes: (e3 = false) => `<div class="relative">
    <select class="--minutes hidden" data-hs-select='{
      "placeholder": "Select option...",
      "dropdownVerticalFixedPlacement": "top",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 px-2 pe-6 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" : ""}",
      "dropdownClasses": "mt-2 z-50 w-full min-w-24 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
      "optionClasses": "hs-selected:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-neutral-800" : ""} py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-gray-700" : ""} ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
      "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span></div>"
    }'>
      <option value="00" selected>00</option>
      <option value="01">01</option>
      <option value="02">02</option>
      <option value="03">03</option>
      <option value="04">04</option>
      <option value="05">05</option>
      <option value="06">06</option>
      <option value="07">07</option>
      <option value="08">08</option>
      <option value="09">09</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
      <option value="39">39</option>
      <option value="40">40</option>
      <option value="41">41</option>
      <option value="42">42</option>
      <option value="43">43</option>
      <option value="44">44</option>
      <option value="45">45</option>
      <option value="46">46</option>
      <option value="47">47</option>
      <option value="48">48</option>
      <option value="49">49</option>
      <option value="50">50</option>
      <option value="51">51</option>
      <option value="52">52</option>
      <option value="53">53</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="56">56</option>
      <option value="57">57</option>
      <option value="58">58</option>
      <option value="59">59</option>
    </select>
    <div class="absolute top-1/2 end-2 -translate-y-1/2">
      <svg class="shrink-0 size-3 text-gray-500 ${"light" !== e3 ? "dark:text-neutral-500" : ""}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </div>
  </div>`, meridiem: (e3 = false) => `<div class="relative">
    <select class="--meridiem hidden" data-hs-select='{
      "placeholder": "Select option...",
      "dropdownVerticalFixedPlacement": "top",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 px-2 pe-6 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" : ""}",
      "dropdownClasses": "mt-2 z-50 w-full min-w-24 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
      "optionClasses": "hs-selected:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-neutral-800" : ""} py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-gray-700" : ""} ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
      "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span></div>"
    }'>
      <option value="PM" selected>PM</option>
      <option value="AM">AM</option>
    </select>
    <div class="absolute top-1/2 end-2 -translate-y-1/2">
      <svg class="shrink-0 size-3 text-gray-500 ${"light" !== e3 ? "dark:text-neutral-500" : ""}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </div>
  </div>` };
        }, 223: (e2, t2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.BREAKPOINTS = t2.COMBO_BOX_ACCESSIBILITY_KEY_SET = t2.SELECT_ACCESSIBILITY_KEY_SET = t2.TABS_ACCESSIBILITY_KEY_SET = t2.OVERLAY_ACCESSIBILITY_KEY_SET = t2.DROPDOWN_ACCESSIBILITY_KEY_SET = t2.POSITIONS = void 0, t2.POSITIONS = { auto: "auto", "auto-start": "auto-start", "auto-end": "auto-end", top: "top", "top-left": "top-start", "top-right": "top-end", bottom: "bottom", "bottom-left": "bottom-start", "bottom-right": "bottom-end", right: "right", "right-start": "right-start", "right-end": "right-end", left: "left", "left-start": "left-start", "left-end": "left-end" }, t2.DROPDOWN_ACCESSIBILITY_KEY_SET = ["Escape", "ArrowUp", "ArrowDown", "ArrowRight", "ArrowLeft", "Home", "End", "Enter"], t2.OVERLAY_ACCESSIBILITY_KEY_SET = ["Escape", "Tab"], t2.TABS_ACCESSIBILITY_KEY_SET = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End"], t2.SELECT_ACCESSIBILITY_KEY_SET = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End", "Escape", "Enter", "Space", "Tab"], t2.COMBO_BOX_ACCESSIBILITY_KEY_SET = ["ArrowUp", "ArrowLeft", "ArrowDown", "ArrowRight", "Home", "End", "Escape", "Enter"], t2.BREAKPOINTS = { xs: 0, sm: 640, md: 768, lg: 1024, xl: 1280, "2xl": 1536 };
        }, 234: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          "undefined" != typeof Dropzone && (Dropzone.autoDiscover = false);
          class l extends o.default {
            constructor(e3, t3, i3) {
              var n2;
              super(e3, t3, i3), this.extensions = {}, this.el = "string" == typeof e3 ? document.querySelector(e3) : e3;
              const s2 = this.el.getAttribute("data-hs-file-upload"), o2 = s2 ? JSON.parse(s2) : {};
              this.previewTemplate = (null === (n2 = this.el.querySelector("[data-hs-file-upload-preview]")) || void 0 === n2 ? void 0 : n2.innerHTML) || '<div class="p-3 bg-white border border-solid border-gray-300 rounded-xl dark:bg-neutral-800 dark:border-neutral-600">\n			<div class="mb-2 flex justify-between items-center">\n				<div class="flex items-center gap-x-3">\n					<span class="size-8 flex justify-center items-center border border-gray-200 text-gray-500 rounded-lg dark:border-neutral-700 dark:text-neutral-500" data-hs-file-upload-file-icon></span>\n					<div>\n						<p class="text-sm font-medium text-gray-800 dark:text-white">\n							<span class="truncate inline-block max-w-75 align-bottom" data-hs-file-upload-file-name></span>.<span data-hs-file-upload-file-ext></span>\n						</p>\n						<p class="text-xs text-gray-500 dark:text-neutral-500" data-hs-file-upload-file-size></p>\n					</div>\n				</div>\n				<div class="inline-flex items-center gap-x-2">\n					<button type="button" class="text-gray-500 hover:text-gray-800 dark:text-neutral-500 dark:hover:text-neutral-200" data-hs-file-upload-remove>\n						<svg class="shrink-0 size-4" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M3 6h18"></path><path d="M19 6v14c0 1-1 2-2 2H7c-1 0-2-1-2-2V6"></path><path d="M8 6V4c0-1 1-2 2-2h4c1 0 2 1 2 2v2"></path><line x1="10" x2="10" y1="11" y2="17"></line><line x1="14" x2="14" y1="11" y2="17"></line></svg>\n					</button>\n				</div>\n			</div>\n			<div class="flex items-center gap-x-3 whitespace-nowrap">\n				<div class="flex w-full h-2 bg-gray-200 rounded-full overflow-hidden dark:bg-neutral-700" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" data-hs-file-upload-progress-bar>\n					<div class="flex flex-col justify-center rounded-full overflow-hidden bg-blue-600 text-xs text-white text-center whitespace-nowrap transition-all duration-500 hs-file-upload-complete:bg-green-600 dark:bg-blue-500" style="width: 0" data-hs-file-upload-progress-bar-pane></div>\n				</div>\n				<div class="w-10 text-end">\n					<span class="text-sm text-gray-800 dark:text-white">\n						<span data-hs-file-upload-progress-bar-value>0</span>%\n					</span>\n				</div>\n			</div>\n		</div>', this.extensions = _.merge({ default: { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/></svg>', class: "size-5" }, xls: { icon: '<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M15.0243 1.43996H7.08805C6.82501 1.43996 6.57277 1.54445 6.38677 1.73043C6.20077 1.91642 6.09631 2.16868 6.09631 2.43171V6.64796L15.0243 11.856L19.4883 13.7398L23.9523 11.856V6.64796L15.0243 1.43996Z" fill="#21A366"></path><path d="M6.09631 6.64796H15.0243V11.856H6.09631V6.64796Z" fill="#107C41"></path><path d="M22.9605 1.43996H15.0243V6.64796H23.9523V2.43171C23.9523 2.16868 23.8478 1.91642 23.6618 1.73043C23.4758 1.54445 23.2235 1.43996 22.9605 1.43996Z" fill="#33C481"></path><path d="M15.0243 11.856H6.09631V21.2802C6.09631 21.5433 6.20077 21.7955 6.38677 21.9815C6.57277 22.1675 6.82501 22.272 7.08805 22.272H22.9606C23.2236 22.272 23.4759 22.1675 23.6618 21.9815C23.8478 21.7955 23.9523 21.5433 23.9523 21.2802V17.064L15.0243 11.856Z" fill="#185C37"></path><path d="M15.0243 11.856H23.9523V17.064H15.0243V11.856Z" fill="#107C41"></path><path opacity="0.1" d="M12.5446 5.15996H6.09631V19.296H12.5446C12.8073 19.2952 13.0591 19.1904 13.245 19.0046C13.4308 18.8188 13.5355 18.567 13.5363 18.3042V6.1517C13.5355 5.88892 13.4308 5.63712 13.245 5.4513C13.0591 5.26548 12.8073 5.16074 12.5446 5.15996Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V20.04H11.8006C12.0633 20.0392 12.3151 19.9344 12.501 19.7486C12.6868 19.5628 12.7915 19.311 12.7923 19.0482V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.8006 5.90396H6.09631V18.552H11.8006C12.0633 18.5512 12.3151 18.4464 12.501 18.2606C12.6868 18.0748 12.7915 17.823 12.7923 17.5602V6.8957C12.7915 6.6329 12.6868 6.38114 12.501 6.19532C12.3151 6.0095 12.0633 5.90475 11.8006 5.90396Z" fill="black"></path><path opacity="0.2" d="M11.0566 5.90396H6.09631V18.552H11.0566C11.3193 18.5512 11.5711 18.4464 11.757 18.2606C11.9428 18.0748 12.0475 17.823 12.0483 17.5602V6.8957C12.0475 6.6329 11.9428 6.38114 11.757 6.19532C11.5711 6.0095 11.3193 5.90475 11.0566 5.90396Z" fill="black"></path><path d="M1.13604 5.90396H11.0566C11.3195 5.90396 11.5718 6.00842 11.7578 6.19442C11.9438 6.38042 12.0483 6.63266 12.0483 6.8957V16.8162C12.0483 17.0793 11.9438 17.3315 11.7578 17.5175C11.5718 17.7035 11.3195 17.808 11.0566 17.808H1.13604C0.873012 17.808 0.620754 17.7035 0.434765 17.5175C0.248775 17.3315 0.144287 17.0793 0.144287 16.8162V6.8957C0.144287 6.63266 0.248775 6.38042 0.434765 6.19442C0.620754 6.00842 0.873012 5.90396 1.13604 5.90396Z" fill="#107C41"></path><path d="M2.77283 15.576L5.18041 11.8455L2.9752 8.13596H4.74964L5.95343 10.5071C6.06401 10.7318 6.14015 10.8994 6.18185 11.01H6.19745C6.27683 10.8305 6.35987 10.6559 6.44669 10.4863L7.73309 8.13596H9.36167L7.09991 11.8247L9.41897 15.576H7.68545L6.29489 12.972C6.22943 12.861 6.17387 12.7445 6.12899 12.6238H6.10817C6.06761 12.7419 6.01367 12.855 5.94748 12.9608L4.51676 15.576H2.77283Z" fill="white"></path></svg>', class: "size-5" }, doc: { icon: '<svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M30.6141 1.91994H9.45071C9.09999 1.91994 8.76367 2.05926 8.51567 2.30725C8.26767 2.55523 8.12839 2.89158 8.12839 3.24228V8.86395L20.0324 12.3359L31.9364 8.86395V3.24228C31.9364 2.89158 31.797 2.55523 31.549 2.30725C31.3011 2.05926 30.9647 1.91994 30.6141 1.91994Z" fill="#41A5EE"></path><path d="M31.9364 8.86395H8.12839V15.8079L20.0324 19.2799L31.9364 15.8079V8.86395Z" fill="#2B7CD3"></path><path d="M31.9364 15.8079H8.12839V22.7519L20.0324 26.2239L31.9364 22.7519V15.8079Z" fill="#185ABD"></path><path d="M31.9364 22.752H8.12839V28.3736C8.12839 28.7244 8.26767 29.0607 8.51567 29.3087C8.76367 29.5567 9.09999 29.696 9.45071 29.696H30.6141C30.9647 29.696 31.3011 29.5567 31.549 29.3087C31.797 29.0607 31.9364 28.7244 31.9364 28.3736V22.752Z" fill="#103F91"></path><path opacity="0.1" d="M16.7261 6.87994H8.12839V25.7279H16.7261C17.0764 25.7269 17.4121 25.5872 17.6599 25.3395C17.9077 25.0917 18.0473 24.756 18.0484 24.4056V8.20226C18.0473 7.8519 17.9077 7.51616 17.6599 7.2684C17.4121 7.02064 17.0764 6.88099 16.7261 6.87994Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V26.7199H15.7341C16.0844 26.7189 16.4201 26.5792 16.6679 26.3315C16.9157 26.0837 17.0553 25.748 17.0564 25.3976V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M15.7341 7.87194H8.12839V24.7359H15.7341C16.0844 24.7349 16.4201 24.5952 16.6679 24.3475C16.9157 24.0997 17.0553 23.764 17.0564 23.4136V9.19426C17.0553 8.84386 16.9157 8.50818 16.6679 8.26042C16.4201 8.01266 16.0844 7.87299 15.7341 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path opacity="0.2" d="M14.7421 7.87194H8.12839V24.7359H14.7421C15.0924 24.7349 15.4281 24.5952 15.6759 24.3475C15.9237 24.0997 16.0633 23.764 16.0644 23.4136V9.19426C16.0633 8.84386 15.9237 8.50818 15.6759 8.26042C15.4281 8.01266 15.0924 7.87299 14.7421 7.87194Z" class="fill-black dark:fill-neutral-200" fill="currentColor"></path><path d="M1.51472 7.87194H14.7421C15.0927 7.87194 15.4291 8.01122 15.6771 8.25922C15.925 8.50722 16.0644 8.84354 16.0644 9.19426V22.4216C16.0644 22.7723 15.925 23.1087 15.6771 23.3567C15.4291 23.6047 15.0927 23.7439 14.7421 23.7439H1.51472C1.16401 23.7439 0.827669 23.6047 0.579687 23.3567C0.3317 23.1087 0.192383 22.7723 0.192383 22.4216V9.19426C0.192383 8.84354 0.3317 8.50722 0.579687 8.25922C0.827669 8.01122 1.16401 7.87194 1.51472 7.87194Z" fill="#185ABD"></path><path d="M12.0468 20.7679H10.2612L8.17801 13.9231L5.99558 20.7679H4.20998L2.22598 10.8479H4.01158L5.40038 17.7919L7.48358 11.0463H8.97161L10.9556 17.7919L12.3444 10.8479H14.0308L12.0468 20.7679Z" fill="white"></path></svg>', class: "size-5" }, zip: { icon: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M16 22h2a2 2 0 0 0 2-2V7l-5-5H6a2 2 0 0 0-2 2v18"/><path d="M14 2v4a2 2 0 0 0 2 2h4"/><circle cx="10" cy="20" r="2"/><path d="M10 7V6"/><path d="M10 12v-1"/><path d="M10 18v-2"/></svg>', class: "size-5" } }, o2.extensions), this.singleton = o2.singleton, this.concatOptions = Object.assign(Object.assign({ clickable: this.el.querySelector("[data-hs-file-upload-trigger]"), previewsContainer: this.el.querySelector("[data-hs-file-upload-previews]"), addRemoveLinks: false, previewTemplate: this.previewTemplate, autoHideTrigger: false }, o2), t3), this.onReloadButtonClickListener = [], this.onTempFileInputChangeListener = [], this.init();
            }
            tempFileInputChange(e3, t3) {
              var i3;
              const n2 = null === (i3 = e3.target.files) || void 0 === i3 ? void 0 : i3[0];
              if (n2) {
                const e4 = n2;
                e4.status = Dropzone.ADDED, e4.accepted = true, e4.previewElement = t3.previewElement, e4.previewTemplate = t3.previewTemplate, e4.previewsContainer = t3.previewsContainer, this.dropzone.removeFile(t3), this.dropzone.addFile(e4);
              }
            }
            reloadButtonClick(e3, t3) {
              e3.preventDefault(), e3.stopPropagation();
              const i3 = document.createElement("input");
              i3.type = "file", this.onTempFileInputChangeListener.push({ el: i3, fn: (e4) => this.tempFileInputChange(e4, t3) }), i3.click(), i3.addEventListener("change", this.onTempFileInputChangeListener.find(((e4) => e4.el === i3)).fn);
            }
            init() {
              this.createCollection(window.$hsFileUploadCollection, this), this.initDropzone();
            }
            initDropzone() {
              const e3 = this.el.querySelector("[data-hs-file-upload-clear]"), t3 = Array.from(this.el.querySelectorAll("[data-hs-file-upload-pseudo-trigger]"));
              this.dropzone = new Dropzone(this.el, this.concatOptions), this.dropzone.on("addedfile", ((e4) => this.onAddFile(e4))), this.dropzone.on("removedfile", (() => this.onRemoveFile())), this.dropzone.on("uploadprogress", ((e4, t4) => this.onUploadProgress(e4, t4))), this.dropzone.on("complete", ((e4) => this.onComplete(e4))), e3 && (e3.onclick = () => {
                this.dropzone.files.length && this.dropzone.removeAllFiles(true);
              }), t3.length && t3.forEach(((e4) => {
                e4.onclick = () => {
                  var e5, t4;
                  (null === (e5 = this.concatOptions) || void 0 === e5 ? void 0 : e5.clickable) && (null === (t4 = this.concatOptions) || void 0 === t4 ? void 0 : t4.clickable).click();
                };
              }));
            }
            destroy() {
              this.onTempFileInputChangeListener.forEach(((e3) => {
                e3.el.removeEventListener("change", e3.fn);
              })), this.onTempFileInputChangeListener = null, this.onReloadButtonClickListener.forEach(((e3) => {
                e3.el.removeEventListener("click", e3.fn);
              })), this.onReloadButtonClickListener = null, this.dropzone.destroy(), window.$hsFileUploadCollection = window.$hsFileUploadCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            onAddFile(e3) {
              const { previewElement: t3 } = e3, i3 = e3.previewElement.querySelector("[data-hs-file-upload-reload]");
              if (!t3) return false;
              this.singleton && this.dropzone.files.length > 1 && this.dropzone.removeFile(this.dropzone.files[0]), i3 && (this.onReloadButtonClickListener.push({ el: i3, fn: (t4) => this.reloadButtonClick(t4, e3) }), i3.addEventListener("click", this.onReloadButtonClickListener.find(((e4) => e4.el === i3)).fn)), this.previewAccepted(e3);
            }
            previewAccepted(e3) {
              const { previewElement: t3 } = e3, i3 = this.splitFileName(e3.name), n2 = t3.querySelector("[data-hs-file-upload-file-name]"), s2 = t3.querySelector("[data-hs-file-upload-file-ext]"), o2 = t3.querySelector("[data-hs-file-upload-file-size]"), l2 = t3.querySelector("[data-hs-file-upload-file-icon]"), a = this.el.querySelector("[data-hs-file-upload-trigger]"), r = t3.querySelector("[data-dz-thumbnail]"), d = t3.querySelector("[data-hs-file-upload-remove]");
              n2 && (n2.textContent = i3.name), s2 && (s2.textContent = i3.extension), o2 && (o2.textContent = this.formatFileSize(e3.size)), r && (e3.type.includes("image/") ? r.classList.remove("hidden") : this.setIcon(i3.extension, l2)), this.dropzone.files.length > 0 && this.concatOptions.autoHideTrigger && (a.style.display = "none"), d && (d.onclick = () => this.dropzone.removeFile(e3));
            }
            onRemoveFile() {
              const e3 = this.el.querySelector("[data-hs-file-upload-trigger]");
              0 === this.dropzone.files.length && this.concatOptions.autoHideTrigger && (e3.style.display = "");
            }
            onUploadProgress(e3, t3) {
              const { previewElement: i3 } = e3;
              if (!i3) return false;
              const n2 = i3.querySelector("[data-hs-file-upload-progress-bar]"), s2 = i3.querySelector("[data-hs-file-upload-progress-bar-pane]"), o2 = i3.querySelector("[data-hs-file-upload-progress-bar-value]"), l2 = Math.floor(t3);
              n2 && n2.setAttribute("aria-valuenow", `${l2}`), s2 && (s2.style.width = `${l2}%`), o2 && (o2.innerText = `${l2}`);
            }
            onComplete(e3) {
              const { previewElement: t3 } = e3;
              if (!t3) return false;
              t3.classList.add("complete");
            }
            setIcon(e3, t3) {
              const i3 = this.createIcon(e3);
              t3.append(i3);
            }
            createIcon(e3) {
              var t3, i3;
              const n2 = (null === (t3 = this.extensions[e3]) || void 0 === t3 ? void 0 : t3.icon) ? (0, s.htmlToElement)(this.extensions[e3].icon) : (0, s.htmlToElement)(this.extensions.default.icon);
              return (0, s.classToClassList)((null === (i3 = this.extensions[e3]) || void 0 === i3 ? void 0 : i3.class) ? this.extensions[e3].class : this.extensions.default.class, n2), n2;
            }
            formatFileSize(e3) {
              return e3 < 1024 ? e3.toFixed(2) + " B" : e3 < 1048576 ? (e3 / 1024).toFixed(2) + " KB" : e3 < 1073741824 ? (e3 / 1048576).toFixed(2) + " MB" : e3 < 1099511627776 ? (e3 / 1073741824).toFixed(2) + " GB" : (e3 / 1099511627776).toFixed(2) + " TB";
            }
            splitFileName(e3) {
              let t3 = e3.lastIndexOf(".");
              return -1 == t3 ? { name: e3, extension: "" } : { name: e3.substring(0, t3), extension: e3.substring(t3 + 1) };
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsFileUploadCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsFileUploadCollection || (window.$hsFileUploadCollection = []), window.$hsFileUploadCollection && (window.$hsFileUploadCollection = window.$hsFileUploadCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-file-upload]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsFileUploadCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            document.querySelectorAll("[data-hs-file-upload]:not(.--prevent-on-load-init)").length && ("undefined" == typeof _ && console.error("HSFileUpload: Lodash is not available, please add it to the page."), "undefined" == typeof Dropzone && console.error("HSFileUpload: Dropzone is not available, please add it to the page.")), "undefined" != typeof _ && "undefined" != typeof Dropzone && l.autoInit();
          })), "undefined" != typeof window && (window.HSFileUpload = l), t2.default = l;
        }, 248: (e2, t2, i2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true });
          const n = i2(292);
          t2.default = class {
            constructor() {
              this.components = [], this.currentlyOpenedComponents = [], this.activeComponent = null, this.allowedKeybindings = /* @__PURE__ */ new Set(["Escape", "Enter", " ", "Space", "ArrowDown", "ArrowUp", "ArrowLeft", "ArrowRight", "Tab", "Home", "End"]), this.initGlobalListeners();
            }
            initGlobalListeners() {
              document.addEventListener("keydown", ((e3) => this.handleGlobalKeydown(e3))), document.addEventListener("focusin", ((e3) => this.handleGlobalFocusin(e3)));
            }
            isAllowedKeybinding(e3) {
              return !!this.allowedKeybindings.has(e3.key) || !(1 !== e3.key.length || !/^[a-zA-Z]$/.test(e3.key) || e3.metaKey || e3.ctrlKey || e3.altKey || e3.shiftKey);
            }
            getActiveComponent(e3) {
              if (!e3) return null;
              const t3 = this.components.filter(((t4) => t4.wrapper.contains(e3) || t4.context && t4.context.contains(e3)));
              if (0 === t3.length) return null;
              if (1 === t3.length) return t3[0];
              let i3 = null, n2 = Number.MAX_SAFE_INTEGER;
              for (const s of t3) {
                let t4 = 0, o = e3;
                for (; o && o !== s.wrapper && o !== s.context; ) t4++, o = o.parentElement;
                t4 < n2 && (n2 = t4, i3 = s);
              }
              return i3;
            }
            handleGlobalFocusin(e3) {
              const t3 = e3.target;
              this.activeComponent = this.getActiveComponent(t3);
            }
            handleGlobalKeydown(e3) {
              var t3;
              const i3 = e3.target;
              if (this.activeComponent = this.getActiveComponent(i3), this.activeComponent && this.isAllowedKeybinding(e3)) switch (e3.key) {
                case "Escape":
                  if (this.activeComponent.isOpened) this.activeComponent.handlers.onEsc && (this.activeComponent.handlers.onEsc(), e3.preventDefault(), e3.stopPropagation());
                  else {
                    const t4 = this.findClosestOpenParent(i3);
                    (null == t4 ? void 0 : t4.handlers.onEsc) && (t4.handlers.onEsc(), e3.preventDefault(), e3.stopPropagation());
                  }
                  break;
                case "Enter":
                  this.activeComponent.handlers.onEnter && (this.activeComponent.handlers.onEnter(), (0, n.isFormElement)(i3) || (e3.stopPropagation(), e3.preventDefault()));
                  break;
                case " ":
                case "Space":
                  if ("INPUT" === i3.tagName || "TEXTAREA" === i3.tagName) return;
                  this.activeComponent.handlers.onSpace && (this.activeComponent.handlers.onSpace(), e3.preventDefault(), e3.stopPropagation());
                  break;
                case "ArrowDown":
                case "ArrowUp":
                case "ArrowLeft":
                case "ArrowRight":
                  if (this.activeComponent.handlers.onArrow) {
                    if (e3.metaKey || e3.ctrlKey || e3.altKey || e3.shiftKey) return;
                    this.activeComponent.handlers.onArrow(e3), e3.preventDefault(), e3.stopPropagation();
                  }
                  break;
                case "Tab":
                  if (!this.activeComponent.handlers.onTab) break;
                  const s = e3.shiftKey ? this.activeComponent.handlers.onShiftTab : this.activeComponent.handlers.onTab;
                  s && s(e3);
                  break;
                case "Home":
                  this.activeComponent.handlers.onHome && (this.activeComponent.handlers.onHome(), e3.preventDefault(), e3.stopPropagation());
                  break;
                case "End":
                  this.activeComponent.handlers.onEnd && (this.activeComponent.handlers.onEnd(), e3.preventDefault(), e3.stopPropagation());
                  break;
                default:
                  if (this.activeComponent.handlers.onFirstLetter && 1 === e3.key.length && /^[a-zA-Z]$/.test(e3.key)) {
                    if (this.activeComponent.handlers.onFirstLetter(e3.key), !(null === (t3 = this.activeComponent.stopPropagation) || void 0 === t3 ? void 0 : t3.onFirstLetter)) return;
                    e3.preventDefault(), e3.stopPropagation();
                  }
              }
            }
            findClosestOpenParent(e3) {
              let t3 = e3.parentElement;
              for (; t3; ) {
                const e4 = this.currentlyOpenedComponents.find(((e5) => e5.wrapper === t3 && e5 !== this.activeComponent));
                if (e4) return e4;
                t3 = t3.parentElement;
              }
              return null;
            }
            registerComponent(e3, t3, i3 = true, n2 = "", s = "", o, l) {
              const a = { wrapper: e3, handlers: t3, isOpened: i3, name: n2, selector: s, context: o, isRegistered: true, stopPropagation: l };
              return this.components.push(a), a;
            }
            updateComponentState(e3, t3) {
              e3.isOpened = t3, t3 ? this.currentlyOpenedComponents.includes(e3) || this.currentlyOpenedComponents.push(e3) : this.currentlyOpenedComponents = this.currentlyOpenedComponents.filter(((t4) => t4 !== e3));
            }
            unregisterComponent(e3) {
              this.components = this.components.filter(((t3) => t3 !== e3)), this.currentlyOpenedComponents = this.currentlyOpenedComponents.filter(((t3) => t3 !== e3));
            }
            addAllowedKeybinding(e3) {
              this.allowedKeybindings.add(e3);
            }
            removeAllowedKeybinding(e3) {
              this.allowedKeybindings.delete(e3);
            }
            getAllowedKeybindings() {
              return Array.from(this.allowedKeybindings);
            }
          };
        }, 255: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true }), t2.COLLECTIONS = void 0;
          const s = n(i2(406)), o = n(i2(740)), l = n(i2(268)), a = n(i2(485)), r = n(i2(809));
          let d, c, h, u;
          const p = n(i2(891)), m = n(i2(812)), g = n(i2(332)), v = n(i2(850)), f = n(i2(60)), y = n(i2(911)), b = n(i2(639)), w = n(i2(751)), C = n(i2(442)), S = n(i2(887)), x = n(i2(97)), L = n(i2(166)), T = n(i2(144)), E = n(i2(502)), k = n(i2(684)), I = n(i2(100)), A = n(i2(969)), M = n(i2(772));
          if ("undefined" != typeof window) {
            try {
              "undefined" != typeof DataTable && "undefined" != typeof jQuery && (d = i2(814).default);
            } catch (e3) {
              console.warn("HSDataTable: Required dependencies not found"), d = null;
            }
            try {
              "undefined" != typeof _ && "undefined" != typeof Dropzone && (c = i2(234).default);
            } catch (e3) {
              console.warn("HSFileUpload: Required dependencies not found"), c = null;
            }
            try {
              "undefined" != typeof noUiSlider && (h = i2(347).default);
            } catch (e3) {
              console.warn("HSRangeSlider: Required dependencies not found"), h = null;
            }
            try {
              "undefined" != typeof VanillaCalendarPro && (u = i2(128).default);
            } catch (e3) {
              console.warn("HSDatepicker: Required dependencies not found"), u = null;
            }
          }
          t2.COLLECTIONS = [{ key: "copy-markup", fn: s.default, collection: "$hsCopyMarkupCollection" }, { key: "accordion", fn: o.default, collection: "$hsAccordionCollection" }, { key: "carousel", fn: l.default, collection: "$hsCarouselCollection" }, { key: "collapse", fn: a.default, collection: "$hsCollapseCollection" }, { key: "combobox", fn: r.default, collection: "$hsComboBoxCollection" }, ...d ? [{ key: "datatable", fn: d, collection: "$hsDataTableCollection" }] : [], ...u ? [{ key: "datepicker", fn: u, collection: "$hsDatepickerCollection" }] : [], { key: "dropdown", fn: p.default, collection: "$hsDropdownCollection" }, ...c ? [{ key: "file-upload", fn: c, collection: "$hsFileUploadCollection" }] : [], { key: "input-number", fn: g.default, collection: "$hsInputNumberCollection" }, { key: "layout-splitter", fn: m.default, collection: "$hsLayoutSplitterCollection" }, { key: "overlay", fn: v.default, collection: "$hsOverlayCollection" }, { key: "pin-input", fn: f.default, collection: "$hsPinInputCollection" }, ...h ? [{ key: "range-slider", fn: h, collection: "$hsRangeSliderCollection" }] : [], { key: "remove-element", fn: y.default, collection: "$hsRemoveElementCollection" }, { key: "scroll-nav", fn: b.default, collection: "$hsScrollNavCollection" }, { key: "scrollspy", fn: w.default, collection: "$hsScrollspyCollection" }, { key: "select", fn: C.default, collection: "$hsSelectCollection" }, { key: "stepper", fn: S.default, collection: "$hsStepperCollection" }, { key: "strong-password", fn: x.default, collection: "$hsStrongPasswordCollection" }, { key: "tabs", fn: L.default, collection: "$hsTabsCollection" }, { key: "textarea-auto-height", fn: T.default, collection: "$hsTextareaAutoHeightCollection" }, { key: "theme-switch", fn: E.default, collection: "$hsThemeSwitchCollection" }, { key: "toggle-count", fn: k.default, collection: "$hsToggleCountCollection" }, { key: "toggle-password", fn: I.default, collection: "$hsTogglePasswordCollection" }, { key: "tooltip", fn: A.default, collection: "$hsTooltipCollection" }, { key: "tree-view", fn: M.default, collection: "$hsTreeViewCollection" }];
        }, 268: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961)), l = i2(223);
          class a extends o.default {
            constructor(e3, t3) {
              var i3, n2, s2, o2, l2;
              super(e3, t3);
              const a2 = e3.getAttribute("data-hs-carousel"), r = a2 ? JSON.parse(a2) : {}, d = Object.assign(Object.assign({}, r), t3);
              this.currentIndex = d.currentIndex || 0, this.loadingClasses = d.loadingClasses ? `${d.loadingClasses}`.split(",") : null, this.dotsItemClasses = d.dotsItemClasses ? d.dotsItemClasses : null, this.isAutoHeight = void 0 !== d.isAutoHeight && d.isAutoHeight, this.isAutoPlay = void 0 !== d.isAutoPlay && d.isAutoPlay, this.isCentered = void 0 !== d.isCentered && d.isCentered, this.isDraggable = void 0 !== d.isDraggable && d.isDraggable, this.isInfiniteLoop = void 0 !== d.isInfiniteLoop && d.isInfiniteLoop, this.isRTL = void 0 !== d.isRTL && d.isRTL, this.isSnap = void 0 !== d.isSnap && d.isSnap, this.hasSnapSpacers = void 0 === d.hasSnapSpacers || d.hasSnapSpacers, this.speed = d.speed || 4e3, this.updateDelay = d.updateDelay || 0, this.slidesQty = d.slidesQty || 1, this.loadingClassesRemove = (null === (i3 = this.loadingClasses) || void 0 === i3 ? void 0 : i3[0]) ? this.loadingClasses[0].split(" ") : "opacity-0", this.loadingClassesAdd = (null === (n2 = this.loadingClasses) || void 0 === n2 ? void 0 : n2[1]) ? this.loadingClasses[1].split(" ") : "", this.afterLoadingClassesAdd = (null === (s2 = this.loadingClasses) || void 0 === s2 ? void 0 : s2[2]) ? this.loadingClasses[2].split(" ") : "", this.container = this.el.querySelector(".hs-carousel") || null, this.inner = this.el.querySelector(".hs-carousel-body") || null, this.slides = this.el.querySelectorAll(".hs-carousel-slide") || [], this.prev = this.el.querySelector(".hs-carousel-prev") || null, this.next = this.el.querySelector(".hs-carousel-next") || null, this.dots = this.el.querySelector(".hs-carousel-pagination") || null, this.info = this.el.querySelector(".hs-carousel-info") || null, this.infoTotal = (null === (o2 = null == this ? void 0 : this.info) || void 0 === o2 ? void 0 : o2.querySelector(".hs-carousel-info-total")) || null, this.infoCurrent = (null === (l2 = null == this ? void 0 : this.info) || void 0 === l2 ? void 0 : l2.querySelector(".hs-carousel-info-current")) || null, this.sliderWidth = this.el.getBoundingClientRect().width, this.isDragging = false, this.dragStartX = null, this.initialTranslateX = null, this.touchX = { start: 0, end: 0 }, this.touchY = { start: 0, end: 0 }, this.resizeContainer = document.querySelector("body"), this.resizeContainerWidth = 0, this.init();
            }
            setIsSnap() {
              const e3 = this.container.getBoundingClientRect(), t3 = e3.left + e3.width / 2;
              let i3 = null, n2 = null, s2 = 1 / 0;
              Array.from(this.inner.children).forEach(((e4) => {
                const n3 = e4.getBoundingClientRect(), o2 = this.inner.getBoundingClientRect(), l2 = n3.left + n3.width / 2 - o2.left, a2 = Math.abs(t3 - (o2.left + l2));
                a2 < s2 && (s2 = a2, i3 = e4);
              })), i3 && (n2 = Array.from(this.slides).findIndex(((e4) => e4 === i3))), this.setIndex(n2), this.dots && this.setCurrentDot();
            }
            prevClick() {
              this.goToPrev(), this.isAutoPlay && (this.resetTimer(), this.setTimer());
            }
            nextClick() {
              this.goToNext(), this.isAutoPlay && (this.resetTimer(), this.setTimer());
            }
            containerScroll() {
              clearTimeout(this.isScrolling), this.isScrolling = setTimeout((() => {
                this.setIsSnap();
              }), 100);
            }
            elementTouchStart(e3) {
              this.touchX.start = e3.changedTouches[0].screenX, this.touchY.start = e3.changedTouches[0].screenY;
            }
            elementTouchEnd(e3) {
              this.touchX.end = e3.changedTouches[0].screenX, this.touchY.end = e3.changedTouches[0].screenY, this.detectDirection();
            }
            innerMouseDown(e3) {
              this.handleDragStart(e3);
            }
            innerTouchStart(e3) {
              this.handleDragStart(e3);
            }
            documentMouseMove(e3) {
              this.handleDragMove(e3);
            }
            documentTouchMove(e3) {
              this.handleDragMove(e3);
            }
            documentMouseUp() {
              this.handleDragEnd();
            }
            documentTouchEnd() {
              this.handleDragEnd();
            }
            dotClick(e3) {
              this.goTo(e3), this.isAutoPlay && (this.resetTimer(), this.setTimer());
            }
            init() {
              this.createCollection(window.$hsCarouselCollection, this), this.inner && (this.calculateWidth(), this.isDraggable && !this.isSnap && this.initDragHandling()), this.prev && (this.onPrevClickListener = () => this.prevClick(), this.prev.addEventListener("click", this.onPrevClickListener)), this.next && (this.onNextClickListener = () => this.nextClick(), this.next.addEventListener("click", this.onNextClickListener)), this.dots && this.initDots(), this.info && this.buildInfo(), this.slides.length && (this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass(), this.isAutoPlay && this.autoPlay()), setTimeout((() => {
                this.isSnap && this.setIsSnap(), this.loadingClassesRemove && ("string" == typeof this.loadingClassesRemove ? this.inner.classList.remove(this.loadingClassesRemove) : this.inner.classList.remove(...this.loadingClassesRemove)), this.loadingClassesAdd && ("string" == typeof this.loadingClassesAdd ? this.inner.classList.add(this.loadingClassesAdd) : this.inner.classList.add(...this.loadingClassesAdd)), this.inner && this.afterLoadingClassesAdd && setTimeout((() => {
                  "string" == typeof this.afterLoadingClassesAdd ? this.inner.classList.add(this.afterLoadingClassesAdd) : this.inner.classList.add(...this.afterLoadingClassesAdd);
                }));
              }), 400), this.isSnap && (this.onContainerScrollListener = () => this.containerScroll(), this.container.addEventListener("scroll", this.onContainerScrollListener)), this.el.classList.add("init"), this.isSnap || (this.onElementTouchStartListener = (e3) => this.elementTouchStart(e3), this.onElementTouchEndListener = (e3) => this.elementTouchEnd(e3), this.el.addEventListener("touchstart", this.onElementTouchStartListener), this.el.addEventListener("touchend", this.onElementTouchEndListener)), this.observeResize();
            }
            initDragHandling() {
              const e3 = this.inner;
              this.onInnerMouseDownListener = (e4) => this.innerMouseDown(e4), this.onInnerTouchStartListener = (e4) => this.innerTouchStart(e4), this.onDocumentMouseMoveListener = (e4) => this.documentMouseMove(e4), this.onDocumentTouchMoveListener = (e4) => this.documentTouchMove(e4), this.onDocumentMouseUpListener = () => this.documentMouseUp(), this.onDocumentTouchEndListener = () => this.documentTouchEnd(), e3 && (e3.addEventListener("mousedown", this.onInnerMouseDownListener), e3.addEventListener("touchstart", this.onInnerTouchStartListener, { passive: true }), document.addEventListener("mousemove", this.onDocumentMouseMoveListener), document.addEventListener("touchmove", this.onDocumentTouchMoveListener, { passive: false }), document.addEventListener("mouseup", this.onDocumentMouseUpListener), document.addEventListener("touchend", this.onDocumentTouchEndListener));
            }
            getTranslateXValue() {
              var e3;
              const t3 = window.getComputedStyle(this.inner).transform;
              if ("none" !== t3) {
                const i3 = null === (e3 = t3.match(/matrix.*\((.+)\)/)) || void 0 === e3 ? void 0 : e3[1].split(", ");
                if (i3) {
                  let e4 = parseFloat(6 === i3.length ? i3[4] : i3[12]);
                  return this.isRTL && (e4 = -e4), isNaN(e4) || 0 === e4 ? 0 : -e4;
                }
              }
              return 0;
            }
            removeClickEventWhileDragging(e3) {
              e3.preventDefault();
            }
            handleDragStart(e3) {
              e3.preventDefault(), this.isDragging = true, this.dragStartX = this.getEventX(e3), this.initialTranslateX = this.isRTL ? this.getTranslateXValue() : -this.getTranslateXValue(), this.inner.classList.add("dragging");
            }
            handleDragMove(e3) {
              if (!this.isDragging) return;
              this.inner.querySelectorAll("a:not(.prevented-click)").forEach(((e4) => {
                e4.classList.add("prevented-click"), e4.addEventListener("click", this.removeClickEventWhileDragging);
              }));
              let t3 = this.getEventX(e3) - this.dragStartX;
              this.isRTL && (t3 = -t3);
              const i3 = this.initialTranslateX + t3;
              this.setTranslate((() => {
                let e4 = this.sliderWidth * this.slides.length / this.getCurrentSlidesQty() - this.sliderWidth;
                const t4 = this.sliderWidth, n2 = (t4 - t4 / this.getCurrentSlidesQty()) / 2, s2 = this.isCentered ? n2 : 0;
                this.isCentered && (e4 += n2);
                const o2 = -e4;
                return this.isRTL ? i3 < s2 ? s2 : i3 > e4 ? o2 : -i3 : i3 > s2 ? s2 : i3 < -e4 ? o2 : i3;
              })());
            }
            handleDragEnd() {
              if (!this.isDragging) return;
              this.isDragging = false;
              const e3 = this.sliderWidth / this.getCurrentSlidesQty(), t3 = this.getTranslateXValue();
              let i3 = Math.round(t3 / e3);
              this.isRTL && (i3 = Math.round(t3 / e3)), this.inner.classList.remove("dragging"), setTimeout((() => {
                this.calculateTransform(i3), this.dots && this.setCurrentDot(), this.dragStartX = null, this.initialTranslateX = null, this.inner.querySelectorAll("a.prevented-click").forEach(((e4) => {
                  e4.classList.remove("prevented-click"), e4.removeEventListener("click", this.removeClickEventWhileDragging);
                }));
              }));
            }
            getEventX(e3) {
              return e3 instanceof MouseEvent ? e3.clientX : e3.touches[0].clientX;
            }
            getCurrentSlidesQty() {
              if ("object" == typeof this.slidesQty) {
                const e3 = document.body.clientWidth;
                let t3 = 0;
                return Object.keys(this.slidesQty).forEach(((i3) => {
                  e3 >= (typeof i3 + 1 == "number" ? this.slidesQty[i3] : l.BREAKPOINTS[i3]) && (t3 = this.slidesQty[i3]);
                })), t3;
              }
              return this.slidesQty;
            }
            buildSnapSpacers() {
              const e3 = this.inner.querySelector(".hs-snap-before"), t3 = this.inner.querySelector(".hs-snap-after");
              e3 && e3.remove(), t3 && t3.remove();
              const i3 = this.sliderWidth, n2 = i3 / 2 - i3 / this.getCurrentSlidesQty() / 2, o2 = (0, s.htmlToElement)(`<div class="hs-snap-before" style="height: 100%; width: ${n2}px"></div>`), l2 = (0, s.htmlToElement)(`<div class="hs-snap-after" style="height: 100%; width: ${n2}px"></div>`);
              this.inner.prepend(o2), this.inner.appendChild(l2);
            }
            initDots() {
              this.el.querySelectorAll(".hs-carousel-pagination-item").length ? this.setDots() : this.buildDots(), this.dots && this.setCurrentDot();
            }
            buildDots() {
              this.dots.innerHTML = "";
              const e3 = !this.isCentered && this.slidesQty ? this.slides.length - (this.getCurrentSlidesQty() - 1) : this.slides.length;
              for (let t3 = 0; t3 < e3; t3++) {
                const e4 = this.buildSingleDot(t3);
                this.dots.append(e4);
              }
            }
            setDots() {
              this.dotsItems = this.dots.querySelectorAll(".hs-carousel-pagination-item"), this.dotsItems.forEach(((e3, t3) => {
                const i3 = e3.getAttribute("data-carousel-pagination-item-target");
                this.singleDotEvents(e3, i3 ? +i3 : t3);
              }));
            }
            goToCurrentDot() {
              const e3 = this.dots, t3 = e3.getBoundingClientRect(), i3 = e3.scrollLeft, n2 = e3.scrollTop, s2 = e3.clientWidth, o2 = e3.clientHeight, l2 = this.dotsItems[this.currentIndex], a2 = l2.getBoundingClientRect(), r = a2.left - t3.left + i3, d = r + l2.clientWidth, c = a2.top - t3.top + n2, h = c + l2.clientHeight;
              let u = i3, p = n2;
              (r < i3 || d > i3 + s2) && (u = d - s2), (c < n2 || h > n2 + o2) && (p = h - o2), e3.scrollTo({ left: u, top: p, behavior: "smooth" });
            }
            buildInfo() {
              this.infoTotal && this.setInfoTotal(), this.infoCurrent && this.setInfoCurrent();
            }
            setInfoTotal() {
              this.infoTotal.innerText = `${this.slides.length}`;
            }
            setInfoCurrent() {
              this.infoCurrent.innerText = `${this.currentIndex + 1}`;
            }
            buildSingleDot(e3) {
              const t3 = (0, s.htmlToElement)("<span></span>");
              return this.dotsItemClasses && (0, s.classToClassList)(this.dotsItemClasses, t3), this.singleDotEvents(t3, e3), t3;
            }
            singleDotEvents(e3, t3) {
              this.onDotClickListener = () => this.dotClick(t3), e3.addEventListener("click", this.onDotClickListener);
            }
            observeResize() {
              new ResizeObserver((0, s.debounce)(((e3) => {
                for (let t3 of e3) {
                  const e4 = t3.contentRect.width;
                  e4 !== this.resizeContainerWidth && (this.recalculateWidth(), this.dots && this.initDots(), this.addCurrentClass(), this.resizeContainerWidth = e4);
                }
              }), this.updateDelay)).observe(this.resizeContainer);
            }
            calculateWidth() {
              this.isSnap || (this.inner.style.width = this.sliderWidth * this.slides.length / this.getCurrentSlidesQty() + "px"), this.slides.forEach(((e3) => {
                e3.style.width = this.sliderWidth / this.getCurrentSlidesQty() + "px";
              })), this.calculateTransform();
            }
            addCurrentClass() {
              if (this.isSnap) {
                const e3 = Math.floor(this.getCurrentSlidesQty() / 2);
                for (let t3 = 0; t3 < this.slides.length; t3++) {
                  const i3 = this.slides[t3];
                  t3 <= this.currentIndex + e3 && t3 >= this.currentIndex - e3 ? i3.classList.add("active") : i3.classList.remove("active");
                }
              } else {
                const e3 = this.isCentered ? this.currentIndex + this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.currentIndex + this.getCurrentSlidesQty();
                this.slides.forEach(((t3, i3) => {
                  i3 >= this.currentIndex && i3 < e3 ? t3.classList.add("active") : t3.classList.remove("active");
                }));
              }
            }
            setCurrentDot() {
              const e3 = (e4, t3) => {
                let i3 = false;
                const n2 = Math.floor(this.getCurrentSlidesQty() / 2);
                i3 = this.isSnap && !this.hasSnapSpacers ? t3 === (this.getCurrentSlidesQty() % 2 == 0 ? this.currentIndex - n2 + 1 : this.currentIndex - n2) : t3 === this.currentIndex, i3 ? e4.classList.add("active") : e4.classList.remove("active");
              };
              this.dotsItems ? this.dotsItems.forEach(((t3, i3) => e3(t3, i3))) : this.dots.querySelectorAll(":scope > *").forEach(((t3, i3) => e3(t3, i3)));
            }
            setElementToDisabled(e3) {
              e3.classList.add("disabled"), "BUTTON" !== e3.tagName && "INPUT" !== e3.tagName || e3.setAttribute("disabled", "disabled");
            }
            unsetElementToDisabled(e3) {
              e3.classList.remove("disabled"), "BUTTON" !== e3.tagName && "INPUT" !== e3.tagName || e3.removeAttribute("disabled");
            }
            addDisabledClass() {
              if (!this.prev || !this.next) return false;
              const e3 = getComputedStyle(this.inner).getPropertyValue("gap"), t3 = Math.floor(this.getCurrentSlidesQty() / 2);
              let i3 = 0, n2 = 0, s2 = false, o2 = false;
              this.isSnap ? (i3 = this.currentIndex, n2 = this.hasSnapSpacers ? this.slides.length - 1 : this.slides.length - t3 - 1, s2 = this.hasSnapSpacers ? 0 === i3 : this.getCurrentSlidesQty() % 2 == 0 ? i3 - t3 < 0 : i3 - t3 == 0, o2 = i3 >= n2 && this.container.scrollLeft + this.container.clientWidth + (parseFloat(e3) || 0) >= this.container.scrollWidth) : (i3 = this.currentIndex, n2 = this.isCentered ? this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.slides.length - this.getCurrentSlidesQty(), s2 = 0 === i3, o2 = i3 >= n2), s2 ? (this.unsetElementToDisabled(this.next), this.setElementToDisabled(this.prev)) : o2 ? (this.unsetElementToDisabled(this.prev), this.setElementToDisabled(this.next)) : (this.unsetElementToDisabled(this.prev), this.unsetElementToDisabled(this.next));
            }
            autoPlay() {
              this.setTimer();
            }
            setTimer() {
              this.timer = setInterval((() => {
                this.currentIndex === this.slides.length - 1 ? this.goTo(0) : this.goToNext();
              }), this.speed);
            }
            resetTimer() {
              clearInterval(this.timer);
            }
            detectDirection() {
              const e3 = this.touchX.end - this.touchX.start, t3 = this.touchY.end - this.touchY.start, i3 = Math.abs(e3), n2 = Math.abs(t3);
              if (i3 < 30 || i3 < n2) return;
              const s2 = this.isRTL ? e3 > 0 : e3 < 0;
              this.isInfiniteLoop ? s2 ? this.goToNext() : this.goToPrev() : (s2 && this.currentIndex < this.slides.length - this.getCurrentSlidesQty() && this.goToNext(), !s2 && this.currentIndex > 0 && this.goToPrev());
            }
            calculateTransform(e3) {
              void 0 !== e3 && (this.currentIndex = e3);
              const t3 = this.sliderWidth, i3 = t3 / this.getCurrentSlidesQty();
              let n2 = this.currentIndex * i3;
              if (this.isSnap && !this.isCentered && this.container.scrollLeft < t3 && this.container.scrollLeft + i3 / 2 > t3 && (this.container.scrollLeft = this.container.scrollWidth), this.isCentered && !this.isSnap) {
                const e4 = (t3 - i3) / 2;
                if (0 === this.currentIndex) n2 = -e4;
                else if (this.currentIndex >= this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1)) {
                  n2 = this.slides.length * i3 - t3 + e4;
                } else n2 = this.currentIndex * i3 - e4;
              }
              this.isSnap || this.setTransform(n2), this.isAutoHeight && (this.inner.style.height = `${this.slides[this.currentIndex].clientHeight}px`), this.dotsItems && this.goToCurrentDot(), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass(), this.isSnap && this.hasSnapSpacers && this.buildSnapSpacers(), this.infoCurrent && this.setInfoCurrent();
            }
            setTransform(e3) {
              this.slides.length > this.getCurrentSlidesQty() ? this.inner.style.transform = this.isRTL ? `translate(${e3}px, 0px)` : `translate(${-e3}px, 0px)` : this.inner.style.transform = "translate(0px, 0px)";
            }
            setTranslate(e3) {
              this.inner.style.transform = this.isRTL ? `translate(${-e3}px, 0px)` : `translate(${e3}px, 0px)`;
            }
            setIndex(e3) {
              this.currentIndex = e3, this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
            }
            recalculateWidth() {
              this.sliderWidth = this.inner.parentElement.getBoundingClientRect().width, this.calculateWidth(), this.sliderWidth !== this.inner.parentElement.getBoundingClientRect().width && this.recalculateWidth();
            }
            goToPrev() {
              if (this.currentIndex > 0 ? this.currentIndex-- : this.currentIndex = this.slides.length - this.getCurrentSlidesQty(), this.fireEvent("update", this.currentIndex), this.isSnap) {
                const e3 = this.sliderWidth / this.getCurrentSlidesQty();
                this.container.scrollBy({ left: Math.max(-this.container.scrollLeft, -e3), behavior: "smooth" }), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
              } else this.calculateTransform();
              this.dots && this.setCurrentDot();
            }
            goToNext() {
              const e3 = this.isCentered ? this.slides.length - this.getCurrentSlidesQty() + (this.getCurrentSlidesQty() - 1) : this.slides.length - this.getCurrentSlidesQty();
              if (this.currentIndex < e3 ? this.currentIndex++ : this.currentIndex = 0, this.fireEvent("update", this.currentIndex), this.isSnap) {
                const e4 = this.sliderWidth / this.getCurrentSlidesQty(), t3 = this.container.scrollWidth - this.container.clientWidth;
                this.container.scrollBy({ left: Math.min(e4, t3 - this.container.scrollLeft), behavior: "smooth" }), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
              } else this.calculateTransform();
              this.dots && this.setCurrentDot();
            }
            goTo(e3) {
              const t3 = this.currentIndex;
              if (this.currentIndex = e3, this.fireEvent("update", this.currentIndex), this.isSnap) {
                const e4 = this.sliderWidth / this.getCurrentSlidesQty(), i3 = t3 > this.currentIndex ? t3 - this.currentIndex : this.currentIndex - t3, n2 = t3 > this.currentIndex ? -e4 * i3 : e4 * i3;
                this.container.scrollBy({ left: n2, behavior: "smooth" }), this.addCurrentClass(), this.isInfiniteLoop || this.addDisabledClass();
              } else this.calculateTransform();
              this.dots && this.setCurrentDot();
            }
            destroy() {
              var e3, t3;
              if (this.loadingClassesAdd && ("string" == typeof this.loadingClassesAdd ? this.inner.classList.remove(this.loadingClassesAdd) : this.inner.classList.remove(...this.loadingClassesAdd)), this.inner && this.afterLoadingClassesAdd && setTimeout((() => {
                "string" == typeof this.afterLoadingClassesAdd ? this.inner.classList.remove(this.afterLoadingClassesAdd) : this.inner.classList.remove(...this.afterLoadingClassesAdd);
              })), this.el.classList.remove("init"), this.inner.classList.remove("dragging"), this.slides.forEach(((e4) => e4.classList.remove("active"))), (null === (e3 = null == this ? void 0 : this.dotsItems) || void 0 === e3 ? void 0 : e3.length) && this.dotsItems.forEach(((e4) => e4.classList.remove("active"))), this.prev.classList.remove("disabled"), this.next.classList.remove("disabled"), this.inner.style.width = "", this.slides.forEach(((e4) => e4.style.width = "")), this.isSnap || (this.inner.style.transform = ""), this.isAutoHeight && (this.inner.style.height = ""), this.prev.removeEventListener("click", this.onPrevClickListener), this.next.removeEventListener("click", this.onNextClickListener), this.container.removeEventListener("scroll", this.onContainerScrollListener), this.el.removeEventListener("touchstart", this.onElementTouchStartListener), this.el.removeEventListener("touchend", this.onElementTouchEndListener), this.inner.removeEventListener("mousedown", this.onInnerMouseDownListener), this.inner.removeEventListener("touchstart", this.onInnerTouchStartListener), document.removeEventListener("mousemove", this.onDocumentMouseMoveListener), document.removeEventListener("touchmove", this.onDocumentTouchMoveListener), document.removeEventListener("mouseup", this.onDocumentMouseUpListener), document.removeEventListener("touchend", this.onDocumentTouchEndListener), this.inner.querySelectorAll("a:not(.prevented-click)").forEach(((e4) => {
                e4.classList.remove("prevented-click"), e4.removeEventListener("click", this.removeClickEventWhileDragging);
              })), (null === (t3 = null == this ? void 0 : this.dotsItems) || void 0 === t3 ? void 0 : t3.length) || this.dots.querySelectorAll(":scope > *").length) {
                ((null == this ? void 0 : this.dotsItems) || this.dots.querySelectorAll(":scope > *")).forEach(((e4) => e4.removeEventListener("click", this.onDotClickListener))), this.dots.innerHTML = null;
              }
              this.isSnap && this.hasSnapSpacers && (this.inner.querySelector(".hs-snap-before").remove(), this.inner.querySelector(".hs-snap-after").remove()), this.dotsItems = null, this.isDragging = false, this.dragStartX = null, this.initialTranslateX = null, window.$hsCarouselCollection = window.$hsCarouselCollection.filter((({ element: e4 }) => e4.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsCarouselCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsCarouselCollection || (window.$hsCarouselCollection = []), window.$hsCarouselCollection && (window.$hsCarouselCollection = window.$hsCarouselCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-carousel]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsCarouselCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new a(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            a.autoInit();
          })), "undefined" != typeof window && (window.HSCarousel = a), t2.default = a;
        }, 292: function(e2, t2) {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.stringToBoolean = t2.menuSearchHistory = t2.isScrollable = t2.isParentOrElementHidden = t2.isJson = t2.isIpadOS = t2.isIOS = t2.isFormElement = t2.isFocused = t2.isEnoughSpace = t2.isDirectChild = t2.htmlToElement = t2.getZIndex = t2.getHighestZIndex = t2.getClassPropertyAlt = t2.getClassProperty = t2.dispatch = t2.debounce = t2.classToClassList = t2.afterTransition = void 0;
          t2.stringToBoolean = (e3) => "true" === e3;
          t2.getClassProperty = (e3, t3, i3 = "") => (window.getComputedStyle(e3).getPropertyValue(t3) || i3).replace(" ", "");
          t2.getClassPropertyAlt = (e3, t3, i3 = "") => {
            let n2 = "";
            return e3.classList.forEach(((e4) => {
              e4.includes(t3) && (n2 = e4);
            })), n2.match(/:(.*)]/) ? n2.match(/:(.*)]/)[1] : i3;
          };
          const i2 = (e3) => window.getComputedStyle(e3).getPropertyValue("z-index");
          t2.getZIndex = i2;
          t2.getHighestZIndex = (e3) => {
            let t3 = Number.NEGATIVE_INFINITY;
            return e3.forEach(((e4) => {
              let n2 = i2(e4);
              "auto" !== n2 && (n2 = parseInt(n2, 10), n2 > t3 && (t3 = n2));
            })), t3;
          };
          t2.isDirectChild = (e3, t3) => {
            const i3 = e3.children;
            for (let e4 = 0; e4 < i3.length; e4++) if (i3[e4] === t3) return true;
            return false;
          };
          t2.isEnoughSpace = (e3, t3, i3 = "auto", n2 = 10, s2 = null) => {
            const o = t3.getBoundingClientRect(), l = s2 ? s2.getBoundingClientRect() : null, a = window.innerHeight, r = l ? o.top - l.top : o.top, d = (s2 ? l.bottom : a) - o.bottom, c = e3.clientHeight + n2;
            return "bottom" === i3 ? d >= c : "top" === i3 ? r >= c : r >= c || d >= c;
          };
          t2.isFocused = (e3) => document.activeElement === e3;
          t2.isFormElement = (e3) => e3 instanceof HTMLInputElement || e3 instanceof HTMLTextAreaElement || e3 instanceof HTMLSelectElement;
          t2.isIOS = () => !!/iPad|iPhone|iPod/.test(navigator.platform) || navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
          t2.isIpadOS = () => navigator.maxTouchPoints && navigator.maxTouchPoints > 2 && /MacIntel/.test(navigator.platform);
          t2.isJson = (e3) => {
            if ("string" != typeof e3) return false;
            const t3 = e3.trim()[0], i3 = e3.trim().slice(-1);
            if ("{" === t3 && "}" === i3 || "[" === t3 && "]" === i3) try {
              return JSON.parse(e3), true;
            } catch (e4) {
              return false;
            }
            return false;
          };
          const n = (e3) => {
            if (!e3) return false;
            return "none" === window.getComputedStyle(e3).display || n(e3.parentElement);
          };
          t2.isParentOrElementHidden = n;
          t2.isScrollable = (e3) => {
            const t3 = window.getComputedStyle(e3), i3 = t3.overflowY, n2 = t3.overflowX, s2 = ("scroll" === i3 || "auto" === i3) && e3.scrollHeight > e3.clientHeight, o = ("scroll" === n2 || "auto" === n2) && e3.scrollWidth > e3.clientWidth;
            return s2 || o;
          };
          t2.debounce = (e3, t3 = 200) => {
            let i3;
            return (...n2) => {
              clearTimeout(i3), i3 = setTimeout((() => {
                e3.apply(this, n2);
              }), t3);
            };
          };
          t2.dispatch = (e3, t3, i3 = null) => {
            const n2 = new CustomEvent(e3, { detail: { payload: i3 }, bubbles: true, cancelable: true, composed: false });
            t3.dispatchEvent(n2);
          };
          t2.afterTransition = (e3, t3) => {
            const i3 = () => {
              t3(), e3.removeEventListener("transitionend", i3, true);
            }, n2 = window.getComputedStyle(e3), s2 = n2.getPropertyValue("transition-duration");
            "none" !== n2.getPropertyValue("transition-property") && parseFloat(s2) > 0 ? e3.addEventListener("transitionend", i3, true) : t3();
          };
          t2.htmlToElement = (e3) => {
            const t3 = document.createElement("template");
            return e3 = e3.trim(), t3.innerHTML = e3, t3.content.firstChild;
          };
          t2.classToClassList = (e3, t3, i3 = " ", n2 = "add") => {
            e3.split(i3).forEach(((e4) => {
              e4.trim() && ("add" === n2 ? t3.classList.add(e4) : t3.classList.remove(e4));
            }));
          };
          const s = { historyIndex: -1, addHistory(e3) {
            this.historyIndex = e3;
          }, existsInHistory(e3) {
            return e3 > this.historyIndex;
          }, clearHistory() {
            this.historyIndex = -1;
          } };
          t2.menuSearchHistory = s;
        }, 332: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              super(e3, t3), this.input = this.el.querySelector("[data-hs-input-number-input]") || null, this.increment = this.el.querySelector("[data-hs-input-number-increment]") || null, this.decrement = this.el.querySelector("[data-hs-input-number-decrement]") || null;
              const i3 = this.el.dataset.hsInputNumber, n2 = i3 ? JSON.parse(i3) : { step: 1 }, s2 = Object.assign(Object.assign({}, n2), t3);
              this.minInputValue = "min" in s2 ? s2.min : 0, this.maxInputValue = "max" in s2 ? s2.max : null, this.step = "step" in s2 && s2.step > 0 ? s2.step : 1, this.forceBlankValue = "forceBlankValue" in s2 && s2.forceBlankValue, this.input && this.checkIsNumberAndConvert(), this.init();
            }
            inputInput() {
              this.changeValue();
            }
            incrementClick() {
              this.changeValue("increment");
            }
            decrementClick() {
              this.changeValue("decrement");
            }
            init() {
              this.createCollection(window.$hsInputNumberCollection, this), this.input && this.increment && this.build();
            }
            checkIsNumberAndConvert() {
              const e3 = this.input.value.trim(), t3 = this.cleanAndExtractNumber(e3);
              null !== t3 ? (this.inputValue = t3, this.input.value = t3.toString()) : this.forceBlankValue || (this.inputValue = 0, this.input.value = "0");
            }
            cleanAndExtractNumber(e3) {
              const t3 = [];
              let i3 = false, n2 = false;
              e3.split("").forEach(((e4, s3) => {
                e4 >= "0" && e4 <= "9" ? t3.push(e4) : "." !== e4 || i3 ? "-" !== e4 || n2 || 0 !== t3.length || (t3.push(e4), n2 = true) : (t3.push(e4), i3 = true);
              }));
              const s2 = t3.join(""), o2 = parseFloat(s2);
              return isNaN(o2) ? null : o2;
            }
            build() {
              this.input && this.buildInput(), this.increment && this.buildIncrement(), this.decrement && this.buildDecrement(), this.inputValue <= this.minInputValue && (this.inputValue = this.minInputValue, this.input.value = `${this.minInputValue}`), this.inputValue <= this.minInputValue && this.changeValue(), this.input.hasAttribute("disabled") && this.disableButtons();
            }
            buildInput() {
              this.onInputInputListener = () => this.inputInput(), this.input.addEventListener("input", this.onInputInputListener);
            }
            buildIncrement() {
              this.onIncrementClickListener = () => this.incrementClick(), this.increment.addEventListener("click", this.onIncrementClickListener);
            }
            buildDecrement() {
              this.onDecrementClickListener = () => this.decrementClick(), this.decrement.addEventListener("click", this.onDecrementClickListener);
            }
            changeValue(e3 = "none") {
              var t3, i3;
              const n2 = { inputValue: this.inputValue }, o2 = null !== (t3 = this.minInputValue) && void 0 !== t3 ? t3 : Number.MIN_SAFE_INTEGER, l2 = null !== (i3 = this.maxInputValue) && void 0 !== i3 ? i3 : Number.MAX_SAFE_INTEGER;
              switch (this.inputValue = isNaN(this.inputValue) ? 0 : this.inputValue, e3) {
                case "increment":
                  const e4 = this.inputValue + this.step;
                  this.inputValue = e4 >= o2 && e4 <= l2 ? e4 : l2, this.input.value = this.inputValue.toString();
                  break;
                case "decrement":
                  const t4 = this.inputValue - this.step;
                  this.inputValue = t4 >= o2 && t4 <= l2 ? t4 : o2, this.input.value = this.inputValue.toString();
                  break;
                default:
                  const i4 = isNaN(parseInt(this.input.value)) ? 0 : parseInt(this.input.value);
                  this.inputValue = i4 >= l2 ? l2 : i4 <= o2 ? o2 : i4, this.input.value = this.inputValue.toString();
              }
              n2.inputValue = this.inputValue, this.inputValue === o2 ? (this.el.classList.add("disabled"), this.decrement && this.disableButtons("decrement")) : (this.el.classList.remove("disabled"), this.decrement && this.enableButtons("decrement")), this.inputValue === l2 ? (this.el.classList.add("disabled"), this.increment && this.disableButtons("increment")) : (this.el.classList.remove("disabled"), this.increment && this.enableButtons("increment")), this.fireEvent("change", n2), (0, s.dispatch)("change.hs.inputNumber", this.el, n2);
            }
            disableButtons(e3 = "all") {
              "all" === e3 ? ("BUTTON" !== this.increment.tagName && "INPUT" !== this.increment.tagName || this.increment.setAttribute("disabled", "disabled"), "BUTTON" !== this.decrement.tagName && "INPUT" !== this.decrement.tagName || this.decrement.setAttribute("disabled", "disabled")) : "increment" === e3 ? "BUTTON" !== this.increment.tagName && "INPUT" !== this.increment.tagName || this.increment.setAttribute("disabled", "disabled") : "decrement" === e3 && ("BUTTON" !== this.decrement.tagName && "INPUT" !== this.decrement.tagName || this.decrement.setAttribute("disabled", "disabled"));
            }
            enableButtons(e3 = "all") {
              "all" === e3 ? ("BUTTON" !== this.increment.tagName && "INPUT" !== this.increment.tagName || this.increment.removeAttribute("disabled"), "BUTTON" !== this.decrement.tagName && "INPUT" !== this.decrement.tagName || this.decrement.removeAttribute("disabled")) : "increment" === e3 ? "BUTTON" !== this.increment.tagName && "INPUT" !== this.increment.tagName || this.increment.removeAttribute("disabled") : "decrement" === e3 && ("BUTTON" !== this.decrement.tagName && "INPUT" !== this.decrement.tagName || this.decrement.removeAttribute("disabled"));
            }
            destroy() {
              this.el.classList.remove("disabled"), this.increment.removeAttribute("disabled"), this.decrement.removeAttribute("disabled"), this.input.removeEventListener("input", this.onInputInputListener), this.increment.removeEventListener("click", this.onIncrementClickListener), this.decrement.removeEventListener("click", this.onDecrementClickListener), window.$hsInputNumberCollection = window.$hsInputNumberCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsInputNumberCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsInputNumberCollection || (window.$hsInputNumberCollection = []), window.$hsInputNumberCollection && (window.$hsInputNumberCollection = window.$hsInputNumberCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-input-number]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsInputNumberCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSInputNumber = l), t2.default = l;
        }, 347: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = n(i2(961));
          class o extends s.default {
            constructor(e3, t3, i3) {
              var n2;
              super(e3, t3, i3);
              const s2 = e3.getAttribute("data-hs-range-slider"), o2 = s2 ? JSON.parse(s2) : {};
              this.concatOptions = Object.assign(Object.assign(Object.assign({}, o2), t3), { cssClasses: Object.assign(Object.assign({}, noUiSlider.cssClasses), this.processClasses(o2.cssClasses)) }), this.wrapper = this.concatOptions.wrapper || e3.closest(".hs-range-slider-wrapper") || null, this.currentValue = this.concatOptions.currentValue ? Array.from(this.concatOptions.currentValue) : Array.from((null === (n2 = this.wrapper) || void 0 === n2 ? void 0 : n2.querySelectorAll(".hs-range-slider-current-value")) || []), this.icons = this.concatOptions.icons || {}, this.init();
            }
            get formattedValue() {
              const e3 = this.el.noUiSlider.get();
              if (Array.isArray(e3) && this.format) {
                const t3 = [];
                return e3.forEach(((e4) => {
                  t3.push(this.format.to(e4));
                })), t3;
              }
              return this.format ? this.format.to(e3) : e3;
            }
            processClasses(e3) {
              const t3 = {};
              return Object.keys(e3).forEach(((i3) => {
                i3 && (t3[i3] = `${noUiSlider.cssClasses[i3]} ${e3[i3]}`);
              })), t3;
            }
            init() {
              var e3, t3, i3, n2, s2, o2, l, a, r, d, c, h, u;
              this.createCollection(window.$hsRangeSliderCollection, this), ("object" == typeof (null === (e3 = this.concatOptions) || void 0 === e3 ? void 0 : e3.formatter) ? "thousandsSeparatorAndDecimalPoints" === (null === (i3 = null === (t3 = this.concatOptions) || void 0 === t3 ? void 0 : t3.formatter) || void 0 === i3 ? void 0 : i3.type) : "thousandsSeparatorAndDecimalPoints" === (null === (n2 = this.concatOptions) || void 0 === n2 ? void 0 : n2.formatter)) ? this.thousandsSeparatorAndDecimalPointsFormatter() : ("object" == typeof (null === (s2 = this.concatOptions) || void 0 === s2 ? void 0 : s2.formatter) ? "integer" === (null === (l = null === (o2 = this.concatOptions) || void 0 === o2 ? void 0 : o2.formatter) || void 0 === l ? void 0 : l.type) : "integer" === (null === (a = this.concatOptions) || void 0 === a ? void 0 : a.formatter)) ? this.integerFormatter() : "object" == typeof (null === (r = this.concatOptions) || void 0 === r ? void 0 : r.formatter) && ((null === (c = null === (d = this.concatOptions) || void 0 === d ? void 0 : d.formatter) || void 0 === c ? void 0 : c.prefix) || (null === (u = null === (h = this.concatOptions) || void 0 === h ? void 0 : h.formatter) || void 0 === u ? void 0 : u.postfix)) && this.prefixOrPostfixFormatter(), noUiSlider.create(this.el, this.concatOptions), this.currentValue && this.currentValue.length > 0 && this.el.noUiSlider.on("update", ((e4) => {
                this.updateCurrentValue(e4);
              })), this.concatOptions.disabled && this.setDisabled(), this.icons.handle && this.buildHandleIcon();
            }
            formatValue(e3) {
              var t3, i3, n2, s2, o2, l, a, r, d;
              let c = "";
              return "object" == typeof (null === (t3 = this.concatOptions) || void 0 === t3 ? void 0 : t3.formatter) ? ((null === (n2 = null === (i3 = this.concatOptions) || void 0 === i3 ? void 0 : i3.formatter) || void 0 === n2 ? void 0 : n2.prefix) && (c += null === (o2 = null === (s2 = this.concatOptions) || void 0 === s2 ? void 0 : s2.formatter) || void 0 === o2 ? void 0 : o2.prefix), c += e3, (null === (a = null === (l = this.concatOptions) || void 0 === l ? void 0 : l.formatter) || void 0 === a ? void 0 : a.postfix) && (c += null === (d = null === (r = this.concatOptions) || void 0 === r ? void 0 : r.formatter) || void 0 === d ? void 0 : d.postfix)) : c += e3, c;
            }
            integerFormatter() {
              var e3;
              this.format = { to: (e4) => this.formatValue(Math.round(e4)), from: (e4) => Math.round(+e4) }, (null === (e3 = this.concatOptions) || void 0 === e3 ? void 0 : e3.tooltips) && (this.concatOptions.tooltips = this.format);
            }
            prefixOrPostfixFormatter() {
              var e3;
              this.format = { to: (e4) => this.formatValue(e4), from: (e4) => +e4 }, (null === (e3 = this.concatOptions) || void 0 === e3 ? void 0 : e3.tooltips) && (this.concatOptions.tooltips = this.format);
            }
            thousandsSeparatorAndDecimalPointsFormatter() {
              var e3;
              this.format = { to: (e4) => this.formatValue(new Intl.NumberFormat("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 2 }).format(e4)), from: (e4) => parseFloat(e4.replace(/,/g, "")) }, (null === (e3 = this.concatOptions) || void 0 === e3 ? void 0 : e3.tooltips) && (this.concatOptions.tooltips = this.format);
            }
            setDisabled() {
              this.el.setAttribute("disabled", "disabled"), this.el.classList.add("disabled");
            }
            buildHandleIcon() {
              if (!this.icons.handle) return false;
              const e3 = this.el.querySelector(".noUi-handle");
              if (!e3) return false;
              e3.innerHTML = this.icons.handle;
            }
            updateCurrentValue(e3) {
              this.currentValue && 0 !== this.currentValue.length && e3.forEach(((e4, t3) => {
                var i3;
                const n2 = null === (i3 = this.currentValue) || void 0 === i3 ? void 0 : i3[t3];
                if (!n2) return;
                const s2 = this.format ? this.format.to(e4).toString() : e4.toString();
                n2 instanceof HTMLInputElement ? n2.value = s2 : n2.textContent = s2;
              }));
            }
            destroy() {
              this.el.noUiSlider.destroy(), this.format = null, window.$hsRangeSliderCollection = window.$hsRangeSliderCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3 = false) {
              const i3 = window.$hsRangeSliderCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsRangeSliderCollection || (window.$hsRangeSliderCollection = []), window.$hsRangeSliderCollection && (window.$hsRangeSliderCollection = window.$hsRangeSliderCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-range-slider]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsRangeSliderCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new o(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            o.autoInit();
          })), "undefined" != typeof window && (window.HSRangeSlider = o), t2.default = o;
        }, 359: function(e2, t2) {
          !(function(e3) {
            "use strict";
            var t3 = Object.defineProperty, i2 = Object.defineProperties, n = Object.getOwnPropertyDescriptors, s = Object.getOwnPropertySymbols, o = Object.prototype.hasOwnProperty, l = Object.prototype.propertyIsEnumerable, a = (e4, i3, n2) => i3 in e4 ? t3(e4, i3, { enumerable: true, configurable: true, writable: true, value: n2 }) : e4[i3] = n2, r = (e4, t4) => {
              for (var i3 in t4 || (t4 = {})) o.call(t4, i3) && a(e4, i3, t4[i3]);
              if (s) for (var i3 of s(t4)) l.call(t4, i3) && a(e4, i3, t4[i3]);
              return e4;
            }, d = (e4, t4, i3) => (a(e4, "symbol" != typeof t4 ? t4 + "" : t4, i3), i3);
            const c = (e4) => `${e4} is not found, check the first argument passed to new Calendar.`, h = 'The calendar has not been initialized, please initialize it using the "init()" method first.', u = "You specified an incorrect language label or did not specify the required number of values \u200B\u200Bfor \xABlocale.weekdays\xBB or \xABlocale.months\xBB.", p = "The value of the time property can be: false, 12 or 24.", m = "For the \xABmultiple\xBB calendar type, the \xABdisplayMonthsCount\xBB parameter can have a value from 2 to 12, and for all others it cannot be greater than 1.", g = (e4, t4, i3) => {
              e4.context[t4] = i3;
            }, v = (e4) => {
              e4.context.isShowInInputMode && e4.context.currentType && (e4.context.mainElement.dataset.vcCalendarHidden = "", g(e4, "isShowInInputMode", false), e4.context.cleanupHandlers[0] && (e4.context.cleanupHandlers.forEach(((e5) => e5())), g(e4, "cleanupHandlers", [])), e4.onHide && e4.onHide(e4));
            };
            function f(e4) {
              if (!e4 || !e4.getBoundingClientRect) return { top: 0, bottom: 0, left: 0, right: 0 };
              const t4 = e4.getBoundingClientRect(), i3 = document.documentElement;
              return { bottom: t4.bottom, right: t4.right, top: t4.top + window.scrollY - i3.clientTop, left: t4.left + window.scrollX - i3.clientLeft };
            }
            function y() {
              return { vw: Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0), vh: Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0) };
            }
            function b(e4) {
              const { top: t4, left: i3 } = { left: window.scrollX || document.documentElement.scrollLeft || 0, top: window.scrollY || document.documentElement.scrollTop || 0 }, { top: n2, left: s2 } = f(e4), { vh: o2, vw: l2 } = y(), a2 = n2 - t4, r2 = s2 - i3;
              return { top: a2, bottom: o2 - (a2 + e4.clientHeight), left: r2, right: l2 - (r2 + e4.clientWidth) };
            }
            function w(e4, t4, i3 = 5) {
              const n2 = { top: true, bottom: true, left: true, right: true }, s2 = [];
              if (!t4 || !e4) return { canShow: n2, parentPositions: s2 };
              const { bottom: o2, top: l2 } = b(e4), { top: a2, left: r2 } = f(e4), { height: d2, width: c2 } = t4.getBoundingClientRect(), { vh: h2, vw: u2 } = y(), p2 = u2 / 2, m2 = h2 / 2;
              return [{ condition: a2 < m2, position: "top" }, { condition: a2 > m2, position: "bottom" }, { condition: r2 < p2, position: "left" }, { condition: r2 > p2, position: "right" }].forEach((({ condition: e5, position: t5 }) => {
                e5 && s2.push(t5);
              })), Object.assign(n2, { top: d2 <= l2 - i3, bottom: d2 <= o2 - i3, left: c2 <= r2, right: c2 <= u2 - r2 }), { canShow: n2, parentPositions: s2 };
            }
            const C = (e4, t4) => {
              var i3;
              e4.popups && (null == (i3 = Object.entries(e4.popups)) || i3.forEach((([i4, n2]) => ((e5, t5, i5, n3) => {
                var s2;
                const o2 = n3.querySelector(`[data-vc-date="${t5}"]`), l2 = null == o2 ? void 0 : o2.querySelector("[data-vc-date-btn]");
                if (!o2 || !l2) return;
                if ((null == i5 ? void 0 : i5.modifier) && l2.classList.add(...i5.modifier.trim().split(" ")), !(null == i5 ? void 0 : i5.html)) return;
                const a2 = document.createElement("div");
                a2.className = e5.styles.datePopup, a2.dataset.vcDatePopup = "", a2.innerHTML = e5.sanitizerHTML(i5.html), l2.ariaExpanded = "true", l2.ariaLabel = `${l2.ariaLabel}, ${null == (s2 = null == a2 ? void 0 : a2.textContent) ? void 0 : s2.replace(/^\s+|\s+(?=\s)|\s+$/g, "").replace(/&nbsp;/g, " ")}`, o2.appendChild(a2), requestAnimationFrame((() => {
                  if (!a2) return;
                  const { canShow: e6 } = w(o2, a2), t6 = e6.bottom ? o2.offsetHeight : -a2.offsetHeight, i6 = e6.left && !e6.right ? o2.offsetWidth - a2.offsetWidth / 2 : !e6.left && e6.right ? a2.offsetWidth / 2 : 0;
                  Object.assign(a2.style, { left: `${i6}px`, top: `${t6}px` });
                }));
              })(e4, i4, n2, t4))));
            }, S = (e4) => /* @__PURE__ */ new Date(`${e4}T00:00:00`), x = (e4) => `${e4.getFullYear()}-${String(e4.getMonth() + 1).padStart(2, "0")}-${String(e4.getDate()).padStart(2, "0")}`, L = (e4) => e4.reduce(((e5, t4) => {
              if (t4 instanceof Date || "number" == typeof t4) {
                const i3 = t4 instanceof Date ? t4 : new Date(t4);
                e5.push(i3.toISOString().substring(0, 10));
              } else t4.match(/^(\d{4}-\d{2}-\d{2})$/g) ? e5.push(t4) : t4.replace(/(\d{4}-\d{2}-\d{2}).*?(\d{4}-\d{2}-\d{2})/g, ((t5, i3, n2) => {
                const s2 = S(i3), o2 = S(n2), l2 = new Date(s2.getTime());
                for (; l2 <= o2; l2.setDate(l2.getDate() + 1)) e5.push(x(l2));
                return t5;
              }));
              return e5;
            }), []), T = (e4, t4, i3, n2 = "") => {
              t4 ? e4.setAttribute(i3, n2) : e4.getAttribute(i3) === n2 && e4.removeAttribute(i3);
            }, E = (e4, t4, i3, n2, s2, o2, l2) => {
              var a2, r2, d2, c2;
              const h2 = S(e4.context.displayDateMin) > S(o2) || S(e4.context.displayDateMax) < S(o2) || (null == (a2 = e4.context.disableDates) ? void 0 : a2.includes(o2)) || !e4.selectionMonthsMode && "current" !== l2 || !e4.selectionYearsMode && S(o2).getFullYear() !== t4;
              T(i3, h2, "data-vc-date-disabled"), n2 && T(n2, h2, "aria-disabled", "true"), n2 && T(n2, h2, "tabindex", "-1"), T(i3, !e4.disableToday && e4.context.dateToday === o2, "data-vc-date-today"), T(i3, !e4.disableToday && e4.context.dateToday === o2, "aria-current", "date"), T(i3, null == (r2 = e4.selectedWeekends) ? void 0 : r2.includes(s2), "data-vc-date-weekend");
              const u2 = (null == (d2 = e4.selectedHolidays) ? void 0 : d2[0]) ? L(e4.selectedHolidays) : [];
              if (T(i3, u2.includes(o2), "data-vc-date-holiday"), (null == (c2 = e4.context.selectedDates) ? void 0 : c2.includes(o2)) ? (i3.setAttribute("data-vc-date-selected", ""), n2 && n2.setAttribute("aria-selected", "true"), e4.context.selectedDates.length > 1 && "multiple-ranged" === e4.selectionDatesMode && (e4.context.selectedDates[0] === o2 && e4.context.selectedDates[e4.context.selectedDates.length - 1] === o2 ? i3.setAttribute("data-vc-date-selected", "first-and-last") : e4.context.selectedDates[0] === o2 ? i3.setAttribute("data-vc-date-selected", "first") : e4.context.selectedDates[e4.context.selectedDates.length - 1] === o2 && i3.setAttribute("data-vc-date-selected", "last"), e4.context.selectedDates[0] !== o2 && e4.context.selectedDates[e4.context.selectedDates.length - 1] !== o2 && i3.setAttribute("data-vc-date-selected", "middle"))) : i3.hasAttribute("data-vc-date-selected") && (i3.removeAttribute("data-vc-date-selected"), n2 && n2.removeAttribute("aria-selected")), !e4.context.disableDates.includes(o2) && e4.enableEdgeDatesOnly && e4.context.selectedDates.length > 1 && "multiple-ranged" === e4.selectionDatesMode) {
                const t5 = S(e4.context.selectedDates[0]), n3 = S(e4.context.selectedDates[e4.context.selectedDates.length - 1]), s3 = S(o2);
                T(i3, s3 > t5 && s3 < n3, "data-vc-date-selected", "middle");
              }
            }, k = (e4, t4) => {
              const i3 = S(e4), n2 = (i3.getDay() - t4 + 7) % 7;
              i3.setDate(i3.getDate() + 4 - n2);
              const s2 = new Date(i3.getFullYear(), 0, 1), o2 = Math.ceil(((+i3 - +s2) / 864e5 + 1) / 7);
              return { year: i3.getFullYear(), week: o2 };
            }, I = (e4, t4, i3, n2, s2, o2) => {
              const l2 = S(s2).getDay(), a2 = "string" == typeof e4.locale && e4.locale.length ? e4.locale : "en", r2 = document.createElement("div");
              let d2;
              r2.className = e4.styles.date, r2.dataset.vcDate = s2, r2.dataset.vcDateMonth = o2, r2.dataset.vcDateWeekDay = String(l2), ("current" === o2 || e4.displayDatesOutside) && (d2 = document.createElement("button"), d2.className = e4.styles.dateBtn, d2.type = "button", d2.role = "gridcell", d2.ariaLabel = ((e5, t5, i4) => (/* @__PURE__ */ new Date(`${e5}T00:00:00.000Z`)).toLocaleString(t5, i4))(s2, a2, { dateStyle: "long", timeZone: "UTC" }), d2.dataset.vcDateBtn = "", d2.innerText = String(n2), r2.appendChild(d2)), e4.enableWeekNumbers && ((e5, t5, i4) => {
                const n3 = k(i4, e5.firstWeekday);
                n3 && (t5.dataset.vcDateWeekNumber = String(n3.week));
              })(e4, r2, s2), ((e5, t5, i4) => {
                var n3, s3, o3, l3, a3;
                const r3 = null == (n3 = e5.disableWeekdays) ? void 0 : n3.includes(i4), d3 = e5.disableAllDates && !!(null == (s3 = e5.context.enableDates) ? void 0 : s3[0]);
                !r3 && !d3 || (null == (o3 = e5.context.enableDates) ? void 0 : o3.includes(t5)) || (null == (l3 = e5.context.disableDates) ? void 0 : l3.includes(t5)) || (e5.context.disableDates.push(t5), null == (a3 = e5.context.disableDates) || a3.sort(((e6, t6) => +new Date(e6) - +new Date(t6))));
              })(e4, s2, l2), E(e4, t4, r2, d2, l2, s2, o2), i3.appendChild(r2), e4.onCreateDateEls && e4.onCreateDateEls(e4, r2);
            }, A = (e4) => {
              const t4 = new Date(e4.context.selectedYear, e4.context.selectedMonth, 1), i3 = e4.context.mainElement.querySelectorAll('[data-vc="dates"]'), n2 = e4.context.mainElement.querySelectorAll('[data-vc-week="numbers"]');
              i3.forEach(((i4, s2) => {
                e4.selectionDatesMode || (i4.dataset.vcDatesDisabled = ""), i4.textContent = "";
                const o2 = new Date(t4);
                o2.setMonth(o2.getMonth() + s2);
                const l2 = o2.getMonth(), a2 = o2.getFullYear(), r2 = (new Date(a2, l2, 1).getDay() - e4.firstWeekday + 7) % 7, d2 = new Date(a2, l2 + 1, 0).getDate();
                ((e5, t5, i5, n3, s3) => {
                  let o3 = new Date(i5, n3, 0).getDate() - (s3 - 1);
                  const l3 = 0 === n3 ? i5 - 1 : i5, a3 = 0 === n3 ? 12 : n3 < 10 ? `0${n3}` : n3;
                  for (let n4 = s3; n4 > 0; n4--, o3++) I(e5, i5, t5, o3, `${l3}-${a3}-${o3}`, "prev");
                })(e4, i4, a2, l2, r2), ((e5, t5, i5, n3, s3) => {
                  for (let o3 = 1; o3 <= i5; o3++) {
                    const i6 = new Date(n3, s3, o3);
                    I(e5, n3, t5, o3, x(i6), "current");
                  }
                })(e4, i4, d2, a2, l2), ((e5, t5, i5, n3, s3, o3) => {
                  const l3 = o3 + i5, a3 = 7 * Math.ceil(l3 / 7) - l3, r3 = s3 + 1 === 12 ? n3 + 1 : n3, d3 = s3 + 1 === 12 ? "01" : s3 + 2 < 10 ? `0${s3 + 2}` : s3 + 2;
                  for (let i6 = 1; i6 <= a3; i6++) {
                    const s4 = i6 < 10 ? `0${i6}` : String(i6);
                    I(e5, n3, t5, i6, `${r3}-${d3}-${s4}`, "next");
                  }
                })(e4, i4, d2, a2, l2, r2), C(e4, i4), ((e5, t5, i5, n3, s3) => {
                  if (!e5.enableWeekNumbers) return;
                  n3.textContent = "";
                  const o3 = document.createElement("b");
                  o3.className = e5.styles.weekNumbersTitle, o3.innerText = "#", o3.dataset.vcWeekNumbers = "title", n3.appendChild(o3);
                  const l3 = document.createElement("div");
                  l3.className = e5.styles.weekNumbersContent, l3.dataset.vcWeekNumbers = "content", n3.appendChild(l3);
                  const a3 = document.createElement("button");
                  a3.type = "button", a3.className = e5.styles.weekNumber;
                  const r3 = s3.querySelectorAll("[data-vc-date]"), d3 = Math.ceil((t5 + i5) / 7);
                  for (let t6 = 0; t6 < d3; t6++) {
                    const i6 = r3[0 === t6 ? 6 : 7 * t6].dataset.vcDate, n4 = k(i6, e5.firstWeekday);
                    if (!n4) return;
                    const s4 = a3.cloneNode(true);
                    s4.innerText = String(n4.week), s4.dataset.vcWeekNumber = String(n4.week), s4.dataset.vcWeekYear = String(n4.year), s4.role = "rowheader", s4.ariaLabel = `${n4.week}`, l3.appendChild(s4);
                  }
                })(e4, r2, d2, n2[s2], i4);
              }));
            }, M = (e4) => `
  <div class="${e4.styles.header}" data-vc="header" role="toolbar" aria-label="${e4.labels.navigation}">
    <#ArrowPrev [month] />
    <div class="${e4.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [month] />
  </div>
  <div class="${e4.styles.wrapper}" data-vc="wrapper">
    <#WeekNumbers />
    <div class="${e4.styles.content}" data-vc="content">
      <#Week />
      <#Dates />
      <#DateRangeTooltip />
    </div>
  </div>
  <#ControlTime />
`, O = (e4) => `
  <div class="${e4.styles.header}" data-vc="header" role="toolbar" aria-label="${e4.labels.navigation}">
    <div class="${e4.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
  </div>
  <div class="${e4.styles.wrapper}" data-vc="wrapper">
    <div class="${e4.styles.content}" data-vc="content">
      <#Months />
    </div>
  </div>
`, D = (e4) => `
  <div class="${e4.styles.controls}" data-vc="controls" role="toolbar" aria-label="${e4.labels.navigation}">
    <#ArrowPrev [month] />
    <#ArrowNext [month] />
  </div>
  <div class="${e4.styles.grid}" data-vc="grid">
    <#Multiple>
      <div class="${e4.styles.column}" data-vc="column" role="region">
        <div class="${e4.styles.header}" data-vc="header">
          <div class="${e4.styles.headerContent}" data-vc-header="content">
            <#Month />
            <#Year />
          </div>
        </div>
        <div class="${e4.styles.wrapper}" data-vc="wrapper">
          <#WeekNumbers />
          <div class="${e4.styles.content}" data-vc="content">
            <#Week />
            <#Dates />
          </div>
        </div>
      </div>
    <#/Multiple>
    <#DateRangeTooltip />
  </div>
  <#ControlTime />
`, P = (e4) => `
  <div class="${e4.styles.header}" data-vc="header" role="toolbar" aria-label="${e4.labels.navigation}">
    <#ArrowPrev [year] />
    <div class="${e4.styles.headerContent}" data-vc-header="content">
      <#Month />
      <#Year />
    </div>
    <#ArrowNext [year] />
  </div>
  <div class="${e4.styles.wrapper}" data-vc="wrapper">
    <div class="${e4.styles.content}" data-vc="content">
      <#Years />
    </div>
  </div>
`, $ = { ArrowNext: (e4, t4) => `<button type="button" class="${e4.styles.arrowNext}" data-vc-arrow="next" aria-label="${e4.labels.arrowNext[t4]}"></button>`, ArrowPrev: (e4, t4) => `<button type="button" class="${e4.styles.arrowPrev}" data-vc-arrow="prev" aria-label="${e4.labels.arrowPrev[t4]}"></button>`, ControlTime: (e4) => e4.selectionTimeMode ? `<div class="${e4.styles.time}" data-vc="time" role="group" aria-label="${e4.labels.selectingTime}"></div>` : "", Dates: (e4) => `<div class="${e4.styles.dates}" data-vc="dates" role="grid" aria-live="assertive" aria-label="${e4.labels.dates}" ${"multiple" === e4.type ? "aria-multiselectable" : ""}></div>`, DateRangeTooltip: (e4) => e4.onCreateDateRangeTooltip ? `<div class="${e4.styles.dateRangeTooltip}" data-vc-date-range-tooltip="hidden"></div>` : "", Month: (e4) => `<button type="button" class="${e4.styles.month}" data-vc="month"></button>`, Months: (e4) => `<div class="${e4.styles.months}" data-vc="months" role="grid" aria-live="assertive" aria-label="${e4.labels.months}"></div>`, Week: (e4) => `<div class="${e4.styles.week}" data-vc="week" role="row" aria-label="${e4.labels.week}"></div>`, WeekNumbers: (e4) => e4.enableWeekNumbers ? `<div class="${e4.styles.weekNumbers}" data-vc-week="numbers" role="row" aria-label="${e4.labels.weekNumber}"></div>` : "", Year: (e4) => `<button type="button" class="${e4.styles.year}" data-vc="year"></button>`, Years: (e4) => `<div class="${e4.styles.years}" data-vc="years" role="grid" aria-live="assertive" aria-label="${e4.labels.years}"></div>` }, H = (e4, t4) => t4.replace(/[\n\t]/g, "").replace(/<#(?!\/?Multiple)(.*?)>/g, ((t5, i3) => {
              const n2 = (i3.match(/\[(.*?)\]/) || [])[1], s2 = i3.replace(/[/\s\n\t]|\[(.*?)\]/g, ""), o2 = $[s2], l2 = o2 ? o2(e4, null != n2 ? n2 : null) : "";
              return e4.sanitizerHTML(l2);
            })).replace(/[\n\t]/g, ""), N = (e4, t4) => {
              const i3 = { default: M, month: O, year: P, multiple: D };
              if (Object.keys(i3).forEach(((t5) => {
                const n2 = t5;
                e4.layouts[n2].length || (e4.layouts[n2] = i3[n2](e4));
              })), e4.context.mainElement.className = e4.styles.calendar, e4.context.mainElement.dataset.vc = "calendar", e4.context.mainElement.dataset.vcType = e4.context.currentType, e4.context.mainElement.role = "application", e4.context.mainElement.tabIndex = 0, e4.context.mainElement.ariaLabel = e4.labels.application, "multiple" !== e4.context.currentType) {
                if ("multiple" === e4.type && t4) {
                  const i4 = e4.context.mainElement.querySelector('[data-vc="controls"]'), n2 = e4.context.mainElement.querySelector('[data-vc="grid"]'), s2 = t4.closest('[data-vc="column"]');
                  return i4 && e4.context.mainElement.removeChild(i4), n2 && (n2.dataset.vcGrid = "hidden"), s2 && (s2.dataset.vcColumn = e4.context.currentType), void (s2 && (s2.innerHTML = e4.sanitizerHTML(H(e4, e4.layouts[e4.context.currentType]))));
                }
                e4.context.mainElement.innerHTML = e4.sanitizerHTML(H(e4, e4.layouts[e4.context.currentType]));
              } else e4.context.mainElement.innerHTML = e4.sanitizerHTML(((e5, t5) => t5.replace(new RegExp("<#Multiple>(.*?)<#\\/Multiple>", "gs"), ((t6, i4) => {
                const n2 = Array(e5.context.displayMonthsCount).fill(i4).join("");
                return e5.sanitizerHTML(n2);
              })).replace(/[\n\t]/g, ""))(e4, H(e4, e4.layouts[e4.context.currentType])));
            }, B = (e4, t4, i3, n2) => {
              e4.style.visibility = i3 ? "hidden" : "", t4.style.visibility = n2 ? "hidden" : "";
            }, q = (e4) => {
              if ("month" === e4.context.currentType) return;
              const t4 = e4.context.mainElement.querySelector('[data-vc-arrow="prev"]'), i3 = e4.context.mainElement.querySelector('[data-vc-arrow="next"]');
              if (!t4 || !i3) return;
              const n2 = { default: () => ((e5, t5, i4) => {
                const n3 = S(x(new Date(e5.context.selectedYear, e5.context.selectedMonth, 1))), s2 = new Date(n3.getTime()), o2 = new Date(n3.getTime());
                s2.setMonth(s2.getMonth() - e5.monthsToSwitch), o2.setMonth(o2.getMonth() + e5.monthsToSwitch);
                const l2 = S(e5.context.dateMin), a2 = S(e5.context.dateMax);
                e5.selectionYearsMode || (l2.setFullYear(n3.getFullYear()), a2.setFullYear(n3.getFullYear()));
                const r2 = !e5.selectionMonthsMode || s2.getFullYear() < l2.getFullYear() || s2.getFullYear() === l2.getFullYear() && s2.getMonth() < l2.getMonth(), d2 = !e5.selectionMonthsMode || o2.getFullYear() > a2.getFullYear() || o2.getFullYear() === a2.getFullYear() && o2.getMonth() > a2.getMonth() - (e5.context.displayMonthsCount - 1);
                B(t5, i4, r2, d2);
              })(e4, t4, i3), year: () => ((e5, t5, i4) => {
                const n3 = S(e5.context.dateMin), s2 = S(e5.context.dateMax), o2 = !!(n3.getFullYear() && e5.context.displayYear - 7 <= n3.getFullYear()), l2 = !!(s2.getFullYear() && e5.context.displayYear + 7 >= s2.getFullYear());
                B(t5, i4, o2, l2);
              })(e4, t4, i3) };
              n2["multiple" === e4.context.currentType ? "default" : e4.context.currentType]();
            }, F = (e4) => {
              const t4 = e4.context.mainElement.querySelectorAll('[data-vc="month"]'), i3 = e4.context.mainElement.querySelectorAll('[data-vc="year"]'), n2 = new Date(e4.context.selectedYear, e4.context.selectedMonth, 1);
              [t4, i3].forEach(((t5) => null == t5 ? void 0 : t5.forEach(((t6, i4) => ((e5, t7, i5, n3, s2) => {
                const o2 = new Date(n3.setFullYear(e5.context.selectedYear, e5.context.selectedMonth + i5)).getFullYear(), l2 = new Date(n3.setMonth(e5.context.selectedMonth + i5)).getMonth(), a2 = e5.context.locale.months.long[l2], r2 = t7.closest('[data-vc="column"]');
                r2 && (r2.ariaLabel = `${a2} ${o2}`);
                const d2 = { month: { id: l2, label: a2 }, year: { id: o2, label: o2 } };
                t7.innerText = String(d2[s2].label), t7.dataset[`vc${s2.charAt(0).toUpperCase() + s2.slice(1)}`] = String(d2[s2].id), t7.ariaLabel = `${e5.labels[s2]} ${d2[s2].label}`;
                const c2 = { month: e5.selectionMonthsMode, year: e5.selectionYearsMode }, h2 = false === c2[s2] || "only-arrows" === c2[s2];
                h2 && (t7.tabIndex = -1), t7.disabled = h2;
              })(e4, t6, i4, n2, t6.dataset.vc)))));
            }, _2 = (e4, t4, i3, n2, s2) => {
              var o2;
              const l2 = { month: "[data-vc-months-month]", year: "[data-vc-years-year]" }, a2 = { month: { selected: "data-vc-months-month-selected", aria: "aria-selected", value: "vcMonthsMonth", selectedProperty: "selectedMonth" }, year: { selected: "data-vc-years-year-selected", aria: "aria-selected", value: "vcYearsYear", selectedProperty: "selectedYear" } };
              s2 && (null == (o2 = e4.context.mainElement.querySelectorAll(l2[i3])) || o2.forEach(((e5) => {
                e5.removeAttribute(a2[i3].selected), e5.removeAttribute(a2[i3].aria);
              })), g(e4, a2[i3].selectedProperty, Number(t4.dataset[a2[i3].value])), F(e4), "year" === i3 && q(e4)), n2 && (t4.setAttribute(a2[i3].selected, ""), t4.setAttribute(a2[i3].aria, "true"));
            }, R = (e4, t4) => {
              var i3;
              if ("multiple" !== e4.type) return { currentValue: null, columnID: 0 };
              const n2 = e4.context.mainElement.querySelectorAll('[data-vc="column"]'), s2 = Array.from(n2).findIndex(((e5) => e5.closest(`[data-vc-column="${t4}"]`)));
              return { currentValue: s2 >= 0 ? Number(null == (i3 = n2[s2].querySelector(`[data-vc="${t4}"]`)) ? void 0 : i3.getAttribute(`data-vc-${t4}`)) : null, columnID: Math.max(s2, 0) };
            }, V = (e4, t4, i3, n2, s2, o2, l2) => {
              const a2 = t4.cloneNode(false);
              return a2.className = e4.styles.monthsMonth, a2.innerText = n2, a2.ariaLabel = s2, a2.role = "gridcell", a2.dataset.vcMonthsMonth = `${l2}`, o2 && (a2.ariaDisabled = "true"), o2 && (a2.tabIndex = -1), a2.disabled = o2, _2(e4, a2, "month", i3 === l2, false), a2;
            }, j = (e4, t4) => {
              var i3, n2;
              const s2 = null == (i3 = null == t4 ? void 0 : t4.closest('[data-vc="header"]')) ? void 0 : i3.querySelector('[data-vc="year"]'), o2 = s2 ? Number(s2.dataset.vcYear) : e4.context.selectedYear, l2 = (null == t4 ? void 0 : t4.dataset.vcMonth) ? Number(t4.dataset.vcMonth) : e4.context.selectedMonth;
              g(e4, "currentType", "month"), N(e4, t4), F(e4);
              const a2 = e4.context.mainElement.querySelector('[data-vc="months"]');
              if (!e4.selectionMonthsMode || !a2) return;
              const r2 = e4.monthsToSwitch > 1 ? e4.context.locale.months.long.map(((t5, i4) => l2 - e4.monthsToSwitch * i4)).concat(e4.context.locale.months.long.map(((t5, i4) => l2 + e4.monthsToSwitch * i4))).filter(((e5) => e5 >= 0 && e5 <= 12)) : Array.from(Array(12).keys()), d2 = document.createElement("button");
              d2.type = "button";
              for (let t5 = 0; t5 < 12; t5++) {
                const i4 = S(e4.context.dateMin), n3 = S(e4.context.dateMax), s3 = e4.context.displayMonthsCount - 1, { columnID: c2 } = R(e4, "month"), h2 = o2 <= i4.getFullYear() && t5 < i4.getMonth() + c2 || o2 >= n3.getFullYear() && t5 > n3.getMonth() - s3 + c2 || o2 > n3.getFullYear() || t5 !== l2 && !r2.includes(t5), u2 = V(e4, d2, l2, e4.context.locale.months.short[t5], e4.context.locale.months.long[t5], h2, t5);
                a2.appendChild(u2), e4.onCreateMonthEls && e4.onCreateMonthEls(e4, u2);
              }
              null == (n2 = e4.context.mainElement.querySelector("[data-vc-months-month]:not([disabled])")) || n2.focus();
            }, z = (e4, t4, i3, n2, s2) => `
  <label class="${t4}" data-vc-time-input="${e4}">
    <input type="text" name="${e4}" maxlength="2" aria-label="${i3[`input${e4.charAt(0).toUpperCase() + e4.slice(1)}`]}" value="${n2}" ${s2 ? "disabled" : ""}>
  </label>
`, W = (e4, t4, i3, n2, s2, o2, l2) => `
  <label class="${t4}" data-vc-time-range="${e4}">
    <input type="range" name="${e4}" min="${n2}" max="${s2}" step="${o2}" aria-label="${i3[`range${e4.charAt(0).toUpperCase() + e4.slice(1)}`]}" value="${l2}">
  </label>
`, U = (e4, t4, i3, n2) => {
              ({ hour: () => g(e4, "selectedHours", i3), minute: () => g(e4, "selectedMinutes", i3) })[n2](), g(e4, "selectedTime", `${e4.context.selectedHours}:${e4.context.selectedMinutes}${e4.context.selectedKeeping ? ` ${e4.context.selectedKeeping}` : ""}`), e4.onChangeTime && e4.onChangeTime(e4, t4, false), e4.inputMode && e4.context.inputElement && e4.context.mainElement && e4.onChangeToInput && e4.onChangeToInput(e4, t4);
            }, Y = (e4, t4) => {
              var i3;
              return (null == (i3 = { 0: { AM: "00", PM: "12" }, 1: { AM: "01", PM: "13" }, 2: { AM: "02", PM: "14" }, 3: { AM: "03", PM: "15" }, 4: { AM: "04", PM: "16" }, 5: { AM: "05", PM: "17" }, 6: { AM: "06", PM: "18" }, 7: { AM: "07", PM: "19" }, 8: { AM: "08", PM: "20" }, 9: { AM: "09", PM: "21" }, 10: { AM: "10", PM: "22" }, 11: { AM: "11", PM: "23" }, 12: { AM: "00", PM: "12" } }[Number(e4)]) ? void 0 : i3[t4]) || String(e4);
            }, K = (e4) => ({ 0: "12", 13: "01", 14: "02", 15: "03", 16: "04", 17: "05", 18: "06", 19: "07", 20: "08", 21: "09", 22: "10", 23: "11" })[Number(e4)] || String(e4), Q = (e4, t4, i3, n2) => {
              e4.value = i3, t4.value = n2;
            }, J = (e4, t4, i3, n2, s2, o2, l2) => {
              const a2 = { hour: (a3, r3, d2) => {
                if (!e4.selectionTimeMode) return;
                const c2 = { 12: () => {
                  if (!e4.context.selectedKeeping) return;
                  const c3 = Number(Y(r3, e4.context.selectedKeeping));
                  if (!(c3 <= o2 && c3 >= l2)) return Q(i3, t4, e4.context.selectedHours, e4.context.selectedHours), void (e4.onChangeTime && e4.onChangeTime(e4, d2, true));
                  Q(i3, t4, K(r3), Y(r3, e4.context.selectedKeeping)), a3 > 12 && ((e5, t5, i4) => {
                    t5 && i4 && (g(e5, "selectedKeeping", i4), t5.innerText = i4);
                  })(e4, n2, "PM"), U(e4, d2, K(r3), s2);
                }, 24: () => {
                  if (!(a3 <= o2 && a3 >= l2)) return Q(i3, t4, e4.context.selectedHours, e4.context.selectedHours), void (e4.onChangeTime && e4.onChangeTime(e4, d2, true));
                  Q(i3, t4, r3, r3), U(e4, d2, r3, s2);
                } };
                c2[e4.selectionTimeMode]();
              }, minute: (n3, a3, r3) => {
                if (!(n3 <= o2 && n3 >= l2)) return i3.value = e4.context.selectedMinutes, void (e4.onChangeTime && e4.onChangeTime(e4, r3, true));
                i3.value = a3, t4.value = a3, U(e4, r3, a3, s2);
              } }, r2 = (e5) => {
                const t5 = Number(i3.value), n3 = i3.value.padStart(2, "0");
                a2[s2] && a2[s2](t5, n3, e5);
              };
              return i3.addEventListener("change", r2), () => {
                i3.removeEventListener("change", r2);
              };
            }, Z = (e4, t4, i3, n2, s2) => {
              const o2 = (o3) => {
                const l2 = Number(t4.value), a2 = t4.value.padStart(2, "0"), r2 = "hour" === s2, d2 = 24 === e4.selectionTimeMode, c2 = l2 > 0 && l2 < 12;
                r2 && !d2 && ((e5, t5, i4) => {
                  t5 && (g(e5, "selectedKeeping", i4), t5.innerText = i4);
                })(e4, n2, 0 === l2 || c2 ? "AM" : "PM"), ((e5, t5, i4, n3, s3) => {
                  t5.value = s3, U(e5, i4, s3, n3);
                })(e4, i3, o3, s2, !r2 || d2 || c2 ? a2 : K(t4.value));
              };
              return t4.addEventListener("input", o2), () => {
                t4.removeEventListener("input", o2);
              };
            }, G = (e4) => e4.setAttribute("data-vc-input-focus", ""), X = (e4) => e4.removeAttribute("data-vc-input-focus"), ee = (e4, t4) => {
              const i3 = t4.querySelector('[data-vc-time-range="hour"] input[name="hour"]'), n2 = t4.querySelector('[data-vc-time-range="minute"] input[name="minute"]'), s2 = t4.querySelector('[data-vc-time-input="hour"] input[name="hour"]'), o2 = t4.querySelector('[data-vc-time-input="minute"] input[name="minute"]'), l2 = t4.querySelector('[data-vc-time="keeping"]');
              if (!(i3 && n2 && s2 && o2)) return;
              const a2 = (e5) => {
                e5.target === i3 && G(s2), e5.target === n2 && G(o2);
              }, r2 = (e5) => {
                e5.target === i3 && X(s2), e5.target === n2 && X(o2);
              };
              return t4.addEventListener("mouseover", a2), t4.addEventListener("mouseout", r2), J(e4, i3, s2, l2, "hour", e4.timeMaxHour, e4.timeMinHour), J(e4, n2, o2, l2, "minute", e4.timeMaxMinute, e4.timeMinMinute), Z(e4, i3, s2, l2, "hour"), Z(e4, n2, o2, l2, "minute"), l2 && ((e5, t5, i4, n3, s3) => {
                const o3 = (o4) => {
                  const l3 = "AM" === e5.context.selectedKeeping ? "PM" : "AM", a3 = Y(e5.context.selectedHours, l3);
                  Number(a3) <= n3 && Number(a3) >= s3 ? (g(e5, "selectedKeeping", l3), i4.value = a3, U(e5, o4, e5.context.selectedHours, "hour"), t5.ariaLabel = `${e5.labels.btnKeeping} ${e5.context.selectedKeeping}`, t5.innerText = e5.context.selectedKeeping) : e5.onChangeTime && e5.onChangeTime(e5, o4, true);
                };
                t5.addEventListener("click", o3);
              })(e4, l2, i3, e4.timeMaxHour, e4.timeMinHour), () => {
                t4.removeEventListener("mouseover", a2), t4.removeEventListener("mouseout", r2);
              };
            }, te = (e4) => {
              const t4 = e4.selectedWeekends ? [...e4.selectedWeekends] : [], i3 = [...e4.context.locale.weekdays.long].reduce(((i4, n3, s2) => [...i4, { id: s2, titleShort: e4.context.locale.weekdays.short[s2], titleLong: n3, isWeekend: t4.includes(s2) }]), []), n2 = [...i3.slice(e4.firstWeekday), ...i3.slice(0, e4.firstWeekday)];
              e4.context.mainElement.querySelectorAll('[data-vc="week"]').forEach(((t5) => {
                const i4 = e4.onClickWeekDay ? document.createElement("button") : document.createElement("b");
                e4.onClickWeekDay && (i4.type = "button"), n2.forEach(((n3) => {
                  const s2 = i4.cloneNode(true);
                  s2.innerText = n3.titleShort, s2.className = e4.styles.weekDay, s2.role = "columnheader", s2.ariaLabel = n3.titleLong, s2.dataset.vcWeekDay = String(n3.id), n3.isWeekend && (s2.dataset.vcWeekDayOff = ""), t5.appendChild(s2);
                }));
              }));
            }, ie = (e4, t4, i3, n2, s2) => {
              const o2 = t4.cloneNode(false);
              return o2.className = e4.styles.yearsYear, o2.innerText = String(s2), o2.ariaLabel = String(s2), o2.role = "gridcell", o2.dataset.vcYearsYear = `${s2}`, n2 && (o2.ariaDisabled = "true"), n2 && (o2.tabIndex = -1), o2.disabled = n2, _2(e4, o2, "year", i3 === s2, false), o2;
            }, ne = (e4, t4) => {
              var i3;
              const n2 = (null == t4 ? void 0 : t4.dataset.vcYear) ? Number(t4.dataset.vcYear) : e4.context.selectedYear;
              g(e4, "currentType", "year"), N(e4, t4), F(e4), q(e4);
              const s2 = e4.context.mainElement.querySelector('[data-vc="years"]');
              if (!e4.selectionYearsMode || !s2) return;
              const o2 = "multiple" !== e4.type || e4.context.selectedYear === n2 ? 0 : 1, l2 = document.createElement("button");
              l2.type = "button";
              for (let t5 = e4.context.displayYear - 7; t5 < e4.context.displayYear + 8; t5++) {
                const i4 = t5 < S(e4.context.dateMin).getFullYear() + o2 || t5 > S(e4.context.dateMax).getFullYear(), a2 = ie(e4, l2, n2, i4, t5);
                s2.appendChild(a2), e4.onCreateYearEls && e4.onCreateYearEls(e4, a2);
              }
              null == (i3 = e4.context.mainElement.querySelector("[data-vc-years-year]:not([disabled])")) || i3.focus();
            }, se = { value: false, set: () => se.value = true, check: () => se.value }, oe = (e4, t4) => e4.dataset.vcTheme = t4, le = (e4, t4) => {
              if (oe(e4.context.mainElement, t4.matches ? "dark" : "light"), "system" !== e4.selectedTheme || se.check()) return;
              const i3 = (e5) => {
                const t5 = document.querySelectorAll('[data-vc="calendar"]');
                null == t5 || t5.forEach(((t6) => oe(t6, e5.matches ? "dark" : "light")));
              };
              t4.addEventListener ? t4.addEventListener("change", i3) : t4.addListener(i3), se.set();
            }, ae = (e4, t4) => {
              const i3 = e4.themeAttrDetect.length ? document.querySelector(e4.themeAttrDetect) : null, n2 = e4.themeAttrDetect.replace(/^.*\[(.+)\]/g, ((e5, t5) => t5));
              if (!i3 || "system" === i3.getAttribute(n2)) return void le(e4, t4);
              const s2 = i3.getAttribute(n2);
              s2 ? (oe(e4.context.mainElement, s2), ((e5, t5, i4) => {
                new MutationObserver(((e6) => {
                  for (let n3 = 0; n3 < e6.length; n3++) if (e6[n3].attributeName === t5) {
                    i4();
                    break;
                  }
                })).observe(e5, { attributes: true });
              })(i3, n2, (() => {
                const t5 = i3.getAttribute(n2);
                t5 && oe(e4.context.mainElement, t5);
              }))) : le(e4, t4);
            }, re = (e4) => e4.charAt(0).toUpperCase() + e4.slice(1).replace(/\./, ""), de = (e4) => {
              var t4, i3, n2, s2, o2, l2, a2, d2;
              if (!(e4.context.locale.weekdays.short[6] && e4.context.locale.weekdays.long[6] && e4.context.locale.months.short[11] && e4.context.locale.months.long[11])) if ("string" == typeof e4.locale) {
                if ("string" == typeof e4.locale && !e4.locale.length) throw new Error(u);
                Array.from({ length: 7 }, ((t5, i4) => ((e5, t6, i5) => {
                  const n3 = /* @__PURE__ */ new Date(`1978-01-0${t6 + 1}T00:00:00.000Z`), s3 = n3.toLocaleString(i5, { weekday: "short", timeZone: "UTC" }), o3 = n3.toLocaleString(i5, { weekday: "long", timeZone: "UTC" });
                  e5.context.locale.weekdays.short.push(re(s3)), e5.context.locale.weekdays.long.push(re(o3));
                })(e4, i4, e4.locale))), Array.from({ length: 12 }, ((t5, i4) => ((e5, t6, i5) => {
                  const n3 = /* @__PURE__ */ new Date(`1978-${String(t6 + 1).padStart(2, "0")}-01T00:00:00.000Z`), s3 = n3.toLocaleString(i5, { month: "short", timeZone: "UTC" }), o3 = n3.toLocaleString(i5, { month: "long", timeZone: "UTC" });
                  e5.context.locale.months.short.push(re(s3)), e5.context.locale.months.long.push(re(o3));
                })(e4, i4, e4.locale)));
              } else {
                if (!((null == (i3 = null == (t4 = e4.locale) ? void 0 : t4.weekdays) ? void 0 : i3.short[6]) && (null == (s2 = null == (n2 = e4.locale) ? void 0 : n2.weekdays) ? void 0 : s2.long[6]) && (null == (l2 = null == (o2 = e4.locale) ? void 0 : o2.months) ? void 0 : l2.short[11]) && (null == (d2 = null == (a2 = e4.locale) ? void 0 : a2.months) ? void 0 : d2.long[11]))) throw new Error(u);
                g(e4, "locale", r({}, e4.locale));
              }
            }, ce = (e4) => {
              const t4 = { default: () => {
                te(e4), A(e4);
              }, multiple: () => {
                te(e4), A(e4);
              }, month: () => j(e4), year: () => ne(e4) };
              ((e5) => {
                "not all" !== window.matchMedia("(prefers-color-scheme)").media ? "system" === e5.selectedTheme ? ae(e5, window.matchMedia("(prefers-color-scheme: dark)")) : oe(e5.context.mainElement, e5.selectedTheme) : oe(e5.context.mainElement, "light");
              })(e4), de(e4), N(e4), F(e4), q(e4), ((e5) => {
                const t5 = e5.context.mainElement.querySelector('[data-vc="time"]');
                if (!e5.selectionTimeMode || !t5) return;
                const [i3, n2] = [e5.timeMinHour, e5.timeMaxHour], [s2, o2] = [e5.timeMinMinute, e5.timeMaxMinute], l2 = e5.context.selectedKeeping ? Y(e5.context.selectedHours, e5.context.selectedKeeping) : e5.context.selectedHours, a2 = "range" === e5.timeControls;
                var r2;
                t5.innerHTML = e5.sanitizerHTML(`
    <div class="${e5.styles.timeContent}" data-vc-time="content">
      ${z("hour", e5.styles.timeHour, e5.labels, e5.context.selectedHours, a2)}
      ${z("minute", e5.styles.timeMinute, e5.labels, e5.context.selectedMinutes, a2)}
      ${12 === e5.selectionTimeMode ? (r2 = e5.context.selectedKeeping, `<button type="button" class="${e5.styles.timeKeeping}" aria-label="${e5.labels.btnKeeping} ${r2}" data-vc-time="keeping" ${a2 ? "disabled" : ""}>${r2}</button>`) : ""}
    </div>
    <div class="${e5.styles.timeRanges}" data-vc-time="ranges">
      ${W("hour", e5.styles.timeRange, e5.labels, i3, n2, e5.timeStepHour, l2)}
      ${W("minute", e5.styles.timeRange, e5.labels, s2, o2, e5.timeStepMinute, e5.context.selectedMinutes)}
    </div>
  `), ee(e5, t5);
              })(e4), t4[e4.context.currentType]();
            }, he = (e4) => {
              const t4 = (t5) => {
                var i3;
                const n2 = t5.target;
                if (!["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(t5.key) || "button" !== n2.localName) return;
                const s2 = Array.from(e4.context.mainElement.querySelectorAll('[data-vc="calendar"] button')), o2 = s2.indexOf(n2);
                if (-1 === o2) return;
                const l2 = (a2 = s2[o2]).hasAttribute("data-vc-date-btn") ? 7 : a2.hasAttribute("data-vc-months-month") ? 4 : a2.hasAttribute("data-vc-years-year") ? 5 : 1;
                var a2;
                const r2 = (0, { ArrowUp: () => Math.max(0, o2 - l2), ArrowDown: () => Math.min(s2.length - 1, o2 + l2), ArrowLeft: () => Math.max(0, o2 - 1), ArrowRight: () => Math.min(s2.length - 1, o2 + 1) }[t5.key])();
                null == (i3 = s2[r2]) || i3.focus();
              };
              return e4.context.mainElement.addEventListener("keydown", t4), () => e4.context.mainElement.removeEventListener("keydown", t4);
            }, ue = (e4, t4) => {
              const i3 = S(x(new Date(e4.context.selectedYear, e4.context.selectedMonth, 1)));
              ({ prev: () => i3.setMonth(i3.getMonth() - e4.monthsToSwitch), next: () => i3.setMonth(i3.getMonth() + e4.monthsToSwitch) })[t4](), g(e4, "selectedMonth", i3.getMonth()), g(e4, "selectedYear", i3.getFullYear()), F(e4), q(e4), A(e4);
            }, pe = (e4) => void 0 === e4.enableDateToggle || ("function" == typeof e4.enableDateToggle ? e4.enableDateToggle(e4) : e4.enableDateToggle), me = (e4, t4, i3) => {
              const n2 = t4.dataset.vcDate, s2 = t4.closest("[data-vc-date][data-vc-date-selected]"), o2 = pe(e4);
              if (s2 && !o2) return;
              const l2 = s2 ? e4.context.selectedDates.filter(((e5) => e5 !== n2)) : i3 ? [...e4.context.selectedDates, n2] : [n2];
              g(e4, "selectedDates", l2);
            }, ge = (e4, t4, i3) => {
              if (!t4) return;
              if (!i3) return t4.dataset.vcDateRangeTooltip = "hidden", void (t4.textContent = "");
              const n2 = e4.context.mainElement.getBoundingClientRect(), s2 = i3.getBoundingClientRect();
              t4.style.left = s2.left - n2.left + s2.width / 2 + "px", t4.style.top = s2.bottom - n2.top - s2.height + "px", t4.dataset.vcDateRangeTooltip = "visible", t4.innerHTML = e4.sanitizerHTML(e4.onCreateDateRangeTooltip(e4, i3, t4, s2, n2));
            }, ve = { self: null, lastDateEl: null, isHovering: false, rangeMin: void 0, rangeMax: void 0, tooltipEl: null, timeoutId: null }, fe = (e4, t4, i3) => {
              var n2, s2, o2;
              if (!(null == (s2 = null == (n2 = ve.self) ? void 0 : n2.context) ? void 0 : s2.selectedDates[0])) return;
              const l2 = x(e4);
              (null == (o2 = ve.self.context.disableDates) ? void 0 : o2.includes(l2)) || (ve.self.context.mainElement.querySelectorAll(`[data-vc-date="${l2}"]`).forEach(((e5) => e5.dataset.vcDateHover = "")), t4.forEach(((e5) => e5.dataset.vcDateHover = "first")), i3.forEach(((e5) => {
                "first" === e5.dataset.vcDateHover ? e5.dataset.vcDateHover = "first-and-last" : e5.dataset.vcDateHover = "last";
              })));
            }, ye = () => {
              var e4, t4;
              (null == (t4 = null == (e4 = ve.self) ? void 0 : e4.context) ? void 0 : t4.mainElement) && ve.self.context.mainElement.querySelectorAll("[data-vc-date-hover]").forEach(((e5) => e5.removeAttribute("data-vc-date-hover")));
            }, be = (e4) => (t4) => {
              ve.isHovering || (ve.isHovering = true, requestAnimationFrame((() => {
                e4(t4), ve.isHovering = false;
              })));
            }, we = be(((e4) => {
              var t4, i3;
              if (!e4.target || !(null == (i3 = null == (t4 = ve.self) ? void 0 : t4.context) ? void 0 : i3.selectedDates[0])) return;
              if (!e4.target.closest('[data-vc="dates"]')) return ve.lastDateEl = null, ge(ve.self, ve.tooltipEl, null), void ye();
              const n2 = e4.target.closest("[data-vc-date]");
              if (!n2 || ve.lastDateEl === n2) return;
              ve.lastDateEl = n2, ge(ve.self, ve.tooltipEl, n2), ye();
              const s2 = n2.dataset.vcDate, o2 = S(ve.self.context.selectedDates[0]), l2 = S(s2), a2 = ve.self.context.mainElement.querySelectorAll(`[data-vc-date="${ve.self.context.selectedDates[0]}"]`), r2 = ve.self.context.mainElement.querySelectorAll(`[data-vc-date="${s2}"]`), [d2, c2] = o2 < l2 ? [a2, r2] : [r2, a2], [h2, u2] = o2 < l2 ? [o2, l2] : [l2, o2];
              for (let e5 = new Date(h2); e5 <= u2; e5.setDate(e5.getDate() + 1)) fe(e5, d2, c2);
            })), Ce = be(((e4) => {
              const t4 = e4.target.closest("[data-vc-date-selected]");
              if (!t4 && ve.lastDateEl) return ve.lastDateEl = null, void ge(ve.self, ve.tooltipEl, null);
              t4 && ve.lastDateEl !== t4 && (ve.lastDateEl = t4, ge(ve.self, ve.tooltipEl, t4));
            })), Se = (e4) => {
              ve.self && "Escape" === e4.key && (ve.lastDateEl = null, g(ve.self, "selectedDates", []), ve.self.context.mainElement.removeEventListener("mousemove", we), ve.self.context.mainElement.removeEventListener("keydown", Se), ge(ve.self, ve.tooltipEl, null), ye());
            }, xe = () => {
              null !== ve.timeoutId && clearTimeout(ve.timeoutId), ve.timeoutId = setTimeout((() => {
                ve.lastDateEl = null, ge(ve.self, ve.tooltipEl, null), ye();
              }), 50);
            }, Le = (e4, t4) => {
              ve.self = e4, ve.lastDateEl = t4, ye(), e4.disableDatesGaps && (ve.rangeMin = ve.rangeMin ? ve.rangeMin : e4.context.displayDateMin, ve.rangeMax = ve.rangeMax ? ve.rangeMax : e4.context.displayDateMax), e4.onCreateDateRangeTooltip && (ve.tooltipEl = e4.context.mainElement.querySelector("[data-vc-date-range-tooltip]"));
              const i3 = null == t4 ? void 0 : t4.dataset.vcDate;
              if (i3) {
                const t5 = 1 === e4.context.selectedDates.length && e4.context.selectedDates[0].includes(i3), n2 = t5 && !pe(e4) ? [i3, i3] : t5 && pe(e4) ? [] : e4.context.selectedDates.length > 1 ? [i3] : [...e4.context.selectedDates, i3];
                g(e4, "selectedDates", n2), e4.context.selectedDates.length > 1 && e4.context.selectedDates.sort(((e5, t6) => +new Date(e5) - +new Date(t6)));
              }
              ({ set: () => (e4.disableDatesGaps && (() => {
                var e5, t5, i4, n2;
                if (!(null == (i4 = null == (t5 = null == (e5 = ve.self) ? void 0 : e5.context) ? void 0 : t5.selectedDates) ? void 0 : i4[0]) || !(null == (n2 = ve.self.context.disableDates) ? void 0 : n2[0])) return;
                const s2 = S(ve.self.context.selectedDates[0]), [o2, l2] = ve.self.context.disableDates.map(((e6) => S(e6))).reduce((([e6, t6], i5) => [s2 >= i5 ? i5 : e6, s2 < i5 && null === t6 ? i5 : t6]), [null, null]);
                o2 && g(ve.self, "displayDateMin", x(new Date(o2.setDate(o2.getDate() + 1)))), l2 && g(ve.self, "displayDateMax", x(new Date(l2.setDate(l2.getDate() - 1)))), ve.self.disableDatesPast && !ve.self.disableAllDates && S(ve.self.context.displayDateMin) < S(ve.self.context.dateToday) && g(ve.self, "displayDateMin", ve.self.context.dateToday);
              })(), ge(ve.self, ve.tooltipEl, t4), ve.self.context.mainElement.removeEventListener("mousemove", Ce), ve.self.context.mainElement.removeEventListener("mouseleave", xe), ve.self.context.mainElement.removeEventListener("keydown", Se), ve.self.context.mainElement.addEventListener("mousemove", we), ve.self.context.mainElement.addEventListener("mouseleave", xe), ve.self.context.mainElement.addEventListener("keydown", Se), () => {
                ve.self.context.mainElement.removeEventListener("mousemove", we), ve.self.context.mainElement.removeEventListener("mouseleave", xe), ve.self.context.mainElement.removeEventListener("keydown", Se);
              }), reset: () => {
                const [i4, n2] = [e4.context.selectedDates[0], e4.context.selectedDates[e4.context.selectedDates.length - 1]], s2 = e4.context.selectedDates[0] !== e4.context.selectedDates[e4.context.selectedDates.length - 1], o2 = L([`${i4}:${n2}`]).filter(((t5) => !e4.context.disableDates.includes(t5))), l2 = s2 ? e4.enableEdgeDatesOnly ? [i4, n2] : o2 : [e4.context.selectedDates[0], e4.context.selectedDates[0]];
                if (g(e4, "selectedDates", l2), e4.disableDatesGaps && (g(e4, "displayDateMin", ve.rangeMin), g(e4, "displayDateMax", ve.rangeMax)), ve.self.context.mainElement.removeEventListener("mousemove", we), ve.self.context.mainElement.removeEventListener("mouseleave", xe), ve.self.context.mainElement.removeEventListener("keydown", Se), e4.onCreateDateRangeTooltip) return e4.context.selectedDates[0] || (ve.self.context.mainElement.removeEventListener("mousemove", Ce), ve.self.context.mainElement.removeEventListener("mouseleave", xe), ge(ve.self, ve.tooltipEl, null)), e4.context.selectedDates[0] && (ve.self.context.mainElement.addEventListener("mousemove", Ce), ve.self.context.mainElement.addEventListener("mouseleave", xe), ge(ve.self, ve.tooltipEl, t4)), () => {
                  ve.self.context.mainElement.removeEventListener("mousemove", Ce), ve.self.context.mainElement.removeEventListener("mouseleave", xe);
                };
              } })[1 === e4.context.selectedDates.length ? "set" : "reset"]();
            }, Te = (e4) => {
              e4.context.mainElement.querySelectorAll("[data-vc-date]").forEach(((t4) => {
                const i3 = t4.querySelector("[data-vc-date-btn]"), n2 = t4.dataset.vcDate, s2 = S(n2).getDay();
                E(e4, e4.context.selectedYear, t4, i3, s2, n2, "current");
              }));
            }, Ee = ["month", "year"], ke = (e4, t4, i3) => {
              const { currentValue: n2, columnID: s2 } = R(e4, t4);
              return "month" === e4.context.currentType && s2 >= 0 ? i3 - s2 : "year" === e4.context.currentType && e4.context.selectedYear !== n2 ? i3 - 1 : i3;
            }, Ie = (e4, t4, i3, n2) => {
              var s2;
              const o2 = { year: () => {
                if ("multiple" === e4.type) return ((e5, t5) => {
                  const i4 = ke(e5, "year", Number(t5.dataset.vcYearsYear)), n3 = S(e5.context.dateMin), s3 = S(e5.context.dateMax), o3 = e5.context.displayMonthsCount - 1, { columnID: l2 } = R(e5, "year"), a2 = e5.context.selectedMonth < n3.getMonth() && i4 <= n3.getFullYear(), r2 = e5.context.selectedMonth > s3.getMonth() - o3 + l2 && i4 >= s3.getFullYear(), d2 = i4 < n3.getFullYear(), c2 = i4 > s3.getFullYear(), h2 = a2 || d2 ? n3.getFullYear() : r2 || c2 ? s3.getFullYear() : i4, u2 = a2 || d2 ? n3.getMonth() : r2 || c2 ? s3.getMonth() - o3 + l2 : e5.context.selectedMonth;
                  g(e5, "selectedYear", h2), g(e5, "selectedMonth", u2);
                })(e4, n2);
                g(e4, "selectedYear", Number(n2.dataset.vcYearsYear));
              }, month: () => {
                if ("multiple" === e4.type) return ((e5, t5) => {
                  const i4 = t5.closest('[data-vc-column="month"]').querySelector('[data-vc="year"]'), n3 = ke(e5, "month", Number(t5.dataset.vcMonthsMonth)), s3 = Number(i4.dataset.vcYear), o3 = S(e5.context.dateMin), l2 = S(e5.context.dateMax), a2 = n3 < o3.getMonth() && s3 <= o3.getFullYear(), r2 = n3 > l2.getMonth() && s3 >= l2.getFullYear();
                  g(e5, "selectedYear", s3), g(e5, "selectedMonth", a2 ? o3.getMonth() : r2 ? l2.getMonth() : n3);
                })(e4, n2);
                g(e4, "selectedMonth", Number(n2.dataset.vcMonthsMonth));
              } };
              o2[i3](), { year: () => {
                var i4;
                return null == (i4 = e4.onClickYear) ? void 0 : i4.call(e4, e4, t4);
              }, month: () => {
                var i4;
                return null == (i4 = e4.onClickMonth) ? void 0 : i4.call(e4, e4, t4);
              } }[i3](), e4.context.currentType !== e4.type ? (g(e4, "currentType", e4.type), ce(e4), null == (s2 = e4.context.mainElement.querySelector(`[data-vc="${i3}"]`)) || s2.focus()) : _2(e4, n2, i3, true, true);
            }, Ae = (e4, t4) => {
              const i3 = { month: e4.selectionMonthsMode, year: e4.selectionYearsMode };
              Ee.forEach(((n2) => {
                i3[n2] && t4.target && ((e5, t5, i4) => {
                  var n3;
                  const s2 = t5.target, o2 = s2.closest(`[data-vc="${i4}"]`), l2 = { year: () => ne(e5, s2), month: () => j(e5, s2) };
                  if (o2 && e5.onClickTitle && e5.onClickTitle(e5, t5), o2 && e5.context.currentType !== i4) return l2[i4]();
                  const a2 = s2.closest(`[data-vc-${i4}s-${i4}]`);
                  if (a2) return Ie(e5, t5, i4, a2);
                  const r2 = s2.closest('[data-vc="grid"]'), d2 = s2.closest('[data-vc="column"]');
                  (e5.context.currentType === i4 && o2 || "multiple" === e5.type && e5.context.currentType === i4 && r2 && !d2) && (g(e5, "currentType", e5.type), ce(e5), null == (n3 = e5.context.mainElement.querySelector(`[data-vc="${i4}"]`)) || n3.focus());
                })(e4, t4, n2);
              }));
            }, Me = (e4) => {
              const t4 = (t5) => {
                ((e5, t6) => {
                  const i3 = t6.target.closest("[data-vc-arrow]");
                  if (i3) {
                    if (["default", "multiple"].includes(e5.context.currentType)) ue(e5, i3.dataset.vcArrow);
                    else if ("year" === e5.context.currentType && void 0 !== e5.context.displayYear) {
                      const n2 = { prev: -15, next: 15 }[i3.dataset.vcArrow];
                      g(e5, "displayYear", e5.context.displayYear + n2), ne(e5, t6.target);
                    }
                    e5.onClickArrow && e5.onClickArrow(e5, t6);
                  }
                })(e4, t5), ((e5, t6) => {
                  if (!e5.onClickWeekDay) return;
                  const i3 = t6.target.closest("[data-vc-week-day]"), n2 = t6.target.closest('[data-vc="column"]'), s2 = n2 ? n2.querySelectorAll("[data-vc-date-week-day]") : e5.context.mainElement.querySelectorAll("[data-vc-date-week-day]");
                  if (!i3 || !s2[0]) return;
                  const o2 = Number(i3.dataset.vcWeekDay), l2 = Array.from(s2).filter(((e6) => Number(e6.dataset.vcDateWeekDay) === o2));
                  e5.onClickWeekDay(e5, o2, l2, t6);
                })(e4, t5), ((e5, t6) => {
                  if (!e5.enableWeekNumbers || !e5.onClickWeekNumber) return;
                  const i3 = t6.target.closest("[data-vc-week-number]"), n2 = e5.context.mainElement.querySelectorAll("[data-vc-date-week-number]");
                  if (!i3 || !n2[0]) return;
                  const s2 = Number(i3.innerText), o2 = Number(i3.dataset.vcWeekYear), l2 = Array.from(n2).filter(((e6) => Number(e6.dataset.vcDateWeekNumber) === s2));
                  e5.onClickWeekNumber(e5, s2, o2, l2, t6);
                })(e4, t5), ((e5, t6) => {
                  var i3;
                  const n2 = t6.target, s2 = n2.closest("[data-vc-date-btn]");
                  if (!e5.selectionDatesMode || !["single", "multiple", "multiple-ranged"].includes(e5.selectionDatesMode) || !s2) return;
                  const o2 = s2.closest("[data-vc-date]");
                  ({ single: () => me(e5, o2, false), multiple: () => me(e5, o2, true), "multiple-ranged": () => Le(e5, o2) })[e5.selectionDatesMode](), null == (i3 = e5.context.selectedDates) || i3.sort(((e6, t7) => +new Date(e6) - +new Date(t7))), e5.onClickDate && e5.onClickDate(e5, t6), e5.inputMode && e5.context.inputElement && e5.context.mainElement && e5.onChangeToInput && e5.onChangeToInput(e5, t6);
                  const l2 = n2.closest('[data-vc-date-month="prev"]'), a2 = n2.closest('[data-vc-date-month="next"]');
                  ({ prev: () => e5.enableMonthChangeOnDayClick ? ue(e5, "prev") : Te(e5), next: () => e5.enableMonthChangeOnDayClick ? ue(e5, "next") : Te(e5), current: () => Te(e5) })[l2 ? "prev" : a2 ? "next" : "current"]();
                })(e4, t5), Ae(e4, t5);
              };
              return e4.context.mainElement.addEventListener("click", t4), () => e4.context.mainElement.removeEventListener("click", t4);
            }, Oe = (e4, t4) => "today" === e4 ? (() => {
              const e5 = /* @__PURE__ */ new Date();
              return new Date(e5.getTime() - 6e4 * e5.getTimezoneOffset()).toISOString().substring(0, 10);
            })() : e4 instanceof Date || "number" == typeof e4 || "string" == typeof e4 ? L([e4])[0] : t4, De = (e4, t4, i3) => {
              g(e4, "selectedMonth", t4), g(e4, "selectedYear", i3), g(e4, "displayYear", i3);
            }, Pe = (e4) => {
              g(e4, "currentType", e4.type), ((e5) => {
                if ("multiple" === e5.type && (e5.displayMonthsCount <= 1 || e5.displayMonthsCount > 12)) throw new Error(m);
                if ("multiple" !== e5.type && e5.displayMonthsCount > 1) throw new Error(m);
                g(e5, "displayMonthsCount", e5.displayMonthsCount ? e5.displayMonthsCount : "multiple" === e5.type ? 2 : 1);
              })(e4), ((e5) => {
                var t4, i3, n2;
                const s2 = Oe(e5.dateMin, e5.dateMin), o2 = Oe(e5.dateMax, e5.dateMax), l2 = Oe(e5.displayDateMin, s2), a2 = Oe(e5.displayDateMax, o2);
                g(e5, "dateToday", Oe(e5.dateToday, e5.dateToday)), g(e5, "displayDateMin", l2 ? S(s2) >= S(l2) ? s2 : l2 : s2), g(e5, "displayDateMax", a2 ? S(o2) <= S(a2) ? o2 : a2 : o2);
                const r2 = e5.disableDatesPast && !e5.disableAllDates && S(l2) < S(e5.context.dateToday);
                g(e5, "displayDateMin", r2 || e5.disableAllDates ? e5.context.dateToday : l2), g(e5, "displayDateMax", e5.disableAllDates ? e5.context.dateToday : a2), g(e5, "disableDates", e5.disableDates[0] && !e5.disableAllDates ? L(e5.disableDates) : e5.disableAllDates ? [e5.context.displayDateMin] : []), e5.context.disableDates.length > 1 && e5.context.disableDates.sort(((e6, t5) => +new Date(e6) - +new Date(t5))), g(e5, "enableDates", e5.enableDates[0] ? L(e5.enableDates) : []), (null == (t4 = e5.context.enableDates) ? void 0 : t4[0]) && (null == (i3 = e5.context.disableDates) ? void 0 : i3[0]) && g(e5, "disableDates", e5.context.disableDates.filter(((t5) => !e5.context.enableDates.includes(t5)))), e5.context.enableDates.length > 1 && e5.context.enableDates.sort(((e6, t5) => +new Date(e6) - +new Date(t5))), (null == (n2 = e5.context.enableDates) ? void 0 : n2[0]) && e5.disableAllDates && (g(e5, "displayDateMin", e5.context.enableDates[0]), g(e5, "displayDateMax", e5.context.enableDates[e5.context.enableDates.length - 1])), g(e5, "dateMin", e5.displayDisabledDates ? s2 : e5.context.displayDateMin), g(e5, "dateMax", e5.displayDisabledDates ? o2 : e5.context.displayDateMax);
              })(e4), ((e5) => {
                var t4;
                if (e5.enableJumpToSelectedDate && (null == (t4 = e5.selectedDates) ? void 0 : t4[0]) && void 0 === e5.selectedMonth && void 0 === e5.selectedYear) {
                  const t5 = S(L(e5.selectedDates)[0]);
                  return void De(e5, t5.getMonth(), t5.getFullYear());
                }
                const i3 = void 0 !== e5.selectedMonth && Number(e5.selectedMonth) >= 0 && Number(e5.selectedMonth) < 12, n2 = void 0 !== e5.selectedYear && Number(e5.selectedYear) >= 0 && Number(e5.selectedYear) <= 9999;
                De(e5, i3 ? Number(e5.selectedMonth) : S(e5.context.dateToday).getMonth(), n2 ? Number(e5.selectedYear) : S(e5.context.dateToday).getFullYear());
              })(e4), ((e5) => {
                var t4;
                g(e5, "selectedDates", (null == (t4 = e5.selectedDates) ? void 0 : t4[0]) ? L(e5.selectedDates) : []);
              })(e4), ((e5) => {
                var t4, i3, n2;
                if (!e5.selectionTimeMode) return;
                if (![12, 24].includes(e5.selectionTimeMode)) throw new Error(p);
                const s2 = 12 === e5.selectionTimeMode, o2 = s2 ? /^(0[1-9]|1[0-2]):([0-5][0-9]) ?(AM|PM)?$/i : /^([0-1]?[0-9]|2[0-3]):([0-5][0-9])$/;
                let [l2, a2, r2] = null != (n2 = null == (i3 = null == (t4 = e5.selectedTime) ? void 0 : t4.match(o2)) ? void 0 : i3.slice(1)) ? n2 : [];
                l2 ? s2 && !r2 && (r2 = "AM") : (l2 = s2 ? K(String(e5.timeMinHour)) : String(e5.timeMinHour), a2 = String(e5.timeMinMinute), r2 = s2 ? Number(K(String(e5.timeMinHour))) >= 12 ? "PM" : "AM" : null), g(e5, "selectedHours", l2.padStart(2, "0")), g(e5, "selectedMinutes", a2.padStart(2, "0")), g(e5, "selectedKeeping", r2), g(e5, "selectedTime", `${e5.context.selectedHours}:${e5.context.selectedMinutes}${r2 ? ` ${r2}` : ""}`);
              })(e4);
            }, $e = (e4, { year: t4, month: i3, dates: n2, time: s2, locale: o2 }, l2 = true) => {
              var a2;
              const r2 = { year: e4.selectedYear, month: e4.selectedMonth, dates: e4.selectedDates, time: e4.selectedTime };
              e4.selectedYear = t4 ? r2.year : e4.context.selectedYear, e4.selectedMonth = i3 ? r2.month : e4.context.selectedMonth, e4.selectedTime = s2 ? r2.time : e4.context.selectedTime, e4.selectedDates = "only-first" === n2 && (null == (a2 = e4.context.selectedDates) ? void 0 : a2[0]) ? [e4.context.selectedDates[0]] : true === n2 ? r2.dates : e4.context.selectedDates, o2 && g(e4, "locale", { months: { short: [], long: [] }, weekdays: { short: [], long: [] } }), Pe(e4), l2 && ce(e4), e4.selectedYear = r2.year, e4.selectedMonth = r2.month, e4.selectedDates = r2.dates, e4.selectedTime = r2.time, "multiple-ranged" === e4.selectionDatesMode && n2 && Le(e4, null);
            }, He = (e4) => {
              g(e4, "inputElement", e4.context.mainElement);
              const t4 = () => {
                e4.context.inputModeInit ? queueMicrotask((() => Fe(e4))) : ((e5) => {
                  const t5 = document.createElement("div");
                  t5.className = e5.styles.calendar, t5.dataset.vc = "calendar", t5.dataset.vcInput = "", t5.dataset.vcCalendarHidden = "", g(e5, "inputModeInit", true), g(e5, "isShowInInputMode", false), g(e5, "mainElement", t5), document.body.appendChild(e5.context.mainElement), $e(e5, { year: true, month: true, dates: true, time: true, locale: true }), queueMicrotask((() => Fe(e5))), e5.onInit && e5.onInit(e5), he(e5), Me(e5);
                })(e4);
              };
              return e4.context.inputElement.addEventListener("click", t4), e4.context.inputElement.addEventListener("focus", t4), () => {
                e4.context.inputElement.removeEventListener("click", t4), e4.context.inputElement.removeEventListener("focus", t4);
              };
            }, Ne = (e4, t4) => {
              if (!e4.context.isInit) throw new Error(h);
              $e(e4, r(r({}, { year: true, month: true, dates: true, time: true, locale: true }), t4), !(e4.inputMode && !e4.context.inputModeInit)), e4.onUpdate && e4.onUpdate(e4);
            }, Be = (e4, t4) => {
              const i3 = Object.keys(t4);
              for (let n2 = 0; n2 < i3.length; n2++) {
                const s2 = i3[n2];
                "object" != typeof e4[s2] || "object" != typeof t4[s2] || t4[s2] instanceof Date || Array.isArray(t4[s2]) ? void 0 !== t4[s2] && (e4[s2] = t4[s2]) : Be(e4[s2], t4[s2]);
              }
            }, qe = (e4, t4, i3) => {
              if (!e4) return;
              const n2 = "auto" === i3 ? (function(e5, t5) {
                const i4 = "left";
                if (!t5 || !e5) return i4;
                const { canShow: n3, parentPositions: s3 } = w(e5, t5), o3 = n3.left && n3.right;
                return (o3 && n3.bottom ? "center" : o3 && n3.top ? ["top", "center"] : Array.isArray(s3) ? ["bottom" === s3[0] ? "top" : "bottom", ...s3.slice(1)] : s3) || i4;
              })(e4, t4) : i3, s2 = { top: -t4.offsetHeight, bottom: e4.offsetHeight, left: 0, center: e4.offsetWidth / 2 - t4.offsetWidth / 2, right: e4.offsetWidth - t4.offsetWidth }, o2 = Array.isArray(n2) ? n2[0] : "bottom", l2 = Array.isArray(n2) ? n2[1] : n2;
              t4.dataset.vcPosition = o2;
              const { top: a2, left: r2 } = f(e4), d2 = a2 + s2[o2];
              let c2 = r2 + s2[l2];
              const { vw: h2 } = y();
              if (c2 + t4.clientWidth > h2) {
                const e5 = window.innerWidth - document.body.clientWidth;
                c2 = h2 - t4.clientWidth - e5;
              } else c2 < 0 && (c2 = 0);
              Object.assign(t4.style, { left: `${c2}px`, top: `${d2}px` });
            }, Fe = (e4) => {
              if (e4.context.isShowInInputMode) return;
              if (!e4.context.currentType) return void e4.context.mainElement.click();
              g(e4, "cleanupHandlers", []), g(e4, "isShowInInputMode", true), qe(e4.context.inputElement, e4.context.mainElement, e4.positionToInput), e4.context.mainElement.removeAttribute("data-vc-calendar-hidden");
              const t4 = () => {
                qe(e4.context.inputElement, e4.context.mainElement, e4.positionToInput);
              };
              window.addEventListener("resize", t4), e4.context.cleanupHandlers.push((() => window.removeEventListener("resize", t4)));
              const i3 = (t5) => {
                "Escape" === t5.key && v(e4);
              };
              document.addEventListener("keydown", i3), e4.context.cleanupHandlers.push((() => document.removeEventListener("keydown", i3)));
              const n2 = (t5) => {
                t5.target === e4.context.inputElement || e4.context.mainElement.contains(t5.target) || v(e4);
              };
              document.addEventListener("click", n2, { capture: true }), e4.context.cleanupHandlers.push((() => document.removeEventListener("click", n2, { capture: true }))), e4.onShow && e4.onShow(e4);
            }, _e = { application: "Calendar", navigation: "Calendar Navigation", arrowNext: { month: "Next month", year: "Next list of years" }, arrowPrev: { month: "Previous month", year: "Previous list of years" }, month: "Select month, current selected month:", months: "List of months", year: "Select year, current selected year:", years: "List of years", week: "Days of the week", weekNumber: "Numbers of weeks in a year", dates: "Dates in the current month", selectingTime: "Selecting a time ", inputHour: "Hours", inputMinute: "Minutes", rangeHour: "Slider for selecting hours", rangeMinute: "Slider for selecting minutes", btnKeeping: "Switch AM/PM, current position:" }, Re = { calendar: "vc", controls: "vc-controls", grid: "vc-grid", column: "vc-column", header: "vc-header", headerContent: "vc-header__content", month: "vc-month", year: "vc-year", arrowPrev: "vc-arrow vc-arrow_prev", arrowNext: "vc-arrow vc-arrow_next", wrapper: "vc-wrapper", content: "vc-content", months: "vc-months", monthsMonth: "vc-months__month", years: "vc-years", yearsYear: "vc-years__year", week: "vc-week", weekDay: "vc-week__day", weekNumbers: "vc-week-numbers", weekNumbersTitle: "vc-week-numbers__title", weekNumbersContent: "vc-week-numbers__content", weekNumber: "vc-week-number", dates: "vc-dates", date: "vc-date", dateBtn: "vc-date__btn", datePopup: "vc-date__popup", dateRangeTooltip: "vc-date-range-tooltip", time: "vc-time", timeContent: "vc-time__content", timeHour: "vc-time__hour", timeMinute: "vc-time__minute", timeKeeping: "vc-time__keeping", timeRanges: "vc-time__ranges", timeRange: "vc-time__range" };
            class Ve {
              constructor() {
                d(this, "type", "default"), d(this, "inputMode", false), d(this, "positionToInput", "left"), d(this, "firstWeekday", 1), d(this, "monthsToSwitch", 1), d(this, "themeAttrDetect", "html[data-theme]"), d(this, "locale", "en"), d(this, "dateToday", "today"), d(this, "dateMin", "1970-01-01"), d(this, "dateMax", "2470-12-31"), d(this, "displayDateMin"), d(this, "displayDateMax"), d(this, "displayDatesOutside", true), d(this, "displayDisabledDates", false), d(this, "displayMonthsCount"), d(this, "disableDates", []), d(this, "disableAllDates", false), d(this, "disableDatesPast", false), d(this, "disableDatesGaps", false), d(this, "disableWeekdays", []), d(this, "disableToday", false), d(this, "enableDates", []), d(this, "enableEdgeDatesOnly", true), d(this, "enableDateToggle", true), d(this, "enableWeekNumbers", false), d(this, "enableMonthChangeOnDayClick", true), d(this, "enableJumpToSelectedDate", false), d(this, "selectionDatesMode", "single"), d(this, "selectionMonthsMode", true), d(this, "selectionYearsMode", true), d(this, "selectionTimeMode", false), d(this, "selectedDates", []), d(this, "selectedMonth"), d(this, "selectedYear"), d(this, "selectedHolidays", []), d(this, "selectedWeekends", [0, 6]), d(this, "selectedTime"), d(this, "selectedTheme", "system"), d(this, "timeMinHour", 0), d(this, "timeMaxHour", 23), d(this, "timeMinMinute", 0), d(this, "timeMaxMinute", 59), d(this, "timeControls", "all"), d(this, "timeStepHour", 1), d(this, "timeStepMinute", 1), d(this, "sanitizerHTML", ((e4) => e4)), d(this, "onClickDate"), d(this, "onClickWeekDay"), d(this, "onClickWeekNumber"), d(this, "onClickTitle"), d(this, "onClickMonth"), d(this, "onClickYear"), d(this, "onClickArrow"), d(this, "onChangeTime"), d(this, "onChangeToInput"), d(this, "onCreateDateRangeTooltip"), d(this, "onCreateDateEls"), d(this, "onCreateMonthEls"), d(this, "onCreateYearEls"), d(this, "onInit"), d(this, "onUpdate"), d(this, "onDestroy"), d(this, "onShow"), d(this, "onHide"), d(this, "popups", {}), d(this, "labels", r({}, _e)), d(this, "layouts", { default: "", multiple: "", month: "", year: "" }), d(this, "styles", r({}, Re));
              }
            }
            const je = class e4 extends Ve {
              constructor(t4, s2) {
                var o2, l2;
                super(), d(this, "init", (() => {
                  return g(e5 = this, "originalElement", e5.context.mainElement.cloneNode(true)), g(e5, "isInit", true), e5.inputMode ? He(e5) : (Pe(e5), ce(e5), e5.onInit && e5.onInit(e5), he(e5), Me(e5));
                  var e5;
                })), d(this, "update", ((e5) => Ne(this, e5))), d(this, "destroy", (() => ((e5) => {
                  var t5, i3, n2, s3, o3;
                  if (!e5.context.isInit) throw new Error(h);
                  e5.inputMode ? (null == (t5 = e5.context.mainElement.parentElement) || t5.removeChild(e5.context.mainElement), null == (n2 = null == (i3 = e5.context.inputElement) ? void 0 : i3.replaceWith) || n2.call(i3, e5.context.originalElement), g(e5, "inputElement", void 0)) : null == (o3 = (s3 = e5.context.mainElement).replaceWith) || o3.call(s3, e5.context.originalElement), g(e5, "mainElement", e5.context.originalElement), e5.onDestroy && e5.onDestroy(e5);
                })(this))), d(this, "show", (() => Fe(this))), d(this, "hide", (() => v(this))), d(this, "set", ((e5, t5) => ((e6, t6, i3) => {
                  Be(e6, t6), e6.context.isInit && Ne(e6, i3);
                })(this, e5, t5))), d(this, "context"), this.context = (l2 = r({}, this.context), i2(l2, n({ locale: { months: { short: [], long: [] }, weekdays: { short: [], long: [] } } }))), g(this, "mainElement", "string" == typeof t4 ? null != (o2 = e4.memoizedElements.get(t4)) ? o2 : this.queryAndMemoize(t4) : t4), s2 && Be(this, s2);
              }
              queryAndMemoize(t4) {
                const i3 = document.querySelector(t4);
                if (!i3) throw new Error(c(t4));
                return e4.memoizedElements.set(t4, i3), i3;
              }
            };
            d(je, "memoizedElements", /* @__PURE__ */ new Map());
            let ze = je;
            e3.Calendar = ze, Object.defineProperty(e3, Symbol.toStringTag, { value: "Module" });
          })(t2);
        }, 370: (e2, t2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.templatesBasedOnUtility = void 0, t2.templatesBasedOnUtility = { default: (e3 = false) => `<div class="--single-month flex flex-col overflow-hidden">
    <div class="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3" data-vc="header">
      <div class="col-span-1">
        <#CustomArrowPrev />
      </div>
      <div class="col-span-3 flex justify-center items-center gap-x-1">
        <#CustomMonth />
        <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
        <#CustomYear />
      </div>
      <div class="col-span-1 flex justify-end">
        <#CustomArrowNext />
      </div>
    </div>
    <div data-vc="wrapper">
      <div data-vc="content">
        <#Week />
        <#Dates />
      </div>
    </div>
  </div>`, multiple: (e3 = false) => `<div class="relative flex flex-col overflow-hidden">
    <div class="absolute top-2 start-2">
      <#CustomArrowPrev />
    </div>
    <div class="absolute top-2 end-2">
      <#CustomArrowNext />
    </div>
    <div class="sm:flex" data-vc="grid">
      <#Multiple>
        <div class="p-3 space-y-0.5 --single-month" data-vc="column">
          <div class="pb-3" data-vc="header">
            <div class="flex justify-center items-center gap-x-1" data-vc-header="content">
              <#CustomMonth />
              <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
              <#CustomYear />
            </div>
          </div>
          <div data-vc="wrapper">
            <div data-vc="content">
              <#Week />
              <#Dates />
            </div>
          </div>
        </div>
      <#/Multiple>
    </div>
  </div>`, year: (e3 = false) => `<div class="relative bg-white ${"light" !== e3 ? "dark:bg-neutral-900" : ""}" data-vc="header" role="toolbar">
    <div class="grid grid-cols-5 items-center gap-x-3 mx-1.5 pb-3" data-vc="header">
      <div class="col-span-1">
        <#CustomArrowPrev />
      </div>
      <div class="col-span-3 flex justify-center items-center gap-x-1">
        <#Month />
        <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
        <#Year />
      </div>
      <div class="col-span-1 flex justify-end">
        <#CustomArrowNext />
      </div>
    </div>
  </div>
  <div data-vc="wrapper">
    <div data-vc="content">
      <#Years />
    </div>
  </div>`, month: (e3 = false) => `<div class="pb-3" data-vc="header" role="toolbar">
    <div class="flex justify-center items-center gap-x-1" data-vc-header="content">
      <#Month />
      <span class="text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}">/</span>
      <#Year />
    </div>
  </div>
  <div data-vc="wrapper">
    <div data-vc="content">
      <#Months />
    </div>
  </div>`, years: (e3, t3 = false) => `<div class="relative">
      <span class="hidden" data-vc="year"></span>
      <select data-hs-select='{
          "placeholder": "Select year",
          "dropdownScope": "parent",
          "dropdownVerticalFixedPlacement": "bottom",
          "toggleTag": "<button type=\\"button\\"><span data-title></span></button>",
          "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-hidden focus:text-gray-600 before:absolute before:inset-0 before:z-1 ${"light" !== t3 ? "dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300" : ""}",
          "dropdownClasses": "mt-2 z-50 w-20 max-h-60 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== t3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
          "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== t3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
          "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span><span class=\\"hidden hs-selected:block\\"><svg class=\\"shrink-0 size-3.5 text-gray-800 ${"light" !== t3 ? "dark:text-neutral-200" : ""}\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polyline points=\\"20 6 9 17 4 12\\"/></svg></span></div>"
        }' class="hidden --year --prevent-on-load-init">
        ${e3}
      </select>
    </div>`, months: (e3 = false) => `<div class="relative">
    <span class="hidden" data-vc="month"></span>
    <select data-hs-select='{
        "placeholder": "Select month",
        "dropdownScope": "parent",
        "dropdownVerticalFixedPlacement": "bottom",
        "toggleTag": "<button type=\\"button\\"><span data-title></span></button>",
        "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative flex text-nowrap w-full cursor-pointer text-start font-medium text-gray-800 hover:text-gray-600 focus:outline-hidden focus:text-gray-600 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:text-neutral-200 dark:hover:text-neutral-300 dark:focus:text-neutral-300" : ""}",
        "dropdownClasses": "mt-2 z-50 w-32 max-h-60 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg shadow-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
        "optionClasses": "p-2 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg hs-select-disabled:opacity-50 hs-select-disabled:pointer-events-none focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
        "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span><span class=\\"hidden hs-selected:block\\"><svg class=\\"shrink-0 size-3.5 text-gray-800 ${"light" !== e3 ? "dark:text-neutral-200" : ""}\\" xmlns=\\"http://www.w3.org/2000/svg\\" width=\\"24\\" height=\\"24\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><polyline points=\\"20 6 9 17 4 12\\"/></svg></span></div>"
      }' class="hidden --month --prevent-on-load-init">
      <option value="0">January</option>
      <option value="1">February</option>
      <option value="2">March</option>
      <option value="3">April</option>
      <option value="4">May</option>
      <option value="5">June</option>
      <option value="6">July</option>
      <option value="7">August</option>
      <option value="8">September</option>
      <option value="9">October</option>
      <option value="10">November</option>
      <option value="11">December</option>
    </select>
  </div>`, hours: (e3 = false) => `<div class="relative">
    <select class="--hours hidden" data-hs-select='{
      "placeholder": "Select option...",
      "dropdownVerticalFixedPlacement": "top",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 px-2 pe-6 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" : ""}",
      "dropdownClasses": "mt-2 z-50 w-full min-w-24 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
      "optionClasses": "hs-selected:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-neutral-800" : ""} py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-gray-700" : ""} ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
      "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span></div>"
    }'>
      <option value="01">01</option>
      <option value="02">02</option>
      <option value="03">03</option>
      <option value="04">04</option>
      <option value="05">05</option>
      <option value="06">06</option>
      <option value="07">07</option>
      <option value="08">08</option>
      <option value="09">09</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12" selected>12</option>
    </select>
    <div class="absolute top-1/2 end-2 -translate-y-1/2">
      <svg class="shrink-0 size-3 text-gray-500 ${"light" !== e3 ? "dark:text-neutral-500" : ""}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </div>
  </div>`, minutes: (e3 = false) => `<div class="relative">
    <select class="--minutes hidden" data-hs-select='{
      "placeholder": "Select option...",
      "dropdownVerticalFixedPlacement": "top",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 px-2 pe-6 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" : ""}",
      "dropdownClasses": "mt-2 z-50 w-full min-w-24 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
      "optionClasses": "hs-selected:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-neutral-800" : ""} py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-gray-700" : ""} ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
      "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span></div>"
    }'>
      <option value="00" selected>00</option>
      <option value="01">01</option>
      <option value="02">02</option>
      <option value="03">03</option>
      <option value="04">04</option>
      <option value="05">05</option>
      <option value="06">06</option>
      <option value="07">07</option>
      <option value="08">08</option>
      <option value="09">09</option>
      <option value="10">10</option>
      <option value="11">11</option>
      <option value="12">12</option>
      <option value="13">13</option>
      <option value="14">14</option>
      <option value="15">15</option>
      <option value="16">16</option>
      <option value="17">17</option>
      <option value="18">18</option>
      <option value="19">19</option>
      <option value="20">20</option>
      <option value="21">21</option>
      <option value="22">22</option>
      <option value="23">23</option>
      <option value="24">24</option>
      <option value="25">25</option>
      <option value="26">26</option>
      <option value="27">27</option>
      <option value="28">28</option>
      <option value="29">29</option>
      <option value="30">30</option>
      <option value="31">31</option>
      <option value="32">32</option>
      <option value="33">33</option>
      <option value="34">34</option>
      <option value="35">35</option>
      <option value="36">36</option>
      <option value="37">37</option>
      <option value="38">38</option>
      <option value="39">39</option>
      <option value="40">40</option>
      <option value="41">41</option>
      <option value="42">42</option>
      <option value="43">43</option>
      <option value="44">44</option>
      <option value="45">45</option>
      <option value="46">46</option>
      <option value="47">47</option>
      <option value="48">48</option>
      <option value="49">49</option>
      <option value="50">50</option>
      <option value="51">51</option>
      <option value="52">52</option>
      <option value="53">53</option>
      <option value="54">54</option>
      <option value="55">55</option>
      <option value="56">56</option>
      <option value="57">57</option>
      <option value="58">58</option>
      <option value="59">59</option>
    </select>
    <div class="absolute top-1/2 end-2 -translate-y-1/2">
      <svg class="shrink-0 size-3 text-gray-500 ${"light" !== e3 ? "dark:text-neutral-500" : ""}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </div>
  </div>`, meridiem: (e3 = false) => `<div class="relative">
    <select class="--meridiem hidden" data-hs-select='{
      "placeholder": "Select option...",
      "dropdownVerticalFixedPlacement": "top",
      "toggleClasses": "hs-select-disabled:pointer-events-none hs-select-disabled:opacity-50 relative py-1 px-2 pe-6 flex text-nowrap w-full cursor-pointer bg-white border border-gray-200 rounded-lg text-start text-sm focus:border-blue-500 focus:ring-blue-500 before:absolute before:inset-0 before:z-1 ${"light" !== e3 ? "dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400" : ""}",
      "dropdownClasses": "mt-2 z-50 w-full min-w-24 max-h-72 p-1 space-y-0.5 bg-white border border-gray-200 rounded-lg overflow-hidden overflow-y-auto [&::-webkit-scrollbar]:w-2 [&::-webkit-scrollbar-thumb]:rounded-full [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 ${"light" !== e3 ? "dark:[&::-webkit-scrollbar-track]:bg-neutral-700 dark:[&::-webkit-scrollbar-thumb]:bg-neutral-500 dark:bg-neutral-900 dark:border-neutral-700" : ""}",
      "optionClasses": "hs-selected:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-neutral-800" : ""} py-2 px-4 w-full text-sm text-gray-800 cursor-pointer hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 ${"light" !== e3 ? "dark:hs-selected:bg-gray-700" : ""} ${"light" !== e3 ? "dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" : ""}",
      "optionTemplate": "<div class=\\"flex justify-between items-center w-full\\"><span data-title></span></div>"
    }'>
      <option value="PM" selected>PM</option>
      <option value="AM">AM</option>
    </select>
    <div class="absolute top-1/2 end-2 -translate-y-1/2">
      <svg class="shrink-0 size-3 text-gray-500 ${"light" !== e3 ? "dark:text-neutral-500" : ""}" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="m7 15 5 5 5-5"/><path d="m7 9 5-5 5 5"/></svg>
    </div>
  </div>` };
        }, 406: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-copy-markup"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.targetSelector = (null == s2 ? void 0 : s2.targetSelector) || null, this.wrapperSelector = (null == s2 ? void 0 : s2.wrapperSelector) || null, this.limit = (null == s2 ? void 0 : s2.limit) || null, this.items = [], this.targetSelector && this.init();
            }
            elementClick() {
              this.copy();
            }
            deleteItemButtonClick(e3) {
              this.delete(e3);
            }
            init() {
              this.createCollection(window.$hsCopyMarkupCollection, this), this.onElementClickListener = () => this.elementClick(), this.setTarget(), this.setWrapper(), this.addPredefinedItems(), this.el.addEventListener("click", this.onElementClickListener);
            }
            copy() {
              if (this.limit && this.items.length >= this.limit) return false;
              this.el.hasAttribute("disabled") && this.el.setAttribute("disabled", "");
              const e3 = this.target.cloneNode(true);
              this.addToItems(e3), this.limit && this.items.length >= this.limit && this.el.setAttribute("disabled", "disabled"), this.fireEvent("copy", e3), (0, s.dispatch)("copy.hs.copyMarkup", e3, e3);
            }
            addPredefinedItems() {
              Array.from(this.wrapper.children).filter(((e3) => !e3.classList.contains("[--ignore-for-count]"))).forEach(((e3) => {
                this.addToItems(e3);
              })), this.limit && this.items.length >= this.limit && this.el.setAttribute("disabled", "disabled");
            }
            setTarget() {
              const e3 = "string" == typeof this.targetSelector ? document.querySelector(this.targetSelector).cloneNode(true) : this.targetSelector.cloneNode(true);
              e3.removeAttribute("id"), this.target = e3;
            }
            setWrapper() {
              this.wrapper = "string" == typeof this.wrapperSelector ? document.querySelector(this.wrapperSelector) : this.wrapperSelector;
            }
            addToItems(e3) {
              const t3 = e3.querySelector("[data-hs-copy-markup-delete-item]");
              this.wrapper ? this.wrapper.append(e3) : this.el.before(e3), t3 && (this.onDeleteItemButtonClickListener = () => this.deleteItemButtonClick(e3), t3.addEventListener("click", this.onDeleteItemButtonClickListener)), this.items.push(e3);
            }
            delete(e3) {
              const t3 = this.items.indexOf(e3);
              -1 !== t3 && this.items.splice(t3, 1), e3.remove(), this.limit && this.items.length < this.limit && this.el.removeAttribute("disabled"), this.fireEvent("delete", e3), (0, s.dispatch)("delete.hs.copyMarkup", e3, e3);
            }
            destroy() {
              const e3 = this.wrapper.querySelectorAll("[data-hs-copy-markup-delete-item]");
              this.el.removeEventListener("click", this.onElementClickListener), e3.length && e3.forEach(((e4) => e4.removeEventListener("click", this.onDeleteItemButtonClickListener))), this.el.removeAttribute("disabled"), this.target = null, this.wrapper = null, this.items = null, window.$hsCopyMarkupCollection = window.$hsCopyMarkupCollection.filter((({ element: e4 }) => e4.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsCopyMarkupCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsCopyMarkupCollection || (window.$hsCopyMarkupCollection = []), window.$hsCopyMarkupCollection && (window.$hsCopyMarkupCollection = window.$hsCopyMarkupCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-copy-markup]:not(.--prevent-on-load-init)").forEach(((e3) => {
                if (!window.$hsCopyMarkupCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                }))) {
                  const t3 = e3.getAttribute("data-hs-copy-markup"), i3 = t3 ? JSON.parse(t3) : {};
                  new l(e3, i3);
                }
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSCopyMarkup = l), t2.default = l;
        }, 442: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__awaiter || function(e3, t3, i3, n2) {
            return new (i3 || (i3 = Promise))((function(s2, o2) {
              function l2(e4) {
                try {
                  r2(n2.next(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function a2(e4) {
                try {
                  r2(n2.throw(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function r2(e4) {
                var t4;
                e4.done ? s2(e4.value) : (t4 = e4.value, t4 instanceof i3 ? t4 : new i3((function(e5) {
                  e5(t4);
                }))).then(l2, a2);
              }
              r2((n2 = n2.apply(e3, t3 || [])).next());
            }));
          }, s = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const o = i2(292), l = s(i2(961)), a = s(i2(248)), r = i2(223);
          class d extends l.default {
            constructor(e3, t3) {
              var i3, n2, s2, o2, l2;
              super(e3, t3), this.disabledObserver = null, this.remoteSearchAbortController = null, this.loadMoreAbortController = null, this.requestId = 0, this.lastQuery = "", this.optionId = 0;
              const a2 = e3.getAttribute("data-hs-select"), r2 = a2 ? JSON.parse(a2) : {}, d2 = Object.assign(Object.assign({}, r2), t3);
              this.value = (null == d2 ? void 0 : d2.value) || this.el.value || null, this.placeholder = (null == d2 ? void 0 : d2.placeholder) || "Select...", this.hasSearch = (null == d2 ? void 0 : d2.hasSearch) || false, this.minSearchLength = null !== (i3 = null == d2 ? void 0 : d2.minSearchLength) && void 0 !== i3 ? i3 : 0, this.preventSearchFocus = (null == d2 ? void 0 : d2.preventSearchFocus) || false, this.preventSearchInsideDescription = (null == d2 ? void 0 : d2.preventSearchInsideDescription) || false, this.mode = (null == d2 ? void 0 : d2.mode) || "default", this.viewport = void 0 !== (null == d2 ? void 0 : d2.viewport) ? document.querySelector(null == d2 ? void 0 : d2.viewport) : null, this.scrollToSelected = void 0 !== (null == d2 ? void 0 : d2.scrollToSelected) && (null == d2 ? void 0 : d2.scrollToSelected), this._isOpened = Boolean(null == d2 ? void 0 : d2.isOpened) || false, this.isMultiple = this.el.hasAttribute("multiple") || false, this.isDisabled = this.el.hasAttribute("disabled") || false, this.selectedItems = [], this.apiUrl = (null == d2 ? void 0 : d2.apiUrl) || null, this.apiQuery = (null == d2 ? void 0 : d2.apiQuery) || null, this.apiOptions = (null == d2 ? void 0 : d2.apiOptions) || null, this.apiSearchQueryKey = (null == d2 ? void 0 : d2.apiSearchQueryKey) || null, this.apiDataPart = (null == d2 ? void 0 : d2.apiDataPart) || null, this.apiLoadMore = true === (null == d2 ? void 0 : d2.apiLoadMore) ? { perPage: 10, scrollThreshold: 100 } : "object" == typeof (null == d2 ? void 0 : d2.apiLoadMore) && null !== (null == d2 ? void 0 : d2.apiLoadMore) && { perPage: d2.apiLoadMore.perPage || 10, scrollThreshold: d2.apiLoadMore.scrollThreshold || 100 }, this.apiPageStart = "number" == typeof (null == d2 ? void 0 : d2.apiPageStart) ? d2.apiPageStart : void 0, this.apiTotalPath = "string" == typeof (null == d2 ? void 0 : d2.apiTotalPath) ? d2.apiTotalPath : null, this.apiFieldsMap = (null == d2 ? void 0 : d2.apiFieldsMap) || null, this.apiIconTag = (null == d2 ? void 0 : d2.apiIconTag) || null, this.apiSelectedValues = (null == d2 ? void 0 : d2.apiSelectedValues) || null, this.currentPage = 0, this.isLoading = false, this.hasMore = true, this.wrapperClasses = (null == d2 ? void 0 : d2.wrapperClasses) || null, this.toggleTag = (null == d2 ? void 0 : d2.toggleTag) || null, this.toggleClasses = (null == d2 ? void 0 : d2.toggleClasses) || null, this.toggleCountText = void 0 === typeof (null == d2 ? void 0 : d2.toggleCountText) ? null : d2.toggleCountText, this.toggleCountTextPlacement = (null == d2 ? void 0 : d2.toggleCountTextPlacement) || "postfix", this.toggleCountTextMinItems = (null == d2 ? void 0 : d2.toggleCountTextMinItems) || 1, this.toggleCountTextMode = (null == d2 ? void 0 : d2.toggleCountTextMode) || "countAfterLimit", this.toggleSeparators = { items: (null === (n2 = null == d2 ? void 0 : d2.toggleSeparators) || void 0 === n2 ? void 0 : n2.items) || ", ", betweenItemsAndCounter: (null === (s2 = null == d2 ? void 0 : d2.toggleSeparators) || void 0 === s2 ? void 0 : s2.betweenItemsAndCounter) || "and" }, this.tagsItemTemplate = (null == d2 ? void 0 : d2.tagsItemTemplate) || null, this.tagsItemClasses = (null == d2 ? void 0 : d2.tagsItemClasses) || null, this.tagsInputId = (null == d2 ? void 0 : d2.tagsInputId) || null, this.tagsInputClasses = (null == d2 ? void 0 : d2.tagsInputClasses) || null, this.dropdownTag = (null == d2 ? void 0 : d2.dropdownTag) || null, this.dropdownClasses = (null == d2 ? void 0 : d2.dropdownClasses) || null, this.dropdownDirectionClasses = (null == d2 ? void 0 : d2.dropdownDirectionClasses) || null, this.dropdownSpace = (null == d2 ? void 0 : d2.dropdownSpace) || 10, this.dropdownPlacement = (null == d2 ? void 0 : d2.dropdownPlacement) || null, this.dropdownVerticalFixedPlacement = (null == d2 ? void 0 : d2.dropdownVerticalFixedPlacement) || null, this.dropdownScope = (null == d2 ? void 0 : d2.dropdownScope) || "parent", this.dropdownAutoPlacement = (null == d2 ? void 0 : d2.dropdownAutoPlacement) || false, this.searchTemplate = (null == d2 ? void 0 : d2.searchTemplate) || null, this.searchWrapperTemplate = (null == d2 ? void 0 : d2.searchWrapperTemplate) || null, this.searchWrapperClasses = (null == d2 ? void 0 : d2.searchWrapperClasses) || "bg-white p-2 sticky top-0", this.searchId = (null == d2 ? void 0 : d2.searchId) || null, this.searchLimit = (null == d2 ? void 0 : d2.searchLimit) || 1 / 0, this.isSearchDirectMatch = void 0 === (null == d2 ? void 0 : d2.isSearchDirectMatch) || (null == d2 ? void 0 : d2.isSearchDirectMatch), this.searchClasses = (null == d2 ? void 0 : d2.searchClasses) || "block w-[calc(100%-32px)] text-sm border-gray-200 rounded-md focus:border-blue-500 focus:ring-blue-500 dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 py-2 px-3 my-2 mx-4", this.searchPlaceholder = (null == d2 ? void 0 : d2.searchPlaceholder) || "Search...", this.searchNoResultTemplate = (null == d2 ? void 0 : d2.searchNoResultTemplate) || "<span></span>", this.searchNoResultText = (null == d2 ? void 0 : d2.searchNoResultText) || "No results found", this.searchNoResultClasses = (null == d2 ? void 0 : d2.searchNoResultClasses) || "px-4 text-sm text-gray-800 dark:text-neutral-200", this.optionAllowEmptyOption = void 0 !== (null == d2 ? void 0 : d2.optionAllowEmptyOption) && (null == d2 ? void 0 : d2.optionAllowEmptyOption), this.optionTemplate = (null == d2 ? void 0 : d2.optionTemplate) || null, this.optionTag = (null == d2 ? void 0 : d2.optionTag) || null, this.optionClasses = (null == d2 ? void 0 : d2.optionClasses) || null, this.optgroupTag = (null == d2 ? void 0 : d2.optgroupTag) || null, this.optgroupClasses = (null == d2 ? void 0 : d2.optgroupClasses) || null, this.extraMarkup = (null == d2 ? void 0 : d2.extraMarkup) || null, this.descriptionClasses = (null == d2 ? void 0 : d2.descriptionClasses) || null, this.iconClasses = (null == d2 ? void 0 : d2.iconClasses) || null, this.isAddTagOnEnter = null === (o2 = null == d2 ? void 0 : d2.isAddTagOnEnter) || void 0 === o2 || o2, this.isSelectedOptionOnTop = null !== (l2 = null == d2 ? void 0 : d2.isSelectedOptionOnTop) && void 0 !== l2 && l2, this.animationInProcess = false, this.selectOptions = [], this.staticOptions = [], this.remoteOptions = [], this.tagsInputHelper = null, this.disabledObserver = new MutationObserver(((e4) => {
                e4.some(((e5) => "disabled" === e5.attributeName)) && this.setDisabledState(this.el.hasAttribute("disabled"));
              })), this.disabledObserver.observe(this.el, { attributes: true, attributeFilter: ["disabled"] }), this.init();
            }
            wrapperClick(e3) {
              e3.target.closest("[data-hs-select-dropdown]") || e3.target.closest("[data-tag-value]") || this.tagsInput.focus();
            }
            toggleClick() {
              if (this.isDisabled) return false;
              this.toggleFn();
            }
            tagsInputFocus() {
              this._isOpened || this.open();
            }
            tagsInputInput() {
              this.calculateInputWidth();
            }
            tagsInputInputSecond(e3) {
              this.apiUrl || this.searchOptions(e3.target.value);
            }
            tagsInputKeydown(e3) {
              if ("Enter" === e3.key && this.isAddTagOnEnter) {
                const t3 = e3.target.value;
                if (this.selectOptions.find(((e4) => e4.val === t3))) return false;
                this.addSelectOption(t3, t3), this.buildOption(t3, t3), this.buildOriginalOption(t3, t3), this.dropdown.querySelector(`[data-value="${t3}"]`).click(), this.resetTagsInputField();
              }
            }
            searchInput(e3) {
              const t3 = e3.target.value;
              this.lastQuery = t3, this.apiUrl ? this.remoteSearch(t3) : this.searchOptions(t3);
            }
            setValue(e3) {
              if (this.value = e3, this.clearSelections(), Array.isArray(e3)) if ("tags" === this.mode) {
                this.unselectMultipleItems(), this.selectMultipleItems(), this.selectedItems = [];
                this.wrapper.querySelectorAll("[data-tag-value]").forEach(((e4) => e4.remove())), this.setTagsItems(), this.reassignTagsInputPlaceholder(this.hasValue() ? "" : this.placeholder);
              } else this.toggleTextWrapper.innerHTML = this.hasValue() ? this.stringFromValue() : this.placeholder, this.unselectMultipleItems(), this.selectMultipleItems();
              else this.setToggleTitle(), this.toggle.querySelector("[data-icon]") && this.setToggleIcon(), this.toggle.querySelector("[data-title]") && this.setToggleTitle(), this.selectSingleItem();
            }
            setDisabledState(e3) {
              this.isDisabled = e3;
              const t3 = "tags" === this.mode ? this.wrapper : this.toggle;
              null == t3 || t3.classList.toggle("disabled", e3), e3 && this.isOpened() && this.close();
            }
            hasValue() {
              return this.isMultiple ? Array.isArray(this.value) && this.value.length > 0 && this.value.some(((e3) => null != e3 && "" !== e3)) : null !== this.value && void 0 !== this.value && "" !== this.value;
            }
            init() {
              this.createCollection(window.$hsSelectCollection, this), this.build(), "undefined" != typeof window && (window.HSAccessibilityObserver || (window.HSAccessibilityObserver = new a.default()), this.setupAccessibility());
            }
            build() {
              this.el.style.display = "none";
              if (this.el.querySelectorAll("option").length && this.setOptions(), this.optionAllowEmptyOption && !this.value && (this.value = ""), this.isMultiple) {
                const e3 = this.el.querySelectorAll("option"), t3 = Array.from(e3).filter(((e4) => e4.selected)), i3 = [];
                t3.forEach(((e4) => {
                  i3.push(e4.value);
                })), this.value = i3;
              }
              this.buildWrapper(), "tags" === this.mode ? this.buildTags() : this.buildToggle(), this.buildDropdown(), this.extraMarkup && this.buildExtraMarkup();
            }
            setOptions() {
              const e3 = this.el.querySelectorAll("option");
              Array.from(e3).filter(((e4) => this.optionAllowEmptyOption || !this.optionAllowEmptyOption && e4.value && "" !== e4.value)).forEach(((e4) => {
                var t3;
                const i3 = e4.getAttribute("data-hs-select-option"), n2 = { title: e4.textContent, val: e4.value, disabled: e4.disabled, options: i3 && "undefined" !== i3 ? JSON.parse(i3) : null, optgroupName: "OPTGROUP" === (null === (t3 = e4.parentElement) || void 0 === t3 ? void 0 : t3.tagName) ? e4.parentElement.label : null };
                this.selectOptions = [...this.selectOptions, n2], this.apiUrl && (this.staticOptions = [...this.staticOptions, n2], e4.setAttribute("data-static", "true"));
              }));
            }
            buildWrapper() {
              this.wrapper = document.createElement("div"), this.wrapper.classList.add("hs-select", "relative"), this.setDisabledState(this.isDisabled), "tags" === this.mode && (this.onWrapperClickListener = (e3) => this.wrapperClick(e3), this.wrapper.addEventListener("click", this.onWrapperClickListener)), this.wrapperClasses && (0, o.classToClassList)(this.wrapperClasses, this.wrapper), this.el.before(this.wrapper), this.wrapper.append(this.el);
            }
            buildExtraMarkup() {
              const e3 = (e4) => {
                const t4 = (0, o.htmlToElement)(e4);
                return this.wrapper.append(t4), t4;
              }, t3 = (e4) => {
                e4.classList.contains("--prevent-click") || e4.addEventListener("click", ((e5) => {
                  e5.stopPropagation(), this.isDisabled || this.toggleFn();
                }));
              };
              if (Array.isArray(this.extraMarkup)) this.extraMarkup.forEach(((i3) => {
                const n2 = e3(i3);
                t3(n2);
              }));
              else {
                const i3 = e3(this.extraMarkup);
                t3(i3);
              }
            }
            buildToggle() {
              var e3, t3;
              let i3, n2;
              this.toggleTextWrapper = document.createElement("span"), this.toggleTextWrapper.classList.add("truncate"), this.toggle = (0, o.htmlToElement)(this.toggleTag || "<div></div>"), i3 = this.toggle.querySelector("[data-icon]"), n2 = this.toggle.querySelector("[data-title]"), !this.isMultiple && i3 && this.setToggleIcon(), !this.isMultiple && n2 && this.setToggleTitle(), this.isMultiple ? this.toggleTextWrapper.innerHTML = this.hasValue() ? this.stringFromValue() : this.placeholder : this.toggleTextWrapper.innerHTML = (null === (e3 = this.getItemByValue(this.value)) || void 0 === e3 ? void 0 : e3.title) || this.placeholder, n2 || this.toggle.append(this.toggleTextWrapper), this.toggleClasses && (0, o.classToClassList)(this.toggleClasses, this.toggle), this.isDisabled && this.toggle.classList.add("disabled"), this.wrapper && this.wrapper.append(this.toggle), (null === (t3 = this.toggle) || void 0 === t3 ? void 0 : t3.ariaExpanded) && (this._isOpened ? this.toggle.ariaExpanded = "true" : this.toggle.ariaExpanded = "false"), this.onToggleClickListener = () => this.toggleClick(), this.toggle.addEventListener("click", this.onToggleClickListener);
            }
            setToggleIcon() {
              var e3, t3, i3, n2;
              const s2 = this.getItemByValue(this.value), l2 = this.toggle.querySelector("[data-icon]");
              if (l2) {
                l2.innerHTML = "";
                const a2 = null === (t3 = null === (e3 = null == s2 ? void 0 : s2.options) || void 0 === e3 ? void 0 : e3.apiFields) || void 0 === t3 ? void 0 : t3.icon, r2 = null == s2 ? void 0 : s2[null === (i3 = this.apiFieldsMap) || void 0 === i3 ? void 0 : i3.icon], d2 = null === (n2 = null == s2 ? void 0 : s2.options) || void 0 === n2 ? void 0 : n2.icon, c = (0, o.htmlToElement)((this.apiUrl || a2) && this.apiIconTag ? this.apiIconTag || "" : d2 || "");
                this.value && (a2 ? c.src = a2 : this.apiUrl && this.apiIconTag && r2 ? c.src = r2 : d2 && "string" == typeof d2 && !d2.trim().startsWith("<") && (c.src = d2)), l2.append(c), (c instanceof HTMLImageElement ? c.src : c) ? l2.classList.remove("hidden") : l2.classList.add("hidden");
              }
            }
            setToggleTitle() {
              const e3 = this.toggle.querySelector("[data-title]");
              let t3 = this.placeholder;
              if (this.optionAllowEmptyOption && "" === this.value) {
                const e4 = this.selectOptions.find(((e5) => "" === e5.val));
                t3 = (null == e4 ? void 0 : e4.title) || this.placeholder;
              } else if (this.value) if (this.apiUrl) {
                const e4 = this.staticOptions.find(((e5) => e5.val === this.value));
                if (e4) t3 = e4.title;
                else {
                  const e5 = this.remoteOptions.find(((e6) => `${e6[this.apiFieldsMap.val]}` === this.value || `${e6[this.apiFieldsMap.title]}` === this.value));
                  e5 && (t3 = e5[this.apiFieldsMap.title]);
                }
              } else {
                const e4 = this.selectOptions.find(((e5) => e5.val === this.value));
                e4 && (t3 = e4.title);
              }
              e3 ? (e3.innerHTML = t3, e3.classList.add("truncate"), this.toggle.append(e3)) : this.toggleTextWrapper.innerHTML = t3;
            }
            buildTags() {
              this.isDisabled && this.wrapper.classList.add("disabled"), this.wrapper.setAttribute("tabindex", "0"), this.buildTagsInput(), this.setTagsItems();
            }
            reassignTagsInputPlaceholder(e3) {
              this.tagsInput.placeholder = e3, this.tagsInputHelper.innerHTML = e3, this.calculateInputWidth();
            }
            buildTagsItem(e3) {
              var t3, i3, n2, s2, l2, a2, r2, d2;
              const c = this.getItemByValue(e3);
              let h, u, p, m;
              const g = document.createElement("div");
              if (g.setAttribute("data-tag-value", e3), this.tagsItemClasses && (0, o.classToClassList)(this.tagsItemClasses, g), this.tagsItemTemplate && (h = (0, o.htmlToElement)(this.tagsItemTemplate), g.append(h)), (null === (t3 = null == c ? void 0 : c.options) || void 0 === t3 ? void 0 : t3.icon) || this.apiIconTag) {
                const e4 = (0, o.htmlToElement)(this.apiUrl && this.apiIconTag ? this.apiIconTag : null === (i3 = null == c ? void 0 : c.options) || void 0 === i3 ? void 0 : i3.icon);
                if (this.apiUrl && this.apiIconTag) {
                  const t4 = c[this.apiFieldsMap.icon] || (null === (s2 = null === (n2 = null == c ? void 0 : c.options) || void 0 === n2 ? void 0 : n2.apiFields) || void 0 === s2 ? void 0 : s2.icon) || (null === (l2 = null == c ? void 0 : c.options) || void 0 === l2 ? void 0 : l2.icon) || "";
                  t4 && (e4.src = t4);
                }
                m = h ? h.querySelector("[data-icon]") : document.createElement("span"), m.append(e4), h || g.append(m);
              }
              !h || !h.querySelector("[data-icon]") || (null === (a2 = null == c ? void 0 : c.options) || void 0 === a2 ? void 0 : a2.icon) || this.apiUrl || this.apiIconTag || c[null === (r2 = this.apiFieldsMap) || void 0 === r2 ? void 0 : r2.icon] || h.querySelector("[data-icon]").classList.add("hidden"), u = h ? h.querySelector("[data-title]") : document.createElement("span"), this.apiUrl && (null === (d2 = this.apiFieldsMap) || void 0 === d2 ? void 0 : d2.title) && c[this.apiFieldsMap.title] ? u.textContent = c[this.apiFieldsMap.title] : u.textContent = c.title || "", h || g.append(u), h ? p = h.querySelector("[data-remove]") : (p = document.createElement("span"), p.textContent = "X", g.append(p)), p.addEventListener("click", (() => {
                this.value = this.value.filter(((t4) => t4 !== e3)), this.selectedItems = this.selectedItems.filter(((t4) => t4 !== e3)), this.hasValue() || this.reassignTagsInputPlaceholder(this.placeholder), this.unselectMultipleItems(), this.selectMultipleItems(), g.remove(), this.triggerChangeEventForNativeSelect();
              })), this.wrapper.append(g);
            }
            getItemByValue(e3) {
              if (this.apiUrl) {
                const t3 = this.staticOptions.find(((t4) => t4.val === e3));
                return t3 || this.remoteOptions.find(((t4) => `${t4[this.apiFieldsMap.val]}` === e3 || t4[this.apiFieldsMap.title] === e3));
              }
              return this.selectOptions.find(((t3) => t3.val === e3));
            }
            setTagsItems() {
              if (this.value) {
                (Array.isArray(this.value) ? this.value : null != this.value ? [this.value] : []).forEach(((e3) => {
                  this.selectedItems.includes(e3) || this.buildTagsItem(e3), this.selectedItems = this.selectedItems.includes(e3) ? this.selectedItems : [...this.selectedItems, e3];
                }));
              }
              this._isOpened && this.floatingUIInstance && this.floatingUIInstance.update();
            }
            buildTagsInput() {
              this.tagsInput = document.createElement("input"), this.tagsInputId && (this.tagsInput.id = this.tagsInputId), this.tagsInputClasses && (0, o.classToClassList)(this.tagsInputClasses, this.tagsInput), this.tagsInput.setAttribute("tabindex", "-1"), this.onTagsInputFocusListener = () => this.tagsInputFocus(), this.onTagsInputInputListener = () => this.tagsInputInput(), this.onTagsInputInputSecondListener = (0, o.debounce)(((e3) => this.tagsInputInputSecond(e3))), this.onTagsInputKeydownListener = (e3) => this.tagsInputKeydown(e3), this.tagsInput.addEventListener("focus", this.onTagsInputFocusListener), this.tagsInput.addEventListener("input", this.onTagsInputInputListener), this.tagsInput.addEventListener("input", this.onTagsInputInputSecondListener), this.tagsInput.addEventListener("keydown", this.onTagsInputKeydownListener), this.wrapper.append(this.tagsInput), setTimeout((() => {
                this.adjustInputWidth(), this.reassignTagsInputPlaceholder(this.hasValue() ? "" : this.placeholder);
              }));
            }
            buildDropdown() {
              if (this.dropdown = (0, o.htmlToElement)(this.dropdownTag || "<div></div>"), this.dropdown.setAttribute("data-hs-select-dropdown", ""), "parent" === this.dropdownScope && (this.dropdown.classList.add("absolute"), this.dropdownVerticalFixedPlacement || this.dropdown.classList.add("top-full")), this.dropdown.role = "listbox", this.dropdown.tabIndex = -1, this.dropdown.ariaOrientation = "vertical", this._isOpened || this.dropdown.classList.add("hidden"), this.dropdownClasses && (0, o.classToClassList)(this.dropdownClasses, this.dropdown), this.wrapper && this.wrapper.append(this.dropdown), this.dropdown && this.hasSearch && this.buildSearch(), this.selectOptions) {
                let e3 = "";
                this.selectOptions.forEach(((t3, i3) => {
                  t3.optgroupName && t3.optgroupName !== e3 && (this.hasOptgroup = true, e3 = t3.optgroupName, this.buildOptgroup(e3)), this.buildOption(t3.title, t3.val, t3.disabled, t3.selected, t3.options, `${i3}`, void 0, !!this.apiUrl);
                })), e3 = "";
              }
              this.apiUrl && this.optionsFromRemoteData(), this.apiUrl || (this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]")), "window" === this.dropdownScope && this.buildFloatingUI(), this.dropdown && this.apiLoadMore && this.setupInfiniteScroll();
            }
            buildOptgroup(e3) {
              const t3 = (0, o.htmlToElement)(this.optgroupTag || "<div></div>");
              t3.textContent = e3, this.optgroupClasses && (0, o.classToClassList)(this.optgroupClasses, t3), this.dropdown.append(t3);
            }
            setupInfiniteScroll() {
              this.dropdown.addEventListener("scroll", this.handleScroll.bind(this));
            }
            handleScroll() {
              return n(this, void 0, void 0, (function* () {
                if (!this.dropdown || this.isLoading || !this.hasMore || !this.apiLoadMore) return;
                const { scrollTop: e3, scrollHeight: t3, clientHeight: i3 } = this.dropdown;
                t3 - e3 - i3 < ("object" == typeof this.apiLoadMore ? this.apiLoadMore.scrollThreshold : 100) && (yield this.loadMore());
              }));
            }
            loadMore() {
              return n(this, void 0, void 0, (function* () {
                var e3, t3, i3, n2, s2, o2, l2, a2, r2, d2, c, h;
                if (!this.apiUrl || this.isLoading || !this.hasMore || !this.apiLoadMore) return;
                const u = this.requestId;
                this.isLoading = true;
                try {
                  const p = new URL(this.apiUrl), m = (null !== (e3 = this.lastQuery) && void 0 !== e3 ? e3 : "").trim().toLowerCase(), g = new URLSearchParams(null !== (t3 = this.apiQuery) && void 0 !== t3 ? t3 : ""), v = null !== (i3 = this.apiSearchQueryKey) && void 0 !== i3 ? i3 : "q";
                  "" !== m && g.set(v, m), p.search = g.toString();
                  const f = (null === (n2 = this.apiFieldsMap) || void 0 === n2 ? void 0 : n2.page) || (null === (s2 = this.apiFieldsMap) || void 0 === s2 ? void 0 : s2.offset) || "page", y = !!(null === (o2 = this.apiFieldsMap) || void 0 === o2 ? void 0 : o2.offset), b = "object" == typeof this.apiLoadMore ? this.apiLoadMore.perPage : 10, w = this.currentPage + 1;
                  if (y) {
                    const e4 = this.currentPage * b;
                    p.searchParams.set(f, String(e4));
                  } else p.searchParams.set(f, String(w));
                  if (p.searchParams.set((null === (l2 = this.apiFieldsMap) || void 0 === l2 ? void 0 : l2.limit) || "limit", String(b)), this.loadMoreAbortController) try {
                    this.loadMoreAbortController.abort();
                  } catch (e4) {
                  }
                  this.loadMoreAbortController = new AbortController();
                  const C = Object.assign(Object.assign({}, this.apiOptions || {}), { signal: this.loadMoreAbortController.signal }), S = yield fetch(p.toString(), C), x = yield S.json();
                  if (u !== this.requestId) return void (this.isLoading = false);
                  const L = this.apiDataPart ? null !== (r2 = null !== (a2 = x[this.apiDataPart]) && void 0 !== a2 ? a2 : x.results) && void 0 !== r2 ? r2 : x : null !== (d2 = x.results) && void 0 !== d2 ? d2 : x, T = (e4, t4) => t4.split(".").reduce(((e5, t5) => e5 ? e5[t5] : void 0), e4);
                  let E = null;
                  if (this.apiTotalPath) {
                    const e4 = T(x, this.apiTotalPath);
                    E = "number" == typeof e4 ? e4 : null;
                  } else E = null !== (h = null !== (c = "number" == typeof x.count ? x.count : null) && void 0 !== c ? c : "number" == typeof x.total ? x.total : null) && void 0 !== h ? h : x.info && "number" == typeof x.info.count ? x.info.count : null;
                  if (L && L.length > 0) {
                    if (this.remoteOptions = [...this.remoteOptions || [], ...L], this.buildOptionsFromRemoteData(L), "number" == typeof E) {
                      const e4 = w * b;
                      this.hasMore = e4 < E;
                    } else this.hasMore = L.length === b;
                    this.currentPage = w;
                  } else this.hasMore = false;
                } catch (e4) {
                  this.hasMore = false, console.error("Error loading more options:", e4);
                } finally {
                  this.isLoading = false;
                }
              }));
            }
            buildFloatingUI() {
              if ("undefined" != typeof FloatingUIDOM && FloatingUIDOM.computePosition) {
                document.body.appendChild(this.dropdown);
                const e3 = "tags" === this.mode ? this.wrapper : this.toggle, t3 = [FloatingUIDOM.offset([0, 5])];
                this.dropdownAutoPlacement && "function" == typeof FloatingUIDOM.flip && t3.push(FloatingUIDOM.flip({ fallbackPlacements: ["bottom-start", "bottom-end", "top-start", "top-end"] }));
                const i3 = { placement: r.POSITIONS[this.dropdownPlacement] || "bottom", strategy: "fixed", middleware: t3 }, n2 = () => {
                  Object.assign(this.dropdown.style, { marginLeft: "", marginTop: "", marginRight: "", marginBottom: "" }), FloatingUIDOM.computePosition(e3, this.dropdown, i3).then((({ x: e4, y: t4, placement: i4 }) => {
                    Object.assign(this.dropdown.style, { position: "fixed", left: `${e4}px`, top: `${t4}px`, ["margin" + (i4.startsWith("bottom") || i4.startsWith("top") ? "Top" : i4.startsWith("right") ? "Left" : "Right")]: `${i4.startsWith("top") ? "-" : ""}${this.dropdownSpace}px` }), this.dropdown.setAttribute("data-placement", i4);
                  }));
                };
                n2();
                const s2 = FloatingUIDOM.autoUpdate(e3, this.dropdown, n2);
                this.floatingUIInstance = { update: n2, destroy: s2 };
              } else console.error("FloatingUIDOM not found! Please enable it on the page.");
            }
            updateDropdownWidth() {
              const e3 = "tags" === this.mode ? this.wrapper : this.toggle;
              this.dropdown.style.width = `${e3.clientWidth}px`;
            }
            buildSearch() {
              var e3, t3, i3;
              if (!this.hasSearch) return;
              if ("tags" === this.mode) {
                const n3 = null !== (i3 = null !== (e3 = this.tagsInput) && void 0 !== e3 ? e3 : null === (t3 = this.wrapper) || void 0 === t3 ? void 0 : t3.querySelector(":scope input")) && void 0 !== i3 ? i3 : this.el.querySelector(":scope input");
                return n3 ? (this.search = n3, this.searchPlaceholder && (this.search.placeholder = this.searchPlaceholder), this.searchId && (this.search.id = this.searchId), this.searchClasses && (0, o.classToClassList)(this.searchClasses, this.search), void (this.apiUrl && (this.onSearchInputListener = (0, o.debounce)(((e4) => this.searchInput(e4))), this.search.addEventListener("input", this.onSearchInputListener)))) : void 0;
              }
              let n2;
              this.searchWrapper = (0, o.htmlToElement)(this.searchWrapperTemplate || "<div></div>"), this.searchWrapperClasses && (0, o.classToClassList)(this.searchWrapperClasses, this.searchWrapper), n2 = this.searchWrapper.querySelector("[data-input]");
              const s2 = (0, o.htmlToElement)(this.searchTemplate || '<input type="text">');
              this.search = "INPUT" === s2.tagName ? s2 : s2.querySelector(":scope input"), this.search.placeholder = this.searchPlaceholder, this.searchClasses && (0, o.classToClassList)(this.searchClasses, this.search), this.searchId && (this.search.id = this.searchId), this.onSearchInputListener = (0, o.debounce)(((e4) => this.searchInput(e4))), this.search.addEventListener("input", this.onSearchInputListener), n2 ? n2.append(s2) : this.searchWrapper.append(s2), this.dropdown.append(this.searchWrapper);
            }
            buildOption(e3, t3, i3 = false, n2 = false, s2, l2 = "1", a2, r2 = false) {
              var d2, c, h, u, p;
              let m = null, g = null, v = null, f = null;
              const y = (0, o.htmlToElement)(this.optionTag || "<div></div>");
              if (y.setAttribute("data-value", t3), y.setAttribute("data-title-value", e3), y.setAttribute("tabIndex", l2), y.classList.add("cursor-pointer"), y.setAttribute("data-id", a2 || `${this.optionId}`), r2 && y.setAttribute("data-static", "true"), a2 || this.optionId++, i3 && y.classList.add("disabled"), n2 && (this.isMultiple ? this.value = [...this.value, t3] : this.value = t3), this.optionTemplate && (m = (0, o.htmlToElement)(this.optionTemplate), y.append(m)), m ? (g = m.querySelector("[data-title]"), g.textContent = e3 || "") : y.textContent = e3 || "", s2) {
                const t4 = null !== (c = null === (d2 = s2.apiFields) || void 0 === d2 ? void 0 : d2.icon) && void 0 !== c ? c : s2.icon, i4 = null !== (u = null === (h = s2.apiFields) || void 0 === h ? void 0 : h.description) && void 0 !== u ? u : s2.description;
                if (t4) {
                  const i5 = (0, o.htmlToElement)(null !== (p = this.apiIconTag) && void 0 !== p ? p : t4);
                  if (i5.classList.add("max-w-full"), (this.apiUrl || s2.apiFields) && (i5.setAttribute("alt", e3), i5.setAttribute("src", t4)), m) v = m.querySelector("[data-icon]"), v.append(i5);
                  else {
                    const e4 = (0, o.htmlToElement)("<div></div>");
                    this.iconClasses && (0, o.classToClassList)(this.iconClasses, e4), e4.append(i5), y.append(e4);
                  }
                }
                if (Array.isArray(s2.additionalClasses) && s2.additionalClasses.forEach((([e4, t5]) => {
                  const i5 = e4 ? y.querySelector(e4) : y;
                  i5 && t5.forEach(((e5) => i5.classList.add(e5)));
                })), i4) if (y.dataset.description = i4, m) f = m.querySelector("[data-description]"), f && f.append(i4);
                else {
                  const e4 = (0, o.htmlToElement)("<div></div>");
                  e4.textContent = i4, this.descriptionClasses && (0, o.classToClassList)(this.descriptionClasses, e4), y.append(e4);
                }
              }
              m && m.querySelector("[data-icon]") && !s2 && !(null == s2 ? void 0 : s2.icon) && m.querySelector("[data-icon]").classList.add("hidden"), this.value && (this.isMultiple ? this.value.includes(t3) : this.value === t3) && y.classList.add("selected"), i3 || y.addEventListener("click", (() => this.onSelectOption(t3))), this.optionClasses && (0, o.classToClassList)(this.optionClasses, y), this.dropdown && this.dropdown.append(y), n2 && this.setNewValue();
            }
            buildOptionFromRemoteData(e3, t3, i3 = false, n2 = false, s2 = "1", o2, l2) {
              s2 ? this.buildOption(e3, t3, i3, n2, l2, s2, o2) : alert("ID parameter is required for generating remote options! Please check your API endpoint have it.");
            }
            buildOptionsFromRemoteData(e3) {
              e3.forEach(((e4, t3) => {
                let i3 = null, n2 = "", s2 = "";
                const o2 = { id: "", val: "", title: "", icon: null, description: null, rest: {} };
                Object.keys(e4).forEach(((t4) => {
                  var l3;
                  e4[this.apiFieldsMap.id] && (i3 = e4[this.apiFieldsMap.id], o2.id = `${i3}`), e4[this.apiFieldsMap.val] && (s2 = `${e4[this.apiFieldsMap.val]}`, o2.val = s2), e4[this.apiFieldsMap.title] && (n2 = e4[this.apiFieldsMap.title], o2.title = n2, e4[this.apiFieldsMap.val] || (s2 = n2, o2.val = s2)), e4[this.apiFieldsMap.icon] && (o2.icon = e4[this.apiFieldsMap.icon]), e4[null === (l3 = this.apiFieldsMap) || void 0 === l3 ? void 0 : l3.description] && (o2.description = e4[this.apiFieldsMap.description]), o2.rest[t4] = e4[t4];
                }));
                const l2 = this.staticOptions.findIndex(((e5) => e5.val === s2));
                if (-1 !== l2) return void this.mergeRemoteDataIntoStaticOption(l2, s2, o2, t3);
                if (!this.dropdown.querySelector(`[data-value="${s2}"]`)) {
                  const e5 = !!this.apiSelectedValues && (Array.isArray(this.apiSelectedValues) ? this.apiSelectedValues.includes(s2) : this.apiSelectedValues === s2);
                  this.buildOriginalOption(n2, s2, i3, false, e5, o2), this.buildOptionFromRemoteData(n2, s2, false, e5, `${t3}`, i3, o2), e5 && (this.isMultiple ? (this.value || (this.value = []), Array.isArray(this.value) && (this.value = [...this.value, s2])) : this.value = s2, this.toggle && (this.toggle.querySelector("[data-title]") && this.setToggleTitle(), this.toggle.querySelector("[data-icon]") && this.setToggleIcon()));
                }
              })), this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]");
            }
            mergeRemoteDataIntoStaticOption(e3, t3, i3, n2) {
              const s2 = this.staticOptions[e3];
              s2.options || (s2.options = {}), s2.options.apiFields || (s2.options.apiFields = {}), i3.title && (s2.title = i3.title), i3.icon && (s2.options.apiFields.icon = i3.icon), i3.description && (s2.options.apiFields.description = i3.description), Object.keys(i3.rest).forEach(((e4) => {
                s2.options.apiFields[e4] = i3.rest[e4];
              }));
              const l2 = this.dropdown.querySelector(`[data-value="${t3}"][data-static]`);
              if (l2) {
                if (l2.setAttribute("tabIndex", `${n2}`), i3.id && l2.setAttribute("data-id", `${i3.id}`), i3.title) {
                  l2.setAttribute("data-title-value", i3.title);
                  const e4 = l2.querySelector("[data-title]");
                  e4 && (e4.textContent = i3.title);
                }
                if (i3.icon) {
                  const e4 = l2.querySelector("[data-icon]");
                  if (e4) {
                    e4.innerHTML = "";
                    const t4 = (0, o.htmlToElement)(this.apiIconTag || "<img />");
                    t4.classList.add("max-w-full"), t4.setAttribute("alt", s2.title), t4.setAttribute("src", i3.icon), e4.append(t4);
                  }
                }
                if (i3.description) {
                  l2.dataset.description = i3.description;
                  const e4 = l2.querySelector("[data-description]");
                  e4 && (e4.textContent = i3.description);
                }
              }
              const a2 = this.el.querySelector(`option[value="${t3}"][data-static]`);
              if (a2) {
                i3.id && a2.setAttribute("data-id", `${i3.id}`), i3.title && (a2.textContent = i3.title);
                const e4 = { id: i3.id || "", val: i3.val || "", title: i3.title || "", icon: i3.icon || null, description: i3.description || null, rest: i3.rest };
                a2.setAttribute("data-hs-select-option", JSON.stringify(e4));
              }
              const r2 = this.selectOptions.findIndex(((e4) => e4.val === t3));
              -1 !== r2 && (this.selectOptions[r2] = s2);
              (this.isMultiple ? Array.isArray(this.value) && this.value.includes(t3) : this.value === t3) && this.toggle && (i3.title && (this.toggle.querySelector("[data-title]") ? this.setToggleTitle() : this.toggleTextWrapper && (this.isMultiple ? this.toggleTextWrapper.innerHTML = this.stringFromValue() : this.toggleTextWrapper.innerHTML = i3.title)), i3.icon && this.toggle.querySelector("[data-icon]") && this.setToggleIcon());
            }
            optionsFromRemoteData() {
              return n(this, arguments, void 0, (function* (e3 = "") {
                const t3 = yield this.apiRequest(e3);
                this.remoteOptions = t3, t3.length ? this.buildOptionsFromRemoteData(this.remoteOptions) : console.log("There is no data were responded!");
              }));
            }
            apiRequest() {
              return n(this, arguments, void 0, (function* (e3 = "", t3) {
                var i3, n2, s2, o2, l2, a2, r2, d2, c, h;
                try {
                  const u = new URL(this.apiUrl), p = new URLSearchParams(null !== (i3 = this.apiQuery) && void 0 !== i3 ? i3 : ""), m = null !== (n2 = this.apiOptions) && void 0 !== n2 ? n2 : {}, g = Object.assign({}, m);
                  t3 && (g.signal = t3);
                  const v = null !== (s2 = this.apiSearchQueryKey) && void 0 !== s2 ? s2 : "q", f = (null != e3 ? e3 : "").trim().toLowerCase();
                  if ("" !== f && p.set(v, f), this.apiLoadMore) {
                    const e4 = "object" == typeof this.apiLoadMore ? this.apiLoadMore.perPage : 10, t4 = null !== (r2 = null !== (l2 = null === (o2 = this.apiFieldsMap) || void 0 === o2 ? void 0 : o2.page) && void 0 !== l2 ? l2 : null === (a2 = this.apiFieldsMap) || void 0 === a2 ? void 0 : a2.offset) && void 0 !== r2 ? r2 : "page", i4 = null !== (c = null === (d2 = this.apiFieldsMap) || void 0 === d2 ? void 0 : d2.limit) && void 0 !== c ? c : "limit", n3 = Boolean(null === (h = this.apiFieldsMap) || void 0 === h ? void 0 : h.offset) ? 0 : 1, s3 = "number" == typeof this.apiPageStart ? this.apiPageStart : n3;
                    p.delete(t4), p.delete(i4), p.set(t4, String(s3)), p.set(i4, String(e4));
                  }
                  u.search = p.toString();
                  const y = yield fetch(u.toString(), g), b = yield y.json();
                  return this.apiDataPart ? b[this.apiDataPart] : b;
                } catch (e4) {
                  console.error(e4);
                }
              }));
            }
            sortElements(e3, t3) {
              if (this.hasOptgroup) return;
              const i3 = Array.from(e3.querySelectorAll(t3));
              this.isSelectedOptionOnTop && i3.sort(((e4, t4) => {
                const i4 = e4.classList.contains("selected") || e4.hasAttribute("selected"), n2 = t4.classList.contains("selected") || t4.hasAttribute("selected");
                return i4 && !n2 ? -1 : !i4 && n2 ? 1 : 0;
              })), i3.forEach(((t4, i4) => {
                e3.appendChild(t4), t4.hasAttribute("tabindex") && t4.setAttribute("tabIndex", `${i4}`);
              }));
            }
            remoteSearch(e3) {
              return n(this, void 0, void 0, (function* () {
                var t3, i3, n2, s2;
                if (this.requestId++, this.remoteSearchAbortController) try {
                  this.remoteSearchAbortController.abort();
                } catch (e4) {
                }
                if (this.loadMoreAbortController) try {
                  this.loadMoreAbortController.abort();
                } catch (e4) {
                }
                if (this.remoteSearchAbortController = new AbortController(), this.currentPage = 0, this.hasMore = true, this.isLoading = false, this.filterStaticOptions(e3), e3.length <= this.minSearchLength) {
                  const e4 = yield this.apiRequest("", null === (t3 = this.remoteSearchAbortController) || void 0 === t3 ? void 0 : t3.signal);
                  if (!e4) return false;
                  const n3 = Boolean(null === (i3 = this.apiFieldsMap) || void 0 === i3 ? void 0 : i3.offset) ? 0 : 1, s3 = "number" == typeof this.apiPageStart ? this.apiPageStart : n3;
                  return this.currentPage = s3, this.remoteOptions = e4, Array.from(this.dropdown.querySelectorAll("[data-value]:not([data-static])")).forEach(((e5) => e5.remove())), Array.from(this.el.querySelectorAll("option[value][data-hs-select-option]:not([data-static])")).forEach(((e5) => {
                    e5.remove();
                  })), e4.length ? this.buildOptionsFromRemoteData(e4) : console.log("No data responded!"), false;
                }
                const o2 = yield this.apiRequest(e3, null === (n2 = this.remoteSearchAbortController) || void 0 === n2 ? void 0 : n2.signal);
                if (!o2) return;
                const l2 = Boolean(null === (s2 = this.apiFieldsMap) || void 0 === s2 ? void 0 : s2.offset) ? 0 : 1, a2 = "number" == typeof this.apiPageStart ? this.apiPageStart : l2;
                this.currentPage = a2, this.remoteOptions = o2;
                let r2 = o2.map(((e4) => `${e4.id}`)), d2 = null;
                const c = this.dropdown.querySelectorAll("[data-value]:not([data-static])");
                this.el.querySelectorAll("[data-hs-select-option]:not([data-static])").forEach(((e4) => {
                  var t4;
                  const i4 = e4.getAttribute("data-id");
                  r2.includes(i4) || (null === (t4 = this.value) || void 0 === t4 ? void 0 : t4.includes(e4.value)) || this.destroyOriginalOption(e4.value);
                })), c.forEach(((e4) => {
                  var t4;
                  const i4 = e4.getAttribute("data-id");
                  r2.includes(i4) || (null === (t4 = this.value) || void 0 === t4 ? void 0 : t4.includes(e4.getAttribute("data-value"))) ? r2 = r2.filter(((e5) => e5 !== i4)) : this.destroyOption(e4.getAttribute("data-value"));
                })), d2 = o2.filter(((e4) => r2.includes(`${e4.id}`))), d2.length ? this.buildOptionsFromRemoteData(d2) : console.log("No data responded!");
              }));
            }
            filterStaticOptions(e3) {
              const t3 = this.dropdown.querySelectorAll("[data-value][data-static]"), i3 = e3.trim().toLowerCase();
              t3.forEach(((e4) => {
                var t4, n2;
                if (i3.length <= this.minSearchLength) e4.classList.remove("hidden");
                else {
                  const s2 = (null === (t4 = e4.getAttribute("data-title-value")) || void 0 === t4 ? void 0 : t4.toLowerCase()) || "", o2 = (null === (n2 = e4.dataset.description) || void 0 === n2 ? void 0 : n2.toLowerCase()) || "";
                  let l2 = false;
                  if (this.isSearchDirectMatch) l2 = s2.includes(i3) || !this.preventSearchInsideDescription && o2.includes(i3);
                  else {
                    const e5 = i3.split("").map(((e6) => /\w/.test(e6) ? `${e6}[\\W_]*` : "\\W*")).join(""), t5 = new RegExp(e5, "i");
                    l2 = t5.test(s2) || !this.preventSearchInsideDescription && t5.test(o2);
                  }
                  l2 ? e4.classList.remove("hidden") : e4.classList.add("hidden");
                }
              }));
            }
            destroyOption(e3) {
              const t3 = this.dropdown.querySelector(`[data-value="${e3}"]`);
              if (!t3) return false;
              t3.remove();
            }
            buildOriginalOption(e3, t3, i3, n2, s2, l2) {
              const a2 = (0, o.htmlToElement)("<option></option>");
              a2.setAttribute("value", t3), n2 && a2.setAttribute("disabled", "disabled"), s2 && a2.setAttribute("selected", "selected"), i3 && a2.setAttribute("data-id", i3), a2.setAttribute("data-hs-select-option", JSON.stringify(l2)), a2.innerText = e3, this.el.append(a2);
            }
            destroyOriginalOption(e3) {
              const t3 = this.el.querySelector(`[value="${e3}"]`);
              if (!t3) return false;
              t3.remove();
            }
            buildTagsInputHelper() {
              this.tagsInputHelper = document.createElement("span"), this.tagsInputHelper.style.fontSize = window.getComputedStyle(this.tagsInput).fontSize, this.tagsInputHelper.style.fontFamily = window.getComputedStyle(this.tagsInput).fontFamily, this.tagsInputHelper.style.fontWeight = window.getComputedStyle(this.tagsInput).fontWeight, this.tagsInputHelper.style.letterSpacing = window.getComputedStyle(this.tagsInput).letterSpacing, this.tagsInputHelper.style.visibility = "hidden", this.tagsInputHelper.style.whiteSpace = "pre", this.tagsInputHelper.style.position = "absolute", this.wrapper.appendChild(this.tagsInputHelper);
            }
            calculateInputWidth() {
              this.tagsInputHelper.textContent = this.tagsInput.value || this.tagsInput.placeholder;
              const e3 = parseInt(window.getComputedStyle(this.tagsInput).paddingLeft) + parseInt(window.getComputedStyle(this.tagsInput).paddingRight), t3 = parseInt(window.getComputedStyle(this.tagsInput).borderLeftWidth) + parseInt(window.getComputedStyle(this.tagsInput).borderRightWidth), i3 = this.tagsInputHelper.offsetWidth + e3 + t3, n2 = this.wrapper.offsetWidth - (parseInt(window.getComputedStyle(this.wrapper).paddingLeft) + parseInt(window.getComputedStyle(this.wrapper).paddingRight));
              this.tagsInput.style.width = `${Math.min(i3, n2) + 2}px`;
            }
            adjustInputWidth() {
              this.buildTagsInputHelper(), this.calculateInputWidth();
            }
            onSelectOption(e3) {
              if (this.clearSelections(), this.isMultiple ? (Array.isArray(this.value) || (this.value = []), this.value = this.value.includes(e3) ? this.value.filter(((t3) => t3 !== e3)) : [...this.value, e3], this.selectMultipleItems(), this.setNewValue()) : (this.value = e3, this.selectSingleItem(), this.setNewValue()), this.fireEvent("change", this.value), "tags" === this.mode) {
                const e4 = this.selectedItems.filter(((e5) => !this.value.includes(e5)));
                e4.length && e4.forEach(((e5) => {
                  this.selectedItems = this.selectedItems.filter(((t3) => t3 !== e5)), this.wrapper.querySelector(`[data-tag-value="${e5}"]`).remove();
                })), this.resetTagsInputField();
              }
              this.isMultiple || (this.toggle.querySelector("[data-icon]") && this.setToggleIcon(), this.toggle.querySelector("[data-title]") && this.setToggleTitle(), this.close(true)), this.hasValue() || "tags" !== this.mode || this.reassignTagsInputPlaceholder(this.placeholder), this._isOpened && "tags" === this.mode && this.tagsInput && this.tagsInput.focus(), this.triggerChangeEventForNativeSelect();
            }
            triggerChangeEventForNativeSelect() {
              const e3 = new Event("change", { bubbles: true });
              this.el.dispatchEvent(e3), (0, o.dispatch)("change.hs.select", this.el, this.value);
            }
            addSelectOption(e3, t3, i3, n2, s2) {
              this.selectOptions = [...this.selectOptions, { title: e3, val: t3, disabled: i3, selected: n2, options: s2 }];
            }
            removeSelectOption(e3, t3 = false) {
              if (!!!this.selectOptions.some(((t4) => t4.val === e3))) return false;
              this.selectOptions = this.selectOptions.filter(((t4) => t4.val !== e3)), this.value = t3 ? this.value.filter(((t4) => t4 !== e3)) : e3;
            }
            resetTagsInputField() {
              this.tagsInput.value = "", this.reassignTagsInputPlaceholder(""), this.searchOptions("");
            }
            clearSelections() {
              const e3 = this.el.querySelectorAll("option");
              Array.from(this.dropdown.children).forEach(((e4) => {
                e4.classList.contains("selected") && e4.classList.remove("selected");
              })), Array.from(e3).forEach(((e4) => {
                e4.selected && (e4.selected = false);
              }));
            }
            setNewValue() {
              if ("tags" === this.mode) this.setTagsItems();
              else if (this.optionAllowEmptyOption && "" === this.value) {
                const e3 = this.selectOptions.find(((e4) => "" === e4.val));
                this.toggleTextWrapper.innerHTML = (null == e3 ? void 0 : e3.title) || this.placeholder;
              } else if (this.hasValue()) if (this.apiUrl) {
                const e3 = this.dropdown.querySelector(`[data-value="${this.value}"]`);
                if (e3) this.toggleTextWrapper.innerHTML = e3.getAttribute("data-title-value") || this.placeholder;
                else {
                  const e4 = this.staticOptions.find(((e5) => e5.val === this.value));
                  if (e4) this.toggleTextWrapper.innerHTML = e4.title;
                  else {
                    const e5 = this.remoteOptions.find(((e6) => (e6[this.apiFieldsMap.val] ? `${e6[this.apiFieldsMap.val]}` : e6[this.apiFieldsMap.title]) === this.value));
                    this.toggleTextWrapper.innerHTML = e5 ? `${e5[this.apiFieldsMap.title]}` : this.stringFromValue();
                  }
                }
              } else this.toggleTextWrapper.innerHTML = this.stringFromValue();
              else this.toggleTextWrapper.innerHTML = this.placeholder;
            }
            stringFromValueBasic(e3) {
              var t3;
              const i3 = [];
              let n2 = "";
              if (e3.forEach(((e4) => {
                this.isMultiple ? Array.isArray(this.value) && this.value.includes(e4.val) && i3.push(e4.title) : this.value === e4.val && i3.push(e4.title);
              })), void 0 !== this.toggleCountText && null !== this.toggleCountText && i3.length >= this.toggleCountTextMinItems) if ("nItemsAndCount" === this.toggleCountTextMode) {
                const e4 = i3.slice(0, this.toggleCountTextMinItems - 1), s2 = [e4.join(this.toggleSeparators.items)], o2 = "" + (i3.length - e4.length);
                if ((null === (t3 = null == this ? void 0 : this.toggleSeparators) || void 0 === t3 ? void 0 : t3.betweenItemsAndCounter) && s2.push(this.toggleSeparators.betweenItemsAndCounter), this.toggleCountText) switch (this.toggleCountTextPlacement) {
                  case "postfix-no-space":
                    s2.push(`${o2}${this.toggleCountText}`);
                    break;
                  case "prefix-no-space":
                    s2.push(`${this.toggleCountText}${o2}`);
                    break;
                  case "prefix":
                    s2.push(`${this.toggleCountText} ${o2}`);
                    break;
                  default:
                    s2.push(`${o2} ${this.toggleCountText}`);
                }
                n2 = s2.join(" ");
              } else n2 = `${i3.length} ${this.toggleCountText}`;
              else n2 = i3.join(this.toggleSeparators.items);
              return n2;
            }
            stringFromValueRemoteData() {
              if (!this.dropdown) return this.stringFromValueBasic(this.selectOptions);
              const e3 = this.dropdown.querySelectorAll("[data-title-value]"), t3 = [];
              let i3 = "";
              if (e3.forEach(((e4) => {
                const i4 = e4.getAttribute("data-value"), n2 = e4.getAttribute("data-title-value");
                this.isMultiple ? Array.isArray(this.value) && this.value.includes(i4) && t3.push(n2) : this.value === i4 && t3.push(n2);
              })), this.toggleCountText && "" !== this.toggleCountText && t3.length >= this.toggleCountTextMinItems) if ("nItemsAndCount" === this.toggleCountTextMode) {
                const e4 = t3.slice(0, this.toggleCountTextMinItems - 1);
                i3 = `${e4.join(this.toggleSeparators.items)} ${this.toggleSeparators.betweenItemsAndCounter} ${t3.length - e4.length} ${this.toggleCountText}`;
              } else i3 = `${t3.length} ${this.toggleCountText}`;
              else i3 = t3.join(this.toggleSeparators.items);
              return i3;
            }
            stringFromValue() {
              return this.apiUrl ? this.stringFromValueRemoteData() : this.stringFromValueBasic(this.selectOptions);
            }
            selectSingleItem() {
              const e3 = this.el.querySelectorAll("option");
              Array.from(e3).find(((e4) => this.value === e4.value)).selected = true;
              const t3 = Array.from(this.dropdown.children).find(((e4) => this.value === e4.getAttribute("data-value")));
              t3 && t3.classList.add("selected"), this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]");
            }
            selectMultipleItems() {
              if (!Array.isArray(this.value)) return;
              const e3 = this.el.querySelectorAll("option");
              Array.from(this.dropdown.children).filter(((e4) => this.value.includes(e4.getAttribute("data-value")))).forEach(((e4) => e4.classList.add("selected"))), Array.from(e3).filter(((e4) => this.value.includes(e4.value))).forEach(((e4) => e4.selected = true)), this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]");
            }
            unselectMultipleItems() {
              const e3 = this.el.querySelectorAll("option");
              Array.from(this.dropdown.children).forEach(((e4) => e4.classList.remove("selected"))), Array.from(e3).forEach(((e4) => e4.selected = false)), this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]");
            }
            searchOptions(e3) {
              if (e3.length <= this.minSearchLength) {
                this.searchNoResult && (this.searchNoResult.remove(), this.searchNoResult = null);
                return this.dropdown.querySelectorAll("[data-value]").forEach(((e4) => {
                  e4.classList.remove("hidden");
                })), false;
              }
              this.searchNoResult && (this.searchNoResult.remove(), this.searchNoResult = null), this.searchNoResult = (0, o.htmlToElement)(this.searchNoResultTemplate), this.searchNoResult.innerText = this.searchNoResultText, (0, o.classToClassList)(this.searchNoResultClasses, this.searchNoResult);
              const t3 = this.dropdown.querySelectorAll("[data-value]");
              let i3, n2 = false;
              this.searchLimit && (i3 = 0), t3.forEach(((t4) => {
                var s2, o2;
                const l2 = t4.getAttribute("data-title-value").toLocaleLowerCase();
                let a2;
                if (this.isSearchDirectMatch) {
                  a2 = ((null === (s2 = null == t4 ? void 0 : t4.dataset) || void 0 === s2 ? void 0 : s2.description) && !this.preventSearchInsideDescription ? !l2.includes(e3.toLocaleLowerCase()) && !t4.dataset.description.toLocaleLowerCase().includes(e3.toLocaleLowerCase()) : !l2.includes(e3.toLocaleLowerCase())) || this.searchLimit && i3 >= this.searchLimit;
                } else {
                  const n3 = e3 ? e3.split("").map(((e4) => /\w/.test(e4) ? `${e4}[\\W_]*` : "\\W*")).join("") : "", s3 = new RegExp(n3, "i");
                  a2 = ((null === (o2 = null == t4 ? void 0 : t4.dataset) || void 0 === o2 ? void 0 : o2.description) && !this.preventSearchInsideDescription ? !s3.test(l2.trim()) && !t4.dataset.description.toLocaleLowerCase().includes(e3.toLocaleLowerCase()) : !s3.test(l2.trim())) || this.searchLimit && i3 >= this.searchLimit;
                }
                a2 ? t4.classList.add("hidden") : (t4.classList.remove("hidden"), n2 = true, this.searchLimit && i3++);
              })), n2 || this.dropdown.append(this.searchNoResult);
            }
            eraseToggleIcon() {
              const e3 = this.toggle.querySelector("[data-icon]");
              e3 && (e3.innerHTML = null, e3.classList.add("hidden"));
            }
            eraseToggleTitle() {
              const e3 = this.toggle.querySelector("[data-title]");
              e3 ? e3.innerHTML = this.placeholder : this.toggleTextWrapper.innerHTML = this.placeholder;
            }
            toggleFn() {
              this._isOpened ? this.close() : this.open();
            }
            setupAccessibility() {
              this.accessibilityComponent = window.HSAccessibilityObserver.registerComponent(this.wrapper, { onEnter: () => {
                if (this._isOpened) {
                  const e3 = this.dropdown.querySelector(".hs-select-option-highlighted");
                  e3 && (this.onSelectOption(e3.getAttribute("data-value") || ""), this._isOpened && e3.focus());
                } else this.open();
              }, onSpace: () => {
                if (this._isOpened) {
                  const e3 = this.dropdown.querySelector(".hs-select-option-highlighted");
                  e3 && (this.onSelectOption(e3.getAttribute("data-value") || ""), this._isOpened && e3.focus());
                } else this.open();
              }, onEsc: () => {
                this._isOpened && this.close(true);
              }, onArrow: (e3) => {
                if (!e3.metaKey) if (this._isOpened || "ArrowDown" !== e3.key) {
                  if (this._isOpened) switch (e3.key) {
                    case "ArrowDown":
                      this.focusMenuItem("next");
                      break;
                    case "ArrowUp":
                      this.focusMenuItem("prev");
                      break;
                    case "Home":
                      this.onStartEnd(true);
                      break;
                    case "End":
                      this.onStartEnd(false);
                  }
                } else this.open();
              }, onHome: () => {
                this._isOpened && this.onStartEnd(true);
              }, onEnd: () => {
                this._isOpened && this.onStartEnd(false);
              }, onTab: () => {
                this._isOpened && this.close();
              } }, this._isOpened, "Select", ".hs-select", this.dropdown);
            }
            focusMenuItem(e3) {
              const t3 = Array.from(this.dropdown.querySelectorAll(":scope > *:not(.hidden)")).filter(((e4) => !e4.classList.contains("disabled")));
              if (!t3.length) return;
              const i3 = this.dropdown.querySelector(".hs-select-option-highlighted"), n2 = i3 ? t3.indexOf(i3) : -1, s2 = "next" === e3 ? (n2 + 1) % t3.length : (n2 - 1 + t3.length) % t3.length;
              i3 && i3.classList.remove("hs-select-option-highlighted"), t3[s2].classList.add("hs-select-option-highlighted"), t3[s2].focus();
            }
            onStartEnd(e3 = true) {
              if (!this.dropdown) return;
              const t3 = Array.from(this.dropdown.querySelectorAll(":scope > *:not(.hidden)")).filter(((e4) => !e4.classList.contains("disabled")));
              if (!t3.length) return;
              const i3 = this.dropdown.querySelector(".hs-select-option-highlighted");
              i3 && i3.classList.remove("hs-select-option-highlighted");
              const n2 = e3 ? 0 : t3.length - 1;
              t3[n2].classList.add("hs-select-option-highlighted"), t3[n2].focus();
            }
            destroy() {
              var e3;
              this.wrapper && this.wrapper.removeEventListener("click", this.onWrapperClickListener), this.toggle && this.toggle.removeEventListener("click", this.onToggleClickListener), this.tagsInput && (this.tagsInput.removeEventListener("focus", this.onTagsInputFocusListener), this.tagsInput.removeEventListener("input", this.onTagsInputInputListener), this.tagsInput.removeEventListener("input", this.onTagsInputInputSecondListener), this.tagsInput.removeEventListener("keydown", this.onTagsInputKeydownListener)), this.search && this.search.removeEventListener("input", this.onSearchInputListener);
              const t3 = this.el.parentElement.parentElement;
              this.el.classList.add("hidden"), this.el.style.display = "", t3.prepend(this.el), t3.querySelector(".hs-select").remove(), this.wrapper = null, null === (e3 = this.disabledObserver) || void 0 === e3 || e3.disconnect(), this.disabledObserver = null, window.$hsSelectCollection = window.$hsSelectCollection.filter((({ element: e4 }) => e4.el !== this.el));
            }
            open() {
              var e3;
              const t3 = (null === (e3 = null === window || void 0 === window ? void 0 : window.$hsSelectCollection) || void 0 === e3 ? void 0 : e3.find(((e4) => e4.element.isOpened()))) || null;
              if (t3 && t3.element.close(), this.animationInProcess) return false;
              this.animationInProcess = true, "window" === this.dropdownScope && this.dropdown.classList.add("invisible"), this.dropdown.classList.remove("hidden"), "window" !== this.dropdownScope && this.recalculateDirection(), setTimeout((() => {
                var e4;
                if ((null === (e4 = null == this ? void 0 : this.toggle) || void 0 === e4 ? void 0 : e4.ariaExpanded) && (this.toggle.ariaExpanded = "true"), this.wrapper.classList.add("active"), this.dropdown.classList.add("opened"), this.dropdown.classList.contains("w-full") && "window" === this.dropdownScope && this.updateDropdownWidth(), this.floatingUIInstance && "window" === this.dropdownScope && (this.floatingUIInstance.update(), this.dropdown.classList.remove("invisible")), this.hasSearch && !this.preventSearchFocus && this.search.focus(), this.animationInProcess = false, this.scrollToSelected && this.dropdown) {
                  const e5 = this.dropdown.querySelector(".selected");
                  if (e5) {
                    const t4 = this.dropdown.clientHeight, i3 = e5.offsetTop - t4 / 2 + e5.clientHeight / 2;
                    this.dropdown.scrollTop = i3;
                  }
                }
              })), this._isOpened = true, window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, this._isOpened);
            }
            close(e3 = false) {
              var t3, i3, n2, s2;
              if (this.animationInProcess) return false;
              this.animationInProcess = true, (null === (t3 = null == this ? void 0 : this.toggle) || void 0 === t3 ? void 0 : t3.ariaExpanded) && (this.toggle.ariaExpanded = "false"), this.wrapper.classList.remove("active"), this.dropdown.classList.remove("opened", "bottom-full", "top-full"), (null === (i3 = this.dropdownDirectionClasses) || void 0 === i3 ? void 0 : i3.bottom) && this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom), (null === (n2 = this.dropdownDirectionClasses) || void 0 === n2 ? void 0 : n2.top) && this.dropdown.classList.remove(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = "", this.dropdown.style.marginBottom = "", (0, o.afterTransition)(this.dropdown, (() => {
                var t4;
                this.dropdown.classList.add("hidden"), this.hasSearch && "tags" !== this.mode && (this.search.value = "", this.apiUrl ? this.filterStaticOptions("") : this.search.dispatchEvent(new Event("input", { bubbles: true })), this.search.blur()), e3 && ((null === (t4 = this.mode) || void 0 === t4 ? void 0 : t4.includes("tags")) ? this.wrapper.focus() : this.toggle.focus()), this.animationInProcess = false;
              })), null === (s2 = this.dropdown.querySelector(".hs-select-option-highlighted")) || void 0 === s2 || s2.classList.remove("hs-select-option-highlighted"), this._isOpened = false, window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, this._isOpened);
            }
            addOption(e3) {
              let t3 = `${this.selectOptions.length}`;
              const i3 = (e4) => {
                const { title: i4, val: n2, disabled: s2, selected: o2, options: l2 } = e4;
                !!this.selectOptions.some(((e5) => e5.val === n2)) || (this.addSelectOption(i4, n2, s2, o2, l2), this.buildOption(i4, n2, s2, o2, l2, t3), this.buildOriginalOption(i4, n2, null, s2, o2, l2), o2 && !this.isMultiple && this.onSelectOption(n2));
              };
              Array.isArray(e3) ? e3.forEach(((e4) => {
                i3(e4);
              })) : i3(e3), this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]");
            }
            removeOption(e3) {
              const t3 = (e4, t4 = false) => {
                !!this.selectOptions.some(((t5) => t5.val === e4)) && (this.removeSelectOption(e4, t4), this.destroyOption(e4), this.destroyOriginalOption(e4), this.value === e4 && (this.value = null, this.eraseToggleTitle(), this.eraseToggleIcon()));
              };
              Array.isArray(e3) ? e3.forEach(((e4) => {
                t3(e4, this.isMultiple);
              })) : t3(e3, this.isMultiple), this.setNewValue(), this.sortElements(this.el, "option"), this.sortElements(this.dropdown, "[data-value]");
            }
            recalculateDirection() {
              var e3, t3, i3, n2;
              if ((null == this ? void 0 : this.dropdownVerticalFixedPlacement) && (this.dropdown.classList.contains("bottom-full") || this.dropdown.classList.contains("top-full"))) return false;
              "top" === (null == this ? void 0 : this.dropdownVerticalFixedPlacement) ? (this.dropdown.classList.add("bottom-full"), this.dropdown.style.marginBottom = `${this.dropdownSpace}px`) : "bottom" === (null == this ? void 0 : this.dropdownVerticalFixedPlacement) ? (this.dropdown.classList.add("top-full"), this.dropdown.style.marginTop = `${this.dropdownSpace}px`) : (0, o.isEnoughSpace)(this.dropdown, this.toggle || this.tagsInput, "bottom", this.dropdownSpace, this.viewport) ? (this.dropdown.classList.remove("bottom-full"), (null === (e3 = this.dropdownDirectionClasses) || void 0 === e3 ? void 0 : e3.bottom) && this.dropdown.classList.remove(this.dropdownDirectionClasses.bottom), this.dropdown.style.marginBottom = "", this.dropdown.classList.add("top-full"), (null === (t3 = this.dropdownDirectionClasses) || void 0 === t3 ? void 0 : t3.top) && this.dropdown.classList.add(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = `${this.dropdownSpace}px`) : (this.dropdown.classList.remove("top-full"), (null === (i3 = this.dropdownDirectionClasses) || void 0 === i3 ? void 0 : i3.top) && this.dropdown.classList.remove(this.dropdownDirectionClasses.top), this.dropdown.style.marginTop = "", this.dropdown.classList.add("bottom-full"), (null === (n2 = this.dropdownDirectionClasses) || void 0 === n2 ? void 0 : n2.bottom) && this.dropdown.classList.add(this.dropdownDirectionClasses.bottom), this.dropdown.style.marginBottom = `${this.dropdownSpace}px`);
            }
            isOpened() {
              return this._isOpened || false;
            }
            containsElement(e3) {
              var t3;
              return (null === (t3 = this.wrapper) || void 0 === t3 ? void 0 : t3.contains(e3)) || false;
            }
            static findInCollection(e3) {
              return window.$hsSelectCollection.find(((t3) => e3 instanceof d ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsSelectCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsSelectCollection || (window.$hsSelectCollection = [], window.addEventListener("click", ((e3) => {
                const t3 = e3.target;
                d.closeCurrentlyOpened(t3);
              }))), window.$hsSelectCollection && (window.$hsSelectCollection = window.$hsSelectCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-select]:not(.--prevent-on-load-init)").forEach(((e3) => {
                if (!window.$hsSelectCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                }))) {
                  const t3 = e3.getAttribute("data-hs-select"), i3 = t3 ? JSON.parse(t3) : {};
                  new d(e3, i3);
                }
              }));
            }
            static open(e3) {
              const t3 = d.findInCollection(e3);
              t3 && !t3.element.isOpened() && t3.element.open();
            }
            static close(e3) {
              const t3 = d.findInCollection(e3);
              t3 && t3.element.isOpened() && t3.element.close();
            }
            static closeCurrentlyOpened(e3 = null) {
              if (!e3.closest(".hs-select.active") && !e3.closest("[data-hs-select-dropdown].opened")) {
                const e4 = window.$hsSelectCollection.filter(((e5) => e5.element.isOpened())) || null;
                e4 && e4.forEach(((e5) => {
                  e5.element.close();
                }));
              }
            }
          }
          window.addEventListener("load", (() => {
            d.autoInit();
          })), document.addEventListener("scroll", (() => {
            if (!window.$hsSelectCollection) return false;
            const e3 = window.$hsSelectCollection.find(((e4) => e4.element.isOpened()));
            e3 && e3.element.recalculateDirection();
          })), "undefined" != typeof window && (window.HSSelect = d), t2.default = d;
        }, 485: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3, i3) {
              super(e3, t3, i3), this.contentId = this.el.dataset.hsCollapse, this.content = document.querySelector(this.contentId), this.animationInProcess = false, this.content && this.init();
            }
            elementClick() {
              this.content.classList.contains("open") ? this.hide() : this.show();
            }
            init() {
              var e3;
              this.createCollection(window.$hsCollapseCollection, this), this.onElementClickListener = () => this.elementClick(), (null === (e3 = null == this ? void 0 : this.el) || void 0 === e3 ? void 0 : e3.ariaExpanded) && (this.el.classList.contains("open") ? this.el.ariaExpanded = "true" : this.el.ariaExpanded = "false"), this.el.addEventListener("click", this.onElementClickListener);
            }
            hideAllMegaMenuItems() {
              this.content.querySelectorAll(".hs-mega-menu-content.block").forEach(((e3) => {
                e3.classList.remove("block"), e3.classList.add("hidden");
              }));
            }
            show() {
              var e3;
              if (this.animationInProcess || this.el.classList.contains("open")) return false;
              this.animationInProcess = true, this.el.classList.add("open"), (null === (e3 = null == this ? void 0 : this.el) || void 0 === e3 ? void 0 : e3.ariaExpanded) && (this.el.ariaExpanded = "true"), this.content.classList.add("open"), this.content.classList.remove("hidden"), this.content.style.height = "0", setTimeout((() => {
                this.content.style.height = `${this.content.scrollHeight}px`, this.fireEvent("beforeOpen", this.el), (0, s.dispatch)("beforeOpen.hs.collapse", this.el, this.el), (0, s.afterTransition)(this.content, (() => {
                  this.content.style.height = "", this.fireEvent("open", this.el), (0, s.dispatch)("open.hs.collapse", this.el, this.el), this.animationInProcess = false;
                }));
              }));
            }
            hide() {
              var e3;
              if (this.animationInProcess || !this.el.classList.contains("open")) return false;
              this.animationInProcess = true, this.el.classList.remove("open"), (null === (e3 = null == this ? void 0 : this.el) || void 0 === e3 ? void 0 : e3.ariaExpanded) && (this.el.ariaExpanded = "false"), this.content.style.height = `${this.content.scrollHeight}px`, setTimeout((() => {
                this.content.style.height = "0";
              })), this.content.classList.remove("open"), (0, s.afterTransition)(this.content, (() => {
                this.content.classList.add("hidden"), this.content.style.height = "", this.fireEvent("hide", this.el), (0, s.dispatch)("hide.hs.collapse", this.el, this.el), this.animationInProcess = false;
              })), this.content.querySelectorAll(".hs-mega-menu-content.block").length && this.hideAllMegaMenuItems();
            }
            destroy() {
              this.el.removeEventListener("click", this.onElementClickListener), this.content = null, this.animationInProcess = false, window.$hsCollapseCollection = window.$hsCollapseCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static findInCollection(e3) {
              return window.$hsCollapseCollection.find(((t3) => e3 instanceof l ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static getInstance(e3, t3 = false) {
              const i3 = window.$hsCollapseCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsCollapseCollection || (window.$hsCollapseCollection = []), window.$hsCollapseCollection && (window.$hsCollapseCollection = window.$hsCollapseCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll(".hs-collapse-toggle:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsCollapseCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
            static show(e3) {
              const t3 = l.findInCollection(e3);
              t3 && t3.element.content.classList.contains("hidden") && t3.element.show();
            }
            static hide(e3) {
              const t3 = l.findInCollection(e3);
              t3 && !t3.element.content.classList.contains("hidden") && t3.element.hide();
            }
            static on(e3, t3, i3) {
              const n2 = l.findInCollection(t3);
              n2 && (n2.element.events[e3] = i3);
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSCollapse = l), t2.default = l;
        }, 502: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = n(i2(961));
          class o extends s.default {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-theme-switch"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.theme = (null == s2 ? void 0 : s2.theme) || localStorage.getItem("hs_theme") || "default", this.type = (null == s2 ? void 0 : s2.type) || "change", this.init();
            }
            elementChange(e3) {
              const t3 = e3.target.checked ? "dark" : "default";
              this.setAppearance(t3), this.toggleObserveSystemTheme();
            }
            elementClick(e3) {
              this.setAppearance(e3), this.toggleObserveSystemTheme();
            }
            init() {
              this.createCollection(window.$hsThemeSwitchCollection, this), "default" !== this.theme && this.setAppearance(), "click" === this.type ? this.buildSwitchTypeOfClick() : this.buildSwitchTypeOfChange();
            }
            buildSwitchTypeOfChange() {
              this.el.checked = "dark" === this.theme, this.toggleObserveSystemTheme(), this.onElementChangeListener = (e3) => this.elementChange(e3), this.el.addEventListener("change", this.onElementChangeListener);
            }
            buildSwitchTypeOfClick() {
              const e3 = this.el.getAttribute("data-hs-theme-click-value");
              this.toggleObserveSystemTheme(), this.onElementClickListener = () => this.elementClick(e3), this.el.addEventListener("click", this.onElementClickListener);
            }
            setResetStyles() {
              const e3 = document.createElement("style");
              return e3.innerText = "*{transition: unset !important;}", e3.setAttribute("data-hs-appearance-onload-styles", ""), document.head.appendChild(e3), e3;
            }
            addSystemThemeObserver() {
              o.systemThemeObserver || (o.systemThemeObserver = (e3) => {
                var t3;
                null === (t3 = window.$hsThemeSwitchCollection) || void 0 === t3 || t3.forEach(((e4) => {
                  "auto" === localStorage.getItem("hs_theme") && e4.element.setAppearance("auto", false);
                }));
              }, window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", o.systemThemeObserver));
            }
            removeSystemThemeObserver() {
              o.systemThemeObserver && (window.matchMedia("(prefers-color-scheme: dark)").removeEventListener("change", o.systemThemeObserver), o.systemThemeObserver = null);
            }
            toggleObserveSystemTheme() {
              "auto" === localStorage.getItem("hs_theme") ? this.addSystemThemeObserver() : this.removeSystemThemeObserver();
            }
            setAppearance(e3 = this.theme, t3 = true, i3 = true) {
              const n2 = document.querySelector("html"), s2 = this.setResetStyles();
              t3 && localStorage.setItem("hs_theme", e3);
              let o2 = e3;
              "default" === o2 && (o2 = "light"), "auto" === o2 && (o2 = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light"), n2.classList.remove("light", "dark", "default", "auto"), "auto" === e3 ? n2.classList.add("auto", o2) : n2.classList.add(o2), setTimeout((() => s2.remove())), i3 && window.dispatchEvent(new CustomEvent("on-hs-appearance-change", { detail: e3 }));
            }
            destroy() {
              "change" === this.type && this.el.removeEventListener("change", this.onElementChangeListener), "click" === this.type && this.el.removeEventListener("click", this.onElementClickListener), window.$hsThemeSwitchCollection = window.$hsThemeSwitchCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsThemeSwitchCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsThemeSwitchCollection || (window.$hsThemeSwitchCollection = []), window.$hsThemeSwitchCollection && (window.$hsThemeSwitchCollection = window.$hsThemeSwitchCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-theme-switch]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsThemeSwitchCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new o(e3, { type: "change" });
              })), document.querySelectorAll("[data-hs-theme-click-value]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsThemeSwitchCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new o(e3, { type: "click" });
              }));
            }
          }
          o.systemThemeObserver = null, window.addEventListener("load", (() => {
            o.autoInit();
          })), window.$hsThemeSwitchCollection && window.addEventListener("on-hs-appearance-change", ((e3) => {
            window.$hsThemeSwitchCollection.forEach(((t3) => {
              t3.element.el.checked = "dark" === e3.detail;
            }));
          })), "undefined" != typeof window && (window.HSThemeSwitch = o), t2.default = o;
        }, 632: (e2, t2, i2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true });
          const n = i2(359);
          class s extends n.Calendar {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = this.set;
              this.set = (e4, t4) => {
                i3 && i3.call(this, e4, t4), e4.selectedTime && this.onChangeTime && this.onChangeTime(this, null, true), e4.selectedMonth && this.onClickMonth && this.onClickMonth(this, null), e4.selectedYear && this.onClickYear && this.onClickYear(this, null);
              };
            }
            static get defaultStyles() {
              return { calendar: "vc", controls: "vc-controls", grid: "vc-grid", column: "vc-column", header: "vc-header", headerContent: "vc-header__content", month: "vc-month", year: "vc-year", arrowPrev: "vc-arrow vc-arrow_prev", arrowNext: "vc-arrow vc-arrow_next", wrapper: "vc-wrapper", content: "vc-content", months: "vc-months", monthsMonth: "vc-months__month", years: "vc-years", yearsYear: "vc-years__year", week: "vc-week", weekDay: "vc-week__day", weekNumbers: "vc-week-numbers", weekNumbersTitle: "vc-week-numbers__title", weekNumbersContent: "vc-week-numbers__content", weekNumber: "vc-week-number", dates: "vc-dates", date: "vc-date", dateBtn: "vc-date__btn", datePopup: "vc-date__popup", dateRangeTooltip: "vc-date-range-tooltip", time: "vc-time", timeContent: "vc-time__content", timeHour: "vc-time__hour", timeMinute: "vc-time__minute", timeKeeping: "vc-time__keeping", timeRanges: "vc-time__ranges", timeRange: "vc-time__range" };
            }
            logInfo() {
              console.log("This log is from CustomVanillaCalendar!", this);
            }
          }
          t2.default = s;
        }, 639: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              var i3, n2;
              super(e3, t3);
              const s2 = e3.getAttribute("data-hs-scroll-nav"), o2 = s2 ? JSON.parse(s2) : {}, l2 = Object.assign(Object.assign(Object.assign({}, { paging: true, autoCentering: false }), o2), t3);
              this.paging = null === (i3 = l2.paging) || void 0 === i3 || i3, this.autoCentering = null !== (n2 = l2.autoCentering) && void 0 !== n2 && n2, this.body = this.el.querySelector(".hs-scroll-nav-body"), this.items = this.body ? Array.from(this.body.querySelectorAll(":scope > *")) : [], this.prev = this.el.querySelector(".hs-scroll-nav-prev") || null, this.next = this.el.querySelector(".hs-scroll-nav-next") || null, this.setCurrentState(), this.init();
            }
            init() {
              if (!this.body || !this.items.length) return false;
              this.createCollection(window.$hsScrollNavCollection, this), this.setCurrentState(), this.paging ? (this.prev && this.buildPrev(), this.next && this.buildNext()) : (this.prev && this.buildPrevSingle(), this.next && this.buildNextSingle()), this.autoCentering && this.scrollToActiveElement(), this.body.addEventListener("scroll", (0, s.debounce)((() => this.setCurrentState()), 200)), window.addEventListener("resize", (0, s.debounce)((() => {
                this.setCurrentState(), this.autoCentering && this.scrollToActiveElement();
              }), 200));
            }
            setCurrentState() {
              this.currentState = { first: this.getFirstVisibleItem(), last: this.getLastVisibleItem(), center: this.getCenterVisibleItem() }, this.prev && this.setPrevToDisabled(), this.next && this.setNextToDisabled();
            }
            setPrevToDisabled() {
              this.currentState.first === this.items[0] ? (this.prev.setAttribute("disabled", "disabled"), this.prev.classList.add("disabled")) : (this.prev.removeAttribute("disabled"), this.prev.classList.remove("disabled"));
            }
            setNextToDisabled() {
              this.currentState.last === this.items[this.items.length - 1] ? (this.next.setAttribute("disabled", "disabled"), this.next.classList.add("disabled")) : (this.next.removeAttribute("disabled"), this.next.classList.remove("disabled"));
            }
            buildPrev() {
              this.prev && this.prev.addEventListener("click", (() => {
                const e3 = this.currentState.first;
                if (!e3) return;
                const t3 = this.getVisibleItemsCount();
                let i3 = e3;
                for (let e4 = 0; e4 < t3 && i3.previousElementSibling; e4++) i3 = i3.previousElementSibling;
                this.goTo(i3);
              }));
            }
            buildNext() {
              this.next && this.next.addEventListener("click", (() => {
                const e3 = this.currentState.last;
                if (!e3) return;
                const t3 = this.getVisibleItemsCount();
                let i3 = e3;
                for (let e4 = 0; e4 < t3 && i3.nextElementSibling; e4++) i3 = i3.nextElementSibling;
                this.goTo(i3);
              }));
            }
            buildPrevSingle() {
              var e3;
              null === (e3 = this.prev) || void 0 === e3 || e3.addEventListener("click", (() => {
                const e4 = this.currentState.first;
                if (!e4) return;
                const t3 = e4.previousElementSibling;
                t3 && this.goTo(t3);
              }));
            }
            buildNextSingle() {
              var e3;
              null === (e3 = this.next) || void 0 === e3 || e3.addEventListener("click", (() => {
                const e4 = this.currentState.last;
                if (!e4) return;
                const t3 = e4.nextElementSibling;
                t3 && this.goTo(t3);
              }));
            }
            getCenterVisibleItem() {
              const e3 = this.body.scrollLeft + this.body.clientWidth / 2;
              let t3 = null, i3 = 1 / 0;
              return this.items.forEach(((n2) => {
                const s2 = n2.offsetLeft + n2.offsetWidth / 2, o2 = Math.abs(s2 - e3);
                o2 < i3 && (i3 = o2, t3 = n2);
              })), t3;
            }
            getFirstVisibleItem() {
              const e3 = this.body.getBoundingClientRect();
              for (let t3 of this.items) {
                const i3 = t3.getBoundingClientRect();
                if (i3.left >= e3.left && i3.right <= e3.right) return t3;
              }
              return null;
            }
            getLastVisibleItem() {
              const e3 = this.body.getBoundingClientRect();
              for (let t3 = this.items.length - 1; t3 >= 0; t3--) {
                const i3 = this.items[t3], n2 = i3.getBoundingClientRect();
                if (n2.left < e3.right && n2.right > e3.left) return i3;
              }
              return null;
            }
            getVisibleItemsCount() {
              const e3 = this.body.clientWidth;
              let t3 = 0, i3 = 0;
              for (let n2 of this.items) {
                if (i3 += n2.offsetWidth, !(i3 <= e3)) break;
                t3++;
              }
              return t3;
            }
            scrollToActiveElement() {
              const e3 = this.body.querySelector(".active");
              if (!e3) return false;
              this.centerElement(e3);
            }
            getCurrentState() {
              return this.currentState;
            }
            goTo(e3, t3) {
              e3.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "nearest" });
              new IntersectionObserver(((i3, n2) => {
                i3.forEach(((i4) => {
                  i4.target === e3 && i4.isIntersecting && ("function" == typeof t3 && t3(), n2.disconnect());
                }));
              }), { root: this.body, threshold: 1 }).observe(e3);
            }
            centerElement(e3, t3 = "smooth") {
              if (!this.body.contains(e3)) return;
              const i3 = e3.offsetLeft + e3.offsetWidth / 2 - this.body.clientWidth / 2;
              this.body.scrollTo({ left: i3, behavior: t3 });
            }
            destroy() {
              this.paging ? (this.prev && this.prev.removeEventListener("click", this.buildPrev), this.next && this.next.removeEventListener("click", this.buildNext)) : (this.prev && this.prev.removeEventListener("click", this.buildPrevSingle), this.next && this.next.removeEventListener("click", this.buildNextSingle)), window.removeEventListener("resize", (0, s.debounce)((() => this.setCurrentState()), 200)), window.$hsScrollNavCollection = window.$hsScrollNavCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsScrollNavCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3) || t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsScrollNavCollection || (window.$hsScrollNavCollection = []), window.$hsScrollNavCollection && (window.$hsRemoveElementCollection = window.$hsRemoveElementCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-scroll-nav]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsScrollNavCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSScrollNav = l), t2.default = l;
        }, 684: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = n(i2(961));
          class o extends s.default {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-toggle-count"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.target = (null == s2 ? void 0 : s2.target) ? "string" == typeof (null == s2 ? void 0 : s2.target) ? document.querySelector(s2.target) : s2.target : null, this.min = (null == s2 ? void 0 : s2.min) || 0, this.max = (null == s2 ? void 0 : s2.max) || 0, this.duration = (null == s2 ? void 0 : s2.duration) || 700, this.isChecked = this.target.checked || false, this.target && this.init();
            }
            toggleChange() {
              this.isChecked = !this.isChecked, this.toggle();
            }
            init() {
              this.createCollection(window.$hsToggleCountCollection, this), this.isChecked && (this.el.innerText = String(this.max)), this.onToggleChangeListener = () => this.toggleChange(), this.target.addEventListener("change", this.onToggleChangeListener);
            }
            toggle() {
              this.isChecked ? this.countUp() : this.countDown();
            }
            animate(e3, t3) {
              let i3 = 0;
              const n2 = (s2) => {
                i3 || (i3 = s2);
                const o2 = Math.min((s2 - i3) / this.duration, 1);
                this.el.innerText = String(Math.floor(o2 * (t3 - e3) + e3)), o2 < 1 && window.requestAnimationFrame(n2);
              };
              window.requestAnimationFrame(n2);
            }
            countUp() {
              this.animate(this.min, this.max);
            }
            countDown() {
              this.animate(this.max, this.min);
            }
            destroy() {
              this.target.removeEventListener("change", this.onToggleChangeListener), window.$hsToggleCountCollection = window.$hsToggleCountCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsToggleCountCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsToggleCountCollection || (window.$hsToggleCountCollection = []), window.$hsToggleCountCollection && (window.$hsToggleCountCollection = window.$hsToggleCountCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-toggle-count]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsToggleCountCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new o(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            o.autoInit();
          })), "undefined" != typeof window && (window.HSToggleCount = o), t2.default = o;
        }, 740: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3, i3) {
              super(e3, t3, i3), this.toggle = this.el.querySelector(".hs-accordion-toggle") || null, this.content = this.el.querySelector(".hs-accordion-content") || null, this.group = this.el.closest(".hs-accordion-group") || null, this.update(), this.isToggleStopPropagated = (0, s.stringToBoolean)((0, s.getClassProperty)(this.toggle, "--stop-propagation", "false") || "false"), this.keepOneOpen = !!this.group && (0, s.stringToBoolean)((0, s.getClassProperty)(this.group, "--keep-one-open", "false") || "false"), this.toggle && this.content && this.init();
            }
            init() {
              this.createCollection(window.$hsAccordionCollection, this), this.onToggleClickListener = (e3) => this.toggleClick(e3), this.toggle.addEventListener("click", this.onToggleClickListener);
            }
            toggleClick(e3) {
              if (this.el.classList.contains("active") && this.keepOneOpen) return false;
              this.isToggleStopPropagated && e3.stopPropagation(), this.el.classList.contains("active") ? this.hide() : this.show();
            }
            show() {
              var e3;
              if (this.group && !this.isAlwaysOpened && this.group.querySelector(":scope > .hs-accordion.active") && this.group.querySelector(":scope > .hs-accordion.active") !== this.el) {
                window.$hsAccordionCollection.find(((e4) => e4.element.el === this.group.querySelector(":scope > .hs-accordion.active"))).element.hide();
              }
              if (this.el.classList.contains("active")) return false;
              this.el.classList.add("active"), (null === (e3 = null == this ? void 0 : this.toggle) || void 0 === e3 ? void 0 : e3.ariaExpanded) && (this.toggle.ariaExpanded = "true"), this.fireEvent("beforeOpen", this.el), (0, s.dispatch)("beforeOpen.hs.accordion", this.el, this.el), this.content.style.display = "block", this.content.style.height = "0", setTimeout((() => {
                this.content.style.height = `${this.content.scrollHeight}px`, (0, s.afterTransition)(this.content, (() => {
                  this.content.style.display = "block", this.content.style.height = "", this.fireEvent("open", this.el), (0, s.dispatch)("open.hs.accordion", this.el, this.el);
                }));
              }));
            }
            hide() {
              var e3;
              if (!this.el.classList.contains("active")) return false;
              this.el.classList.remove("active"), (null === (e3 = null == this ? void 0 : this.toggle) || void 0 === e3 ? void 0 : e3.ariaExpanded) && (this.toggle.ariaExpanded = "false"), this.fireEvent("beforeClose", this.el), (0, s.dispatch)("beforeClose.hs.accordion", this.el, this.el), this.content.style.height = `${this.content.scrollHeight}px`, setTimeout((() => {
                this.content.style.height = "0";
              })), (0, s.afterTransition)(this.content, (() => {
                this.content.style.display = "none", this.content.style.height = "", this.fireEvent("close", this.el), (0, s.dispatch)("close.hs.accordion", this.el, this.el);
              }));
            }
            update() {
              if (this.group = this.el.closest(".hs-accordion-group") || null, !this.group) return false;
              this.isAlwaysOpened = this.group.hasAttribute("data-hs-accordion-always-open") || false, window.$hsAccordionCollection.map(((e3) => (e3.id === this.el.id && (e3.element.group = this.group, e3.element.isAlwaysOpened = this.isAlwaysOpened), e3)));
            }
            destroy() {
              var e3;
              (null === (e3 = null == l ? void 0 : l.selectable) || void 0 === e3 ? void 0 : e3.length) && l.selectable.forEach(((e4) => {
                e4.listeners.forEach((({ el: e5, listener: t3 }) => {
                  e5.removeEventListener("click", t3);
                }));
              })), this.onToggleClickListener && this.toggle.removeEventListener("click", this.onToggleClickListener), this.toggle = null, this.content = null, this.group = null, this.onToggleClickListener = null, window.$hsAccordionCollection = window.$hsAccordionCollection.filter((({ element: e4 }) => e4.el !== this.el));
            }
            static findInCollection(e3) {
              return window.$hsAccordionCollection.find(((t3) => e3 instanceof l ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static autoInit() {
              window.$hsAccordionCollection || (window.$hsAccordionCollection = []), window.$hsAccordionCollection && (window.$hsAccordionCollection = window.$hsAccordionCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll(".hs-accordion:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsAccordionCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsAccordionCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static show(e3) {
              const t3 = l.findInCollection(e3);
              t3 && "block" !== t3.element.content.style.display && t3.element.show();
            }
            static hide(e3) {
              const t3 = l.findInCollection(e3), i3 = t3 ? window.getComputedStyle(t3.element.content) : null;
              t3 && "none" !== i3.display && t3.element.hide();
            }
            static treeView() {
              if (!document.querySelectorAll(".hs-accordion-treeview-root").length) return false;
              this.selectable = [], document.querySelectorAll(".hs-accordion-treeview-root").forEach(((e3) => {
                const t3 = null == e3 ? void 0 : e3.getAttribute("data-hs-accordion-options"), i3 = t3 ? JSON.parse(t3) : {};
                this.selectable.push({ el: e3, options: Object.assign({}, i3), listeners: [] });
              })), this.selectable.length && this.selectable.forEach(((e3) => {
                const { el: t3 } = e3;
                t3.querySelectorAll(".hs-accordion-selectable").forEach(((t4) => {
                  const i3 = (i4) => this.onSelectableClick(i4, e3, t4);
                  t4.addEventListener("click", i3), e3.listeners.push({ el: t4, listener: i3 });
                }));
              }));
            }
            static toggleSelected(e3, t3) {
              t3.classList.contains("selected") ? t3.classList.remove("selected") : (e3.el.querySelectorAll(".hs-accordion-selectable").forEach(((e4) => e4.classList.remove("selected"))), t3.classList.add("selected"));
            }
            static on(e3, t3, i3) {
              const n2 = l.findInCollection(t3);
              n2 && (n2.element.events[e3] = i3);
            }
          }
          l.onSelectableClick = (e3, t3, i3) => {
            e3.stopPropagation(), l.toggleSelected(t3, i3);
          }, window.addEventListener("load", (() => {
            l.autoInit(), document.querySelectorAll(".hs-accordion-treeview-root").length && l.treeView();
          })), "undefined" != typeof window && (window.HSAccordion = l), t2.default = l;
        }, 751: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3 = {}) {
              super(e3, t3), this.isScrollingDown = false, this.lastScrollTop = 0;
              const i3 = e3.getAttribute("data-hs-scrollspy-options"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.ignoreScrollUp = void 0 !== s2.ignoreScrollUp && s2.ignoreScrollUp, this.links = this.el.querySelectorAll("[href]"), this.sections = [], this.scrollableId = this.el.getAttribute("data-hs-scrollspy-scrollable-parent"), this.scrollable = this.scrollableId ? document.querySelector(this.scrollableId) : document, this.onLinkClickListener = [], this.init();
            }
            scrollableScroll(e3) {
              const t3 = this.scrollable instanceof HTMLElement ? this.scrollable.scrollTop : window.scrollY;
              this.isScrollingDown = t3 > this.lastScrollTop, this.lastScrollTop = t3 <= 0 ? 0 : t3, Array.from(this.sections).forEach(((t4) => {
                if (!t4.getAttribute("id")) return false;
                this.update(e3, t4);
              }));
            }
            init() {
              this.createCollection(window.$hsScrollspyCollection, this), this.links.forEach(((e3) => {
                this.sections.push(this.scrollable.querySelector(e3.getAttribute("href")));
              })), this.onScrollableScrollListener = (e3) => this.scrollableScroll(e3), this.scrollable.addEventListener("scroll", this.onScrollableScrollListener), this.links.forEach(((e3) => {
                this.onLinkClickListener.push({ el: e3, fn: (t3) => this.linkClick(t3, e3) }), e3.addEventListener("click", this.onLinkClickListener.find(((t3) => t3.el === e3)).fn);
              }));
            }
            determineScrollDirection(e3) {
              const t3 = this.el.querySelector("a.active");
              if (!t3) return true;
              const i3 = Array.from(this.links).indexOf(t3), n2 = Array.from(this.links).indexOf(e3);
              return -1 === n2 || n2 > i3;
            }
            linkClick(e3, t3) {
              e3.preventDefault();
              const i3 = t3.getAttribute("href");
              if (!i3 || "javascript:;" === i3) return;
              (i3 ? document.querySelector(i3) : null) && (this.isScrollingDown = this.determineScrollDirection(t3), this.scrollTo(t3));
            }
            update(e3, t3) {
              const i3 = parseInt((0, s.getClassProperty)(this.el, "--scrollspy-offset", "0")), n2 = parseInt((0, s.getClassProperty)(t3, "--scrollspy-offset")) || i3, o2 = e3.target === document ? 0 : parseInt(String(e3.target.getBoundingClientRect().top)), l2 = parseInt(String(t3.getBoundingClientRect().top)) - n2 - o2, a = t3.offsetHeight;
              if (this.ignoreScrollUp || this.isScrollingDown ? l2 <= 0 && l2 + a > 0 : l2 <= 0 && l2 < a) {
                this.links.forEach(((e5) => e5.classList.remove("active")));
                const e4 = this.el.querySelector(`[href="#${t3.getAttribute("id")}"]`);
                if (e4) {
                  e4.classList.add("active");
                  const t4 = e4.closest("[data-hs-scrollspy-group]");
                  if (t4) {
                    const e5 = t4.querySelector("[href]");
                    e5 && e5.classList.add("active");
                  }
                }
                this.fireEvent("afterScroll", e4), (0, s.dispatch)("afterScroll.hs.scrollspy", e4, this.el);
              }
            }
            scrollTo(e3) {
              const t3 = e3.getAttribute("href"), i3 = document.querySelector(t3), n2 = parseInt((0, s.getClassProperty)(this.el, "--scrollspy-offset", "0")), o2 = parseInt((0, s.getClassProperty)(i3, "--scrollspy-offset")) || n2, l2 = this.scrollable === document ? 0 : this.scrollable.offsetTop, a = i3.offsetTop - o2 - l2, r = this.scrollable === document ? window : this.scrollable, d = () => {
                window.history.replaceState(null, null, e3.getAttribute("href")), "scrollTo" in r && r.scrollTo({ top: a, left: 0, behavior: "smooth" });
              }, c = this.fireEvent("beforeScroll", this.el);
              (0, s.dispatch)("beforeScroll.hs.scrollspy", this.el, this.el), c instanceof Promise ? c.then((() => d())) : d();
            }
            destroy() {
              this.el.querySelector("[href].active").classList.remove("active"), this.scrollable.removeEventListener("scroll", this.onScrollableScrollListener), this.onLinkClickListener.length && this.onLinkClickListener.forEach((({ el: e3, fn: t3 }) => {
                e3.removeEventListener("click", t3);
              })), window.$hsScrollspyCollection = window.$hsScrollspyCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3 = false) {
              const i3 = window.$hsScrollspyCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsScrollspyCollection || (window.$hsScrollspyCollection = []), window.$hsScrollspyCollection && (window.$hsScrollspyCollection = window.$hsScrollspyCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-scrollspy]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsScrollspyCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSScrollspy = l), t2.default = l;
        }, 772: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3, i3) {
              super(e3, t3, i3), this.items = [];
              const n2 = e3.getAttribute("data-hs-tree-view"), s2 = n2 ? JSON.parse(n2) : {}, o2 = Object.assign(Object.assign({}, s2), t3);
              this.controlBy = (null == o2 ? void 0 : o2.controlBy) || "button", this.autoSelectChildren = (null == o2 ? void 0 : o2.autoSelectChildren) || false, this.isIndeterminate = (null == o2 ? void 0 : o2.isIndeterminate) || true, this.onElementClickListener = [], this.onControlChangeListener = [], this.init();
            }
            elementClick(e3, t3, i3) {
              if (e3.stopPropagation(), t3.classList.contains("disabled")) return false;
              e3.metaKey || e3.shiftKey || this.unselectItem(i3), this.selectItem(t3, i3), this.fireEvent("click", { el: t3, data: i3 }), (0, s.dispatch)("click.hs.treeView", this.el, { el: t3, data: i3 });
            }
            controlChange(e3, t3) {
              this.autoSelectChildren ? (this.selectItem(e3, t3), t3.isDir && this.selectChildren(e3, t3), this.toggleParent(e3)) : this.selectItem(e3, t3);
            }
            init() {
              this.createCollection(window.$hsTreeViewCollection, this), l.group += 1, this.initItems();
            }
            initItems() {
              this.el.querySelectorAll("[data-hs-tree-view-item]").forEach(((e3, t3) => {
                var i3, n2;
                const s2 = JSON.parse(e3.getAttribute("data-hs-tree-view-item"));
                e3.id || (e3.id = `tree-view-item-${l.group}-${t3}`);
                const o2 = Object.assign(Object.assign({}, s2), { id: null !== (i3 = s2.id) && void 0 !== i3 ? i3 : e3.id, path: this.getPath(e3), isSelected: null !== (n2 = s2.isSelected) && void 0 !== n2 && n2 });
                this.items.push(o2), "checkbox" === this.controlBy ? this.controlByCheckbox(e3, o2) : this.controlByButton(e3, o2);
              }));
            }
            controlByButton(e3, t3) {
              this.onElementClickListener.push({ el: e3, fn: (i3) => this.elementClick(i3, e3, t3) }), e3.addEventListener("click", this.onElementClickListener.find(((t4) => t4.el === e3)).fn);
            }
            controlByCheckbox(e3, t3) {
              const i3 = e3.querySelector(`input[value="${t3.value}"]`);
              i3 && (this.onControlChangeListener.push({ el: i3, fn: () => this.controlChange(e3, t3) }), i3.addEventListener("change", this.onControlChangeListener.find(((e4) => e4.el === i3)).fn));
            }
            getItem(e3) {
              return this.items.find(((t3) => t3.id === e3));
            }
            getPath(e3) {
              var t3;
              const i3 = [];
              let n2 = e3.closest("[data-hs-tree-view-item]");
              for (; n2; ) {
                const e4 = JSON.parse(n2.getAttribute("data-hs-tree-view-item"));
                i3.push(e4.value), n2 = null === (t3 = n2.parentElement) || void 0 === t3 ? void 0 : t3.closest("[data-hs-tree-view-item]");
              }
              return i3.reverse().join("/");
            }
            unselectItem(e3 = null) {
              let t3 = this.getSelectedItems();
              e3 && (t3 = t3.filter(((t4) => t4.id !== e3.id))), t3.length && t3.forEach(((e4) => {
                document.querySelector(`#${e4.id}`).classList.remove("selected"), this.changeItemProp(e4.id, "isSelected", false);
              }));
            }
            selectItem(e3, t3) {
              t3.isSelected ? (e3.classList.remove("selected"), this.changeItemProp(t3.id, "isSelected", false)) : (e3.classList.add("selected"), this.changeItemProp(t3.id, "isSelected", true));
            }
            selectChildren(e3, t3) {
              const i3 = e3.querySelectorAll("[data-hs-tree-view-item]");
              Array.from(i3).filter(((e4) => !e4.classList.contains("disabled"))).forEach(((e4) => {
                const i4 = e4.id ? this.getItem(e4.id) : null;
                if (!i4) return false;
                t3.isSelected ? (e4.classList.add("selected"), this.changeItemProp(i4.id, "isSelected", true)) : (e4.classList.remove("selected"), this.changeItemProp(i4.id, "isSelected", false));
                const n2 = this.getItem(e4.id), s2 = e4.querySelector(`input[value="${n2.value}"]`);
                this.isIndeterminate && (s2.indeterminate = false), n2.isSelected ? s2.checked = true : s2.checked = false;
              }));
            }
            toggleParent(e3) {
              var t3, i3;
              let n2 = null === (t3 = e3.parentElement) || void 0 === t3 ? void 0 : t3.closest("[data-hs-tree-view-item]");
              for (; n2; ) {
                const e4 = n2.querySelectorAll("[data-hs-tree-view-item]:not(.disabled)"), t4 = JSON.parse(n2.getAttribute("data-hs-tree-view-item")), s2 = n2.querySelector(`input[value="${t4.value}"]`);
                let o2 = false, l2 = 0;
                e4.forEach(((e5) => {
                  const t5 = this.getItem(e5.id);
                  t5.isSelected && (l2 += 1), t5.isSelected || (o2 = true);
                })), o2 ? (n2.classList.remove("selected"), this.changeItemProp(n2.id, "isSelected", false), s2.checked = false) : (n2.classList.add("selected"), this.changeItemProp(n2.id, "isSelected", true), s2.checked = true), this.isIndeterminate && (l2 > 0 && l2 < e4.length ? s2.indeterminate = true : s2.indeterminate = false), n2 = null === (i3 = n2.parentElement) || void 0 === i3 ? void 0 : i3.closest("[data-hs-tree-view-item]");
              }
            }
            update() {
              this.items.map(((e3) => {
                const t3 = document.querySelector(`#${e3.id}`);
                return e3.path !== this.getPath(t3) && (e3.path = this.getPath(t3)), e3;
              }));
            }
            getSelectedItems() {
              return this.items.filter(((e3) => e3.isSelected));
            }
            changeItemProp(e3, t3, i3) {
              this.items.map(((n2) => (n2.id === e3 && (n2[t3] = i3), n2)));
            }
            destroy() {
              this.onElementClickListener.forEach((({ el: e3, fn: t3 }) => {
                e3.removeEventListener("click", t3);
              })), this.onControlChangeListener.length && this.onElementClickListener.forEach((({ el: e3, fn: t3 }) => {
                e3.removeEventListener("change", t3);
              })), this.unselectItem(), this.items = [], window.$hsTreeViewCollection = window.$hsTreeViewCollection.filter((({ element: e3 }) => e3.el !== this.el)), l.group -= 1;
            }
            static findInCollection(e3) {
              return window.$hsTreeViewCollection.find(((t3) => e3 instanceof l ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsTreeViewCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsTreeViewCollection || (window.$hsTreeViewCollection = []), window.$hsTreeViewCollection && (window.$hsTreeViewCollection = window.$hsTreeViewCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-tree-view]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsTreeViewCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
            static on(e3, t3, i3) {
              const n2 = l.findInCollection(t3);
              n2 && (n2.element.events[e3] = i3);
            }
          }
          l.group = 0, window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSTreeView = l), t2.default = l;
        }, 809: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__awaiter || function(e3, t3, i3, n2) {
            return new (i3 || (i3 = Promise))((function(s2, o2) {
              function l2(e4) {
                try {
                  r2(n2.next(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function a2(e4) {
                try {
                  r2(n2.throw(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function r2(e4) {
                var t4;
                e4.done ? s2(e4.value) : (t4 = e4.value, t4 instanceof i3 ? t4 : new i3((function(e5) {
                  e5(t4);
                }))).then(l2, a2);
              }
              r2((n2 = n2.apply(e3, t3 || [])).next());
            }));
          }, s = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const o = i2(292), l = s(i2(961)), a = s(i2(248));
          class r extends l.default {
            constructor(e3, t3, i3) {
              var n2, s2, o2, l2, a2, r2, d, c, h, u, p, m, g, v, f, y, b, w, C, S, x, L, T, E, k, I, A, M, O, D, P;
              super(e3, t3, i3), this.isSearchLengthExceeded = false, this.lastQuery = "";
              const $ = e3.getAttribute("data-hs-combo-box"), H = $ ? JSON.parse($) : {}, N = Object.assign(Object.assign({}, H), t3);
              this.gap = 5, this.viewport = null !== (n2 = "string" == typeof (null == N ? void 0 : N.viewport) ? document.querySelector(null == N ? void 0 : N.viewport) : null == N ? void 0 : N.viewport) && void 0 !== n2 ? n2 : null, this.preventVisibility = null !== (s2 = null == N ? void 0 : N.preventVisibility) && void 0 !== s2 && s2, this.minSearchLength = null !== (o2 = null == N ? void 0 : N.minSearchLength) && void 0 !== o2 ? o2 : 0, this.apiUrl = null !== (l2 = null == N ? void 0 : N.apiUrl) && void 0 !== l2 ? l2 : null, this.apiDataPart = null !== (a2 = null == N ? void 0 : N.apiDataPart) && void 0 !== a2 ? a2 : null, this.apiQuery = null !== (r2 = null == N ? void 0 : N.apiQuery) && void 0 !== r2 ? r2 : null, this.apiSearchQuery = null !== (d = null == N ? void 0 : N.apiSearchQuery) && void 0 !== d ? d : null, this.apiSearchPath = null !== (c = null == N ? void 0 : N.apiSearchPath) && void 0 !== c ? c : null, this.apiSearchDefaultPath = null !== (h = null == N ? void 0 : N.apiSearchDefaultPath) && void 0 !== h ? h : null, this.apiHeaders = null !== (u = null == N ? void 0 : N.apiHeaders) && void 0 !== u ? u : {}, this.apiGroupField = null !== (p = null == N ? void 0 : N.apiGroupField) && void 0 !== p ? p : null, this.outputItemTemplate = null !== (m = null == N ? void 0 : N.outputItemTemplate) && void 0 !== m ? m : '<div class="cursor-pointer py-2 px-4 w-full text-sm text-gray-800 hover:bg-gray-100 rounded-lg focus:outline-hidden focus:bg-gray-100 dark:bg-neutral-900 dark:hover:bg-neutral-800 dark:text-neutral-200 dark:focus:bg-neutral-800" data-hs-combo-box-output-item>\n				<div class="flex justify-between items-center w-full">\n					<span data-hs-combo-box-search-text></span>\n					<span class="hidden hs-combo-box-selected:block">\n						<svg class="shrink-0 size-3.5 text-blue-600 dark:text-blue-500" xmlns="http:.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">\n							<polyline points="20 6 9 17 4 12"></polyline>\n						</svg>\n					</span>\n				</div>\n			</div>', this.outputEmptyTemplate = null !== (g = null == N ? void 0 : N.outputEmptyTemplate) && void 0 !== g ? g : '<div class="py-2 px-4 w-full text-sm text-gray-800 rounded-lg dark:bg-neutral-900 dark:text-neutral-200">Nothing found...</div>', this.outputLoaderTemplate = null !== (v = null == N ? void 0 : N.outputLoaderTemplate) && void 0 !== v ? v : '<div class="flex justify-center items-center py-2 px-4 text-sm text-gray-800 rounded-lg bg-white dark:bg-neutral-900 dark:text-neutral-200">\n				<div class="animate-spin inline-block size-6 border-3 border-current border-t-transparent text-blue-600 rounded-[999px] dark:text-blue-500" role="status" aria-label="loading">\n					<span class="sr-only">Loading...</span>\n				</div>\n			</div>', this.groupingType = null !== (f = null == N ? void 0 : N.groupingType) && void 0 !== f ? f : null, this.groupingTitleTemplate = null !== (y = null == N ? void 0 : N.groupingTitleTemplate) && void 0 !== y ? y : "default" === this.groupingType ? '<div class="block mb-1 text-xs font-semibold uppercase text-blue-600 dark:text-blue-500"></div>' : '<button type="button" class="py-2 px-3 inline-flex items-center gap-x-2 text-sm font-semibold whitespace-nowrap rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"></button>', this.tabsWrapperTemplate = null !== (b = null == N ? void 0 : N.tabsWrapperTemplate) && void 0 !== b ? b : '<div class="overflow-x-auto p-4"></div>', this.preventSelection = null !== (w = null == N ? void 0 : N.preventSelection) && void 0 !== w && w, this.preventAutoPosition = null !== (C = null == N ? void 0 : N.preventAutoPosition) && void 0 !== C && C, this.preventClientFiltering = null !== (S = null == t3 ? void 0 : t3.preventClientFiltering) && void 0 !== S ? S : !!(null == N ? void 0 : N.apiSearchQuery) || !!(null == N ? void 0 : N.apiSearchPath), this.isOpenOnFocus = null !== (x = null == N ? void 0 : N.isOpenOnFocus) && void 0 !== x && x, this.keepOriginalOrder = null !== (L = null == N ? void 0 : N.keepOriginalOrder) && void 0 !== L && L, this.preserveSelectionOnEmpty = null === (T = null == N ? void 0 : N.preserveSelectionOnEmpty) || void 0 === T || T, this.input = null !== (E = this.el.querySelector("[data-hs-combo-box-input]")) && void 0 !== E ? E : null, this.output = null !== (k = this.el.querySelector("[data-hs-combo-box-output]")) && void 0 !== k ? k : null, this.itemsWrapper = null !== (I = this.el.querySelector("[data-hs-combo-box-output-items-wrapper]")) && void 0 !== I ? I : null, this.items = null !== (A = Array.from(this.el.querySelectorAll("[data-hs-combo-box-output-item]"))) && void 0 !== A ? A : [], this.tabs = [], this.toggle = null !== (M = this.el.querySelector("[data-hs-combo-box-toggle]")) && void 0 !== M ? M : null, this.toggleClose = null !== (O = this.el.querySelector("[data-hs-combo-box-close]")) && void 0 !== O ? O : null, this.toggleOpen = null !== (D = this.el.querySelector("[data-hs-combo-box-open]")) && void 0 !== D ? D : null, this.outputPlaceholder = null, this.selected = this.value = null !== (P = this.el.querySelector("[data-hs-combo-box-input]").value) && void 0 !== P ? P : "", this.currentData = null, this.isOpened = false, this.isCurrent = false, this.animationInProcess = false, this.selectedGroup = "all", this.init();
            }
            inputFocus() {
              this.isOpened || (this.setResultAndRender(), this.open());
            }
            inputInput() {
              const e3 = this.input.value.trim();
              e3.length <= this.minSearchLength ? this.setResultAndRender("") : this.setResultAndRender(e3), this.preserveSelectionOnEmpty || "" !== e3 || (this.selected = "", this.value = "", this.currentData = null), "" !== this.input.value ? this.el.classList.add("has-value") : this.el.classList.remove("has-value"), this.isOpened || this.open();
            }
            toggleClick() {
              this.isOpened ? this.close() : this.open(this.toggle.getAttribute("data-hs-combo-box-toggle"));
            }
            toggleCloseClick() {
              this.close();
            }
            toggleOpenClick() {
              this.open();
            }
            init() {
              this.createCollection(window.$hsComboBoxCollection, this), this.build(), "undefined" != typeof window && (window.HSAccessibilityObserver || (window.HSAccessibilityObserver = new a.default()), this.setupAccessibility());
            }
            build() {
              this.buildInput(), this.groupingType && this.setGroups(), this.buildItems(), this.preventVisibility && (this.preventAutoPosition || this.recalculateDirection()), this.toggle && this.buildToggle(), this.toggleClose && this.buildToggleClose(), this.toggleOpen && this.buildToggleOpen();
            }
            getNestedProperty(e3, t3) {
              return t3.split(".").reduce(((e4, t4) => e4 && e4[t4]), e3);
            }
            setValue(e3, t3 = null) {
              this.selected = e3, this.value = e3, this.input.value = e3, t3 && (this.currentData = t3), this.fireEvent("select", this.currentData), (0, o.dispatch)("select.hs.combobox", this.el, this.currentData);
            }
            setValueAndOpen(e3) {
              this.value = e3, this.items.length && this.setItemsVisibility();
            }
            setValueAndClear(e3, t3 = null) {
              e3 ? this.setValue(e3, t3) : this.setValue(this.selected, t3), this.outputPlaceholder && this.destroyOutputPlaceholder();
            }
            setSelectedByValue(e3) {
              this.items.forEach(((t3) => {
                const i3 = t3.querySelector("[data-hs-combo-box-value]");
                i3 && e3.includes(i3.textContent) ? t3.classList.add("selected") : t3.classList.remove("selected");
              }));
            }
            setResultAndRender(e3 = "") {
              const t3 = (this.preventVisibility ? this.input.value : e3).trim(), i3 = t3.length < this.minSearchLength;
              this.isSearchLengthExceeded = i3, t3 !== this.lastQuery ? (this.lastQuery = t3, this.setResults(t3), !i3 && (this.apiSearchQuery || this.apiSearchPath || this.apiSearchDefaultPath) && this.itemsFromJson(), this.updatePlaceholderVisibility()) : this.updatePlaceholderVisibility();
            }
            setResults(e3) {
              this.value = e3, this.resultItems(), this.updatePlaceholderVisibility();
            }
            updatePlaceholderVisibility() {
              this.hasVisibleItems() ? this.destroyOutputPlaceholder() : this.buildOutputPlaceholder();
            }
            setGroups() {
              const e3 = [];
              this.items.forEach(((t3) => {
                const { group: i3 } = JSON.parse(t3.getAttribute("data-hs-combo-box-output-item"));
                e3.some(((e4) => (null == e4 ? void 0 : e4.name) === i3.name)) || e3.push(i3);
              })), this.groups = e3;
            }
            setApiGroups(e3) {
              const t3 = [];
              e3.forEach(((e4) => {
                const i3 = e4[this.apiGroupField];
                t3.some(((e5) => e5.name === i3)) || t3.push({ name: i3, title: i3 });
              })), this.groups = t3;
            }
            setItemsVisibility() {
              if (this.preventClientFiltering) return this.items.forEach(((e4) => {
                e4.style.display = "";
              })), false;
              "tabs" === this.groupingType && "all" !== this.selectedGroup && this.items.forEach(((e4) => {
                e4.style.display = "none";
              }));
              const e3 = "tabs" === this.groupingType ? "all" === this.selectedGroup ? this.items : this.items.filter(((e4) => {
                const { group: t3 } = JSON.parse(e4.getAttribute("data-hs-combo-box-output-item"));
                return t3.name === this.selectedGroup;
              })) : this.items;
              "tabs" === this.groupingType && "all" !== this.selectedGroup && e3.forEach(((e4) => {
                e4.style.display = "block";
              })), e3.forEach(((e4) => {
                this.isTextExistsAny(e4, this.value) ? e4.style.display = "block" : e4.style.display = "none";
              })), "default" === this.groupingType && this.output.querySelectorAll("[data-hs-combo-box-group-title]").forEach(((e4) => {
                const t3 = e4.getAttribute("data-hs-combo-box-group-title");
                this.items.filter(((e5) => {
                  const { group: i3 } = JSON.parse(e5.getAttribute("data-hs-combo-box-output-item"));
                  return i3.name === t3 && "block" === e5.style.display;
                })).length ? e4.style.display = "block" : e4.style.display = "none";
              }));
            }
            isTextExistsAny(e3, t3) {
              return Array.from(e3.querySelectorAll("[data-hs-combo-box-search-text]")).some(((e4) => e4.getAttribute("data-hs-combo-box-search-text").toLowerCase().includes(t3.toLowerCase())));
            }
            hasVisibleItems() {
              return !!this.items.length && this.items.some(((e3) => {
                const t3 = window.getComputedStyle(e3);
                return "none" !== t3.display && "hidden" !== t3.visibility;
              }));
            }
            valuesBySelector(e3) {
              return Array.from(e3.querySelectorAll("[data-hs-combo-box-search-text]")).reduce(((e4, t3) => [...e4, t3.getAttribute("data-hs-combo-box-search-text")]), []);
            }
            sortItems() {
              if (this.keepOriginalOrder) return this.items;
              return this.items.sort(((e3, t3) => {
                const i3 = e3.querySelector("[data-hs-combo-box-value]").textContent, n2 = t3.querySelector("[data-hs-combo-box-value]").textContent;
                return i3 < n2 ? -1 : i3 > n2 ? 1 : 0;
              }));
            }
            buildInput() {
              this.isOpenOnFocus && (this.onInputFocusListener = () => this.inputFocus(), this.input.addEventListener("focus", this.onInputFocusListener)), this.onInputInputListener = (0, o.debounce)((() => this.inputInput())), this.input.addEventListener("input", this.onInputInputListener), this.input.addEventListener("paste", ((e3) => {
                var t3, i3, n2, s2, o2;
                const l2 = null !== (i3 = null === (t3 = e3.clipboardData) || void 0 === t3 ? void 0 : t3.getData("text")) && void 0 !== i3 ? i3 : "";
                e3.preventDefault();
                const a2 = null !== (n2 = this.input.selectionStart) && void 0 !== n2 ? n2 : this.input.value.length, r2 = null !== (s2 = this.input.selectionEnd) && void 0 !== s2 ? s2 : this.input.value.length, d = this.input.value.slice(0, a2) + l2 + this.input.value.slice(r2);
                this.input.value = d, null === (o2 = this.onInputInputListener) || void 0 === o2 || o2.call(this, new InputEvent("input", { inputType: "insertFromPaste", data: l2 }));
              }));
            }
            buildItems() {
              return n(this, void 0, void 0, (function* () {
                this.output.role = "listbox", this.output.tabIndex = -1, this.output.ariaOrientation = "vertical", this.apiUrl ? yield this.itemsFromJson() : (this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", this.itemsFromHtml()), (null == this ? void 0 : this.items.length) && this.items[0].classList.contains("selected") && (this.currentData = JSON.parse(this.items[0].getAttribute("data-hs-combo-box-item-stored-data")));
              }));
            }
            buildOutputLoader() {
              if (this.outputLoader) return false;
              this.outputLoader = (0, o.htmlToElement)(this.outputLoaderTemplate), this.items.length || this.outputPlaceholder ? (this.outputLoader.style.position = "absolute", this.outputLoader.style.top = "0", this.outputLoader.style.bottom = "0", this.outputLoader.style.left = "0", this.outputLoader.style.right = "0", this.outputLoader.style.zIndex = "2") : (this.outputLoader.style.position = "", this.outputLoader.style.top = "", this.outputLoader.style.bottom = "", this.outputLoader.style.left = "", this.outputLoader.style.right = "", this.outputLoader.style.zIndex = "", this.outputLoader.style.height = "30px"), this.output.append(this.outputLoader);
            }
            buildToggle() {
              var e3, t3, i3, n2;
              this.isOpened ? ((null === (e3 = null == this ? void 0 : this.toggle) || void 0 === e3 ? void 0 : e3.ariaExpanded) && (this.toggle.ariaExpanded = "true"), (null === (t3 = null == this ? void 0 : this.input) || void 0 === t3 ? void 0 : t3.ariaExpanded) && (this.input.ariaExpanded = "true")) : ((null === (i3 = null == this ? void 0 : this.toggle) || void 0 === i3 ? void 0 : i3.ariaExpanded) && (this.toggle.ariaExpanded = "false"), (null === (n2 = null == this ? void 0 : this.input) || void 0 === n2 ? void 0 : n2.ariaExpanded) && (this.input.ariaExpanded = "false")), this.onToggleClickListener = () => this.toggleClick(), this.toggle.addEventListener("click", this.onToggleClickListener);
            }
            buildToggleClose() {
              this.onToggleCloseClickListener = () => this.toggleCloseClick(), this.toggleClose.addEventListener("click", this.onToggleCloseClickListener);
            }
            buildToggleOpen() {
              this.onToggleOpenClickListener = () => this.toggleOpenClick(), this.toggleOpen.addEventListener("click", this.onToggleOpenClickListener);
            }
            buildOutputPlaceholder() {
              this.outputPlaceholder || (this.outputPlaceholder = (0, o.htmlToElement)(this.outputEmptyTemplate)), this.appendItemsToWrapper(this.outputPlaceholder);
            }
            destroyOutputLoader() {
              this.outputLoader && this.outputLoader.remove(), this.outputLoader = null;
            }
            itemRender(e3) {
              var t3;
              const i3 = e3.querySelector("[data-hs-combo-box-value]").textContent, n2 = null !== (t3 = JSON.parse(e3.getAttribute("data-hs-combo-box-item-stored-data"))) && void 0 !== t3 ? t3 : null;
              this.itemsWrapper ? this.itemsWrapper.append(e3) : this.output.append(e3), this.preventSelection || e3.addEventListener("click", (() => {
                this.close(i3, n2), this.setSelectedByValue(this.valuesBySelector(e3));
              }));
            }
            plainRender(e3) {
              e3.forEach(((e4) => {
                this.itemRender(e4);
              }));
            }
            jsonItemsRender(e3, t3 = 0) {
              e3.forEach(((e4) => {
                const i3 = (0, o.htmlToElement)(this.outputItemTemplate);
                i3.setAttribute("data-hs-combo-box-item-stored-data", JSON.stringify(e4)), i3.querySelectorAll("[data-hs-combo-box-output-item-field]").forEach(((t4) => {
                  const i4 = t4.getAttribute("data-hs-combo-box-output-item-field");
                  let n2 = "";
                  try {
                    const t5 = JSON.parse(i4);
                    n2 = Array.isArray(t5) ? t5.map(((t6) => this.getNestedProperty(e4, t6))).filter(Boolean).join(" ") : this.getNestedProperty(e4, i4);
                  } catch (t5) {
                    n2 = this.getNestedProperty(e4, i4);
                  }
                  t4.textContent = null != n2 ? n2 : "", !n2 && t4.hasAttribute("data-hs-combo-box-output-item-hide-if-empty") && (t4.style.display = "none");
                })), i3.querySelectorAll("[data-hs-combo-box-search-text]").forEach(((t4) => {
                  const i4 = t4.getAttribute("data-hs-combo-box-output-item-field");
                  let n2 = "";
                  try {
                    const t5 = JSON.parse(i4);
                    n2 = Array.isArray(t5) ? t5.map(((t6) => this.getNestedProperty(e4, t6))).filter(Boolean).join(" ") : this.getNestedProperty(e4, i4);
                  } catch (t5) {
                    n2 = this.getNestedProperty(e4, i4);
                  }
                  t4.setAttribute("data-hs-combo-box-search-text", null != n2 ? n2 : "");
                })), i3.querySelectorAll("[data-hs-combo-box-output-item-attr]").forEach(((t4) => {
                  JSON.parse(t4.getAttribute("data-hs-combo-box-output-item-attr")).forEach(((i4) => {
                    let n2 = e4[i4.valueFrom];
                    "class" === i4.attr && t4.className ? t4.className = `${t4.className} ${n2}`.trim() : t4.setAttribute(i4.attr, n2);
                  }));
                })), i3.setAttribute("tabIndex", `${t3}`), "tabs" !== this.groupingType && "default" !== this.groupingType || i3.setAttribute("data-hs-combo-box-output-item", `{"group": {"name": "${e4[this.apiGroupField]}", "title": "${e4[this.apiGroupField]}"}}`), this.items = [...this.items, i3], this.preventSelection || i3.addEventListener("click", (() => {
                  this.close(i3.querySelector("[data-hs-combo-box-value]").textContent, JSON.parse(i3.getAttribute("data-hs-combo-box-item-stored-data"))), this.setSelectedByValue(this.valuesBySelector(i3));
                })), this.appendItemsToWrapper(i3), t3++;
              }));
            }
            groupDefaultRender() {
              this.groups.forEach(((e3) => {
                const t3 = (0, o.htmlToElement)(this.groupingTitleTemplate);
                t3.setAttribute("data-hs-combo-box-group-title", e3.name), t3.classList.add("--exclude-accessibility"), t3.innerText = e3.title, this.itemsWrapper ? this.itemsWrapper.append(t3) : this.output.append(t3);
                const i3 = this.sortItems().filter(((t4) => {
                  const { group: i4 } = JSON.parse(t4.getAttribute("data-hs-combo-box-output-item"));
                  return i4.name === e3.name;
                }));
                this.plainRender(i3);
              }));
            }
            groupTabsRender() {
              const e3 = (0, o.htmlToElement)(this.tabsWrapperTemplate), t3 = (0, o.htmlToElement)('<div class="flex flex-nowrap gap-x-2"></div>');
              e3.append(t3), this.output.insertBefore(e3, this.output.firstChild);
              const i3 = (0, o.htmlToElement)(this.groupingTitleTemplate);
              i3.setAttribute("data-hs-combo-box-group-title", "all"), i3.classList.add("--exclude-accessibility", "active"), i3.innerText = "All", this.tabs = [...this.tabs, i3], t3.append(i3), i3.addEventListener("click", (() => {
                this.selectedGroup = "all";
                const e4 = this.tabs.find(((e5) => e5.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup));
                this.tabs.forEach(((e5) => e5.classList.remove("active"))), e4.classList.add("active"), this.setItemsVisibility();
              })), this.groups.forEach(((e4) => {
                const i4 = (0, o.htmlToElement)(this.groupingTitleTemplate);
                i4.setAttribute("data-hs-combo-box-group-title", e4.name), i4.classList.add("--exclude-accessibility"), i4.innerText = e4.title, this.tabs = [...this.tabs, i4], t3.append(i4), i4.addEventListener("click", (() => {
                  this.selectedGroup = e4.name;
                  const t4 = this.tabs.find(((e5) => e5.getAttribute("data-hs-combo-box-group-title") === this.selectedGroup));
                  this.tabs.forEach(((e5) => e5.classList.remove("active"))), t4.classList.add("active"), this.setItemsVisibility();
                }));
              }));
            }
            itemsFromHtml() {
              if ("default" === this.groupingType) this.groupDefaultRender();
              else if ("tabs" === this.groupingType) {
                const e3 = this.sortItems();
                this.groupTabsRender(), this.plainRender(e3);
              } else {
                const e3 = this.sortItems();
                this.plainRender(e3);
              }
              this.setResults(this.input.value);
            }
            itemsFromJson() {
              return n(this, void 0, void 0, (function* () {
                if (this.isSearchLengthExceeded) return this.buildOutputPlaceholder(), false;
                this.buildOutputLoader();
                try {
                  this.queryAbortController && this.queryAbortController.abort();
                  const e3 = new AbortController();
                  this.queryAbortController = e3;
                  const t3 = `${this.apiQuery}`;
                  let i3, n2, s2 = this.apiUrl;
                  !this.apiSearchQuery && this.apiSearchPath ? (n2 = this.apiSearchDefaultPath && "" === this.value ? `/${this.apiSearchDefaultPath}` : `/${this.apiSearchPath}/${this.value.toLowerCase()}`, (this.apiSearchPath || this.apiSearchDefaultPath) && (s2 += n2)) : (i3 = `${this.apiSearchQuery}=${this.value.toLowerCase()}`, this.apiQuery && this.apiSearchQuery ? s2 += `?${i3}&${t3}` : this.apiQuery ? s2 += `?${t3}` : this.apiSearchQuery && (s2 += `?${i3}`));
                  const l2 = yield fetch(s2, Object.assign(Object.assign({}, this.apiHeaders), { signal: e3.signal }));
                  if (!l2.ok) return this.items = [], this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", void this.setResults(this.input.value);
                  let a2 = yield l2.json();
                  if (this.apiDataPart && (a2 = a2[this.apiDataPart]), Array.isArray(a2) || (a2 = []), (this.apiSearchQuery || this.apiSearchPath) && (this.items = []), this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", "tabs" === this.groupingType) this.setApiGroups(a2), this.groupTabsRender(), this.jsonItemsRender(a2);
                  else if ("default" === this.groupingType) {
                    let e4 = 0;
                    this.setApiGroups(a2), this.groups.forEach(((t4) => {
                      const i4 = (0, o.htmlToElement)(this.groupingTitleTemplate);
                      i4.setAttribute("data-hs-combo-box-group-title", t4.name), i4.classList.add("--exclude-accessibility"), i4.innerText = t4.title;
                      const n3 = a2.filter(((e5) => e5[this.apiGroupField] === t4.name));
                      this.itemsWrapper ? this.itemsWrapper.append(i4) : this.output.append(i4), this.jsonItemsRender(n3, e4), e4 += n3.length;
                    }));
                  } else this.jsonItemsRender(a2);
                  this.setResults(this.input.value.length <= this.minSearchLength ? "" : this.input.value), this.updatePlaceholderVisibility();
                } catch (e3) {
                  console.error("Error fetching items:", e3), this.items = [], this.itemsWrapper ? this.itemsWrapper.innerHTML = "" : this.output.innerHTML = "", this.setResults(this.input.value);
                } finally {
                  this.queryAbortController && this.queryAbortController.signal.aborted && (this.queryAbortController = void 0), this.destroyOutputLoader();
                }
              }));
            }
            appendItemsToWrapper(e3) {
              this.itemsWrapper ? this.itemsWrapper.append(e3) : this.output.append(e3);
            }
            resultItems() {
              if (!this.items.length) return false;
              this.setItemsVisibility(), this.setSelectedByValue([this.selected]);
            }
            destroyOutputPlaceholder() {
              this.outputPlaceholder && this.outputPlaceholder.remove(), this.outputPlaceholder = null;
            }
            setHighlighted(e3, t3, i3) {
              t3.focus(), i3.value = t3.querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text"), e3 && e3.classList.remove("hs-combo-box-output-item-highlighted"), t3.classList.add("hs-combo-box-output-item-highlighted");
            }
            setupAccessibility() {
              var e3;
              const t3 = null !== (e3 = this.itemsWrapper) && void 0 !== e3 ? e3 : this.output;
              this.accessibilityComponent = window.HSAccessibilityObserver.registerComponent(this.el, { onEnter: () => this.onEnter(), onSpace: () => this.onEnter(), onEsc: () => {
                this.isOpened && (this.close(), this.input && this.input.focus());
              }, onArrow: (e4) => {
                if (this.isOpened || "ArrowDown" !== e4.key) {
                  if (this.isOpened) switch (e4.key) {
                    case "ArrowDown":
                      this.focusMenuItem("next");
                      break;
                    case "ArrowUp":
                      this.focusMenuItem("prev");
                      break;
                    case "Home":
                      this.onStartEnd(true);
                      break;
                    case "End":
                      this.onStartEnd(false);
                  }
                } else this.open();
              }, onTab: (e4) => {
                this.isOpened && (e4.preventDefault(), e4.stopPropagation(), this.focusMenuItem("next"));
              }, onShiftTab: (e4) => {
                this.isOpened && (e4.preventDefault(), e4.stopPropagation(), this.focusMenuItem("prev"));
              } }, this.isOpened, "ComboBox", "[data-hs-combo-box]", t3);
            }
            onEnter() {
              var e3, t3, i3;
              if (this.isOpened) {
                const n2 = this.output.querySelector(".hs-combo-box-output-item-highlighted");
                if (n2) {
                  if (this.close(null !== (t3 = null === (e3 = n2.querySelector("[data-hs-combo-box-value]")) || void 0 === e3 ? void 0 : e3.getAttribute("data-hs-combo-box-search-text")) && void 0 !== t3 ? t3 : null, null !== (i3 = JSON.parse(n2.getAttribute("data-hs-combo-box-item-stored-data"))) && void 0 !== i3 ? i3 : null), "A" === n2.tagName) return void (window.location.href = n2.href);
                  this.input && this.input.focus();
                }
              } else this.open();
            }
            focusMenuItem(e3) {
              var t3;
              const i3 = null !== (t3 = this.itemsWrapper) && void 0 !== t3 ? t3 : this.output;
              if (!i3) return false;
              const n2 = Array.from(i3.querySelectorAll(":scope > *:not(.--exclude-accessibility)")).filter(((e4) => "none" !== e4.style.display));
              if (!n2.length) return false;
              const s2 = i3.querySelector(".hs-combo-box-output-item-highlighted"), o2 = s2 ? n2.indexOf(s2) : -1, l2 = "next" === e3 ? (o2 + 1) % n2.length : (o2 - 1 + n2.length) % n2.length;
              s2 && s2.classList.remove("hs-combo-box-output-item-highlighted"), n2[l2].classList.add("hs-combo-box-output-item-highlighted"), n2[l2].focus(), this.input.value = n2[l2].querySelector("[data-hs-combo-box-value]").getAttribute("data-hs-combo-box-search-text");
            }
            onStartEnd(e3 = true) {
              var t3;
              const i3 = null !== (t3 = this.itemsWrapper) && void 0 !== t3 ? t3 : this.output;
              if (!i3) return false;
              const n2 = Array.from(i3.querySelectorAll(":scope > *:not(.--exclude-accessibility)")).filter(((e4) => "none" !== e4.style.display));
              if (!n2.length) return false;
              const s2 = i3.querySelector(".hs-combo-box-output-item-highlighted");
              this.setHighlighted(s2, n2[0], this.input);
            }
            getCurrentData() {
              return this.currentData;
            }
            setCurrent() {
              window.$hsComboBoxCollection.length && (window.$hsComboBoxCollection.map(((e3) => e3.element.isCurrent = false)), this.isCurrent = true);
            }
            open(e3) {
              return !this.animationInProcess && (void 0 !== e3 && this.setValueAndOpen(e3), !this.preventVisibility && (this.animationInProcess = true, this.output.style.display = "block", this.preventAutoPosition || this.recalculateDirection(), setTimeout((() => {
                var e4, t3;
                (null === (e4 = null == this ? void 0 : this.input) || void 0 === e4 ? void 0 : e4.ariaExpanded) && (this.input.ariaExpanded = "true"), (null === (t3 = null == this ? void 0 : this.toggle) || void 0 === t3 ? void 0 : t3.ariaExpanded) && (this.toggle.ariaExpanded = "true"), this.el.classList.add("active"), this.animationInProcess = false;
              })), this.isOpened = true, void (window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, true))));
            }
            close(e3, t3 = null) {
              var i3, n2;
              return !this.animationInProcess && (this.preventVisibility ? (this.setValueAndClear(e3, t3), "" !== this.input.value ? this.el.classList.add("has-value") : this.el.classList.remove("has-value"), false) : (this.preserveSelectionOnEmpty || "" !== this.input.value.trim() || (this.selected = "", this.value = ""), this.animationInProcess = true, (null === (i3 = null == this ? void 0 : this.input) || void 0 === i3 ? void 0 : i3.ariaExpanded) && (this.input.ariaExpanded = "false"), (null === (n2 = null == this ? void 0 : this.toggle) || void 0 === n2 ? void 0 : n2.ariaExpanded) && (this.toggle.ariaExpanded = "false"), this.el.classList.remove("active"), this.preventAutoPosition || (this.output.classList.remove("bottom-full", "top-full"), this.output.style.marginTop = "", this.output.style.marginBottom = ""), (0, o.afterTransition)(this.output, (() => {
                this.output.style.display = "none", this.setValueAndClear(e3, t3 || null), this.animationInProcess = false;
              })), "" !== this.input.value ? this.el.classList.add("has-value") : this.el.classList.remove("has-value"), this.isOpened = false, void (window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, false))));
            }
            recalculateDirection() {
              (0, o.isEnoughSpace)(this.output, this.input, "bottom", this.gap, this.viewport) ? (this.output.classList.remove("bottom-full"), this.output.style.marginBottom = "", this.output.classList.add("top-full"), this.output.style.marginTop = `${this.gap}px`) : (this.output.classList.remove("top-full"), this.output.style.marginTop = "", this.output.classList.add("bottom-full"), this.output.style.marginBottom = `${this.gap}px`);
            }
            destroy() {
              this.input.removeEventListener("focus", this.onInputFocusListener), this.input.removeEventListener("input", this.onInputInputListener), this.toggle.removeEventListener("click", this.onToggleClickListener), this.toggleClose && this.toggleClose.removeEventListener("click", this.onToggleCloseClickListener), this.toggleOpen && this.toggleOpen.removeEventListener("click", this.onToggleOpenClickListener), this.el.classList.remove("has-value", "active"), this.items.length && this.items.forEach(((e3) => {
                e3.classList.remove("selected"), e3.style.display = "";
              })), this.output.removeAttribute("role"), this.output.removeAttribute("tabindex"), this.output.removeAttribute("aria-orientation"), this.outputLoader && (this.outputLoader.remove(), this.outputLoader = null), this.outputPlaceholder && (this.outputPlaceholder.remove(), this.outputPlaceholder = null), this.apiUrl && (this.output.innerHTML = ""), this.items = [], "undefined" != typeof window && window.HSAccessibilityObserver && window.HSAccessibilityObserver.unregisterComponent(this.accessibilityComponent), window.$hsComboBoxCollection = window.$hsComboBoxCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsComboBoxCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsComboBoxCollection || (window.$hsComboBoxCollection = [], window.addEventListener("click", ((e3) => {
                const t3 = e3.target;
                r.closeCurrentlyOpened(t3);
              }))), window.$hsComboBoxCollection && (window.$hsComboBoxCollection = window.$hsComboBoxCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-combo-box]:not(.--prevent-on-load-init)").forEach(((e3) => {
                if (!window.$hsComboBoxCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                }))) {
                  const t3 = e3.getAttribute("data-hs-combo-box"), i3 = t3 ? JSON.parse(t3) : {};
                  new r(e3, i3);
                }
              }));
            }
            static close(e3) {
              const t3 = window.$hsComboBoxCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              t3 && t3.element.isOpened && t3.element.close();
            }
            static closeCurrentlyOpened(e3 = null) {
              if (!e3.closest("[data-hs-combo-box].active")) {
                const e4 = window.$hsComboBoxCollection.filter(((e5) => e5.element.isOpened)) || null;
                e4 && e4.forEach(((e5) => {
                  e5.element.close();
                }));
              }
            }
          }
          window.addEventListener("load", (() => {
            r.autoInit();
          })), document.addEventListener("scroll", (() => {
            if (!window.$hsComboBoxCollection) return false;
            const e3 = window.$hsComboBoxCollection.find(((e4) => e4.element.isOpened));
            e3 && !e3.element.preventAutoPosition && e3.element.recalculateDirection();
          })), "undefined" != typeof window && (window.HSComboBox = r), t2.default = r;
        }, 812: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              var i3;
              super(e3, t3);
              const n2 = e3.getAttribute("data-hs-layout-splitter"), s2 = n2 ? JSON.parse(n2) : {}, o2 = Object.assign(Object.assign({}, s2), t3);
              this.horizontalSplitterClasses = (null == o2 ? void 0 : o2.horizontalSplitterClasses) || null, this.horizontalSplitterTemplate = (null == o2 ? void 0 : o2.horizontalSplitterTemplate) || "<div></div>", this.verticalSplitterClasses = (null == o2 ? void 0 : o2.verticalSplitterClasses) || null, this.verticalSplitterTemplate = (null == o2 ? void 0 : o2.verticalSplitterTemplate) || "<div></div>", this.isSplittersAddedManually = null !== (i3 = null == o2 ? void 0 : o2.isSplittersAddedManually) && void 0 !== i3 && i3, this.horizontalSplitters = [], this.horizontalControls = [], this.verticalSplitters = [], this.verticalControls = [], this.isDragging = false, this.activeSplitter = null, this.onControlPointerDownListener = [], this.init();
            }
            controlPointerDown(e3) {
              this.isDragging = true, this.activeSplitter = e3, this.onPointerDownHandler(e3);
            }
            controlPointerUp() {
              this.isDragging = false, this.activeSplitter = null, this.onPointerUpHandler();
            }
            init() {
              this.createCollection(window.$hsLayoutSplitterCollection, this), this.buildSplitters(), l.isListenersInitialized || (document.addEventListener("pointermove", l.onDocumentPointerMove), document.addEventListener("pointerup", l.onDocumentPointerUp), l.isListenersInitialized = true);
            }
            buildSplitters() {
              this.buildHorizontalSplitters(), this.buildVerticalSplitters();
            }
            buildHorizontalSplitters() {
              const e3 = this.el.querySelectorAll("[data-hs-layout-splitter-horizontal-group]");
              e3.length && (e3.forEach(((e4) => {
                this.horizontalSplitters.push({ el: e4, items: Array.from(e4.querySelectorAll(":scope > [data-hs-layout-splitter-item]")) });
              })), this.updateHorizontalSplitter());
            }
            buildVerticalSplitters() {
              const e3 = this.el.querySelectorAll("[data-hs-layout-splitter-vertical-group]");
              e3.length && (e3.forEach(((e4) => {
                this.verticalSplitters.push({ el: e4, items: Array.from(e4.querySelectorAll(":scope > [data-hs-layout-splitter-item]")) });
              })), this.updateVerticalSplitter());
            }
            buildControl(e3, t3, i3 = "horizontal") {
              let n2;
              if (this.isSplittersAddedManually) {
                if (n2 = null == t3 ? void 0 : t3.previousElementSibling, !n2) return false;
                n2.style.display = "";
              } else n2 = (0, s.htmlToElement)("horizontal" === i3 ? this.horizontalSplitterTemplate : this.verticalSplitterTemplate), (0, s.classToClassList)("horizontal" === i3 ? this.horizontalSplitterClasses : this.verticalSplitterClasses, n2), n2.classList.add("hs-layout-splitter-control");
              const o2 = { el: n2, direction: i3, prev: e3, next: t3 };
              "horizontal" === i3 ? this.horizontalControls.push(o2) : this.verticalControls.push(o2), this.bindListeners(o2), t3 && !this.isSplittersAddedManually && e3.insertAdjacentElement("afterend", n2);
            }
            getSplitterItemParsedParam(e3) {
              const t3 = e3.getAttribute("data-hs-layout-splitter-item");
              return (0, s.isJson)(t3) ? JSON.parse(t3) : t3;
            }
            getContainerSize(e3, t3) {
              return t3 ? e3.getBoundingClientRect().width : e3.getBoundingClientRect().height;
            }
            getMaxFlexSize(e3, t3, i3) {
              const n2 = this.getSplitterItemSingleParam(e3, t3);
              return "number" == typeof n2 ? n2 / 100 * i3 : 0;
            }
            updateHorizontalSplitter() {
              this.horizontalSplitters.forEach((({ items: e3 }) => {
                e3.forEach(((e4) => {
                  this.updateSingleSplitter(e4);
                })), e3.forEach(((t3, i3) => {
                  i3 >= e3.length - 1 ? this.buildControl(t3, null) : this.buildControl(t3, e3[i3 + 1]);
                }));
              }));
            }
            updateSingleSplitter(e3) {
              const t3 = e3.getAttribute("data-hs-layout-splitter-item"), i3 = (0, s.isJson)(t3) ? JSON.parse(t3) : t3, n2 = (0, s.isJson)(t3) ? i3.dynamicSize : t3;
              e3.style.flex = `${n2} 1 0`;
            }
            updateVerticalSplitter() {
              this.verticalSplitters.forEach((({ items: e3 }) => {
                e3.forEach(((e4) => {
                  this.updateSingleSplitter(e4);
                })), e3.forEach(((t3, i3) => {
                  i3 >= e3.length - 1 ? this.buildControl(t3, null, "vertical") : this.buildControl(t3, e3[i3 + 1], "vertical");
                }));
              }));
            }
            updateSplitterItemParam(e3, t3) {
              const i3 = this.getSplitterItemParsedParam(e3), n2 = t3.toFixed(1), s2 = "object" == typeof i3 ? JSON.stringify(Object.assign(Object.assign({}, i3), { dynamicSize: +n2 })) : n2;
              e3.setAttribute("data-hs-layout-splitter-item", s2);
            }
            onPointerDownHandler(e3) {
              const { el: t3, prev: i3, next: n2 } = e3;
              t3.classList.add("dragging"), i3.classList.add("dragging"), n2.classList.add("dragging"), document.body.style.userSelect = "none";
            }
            onPointerUpHandler() {
              document.body.style.userSelect = "";
            }
            onPointerMoveHandler(e3, t3, i3) {
              const { prev: n2, next: s2 } = t3, o2 = t3.el.closest("horizontal" === i3 ? "[data-hs-layout-splitter-horizontal-group]" : "[data-hs-layout-splitter-vertical-group]"), l2 = "horizontal" === i3, a = this.getContainerSize(o2, l2), r = this.calculateAvailableSize(o2, n2, s2, l2, a), d = this.calculateResizedSizes(e3, n2, r, l2), c = this.enforceLimits(d, n2, s2, a, r);
              this.applySizes(n2, s2, c, a);
            }
            bindListeners(e3) {
              const { el: t3 } = e3;
              this.onControlPointerDownListener.push({ el: t3, fn: () => this.controlPointerDown(e3) }), t3.addEventListener("pointerdown", this.onControlPointerDownListener.find(((e4) => e4.el === t3)).fn);
            }
            calculateAvailableSize(e3, t3, i3, n2, s2) {
              const o2 = e3.querySelectorAll(":scope > [data-hs-layout-splitter-item]");
              return s2 - Array.from(o2).reduce(((e4, s3) => {
                if (s3 === t3 || s3 === i3) return e4;
                const o3 = s3.getBoundingClientRect();
                return e4 + ("fixed" === window.getComputedStyle(s3).position ? 0 : n2 ? o3.width : o3.height);
              }), 0);
            }
            calculateResizedSizes(e3, t3, i3, n2) {
              const s2 = n2 ? t3.getBoundingClientRect().left : t3.getBoundingClientRect().top;
              let o2 = Math.max(0, Math.min((n2 ? e3.clientX : e3.clientY) - s2, i3));
              return { previousSize: o2, nextSize: i3 - o2 };
            }
            enforceLimits(e3, t3, i3, n2, o2) {
              const l2 = this.getMaxFlexSize(t3, "minSize", n2), a = this.getMaxFlexSize(i3, "minSize", n2), r = this.getMaxFlexSize(t3, "preLimitSize", n2), d = this.getMaxFlexSize(i3, "preLimitSize", n2);
              let { previousSize: c, nextSize: h } = e3;
              h < a ? (h = a, c = o2 - h) : c < l2 && (c = l2, h = o2 - c);
              const u = { prev: t3, next: i3, previousSize: c.toFixed(), previousFlexSize: c / n2 * 100, previousPreLimitSize: r, previousPreLimitFlexSize: r / n2 * 100, previousMinSize: l2, previousMinFlexSize: l2 / n2 * 100, nextSize: h.toFixed(), nextFlexSize: h / n2 * 100, nextPreLimitSize: d, nextPreLimitFlexSize: d / n2 * 100, nextMinSize: a, nextMinFlexSize: a / n2 * 100, static: { prev: { minSize: this.getSplitterItemSingleParam(t3, "minSize"), preLimitSize: this.getSplitterItemSingleParam(t3, "preLimitSize") }, next: { minSize: this.getSplitterItemSingleParam(i3, "minSize"), preLimitSize: this.getSplitterItemSingleParam(i3, "preLimitSize") } } };
              return h < a ? (this.fireEvent("onNextLimit", u), (0, s.dispatch)("onNextLimit.hs.layoutSplitter", this.el, u)) : c < l2 && (this.fireEvent("onPrevLimit", u), (0, s.dispatch)("onPrevLimit.hs.layoutSplitter", this.el, u)), c <= r && (this.fireEvent("onPrevPreLimit", u), (0, s.dispatch)("onPrevPreLimit.hs.layoutSplitter", this.el, u)), h <= d && (this.fireEvent("onNextPreLimit", u), (0, s.dispatch)("onNextPreLimit.hs.layoutSplitter", this.el, u)), this.fireEvent("drag", u), (0, s.dispatch)("drag.hs.layoutSplitter", this.el, u), { previousSize: c, nextSize: h };
            }
            applySizes(e3, t3, i3, n2) {
              const { previousSize: s2, nextSize: o2 } = i3, l2 = s2 / n2 * 100;
              this.updateSplitterItemParam(e3, l2), e3.style.flex = `${l2.toFixed(1)} 1 0`;
              const a = o2 / n2 * 100;
              this.updateSplitterItemParam(t3, a), t3.style.flex = `${a.toFixed(1)} 1 0`;
            }
            getSplitterItemSingleParam(e3, t3) {
              try {
                return this.getSplitterItemParsedParam(e3)[t3];
              } catch (e4) {
                return console.log("There is no parameter with this name in the object."), false;
              }
            }
            getData(e3) {
              var t3, i3;
              const n2 = e3.closest("[data-hs-layout-splitter-horizontal-group], [data-hs-layout-splitter-vertical-group]");
              if (!n2) throw new Error("Element is not inside a valid layout splitter container.");
              const s2 = n2.matches("[data-hs-layout-splitter-horizontal-group]"), o2 = this.getContainerSize(n2, s2), l2 = this.getSplitterItemSingleParam(e3, "dynamicSize") || 0, a = this.getMaxFlexSize(e3, "minSize", o2), r = this.getMaxFlexSize(e3, "preLimitSize", o2), d = a / o2 * 100, c = r / o2 * 100;
              return { el: e3, dynamicSize: +(l2 / 100 * o2).toFixed(), dynamicFlexSize: l2, minSize: +a.toFixed(), minFlexSize: d, preLimitSize: +r.toFixed(), preLimitFlexSize: c, static: { minSize: null !== (t3 = this.getSplitterItemSingleParam(e3, "minSize")) && void 0 !== t3 ? t3 : null, preLimitSize: null !== (i3 = this.getSplitterItemSingleParam(e3, "preLimitSize")) && void 0 !== i3 ? i3 : null } };
            }
            setSplitterItemSize(e3, t3) {
              this.updateSplitterItemParam(e3, t3), e3.style.flex = `${t3.toFixed(1)} 1 0`;
            }
            updateFlexValues(e3) {
              let t3 = 0;
              const i3 = window.innerWidth;
              if (e3.forEach((({ id: e4, breakpoints: n2 }) => {
                const s2 = document.getElementById(e4);
                if (s2) {
                  const e5 = ((e6) => {
                    const t4 = Object.keys(e6).map(Number).sort(((e7, t5) => e7 - t5));
                    for (let n3 = t4.length - 1; n3 >= 0; n3--) if (i3 >= t4[n3]) return e6[t4[n3]];
                    return 0;
                  })(n2);
                  this.updateSplitterItemParam(s2, e5), s2.style.flex = `${e5.toFixed(1)} 1 0`, t3 += e5;
                }
              })), 100 !== t3) {
                const i4 = 100 / t3;
                e3.forEach((({ id: e4 }) => {
                  const t4 = document.getElementById(e4);
                  if (t4) {
                    const e5 = parseFloat(t4.style.flex.split(" ")[0]) * i4;
                    this.updateSplitterItemParam(t4, e5), t4.style.flex = `${e5.toFixed(1)} 1 0`;
                  }
                }));
              }
            }
            destroy() {
              this.onControlPointerDownListener && (this.onControlPointerDownListener.forEach((({ el: e3, fn: t3 }) => {
                e3.removeEventListener("pointerdown", t3);
              })), this.onControlPointerDownListener = null), this.horizontalSplitters.forEach((({ items: e3 }) => {
                e3.forEach(((e4) => {
                  e4.style.flex = "";
                }));
              })), this.verticalSplitters.forEach((({ items: e3 }) => {
                e3.forEach(((e4) => {
                  e4.style.flex = "";
                }));
              })), this.horizontalControls.forEach((({ el: e3 }) => {
                this.isSplittersAddedManually ? e3.style.display = "none" : e3.remove();
              })), this.verticalControls.forEach((({ el: e3 }) => {
                this.isSplittersAddedManually ? e3.style.display = "none" : e3.remove();
              })), this.horizontalControls = [], this.verticalControls = [], window.$hsLayoutSplitterCollection = window.$hsLayoutSplitterCollection.filter((({ element: e3 }) => e3.el !== this.el)), 0 === window.$hsLayoutSplitterCollection.length && l.isListenersInitialized && (document.removeEventListener("pointermove", l.onDocumentPointerMove), document.removeEventListener("pointerup", l.onDocumentPointerUp), l.isListenersInitialized = false);
            }
            static findInCollection(e3) {
              return window.$hsLayoutSplitterCollection.find(((t3) => e3 instanceof l ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static autoInit() {
              window.$hsLayoutSplitterCollection || (window.$hsLayoutSplitterCollection = [], window.addEventListener("pointerup", (() => {
                if (!window.$hsLayoutSplitterCollection) return false;
                const e3 = document.querySelector(".hs-layout-splitter-control.dragging"), t3 = document.querySelectorAll("[data-hs-layout-splitter-item].dragging");
                if (!e3) return false;
                const i3 = l.getInstance(e3.closest("[data-hs-layout-splitter]"), true);
                e3.classList.remove("dragging"), t3.forEach(((e4) => e4.classList.remove("dragging"))), i3.element.isDragging = false;
              }))), window.$hsLayoutSplitterCollection && (window.$hsLayoutSplitterCollection = window.$hsLayoutSplitterCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-layout-splitter]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsLayoutSplitterCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsLayoutSplitterCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static on(e3, t3, i3) {
              const n2 = l.findInCollection(t3);
              n2 && (n2.element.events[e3] = i3);
            }
          }
          l.isListenersInitialized = false, l.onDocumentPointerMove = (e3) => {
            const t3 = document.querySelector(".hs-layout-splitter-control.dragging");
            if (!t3) return;
            const i3 = l.getInstance(t3.closest("[data-hs-layout-splitter]"), true);
            if (!i3 || !i3.element.isDragging) return;
            const n2 = i3.element.activeSplitter;
            n2 && ("vertical" === n2.direction ? i3.element.onPointerMoveHandler(e3, n2, "vertical") : i3.element.onPointerMoveHandler(e3, n2, "horizontal"));
          }, l.onDocumentPointerUp = () => {
            const e3 = document.querySelector(".hs-layout-splitter-control.dragging");
            if (!e3) return;
            const t3 = l.getInstance(e3.closest("[data-hs-layout-splitter]"), true);
            t3 && t3.element.controlPointerUp();
          }, window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSLayoutSplitter = l), t2.default = l;
        }, 814: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3, i3) {
              var n2, s2, o2, l2, a, r, d, c, h, u, p, m, g, v, f, y, b, w, C, S, x;
              super(e3, t3, i3), this.el = "string" == typeof e3 ? document.querySelector(e3) : e3;
              const L = [];
              Array.from(this.el.querySelectorAll("thead th, thead td")).forEach(((e4, t4) => {
                e4.classList.contains("--exclude-from-ordering") && L.push({ targets: t4, orderable: false });
              }));
              const T = this.el.getAttribute("data-hs-datatable"), E = T ? JSON.parse(T) : {};
              this.concatOptions = Object.assign(Object.assign({ searching: true, lengthChange: false, order: [], columnDefs: [...L] }, E), t3), this.table = this.el.querySelector("table"), this.searches = null !== (n2 = Array.from(this.el.querySelectorAll("[data-hs-datatable-search]"))) && void 0 !== n2 ? n2 : null, this.pageEntitiesList = null !== (s2 = Array.from(this.el.querySelectorAll("[data-hs-datatable-page-entities]"))) && void 0 !== s2 ? s2 : null, this.pagingList = null !== (o2 = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging]"))) && void 0 !== o2 ? o2 : null, this.pagingPagesList = null !== (l2 = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-pages]"))) && void 0 !== l2 ? l2 : null, this.pagingPrevList = null !== (a = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-prev]"))) && void 0 !== a ? a : null, this.pagingNextList = null !== (r = Array.from(this.el.querySelectorAll("[data-hs-datatable-paging-next]"))) && void 0 !== r ? r : null, this.infoList = null !== (d = Array.from(this.el.querySelectorAll("[data-hs-datatable-info]"))) && void 0 !== d ? d : null, (null === (c = this.concatOptions) || void 0 === c ? void 0 : c.rowSelectingOptions) && (this.rowSelectingAll = null !== (g = (null === (u = null === (h = this.concatOptions) || void 0 === h ? void 0 : h.rowSelectingOptions) || void 0 === u ? void 0 : u.selectAllSelector) ? document.querySelector(null === (m = null === (p = this.concatOptions) || void 0 === p ? void 0 : p.rowSelectingOptions) || void 0 === m ? void 0 : m.selectAllSelector) : document.querySelector("[data-hs-datatable-row-selecting-all]")) && void 0 !== g ? g : null), (null === (v = this.concatOptions) || void 0 === v ? void 0 : v.rowSelectingOptions) && (this.rowSelectingIndividual = null !== (b = null === (y = null === (f = this.concatOptions) || void 0 === f ? void 0 : f.rowSelectingOptions) || void 0 === y ? void 0 : y.individualSelector) && void 0 !== b ? b : "[data-hs-datatable-row-selecting-individual]"), this.pageEntitiesList.length && (this.concatOptions.pageLength = parseInt(this.pageEntitiesList[0].value)), this.maxPagesToShow = 3, this.isRowSelecting = !!(null === (w = this.concatOptions) || void 0 === w ? void 0 : w.rowSelectingOptions), this.pageBtnClasses = null !== (x = null === (S = null === (C = this.concatOptions) || void 0 === C ? void 0 : C.pagingOptions) || void 0 === S ? void 0 : S.pageBtnClasses) && void 0 !== x ? x : null, this.onSearchInputListener = [], this.onPageEntitiesChangeListener = [], this.onSinglePagingClickListener = [], this.onPagingPrevClickListener = [], this.onPagingNextClickListener = [], this.init();
            }
            init() {
              this.createCollection(window.$hsDataTableCollection, this), this.initTable(), this.searches.length && this.initSearch(), this.pageEntitiesList.length && this.initPageEntities(), this.pagingList.length && this.initPaging(), this.pagingPagesList.length && this.buildPagingPages(), this.pagingPrevList.length && this.initPagingPrev(), this.pagingNextList.length && this.initPagingNext(), this.infoList.length && this.initInfo(), this.isRowSelecting && this.initRowSelecting();
            }
            initTable() {
              this.dataTable = new DataTable(this.table, this.concatOptions), this.isRowSelecting && this.triggerChangeEventToRow(), this.dataTable.on("draw", (() => {
                this.isRowSelecting && this.updateSelectAllCheckbox(), this.isRowSelecting && this.triggerChangeEventToRow(), this.updateInfo(), this.pagingPagesList.forEach(((e3) => this.updatePaging(e3)));
              }));
            }
            searchInput(e3) {
              this.onSearchInput(e3.target.value);
            }
            pageEntitiesChange(e3) {
              this.onEntitiesChange(parseInt(e3.target.value), e3.target);
            }
            pagingPrevClick() {
              this.onPrevClick();
            }
            pagingNextClick() {
              this.onNextClick();
            }
            rowSelectingAllChange() {
              this.onSelectAllChange();
            }
            singlePagingClick(e3) {
              this.onPageClick(e3);
            }
            initSearch() {
              this.searches.forEach(((e3) => {
                this.onSearchInputListener.push({ el: e3, fn: (0, s.debounce)(((e4) => this.searchInput(e4))) }), e3.addEventListener("input", this.onSearchInputListener.find(((t3) => t3.el === e3)).fn);
              }));
            }
            onSearchInput(e3) {
              this.dataTable.search(e3).draw();
            }
            initPageEntities() {
              this.pageEntitiesList.forEach(((e3) => {
                this.onPageEntitiesChangeListener.push({ el: e3, fn: (e4) => this.pageEntitiesChange(e4) }), e3.addEventListener("change", this.onPageEntitiesChangeListener.find(((t3) => t3.el === e3)).fn);
              }));
            }
            onEntitiesChange(e3, t3) {
              const i3 = this.pageEntitiesList.filter(((e4) => e4 !== t3));
              i3.length && i3.forEach(((t4) => {
                if (window.HSSelect) {
                  const i4 = window.HSSelect.getInstance(t4, true);
                  i4 && i4.element.setValue(`${e3}`);
                } else t4.value = `${e3}`;
              })), this.dataTable.page.len(e3).draw();
            }
            initInfo() {
              this.infoList.forEach(((e3) => {
                this.initInfoFrom(e3), this.initInfoTo(e3), this.initInfoLength(e3);
              }));
            }
            initInfoFrom(e3) {
              var t3;
              const i3 = null !== (t3 = e3.querySelector("[data-hs-datatable-info-from]")) && void 0 !== t3 ? t3 : null, { start: n2 } = this.dataTable.page.info();
              i3 && (i3.innerText = `${n2 + 1}`);
            }
            initInfoTo(e3) {
              var t3;
              const i3 = null !== (t3 = e3.querySelector("[data-hs-datatable-info-to]")) && void 0 !== t3 ? t3 : null, { end: n2 } = this.dataTable.page.info();
              i3 && (i3.innerText = `${n2}`);
            }
            initInfoLength(e3) {
              var t3;
              const i3 = null !== (t3 = e3.querySelector("[data-hs-datatable-info-length]")) && void 0 !== t3 ? t3 : null, { recordsTotal: n2 } = this.dataTable.page.info();
              i3 && (i3.innerText = `${n2}`);
            }
            updateInfo() {
              this.initInfo();
            }
            initPaging() {
              this.pagingList.forEach(((e3) => this.hidePagingIfSinglePage(e3)));
            }
            hidePagingIfSinglePage(e3) {
              const { pages: t3 } = this.dataTable.page.info();
              t3 < 2 ? (e3.classList.add("hidden"), e3.style.display = "none") : (e3.classList.remove("hidden"), e3.style.display = "");
            }
            initPagingPrev() {
              this.pagingPrevList.forEach(((e3) => {
                this.onPagingPrevClickListener.push({ el: e3, fn: () => this.pagingPrevClick() }), e3.addEventListener("click", this.onPagingPrevClickListener.find(((t3) => t3.el === e3)).fn);
              }));
            }
            onPrevClick() {
              this.dataTable.page("previous").draw("page");
            }
            disablePagingArrow(e3, t3) {
              t3 ? (e3.classList.add("disabled"), e3.setAttribute("disabled", "disabled")) : (e3.classList.remove("disabled"), e3.removeAttribute("disabled"));
            }
            initPagingNext() {
              this.pagingNextList.forEach(((e3) => {
                this.onPagingNextClickListener.push({ el: e3, fn: () => this.pagingNextClick() }), e3.addEventListener("click", this.onPagingNextClickListener.find(((t3) => t3.el === e3)).fn);
              }));
            }
            onNextClick() {
              this.dataTable.page("next").draw("page");
            }
            buildPagingPages() {
              this.pagingPagesList.forEach(((e3) => this.updatePaging(e3)));
            }
            updatePaging(e3) {
              const { page: t3, pages: i3, length: n2 } = this.dataTable.page.info(), o2 = this.dataTable.rows({ search: "applied" }).count(), l2 = Math.ceil(o2 / n2), a = t3 + 1;
              let r = Math.max(1, a - Math.floor(this.maxPagesToShow / 2)), d = Math.min(l2, r + (this.maxPagesToShow - 1));
              d - r + 1 < this.maxPagesToShow && (r = Math.max(1, d - this.maxPagesToShow + 1)), e3.innerHTML = "", r > 1 && (this.buildPagingPage(1, e3), r > 2 && e3.appendChild((0, s.htmlToElement)('<span class="ellipsis">...</span>')));
              for (let t4 = r; t4 <= d; t4++) this.buildPagingPage(t4, e3);
              d < l2 && (d < l2 - 1 && e3.appendChild((0, s.htmlToElement)('<span class="ellipsis">...</span>')), this.buildPagingPage(l2, e3)), this.pagingPrevList.forEach(((e4) => this.disablePagingArrow(e4, 0 === t3))), this.pagingNextList.forEach(((e4) => this.disablePagingArrow(e4, t3 === i3 - 1))), this.pagingList.forEach(((e4) => this.hidePagingIfSinglePage(e4)));
            }
            buildPagingPage(e3, t3) {
              const { page: i3 } = this.dataTable.page.info(), n2 = (0, s.htmlToElement)('<button type="button"></button>');
              n2.innerText = `${e3}`, n2.setAttribute("data-page", `${e3}`), this.pageBtnClasses && (0, s.classToClassList)(this.pageBtnClasses, n2), i3 === e3 - 1 && n2.classList.add("active"), this.onSinglePagingClickListener.push({ el: n2, fn: () => this.singlePagingClick(e3) }), n2.addEventListener("click", this.onSinglePagingClickListener.find(((e4) => e4.el === n2)).fn), t3.append(n2);
            }
            onPageClick(e3) {
              this.dataTable.page(e3 - 1).draw("page");
            }
            initRowSelecting() {
              this.onRowSelectingAllChangeListener = () => this.rowSelectingAllChange(), this.rowSelectingAll.addEventListener("change", this.onRowSelectingAllChangeListener);
            }
            triggerChangeEventToRow() {
              this.table.querySelectorAll(`tbody ${this.rowSelectingIndividual}`).forEach(((e3) => {
                e3.addEventListener("change", (() => {
                  this.updateSelectAllCheckbox();
                }));
              }));
            }
            onSelectAllChange() {
              let e3 = this.rowSelectingAll.checked;
              Array.from(this.dataTable.rows({ page: "current", search: "applied" }).nodes()).forEach(((t3) => {
                const i3 = t3.querySelector(this.rowSelectingIndividual);
                i3 && (i3.checked = e3);
              })), this.updateSelectAllCheckbox();
            }
            updateSelectAllCheckbox() {
              if (!this.dataTable.rows({ search: "applied" }).count()) return this.rowSelectingAll.checked = false, false;
              let e3 = true;
              Array.from(this.dataTable.rows({ page: "current", search: "applied" }).nodes()).forEach(((t3) => {
                const i3 = t3.querySelector(this.rowSelectingIndividual);
                if (i3 && !i3.checked) return e3 = false, false;
              })), this.rowSelectingAll.checked = e3;
            }
            destroy() {
              this.searches && this.onSearchInputListener.forEach((({ el: e3, fn: t3 }) => e3.removeEventListener("click", t3))), this.pageEntitiesList && this.onPageEntitiesChangeListener.forEach((({ el: e3, fn: t3 }) => e3.removeEventListener("change", t3))), this.pagingPagesList.length && (this.onSinglePagingClickListener.forEach((({ el: e3, fn: t3 }) => e3.removeEventListener("click", t3))), this.pagingPagesList.forEach(((e3) => e3.innerHTML = ""))), this.pagingPrevList.length && this.onPagingPrevClickListener.forEach((({ el: e3, fn: t3 }) => e3.removeEventListener("click", t3))), this.pagingNextList.length && this.onPagingNextClickListener.forEach((({ el: e3, fn: t3 }) => e3.removeEventListener("click", t3))), this.rowSelectingAll && this.rowSelectingAll.removeEventListener("change", this.onRowSelectingAllChangeListener), this.dataTable.destroy(), this.rowSelectingAll = null, this.rowSelectingIndividual = null, window.$hsDataTableCollection = window.$hsDataTableCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsDataTableCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsDataTableCollection || (window.$hsDataTableCollection = []), window.$hsDataTableCollection && (window.$hsDataTableCollection = window.$hsDataTableCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsDataTableCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            document.querySelectorAll("[data-hs-datatable]:not(.--prevent-on-load-init)").length && ("undefined" == typeof jQuery && console.error("HSDataTable: jQuery is not available, please add it to the page."), "undefined" == typeof DataTable && console.error("HSDataTable: DataTable is not available, please add it to the page.")), "undefined" != typeof DataTable && "undefined" != typeof jQuery && l.autoInit();
          })), "undefined" != typeof window && (window.HSDataTable = l), t2.default = l;
        }, 850: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = i2(223), l = n(i2(961)), a = n(i2(248));
          class r extends l.default {
            constructor(e3, t3, i3) {
              var n2, l2, a2, r2, d2, c2;
              super(e3, t3, i3), this.lastFocusedToggle = null, this.initialZIndex = 0, this.toggleButtons = Array.from(document.querySelectorAll(`[data-hs-overlay="#${this.el.id}"]`));
              const h2 = this.collectToggleParameters(this.toggleButtons);
              this.toggleMinifierButtons = Array.from(document.querySelectorAll(`[data-hs-overlay-minifier="#${this.el.id}"]`));
              const u = e3.getAttribute("data-hs-overlay-options"), p = u ? JSON.parse(u) : {}, m = Object.assign(Object.assign(Object.assign({}, p), h2), t3);
              this.hiddenClass = (null == m ? void 0 : m.hiddenClass) || "hidden", this.emulateScrollbarSpace = (null == m ? void 0 : m.emulateScrollbarSpace) || false, this.isClosePrev = null === (n2 = null == m ? void 0 : m.isClosePrev) || void 0 === n2 || n2, this.backdropClasses = null !== (l2 = null == m ? void 0 : m.backdropClasses) && void 0 !== l2 ? l2 : "hs-overlay-backdrop transition duration fixed inset-0 bg-gray-900/50 dark:bg-neutral-900/80", this.backdropParent = "string" == typeof m.backdropParent ? document.querySelector(m.backdropParent) : document.body, this.backdropExtraClasses = null !== (a2 = null == m ? void 0 : m.backdropExtraClasses) && void 0 !== a2 ? a2 : "", this.moveOverlayToBody = (null == m ? void 0 : m.moveOverlayToBody) || null, this.openNextOverlay = false, this.autoHide = null, this.initContainer = (null === (r2 = this.el) || void 0 === r2 ? void 0 : r2.parentElement) || null, this.isCloseWhenClickInside = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--close-when-click-inside", "false") || "false"), this.isTabAccessibilityLimited = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--tab-accessibility-limited", "true") || "true"), this.isLayoutAffect = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--is-layout-affect", "false") || "false"), this.hasAutofocus = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--has-autofocus", "true") || "true"), this.hasDynamicZIndex = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--has-dynamic-z-index", "false") || "false"), this.hasAbilityToCloseOnBackdropClick = (0, s.stringToBoolean)(this.el.getAttribute("data-hs-overlay-keyboard") || "true");
              const g = (0, s.getClassProperty)(this.el, "--auto-close"), v = (0, s.getClassProperty)(this.el, "--auto-close-equality-type"), f = (0, s.getClassProperty)(this.el, "--opened");
              this.autoClose = !isNaN(+g) && isFinite(+g) ? +g : o.BREAKPOINTS[g] || null, this.autoCloseEqualityType = null !== (d2 = v) && void 0 !== d2 ? d2 : null, this.openedBreakpoint = (!isNaN(+f) && isFinite(+f) ? +f : o.BREAKPOINTS[f]) || null, this.animationTarget = (null === (c2 = null == this ? void 0 : this.el) || void 0 === c2 ? void 0 : c2.querySelector(".hs-overlay-animation-target")) || this.el, this.initialZIndex = parseInt(getComputedStyle(this.el).zIndex, 10), this.onElementClickListener = [], this.onElementMinifierClickListener = [], this.initiallyOpened = document.body.classList.contains("hs-overlay-body-open"), this.init();
            }
            elementClick() {
              const e3 = () => {
                const e4 = { el: this.el, isOpened: !!this.el.classList.contains("open") };
                this.fireEvent("toggleClicked", e4), (0, s.dispatch)("toggleClicked.hs.overlay", this.el, e4);
              };
              this.el.classList.contains("opened") ? this.close(false, e3) : this.open(e3);
            }
            elementMinifierClick() {
              const e3 = () => {
                const e4 = { el: this.el, isMinified: !!this.el.classList.contains("minified") };
                this.fireEvent("toggleMinifierClicked", e4), (0, s.dispatch)("toggleMinifierClicked.hs.overlay", this.el, e4);
              };
              this.el.classList.contains("minified") ? this.minify(false, e3) : this.minify(true, e3);
            }
            minify(e3, t3 = null) {
              e3 ? (this.el.classList.add("minified"), document.body.classList.add("hs-overlay-minified"), t3 && t3()) : (this.el.classList.remove("minified"), document.body.classList.remove("hs-overlay-minified"), t3 && t3());
            }
            overlayClick(e3) {
              e3.target.id && `#${e3.target.id}` === this.el.id && this.isCloseWhenClickInside && this.hasAbilityToCloseOnBackdropClick && this.close();
            }
            backdropClick() {
              this.close();
            }
            init() {
              if (this.createCollection(window.$hsOverlayCollection, this), this.isLayoutAffect && this.openedBreakpoint) {
                const e3 = r.getInstance(this.el, true);
                r.setOpened(this.openedBreakpoint, e3);
              }
              this.onOverlayClickListener = (e3) => this.overlayClick(e3), this.el.addEventListener("click", this.onOverlayClickListener), this.toggleButtons.length && this.buildToggleButtons(this.toggleButtons), this.toggleMinifierButtons.length && this.buildToggleMinifierButtons(), "undefined" != typeof window && (window.HSAccessibilityObserver || (window.HSAccessibilityObserver = new a.default()), this.setupAccessibility());
            }
            buildToggleButtons(e3) {
              e3.forEach(((e4) => {
                this.el.classList.contains("opened") ? e4.ariaExpanded = "true" : e4.ariaExpanded = "false", this.onElementClickListener.push({ el: e4, fn: () => this.elementClick() }), e4.addEventListener("click", this.onElementClickListener.find(((t3) => t3.el === e4)).fn);
              }));
            }
            buildToggleMinifierButtons() {
              this.toggleMinifierButtons.forEach(((e3) => {
                this.el.classList.contains("minified") ? e3.ariaExpanded = "true" : e3.ariaExpanded = "false", this.onElementMinifierClickListener.push({ el: e3, fn: () => this.elementMinifierClick() }), e3.addEventListener("click", this.onElementMinifierClickListener.find(((t3) => t3.el === e3)).fn);
              }));
            }
            hideAuto() {
              const e3 = parseInt((0, s.getClassProperty)(this.el, "--auto-hide", "0"));
              e3 && (this.autoHide = setTimeout((() => {
                this.close();
              }), e3));
            }
            checkTimer() {
              this.autoHide && (clearTimeout(this.autoHide), this.autoHide = null);
            }
            buildBackdrop() {
              const e3 = this.el.classList.value.split(" "), t3 = parseInt(window.getComputedStyle(this.el).getPropertyValue("z-index")), i3 = this.el.getAttribute("data-hs-overlay-backdrop-container") || false;
              this.backdrop = document.createElement("div");
              let n2 = `${this.backdropClasses} ${this.backdropExtraClasses}`;
              const o2 = "static" !== (0, s.getClassProperty)(this.el, "--overlay-backdrop", "true"), l2 = "false" === (0, s.getClassProperty)(this.el, "--overlay-backdrop", "true");
              this.backdrop.id = `${this.el.id}-backdrop`, "style" in this.backdrop && (this.backdrop.style.zIndex = "" + (t3 - 1));
              for (const t4 of e3) (t4.startsWith("hs-overlay-backdrop-open:") || t4.includes(":hs-overlay-backdrop-open:")) && (n2 += ` ${t4}`);
              l2 || (i3 && (this.backdrop = document.querySelector(i3).cloneNode(true), this.backdrop.classList.remove("hidden"), n2 = `${this.backdrop.classList.toString()}`, this.backdrop.classList.value = ""), o2 && (this.onBackdropClickListener = () => this.backdropClick(), this.backdrop.addEventListener("click", this.onBackdropClickListener, true)), this.backdrop.setAttribute("data-hs-overlay-backdrop-template", ""), this.backdropParent.appendChild(this.backdrop), setTimeout((() => {
                this.backdrop.classList.value = n2;
              })));
            }
            destroyBackdrop() {
              const e3 = document.querySelector(`#${this.el.id}-backdrop`);
              e3 && (this.openNextOverlay && (e3.style.transitionDuration = 1.8 * parseFloat(window.getComputedStyle(e3).transitionDuration.replace(/[^\d.-]/g, "")) + "s"), e3.classList.add("opacity-0"), (0, s.afterTransition)(e3, (() => {
                e3.remove();
              })));
            }
            focusElement() {
              const e3 = this.el.querySelector("[autofocus]");
              if (!e3) return false;
              e3.focus();
            }
            getBodyCurrentScrollbarSize() {
              return Math.max(window.innerWidth - document.documentElement.clientWidth, 0);
            }
            collectToggleParameters(e3) {
              let t3 = {};
              return e3.forEach(((e4) => {
                const i3 = e4.getAttribute("data-hs-overlay-options"), n2 = i3 ? JSON.parse(i3) : {};
                t3 = Object.assign(Object.assign({}, t3), n2);
              })), t3;
            }
            isElementVisible() {
              const e3 = window.getComputedStyle(this.el);
              if ("none" === e3.display || "hidden" === e3.visibility || "0" === e3.opacity) return false;
              const t3 = this.el.getBoundingClientRect();
              if (0 === t3.width || 0 === t3.height) return false;
              let i3 = this.el.parentElement;
              for (; i3; ) {
                const e4 = window.getComputedStyle(i3);
                if ("none" === e4.display || "hidden" === e4.visibility || "0" === e4.opacity) return false;
                i3 = i3.parentElement;
              }
              return true;
            }
            isOpened() {
              return this.el.classList.contains("open") && !this.el.classList.contains(this.hiddenClass);
            }
            open(e3 = null) {
              this.el.classList.contains("minified") && this.minify(false), this.hasDynamicZIndex && (r.currentZIndex < this.initialZIndex && (r.currentZIndex = this.initialZIndex), r.currentZIndex++, this.el.style.zIndex = `${r.currentZIndex}`);
              const t3 = document.querySelectorAll(".hs-overlay.open"), i3 = window.$hsOverlayCollection.find(((e4) => Array.from(t3).includes(e4.element.el) && !e4.element.isLayoutAffect)), n2 = document.querySelectorAll(`[data-hs-overlay="#${this.el.id}"]`), o2 = "true" !== (0, s.getClassProperty)(this.el, "--body-scroll", "false");
              if (this.lastFocusedToggle = document.activeElement, this.isClosePrev && i3) return this.openNextOverlay = true, i3.element.close().then((() => {
                this.open(), this.openNextOverlay = false;
              }));
              o2 && (this.emulateScrollbarSpace && (document.body.style.paddingRight = `${this.getBodyCurrentScrollbarSize()}px`), document.body.style.overflow = "hidden"), this.buildBackdrop(), this.checkTimer(), this.hideAuto(), n2.forEach(((e4) => {
                e4.ariaExpanded && (e4.ariaExpanded = "true");
              })), this.el.classList.remove(this.hiddenClass), this.el.setAttribute("aria-overlay", "true"), this.el.setAttribute("tabindex", "-1"), setTimeout((() => {
                if (this.el.classList.contains("opened")) return false;
                this.el.classList.add("open", "opened"), this.isLayoutAffect && document.body.classList.add("hs-overlay-body-open"), this.initiallyOpened || (this.el.focus(), this.el.style.outline = "none"), this.initiallyOpened = false, this.fireEvent("open", this.el), (0, s.dispatch)("open.hs.overlay", this.el, this.el), window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, true), this.hasAutofocus && this.focusElement(), "function" == typeof e3 && e3(), this.isElementVisible() && r.openedItemsQty++;
              }), 50);
            }
            close(e3 = false, t3 = null) {
              this.isElementVisible() && (r.openedItemsQty = r.openedItemsQty <= 0 ? 0 : r.openedItemsQty - 1), 0 === r.openedItemsQty && this.isLayoutAffect && document.body.classList.remove("hs-overlay-body-open");
              const i3 = (e4) => {
                if (this.el.classList.contains("open")) return false;
                if (document.querySelectorAll(`[data-hs-overlay="#${this.el.id}"]`).forEach(((e5) => {
                  e5.ariaExpanded && (e5.ariaExpanded = "false");
                })), this.el.classList.add(this.hiddenClass), this.hasDynamicZIndex && (this.el.style.zIndex = ""), this.destroyBackdrop(), this.fireEvent("close", this.el), (0, s.dispatch)("close.hs.overlay", this.el, this.el), window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, false), document.querySelector(".hs-overlay.opened") || (document.body.style.overflow = "", this.emulateScrollbarSpace && (document.body.style.paddingRight = "")), this.lastFocusedToggle && (this.lastFocusedToggle.focus(), this.lastFocusedToggle = null), e4(this.el), "function" == typeof t3 && t3(), 0 === r.openedItemsQty) {
                  if (!this.isLayoutAffect) {
                    window.$hsOverlayCollection.some(((e5) => e5.element.isLayoutAffect && e5.element.el.classList.contains("opened"))) || document.body.classList.remove("hs-overlay-body-open");
                  }
                  this.hasDynamicZIndex && (r.currentZIndex = 0);
                }
              };
              return new Promise(((t4) => {
                this.el.classList.remove("open", "opened"), this.el.removeAttribute("aria-overlay"), this.el.removeAttribute("tabindex"), this.el.style.outline = "", e3 ? i3(t4) : (0, s.afterTransition)(this.animationTarget, (() => i3(t4)));
              }));
            }
            updateToggles() {
              const e3 = Array.from(document.querySelectorAll(`[data-hs-overlay="#${this.el.id}"]`)).filter(((e4) => !this.toggleButtons.includes(e4)));
              e3.length && (this.toggleButtons.push(...e3), this.buildToggleButtons(e3)), this.toggleButtons = this.toggleButtons.filter(((e4) => {
                var t3;
                if (document.contains(e4)) return true;
                const i3 = null === (t3 = this.onElementClickListener) || void 0 === t3 ? void 0 : t3.find(((t4) => t4.el === e4));
                return i3 && e4.removeEventListener("click", i3.fn), false;
              }));
            }
            destroy() {
              this.el.classList.remove("open", "opened", this.hiddenClass), this.isLayoutAffect && document.body.classList.remove("hs-overlay-body-open"), this.el.removeEventListener("click", this.onOverlayClickListener), this.onElementClickListener.length && (this.onElementClickListener.forEach((({ el: e3, fn: t3 }) => {
                e3.removeEventListener("click", t3);
              })), this.onElementClickListener = null), this.backdrop && this.backdrop.removeEventListener("click", this.onBackdropClickListener), this.backdrop && (this.backdrop.remove(), this.backdrop = null), window.$hsOverlayCollection = window.$hsOverlayCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static findInCollection(e3) {
              return window.$hsOverlayCollection.find(((t3) => e3 instanceof r ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static getInstance(e3, t3) {
              const i3 = "string" == typeof e3 ? document.querySelector(e3) : e3, n2 = (null == i3 ? void 0 : i3.getAttribute("data-hs-overlay")) ? i3.getAttribute("data-hs-overlay") : e3, s2 = window.$hsOverlayCollection.find(((e4) => e4.element.el === ("string" == typeof n2 ? document.querySelector(n2) : n2) || e4.element.el === ("string" == typeof n2 ? document.querySelector(n2) : n2)));
              return s2 ? t3 ? s2 : s2.element.el : null;
            }
            static autoInit() {
              window.$hsOverlayCollection || (window.$hsOverlayCollection = []), window.$hsOverlayCollection && (window.$hsOverlayCollection = window.$hsOverlayCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll(".hs-overlay:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsOverlayCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new r(e3);
              }));
            }
            static open(e3) {
              const t3 = r.findInCollection(e3);
              t3 && t3.element.el.classList.contains(t3.element.hiddenClass) && t3.element.open();
            }
            static close(e3) {
              const t3 = r.findInCollection(e3);
              t3 && !t3.element.el.classList.contains(t3.element.hiddenClass) && t3.element.close();
            }
            static minify(e3, t3) {
              const i3 = r.findInCollection(e3);
              i3 && i3.element.minify(t3);
            }
            static setOpened(e3, t3) {
              document.body.clientWidth >= e3 ? (t3.element.el.classList.contains("minified") && t3.element.minify(false), document.body.classList.add("hs-overlay-body-open"), t3.element.open()) : t3.element.close(true);
            }
            setupAccessibility() {
              this.accessibilityComponent = window.HSAccessibilityObserver.registerComponent(this.el, { onEnter: () => {
                this.isOpened() || this.open();
              }, onEsc: () => {
                this.isOpened() && this.hasAbilityToCloseOnBackdropClick && this.close();
              }, onTab: () => {
                var e3;
                if (!this.isOpened() || !this.isTabAccessibilityLimited) return;
                const t3 = Array.from(this.el.querySelectorAll('button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])')).filter(((e4) => !e4.hidden && "none" !== window.getComputedStyle(e4).display));
                if (0 === t3.length) return;
                const i3 = this.el.querySelector(":focus"), n2 = i3 ? t3.indexOf(i3) : -1;
                window.event instanceof KeyboardEvent && window.event.shiftKey ? n2 <= 0 ? t3[t3.length - 1].focus() : t3[n2 - 1].focus() : n2 === t3.length - 1 ? t3[0].focus() : t3[n2 + 1].focus(), null === (e3 = window.event) || void 0 === e3 || e3.preventDefault();
              } }, this.isOpened(), "Overlay", ".hs-overlay"), this.toggleButtons.forEach(((e3) => {
                window.HSAccessibilityObserver.registerComponent(e3, { onEnter: () => {
                  this.isOpened() || this.open();
                }, onEsc: () => {
                  this.isOpened() && this.hasAbilityToCloseOnBackdropClick && this.close();
                } }, this.isOpened(), "Overlay Toggle", `[data-hs-overlay="#${this.el.id}"]`);
              }));
            }
            static on(e3, t3, i3) {
              const n2 = r.findInCollection(t3);
              n2 && (n2.element.events[e3] = i3);
            }
          }
          r.openedItemsQty = 0, r.currentZIndex = 0;
          let d = null;
          const c = () => {
            var e3, t3;
            if (!(null === (e3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === e3 ? void 0 : e3.length) || !(null === (t3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === t3 ? void 0 : t3.find(((e4) => e4.element.moveOverlayToBody)))) return false;
            window.$hsOverlayCollection.filter(((e4) => e4.element.moveOverlayToBody)).forEach(((e4) => {
              const t4 = e4.element.moveOverlayToBody, i3 = e4.element.initContainer, n2 = document.querySelector("body"), o2 = e4.element.el;
              if (!i3 && o2) return false;
              document.body.clientWidth <= t4 && !(0, s.isDirectChild)(n2, o2) ? n2.appendChild(o2) : document.body.clientWidth > t4 && !i3.contains(o2) && i3.appendChild(o2);
            }));
          }, h = () => {
            var e3;
            (null === (e3 = window.$hsOverlayCollection) || void 0 === e3 ? void 0 : e3.length) && window.$hsOverlayCollection.forEach(((e4) => {
              var t3;
              const i3 = e4.element;
              (null === (t3 = i3.toggleMinifierButtons) || void 0 === t3 ? void 0 : t3.length) > 0 && i3.openedBreakpoint && (document.body.clientWidth >= i3.openedBreakpoint ? document.body.classList.add("hs-overlay-body-open") : document.body.classList.remove("hs-overlay-body-open"));
            }));
          };
          window.addEventListener("load", (() => {
            r.autoInit(), c(), h();
          })), window.addEventListener("resize", (() => {
            ((e3, t3 = 150) => {
              d && clearTimeout(d), d = setTimeout(e3, t3);
            })((() => {
              (() => {
                var e3, t3;
                if (!(null === (e3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === e3 ? void 0 : e3.length) || !(null === (t3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === t3 ? void 0 : t3.find(((e4) => e4.element.autoClose)))) return false;
                window.$hsOverlayCollection.filter(((e4) => e4.element.autoClose)).forEach(((e4) => {
                  const { autoCloseEqualityType: t4, autoClose: i3 } = e4.element;
                  ("less-than" === t4 ? document.body.clientWidth <= i3 : document.body.clientWidth >= i3) && e4.element.el.classList.contains("opened") ? (e4.element.el.classList.contains("minified") && e4.element.minify(false), e4.element.close(true)) : e4.element.isLayoutAffect && e4.element.el.classList.contains("opened") && document.body.classList.add("hs-overlay-body-open");
                }));
              })(), (() => {
                var e3, t3;
                if (!(null === (e3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === e3 ? void 0 : e3.length) || !(null === (t3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === t3 ? void 0 : t3.find(((e4) => e4.element.openedBreakpoint)))) return false;
                window.$hsOverlayCollection.filter(((e4) => e4.element.openedBreakpoint)).forEach(((e4) => {
                  const { openedBreakpoint: t4 } = e4.element;
                  document.body.clientWidth >= t4 ? e4.element.el.classList.contains("opened") || r.setOpened(t4, e4) : e4.element.el.classList.contains("opened") && (e4.element.el.classList.contains("minified") && e4.element.minify(false), e4.element.close(true));
                }));
              })();
            })), c(), (() => {
              var e3, t3;
              if (!(null === (e3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === e3 ? void 0 : e3.length) || !(null === (t3 = null === window || void 0 === window ? void 0 : window.$hsOverlayCollection) || void 0 === t3 ? void 0 : t3.find(((e4) => e4.element.el.classList.contains("opened"))))) return false;
              window.$hsOverlayCollection.filter(((e4) => e4.element.el.classList.contains("opened"))).forEach(((e4) => {
                const t4 = parseInt(window.getComputedStyle(e4.element.el).getPropertyValue("z-index")), i3 = document.querySelector(`#${e4.element.el.id}-backdrop`);
                return !!i3 && (t4 !== parseInt(window.getComputedStyle(i3).getPropertyValue("z-index")) + 1 && ("style" in i3 && (i3.style.zIndex = "" + (t4 - 1)), void document.body.classList.add("hs-overlay-body-open")));
              }));
            })(), h();
          })), "undefined" != typeof window && (window.HSOverlay = r), t2.default = r;
        }, 852: (e2, t2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true }), t2.todayTranslations = void 0, t2.todayTranslations = { "ru-RU": "\u0441\u0435\u0433\u043E\u0434\u043D\u044F", ru: "\u0441\u0435\u0433\u043E\u0434\u043D\u044F", "de-DE": "Heute", de: "Heute", "fr-FR": "Aujourd'hui", fr: "Aujourd'hui", "es-ES": "Hoy", es: "Hoy", "it-IT": "Oggi", it: "Oggi", "pt-BR": "Hoje", pt: "Hoje", "pl-PL": "Dzisiaj", pl: "Dzisiaj", "uk-UA": "\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456", uk: "\u0421\u044C\u043E\u0433\u043E\u0434\u043D\u0456", "zh-CN": "\u4ECA\u5929", zh: "\u4ECA\u5929", "ja-JP": "\u4ECA\u65E5", ja: "\u4ECA\u65E5", "ko-KR": "\uC624\uB298", ko: "\uC624\uB298", "ar-SA": "\u0627\u0644\u064A\u0648\u0645", ar: "\u0627\u0644\u064A\u0648\u0645", "hi-IN": "\u0906\u091C", hi: "\u0906\u091C", "tr-TR": "Bug\xFCn", tr: "Bug\xFCn", "nl-NL": "Vandaag", nl: "Vandaag", "sv-SE": "Idag", sv: "Idag", "da-DK": "I dag", da: "I dag", "no-NO": "I dag", no: "I dag", "fi-FI": "T\xE4n\xE4\xE4n", fi: "T\xE4n\xE4\xE4n", "cs-CZ": "Dnes", cs: "Dnes", "sk-SK": "Dnes", sk: "Dnes", "hu-HU": "Ma", hu: "Ma", "ro-RO": "Ast\u0103zi", ro: "Ast\u0103zi", "bg-BG": "\u0414\u043D\u0435\u0441", bg: "\u0414\u043D\u0435\u0441", "hr-HR": "Danas", hr: "Danas", "sr-RS": "\u0414\u0430\u043D\u0430\u0441", sr: "\u0414\u0430\u043D\u0430\u0441", "sl-SI": "Danes", sl: "Danes", "et-EE": "T\xE4na", et: "T\xE4na", "lv-LV": "\u0160odien", lv: "\u0160odien", "lt-LT": "\u0160iandien", lt: "\u0160iandien", "el-GR": "\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1", el: "\u03A3\u03AE\u03BC\u03B5\u03C1\u03B1", "he-IL": "\u05D4\u05D9\u05D5\u05DD", he: "\u05D4\u05D9\u05D5\u05DD", "th-TH": "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49", th: "\u0E27\u0E31\u0E19\u0E19\u0E35\u0E49", "vi-VN": "H\xF4m nay", vi: "H\xF4m nay", "id-ID": "Hari ini", id: "Hari ini", "ms-MY": "Hari ini", ms: "Hari ini", "fa-IR": "\u0627\u0645\u0631\u0648\u0632", fa: "\u0627\u0645\u0631\u0648\u0632", "ur-PK": "\u0622\u062C", ur: "\u0622\u062C", "bn-BD": "\u0986\u099C", bn: "\u0986\u099C", "ta-IN": "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1", ta: "\u0B87\u0BA9\u0BCD\u0BB1\u0BC1", "te-IN": "\u0C28\u0C47\u0C21\u0C41", te: "\u0C28\u0C47\u0C21\u0C41", "ml-IN": "\u0D07\u0D28\u0D4D\u0D28\u0D4D", ml: "\u0D07\u0D28\u0D4D\u0D28\u0D4D", "kn-IN": "\u0C87\u0C82\u0CA6\u0CC1", kn: "\u0C87\u0C82\u0CA6\u0CC1", "gu-IN": "\u0A86\u0A9C\u0AC7", gu: "\u0A86\u0A9C\u0AC7", "pa-IN": "\u0A05\u0A71\u0A1C", pa: "\u0A05\u0A71\u0A1C", "or-IN": "\u0B06\u0B1C\u0B3F", or: "\u0B06\u0B1C\u0B3F", "as-IN": "\u0986\u099C\u09BF", as: "\u0986\u099C\u09BF", "ne-NP": "\u0906\u091C", ne: "\u0906\u091C", "si-LK": "\u0D85\u0DAF", si: "\u0D85\u0DAF", "my-MM": "\u101A\u1014\u1031\u1037", my: "\u101A\u1014\u1031\u1037", "km-KH": "\u1790\u17D2\u1784\u17C3\u1793\u17C1\u17C7", km: "\u1790\u17D2\u1784\u17C3\u1793\u17C1\u17C7", "lo-LA": "\u0EA1\u0EB7\u0EC9\u0E99\u0EB5\u0EC9", lo: "\u0EA1\u0EB7\u0EC9\u0E99\u0EB5\u0EC9", "mn-MN": "\u04E8\u043D\u04E9\u04E9\u0434\u04E9\u0440", mn: "\u04E8\u043D\u04E9\u04E9\u0434\u04E9\u0440", "ka-GE": "\u10D3\u10E6\u10D4\u10E1", ka: "\u10D3\u10E6\u10D4\u10E1", "hy-AM": "\u0531\u0575\u057D\u0585\u0580", hy: "\u0531\u0575\u057D\u0585\u0580", "az-AZ": "Bu g\xFCn", az: "Bu g\xFCn", "kk-KZ": "\u0411\u04AF\u0433\u0456\u043D", kk: "\u0411\u04AF\u0433\u0456\u043D", "ky-KG": "\u0411\u04AF\u0433\u04AF\u043D", ky: "\u0411\u04AF\u0433\u04AF\u043D", "uz-UZ": "Bugun", uz: "Bugun", "tg-TJ": "\u0418\u043C\u0440\u04EF\u0437", tg: "\u0418\u043C\u0440\u04EF\u0437", "ps-AF": "\u0646\u0646", ps: "\u0646\u0646", "ku-IQ": "\u0626\u06D5\u0645\u0695\u06C6", ku: "\u0626\u06D5\u0645\u0695\u06C6", "yi-IL": "\u05D4\u05D9\u05D9\u05E0\u05D8", yi: "\u05D4\u05D9\u05D9\u05E0\u05D8", "lb-LU": "Haut", lb: "Haut", "is-IS": "\xCD dag", is: "\xCD dag", "mt-MT": "Illum", mt: "Illum", "cy-GB": "Heddiw", cy: "Heddiw", "ga-IE": "Inniu", ga: "Inniu", "gd-GB": "An-diugh", gd: "An-diugh", "kw-GB": "Hedhyw", kw: "Hedhyw", "br-FR": "Hiziv", br: "Hiziv", "oc-FR": "U\xE8i", oc: "U\xE8i", "ca-ES": "Avui", ca: "Avui", "eu-ES": "Gaur", eu: "Gaur", "gl-ES": "Hoxe", gl: "Hoxe", "ast-ES": "G\xFCei", ast: "G\xFCei", "an-ES": "Hue", an: "Hue", "fur-IT": "Vu\xEA", fur: "Vu\xEA", "lij-IT": "Ancheu", lij: "Ancheu", "pms-IT": "Ancheuj", pms: "Ancheuj", "rm-CH": "Oz", rm: "Oz", "gsw-CH": "H\xFCt", gsw: "H\xFCt", "wae-CH": "H\xFCt", wae: "H\xFCt", "bar-AT": "Heit", bar: "Heit", "ksh-DE": "H\xFCck", ksh: "H\xFCck", "nds-DE": "Vundaag", nds: "Vundaag", "pfl-DE": "Haid", pfl: "Haid", "pdc-US": "Heit", pdc: "Heit", "af-ZA": "Vandag", af: "Vandag", "zu-ZA": "Namhlanje", zu: "Namhlanje", "xh-ZA": "Namhlanje", xh: "Namhlanje", "st-ZA": "Kajeno", st: "Kajeno", "tn-ZA": "Kajeno", tn: "Kajeno", "ve-ZA": "Leno", ve: "Leno", "nso-ZA": "Kajeno", nso: "Kajeno", "ts-ZA": "Namuntlha", ts: "Namuntlha", "ss-ZA": "Lamuhla", ss: "Lamuhla", "nr-ZA": "Namhlanje", nr: "Namhlanje", "ff-SN": "Hannde", ff: "Hannde", "wo-SN": "Tey", wo: "Tey", "ig-NG": "Taa", ig: "Taa", "yo-NG": "L\xF3n\xEC\xED", yo: "L\xF3n\xEC\xED", "ha-NG": "Yau", ha: "Yau", "sw-KE": "Leo", sw: "Leo", "am-ET": "\u12DB\u122C", am: "\u12DB\u122C", "ti-ER": "\u120E\u121A", ti: "\u120E\u121A", "so-SO": "Maanta", so: "Maanta", "om-ET": "Har'a", om: "Har'a" };
        }, 887: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-stepper"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.currentIndex = (null == s2 ? void 0 : s2.currentIndex) || 1, this.mode = (null == s2 ? void 0 : s2.mode) || "linear", this.isCompleted = void 0 !== (null == s2 ? void 0 : s2.isCompleted) && (null == s2 ? void 0 : s2.isCompleted), this.totalSteps = 1, this.navItems = [], this.contentItems = [], this.onNavItemClickListener = [], this.init();
            }
            navItemClick(e3) {
              this.handleNavItemClick(e3);
            }
            backClick() {
              if (this.handleBackButtonClick(), "linear" === this.mode) {
                const e3 = this.navItems.find((({ index: e4 }) => e4 === this.currentIndex)), t3 = this.contentItems.find((({ index: e4 }) => e4 === this.currentIndex));
                if (!e3 || !t3) return;
                e3.isCompleted && (e3.isCompleted = false, e3.isSkip = false, e3.el.classList.remove("success", "skipped")), t3.isCompleted && (t3.isCompleted = false, t3.isSkip = false, t3.el.classList.remove("success", "skipped")), "linear" === this.mode && this.currentIndex !== this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = ""), this.completeStepBtn && (this.completeStepBtn.style.display = "")), this.showSkipButton(), this.showFinishButton(), this.showCompleteStepButton();
              }
            }
            nextClick() {
              var e3;
              if (this.fireEvent("beforeNext", this.currentIndex), (0, s.dispatch)("beforeNext.hs.stepper", this.el, this.currentIndex), null === (e3 = this.getNavItem(this.currentIndex)) || void 0 === e3 ? void 0 : e3.isProcessed) return this.disableAll(), false;
              this.goToNext();
            }
            skipClick() {
              this.handleSkipButtonClick(), "linear" === this.mode && this.currentIndex === this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"), this.finishBtn && (this.finishBtn.style.display = ""));
            }
            completeStepBtnClick() {
              this.handleCompleteStepButtonClick();
            }
            finishBtnClick() {
              var e3;
              if (this.fireEvent("beforeFinish", this.currentIndex), (0, s.dispatch)("beforeFinish.hs.stepper", this.el, this.currentIndex), null === (e3 = this.getNavItem(this.currentIndex)) || void 0 === e3 ? void 0 : e3.isProcessed) return this.disableAll(), false;
              this.handleFinishButtonClick();
            }
            resetBtnClick() {
              this.handleResetButtonClick();
            }
            init() {
              this.createCollection(window.$hsStepperCollection, this), this.buildNav(), this.buildContent(), this.buildButtons(), this.setTotalSteps();
            }
            getUncompletedSteps(e3 = false) {
              return this.navItems.filter((({ isCompleted: t3, isSkip: i3 }) => e3 ? !t3 || i3 : !t3 && !i3));
            }
            setTotalSteps() {
              this.navItems.forEach(((e3) => {
                const { index: t3 } = e3;
                t3 > this.totalSteps && (this.totalSteps = t3);
              }));
            }
            buildNav() {
              this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach(((e3) => this.addNavItem(e3))), this.navItems.forEach(((e3) => this.buildNavItem(e3)));
            }
            buildNavItem(e3) {
              const { index: t3, isDisabled: i3, el: n2 } = e3;
              t3 === this.currentIndex && this.setCurrentNavItem(), ("linear" !== this.mode || i3) && (this.onNavItemClickListener.push({ el: n2, fn: () => this.navItemClick(e3) }), n2.addEventListener("click", this.onNavItemClickListener.find(((e4) => e4.el === n2)).fn));
            }
            addNavItem(e3) {
              const { index: t3, isFinal: i3 = false, isCompleted: n2 = false, isSkip: s2 = false, isOptional: o2 = false, isDisabled: l2 = false, isProcessed: a = false, hasError: r = false } = JSON.parse(e3.getAttribute("data-hs-stepper-nav-item"));
              n2 && e3.classList.add("success"), s2 && e3.classList.add("skipped"), l2 && ("BUTTON" !== e3.tagName && "INPUT" !== e3.tagName || e3.setAttribute("disabled", "disabled"), e3.classList.add("disabled")), r && e3.classList.add("error"), this.navItems.push({ index: t3, isFinal: i3, isCompleted: n2, isSkip: s2, isOptional: o2, isDisabled: l2, isProcessed: a, hasError: r, el: e3 });
            }
            setCurrentNavItem() {
              this.navItems.forEach(((e3) => {
                const { index: t3, el: i3 } = e3;
                t3 === this.currentIndex ? this.setCurrentNavItemActions(i3) : this.unsetCurrentNavItemActions(i3);
              }));
            }
            setCurrentNavItemActions(e3) {
              e3.classList.add("active"), this.fireEvent("active", this.currentIndex), (0, s.dispatch)("active.hs.stepper", this.el, this.currentIndex);
            }
            getNavItem(e3 = this.currentIndex) {
              return this.navItems.find((({ index: t3 }) => t3 === e3));
            }
            setProcessedNavItemActions(e3) {
              e3.isProcessed = true, e3.el.classList.add("processed");
            }
            setErrorNavItemActions(e3) {
              e3.hasError = true, e3.el.classList.add("error");
            }
            unsetCurrentNavItemActions(e3) {
              e3.classList.remove("active");
            }
            handleNavItemClick(e3) {
              const { index: t3 } = e3;
              this.currentIndex = t3, this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep();
            }
            buildContent() {
              this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach(((e3) => this.addContentItem(e3))), this.navItems.forEach(((e3) => this.buildContentItem(e3)));
            }
            buildContentItem(e3) {
              const { index: t3 } = e3;
              t3 === this.currentIndex && this.setCurrentContentItem();
            }
            addContentItem(e3) {
              const { index: t3, isFinal: i3 = false, isCompleted: n2 = false, isSkip: s2 = false } = JSON.parse(e3.getAttribute("data-hs-stepper-content-item"));
              n2 && e3.classList.add("success"), s2 && e3.classList.add("skipped"), this.contentItems.push({ index: t3, isFinal: i3, isCompleted: n2, isSkip: s2, el: e3 });
            }
            setCurrentContentItem() {
              if (this.isCompleted) {
                const e3 = this.contentItems.find((({ isFinal: e4 }) => e4)), t3 = this.contentItems.filter((({ isFinal: e4 }) => !e4));
                return e3.el.style.display = "", t3.forEach((({ el: e4 }) => e4.style.display = "none")), false;
              }
              this.contentItems.forEach(((e3) => {
                const { index: t3, el: i3 } = e3;
                t3 === this.currentIndex ? this.setCurrentContentItemActions(i3) : this.unsetCurrentContentItemActions(i3);
              }));
            }
            hideAllContentItems() {
              this.contentItems.forEach((({ el: e3 }) => e3.style.display = "none"));
            }
            setCurrentContentItemActions(e3) {
              e3.style.display = "";
            }
            unsetCurrentContentItemActions(e3) {
              e3.style.display = "none";
            }
            disableAll() {
              const e3 = this.getNavItem(this.currentIndex);
              e3.hasError = false, e3.isCompleted = false, e3.isDisabled = false, e3.el.classList.remove("error", "success"), this.disableButtons();
            }
            disableNavItemActions(e3) {
              e3.isDisabled = true, e3.el.classList.add("disabled");
            }
            enableNavItemActions(e3) {
              e3.isDisabled = false, e3.el.classList.remove("disabled");
            }
            buildButtons() {
              this.backBtn = this.el.querySelector("[data-hs-stepper-back-btn]"), this.nextBtn = this.el.querySelector("[data-hs-stepper-next-btn]"), this.skipBtn = this.el.querySelector("[data-hs-stepper-skip-btn]"), this.completeStepBtn = this.el.querySelector("[data-hs-stepper-complete-step-btn]"), this.finishBtn = this.el.querySelector("[data-hs-stepper-finish-btn]"), this.resetBtn = this.el.querySelector("[data-hs-stepper-reset-btn]"), this.buildBackButton(), this.buildNextButton(), this.buildSkipButton(), this.buildCompleteStepButton(), this.buildFinishButton(), this.buildResetButton();
            }
            buildBackButton() {
              this.backBtn && (this.checkForTheFirstStep(), this.onBackClickListener = () => this.backClick(), this.backBtn.addEventListener("click", this.onBackClickListener));
            }
            handleBackButtonClick() {
              1 !== this.currentIndex && ("linear" === this.mode && this.removeOptionalClasses(), this.currentIndex--, "linear" === this.mode && this.removeOptionalClasses(), this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.fireEvent("back", this.currentIndex), (0, s.dispatch)("back.hs.stepper", this.el, this.currentIndex));
            }
            checkForTheFirstStep() {
              1 === this.currentIndex ? this.setToDisabled(this.backBtn) : this.setToNonDisabled(this.backBtn);
            }
            setToDisabled(e3) {
              "BUTTON" !== e3.tagName && "INPUT" !== e3.tagName || e3.setAttribute("disabled", "disabled"), e3.classList.add("disabled");
            }
            setToNonDisabled(e3) {
              "BUTTON" !== e3.tagName && "INPUT" !== e3.tagName || e3.removeAttribute("disabled"), e3.classList.remove("disabled");
            }
            buildNextButton() {
              this.nextBtn && (this.onNextClickListener = () => this.nextClick(), this.nextBtn.addEventListener("click", this.onNextClickListener));
            }
            unsetProcessedNavItemActions(e3) {
              e3.isProcessed = false, e3.el.classList.remove("processed");
            }
            handleNextButtonClick(e3 = true) {
              if (e3) this.currentIndex === this.totalSteps ? this.currentIndex = 1 : this.currentIndex++;
              else {
                const e4 = this.getUncompletedSteps();
                if (1 === e4.length) {
                  const { index: t3 } = e4[0];
                  this.currentIndex = t3;
                } else {
                  if (this.currentIndex === this.totalSteps) return;
                  this.currentIndex++;
                }
              }
              "linear" === this.mode && this.removeOptionalClasses(), this.setCurrentNavItem(), this.setCurrentContentItem(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.showSkipButton(), this.showFinishButton(), this.showCompleteStepButton(), this.fireEvent("next", this.currentIndex), (0, s.dispatch)("next.hs.stepper", this.el, this.currentIndex);
            }
            removeOptionalClasses() {
              const e3 = this.navItems.find((({ index: e4 }) => e4 === this.currentIndex)), t3 = this.contentItems.find((({ index: e4 }) => e4 === this.currentIndex));
              e3.isSkip = false, e3.hasError = false, e3.isDisabled = false, t3.isSkip = false, e3.el.classList.remove("skipped", "success", "error"), t3.el.classList.remove("skipped", "success", "error");
            }
            buildSkipButton() {
              this.skipBtn && (this.showSkipButton(), this.onSkipClickListener = () => this.skipClick(), this.skipBtn.addEventListener("click", this.onSkipClickListener));
            }
            setSkipItem(e3) {
              const t3 = this.navItems.find((({ index: t4 }) => t4 === (e3 || this.currentIndex))), i3 = this.contentItems.find((({ index: t4 }) => t4 === (e3 || this.currentIndex)));
              t3 && i3 && (this.setSkipItemActions(t3), this.setSkipItemActions(i3));
            }
            setSkipItemActions(e3) {
              e3.isSkip = true, e3.el.classList.add("skipped");
            }
            showSkipButton() {
              if (!this.skipBtn) return;
              const { isOptional: e3 } = this.navItems.find((({ index: e4 }) => e4 === this.currentIndex));
              this.skipBtn.style.display = e3 ? "" : "none";
            }
            handleSkipButtonClick() {
              this.setSkipItem(), this.handleNextButtonClick(), this.fireEvent("skip", this.currentIndex), (0, s.dispatch)("skip.hs.stepper", this.el, this.currentIndex);
            }
            buildCompleteStepButton() {
              this.completeStepBtn && (this.completeStepBtnDefaultText = this.completeStepBtn.innerText, this.onCompleteStepBtnClickListener = () => this.completeStepBtnClick(), this.completeStepBtn.addEventListener("click", this.onCompleteStepBtnClickListener));
            }
            changeTextAndDisableCompleteButtonIfStepCompleted() {
              const e3 = this.navItems.find((({ index: e4 }) => e4 === this.currentIndex)), { completedText: t3 } = JSON.parse(this.completeStepBtn.getAttribute("data-hs-stepper-complete-step-btn"));
              e3 && (e3.isCompleted ? (this.completeStepBtn.innerText = t3 || this.completeStepBtnDefaultText, this.completeStepBtn.setAttribute("disabled", "disabled"), this.completeStepBtn.classList.add("disabled")) : (this.completeStepBtn.innerText = this.completeStepBtnDefaultText, this.completeStepBtn.removeAttribute("disabled"), this.completeStepBtn.classList.remove("disabled")));
            }
            setCompleteItem(e3) {
              const t3 = this.navItems.find((({ index: t4 }) => t4 === (e3 || this.currentIndex))), i3 = this.contentItems.find((({ index: t4 }) => t4 === (e3 || this.currentIndex)));
              t3 && i3 && (this.setCompleteItemActions(t3), this.setCompleteItemActions(i3));
            }
            setCompleteItemActions(e3) {
              e3.isCompleted = true, e3.el.classList.add("success");
            }
            showCompleteStepButton() {
              if (!this.completeStepBtn) return;
              1 === this.getUncompletedSteps().length ? this.completeStepBtn.style.display = "none" : this.completeStepBtn.style.display = "";
            }
            handleCompleteStepButtonClick() {
              this.setCompleteItem(), this.fireEvent("complete", this.currentIndex), (0, s.dispatch)("complete.hs.stepper", this.el, this.currentIndex), this.handleNextButtonClick(false), this.showFinishButton(), this.showCompleteStepButton(), this.checkForTheFirstStep(), this.completeStepBtn && this.changeTextAndDisableCompleteButtonIfStepCompleted(), this.showSkipButton();
            }
            buildFinishButton() {
              this.finishBtn && (this.isCompleted && this.setCompleted(), this.onFinishBtnClickListener = () => this.finishBtnClick(), this.finishBtn.addEventListener("click", this.onFinishBtnClickListener));
            }
            setCompleted() {
              this.el.classList.add("completed");
            }
            unsetCompleted() {
              this.el.classList.remove("completed");
            }
            showFinishButton() {
              if (!this.finishBtn) return;
              1 === this.getUncompletedSteps().length ? this.finishBtn.style.display = "" : this.finishBtn.style.display = "none";
            }
            handleFinishButtonClick() {
              const e3 = this.getUncompletedSteps(), t3 = this.getUncompletedSteps(true), { el: i3 } = this.contentItems.find((({ isFinal: e4 }) => e4));
              e3.length && e3.forEach((({ index: e4 }) => this.setCompleteItem(e4))), this.currentIndex = this.totalSteps, this.setCurrentNavItem(), this.hideAllContentItems();
              const n2 = this.navItems.find((({ index: e4 }) => e4 === this.currentIndex));
              (n2 ? n2.el : null).classList.remove("active"), i3.style.display = "block", this.backBtn && (this.backBtn.style.display = "none"), this.nextBtn && (this.nextBtn.style.display = "none"), this.skipBtn && (this.skipBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"), this.finishBtn && (this.finishBtn.style.display = "none"), this.resetBtn && (this.resetBtn.style.display = ""), t3.length <= 1 && (this.isCompleted = true, this.setCompleted()), this.fireEvent("finish", this.currentIndex), (0, s.dispatch)("finish.hs.stepper", this.el, this.currentIndex);
            }
            buildResetButton() {
              this.resetBtn && (this.onResetBtnClickListener = () => this.resetBtnClick(), this.resetBtn.addEventListener("click", this.onResetBtnClickListener));
            }
            handleResetButtonClick() {
              this.backBtn && (this.backBtn.style.display = ""), this.nextBtn && (this.nextBtn.style.display = ""), this.completeStepBtn && (this.completeStepBtn.style.display = "", this.completeStepBtn.innerText = this.completeStepBtnDefaultText, this.completeStepBtn.removeAttribute("disabled"), this.completeStepBtn.classList.remove("disabled")), this.resetBtn && (this.resetBtn.style.display = "none"), this.navItems.forEach(((e3) => {
                const { el: t3 } = e3;
                e3.isSkip = false, e3.isCompleted = false, this.unsetCurrentNavItemActions(t3), t3.classList.remove("success", "skipped");
              })), this.contentItems.forEach(((e3) => {
                const { el: t3 } = e3;
                e3.isSkip = false, e3.isCompleted = false, this.unsetCurrentContentItemActions(t3), t3.classList.remove("success", "skipped");
              })), this.currentIndex = 1, this.unsetCompleted(), this.isCompleted = false, this.showSkipButton(), this.setCurrentNavItem(), this.setCurrentContentItem(), this.showFinishButton(), this.showCompleteStepButton(), this.checkForTheFirstStep(), this.fireEvent("reset", this.currentIndex), (0, s.dispatch)("reset.hs.stepper", this.el, this.currentIndex);
            }
            setProcessedNavItem(e3) {
              const t3 = this.getNavItem(e3);
              t3 && this.setProcessedNavItemActions(t3);
            }
            unsetProcessedNavItem(e3) {
              const t3 = this.getNavItem(e3);
              t3 && this.unsetProcessedNavItemActions(t3);
            }
            goToNext() {
              "linear" === this.mode && this.setCompleteItem(), this.handleNextButtonClick("linear" !== this.mode), "linear" === this.mode && this.currentIndex === this.totalSteps && (this.nextBtn && (this.nextBtn.style.display = "none"), this.completeStepBtn && (this.completeStepBtn.style.display = "none"));
            }
            goToFinish() {
              this.handleFinishButtonClick();
            }
            disableButtons() {
              this.backBtn && this.setToDisabled(this.backBtn), this.nextBtn && this.setToDisabled(this.nextBtn);
            }
            enableButtons() {
              this.backBtn && this.setToNonDisabled(this.backBtn), this.nextBtn && this.setToNonDisabled(this.nextBtn);
            }
            setErrorNavItem(e3) {
              const t3 = this.getNavItem(e3);
              t3 && this.setErrorNavItemActions(t3);
            }
            destroy() {
              this.el.classList.remove("completed"), this.el.querySelectorAll("[data-hs-stepper-nav-item]").forEach(((e3) => {
                e3.classList.remove("active", "success", "skipped", "disabled", "error"), "BUTTON" !== e3.tagName && "INPUT" !== e3.tagName || e3.removeAttribute("disabled");
              })), this.el.querySelectorAll("[data-hs-stepper-content-item]").forEach(((e3) => {
                e3.classList.remove("success", "skipped");
              })), this.backBtn && this.backBtn.classList.remove("disabled"), this.nextBtn && this.nextBtn.classList.remove("disabled"), this.completeStepBtn && this.completeStepBtn.classList.remove("disabled"), this.backBtn && (this.backBtn.style.display = ""), this.nextBtn && (this.nextBtn.style.display = ""), this.skipBtn && (this.skipBtn.style.display = ""), this.finishBtn && (this.finishBtn.style.display = "none"), this.resetBtn && (this.resetBtn.style.display = "none"), this.onNavItemClickListener.length && this.onNavItemClickListener.forEach((({ el: e3, fn: t3 }) => {
                e3.removeEventListener("click", t3);
              })), this.backBtn && this.backBtn.removeEventListener("click", this.onBackClickListener), this.nextBtn && this.nextBtn.removeEventListener("click", this.onNextClickListener), this.skipBtn && this.skipBtn.removeEventListener("click", this.onSkipClickListener), this.completeStepBtn && this.completeStepBtn.removeEventListener("click", this.onCompleteStepBtnClickListener), this.finishBtn && this.finishBtn.removeEventListener("click", this.onFinishBtnClickListener), this.resetBtn && this.resetBtn.removeEventListener("click", this.onResetBtnClickListener), window.$hsStepperCollection = window.$hsStepperCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsStepperCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              window.$hsStepperCollection || (window.$hsStepperCollection = []), window.$hsStepperCollection && (window.$hsStepperCollection = window.$hsStepperCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-stepper]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsStepperCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSStepper = l), t2.default = l;
        }, 891: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = i2(949), l = n(i2(961)), a = n(i2(248)), r = i2(223);
          class d extends l.default {
            constructor(e3, t3, i3) {
              super(e3, t3, i3), this.longPressTimer = null, this.openedViaKeyboard = false, this.onTouchStartListener = null, this.onTouchEndListener = null, this.toggle = this.el.querySelector(":scope > .hs-dropdown-toggle") || this.el.querySelector(":scope > .hs-dropdown-toggle-wrapper > .hs-dropdown-toggle") || this.el.children[0], this.closers = Array.from(this.el.querySelectorAll(":scope .hs-dropdown-close")) || null, this.menu = this.el.querySelector(":scope > .hs-dropdown-menu"), this.eventMode = (0, s.getClassProperty)(this.el, "--trigger", "click"), this.closeMode = (0, s.getClassProperty)(this.el, "--auto-close", "true"), this.hasAutofocus = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--has-autofocus", "true") || "true"), this.autofocusOnKeyboardOnly = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--autofocus-on-keyboard-only", "true") || "true"), this.animationInProcess = false, this.onCloserClickListener = [], this.toggle && this.menu && this.init();
            }
            elementMouseEnter() {
              this.onMouseEnterHandler();
            }
            elementMouseLeave() {
              this.onMouseLeaveHandler();
            }
            toggleClick(e3) {
              this.onClickHandler(e3);
            }
            toggleContextMenu(e3) {
              e3.preventDefault(), this.onContextMenuHandler(e3);
            }
            handleTouchStart(e3) {
              this.longPressTimer = window.setTimeout((() => {
                e3.preventDefault();
                const t3 = e3.touches[0], i3 = new MouseEvent("contextmenu", { bubbles: true, cancelable: true, view: window, clientX: t3.clientX, clientY: t3.clientY });
                this.toggle && this.toggle.dispatchEvent(i3);
              }), 400);
            }
            handleTouchEnd(e3) {
              this.longPressTimer && (clearTimeout(this.longPressTimer), this.longPressTimer = null);
            }
            closerClick() {
              this.close();
            }
            init() {
              if (this.createCollection(window.$hsDropdownCollection, this), this.toggle.disabled) return false;
              this.toggle && this.buildToggle(), this.menu && this.buildMenu(), this.closers && this.buildClosers(), (0, s.isIOS)() || (0, s.isIpadOS)() || (this.onElementMouseEnterListener = () => this.elementMouseEnter(), this.onElementMouseLeaveListener = () => this.elementMouseLeave(), this.el.addEventListener("mouseenter", this.onElementMouseEnterListener), this.el.addEventListener("mouseleave", this.onElementMouseLeaveListener)), "undefined" != typeof window && (window.HSAccessibilityObserver || (window.HSAccessibilityObserver = new a.default()), this.setupAccessibility());
            }
            resizeHandler() {
              this.eventMode = (0, s.getClassProperty)(this.el, "--trigger", "click"), this.closeMode = (0, s.getClassProperty)(this.el, "--auto-close", "true"), this.hasAutofocus = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--has-autofocus", "true") || "true"), this.autofocusOnKeyboardOnly = (0, s.stringToBoolean)((0, s.getClassProperty)(this.el, "--autofocus-on-keyboard-only", "true") || "true");
            }
            isOpen() {
              return this.el.classList.contains("open") && !this.menu.classList.contains("hidden");
            }
            buildToggle() {
              var e3;
              (null === (e3 = null == this ? void 0 : this.toggle) || void 0 === e3 ? void 0 : e3.ariaExpanded) && (this.el.classList.contains("open") ? this.toggle.ariaExpanded = "true" : this.toggle.ariaExpanded = "false"), "contextmenu" === this.eventMode ? (this.onToggleContextMenuListener = (e4) => this.toggleContextMenu(e4), this.onTouchStartListener = this.handleTouchStart.bind(this), this.onTouchEndListener = this.handleTouchEnd.bind(this), this.toggle.addEventListener("contextmenu", this.onToggleContextMenuListener), this.toggle.addEventListener("touchstart", this.onTouchStartListener, { passive: false }), this.toggle.addEventListener("touchend", this.onTouchEndListener), this.toggle.addEventListener("touchmove", this.onTouchEndListener)) : (this.onToggleClickListener = (e4) => this.toggleClick(e4), this.toggle.addEventListener("click", this.onToggleClickListener));
            }
            buildMenu() {
              this.menu.role = this.menu.getAttribute("role") || "menu", this.menu.tabIndex = -1;
              const e3 = this.menu.querySelectorAll('[role="menuitemcheckbox"]'), t3 = this.menu.querySelectorAll('[role="menuitemradio"]');
              e3.forEach(((e4) => e4.addEventListener("click", (() => this.selectCheckbox(e4))))), t3.forEach(((e4) => e4.addEventListener("click", (() => this.selectRadio(e4))))), this.menu.addEventListener("click", ((e4) => {
                const t4 = e4.target;
                "INPUT" === t4.tagName || "TEXTAREA" === t4.tagName || "SELECT" === t4.tagName || "BUTTON" === t4.tagName || "A" === t4.tagName || t4.closest("button") || t4.closest("a") || t4.closest("input") || t4.closest("textarea") || t4.closest("select") || this.menu.focus();
              }));
            }
            buildClosers() {
              this.closers.forEach(((e3) => {
                this.onCloserClickListener.push({ el: e3, fn: () => this.closerClick() }), e3.addEventListener("click", this.onCloserClickListener.find(((t3) => t3.el === e3)).fn);
              }));
            }
            getScrollbarSize() {
              let e3 = document.createElement("div");
              e3.style.overflow = "scroll", e3.style.width = "100px", e3.style.height = "100px", document.body.appendChild(e3);
              let t3 = e3.offsetWidth - e3.clientWidth;
              return document.body.removeChild(e3), t3;
            }
            onContextMenuHandler(e3) {
              const t3 = { getBoundingClientRect: (() => new DOMRect(), () => new DOMRect(e3.clientX, e3.clientY, 0, 0)) };
              d.closeCurrentlyOpened(), this.el.classList.contains("open") && !this.menu.classList.contains("hidden") ? (this.close(), document.body.style.overflow = "", document.body.style.paddingRight = "") : (document.body.style.overflow = "hidden", document.body.style.paddingRight = `${this.getScrollbarSize()}px`, this.open(t3));
            }
            onClickHandler(e3) {
              var t3;
              if ("hover" === this.eventMode && window.matchMedia("(hover: hover)").matches && "mouse" === e3.pointerType) {
                const i3 = e3.currentTarget;
                return "A" === i3.tagName && i3.hasAttribute("href") && "#" !== i3.getAttribute("href") || (e3.preventDefault(), e3.stopPropagation(), null === (t3 = e3.stopImmediatePropagation) || void 0 === t3 || t3.call(e3)), false;
              }
              this.el.classList.contains("open") && !this.menu.classList.contains("hidden") ? this.close() : this.open();
            }
            onMouseEnterHandler() {
              if ("hover" !== this.eventMode) return false;
              (!this.el._floatingUI || this.el._floatingUI && !this.el.classList.contains("open")) && this.forceClearState(), !this.el.classList.contains("open") && this.menu.classList.contains("hidden") && this.open();
            }
            onMouseLeaveHandler() {
              if ("hover" !== this.eventMode) return false;
              this.el.classList.contains("open") && !this.menu.classList.contains("hidden") && this.close();
            }
            destroyFloatingUI() {
              const e3 = (window.getComputedStyle(this.el).getPropertyValue("--scope") || "").trim();
              this.menu.classList.remove("block"), this.menu.classList.add("hidden"), this.menu.style.inset = null, this.menu.style.position = null, this.el && this.el._floatingUI && (this.el._floatingUI.destroy(), this.el._floatingUI = null), "window" === e3 && this.el.appendChild(this.menu), this.animationInProcess = false;
            }
            focusElement() {
              const e3 = this.menu.querySelector("[autofocus]");
              if (e3) return e3.focus(), true;
              const t3 = this.menu.querySelectorAll('a:not([hidden]), button:not([hidden]), [role="menuitem"]:not([hidden])');
              if (t3.length > 0) {
                return t3[0].focus(), true;
              }
              return false;
            }
            setupFloatingUI(e3) {
              const t3 = e3 || this.el, i3 = window.getComputedStyle(this.el), n2 = (i3.getPropertyValue("--placement") || "").trim(), s2 = (i3.getPropertyValue("--flip") || "true").trim(), l2 = (i3.getPropertyValue("--strategy") || "fixed").trim(), a2 = (i3.getPropertyValue("--offset") || "10").trim(), d2 = (i3.getPropertyValue("--gpu-acceleration") || "true").trim(), c = (window.getComputedStyle(this.el).getPropertyValue("--adaptive") || "adaptive").replace(" ", ""), h = l2, u = parseInt(a2, 10), p = r.POSITIONS[n2] || "bottom-start", m = [..."true" === s2 ? [(0, o.flip)()] : [], (0, o.offset)(u)], g = { placement: p, strategy: h, middleware: m }, v = (e4) => {
                const t4 = this.menu.getBoundingClientRect(), i4 = window.innerWidth - (window.innerWidth - document.documentElement.clientWidth);
                return e4 + t4.width > i4 && (e4 = i4 - t4.width), e4 < 0 && (e4 = 0), e4;
              }, f = () => {
                (0, o.computePosition)(t3, this.menu, g).then((({ x: e4, y: t4, placement: i4 }) => {
                  const n3 = v(e4);
                  "absolute" === h && "none" === c ? Object.assign(this.menu.style, { position: h, margin: "0" }) : "absolute" === h ? Object.assign(this.menu.style, { position: h, transform: `translate3d(${e4}px, ${t4}px, 0px)`, margin: "0" }) : "true" === d2 ? Object.assign(this.menu.style, { position: h, left: "", top: "", inset: "0px auto auto 0px", margin: "0", transform: `translate3d(${"adaptive" === c ? n3 : 0}px, ${t4}px, 0)` }) : Object.assign(this.menu.style, { position: h, left: `${e4}px`, top: `${t4}px`, transform: "" }), this.menu.setAttribute("data-placement", i4);
                }));
              };
              f();
              return { update: f, destroy: (0, o.autoUpdate)(t3, this.menu, f) };
            }
            selectCheckbox(e3) {
              e3.ariaChecked = "true" === e3.ariaChecked ? "false" : "true";
            }
            selectRadio(e3) {
              if ("true" === e3.ariaChecked) return false;
              const t3 = e3.closest(".group").querySelectorAll('[role="menuitemradio"]');
              Array.from(t3).filter(((t4) => t4 !== e3)).forEach(((e4) => {
                e4.ariaChecked = "false";
              })), e3.ariaChecked = "true";
            }
            calculatePopperPosition(e3) {
              const t3 = this.setupFloatingUI(e3), i3 = this.menu.getAttribute("data-placement");
              return t3.update(), t3.destroy(), i3;
            }
            open(e3, t3 = false) {
              if (this.el.classList.contains("open") || this.animationInProcess) return false;
              this.openedViaKeyboard = t3, this.animationInProcess = true, this.menu.style.cssText = "";
              const i3 = e3 || this.el, n2 = window.getComputedStyle(this.el), o2 = (n2.getPropertyValue("--scope") || "").trim(), l2 = (n2.getPropertyValue("--strategy") || "fixed").trim();
              "window" === o2 && document.body.appendChild(this.menu), "static" !== l2 && (this.el._floatingUI = this.setupFloatingUI(i3)), this.menu.style.margin = null, this.menu.classList.remove("hidden"), this.menu.classList.add("block"), setTimeout((() => {
                var e4;
                (null === (e4 = null == this ? void 0 : this.toggle) || void 0 === e4 ? void 0 : e4.ariaExpanded) && (this.toggle.ariaExpanded = "true"), this.el.classList.add("open"), window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, true), "window" === o2 && this.menu.classList.add("open"), this.animationInProcess = false, !this.hasAutofocus || this.autofocusOnKeyboardOnly && !this.openedViaKeyboard || this.focusElement(), this.fireEvent("open", this.el), (0, s.dispatch)("open.hs.dropdown", this.el, this.el);
              }));
            }
            close(e3 = true) {
              if (this.animationInProcess || !this.el.classList.contains("open")) return false;
              const t3 = (window.getComputedStyle(this.el).getPropertyValue("--scope") || "").trim();
              if (this.animationInProcess = true, "window" === t3 && this.menu.classList.remove("open"), window.HSAccessibilityObserver && this.accessibilityComponent && window.HSAccessibilityObserver.updateComponentState(this.accessibilityComponent, false), e3) {
                const e4 = this.el.querySelector("[data-hs-dropdown-transition]") || this.menu;
                let t4 = false;
                const i3 = () => {
                  t4 || (t4 = true, this.destroyFloatingUI());
                };
                (0, s.afterTransition)(e4, i3);
                const n2 = window.getComputedStyle(e4).getPropertyValue("transition-duration"), o2 = 1e3 * parseFloat(n2) || 150;
                setTimeout(i3, o2 + 50);
              } else this.destroyFloatingUI();
              (() => {
                var e4;
                this.menu.style.margin = null, (null === (e4 = null == this ? void 0 : this.toggle) || void 0 === e4 ? void 0 : e4.ariaExpanded) && (this.toggle.ariaExpanded = "false"), this.el.classList.remove("open"), this.openedViaKeyboard = false, this.fireEvent("close", this.el), (0, s.dispatch)("close.hs.dropdown", this.el, this.el);
              })();
            }
            forceClearState() {
              this.destroyFloatingUI(), this.menu.style.margin = null, this.el.classList.remove("open"), this.menu.classList.add("hidden"), this.openedViaKeyboard = false;
            }
            destroy() {
              (0, s.isIOS)() || (0, s.isIpadOS)() || (this.el.removeEventListener("mouseenter", this.onElementMouseEnterListener), this.el.removeEventListener("mouseleave", (() => this.onElementMouseLeaveListener)), this.onElementMouseEnterListener = null, this.onElementMouseLeaveListener = null), "contextmenu" === this.eventMode ? (this.toggle && (this.toggle.removeEventListener("contextmenu", this.onToggleContextMenuListener), this.toggle.removeEventListener("touchstart", this.onTouchStartListener), this.toggle.removeEventListener("touchend", this.onTouchEndListener), this.toggle.removeEventListener("touchmove", this.onTouchEndListener)), this.onToggleContextMenuListener = null, this.onTouchStartListener = null, this.onTouchEndListener = null) : (this.toggle && this.toggle.removeEventListener("click", this.onToggleClickListener), this.onToggleClickListener = null), this.closers.length && (this.closers.forEach(((e3) => {
                e3.removeEventListener("click", this.onCloserClickListener.find(((t3) => t3.el === e3)).fn);
              })), this.onCloserClickListener = null), this.el.classList.remove("open"), this.destroyFloatingUI(), window.$hsDropdownCollection = window.$hsDropdownCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static findInCollection(e3) {
              return window.$hsDropdownCollection.find(((t3) => e3 instanceof d ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsDropdownCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element : null;
            }
            static autoInit() {
              if (!window.$hsDropdownCollection) {
                window.$hsDropdownCollection = [], window.addEventListener("click", ((e4) => {
                  const t3 = e4.target;
                  d.closeCurrentlyOpened(t3);
                }));
                let e3 = window.innerWidth;
                window.addEventListener("resize", (() => {
                  window.innerWidth !== e3 && (e3 = innerWidth, d.closeCurrentlyOpened(null, false));
                }));
              }
              window.$hsDropdownCollection && (window.$hsDropdownCollection = window.$hsDropdownCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll(".hs-dropdown:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsDropdownCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new d(e3);
              }));
            }
            static open(e3, t3 = false) {
              const i3 = d.findInCollection(e3);
              i3 && i3.element.menu.classList.contains("hidden") && i3.element.open(void 0, t3);
            }
            static close(e3) {
              const t3 = d.findInCollection(e3);
              t3 && !t3.element.menu.classList.contains("hidden") && t3.element.close();
            }
            static closeCurrentlyOpened(e3 = null, t3 = true) {
              const i3 = e3 && e3.closest(".hs-dropdown") && e3.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") ? e3.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") : null;
              let n2 = i3 ? window.$hsDropdownCollection.filter(((e4) => e4.element.el.classList.contains("open") && e4.element.menu.closest(".hs-dropdown").parentElement.closest(".hs-dropdown") === i3)) : window.$hsDropdownCollection.filter(((e4) => e4.element.el.classList.contains("open")));
              if (e3) {
                const t4 = e3.closest(".hs-dropdown");
                if (t4) "inside" === (0, s.getClassPropertyAlt)(t4, "--auto-close") && (n2 = n2.filter(((e4) => e4.element.el !== t4)));
                else {
                  const t5 = e3.closest(".hs-dropdown-menu");
                  if (t5) {
                    const e4 = window.$hsDropdownCollection.find(((e5) => e5.element.menu === t5));
                    e4 && "inside" === (0, s.getClassPropertyAlt)(e4.element.el, "--auto-close") && (n2 = n2.filter(((t6) => t6.element.el !== e4.element.el)));
                  }
                }
              }
              n2 && n2.forEach(((e4) => {
                if ("false" === e4.element.closeMode || "outside" === e4.element.closeMode) return false;
                e4.element.close(t3);
              })), n2 && n2.forEach(((e4) => {
                if ("contextmenu" !== (0, s.getClassPropertyAlt)(e4.element.el, "--trigger")) return false;
                document.body.style.overflow = "", document.body.style.paddingRight = "";
              }));
            }
            setupAccessibility() {
              this.accessibilityComponent = window.HSAccessibilityObserver.registerComponent(this.el, { onEnter: () => {
                var e3;
                const t3 = document.activeElement;
                if (!t3) return;
                if (t3.closest(".hs-dropdown-menu")) {
                  const i3 = t3.closest(".hs-dropdown-toggle, [data-hs-dropdown-toggle]");
                  if (i3) return void i3.click();
                  const n2 = t3.closest('[role="menuitem"], a, button, [data-hs-dropdown-item]');
                  if ((null === (e3 = null == n2 ? void 0 : n2.children) || void 0 === e3 ? void 0 : e3.length) > 0) return Array.from(n2.children).forEach(((e4) => {
                    e4.matches("input[type='checkbox']:not([hidden]), input[type='radio']:not([hidden])") && e4.click();
                  })), void n2.focus();
                  if (n2) {
                    if (t3.matches("input, textarea, select")) return;
                    n2.click();
                  }
                } else this.isOpened() ? this.close() : this.open(void 0, true);
              }, onSpace: () => {
                this.isOpened() || this.open(void 0, true);
              }, onEsc: () => {
                this.isOpened() && (this.close(), this.toggle && this.toggle.focus());
              }, onArrow: (e3) => {
                if (!e3.metaKey) switch (e3.key) {
                  case "ArrowDown":
                    this.isOpened() ? this.focusMenuItem("next") : this.open(void 0, true);
                    break;
                  case "ArrowUp":
                    this.isOpened() && this.focusMenuItem("prev");
                    break;
                  case "ArrowRight":
                    this.onArrowX(e3, "right");
                    break;
                  case "ArrowLeft":
                    this.onArrowX(e3, "left");
                }
              }, onHome: () => {
                this.isOpened() && this.onStartEnd(true);
              }, onEnd: () => {
                this.isOpened() && this.onStartEnd(false);
              }, onTab: () => {
                setTimeout((() => {
                  const e3 = document.activeElement, t3 = e3.closest(".hs-dropdown-menu");
                  if (e3 && t3) {
                    const t4 = e3.closest(".hs-dropdown-toggle, [data-hs-dropdown-toggle]");
                    return t4 ? void t4.click() : void e3.focus();
                  }
                  this.isOpened() && this.close();
                }), 100);
              }, onFirstLetter: (e3) => {
                const t3 = document.activeElement;
                !(null == t3 ? void 0 : t3.matches("input, textarea")) && this.isOpened() && this.onFirstLetter(e3);
              } }, this.isOpened(), "Dropdown", ".hs-dropdown", this.menu, { onFirstLetter: false });
            }
            onFirstLetter(e3) {
              var t3;
              if (!this.isOpened() || !this.menu) return;
              const i3 = this.menu.querySelectorAll('a:not([hidden]), button:not([hidden]), [role="menuitem"]:not([hidden])');
              if (0 === i3.length) return;
              const n2 = Array.from(i3).indexOf(document.activeElement);
              for (let s2 = 1; s2 <= i3.length; s2++) {
                const o2 = (n2 + s2) % i3.length;
                if (((null === (t3 = i3[o2].textContent) || void 0 === t3 ? void 0 : t3.trim().toLowerCase()) || "").startsWith(e3.toLowerCase())) return void i3[o2].focus();
              }
              i3[0].focus();
            }
            onArrowX(e3, t3) {
              if (!this.isOpened()) return;
              e3.preventDefault(), e3.stopImmediatePropagation();
              const i3 = this.menu.querySelectorAll('a:not([hidden]), button:not([hidden]), [role="menuitem"]:not([hidden])');
              if (!i3.length) return;
              const n2 = Array.from(i3).indexOf(document.activeElement);
              let s2 = -1;
              s2 = "right" === t3 ? (n2 + 1) % i3.length : n2 > 0 ? n2 - 1 : i3.length - 1, i3[s2].focus();
            }
            onStartEnd(e3 = true) {
              if (!this.isOpened()) return;
              const t3 = this.menu.querySelectorAll('a:not([hidden]), button:not([hidden]), [role="menuitem"]:not([hidden])');
              if (!t3.length) return;
              t3[e3 ? 0 : t3.length - 1].focus();
            }
            focusMenuItem(e3) {
              const t3 = this.menu.querySelectorAll('a:not([hidden]), button:not([hidden]), [role="menuitem"]:not([hidden])');
              if (!t3.length) return;
              const i3 = Array.from(t3).indexOf(document.activeElement);
              t3["next" === e3 ? (i3 + 1) % t3.length : (i3 - 1 + t3.length) % t3.length].focus();
            }
            static on(e3, t3, i3) {
              const n2 = d.findInCollection(t3);
              n2 && (n2.element.events[e3] = i3);
            }
            isOpened() {
              return this.isOpen();
            }
            containsElement(e3) {
              return this.el.contains(e3);
            }
          }
          window.addEventListener("load", (() => {
            d.autoInit();
          })), window.addEventListener("resize", (() => {
            window.$hsDropdownCollection || (window.$hsDropdownCollection = []), window.$hsDropdownCollection.forEach(((e3) => e3.element.resizeHandler()));
          })), "undefined" != typeof window && (window.HSDropdown = d), t2.default = d;
        }, 911: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const s = i2(292), o = n(i2(961));
          class l extends o.default {
            constructor(e3, t3) {
              super(e3, t3);
              const i3 = e3.getAttribute("data-hs-remove-element-options"), n2 = i3 ? JSON.parse(i3) : {}, s2 = Object.assign(Object.assign({}, n2), t3);
              this.removeTargetId = this.el.getAttribute("data-hs-remove-element"), this.removeTarget = document.querySelector(this.removeTargetId), this.removeTargetAnimationClass = (null == s2 ? void 0 : s2.removeTargetAnimationClass) || "hs-removing", this.removeTarget && this.init();
            }
            elementClick() {
              this.remove();
            }
            init() {
              this.createCollection(window.$hsRemoveElementCollection, this), this.onElementClickListener = () => this.elementClick(), this.el.addEventListener("click", this.onElementClickListener);
            }
            remove() {
              if (!this.removeTarget) return false;
              this.removeTarget.classList.add(this.removeTargetAnimationClass), (0, s.afterTransition)(this.removeTarget, (() => setTimeout((() => this.removeTarget.remove()))));
            }
            destroy() {
              this.removeTarget.classList.remove(this.removeTargetAnimationClass), this.el.removeEventListener("click", this.onElementClickListener), window.$hsRemoveElementCollection = window.$hsRemoveElementCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static getInstance(e3, t3) {
              const i3 = window.$hsRemoveElementCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3) || t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsRemoveElementCollection || (window.$hsRemoveElementCollection = []), window.$hsRemoveElementCollection && (window.$hsRemoveElementCollection = window.$hsRemoveElementCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll("[data-hs-remove-element]:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsRemoveElementCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new l(e3);
              }));
            }
          }
          window.addEventListener("load", (() => {
            l.autoInit();
          })), "undefined" != typeof window && (window.HSRemoveElement = l), t2.default = l;
        }, 949: (e2, t2, i2) => {
          "use strict";
          i2.r(t2), i2.d(t2, { arrow: () => Ce, autoPlacement: () => ve, autoUpdate: () => pe, computePosition: () => Le, detectOverflow: () => me, flip: () => ye, getOverflowAncestors: () => Q, hide: () => we, inline: () => Se, limitShift: () => xe, offset: () => ge, platform: () => he, shift: () => fe, size: () => be });
          const n = ["top", "right", "bottom", "left"], s = ["start", "end"], o = n.reduce(((e3, t3) => e3.concat(t3, t3 + "-" + s[0], t3 + "-" + s[1])), []), l = Math.min, a = Math.max, r = Math.round, d = Math.floor, c = (e3) => ({ x: e3, y: e3 }), h = { left: "right", right: "left", bottom: "top", top: "bottom" }, u = { start: "end", end: "start" };
          function p(e3, t3, i3) {
            return a(e3, l(t3, i3));
          }
          function m(e3, t3) {
            return "function" == typeof e3 ? e3(t3) : e3;
          }
          function g(e3) {
            return e3.split("-")[0];
          }
          function v(e3) {
            return e3.split("-")[1];
          }
          function f(e3) {
            return "x" === e3 ? "y" : "x";
          }
          function y(e3) {
            return "y" === e3 ? "height" : "width";
          }
          function b(e3) {
            return ["top", "bottom"].includes(g(e3)) ? "y" : "x";
          }
          function w(e3) {
            return f(b(e3));
          }
          function C(e3, t3, i3) {
            void 0 === i3 && (i3 = false);
            const n2 = v(e3), s2 = w(e3), o2 = y(s2);
            let l2 = "x" === s2 ? n2 === (i3 ? "end" : "start") ? "right" : "left" : "start" === n2 ? "bottom" : "top";
            return t3.reference[o2] > t3.floating[o2] && (l2 = x(l2)), [l2, x(l2)];
          }
          function S(e3) {
            return e3.replace(/start|end/g, ((e4) => u[e4]));
          }
          function x(e3) {
            return e3.replace(/left|right|bottom|top/g, ((e4) => h[e4]));
          }
          function L(e3) {
            return "number" != typeof e3 ? (function(e4) {
              return { top: 0, right: 0, bottom: 0, left: 0, ...e4 };
            })(e3) : { top: e3, right: e3, bottom: e3, left: e3 };
          }
          function T(e3) {
            const { x: t3, y: i3, width: n2, height: s2 } = e3;
            return { width: n2, height: s2, top: i3, left: t3, right: t3 + n2, bottom: i3 + s2, x: t3, y: i3 };
          }
          function E(e3, t3, i3) {
            let { reference: n2, floating: s2 } = e3;
            const o2 = b(t3), l2 = w(t3), a2 = y(l2), r2 = g(t3), d2 = "y" === o2, c2 = n2.x + n2.width / 2 - s2.width / 2, h2 = n2.y + n2.height / 2 - s2.height / 2, u2 = n2[a2] / 2 - s2[a2] / 2;
            let p2;
            switch (r2) {
              case "top":
                p2 = { x: c2, y: n2.y - s2.height };
                break;
              case "bottom":
                p2 = { x: c2, y: n2.y + n2.height };
                break;
              case "right":
                p2 = { x: n2.x + n2.width, y: h2 };
                break;
              case "left":
                p2 = { x: n2.x - s2.width, y: h2 };
                break;
              default:
                p2 = { x: n2.x, y: n2.y };
            }
            switch (v(t3)) {
              case "start":
                p2[l2] -= u2 * (i3 && d2 ? -1 : 1);
                break;
              case "end":
                p2[l2] += u2 * (i3 && d2 ? -1 : 1);
            }
            return p2;
          }
          async function k(e3, t3) {
            var i3;
            void 0 === t3 && (t3 = {});
            const { x: n2, y: s2, platform: o2, rects: l2, elements: a2, strategy: r2 } = e3, { boundary: d2 = "clippingAncestors", rootBoundary: c2 = "viewport", elementContext: h2 = "floating", altBoundary: u2 = false, padding: p2 = 0 } = m(t3, e3), g2 = L(p2), v2 = a2[u2 ? "floating" === h2 ? "reference" : "floating" : h2], f2 = T(await o2.getClippingRect({ element: null == (i3 = await (null == o2.isElement ? void 0 : o2.isElement(v2))) || i3 ? v2 : v2.contextElement || await (null == o2.getDocumentElement ? void 0 : o2.getDocumentElement(a2.floating)), boundary: d2, rootBoundary: c2, strategy: r2 })), y2 = "floating" === h2 ? { x: n2, y: s2, width: l2.floating.width, height: l2.floating.height } : l2.reference, b2 = await (null == o2.getOffsetParent ? void 0 : o2.getOffsetParent(a2.floating)), w2 = await (null == o2.isElement ? void 0 : o2.isElement(b2)) && await (null == o2.getScale ? void 0 : o2.getScale(b2)) || { x: 1, y: 1 }, C2 = T(o2.convertOffsetParentRelativeRectToViewportRelativeRect ? await o2.convertOffsetParentRelativeRectToViewportRelativeRect({ elements: a2, rect: y2, offsetParent: b2, strategy: r2 }) : y2);
            return { top: (f2.top - C2.top + g2.top) / w2.y, bottom: (C2.bottom - f2.bottom + g2.bottom) / w2.y, left: (f2.left - C2.left + g2.left) / w2.x, right: (C2.right - f2.right + g2.right) / w2.x };
          }
          function I(e3, t3) {
            return { top: e3.top - t3.height, right: e3.right - t3.width, bottom: e3.bottom - t3.height, left: e3.left - t3.width };
          }
          function A(e3) {
            return n.some(((t3) => e3[t3] >= 0));
          }
          function M(e3) {
            const t3 = l(...e3.map(((e4) => e4.left))), i3 = l(...e3.map(((e4) => e4.top)));
            return { x: t3, y: i3, width: a(...e3.map(((e4) => e4.right))) - t3, height: a(...e3.map(((e4) => e4.bottom))) - i3 };
          }
          function O() {
            return "undefined" != typeof window;
          }
          function D(e3) {
            return H(e3) ? (e3.nodeName || "").toLowerCase() : "#document";
          }
          function P(e3) {
            var t3;
            return (null == e3 || null == (t3 = e3.ownerDocument) ? void 0 : t3.defaultView) || window;
          }
          function $(e3) {
            var t3;
            return null == (t3 = (H(e3) ? e3.ownerDocument : e3.document) || window.document) ? void 0 : t3.documentElement;
          }
          function H(e3) {
            return !!O() && (e3 instanceof Node || e3 instanceof P(e3).Node);
          }
          function N(e3) {
            return !!O() && (e3 instanceof Element || e3 instanceof P(e3).Element);
          }
          function B(e3) {
            return !!O() && (e3 instanceof HTMLElement || e3 instanceof P(e3).HTMLElement);
          }
          function q(e3) {
            return !(!O() || "undefined" == typeof ShadowRoot) && (e3 instanceof ShadowRoot || e3 instanceof P(e3).ShadowRoot);
          }
          function F(e3) {
            const { overflow: t3, overflowX: i3, overflowY: n2, display: s2 } = W(e3);
            return /auto|scroll|overlay|hidden|clip/.test(t3 + n2 + i3) && !["inline", "contents"].includes(s2);
          }
          function _2(e3) {
            return ["table", "td", "th"].includes(D(e3));
          }
          function R(e3) {
            return [":popover-open", ":modal"].some(((t3) => {
              try {
                return e3.matches(t3);
              } catch (e4) {
                return false;
              }
            }));
          }
          function V(e3) {
            const t3 = j(), i3 = N(e3) ? W(e3) : e3;
            return ["transform", "translate", "scale", "rotate", "perspective"].some(((e4) => !!i3[e4] && "none" !== i3[e4])) || !!i3.containerType && "normal" !== i3.containerType || !t3 && !!i3.backdropFilter && "none" !== i3.backdropFilter || !t3 && !!i3.filter && "none" !== i3.filter || ["transform", "translate", "scale", "rotate", "perspective", "filter"].some(((e4) => (i3.willChange || "").includes(e4))) || ["paint", "layout", "strict", "content"].some(((e4) => (i3.contain || "").includes(e4)));
          }
          function j() {
            return !("undefined" == typeof CSS || !CSS.supports) && CSS.supports("-webkit-backdrop-filter", "none");
          }
          function z(e3) {
            return ["html", "body", "#document"].includes(D(e3));
          }
          function W(e3) {
            return P(e3).getComputedStyle(e3);
          }
          function U(e3) {
            return N(e3) ? { scrollLeft: e3.scrollLeft, scrollTop: e3.scrollTop } : { scrollLeft: e3.scrollX, scrollTop: e3.scrollY };
          }
          function Y(e3) {
            if ("html" === D(e3)) return e3;
            const t3 = e3.assignedSlot || e3.parentNode || q(e3) && e3.host || $(e3);
            return q(t3) ? t3.host : t3;
          }
          function K(e3) {
            const t3 = Y(e3);
            return z(t3) ? e3.ownerDocument ? e3.ownerDocument.body : e3.body : B(t3) && F(t3) ? t3 : K(t3);
          }
          function Q(e3, t3, i3) {
            var n2;
            void 0 === t3 && (t3 = []), void 0 === i3 && (i3 = true);
            const s2 = K(e3), o2 = s2 === (null == (n2 = e3.ownerDocument) ? void 0 : n2.body), l2 = P(s2);
            if (o2) {
              const e4 = J(l2);
              return t3.concat(l2, l2.visualViewport || [], F(s2) ? s2 : [], e4 && i3 ? Q(e4) : []);
            }
            return t3.concat(s2, Q(s2, [], i3));
          }
          function J(e3) {
            return e3.parent && Object.getPrototypeOf(e3.parent) ? e3.frameElement : null;
          }
          function Z(e3) {
            const t3 = W(e3);
            let i3 = parseFloat(t3.width) || 0, n2 = parseFloat(t3.height) || 0;
            const s2 = B(e3), o2 = s2 ? e3.offsetWidth : i3, l2 = s2 ? e3.offsetHeight : n2, a2 = r(i3) !== o2 || r(n2) !== l2;
            return a2 && (i3 = o2, n2 = l2), { width: i3, height: n2, $: a2 };
          }
          function G(e3) {
            return N(e3) ? e3 : e3.contextElement;
          }
          function X(e3) {
            const t3 = G(e3);
            if (!B(t3)) return c(1);
            const i3 = t3.getBoundingClientRect(), { width: n2, height: s2, $: o2 } = Z(t3);
            let l2 = (o2 ? r(i3.width) : i3.width) / n2, a2 = (o2 ? r(i3.height) : i3.height) / s2;
            return l2 && Number.isFinite(l2) || (l2 = 1), a2 && Number.isFinite(a2) || (a2 = 1), { x: l2, y: a2 };
          }
          const ee = c(0);
          function te(e3) {
            const t3 = P(e3);
            return j() && t3.visualViewport ? { x: t3.visualViewport.offsetLeft, y: t3.visualViewport.offsetTop } : ee;
          }
          function ie(e3, t3, i3, n2) {
            void 0 === t3 && (t3 = false), void 0 === i3 && (i3 = false);
            const s2 = e3.getBoundingClientRect(), o2 = G(e3);
            let l2 = c(1);
            t3 && (n2 ? N(n2) && (l2 = X(n2)) : l2 = X(e3));
            const a2 = (function(e4, t4, i4) {
              return void 0 === t4 && (t4 = false), !(!i4 || t4 && i4 !== P(e4)) && t4;
            })(o2, i3, n2) ? te(o2) : c(0);
            let r2 = (s2.left + a2.x) / l2.x, d2 = (s2.top + a2.y) / l2.y, h2 = s2.width / l2.x, u2 = s2.height / l2.y;
            if (o2) {
              const e4 = P(o2), t4 = n2 && N(n2) ? P(n2) : n2;
              let i4 = e4, s3 = J(i4);
              for (; s3 && n2 && t4 !== i4; ) {
                const e5 = X(s3), t5 = s3.getBoundingClientRect(), n3 = W(s3), o3 = t5.left + (s3.clientLeft + parseFloat(n3.paddingLeft)) * e5.x, l3 = t5.top + (s3.clientTop + parseFloat(n3.paddingTop)) * e5.y;
                r2 *= e5.x, d2 *= e5.y, h2 *= e5.x, u2 *= e5.y, r2 += o3, d2 += l3, i4 = P(s3), s3 = J(i4);
              }
            }
            return T({ width: h2, height: u2, x: r2, y: d2 });
          }
          function ne(e3, t3) {
            const i3 = U(e3).scrollLeft;
            return t3 ? t3.left + i3 : ie($(e3)).left + i3;
          }
          function se(e3, t3, i3) {
            void 0 === i3 && (i3 = false);
            const n2 = e3.getBoundingClientRect();
            return { x: n2.left + t3.scrollLeft - (i3 ? 0 : ne(e3, n2)), y: n2.top + t3.scrollTop };
          }
          function oe(e3, t3, i3) {
            let n2;
            if ("viewport" === t3) n2 = (function(e4, t4) {
              const i4 = P(e4), n3 = $(e4), s2 = i4.visualViewport;
              let o2 = n3.clientWidth, l2 = n3.clientHeight, a2 = 0, r2 = 0;
              if (s2) {
                o2 = s2.width, l2 = s2.height;
                const e5 = j();
                (!e5 || e5 && "fixed" === t4) && (a2 = s2.offsetLeft, r2 = s2.offsetTop);
              }
              return { width: o2, height: l2, x: a2, y: r2 };
            })(e3, i3);
            else if ("document" === t3) n2 = (function(e4) {
              const t4 = $(e4), i4 = U(e4), n3 = e4.ownerDocument.body, s2 = a(t4.scrollWidth, t4.clientWidth, n3.scrollWidth, n3.clientWidth), o2 = a(t4.scrollHeight, t4.clientHeight, n3.scrollHeight, n3.clientHeight);
              let l2 = -i4.scrollLeft + ne(e4);
              const r2 = -i4.scrollTop;
              return "rtl" === W(n3).direction && (l2 += a(t4.clientWidth, n3.clientWidth) - s2), { width: s2, height: o2, x: l2, y: r2 };
            })($(e3));
            else if (N(t3)) n2 = (function(e4, t4) {
              const i4 = ie(e4, true, "fixed" === t4), n3 = i4.top + e4.clientTop, s2 = i4.left + e4.clientLeft, o2 = B(e4) ? X(e4) : c(1);
              return { width: e4.clientWidth * o2.x, height: e4.clientHeight * o2.y, x: s2 * o2.x, y: n3 * o2.y };
            })(t3, i3);
            else {
              const i4 = te(e3);
              n2 = { x: t3.x - i4.x, y: t3.y - i4.y, width: t3.width, height: t3.height };
            }
            return T(n2);
          }
          function le(e3, t3) {
            const i3 = Y(e3);
            return !(i3 === t3 || !N(i3) || z(i3)) && ("fixed" === W(i3).position || le(i3, t3));
          }
          function ae(e3, t3, i3) {
            const n2 = B(t3), s2 = $(t3), o2 = "fixed" === i3, l2 = ie(e3, true, o2, t3);
            let a2 = { scrollLeft: 0, scrollTop: 0 };
            const r2 = c(0);
            if (n2 || !n2 && !o2) if (("body" !== D(t3) || F(s2)) && (a2 = U(t3)), n2) {
              const e4 = ie(t3, true, o2, t3);
              r2.x = e4.x + t3.clientLeft, r2.y = e4.y + t3.clientTop;
            } else s2 && (r2.x = ne(s2));
            const d2 = !s2 || n2 || o2 ? c(0) : se(s2, a2);
            return { x: l2.left + a2.scrollLeft - r2.x - d2.x, y: l2.top + a2.scrollTop - r2.y - d2.y, width: l2.width, height: l2.height };
          }
          function re(e3) {
            return "static" === W(e3).position;
          }
          function de(e3, t3) {
            if (!B(e3) || "fixed" === W(e3).position) return null;
            if (t3) return t3(e3);
            let i3 = e3.offsetParent;
            return $(e3) === i3 && (i3 = i3.ownerDocument.body), i3;
          }
          function ce(e3, t3) {
            const i3 = P(e3);
            if (R(e3)) return i3;
            if (!B(e3)) {
              let t4 = Y(e3);
              for (; t4 && !z(t4); ) {
                if (N(t4) && !re(t4)) return t4;
                t4 = Y(t4);
              }
              return i3;
            }
            let n2 = de(e3, t3);
            for (; n2 && _2(n2) && re(n2); ) n2 = de(n2, t3);
            return n2 && z(n2) && re(n2) && !V(n2) ? i3 : n2 || (function(e4) {
              let t4 = Y(e4);
              for (; B(t4) && !z(t4); ) {
                if (V(t4)) return t4;
                if (R(t4)) return null;
                t4 = Y(t4);
              }
              return null;
            })(e3) || i3;
          }
          const he = { convertOffsetParentRelativeRectToViewportRelativeRect: function(e3) {
            let { elements: t3, rect: i3, offsetParent: n2, strategy: s2 } = e3;
            const o2 = "fixed" === s2, l2 = $(n2), a2 = !!t3 && R(t3.floating);
            if (n2 === l2 || a2 && o2) return i3;
            let r2 = { scrollLeft: 0, scrollTop: 0 }, d2 = c(1);
            const h2 = c(0), u2 = B(n2);
            if ((u2 || !u2 && !o2) && (("body" !== D(n2) || F(l2)) && (r2 = U(n2)), B(n2))) {
              const e4 = ie(n2);
              d2 = X(n2), h2.x = e4.x + n2.clientLeft, h2.y = e4.y + n2.clientTop;
            }
            const p2 = !l2 || u2 || o2 ? c(0) : se(l2, r2, true);
            return { width: i3.width * d2.x, height: i3.height * d2.y, x: i3.x * d2.x - r2.scrollLeft * d2.x + h2.x + p2.x, y: i3.y * d2.y - r2.scrollTop * d2.y + h2.y + p2.y };
          }, getDocumentElement: $, getClippingRect: function(e3) {
            let { element: t3, boundary: i3, rootBoundary: n2, strategy: s2 } = e3;
            const o2 = [..."clippingAncestors" === i3 ? R(t3) ? [] : (function(e4, t4) {
              const i4 = t4.get(e4);
              if (i4) return i4;
              let n3 = Q(e4, [], false).filter(((e5) => N(e5) && "body" !== D(e5))), s3 = null;
              const o3 = "fixed" === W(e4).position;
              let l2 = o3 ? Y(e4) : e4;
              for (; N(l2) && !z(l2); ) {
                const t5 = W(l2), i5 = V(l2);
                i5 || "fixed" !== t5.position || (s3 = null), (o3 ? !i5 && !s3 : !i5 && "static" === t5.position && s3 && ["absolute", "fixed"].includes(s3.position) || F(l2) && !i5 && le(e4, l2)) ? n3 = n3.filter(((e5) => e5 !== l2)) : s3 = t5, l2 = Y(l2);
              }
              return t4.set(e4, n3), n3;
            })(t3, this._c) : [].concat(i3), n2], r2 = o2[0], d2 = o2.reduce(((e4, i4) => {
              const n3 = oe(t3, i4, s2);
              return e4.top = a(n3.top, e4.top), e4.right = l(n3.right, e4.right), e4.bottom = l(n3.bottom, e4.bottom), e4.left = a(n3.left, e4.left), e4;
            }), oe(t3, r2, s2));
            return { width: d2.right - d2.left, height: d2.bottom - d2.top, x: d2.left, y: d2.top };
          }, getOffsetParent: ce, getElementRects: async function(e3) {
            const t3 = this.getOffsetParent || ce, i3 = this.getDimensions, n2 = await i3(e3.floating);
            return { reference: ae(e3.reference, await t3(e3.floating), e3.strategy), floating: { x: 0, y: 0, width: n2.width, height: n2.height } };
          }, getClientRects: function(e3) {
            return Array.from(e3.getClientRects());
          }, getDimensions: function(e3) {
            const { width: t3, height: i3 } = Z(e3);
            return { width: t3, height: i3 };
          }, getScale: X, isElement: N, isRTL: function(e3) {
            return "rtl" === W(e3).direction;
          } };
          function ue(e3, t3) {
            return e3.x === t3.x && e3.y === t3.y && e3.width === t3.width && e3.height === t3.height;
          }
          function pe(e3, t3, i3, n2) {
            void 0 === n2 && (n2 = {});
            const { ancestorScroll: s2 = true, ancestorResize: o2 = true, elementResize: r2 = "function" == typeof ResizeObserver, layoutShift: c2 = "function" == typeof IntersectionObserver, animationFrame: h2 = false } = n2, u2 = G(e3), p2 = s2 || o2 ? [...u2 ? Q(u2) : [], ...Q(t3)] : [];
            p2.forEach(((e4) => {
              s2 && e4.addEventListener("scroll", i3, { passive: true }), o2 && e4.addEventListener("resize", i3);
            }));
            const m2 = u2 && c2 ? (function(e4, t4) {
              let i4, n3 = null;
              const s3 = $(e4);
              function o3() {
                var e5;
                clearTimeout(i4), null == (e5 = n3) || e5.disconnect(), n3 = null;
              }
              return (function r3(c3, h3) {
                void 0 === c3 && (c3 = false), void 0 === h3 && (h3 = 1), o3();
                const u3 = e4.getBoundingClientRect(), { left: p3, top: m3, width: g3, height: v3 } = u3;
                if (c3 || t4(), !g3 || !v3) return;
                const f3 = { rootMargin: -d(m3) + "px " + -d(s3.clientWidth - (p3 + g3)) + "px " + -d(s3.clientHeight - (m3 + v3)) + "px " + -d(p3) + "px", threshold: a(0, l(1, h3)) || 1 };
                let y3 = true;
                function b2(t5) {
                  const n4 = t5[0].intersectionRatio;
                  if (n4 !== h3) {
                    if (!y3) return r3();
                    n4 ? r3(false, n4) : i4 = setTimeout((() => {
                      r3(false, 1e-7);
                    }), 1e3);
                  }
                  1 !== n4 || ue(u3, e4.getBoundingClientRect()) || r3(), y3 = false;
                }
                try {
                  n3 = new IntersectionObserver(b2, { ...f3, root: s3.ownerDocument });
                } catch (e5) {
                  n3 = new IntersectionObserver(b2, f3);
                }
                n3.observe(e4);
              })(true), o3;
            })(u2, i3) : null;
            let g2, v2 = -1, f2 = null;
            r2 && (f2 = new ResizeObserver(((e4) => {
              let [n3] = e4;
              n3 && n3.target === u2 && f2 && (f2.unobserve(t3), cancelAnimationFrame(v2), v2 = requestAnimationFrame((() => {
                var e5;
                null == (e5 = f2) || e5.observe(t3);
              }))), i3();
            })), u2 && !h2 && f2.observe(u2), f2.observe(t3));
            let y2 = h2 ? ie(e3) : null;
            return h2 && (function t4() {
              const n3 = ie(e3);
              y2 && !ue(y2, n3) && i3();
              y2 = n3, g2 = requestAnimationFrame(t4);
            })(), i3(), () => {
              var e4;
              p2.forEach(((e5) => {
                s2 && e5.removeEventListener("scroll", i3), o2 && e5.removeEventListener("resize", i3);
              })), null == m2 || m2(), null == (e4 = f2) || e4.disconnect(), f2 = null, h2 && cancelAnimationFrame(g2);
            };
          }
          const me = k, ge = function(e3) {
            return void 0 === e3 && (e3 = 0), { name: "offset", options: e3, async fn(t3) {
              var i3, n2;
              const { x: s2, y: o2, placement: l2, middlewareData: a2 } = t3, r2 = await (async function(e4, t4) {
                const { placement: i4, platform: n3, elements: s3 } = e4, o3 = await (null == n3.isRTL ? void 0 : n3.isRTL(s3.floating)), l3 = g(i4), a3 = v(i4), r3 = "y" === b(i4), d2 = ["left", "top"].includes(l3) ? -1 : 1, c2 = o3 && r3 ? -1 : 1, h2 = m(t4, e4);
                let { mainAxis: u2, crossAxis: p2, alignmentAxis: f2 } = "number" == typeof h2 ? { mainAxis: h2, crossAxis: 0, alignmentAxis: null } : { mainAxis: h2.mainAxis || 0, crossAxis: h2.crossAxis || 0, alignmentAxis: h2.alignmentAxis };
                return a3 && "number" == typeof f2 && (p2 = "end" === a3 ? -1 * f2 : f2), r3 ? { x: p2 * c2, y: u2 * d2 } : { x: u2 * d2, y: p2 * c2 };
              })(t3, e3);
              return l2 === (null == (i3 = a2.offset) ? void 0 : i3.placement) && null != (n2 = a2.arrow) && n2.alignmentOffset ? {} : { x: s2 + r2.x, y: o2 + r2.y, data: { ...r2, placement: l2 } };
            } };
          }, ve = function(e3) {
            return void 0 === e3 && (e3 = {}), { name: "autoPlacement", options: e3, async fn(t3) {
              var i3, n2, s2;
              const { rects: l2, middlewareData: a2, placement: r2, platform: d2, elements: c2 } = t3, { crossAxis: h2 = false, alignment: u2, allowedPlacements: p2 = o, autoAlignment: f2 = true, ...y2 } = m(e3, t3), b2 = void 0 !== u2 || p2 === o ? (function(e4, t4, i4) {
                return (e4 ? [...i4.filter(((t5) => v(t5) === e4)), ...i4.filter(((t5) => v(t5) !== e4))] : i4.filter(((e5) => g(e5) === e5))).filter(((i5) => !e4 || v(i5) === e4 || !!t4 && S(i5) !== i5));
              })(u2 || null, f2, p2) : p2, w2 = await k(t3, y2), x2 = (null == (i3 = a2.autoPlacement) ? void 0 : i3.index) || 0, L2 = b2[x2];
              if (null == L2) return {};
              const T2 = C(L2, l2, await (null == d2.isRTL ? void 0 : d2.isRTL(c2.floating)));
              if (r2 !== L2) return { reset: { placement: b2[0] } };
              const E2 = [w2[g(L2)], w2[T2[0]], w2[T2[1]]], I2 = [...(null == (n2 = a2.autoPlacement) ? void 0 : n2.overflows) || [], { placement: L2, overflows: E2 }], A2 = b2[x2 + 1];
              if (A2) return { data: { index: x2 + 1, overflows: I2 }, reset: { placement: A2 } };
              const M2 = I2.map(((e4) => {
                const t4 = v(e4.placement);
                return [e4.placement, t4 && h2 ? e4.overflows.slice(0, 2).reduce(((e5, t5) => e5 + t5), 0) : e4.overflows[0], e4.overflows];
              })).sort(((e4, t4) => e4[1] - t4[1])), O2 = (null == (s2 = M2.filter(((e4) => e4[2].slice(0, v(e4[0]) ? 2 : 3).every(((e5) => e5 <= 0))))[0]) ? void 0 : s2[0]) || M2[0][0];
              return O2 !== r2 ? { data: { index: x2 + 1, overflows: I2 }, reset: { placement: O2 } } : {};
            } };
          }, fe = function(e3) {
            return void 0 === e3 && (e3 = {}), { name: "shift", options: e3, async fn(t3) {
              const { x: i3, y: n2, placement: s2 } = t3, { mainAxis: o2 = true, crossAxis: l2 = false, limiter: a2 = { fn: (e4) => {
                let { x: t4, y: i4 } = e4;
                return { x: t4, y: i4 };
              } }, ...r2 } = m(e3, t3), d2 = { x: i3, y: n2 }, c2 = await k(t3, r2), h2 = b(g(s2)), u2 = f(h2);
              let v2 = d2[u2], y2 = d2[h2];
              if (o2) {
                const e4 = "y" === u2 ? "bottom" : "right";
                v2 = p(v2 + c2["y" === u2 ? "top" : "left"], v2, v2 - c2[e4]);
              }
              if (l2) {
                const e4 = "y" === h2 ? "bottom" : "right";
                y2 = p(y2 + c2["y" === h2 ? "top" : "left"], y2, y2 - c2[e4]);
              }
              const w2 = a2.fn({ ...t3, [u2]: v2, [h2]: y2 });
              return { ...w2, data: { x: w2.x - i3, y: w2.y - n2, enabled: { [u2]: o2, [h2]: l2 } } };
            } };
          }, ye = function(e3) {
            return void 0 === e3 && (e3 = {}), { name: "flip", options: e3, async fn(t3) {
              var i3, n2;
              const { placement: s2, middlewareData: o2, rects: l2, initialPlacement: a2, platform: r2, elements: d2 } = t3, { mainAxis: c2 = true, crossAxis: h2 = true, fallbackPlacements: u2, fallbackStrategy: p2 = "bestFit", fallbackAxisSideDirection: f2 = "none", flipAlignment: y2 = true, ...w2 } = m(e3, t3);
              if (null != (i3 = o2.arrow) && i3.alignmentOffset) return {};
              const L2 = g(s2), T2 = b(a2), E2 = g(a2) === a2, I2 = await (null == r2.isRTL ? void 0 : r2.isRTL(d2.floating)), A2 = u2 || (E2 || !y2 ? [x(a2)] : (function(e4) {
                const t4 = x(e4);
                return [S(e4), t4, S(t4)];
              })(a2)), M2 = "none" !== f2;
              !u2 && M2 && A2.push(...(function(e4, t4, i4, n3) {
                const s3 = v(e4);
                let o3 = (function(e5, t5, i5) {
                  const n4 = ["left", "right"], s4 = ["right", "left"], o4 = ["top", "bottom"], l3 = ["bottom", "top"];
                  switch (e5) {
                    case "top":
                    case "bottom":
                      return i5 ? t5 ? s4 : n4 : t5 ? n4 : s4;
                    case "left":
                    case "right":
                      return t5 ? o4 : l3;
                    default:
                      return [];
                  }
                })(g(e4), "start" === i4, n3);
                return s3 && (o3 = o3.map(((e5) => e5 + "-" + s3)), t4 && (o3 = o3.concat(o3.map(S)))), o3;
              })(a2, y2, f2, I2));
              const O2 = [a2, ...A2], D2 = await k(t3, w2), P2 = [];
              let $2 = (null == (n2 = o2.flip) ? void 0 : n2.overflows) || [];
              if (c2 && P2.push(D2[L2]), h2) {
                const e4 = C(s2, l2, I2);
                P2.push(D2[e4[0]], D2[e4[1]]);
              }
              if ($2 = [...$2, { placement: s2, overflows: P2 }], !P2.every(((e4) => e4 <= 0))) {
                var H2, N2;
                const e4 = ((null == (H2 = o2.flip) ? void 0 : H2.index) || 0) + 1, t4 = O2[e4];
                if (t4) return { data: { index: e4, overflows: $2 }, reset: { placement: t4 } };
                let i4 = null == (N2 = $2.filter(((e5) => e5.overflows[0] <= 0)).sort(((e5, t5) => e5.overflows[1] - t5.overflows[1]))[0]) ? void 0 : N2.placement;
                if (!i4) switch (p2) {
                  case "bestFit": {
                    var B2;
                    const e5 = null == (B2 = $2.filter(((e6) => {
                      if (M2) {
                        const t5 = b(e6.placement);
                        return t5 === T2 || "y" === t5;
                      }
                      return true;
                    })).map(((e6) => [e6.placement, e6.overflows.filter(((e7) => e7 > 0)).reduce(((e7, t5) => e7 + t5), 0)])).sort(((e6, t5) => e6[1] - t5[1]))[0]) ? void 0 : B2[0];
                    e5 && (i4 = e5);
                    break;
                  }
                  case "initialPlacement":
                    i4 = a2;
                }
                if (s2 !== i4) return { reset: { placement: i4 } };
              }
              return {};
            } };
          }, be = function(e3) {
            return void 0 === e3 && (e3 = {}), { name: "size", options: e3, async fn(t3) {
              var i3, n2;
              const { placement: s2, rects: o2, platform: r2, elements: d2 } = t3, { apply: c2 = () => {
              }, ...h2 } = m(e3, t3), u2 = await k(t3, h2), p2 = g(s2), f2 = v(s2), y2 = "y" === b(s2), { width: w2, height: C2 } = o2.floating;
              let S2, x2;
              "top" === p2 || "bottom" === p2 ? (S2 = p2, x2 = f2 === (await (null == r2.isRTL ? void 0 : r2.isRTL(d2.floating)) ? "start" : "end") ? "left" : "right") : (x2 = p2, S2 = "end" === f2 ? "top" : "bottom");
              const L2 = C2 - u2.top - u2.bottom, T2 = w2 - u2.left - u2.right, E2 = l(C2 - u2[S2], L2), I2 = l(w2 - u2[x2], T2), A2 = !t3.middlewareData.shift;
              let M2 = E2, O2 = I2;
              if (null != (i3 = t3.middlewareData.shift) && i3.enabled.x && (O2 = T2), null != (n2 = t3.middlewareData.shift) && n2.enabled.y && (M2 = L2), A2 && !f2) {
                const e4 = a(u2.left, 0), t4 = a(u2.right, 0), i4 = a(u2.top, 0), n3 = a(u2.bottom, 0);
                y2 ? O2 = w2 - 2 * (0 !== e4 || 0 !== t4 ? e4 + t4 : a(u2.left, u2.right)) : M2 = C2 - 2 * (0 !== i4 || 0 !== n3 ? i4 + n3 : a(u2.top, u2.bottom));
              }
              await c2({ ...t3, availableWidth: O2, availableHeight: M2 });
              const D2 = await r2.getDimensions(d2.floating);
              return w2 !== D2.width || C2 !== D2.height ? { reset: { rects: true } } : {};
            } };
          }, we = function(e3) {
            return void 0 === e3 && (e3 = {}), { name: "hide", options: e3, async fn(t3) {
              const { rects: i3 } = t3, { strategy: n2 = "referenceHidden", ...s2 } = m(e3, t3);
              switch (n2) {
                case "referenceHidden": {
                  const e4 = I(await k(t3, { ...s2, elementContext: "reference" }), i3.reference);
                  return { data: { referenceHiddenOffsets: e4, referenceHidden: A(e4) } };
                }
                case "escaped": {
                  const e4 = I(await k(t3, { ...s2, altBoundary: true }), i3.floating);
                  return { data: { escapedOffsets: e4, escaped: A(e4) } };
                }
                default:
                  return {};
              }
            } };
          }, Ce = (e3) => ({ name: "arrow", options: e3, async fn(t3) {
            const { x: i3, y: n2, placement: s2, rects: o2, platform: a2, elements: r2, middlewareData: d2 } = t3, { element: c2, padding: h2 = 0 } = m(e3, t3) || {};
            if (null == c2) return {};
            const u2 = L(h2), g2 = { x: i3, y: n2 }, f2 = w(s2), b2 = y(f2), C2 = await a2.getDimensions(c2), S2 = "y" === f2, x2 = S2 ? "top" : "left", T2 = S2 ? "bottom" : "right", E2 = S2 ? "clientHeight" : "clientWidth", k2 = o2.reference[b2] + o2.reference[f2] - g2[f2] - o2.floating[b2], I2 = g2[f2] - o2.reference[f2], A2 = await (null == a2.getOffsetParent ? void 0 : a2.getOffsetParent(c2));
            let M2 = A2 ? A2[E2] : 0;
            M2 && await (null == a2.isElement ? void 0 : a2.isElement(A2)) || (M2 = r2.floating[E2] || o2.floating[b2]);
            const O2 = k2 / 2 - I2 / 2, D2 = M2 / 2 - C2[b2] / 2 - 1, P2 = l(u2[x2], D2), $2 = l(u2[T2], D2), H2 = P2, N2 = M2 - C2[b2] - $2, B2 = M2 / 2 - C2[b2] / 2 + O2, q2 = p(H2, B2, N2), F2 = !d2.arrow && null != v(s2) && B2 !== q2 && o2.reference[b2] / 2 - (B2 < H2 ? P2 : $2) - C2[b2] / 2 < 0, _3 = F2 ? B2 < H2 ? B2 - H2 : B2 - N2 : 0;
            return { [f2]: g2[f2] + _3, data: { [f2]: q2, centerOffset: B2 - q2 - _3, ...F2 && { alignmentOffset: _3 } }, reset: F2 };
          } }), Se = function(e3) {
            return void 0 === e3 && (e3 = {}), { name: "inline", options: e3, async fn(t3) {
              const { placement: i3, elements: n2, rects: s2, platform: o2, strategy: r2 } = t3, { padding: d2 = 2, x: c2, y: h2 } = m(e3, t3), u2 = Array.from(await (null == o2.getClientRects ? void 0 : o2.getClientRects(n2.reference)) || []), p2 = (function(e4) {
                const t4 = e4.slice().sort(((e5, t5) => e5.y - t5.y)), i4 = [];
                let n3 = null;
                for (let e5 = 0; e5 < t4.length; e5++) {
                  const s3 = t4[e5];
                  !n3 || s3.y - n3.y > n3.height / 2 ? i4.push([s3]) : i4[i4.length - 1].push(s3), n3 = s3;
                }
                return i4.map(((e5) => T(M(e5))));
              })(u2), v2 = T(M(u2)), f2 = L(d2);
              const y2 = await o2.getElementRects({ reference: { getBoundingClientRect: function() {
                if (2 === p2.length && p2[0].left > p2[1].right && null != c2 && null != h2) return p2.find(((e4) => c2 > e4.left - f2.left && c2 < e4.right + f2.right && h2 > e4.top - f2.top && h2 < e4.bottom + f2.bottom)) || v2;
                if (p2.length >= 2) {
                  if ("y" === b(i3)) {
                    const e5 = p2[0], t5 = p2[p2.length - 1], n4 = "top" === g(i3), s4 = e5.top, o4 = t5.bottom, l2 = n4 ? e5.left : t5.left, a2 = n4 ? e5.right : t5.right;
                    return { top: s4, bottom: o4, left: l2, right: a2, width: a2 - l2, height: o4 - s4, x: l2, y: s4 };
                  }
                  const e4 = "left" === g(i3), t4 = a(...p2.map(((e5) => e5.right))), n3 = l(...p2.map(((e5) => e5.left))), s3 = p2.filter(((i4) => e4 ? i4.left === n3 : i4.right === t4)), o3 = s3[0].top, r3 = s3[s3.length - 1].bottom;
                  return { top: o3, bottom: r3, left: n3, right: t4, width: t4 - n3, height: r3 - o3, x: n3, y: o3 };
                }
                return v2;
              } }, floating: n2.floating, strategy: r2 });
              return s2.reference.x !== y2.reference.x || s2.reference.y !== y2.reference.y || s2.reference.width !== y2.reference.width || s2.reference.height !== y2.reference.height ? { reset: { rects: y2 } } : {};
            } };
          }, xe = function(e3) {
            return void 0 === e3 && (e3 = {}), { options: e3, fn(t3) {
              const { x: i3, y: n2, placement: s2, rects: o2, middlewareData: l2 } = t3, { offset: a2 = 0, mainAxis: r2 = true, crossAxis: d2 = true } = m(e3, t3), c2 = { x: i3, y: n2 }, h2 = b(s2), u2 = f(h2);
              let p2 = c2[u2], v2 = c2[h2];
              const y2 = m(a2, t3), w2 = "number" == typeof y2 ? { mainAxis: y2, crossAxis: 0 } : { mainAxis: 0, crossAxis: 0, ...y2 };
              if (r2) {
                const e4 = "y" === u2 ? "height" : "width", t4 = o2.reference[u2] - o2.floating[e4] + w2.mainAxis, i4 = o2.reference[u2] + o2.reference[e4] - w2.mainAxis;
                p2 < t4 ? p2 = t4 : p2 > i4 && (p2 = i4);
              }
              if (d2) {
                var C2, S2;
                const e4 = "y" === u2 ? "width" : "height", t4 = ["top", "left"].includes(g(s2)), i4 = o2.reference[h2] - o2.floating[e4] + (t4 && (null == (C2 = l2.offset) ? void 0 : C2[h2]) || 0) + (t4 ? 0 : w2.crossAxis), n3 = o2.reference[h2] + o2.reference[e4] + (t4 ? 0 : (null == (S2 = l2.offset) ? void 0 : S2[h2]) || 0) - (t4 ? w2.crossAxis : 0);
                v2 < i4 ? v2 = i4 : v2 > n3 && (v2 = n3);
              }
              return { [u2]: p2, [h2]: v2 };
            } };
          }, Le = (e3, t3, i3) => {
            const n2 = /* @__PURE__ */ new Map(), s2 = { platform: he, ...i3 }, o2 = { ...s2.platform, _c: n2 };
            return (async (e4, t4, i4) => {
              const { placement: n3 = "bottom", strategy: s3 = "absolute", middleware: o3 = [], platform: l2 } = i4, a2 = o3.filter(Boolean), r2 = await (null == l2.isRTL ? void 0 : l2.isRTL(t4));
              let d2 = await l2.getElementRects({ reference: e4, floating: t4, strategy: s3 }), { x: c2, y: h2 } = E(d2, n3, r2), u2 = n3, p2 = {}, m2 = 0;
              for (let i5 = 0; i5 < a2.length; i5++) {
                const { name: o4, fn: g2 } = a2[i5], { x: v2, y: f2, data: y2, reset: b2 } = await g2({ x: c2, y: h2, initialPlacement: n3, placement: u2, strategy: s3, middlewareData: p2, rects: d2, platform: l2, elements: { reference: e4, floating: t4 } });
                c2 = null != v2 ? v2 : c2, h2 = null != f2 ? f2 : h2, p2 = { ...p2, [o4]: { ...p2[o4], ...y2 } }, b2 && m2 <= 50 && (m2++, "object" == typeof b2 && (b2.placement && (u2 = b2.placement), b2.rects && (d2 = true === b2.rects ? await l2.getElementRects({ reference: e4, floating: t4, strategy: s3 }) : b2.rects), { x: c2, y: h2 } = E(d2, u2, r2)), i5 = -1);
              }
              return { x: c2, y: h2, placement: u2, strategy: s3, middlewareData: p2 };
            })(e3, t3, { ...s2, platform: o2 });
          };
        }, 957: (e2, t2, i2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true });
          const n = i2(292), s = i2(255), o = { getClassProperty: n.getClassProperty, afterTransition: n.afterTransition, autoInit(e3 = "all") {
            "all" === e3 ? s.COLLECTIONS.forEach((({ fn: e4 }) => {
              null == e4 || e4.autoInit();
            })) : s.COLLECTIONS.forEach((({ key: t3, fn: i3 }) => {
              e3.includes(t3) && (null == i3 || i3.autoInit());
            }));
          }, cleanCollection(e3 = "all") {
            "all" === e3 ? s.COLLECTIONS.forEach((({ collection: e4 }) => {
              window[e4] instanceof Array && (window[e4] = []);
            })) : s.COLLECTIONS.forEach((({ key: t3, collection: i3 }) => {
              e3.includes(t3) && window[i3] instanceof Array && (window[i3] = []);
            }));
          } };
          "undefined" != typeof window && (window.HSStaticMethods = o), t2.default = o;
        }, 961: (e2, t2) => {
          "use strict";
          Object.defineProperty(t2, "__esModule", { value: true });
          t2.default = class {
            constructor(e3, t3, i2) {
              this.el = e3, this.options = t3, this.events = i2, this.el = e3, this.options = t3, this.events = {};
            }
            createCollection(e3, t3) {
              var i2;
              e3.push({ id: (null === (i2 = null == t3 ? void 0 : t3.el) || void 0 === i2 ? void 0 : i2.id) || e3.length + 1, element: t3 });
            }
            fireEvent(e3, t3 = null) {
              if (this.events.hasOwnProperty(e3)) return this.events[e3](t3);
            }
            on(e3, t3) {
              this.events[e3] = t3;
            }
          };
        }, 969: function(e2, t2, i2) {
          "use strict";
          var n = this && this.__awaiter || function(e3, t3, i3, n2) {
            return new (i3 || (i3 = Promise))((function(s2, o2) {
              function l2(e4) {
                try {
                  r2(n2.next(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function a2(e4) {
                try {
                  r2(n2.throw(e4));
                } catch (e5) {
                  o2(e5);
                }
              }
              function r2(e4) {
                var t4;
                e4.done ? s2(e4.value) : (t4 = e4.value, t4 instanceof i3 ? t4 : new i3((function(e5) {
                  e5(t4);
                }))).then(l2, a2);
              }
              r2((n2 = n2.apply(e3, t3 || [])).next());
            }));
          }, s = this && this.__importDefault || function(e3) {
            return e3 && e3.__esModule ? e3 : { default: e3 };
          };
          Object.defineProperty(t2, "__esModule", { value: true });
          const o = i2(949), l = i2(292), a = s(i2(961)), r = i2(223);
          class d extends a.default {
            constructor(e3, t3, i3) {
              super(e3, t3, i3), this.cleanupAutoUpdate = null, this.el && (this.toggle = this.el.querySelector(".hs-tooltip-toggle") || this.el, this.content = this.el.querySelector(".hs-tooltip-content"), this.eventMode = (0, l.getClassProperty)(this.el, "--trigger") || "hover", this.preventFloatingUI = (0, l.getClassProperty)(this.el, "--prevent-popper", "false"), this.placement = (0, l.getClassProperty)(this.el, "--placement") || "top", this.strategy = (0, l.getClassProperty)(this.el, "--strategy"), this.scope = (0, l.getClassProperty)(this.el, "--scope") || "parent"), this.el && this.toggle && this.content && this.init();
            }
            toggleClick() {
              this.click();
            }
            toggleFocus() {
              this.focus();
            }
            toggleMouseEnter() {
              this.enter();
            }
            toggleMouseLeave() {
              this.leave();
            }
            toggleHandle() {
              this.hide(), this.toggle.removeEventListener("click", this.onToggleHandleListener, true), this.toggle.removeEventListener("blur", this.onToggleHandleListener, true);
            }
            init() {
              this.createCollection(window.$hsTooltipCollection, this), this.onToggleFocusListener = () => this.enter(), this.onToggleBlurListener = () => this.hide(), this.toggle.addEventListener("focus", this.onToggleFocusListener), this.toggle.addEventListener("blur", this.onToggleBlurListener), "click" === this.eventMode ? (this.onToggleClickListener = () => this.toggleClick(), this.toggle.addEventListener("click", this.onToggleClickListener)) : "hover" === this.eventMode && (this.onToggleMouseEnterListener = () => this.toggleMouseEnter(), this.onToggleMouseLeaveListener = () => this.toggleMouseLeave(), this.toggle.addEventListener("mouseenter", this.onToggleMouseEnterListener), this.toggle.addEventListener("mouseleave", this.onToggleMouseLeaveListener)), "false" === this.preventFloatingUI && this.buildFloatingUI();
            }
            enter() {
              this._show();
            }
            leave() {
              this.hide();
            }
            click() {
              if (this.el.classList.contains("show")) return false;
              this._show(), this.onToggleHandleListener = () => {
                setTimeout((() => this.toggleHandle()));
              }, this.toggle.addEventListener("click", this.onToggleHandleListener, true), this.toggle.addEventListener("blur", this.onToggleHandleListener, true);
            }
            focus() {
              this._show();
            }
            positionTooltip(e3) {
              return n(this, void 0, void 0, (function* () {
                const t3 = "auto" === e3 ? "top" : e3, i3 = "auto" === e3 ? ["bottom", "left", "right"] : this.getFallbackPlacements(t3), n2 = [(0, o.offset)(5), (0, o.flip)({ fallbackPlacements: i3 })];
                return yield (0, o.computePosition)(this.toggle, this.content, { placement: t3, strategy: this.strategy || "fixed", middleware: n2 });
              }));
            }
            getFallbackPlacements(e3) {
              switch (e3) {
                case "top":
                  return ["bottom", "left", "right"];
                case "bottom":
                  return ["top", "left", "right"];
                case "left":
                  return ["right", "top", "bottom"];
                case "right":
                  return ["left", "top", "bottom"];
                case "top-start":
                  return ["bottom-start", "top-end", "bottom-end"];
                case "top-end":
                  return ["bottom-end", "top-start", "bottom-start"];
                case "bottom-start":
                  return ["top-start", "bottom-end", "top-end"];
                case "bottom-end":
                  return ["top-end", "bottom-start", "top-start"];
                case "left-start":
                  return ["right-start", "left-end", "right-end"];
                case "left-end":
                  return ["right-end", "left-start", "right-start"];
                case "right-start":
                  return ["left-start", "right-end", "left-end"];
                case "right-end":
                  return ["left-end", "right-start", "left-start"];
                default:
                  return ["top", "bottom", "left", "right"];
              }
            }
            applyTooltipPosition(e3, t3, i3) {
              Object.assign(this.content.style, { position: this.strategy || "fixed", left: `${e3}px`, top: `${t3}px` }), this.content.setAttribute("data-placement", i3);
            }
            buildFloatingUI() {
              "window" === this.scope && document.body.appendChild(this.content);
              const e3 = this.placement.startsWith("auto"), t3 = (0, l.getClassProperty)(this.el, "--placement"), i3 = e3 || (!t3 || "" === t3) ? "auto" : r.POSITIONS[this.placement] || this.placement;
              this.positionTooltip(i3).then(((e4) => {
                this.applyTooltipPosition(e4.x, e4.y, e4.placement);
              })), this.cleanupAutoUpdate = (0, o.autoUpdate)(this.toggle, this.content, (() => {
                this.positionTooltip(i3).then(((e4) => {
                  Object.assign(this.content.style, { position: this.strategy || "fixed", left: `${e4.x}px`, top: `${e4.y}px` }), this.content.setAttribute("data-placement", e4.placement);
                }));
              }));
            }
            _show() {
              this.content.classList.remove("hidden"), "window" === this.scope && this.content.classList.add("show"), "false" !== this.preventFloatingUI || this.cleanupAutoUpdate || this.buildFloatingUI(), setTimeout((() => {
                this.el.classList.add("show"), this.fireEvent("show", this.el), (0, l.dispatch)("show.hs.tooltip", this.el, this.el);
              }));
            }
            show() {
              "click" === this.eventMode ? this.click() : this.enter(), this.toggle.focus(), this.toggle.style.outline = "none";
            }
            hide() {
              this.el.classList.remove("show"), "window" === this.scope && this.content.classList.remove("show"), "false" === this.preventFloatingUI && this.cleanupAutoUpdate && (this.cleanupAutoUpdate(), this.cleanupAutoUpdate = null), this.fireEvent("hide", this.el), (0, l.dispatch)("hide.hs.tooltip", this.el, this.el), (0, l.afterTransition)(this.content, (() => {
                if (this.el.classList.contains("show")) return false;
                this.content.classList.add("hidden"), this.toggle.style.outline = "";
              }));
            }
            destroy() {
              this.el.classList.remove("show"), this.content.classList.add("hidden"), this.toggle.removeEventListener("focus", this.onToggleFocusListener), this.toggle.removeEventListener("blur", this.onToggleBlurListener), "click" === this.eventMode ? this.toggle.removeEventListener("click", this.onToggleClickListener) : "hover" === this.eventMode && (this.toggle.removeEventListener("mouseenter", this.onToggleMouseEnterListener), this.toggle.removeEventListener("mouseleave", this.onToggleMouseLeaveListener)), this.toggle.removeEventListener("click", this.onToggleHandleListener, true), this.toggle.removeEventListener("blur", this.onToggleHandleListener, true), this.cleanupAutoUpdate && (this.cleanupAutoUpdate(), this.cleanupAutoUpdate = null), window.$hsTooltipCollection = window.$hsTooltipCollection.filter((({ element: e3 }) => e3.el !== this.el));
            }
            static findInCollection(e3) {
              return window.$hsTooltipCollection.find(((t3) => e3 instanceof d ? t3.element.el === e3.el : "string" == typeof e3 ? t3.element.el === document.querySelector(e3) : t3.element.el === e3)) || null;
            }
            static getInstance(e3, t3 = false) {
              const i3 = window.$hsTooltipCollection.find(((t4) => t4.element.el === ("string" == typeof e3 ? document.querySelector(e3) : e3)));
              return i3 ? t3 ? i3 : i3.element.el : null;
            }
            static autoInit() {
              window.$hsTooltipCollection || (window.$hsTooltipCollection = []), window.$hsTooltipCollection && (window.$hsTooltipCollection = window.$hsTooltipCollection.filter((({ element: e3 }) => document.contains(e3.el)))), document.querySelectorAll(".hs-tooltip:not(.--prevent-on-load-init)").forEach(((e3) => {
                window.$hsTooltipCollection.find(((t3) => {
                  var i3;
                  return (null === (i3 = null == t3 ? void 0 : t3.element) || void 0 === i3 ? void 0 : i3.el) === e3;
                })) || new d(e3);
              }));
            }
            static show(e3) {
              const t3 = d.findInCollection(e3);
              t3 && t3.element.show();
            }
            static hide(e3) {
              const t3 = d.findInCollection(e3);
              t3 && t3.element.hide();
            }
            static on(e3, t3, i3) {
              const n2 = d.findInCollection(t3);
              n2 && (n2.element.events[e3] = i3);
            }
          }
          window.addEventListener("load", (() => {
            d.autoInit();
          })), "undefined" != typeof window && (window.HSTooltip = d), t2.default = d;
        } }, t = {};
        function i(n) {
          var s = t[n];
          if (void 0 !== s) return s.exports;
          var o = t[n] = { exports: {} };
          return e[n].call(o.exports, o, o.exports, i), o.exports;
        }
        return i.d = (e2, t2) => {
          for (var n in t2) i.o(t2, n) && !i.o(e2, n) && Object.defineProperty(e2, n, { enumerable: true, get: t2[n] });
        }, i.o = (e2, t2) => Object.prototype.hasOwnProperty.call(e2, t2), i.r = (e2) => {
          "undefined" != typeof Symbol && Symbol.toStringTag && Object.defineProperty(e2, Symbol.toStringTag, { value: "Module" }), Object.defineProperty(e2, "__esModule", { value: true });
        }, i(158);
      })()));
    }
  });

  // node_modules/.pnpm/canvas-confetti@1.9.4/node_modules/canvas-confetti/dist/confetti.module.mjs
  var module = {};
  (function main(global, module2, isWorker, workerSize) {
    var canUseWorker = !!(global.Worker && global.Blob && global.Promise && global.OffscreenCanvas && global.OffscreenCanvasRenderingContext2D && global.HTMLCanvasElement && global.HTMLCanvasElement.prototype.transferControlToOffscreen && global.URL && global.URL.createObjectURL);
    var canUsePaths = typeof Path2D === "function" && typeof DOMMatrix === "function";
    var canDrawBitmap = (function() {
      if (!global.OffscreenCanvas) {
        return false;
      }
      try {
        var canvas = new OffscreenCanvas(1, 1);
        var ctx = canvas.getContext("2d");
        ctx.fillRect(0, 0, 1, 1);
        var bitmap = canvas.transferToImageBitmap();
        ctx.createPattern(bitmap, "no-repeat");
      } catch (e) {
        return false;
      }
      return true;
    })();
    function noop() {
    }
    function promise(func) {
      var ModulePromise = module2.exports.Promise;
      var Prom = ModulePromise !== void 0 ? ModulePromise : global.Promise;
      if (typeof Prom === "function") {
        return new Prom(func);
      }
      func(noop, noop);
      return null;
    }
    var bitmapMapper = /* @__PURE__ */ (function(skipTransform, map) {
      return {
        transform: function(bitmap) {
          if (skipTransform) {
            return bitmap;
          }
          if (map.has(bitmap)) {
            return map.get(bitmap);
          }
          var canvas = new OffscreenCanvas(bitmap.width, bitmap.height);
          var ctx = canvas.getContext("2d");
          ctx.drawImage(bitmap, 0, 0);
          map.set(bitmap, canvas);
          return canvas;
        },
        clear: function() {
          map.clear();
        }
      };
    })(canDrawBitmap, /* @__PURE__ */ new Map());
    var raf = (function() {
      var TIME = Math.floor(1e3 / 60);
      var frame, cancel;
      var frames = {};
      var lastFrameTime = 0;
      if (typeof requestAnimationFrame === "function" && typeof cancelAnimationFrame === "function") {
        frame = function(cb) {
          var id = Math.random();
          frames[id] = requestAnimationFrame(function onFrame(time) {
            if (lastFrameTime === time || lastFrameTime + TIME - 1 < time) {
              lastFrameTime = time;
              delete frames[id];
              cb();
            } else {
              frames[id] = requestAnimationFrame(onFrame);
            }
          });
          return id;
        };
        cancel = function(id) {
          if (frames[id]) {
            cancelAnimationFrame(frames[id]);
          }
        };
      } else {
        frame = function(cb) {
          return setTimeout(cb, TIME);
        };
        cancel = function(timer) {
          return clearTimeout(timer);
        };
      }
      return { frame, cancel };
    })();
    var getWorker = /* @__PURE__ */ (function() {
      var worker;
      var prom;
      var resolves = {};
      function decorate(worker2) {
        function execute(options, callback) {
          worker2.postMessage({ options: options || {}, callback });
        }
        worker2.init = function initWorker(canvas) {
          var offscreen = canvas.transferControlToOffscreen();
          worker2.postMessage({ canvas: offscreen }, [offscreen]);
        };
        worker2.fire = function fireWorker(options, size, done) {
          if (prom) {
            execute(options, null);
            return prom;
          }
          var id = Math.random().toString(36).slice(2);
          prom = promise(function(resolve) {
            function workerDone(msg) {
              if (msg.data.callback !== id) {
                return;
              }
              delete resolves[id];
              worker2.removeEventListener("message", workerDone);
              prom = null;
              bitmapMapper.clear();
              done();
              resolve();
            }
            worker2.addEventListener("message", workerDone);
            execute(options, id);
            resolves[id] = workerDone.bind(null, { data: { callback: id } });
          });
          return prom;
        };
        worker2.reset = function resetWorker() {
          worker2.postMessage({ reset: true });
          for (var id in resolves) {
            resolves[id]();
            delete resolves[id];
          }
        };
      }
      return function() {
        if (worker) {
          return worker;
        }
        if (!isWorker && canUseWorker) {
          var code = [
            "var CONFETTI, SIZE = {}, module = {};",
            "(" + main.toString() + ")(this, module, true, SIZE);",
            "onmessage = function(msg) {",
            "  if (msg.data.options) {",
            "    CONFETTI(msg.data.options).then(function () {",
            "      if (msg.data.callback) {",
            "        postMessage({ callback: msg.data.callback });",
            "      }",
            "    });",
            "  } else if (msg.data.reset) {",
            "    CONFETTI && CONFETTI.reset();",
            "  } else if (msg.data.resize) {",
            "    SIZE.width = msg.data.resize.width;",
            "    SIZE.height = msg.data.resize.height;",
            "  } else if (msg.data.canvas) {",
            "    SIZE.width = msg.data.canvas.width;",
            "    SIZE.height = msg.data.canvas.height;",
            "    CONFETTI = module.exports.create(msg.data.canvas);",
            "  }",
            "}"
          ].join("\n");
          try {
            worker = new Worker(URL.createObjectURL(new Blob([code])));
          } catch (e) {
            typeof console !== "undefined" && typeof console.warn === "function" ? console.warn("\u{1F38A} Could not load worker", e) : null;
            return null;
          }
          decorate(worker);
        }
        return worker;
      };
    })();
    var defaults = {
      particleCount: 50,
      angle: 90,
      spread: 45,
      startVelocity: 45,
      decay: 0.9,
      gravity: 1,
      drift: 0,
      ticks: 200,
      x: 0.5,
      y: 0.5,
      shapes: ["square", "circle"],
      zIndex: 100,
      colors: [
        "#26ccff",
        "#a25afd",
        "#ff5e7e",
        "#88ff5a",
        "#fcff42",
        "#ffa62d",
        "#ff36ff"
      ],
      // probably should be true, but back-compat
      disableForReducedMotion: false,
      scalar: 1
    };
    function convert(val, transform) {
      return transform ? transform(val) : val;
    }
    function isOk(val) {
      return !(val === null || val === void 0);
    }
    function prop(options, name, transform) {
      return convert(
        options && isOk(options[name]) ? options[name] : defaults[name],
        transform
      );
    }
    function onlyPositiveInt(number) {
      return number < 0 ? 0 : Math.floor(number);
    }
    function randomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
    }
    function toDecimal(str) {
      return parseInt(str, 16);
    }
    function colorsToRgb(colors) {
      return colors.map(hexToRgb);
    }
    function hexToRgb(str) {
      var val = String(str).replace(/[^0-9a-f]/gi, "");
      if (val.length < 6) {
        val = val[0] + val[0] + val[1] + val[1] + val[2] + val[2];
      }
      return {
        r: toDecimal(val.substring(0, 2)),
        g: toDecimal(val.substring(2, 4)),
        b: toDecimal(val.substring(4, 6))
      };
    }
    function getOrigin(options) {
      var origin = prop(options, "origin", Object);
      origin.x = prop(origin, "x", Number);
      origin.y = prop(origin, "y", Number);
      return origin;
    }
    function setCanvasWindowSize(canvas) {
      canvas.width = document.documentElement.clientWidth;
      canvas.height = document.documentElement.clientHeight;
    }
    function setCanvasRectSize(canvas) {
      var rect = canvas.getBoundingClientRect();
      canvas.width = rect.width;
      canvas.height = rect.height;
    }
    function getCanvas(zIndex) {
      var canvas = document.createElement("canvas");
      canvas.style.position = "fixed";
      canvas.style.top = "0px";
      canvas.style.left = "0px";
      canvas.style.pointerEvents = "none";
      canvas.style.zIndex = zIndex;
      return canvas;
    }
    function ellipse(context, x, y, radiusX, radiusY, rotation, startAngle, endAngle, antiClockwise) {
      context.save();
      context.translate(x, y);
      context.rotate(rotation);
      context.scale(radiusX, radiusY);
      context.arc(0, 0, 1, startAngle, endAngle, antiClockwise);
      context.restore();
    }
    function randomPhysics(opts) {
      var radAngle = opts.angle * (Math.PI / 180);
      var radSpread = opts.spread * (Math.PI / 180);
      return {
        x: opts.x,
        y: opts.y,
        wobble: Math.random() * 10,
        wobbleSpeed: Math.min(0.11, Math.random() * 0.1 + 0.05),
        velocity: opts.startVelocity * 0.5 + Math.random() * opts.startVelocity,
        angle2D: -radAngle + (0.5 * radSpread - Math.random() * radSpread),
        tiltAngle: (Math.random() * (0.75 - 0.25) + 0.25) * Math.PI,
        color: opts.color,
        shape: opts.shape,
        tick: 0,
        totalTicks: opts.ticks,
        decay: opts.decay,
        drift: opts.drift,
        random: Math.random() + 2,
        tiltSin: 0,
        tiltCos: 0,
        wobbleX: 0,
        wobbleY: 0,
        gravity: opts.gravity * 3,
        ovalScalar: 0.6,
        scalar: opts.scalar,
        flat: opts.flat
      };
    }
    function updateFetti(context, fetti) {
      fetti.x += Math.cos(fetti.angle2D) * fetti.velocity + fetti.drift;
      fetti.y += Math.sin(fetti.angle2D) * fetti.velocity + fetti.gravity;
      fetti.velocity *= fetti.decay;
      if (fetti.flat) {
        fetti.wobble = 0;
        fetti.wobbleX = fetti.x + 10 * fetti.scalar;
        fetti.wobbleY = fetti.y + 10 * fetti.scalar;
        fetti.tiltSin = 0;
        fetti.tiltCos = 0;
        fetti.random = 1;
      } else {
        fetti.wobble += fetti.wobbleSpeed;
        fetti.wobbleX = fetti.x + 10 * fetti.scalar * Math.cos(fetti.wobble);
        fetti.wobbleY = fetti.y + 10 * fetti.scalar * Math.sin(fetti.wobble);
        fetti.tiltAngle += 0.1;
        fetti.tiltSin = Math.sin(fetti.tiltAngle);
        fetti.tiltCos = Math.cos(fetti.tiltAngle);
        fetti.random = Math.random() + 2;
      }
      var progress = fetti.tick++ / fetti.totalTicks;
      var x1 = fetti.x + fetti.random * fetti.tiltCos;
      var y1 = fetti.y + fetti.random * fetti.tiltSin;
      var x2 = fetti.wobbleX + fetti.random * fetti.tiltCos;
      var y2 = fetti.wobbleY + fetti.random * fetti.tiltSin;
      context.fillStyle = "rgba(" + fetti.color.r + ", " + fetti.color.g + ", " + fetti.color.b + ", " + (1 - progress) + ")";
      context.beginPath();
      if (canUsePaths && fetti.shape.type === "path" && typeof fetti.shape.path === "string" && Array.isArray(fetti.shape.matrix)) {
        context.fill(transformPath2D(
          fetti.shape.path,
          fetti.shape.matrix,
          fetti.x,
          fetti.y,
          Math.abs(x2 - x1) * 0.1,
          Math.abs(y2 - y1) * 0.1,
          Math.PI / 10 * fetti.wobble
        ));
      } else if (fetti.shape.type === "bitmap") {
        var rotation = Math.PI / 10 * fetti.wobble;
        var scaleX = Math.abs(x2 - x1) * 0.1;
        var scaleY = Math.abs(y2 - y1) * 0.1;
        var width = fetti.shape.bitmap.width * fetti.scalar;
        var height = fetti.shape.bitmap.height * fetti.scalar;
        var matrix = new DOMMatrix([
          Math.cos(rotation) * scaleX,
          Math.sin(rotation) * scaleX,
          -Math.sin(rotation) * scaleY,
          Math.cos(rotation) * scaleY,
          fetti.x,
          fetti.y
        ]);
        matrix.multiplySelf(new DOMMatrix(fetti.shape.matrix));
        var pattern = context.createPattern(bitmapMapper.transform(fetti.shape.bitmap), "no-repeat");
        pattern.setTransform(matrix);
        context.globalAlpha = 1 - progress;
        context.fillStyle = pattern;
        context.fillRect(
          fetti.x - width / 2,
          fetti.y - height / 2,
          width,
          height
        );
        context.globalAlpha = 1;
      } else if (fetti.shape === "circle") {
        context.ellipse ? context.ellipse(fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI) : ellipse(context, fetti.x, fetti.y, Math.abs(x2 - x1) * fetti.ovalScalar, Math.abs(y2 - y1) * fetti.ovalScalar, Math.PI / 10 * fetti.wobble, 0, 2 * Math.PI);
      } else if (fetti.shape === "star") {
        var rot = Math.PI / 2 * 3;
        var innerRadius = 4 * fetti.scalar;
        var outerRadius = 8 * fetti.scalar;
        var x = fetti.x;
        var y = fetti.y;
        var spikes = 5;
        var step = Math.PI / spikes;
        while (spikes--) {
          x = fetti.x + Math.cos(rot) * outerRadius;
          y = fetti.y + Math.sin(rot) * outerRadius;
          context.lineTo(x, y);
          rot += step;
          x = fetti.x + Math.cos(rot) * innerRadius;
          y = fetti.y + Math.sin(rot) * innerRadius;
          context.lineTo(x, y);
          rot += step;
        }
      } else {
        context.moveTo(Math.floor(fetti.x), Math.floor(fetti.y));
        context.lineTo(Math.floor(fetti.wobbleX), Math.floor(y1));
        context.lineTo(Math.floor(x2), Math.floor(y2));
        context.lineTo(Math.floor(x1), Math.floor(fetti.wobbleY));
      }
      context.closePath();
      context.fill();
      return fetti.tick < fetti.totalTicks;
    }
    function animate(canvas, fettis, resizer, size, done) {
      var animatingFettis = fettis.slice();
      var context = canvas.getContext("2d");
      var animationFrame;
      var destroy;
      var prom = promise(function(resolve) {
        function onDone() {
          animationFrame = destroy = null;
          context.clearRect(0, 0, size.width, size.height);
          bitmapMapper.clear();
          done();
          resolve();
        }
        function update() {
          if (isWorker && !(size.width === workerSize.width && size.height === workerSize.height)) {
            size.width = canvas.width = workerSize.width;
            size.height = canvas.height = workerSize.height;
          }
          if (!size.width && !size.height) {
            resizer(canvas);
            size.width = canvas.width;
            size.height = canvas.height;
          }
          context.clearRect(0, 0, size.width, size.height);
          animatingFettis = animatingFettis.filter(function(fetti) {
            return updateFetti(context, fetti);
          });
          if (animatingFettis.length) {
            animationFrame = raf.frame(update);
          } else {
            onDone();
          }
        }
        animationFrame = raf.frame(update);
        destroy = onDone;
      });
      return {
        addFettis: function(fettis2) {
          animatingFettis = animatingFettis.concat(fettis2);
          return prom;
        },
        canvas,
        promise: prom,
        reset: function() {
          if (animationFrame) {
            raf.cancel(animationFrame);
          }
          if (destroy) {
            destroy();
          }
        }
      };
    }
    function confettiCannon(canvas, globalOpts) {
      var isLibCanvas = !canvas;
      var allowResize = !!prop(globalOpts || {}, "resize");
      var hasResizeEventRegistered = false;
      var globalDisableForReducedMotion = prop(globalOpts, "disableForReducedMotion", Boolean);
      var shouldUseWorker = canUseWorker && !!prop(globalOpts || {}, "useWorker");
      var worker = shouldUseWorker ? getWorker() : null;
      var resizer = isLibCanvas ? setCanvasWindowSize : setCanvasRectSize;
      var initialized = canvas && worker ? !!canvas.__confetti_initialized : false;
      var preferLessMotion = typeof matchMedia === "function" && matchMedia("(prefers-reduced-motion)").matches;
      var animationObj;
      function fireLocal(options, size, done) {
        var particleCount = prop(options, "particleCount", onlyPositiveInt);
        var angle = prop(options, "angle", Number);
        var spread = prop(options, "spread", Number);
        var startVelocity = prop(options, "startVelocity", Number);
        var decay = prop(options, "decay", Number);
        var gravity = prop(options, "gravity", Number);
        var drift = prop(options, "drift", Number);
        var colors = prop(options, "colors", colorsToRgb);
        var ticks = prop(options, "ticks", Number);
        var shapes = prop(options, "shapes");
        var scalar = prop(options, "scalar");
        var flat = !!prop(options, "flat");
        var origin = getOrigin(options);
        var temp = particleCount;
        var fettis = [];
        var startX = canvas.width * origin.x;
        var startY = canvas.height * origin.y;
        while (temp--) {
          fettis.push(
            randomPhysics({
              x: startX,
              y: startY,
              angle,
              spread,
              startVelocity,
              color: colors[temp % colors.length],
              shape: shapes[randomInt(0, shapes.length)],
              ticks,
              decay,
              gravity,
              drift,
              scalar,
              flat
            })
          );
        }
        if (animationObj) {
          return animationObj.addFettis(fettis);
        }
        animationObj = animate(canvas, fettis, resizer, size, done);
        return animationObj.promise;
      }
      function fire(options) {
        var disableForReducedMotion = globalDisableForReducedMotion || prop(options, "disableForReducedMotion", Boolean);
        var zIndex = prop(options, "zIndex", Number);
        if (disableForReducedMotion && preferLessMotion) {
          return promise(function(resolve) {
            resolve();
          });
        }
        if (isLibCanvas && animationObj) {
          canvas = animationObj.canvas;
        } else if (isLibCanvas && !canvas) {
          canvas = getCanvas(zIndex);
          document.body.appendChild(canvas);
        }
        if (allowResize && !initialized) {
          resizer(canvas);
        }
        var size = {
          width: canvas.width,
          height: canvas.height
        };
        if (worker && !initialized) {
          worker.init(canvas);
        }
        initialized = true;
        if (worker) {
          canvas.__confetti_initialized = true;
        }
        function onResize() {
          if (worker) {
            var obj = {
              getBoundingClientRect: function() {
                if (!isLibCanvas) {
                  return canvas.getBoundingClientRect();
                }
              }
            };
            resizer(obj);
            worker.postMessage({
              resize: {
                width: obj.width,
                height: obj.height
              }
            });
            return;
          }
          size.width = size.height = null;
        }
        function done() {
          animationObj = null;
          if (allowResize) {
            hasResizeEventRegistered = false;
            global.removeEventListener("resize", onResize);
          }
          if (isLibCanvas && canvas) {
            if (document.body.contains(canvas)) {
              document.body.removeChild(canvas);
            }
            canvas = null;
            initialized = false;
          }
        }
        if (allowResize && !hasResizeEventRegistered) {
          hasResizeEventRegistered = true;
          global.addEventListener("resize", onResize, false);
        }
        if (worker) {
          return worker.fire(options, size, done);
        }
        return fireLocal(options, size, done);
      }
      fire.reset = function() {
        if (worker) {
          worker.reset();
        }
        if (animationObj) {
          animationObj.reset();
        }
      };
      return fire;
    }
    var defaultFire;
    function getDefaultFire() {
      if (!defaultFire) {
        defaultFire = confettiCannon(null, { useWorker: true, resize: true });
      }
      return defaultFire;
    }
    function transformPath2D(pathString, pathMatrix, x, y, scaleX, scaleY, rotation) {
      var path2d = new Path2D(pathString);
      var t1 = new Path2D();
      t1.addPath(path2d, new DOMMatrix(pathMatrix));
      var t2 = new Path2D();
      t2.addPath(t1, new DOMMatrix([
        Math.cos(rotation) * scaleX,
        Math.sin(rotation) * scaleX,
        -Math.sin(rotation) * scaleY,
        Math.cos(rotation) * scaleY,
        x,
        y
      ]));
      return t2;
    }
    function shapeFromPath(pathData) {
      if (!canUsePaths) {
        throw new Error("path confetti are not supported in this browser");
      }
      var path, matrix;
      if (typeof pathData === "string") {
        path = pathData;
      } else {
        path = pathData.path;
        matrix = pathData.matrix;
      }
      var path2d = new Path2D(path);
      var tempCanvas = document.createElement("canvas");
      var tempCtx = tempCanvas.getContext("2d");
      if (!matrix) {
        var maxSize = 1e3;
        var minX = maxSize;
        var minY = maxSize;
        var maxX = 0;
        var maxY = 0;
        var width, height;
        for (var x = 0; x < maxSize; x += 2) {
          for (var y = 0; y < maxSize; y += 2) {
            if (tempCtx.isPointInPath(path2d, x, y, "nonzero")) {
              minX = Math.min(minX, x);
              minY = Math.min(minY, y);
              maxX = Math.max(maxX, x);
              maxY = Math.max(maxY, y);
            }
          }
        }
        width = maxX - minX;
        height = maxY - minY;
        var maxDesiredSize = 10;
        var scale = Math.min(maxDesiredSize / width, maxDesiredSize / height);
        matrix = [
          scale,
          0,
          0,
          scale,
          -Math.round(width / 2 + minX) * scale,
          -Math.round(height / 2 + minY) * scale
        ];
      }
      return {
        type: "path",
        path,
        matrix
      };
    }
    function shapeFromText(textData) {
      var text, scalar = 1, color = "#000000", fontFamily = '"Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji", "EmojiOne Color", "Android Emoji", "Twemoji Mozilla", "system emoji", sans-serif';
      if (typeof textData === "string") {
        text = textData;
      } else {
        text = textData.text;
        scalar = "scalar" in textData ? textData.scalar : scalar;
        fontFamily = "fontFamily" in textData ? textData.fontFamily : fontFamily;
        color = "color" in textData ? textData.color : color;
      }
      var fontSize = 10 * scalar;
      var font = "" + fontSize + "px " + fontFamily;
      var canvas = new OffscreenCanvas(fontSize, fontSize);
      var ctx = canvas.getContext("2d");
      ctx.font = font;
      var size = ctx.measureText(text);
      var width = Math.ceil(size.actualBoundingBoxRight + size.actualBoundingBoxLeft);
      var height = Math.ceil(size.actualBoundingBoxAscent + size.actualBoundingBoxDescent);
      var padding = 2;
      var x = size.actualBoundingBoxLeft + padding;
      var y = size.actualBoundingBoxAscent + padding;
      width += padding + padding;
      height += padding + padding;
      canvas = new OffscreenCanvas(width, height);
      ctx = canvas.getContext("2d");
      ctx.font = font;
      ctx.fillStyle = color;
      ctx.fillText(text, x, y);
      var scale = 1 / scalar;
      return {
        type: "bitmap",
        // TODO these probably need to be transfered for workers
        bitmap: canvas.transferToImageBitmap(),
        matrix: [scale, 0, 0, scale, -width * scale / 2, -height * scale / 2]
      };
    }
    module2.exports = function() {
      return getDefaultFire().apply(this, arguments);
    };
    module2.exports.reset = function() {
      getDefaultFire().reset();
    };
    module2.exports.create = confettiCannon;
    module2.exports.shapeFromPath = shapeFromPath;
    module2.exports.shapeFromText = shapeFromText;
  })((function() {
    if (typeof window !== "undefined") {
      return window;
    }
    if (typeof self !== "undefined") {
      return self;
    }
    return this || {};
  })(), module, false);
  var confetti_module_default = module.exports;
  var create = module.exports.create;

  // ../static_src/javascript/main.js
  var import_dist = __toESM(require_dist());
  document.documentElement.classList.add("js-enabled");
  var initScrollAnimations = () => {
    const animatedElements = document.querySelectorAll(". ");
    if (animatedElements.length === 0) return;
    const observerOptions = {
      threshold: 0.1,
      // Trigger when 10% of element is visible
      rootMargin: "0px 0px -50px 0px"
      // Trigger slightly before element enters viewport
    };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!entry.target.className.match(/animate-(fade|slide|scale|bounce|shake)/)) {
            entry.target.classList.add(" ");
          }
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);
    animatedElements.forEach((el) => observer.observe(el));
  };
  var shakeElement = (element) => {
    if (!element) return;
    element.classList.add("animate-shake");
    element.addEventListener("animationend", () => {
      element.classList.remove("animate-shake");
    }, { once: true });
  };
  var DEFAULT_CONFETTI_OPTIONS = {
    particleCount: 160,
    spread: 90,
    origin: { y: 0.6 }
  };
  var parseConfettiOptions = (attrValue) => {
    if (!attrValue) return {};
    try {
      return JSON.parse(attrValue);
    } catch (error) {
      console.warn("[Confetti] Invalid JSON options:", attrValue, error);
      return {};
    }
  };
  var runConfetti = (options = {}) => {
    const finalOptions = {
      ...DEFAULT_CONFETTI_OPTIONS,
      ...options,
      origin: {
        ...DEFAULT_CONFETTI_OPTIONS.origin,
        ...options.origin || {}
      }
    };
    confetti_module_default(finalOptions);
  };
  var initConfettiTriggers = () => {
    const triggers = document.querySelectorAll("[data-hs-confetti-trigger]");
    if (!triggers.length) return;
    triggers.forEach((trigger) => {
      const eventName = trigger.dataset.hsConfettiEvent || "click";
      const options = parseConfettiOptions(trigger.dataset.hsConfettiOptions);
      const shouldAutoload = trigger.dataset.hsConfettiAutoload === "true";
      const handler = () => runConfetti(options);
      trigger.addEventListener(eventName, handler);
      if (shouldAutoload) {
        handler();
      }
    });
  };
  var initStaggerAnimation = () => {
    const staggerContainers = document.querySelectorAll("[data-stagger]");
    staggerContainers.forEach((container) => {
      const children = container.children;
      Array.from(children).forEach((child, index) => {
        if (index < 5) {
          child.classList.add(`stagger-${index + 1}`);
        }
      });
    });
  };
  window.animationUtils = {
    shakeElement,
    initScrollAnimations,
    initStaggerAnimation,
    runConfetti,
    initConfettiTriggers
  };
  var reinitPreline = (components = null) => {
    if (window.HSStaticMethods && typeof window.HSStaticMethods.autoInit === "function") {
      if (components) {
        window.HSStaticMethods.autoInit(components);
      } else {
        window.HSStaticMethods.autoInit();
      }
    }
  };
  window.reinitPreline = reinitPreline;
  var initCustomUtilities = () => {
    initScrollAnimations();
    initStaggerAnimation();
    initConfettiTriggers();
  };
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", initCustomUtilities);
  } else {
    initCustomUtilities();
  }
})();
/*! Bundled license information:

preline/dist/index.js:
  (*
   * HSPinInput
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSStrongPassword
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSTogglePassword
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSDatepicker
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSTextareaAutoHeight
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSTabs
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSFileUpload
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSCarousel
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSInputNumber
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSRangeSlider
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*! name: vanilla-calendar-pro v3.0.4 | url: https://github.com/uvarov-frontend/vanilla-calendar-pro *)
  (*
   * HSCopyMarkup
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSSelect
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSCollapse
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSThemeSwitch
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSScrollNav
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSToggleCount
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSAccordion
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSScrollspy
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSTreeView
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSComboBox
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSLayoutSplitter
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSDataTable
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSOverlay
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSStepper
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSDropdown
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSRemoveElement
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSStaticMethods
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
  (*
   * HSTooltip
   * @version: 4.0.0
   * @author: Preline Labs Ltd.
   * @license: Licensed under MIT and Preline UI Fair Use License (https://preline.co/docs/license.html)
   * Copyright 2024 Preline Labs Ltd.
   *)
*/
//# sourceMappingURL=main.js.map
