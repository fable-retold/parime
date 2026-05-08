"use strict";

function _createForOfIteratorHelper(r, e) { var t = "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (!t) { if (Array.isArray(r) || (t = _unsupportedIterableToArray(r)) || e && r && "number" == typeof r.length) { t && (r = t); var _n = 0, F = function F() {}; return { s: F, n: function n() { return _n >= r.length ? { done: !0 } : { done: !1, value: r[_n++] }; }, e: function e(r) { throw r; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var o, a = !0, u = !1; return { s: function s() { t = t.call(r); }, n: function n() { var r = t.next(); return a = r.done, r; }, e: function e(r) { u = !0, o = r; }, f: function f() { try { a || null == t["return"] || t["return"](); } finally { if (u) throw o; } } }; }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _superPropGet(t, o, e, r) { var p = _get(_getPrototypeOf(1 & r ? t.prototype : t), o, e); return 2 & r && "function" == typeof p ? function (t) { return p.apply(e, t); } : p; }
function _get() { return _get = "undefined" != typeof Reflect && Reflect.get ? Reflect.get.bind() : function (e, t, r) { var p = _superPropBase(e, t); if (p) { var n = Object.getOwnPropertyDescriptor(p, t); return n.get ? n.get.call(arguments.length < 3 ? e : r) : n.value; } }, _get.apply(null, arguments); }
function _superPropBase(t, o) { for (; !{}.hasOwnProperty.call(t, o) && null !== (t = _getPrototypeOf(t));); return t; }
function _callSuper(t, o, e) { return o = _getPrototypeOf(o), _possibleConstructorReturn(t, _isNativeReflectConstruct() ? Reflect.construct(o, e || [], _getPrototypeOf(t).constructor) : o.apply(t, e)); }
function _possibleConstructorReturn(t, e) { if (e && ("object" == _typeof(e) || "function" == typeof e)) return e; if (void 0 !== e) throw new TypeError("Derived constructors may only return object or undefined"); return _assertThisInitialized(t); }
function _assertThisInitialized(e) { if (void 0 === e) throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); return e; }
function _isNativeReflectConstruct() { try { var t = !Boolean.prototype.valueOf.call(Reflect.construct(Boolean, [], function () {})); } catch (t) {} return (_isNativeReflectConstruct = function _isNativeReflectConstruct() { return !!t; })(); }
function _getPrototypeOf(t) { return _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf.bind() : function (t) { return t.__proto__ || Object.getPrototypeOf(t); }, _getPrototypeOf(t); }
function _inherits(t, e) { if ("function" != typeof e && null !== e) throw new TypeError("Super expression must either be null or a function"); t.prototype = Object.create(e && e.prototype, { constructor: { value: t, writable: !0, configurable: !0 } }), Object.defineProperty(t, "prototype", { writable: !1 }), e && _setPrototypeOf(t, e); }
function _setPrototypeOf(t, e) { return _setPrototypeOf = Object.setPrototypeOf ? Object.setPrototypeOf.bind() : function (t, e) { return t.__proto__ = e, t; }, _setPrototypeOf(t, e); }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
(function (f) {
  if ((typeof exports === "undefined" ? "undefined" : _typeof(exports)) === "object" && typeof module !== "undefined") {
    module.exports = f();
  } else if (typeof define === "function" && define.amd) {
    define([], f);
  } else {
    var g;
    if (typeof window !== "undefined") {
      g = window;
    } else if (typeof global !== "undefined") {
      g = global;
    } else if (typeof self !== "undefined") {
      g = self;
    } else {
      g = this;
    }
    g.ParimeManagement = f();
  }
})(function () {
  var define, module, exports;
  return function () {
    function r(e, n, t) {
      function o(i, f) {
        if (!n[i]) {
          if (!e[i]) {
            var c = "function" == typeof require && require;
            if (!f && c) return c(i, !0);
            if (u) return u(i, !0);
            var a = new Error("Cannot find module '" + i + "'");
            throw a.code = "MODULE_NOT_FOUND", a;
          }
          var p = n[i] = {
            exports: {}
          };
          e[i][0].call(p.exports, function (r) {
            var n = e[i][1][r];
            return o(n || r);
          }, p, p.exports, r, e, n, t);
        }
        return n[i].exports;
      }
      for (var u = "function" == typeof require && require, i = 0; i < t.length; i++) o(t[i]);
      return o;
    }
    return r;
  }()({
    1: [function (require, module, exports) {
      module.exports = {
        "name": "fable-serviceproviderbase",
        "version": "3.0.17",
        "description": "Simple base classes for fable services.",
        "main": "source/Fable-ServiceProviderBase.js",
        "scripts": {
          "start": "node source/Fable-ServiceProviderBase.js",
          "test": "npx mocha -u tdd -R spec",
          "tests": "npx mocha -u tdd --exit -R spec --grep",
          "coverage": "npx nyc --reporter=lcov --reporter=text-lcov npx mocha -- -u tdd -R spec",
          "build": "npx quack build",
          "types": "tsc -p ./tsconfig.build.json",
          "check": "tsc -p . --noEmit"
        },
        "types": "types/source/Fable-ServiceProviderBase.d.ts",
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        },
        "repository": {
          "type": "git",
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase.git"
        },
        "keywords": ["entity", "behavior"],
        "author": "Steven Velozo <steven@velozo.com> (http://velozo.com/)",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/fable-serviceproviderbase/issues"
        },
        "homepage": "https://github.com/stevenvelozo/fable-serviceproviderbase",
        "devDependencies": {
          "@types/mocha": "^10.0.10",
          "fable": "^3.1.51",
          "quackage": "^1.0.45",
          "typescript": "^5.9.3"
        }
      };
    }, {}],
    2: [function (require, module, exports) {
      /**
      * Fable Service Base
      * @author <steven@velozo.com>
      */

      var libPackage = require('../package.json');
      var FableServiceProviderBase = /*#__PURE__*/function () {
        /**
         * The constructor can be used in two ways:
         * 1) With a fable, options object and service hash (the options object and service hash are optional)a
         * 2) With an object or nothing as the first parameter, where it will be treated as the options object
         *
         * @param {import('fable')|Record<string, any>} [pFable] - (optional) The fable instance, or the options object if there is no fable
         * @param {Record<string, any>|string} [pOptions] - (optional) The options object, or the service hash if there is no fable
         * @param {string} [pServiceHash] - (optional) The service hash to identify this service instance
         */
        function FableServiceProviderBase(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, FableServiceProviderBase);
          /** @type {import('fable')} */
          this.fable;
          /** @type {string} */
          this.UUID;
          /** @type {Record<string, any>} */
          this.options;
          /** @type {Record<string, any>} */
          this.services;
          /** @type {Record<string, any>} */
          this.servicesMap;

          // Check if a fable was passed in; connect it if so
          if (_typeof(pFable) === 'object' && pFable.isFable) {
            this.connectFable(pFable);
          } else {
            this.fable = false;
          }

          // Initialize the services map if it wasn't passed in
          /** @type {Record<string, any>} */
          this._PackageFableServiceProvider = libPackage;

          // initialize options and UUID based on whether the fable was passed in or not.
          if (this.fable) {
            this.UUID = pFable.getUUID();
            this.options = _typeof(pOptions) === 'object' ? pOptions : {};
          } else {
            // With no fable, check to see if there was an object passed into either of the first two
            // Parameters, and if so, treat it as the options object
            this.options = _typeof(pFable) === 'object' && !pFable.isFable ? pFable : _typeof(pOptions) === 'object' ? pOptions : {};
            this.UUID = "CORE-SVC-".concat(Math.floor(Math.random() * (99999 - 10000) + 10000));
          }

          // It's expected that the deriving class will set this
          this.serviceType = "Unknown-".concat(this.UUID);

          // The service hash is used to identify the specific instantiation of the service in the services map
          this.Hash = typeof pServiceHash === 'string' ? pServiceHash : !this.fable && typeof pOptions === 'string' ? pOptions : "".concat(this.UUID);
        }

        /**
         * @param {import('fable')} pFable
         */
        return _createClass(FableServiceProviderBase, [{
          key: "connectFable",
          value: function connectFable(pFable) {
            if (_typeof(pFable) !== 'object' || !pFable.isFable) {
              var tmpErrorMessage = "Fable Service Provider Base: Cannot connect to Fable, invalid Fable object passed in.  The pFable parameter was a [".concat(_typeof(pFable), "].}");
              console.log(tmpErrorMessage);
              return new Error(tmpErrorMessage);
            }
            if (!this.fable) {
              this.fable = pFable;
            }
            if (!this.log) {
              this.log = this.fable.Logging;
            }
            if (!this.services) {
              this.services = this.fable.services;
            }
            if (!this.servicesMap) {
              this.servicesMap = this.fable.servicesMap;
            }
            return true;
          }
        }]);
      }();
      _defineProperty(FableServiceProviderBase, "isFableService", true);
      module.exports = FableServiceProviderBase;

      // This is left here in case we want to go back to having different code/base class for "core" services
      module.exports.CoreServiceProviderBase = FableServiceProviderBase;
    }, {
      "../package.json": 1
    }],
    3: [function (require, module, exports) {
      !function (t, n) {
        "object" == _typeof(exports) && "object" == _typeof(module) ? module.exports = n() : "function" == typeof define && define.amd ? define("Navigo", [], n) : "object" == _typeof(exports) ? exports.Navigo = n() : t.Navigo = n();
      }("undefined" != typeof self ? self : this, function () {
        return function () {
          "use strict";

          var t = {
              407: function _(t, n, e) {
                e.d(n, {
                  "default": function _default() {
                    return N;
                  }
                });
                var o = /([:*])(\w+)/g,
                  r = /\*/g,
                  i = /\/\?/g;
                function a(t) {
                  return void 0 === t && (t = "/"), v() ? location.pathname + location.search + location.hash : t;
                }
                function s(t) {
                  return t.replace(/\/+$/, "").replace(/^\/+/, "");
                }
                function c(t) {
                  return "string" == typeof t;
                }
                function u(t) {
                  return t && t.indexOf("#") >= 0 && t.split("#").pop() || "";
                }
                function h(t) {
                  var n = s(t).split(/\?(.*)?$/);
                  return [s(n[0]), n.slice(1).join("")];
                }
                function f(t) {
                  for (var n = {}, e = t.split("&"), o = 0; o < e.length; o++) {
                    var r = e[o].split("=");
                    if ("" !== r[0]) {
                      var i = decodeURIComponent(r[0]);
                      n[i] ? (Array.isArray(n[i]) || (n[i] = [n[i]]), n[i].push(decodeURIComponent(r[1] || ""))) : n[i] = decodeURIComponent(r[1] || "");
                    }
                  }
                  return n;
                }
                function l(t, n) {
                  var e,
                    a = h(s(t.currentLocationPath)),
                    l = a[0],
                    p = a[1],
                    d = "" === p ? null : f(p),
                    v = [];
                  if (c(n.path)) {
                    if (e = "(?:/^|^)" + s(n.path).replace(o, function (t, n, e) {
                      return v.push(e), "([^/]+)";
                    }).replace(r, "?(?:.*)").replace(i, "/?([^/]+|)") + "$", "" === s(n.path) && "" === s(l)) return {
                      url: l,
                      queryString: p,
                      hashString: u(t.to),
                      route: n,
                      data: null,
                      params: d
                    };
                  } else e = n.path;
                  var g = new RegExp(e, ""),
                    m = l.match(g);
                  if (m) {
                    var y = c(n.path) ? function (t, n) {
                      return 0 === n.length ? null : t ? t.slice(1, t.length).reduce(function (t, e, o) {
                        return null === t && (t = {}), t[n[o]] = decodeURIComponent(e), t;
                      }, null) : null;
                    }(m, v) : m.groups ? m.groups : m.slice(1);
                    return {
                      url: s(l.replace(new RegExp("^" + t.instance.root), "")),
                      queryString: p,
                      hashString: u(t.to),
                      route: n,
                      data: y,
                      params: d
                    };
                  }
                  return !1;
                }
                function p() {
                  return !("undefined" == typeof window || !window.history || !window.history.pushState);
                }
                function d(t, n) {
                  return void 0 === t[n] || !0 === t[n];
                }
                function v() {
                  return "undefined" != typeof window;
                }
                function g(t, n) {
                  return void 0 === t && (t = []), void 0 === n && (n = {}), t.filter(function (t) {
                    return t;
                  }).forEach(function (t) {
                    ["before", "after", "already", "leave"].forEach(function (e) {
                      t[e] && (n[e] || (n[e] = []), n[e].push(t[e]));
                    });
                  }), n;
                }
                function m(t, n, e) {
                  var o = n || {},
                    r = 0;
                  !function n() {
                    t[r] ? Array.isArray(t[r]) ? (t.splice.apply(t, [r, 1].concat(t[r][0](o) ? t[r][1] : t[r][2])), n()) : t[r](o, function (t) {
                      void 0 === t || !0 === t ? (r += 1, n()) : e && e(o);
                    }) : e && e(o);
                  }();
                }
                function y(t, n) {
                  void 0 === t.currentLocationPath && (t.currentLocationPath = t.to = a(t.instance.root)), t.currentLocationPath = t.instance._checkForAHash(t.currentLocationPath), n();
                }
                function _(t, n) {
                  for (var e = 0; e < t.instance.routes.length; e++) {
                    var o = l(t, t.instance.routes[e]);
                    if (o && (t.matches || (t.matches = []), t.matches.push(o), "ONE" === t.resolveOptions.strategy)) return void n();
                  }
                  n();
                }
                function k(t, n) {
                  t.navigateOptions && (void 0 !== t.navigateOptions.shouldResolve && console.warn('"shouldResolve" is deprecated. Please check the documentation.'), void 0 !== t.navigateOptions.silent && console.warn('"silent" is deprecated. Please check the documentation.')), n();
                }
                function O(t, n) {
                  !0 === t.navigateOptions.force ? (t.instance._setCurrent([t.instance._pathToMatchObject(t.to)]), n(!1)) : n();
                }
                m["if"] = function (t, n, e) {
                  return Array.isArray(n) || (n = [n]), Array.isArray(e) || (e = [e]), [t, n, e];
                };
                var w = v(),
                  L = p();
                function b(t, n) {
                  if (d(t.navigateOptions, "updateBrowserURL")) {
                    var e = ("/" + t.to).replace(/\/\//g, "/"),
                      o = w && t.resolveOptions && !0 === t.resolveOptions.hash;
                    L ? (history[t.navigateOptions.historyAPIMethod || "pushState"](t.navigateOptions.stateObj || {}, t.navigateOptions.title || "", o ? "#" + e : e), location && location.hash && (t.instance.__freezeListening = !0, setTimeout(function () {
                      if (!o) {
                        var n = location.hash;
                        location.hash = "", location.hash = n;
                      }
                      t.instance.__freezeListening = !1;
                    }, 1))) : w && (window.location.href = t.to);
                  }
                  n();
                }
                function A(t, n) {
                  var e = t.instance;
                  e.lastResolved() ? m(e.lastResolved().map(function (n) {
                    return function (e, o) {
                      if (n.route.hooks && n.route.hooks.leave) {
                        var r = !1,
                          i = t.instance.matchLocation(n.route.path, t.currentLocationPath, !1);
                        r = "*" !== n.route.path ? !i : !(t.matches && t.matches.find(function (t) {
                          return n.route.path === t.route.path;
                        })), d(t.navigateOptions, "callHooks") && r ? m(n.route.hooks.leave.map(function (n) {
                          return function (e, o) {
                            return n(function (n) {
                              !1 === n ? t.instance.__markAsClean(t) : o();
                            }, t.matches && t.matches.length > 0 ? 1 === t.matches.length ? t.matches[0] : t.matches : void 0);
                          };
                        }).concat([function () {
                          return o();
                        }])) : o();
                      } else o();
                    };
                  }), {}, function () {
                    return n();
                  }) : n();
                }
                function P(t, n) {
                  d(t.navigateOptions, "updateState") && t.instance._setCurrent(t.matches), n();
                }
                var R = [function (t, n) {
                    var e = t.instance.lastResolved();
                    if (e && e[0] && e[0].route === t.match.route && e[0].url === t.match.url && e[0].queryString === t.match.queryString) return e.forEach(function (n) {
                      n.route.hooks && n.route.hooks.already && d(t.navigateOptions, "callHooks") && n.route.hooks.already.forEach(function (n) {
                        return n(t.match);
                      });
                    }), void n(!1);
                    n();
                  }, function (t, n) {
                    t.match.route.hooks && t.match.route.hooks.before && d(t.navigateOptions, "callHooks") ? m(t.match.route.hooks.before.map(function (n) {
                      return function (e, o) {
                        return n(function (n) {
                          !1 === n ? t.instance.__markAsClean(t) : o();
                        }, t.match);
                      };
                    }).concat([function () {
                      return n();
                    }])) : n();
                  }, function (t, n) {
                    d(t.navigateOptions, "callHandler") && t.match.route.handler(t.match), t.instance.updatePageLinks(), n();
                  }, function (t, n) {
                    t.match.route.hooks && t.match.route.hooks.after && d(t.navigateOptions, "callHooks") && t.match.route.hooks.after.forEach(function (n) {
                      return n(t.match);
                    }), n();
                  }],
                  S = [A, function (t, n) {
                    var e = t.instance._notFoundRoute;
                    if (e) {
                      t.notFoundHandled = !0;
                      var o = h(t.currentLocationPath),
                        r = o[0],
                        i = o[1],
                        a = u(t.to);
                      e.path = s(r);
                      var c = {
                        url: e.path,
                        queryString: i,
                        hashString: a,
                        data: null,
                        route: e,
                        params: "" !== i ? f(i) : null
                      };
                      t.matches = [c], t.match = c;
                    }
                    n();
                  }, m["if"](function (t) {
                    return t.notFoundHandled;
                  }, R.concat([P]), [function (t, n) {
                    t.resolveOptions && !1 !== t.resolveOptions.noMatchWarning && void 0 !== t.resolveOptions.noMatchWarning || console.warn('Navigo: "' + t.currentLocationPath + "\" didn't match any of the registered routes."), n();
                  }, function (t, n) {
                    t.instance._setCurrent(null), n();
                  }])];
                function E() {
                  return (E = Object.assign || function (t) {
                    for (var n = 1; n < arguments.length; n++) {
                      var e = arguments[n];
                      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    }
                    return t;
                  }).apply(this, arguments);
                }
                function x(t, n) {
                  var e = 0;
                  A(t, function o() {
                    e !== t.matches.length ? m(R, E({}, t, {
                      match: t.matches[e]
                    }), function () {
                      e += 1, o();
                    }) : P(t, n);
                  });
                }
                function H(t) {
                  t.instance.__markAsClean(t);
                }
                function j() {
                  return (j = Object.assign || function (t) {
                    for (var n = 1; n < arguments.length; n++) {
                      var e = arguments[n];
                      for (var o in e) Object.prototype.hasOwnProperty.call(e, o) && (t[o] = e[o]);
                    }
                    return t;
                  }).apply(this, arguments);
                }
                var C = "[data-navigo]";
                function N(t, n) {
                  var e,
                    o = n || {
                      strategy: "ONE",
                      hash: !1,
                      noMatchWarning: !1,
                      linksSelector: C
                    },
                    r = this,
                    i = "/",
                    d = null,
                    w = [],
                    L = !1,
                    A = p(),
                    P = v();
                  function R(t) {
                    return t.indexOf("#") >= 0 && (t = !0 === o.hash ? t.split("#")[1] || "/" : t.split("#")[0]), t;
                  }
                  function E(t) {
                    return s(i + "/" + s(t));
                  }
                  function N(t, n, e, o) {
                    return t = c(t) ? E(t) : t, {
                      name: o || s(String(t)),
                      path: t,
                      handler: n,
                      hooks: g(e)
                    };
                  }
                  function U(t, n) {
                    if (!r.__dirty) {
                      r.__dirty = !0, t = t ? s(i) + "/" + s(t) : void 0;
                      var e = {
                        instance: r,
                        to: t,
                        currentLocationPath: t,
                        navigateOptions: {},
                        resolveOptions: j({}, o, n)
                      };
                      return m([y, _, m["if"](function (t) {
                        var n = t.matches;
                        return n && n.length > 0;
                      }, x, S)], e, H), !!e.matches && e.matches;
                    }
                    r.__waiting.push(function () {
                      return r.resolve(t, n);
                    });
                  }
                  function q(t, n) {
                    if (r.__dirty) r.__waiting.push(function () {
                      return r.navigate(t, n);
                    });else {
                      r.__dirty = !0, t = s(i) + "/" + s(t);
                      var e = {
                        instance: r,
                        to: t,
                        navigateOptions: n || {},
                        resolveOptions: n && n.resolveOptions ? n.resolveOptions : o,
                        currentLocationPath: R(t)
                      };
                      m([k, O, _, m["if"](function (t) {
                        var n = t.matches;
                        return n && n.length > 0;
                      }, x, S), b, H], e, H);
                    }
                  }
                  function F() {
                    if (P) return (P ? [].slice.call(document.querySelectorAll(o.linksSelector || C)) : []).forEach(function (t) {
                      "false" !== t.getAttribute("data-navigo") && "_blank" !== t.getAttribute("target") ? t.hasListenerAttached || (t.hasListenerAttached = !0, t.navigoHandler = function (n) {
                        if ((n.ctrlKey || n.metaKey) && "a" === n.target.tagName.toLowerCase()) return !1;
                        var e = t.getAttribute("href");
                        if (null == e) return !1;
                        if (e.match(/^(http|https)/) && "undefined" != typeof URL) try {
                          var o = new URL(e);
                          e = o.pathname + o.search;
                        } catch (t) {}
                        var i = function (t) {
                          if (!t) return {};
                          var n,
                            e = t.split(","),
                            o = {};
                          return e.forEach(function (t) {
                            var e = t.split(":").map(function (t) {
                              return t.replace(/(^ +| +$)/g, "");
                            });
                            switch (e[0]) {
                              case "historyAPIMethod":
                                o.historyAPIMethod = e[1];
                                break;
                              case "resolveOptionsStrategy":
                                n || (n = {}), n.strategy = e[1];
                                break;
                              case "resolveOptionsHash":
                                n || (n = {}), n.hash = "true" === e[1];
                                break;
                              case "updateBrowserURL":
                              case "callHandler":
                              case "updateState":
                              case "force":
                                o[e[0]] = "true" === e[1];
                            }
                          }), n && (o.resolveOptions = n), o;
                        }(t.getAttribute("data-navigo-options"));
                        L || (n.preventDefault(), n.stopPropagation(), r.navigate(s(e), i));
                      }, t.addEventListener("click", t.navigoHandler)) : t.hasListenerAttached && t.removeEventListener("click", t.navigoHandler);
                    }), r;
                  }
                  function I(t, n, e) {
                    var o = w.find(function (n) {
                        return n.name === t;
                      }),
                      r = null;
                    if (o) {
                      if (r = o.path, n) for (var a in n) r = r.replace(":" + a, n[a]);
                      r = r.match(/^\//) ? r : "/" + r;
                    }
                    return r && e && !e.includeRoot && (r = r.replace(new RegExp("^/" + i), "")), r;
                  }
                  function M(t) {
                    var n = h(s(t)),
                      o = n[0],
                      r = n[1],
                      i = "" === r ? null : f(r);
                    return {
                      url: o,
                      queryString: r,
                      hashString: u(t),
                      route: N(o, function () {}, [e], o),
                      data: null,
                      params: i
                    };
                  }
                  function T(t, n, e) {
                    return "string" == typeof n && (n = z(n)), n ? (n.hooks[t] || (n.hooks[t] = []), n.hooks[t].push(e), function () {
                      n.hooks[t] = n.hooks[t].filter(function (t) {
                        return t !== e;
                      });
                    }) : (console.warn("Route doesn't exists: " + n), function () {});
                  }
                  function z(t) {
                    return "string" == typeof t ? w.find(function (n) {
                      return n.name === E(t);
                    }) : w.find(function (n) {
                      return n.handler === t;
                    });
                  }
                  t ? i = s(t) : console.warn('Navigo requires a root path in its constructor. If not provided will use "/" as default.'), this.root = i, this.routes = w, this.destroyed = L, this.current = d, this.__freezeListening = !1, this.__waiting = [], this.__dirty = !1, this.__markAsClean = function (t) {
                    t.instance.__dirty = !1, t.instance.__waiting.length > 0 && t.instance.__waiting.shift()();
                  }, this.on = function (t, n, o) {
                    var r = this;
                    return "object" != _typeof(t) || t instanceof RegExp ? ("function" == typeof t && (o = n, n = t, t = i), w.push(N(t, n, [e, o])), this) : (Object.keys(t).forEach(function (n) {
                      if ("function" == typeof t[n]) r.on(n, t[n]);else {
                        var o = t[n],
                          i = o.uses,
                          a = o.as,
                          s = o.hooks;
                        w.push(N(n, i, [e, s], a));
                      }
                    }), this);
                  }, this.off = function (t) {
                    return this.routes = w = w.filter(function (n) {
                      return c(t) ? s(n.path) !== s(t) : "function" == typeof t ? t !== n.handler : String(n.path) !== String(t);
                    }), this;
                  }, this.resolve = U, this.navigate = q, this.navigateByName = function (t, n, e) {
                    var o = I(t, n);
                    return null !== o && (q(o.replace(new RegExp("^/?" + i), ""), e), !0);
                  }, this.destroy = function () {
                    this.routes = w = [], A && window.removeEventListener("popstate", this.__popstateListener), this.destroyed = L = !0;
                  }, this.notFound = function (t, n) {
                    return r._notFoundRoute = N("*", t, [e, n], "__NOT_FOUND__"), this;
                  }, this.updatePageLinks = F, this.link = function (t) {
                    return "/" + i + "/" + s(t);
                  }, this.hooks = function (t) {
                    return e = t, this;
                  }, this.extractGETParameters = function (t) {
                    return h(R(t));
                  }, this.lastResolved = function () {
                    return d;
                  }, this.generate = I, this.getLinkPath = function (t) {
                    return t.getAttribute("href");
                  }, this.match = function (t) {
                    var n = {
                      instance: r,
                      currentLocationPath: t,
                      to: t,
                      navigateOptions: {},
                      resolveOptions: o
                    };
                    return _(n, function () {}), !!n.matches && n.matches;
                  }, this.matchLocation = function (t, n, e) {
                    void 0 === n || void 0 !== e && !e || (n = E(n));
                    var o = {
                      instance: r,
                      to: n,
                      currentLocationPath: n
                    };
                    return y(o, function () {}), "string" == typeof t && (t = void 0 === e || e ? E(t) : t), l(o, {
                      name: String(t),
                      path: t,
                      handler: function handler() {},
                      hooks: {}
                    }) || !1;
                  }, this.getCurrentLocation = function () {
                    return M(s(a(i)).replace(new RegExp("^" + i), ""));
                  }, this.addBeforeHook = T.bind(this, "before"), this.addAfterHook = T.bind(this, "after"), this.addAlreadyHook = T.bind(this, "already"), this.addLeaveHook = T.bind(this, "leave"), this.getRoute = z, this._pathToMatchObject = M, this._clean = s, this._checkForAHash = R, this._setCurrent = function (t) {
                    return d = r.current = t;
                  }, function () {
                    A && (this.__popstateListener = function () {
                      r.__freezeListening || U();
                    }, window.addEventListener("popstate", this.__popstateListener));
                  }.call(this), F.call(this);
                }
              }
            },
            n = {};
          function e(o) {
            if (n[o]) return n[o].exports;
            var r = n[o] = {
              exports: {}
            };
            return t[o](r, r.exports, e), r.exports;
          }
          return e.d = function (t, n) {
            for (var o in n) e.o(n, o) && !e.o(t, o) && Object.defineProperty(t, o, {
              enumerable: !0,
              get: n[o]
            });
          }, e.o = function (t, n) {
            return Object.prototype.hasOwnProperty.call(t, n);
          }, e(407);
        }()["default"];
      });
    }, {}],
    4: [function (require, module, exports) {
      module.exports = {
        "name": "pict-application",
        "version": "1.0.30",
        "description": "Application base class for a pict view-based application",
        "main": "source/Pict-Application.js",
        "scripts": {
          "test": "npx mocha -u tdd -R spec",
          "start": "node source/Pict-Application.js",
          "coverage": "npx nyc --reporter=lcov --reporter=text-lcov npx mocha -- -u tdd -R spec",
          "build": "npx quack build",
          "docker-dev-build": "docker build ./ -f Dockerfile_LUXURYCode -t pict-application-image:local",
          "docker-dev-run": "docker run -it -d --name pict-application-dev -p 30001:8080 -p 38086:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/pict-application\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" pict-application-image:local",
          "docker-dev-shell": "docker exec -it pict-application-dev /bin/bash",
          "tests": "npx mocha -u tdd --exit -R spec --grep",
          "lint": "eslint source/**",
          "types": "tsc -p ."
        },
        "types": "types/source/Pict-Application.d.ts",
        "repository": {
          "type": "git",
          "url": "git+https://github.com/stevenvelozo/pict-application.git"
        },
        "author": "steven velozo <steven@velozo.com>",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/pict-application/issues"
        },
        "homepage": "https://github.com/stevenvelozo/pict-application#readme",
        "devDependencies": {
          "@eslint/js": "^9.28.0",
          "browser-env": "^3.3.0",
          "eslint": "^9.28.0",
          "pict": "^1.0.343",
          "pict-provider": "^1.0.7",
          "pict-view": "^1.0.64",
          "quackage": "^1.0.45",
          "typescript": "^5.9.3"
        },
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        },
        "dependencies": {
          "fable-serviceproviderbase": "^3.0.15"
        }
      };
    }, {}],
    5: [function (require, module, exports) {
      var libFableServiceBase = require('fable-serviceproviderbase');
      var libPackage = require('../package.json');
      var defaultPictSettings = {
        Name: 'DefaultPictApplication',
        // The main "viewport" is the view that is used to host our application
        MainViewportViewIdentifier: 'Default-View',
        MainViewportRenderableHash: false,
        MainViewportDestinationAddress: false,
        MainViewportDefaultDataAddress: false,
        // Whether or not we should automatically render the main viewport and other autorender views after we initialize the pict application
        AutoSolveAfterInitialize: true,
        AutoRenderMainViewportViewAfterInitialize: true,
        AutoRenderViewsAfterInitialize: false,
        AutoLoginAfterInitialize: false,
        AutoLoadDataAfterLogin: false,
        ConfigurationOnlyViews: [],
        Manifests: {},
        // The prefix to prepend on all template destination hashes
        IdentifierAddressPrefix: 'PICT-'
      };

      /**
       * Base class for pict applications.
       */
      var PictApplication = /*#__PURE__*/function (_libFableServiceBase) {
        /**
         * @param {import('fable')} pFable
         * @param {Record<string, any>} [pOptions]
         * @param {string} [pServiceHash]
         */
        function PictApplication(pFable, pOptions, pServiceHash) {
          var _this;
          _classCallCheck(this, PictApplication);
          var tmpCarryOverConfiguration = _typeof(pFable.settings.PictApplicationConfiguration) === 'object' ? pFable.settings.PictApplicationConfiguration : {};
          var tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictSettings)), tmpCarryOverConfiguration, pOptions);
          _this = _callSuper(this, PictApplication, [pFable, tmpOptions, pServiceHash]);

          /** @type {any} */
          _this.options;
          /** @type {any} */
          _this.log;
          /** @type {import('pict') & import('fable')} */
          _this.fable;
          /** @type {string} */
          _this.UUID;
          /** @type {string} */
          _this.Hash;
          /**
           * @type {{ [key: string]: any }}
           */
          _this.servicesMap;
          _this.serviceType = 'PictApplication';
          /** @type {Record<string, any>} */
          _this._Package = libPackage;

          // Convenience and consistency naming
          _this.pict = _this.fable;
          // Wire in the essential Pict state
          /** @type {Record<string, any>} */
          _this.AppData = _this.fable.AppData;
          /** @type {Record<string, any>} */
          _this.Bundle = _this.fable.Bundle;

          /** @type {number} */
          _this.initializeTimestamp;
          /** @type {number} */
          _this.lastSolvedTimestamp;
          /** @type {number} */
          _this.lastLoginTimestamp;
          /** @type {number} */
          _this.lastMarshalFromViewsTimestamp;
          /** @type {number} */
          _this.lastMarshalToViewsTimestamp;
          /** @type {number} */
          _this.lastAutoRenderTimestamp;
          /** @type {number} */
          _this.lastLoadDataTimestamp;

          // Load all the manifests for the application
          var tmpManifestKeys = Object.keys(_this.options.Manifests);
          if (tmpManifestKeys.length > 0) {
            for (var i = 0; i < tmpManifestKeys.length; i++) {
              // Load each manifest
              var tmpManifestKey = tmpManifestKeys[i];
              _this.fable.instantiateServiceProvider('Manifest', _this.options.Manifests[tmpManifestKey], tmpManifestKey);
            }
          }
          return _this;
        }

        /* -------------------------------------------------------------------------- */
        /*                     Code Section: Solve All Views                          */
        /* -------------------------------------------------------------------------- */
        /**
         * @return {boolean}
         */
        _inherits(PictApplication, _libFableServiceBase);
        return _createClass(PictApplication, [{
          key: "onPreSolve",
          value: function onPreSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onPreSolve:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onPreSolveAsync",
          value: function onPreSolveAsync(fCallback) {
            this.onPreSolve();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onBeforeSolve",
          value: function onBeforeSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeSolve:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeSolveAsync",
          value: function onBeforeSolveAsync(fCallback) {
            this.onBeforeSolve();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onSolve",
          value: function onSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onSolve:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onSolveAsync",
          value: function onSolveAsync(fCallback) {
            this.onSolve();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "solve",
          value: function solve() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " executing solve() function..."));
            }

            // Walk through any loaded providers and solve them as well.
            var tmpLoadedProviders = Object.keys(this.pict.providers);
            var tmpProvidersToSolve = [];
            for (var i = 0; i < tmpLoadedProviders.length; i++) {
              var tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
              if (tmpProvider.options.AutoSolveWithApp) {
                tmpProvidersToSolve.push(tmpProvider);
              }
            }
            // Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpProvidersToSolve.sort(function (a, b) {
              return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal;
            });
            for (var _i = 0; _i < tmpProvidersToSolve.length; _i++) {
              tmpProvidersToSolve[_i].solve(tmpProvidersToSolve[_i]);
            }
            this.onBeforeSolve();
            // Now walk through any loaded views and initialize them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToSolve = [];
            for (var _i2 = 0; _i2 < tmpLoadedViews.length; _i2++) {
              var tmpView = this.pict.views[tmpLoadedViews[_i2]];
              if (tmpView.options.AutoInitialize) {
                tmpViewsToSolve.push(tmpView);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpViewsToSolve.sort(function (a, b) {
              return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
            });
            for (var _i3 = 0; _i3 < tmpViewsToSolve.length; _i3++) {
              tmpViewsToSolve[_i3].solve();
            }
            this.onSolve();
            this.onAfterSolve();
            this.lastSolvedTimestamp = this.fable.log.getTimeStamp();
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "solveAsync",
          value: function solveAsync(fCallback) {
            var _this2 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
            tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " solveAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this2.log.error("PictApp [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.Name, " solveAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            // Walk through any loaded providers and solve them as well.
            var tmpLoadedProviders = Object.keys(this.pict.providers);
            var tmpProvidersToSolve = [];
            for (var i = 0; i < tmpLoadedProviders.length; i++) {
              var tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
              if (tmpProvider.options.AutoSolveWithApp) {
                tmpProvidersToSolve.push(tmpProvider);
              }
            }
            // Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpProvidersToSolve.sort(function (a, b) {
              return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal;
            });
            for (var _i4 = 0; _i4 < tmpProvidersToSolve.length; _i4++) {
              tmpAnticipate.anticipate(tmpProvidersToSolve[_i4].solveAsync.bind(tmpProvidersToSolve[_i4]));
            }

            // Walk through any loaded views and solve them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToSolve = [];
            for (var _i5 = 0; _i5 < tmpLoadedViews.length; _i5++) {
              var tmpView = this.pict.views[tmpLoadedViews[_i5]];
              if (tmpView.options.AutoSolveWithApp) {
                tmpViewsToSolve.push(tmpView);
              }
            }
            // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpViewsToSolve.sort(function (a, b) {
              return a.options.AutoSolveOrdinal - b.options.AutoSolveOrdinal;
            });
            for (var _i6 = 0; _i6 < tmpViewsToSolve.length; _i6++) {
              tmpAnticipate.anticipate(tmpViewsToSolve[_i6].solveAsync.bind(tmpViewsToSolve[_i6]));
            }
            tmpAnticipate.anticipate(this.onSolveAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this2.pict.LogNoisiness > 2) {
                _this2.log.trace("PictApp [".concat(_this2.UUID, "]::[").concat(_this2.Hash, "] ").concat(_this2.options.Name, " solveAsync() complete."));
              }
              _this2.lastSolvedTimestamp = _this2.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onAfterSolve",
          value: function onAfterSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterSolve:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterSolveAsync",
          value: function onAfterSolveAsync(fCallback) {
            this.onAfterSolve();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Application Login                        */
          /* -------------------------------------------------------------------------- */

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeLoginAsync",
          value: function onBeforeLoginAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeLoginAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onLoginAsync",
          value: function onLoginAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onLoginAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "loginAsync",
          value: function loginAsync(fCallback) {
            var _this3 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
            var tmpCallback = fCallback;
            if (typeof tmpCallback !== 'function') {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " loginAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this3.log.error("PictApp [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.Name, " loginAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeLoginAsync.bind(this));
            tmpAnticipate.anticipate(this.onLoginAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterLoginAsync.bind(this));

            // check and see if we should automatically trigger a data load
            if (this.options.AutoLoadDataAfterLogin) {
              tmpAnticipate.anticipate(function (fNext) {
                if (!_this3.isLoggedIn()) {
                  return fNext();
                }
                if (_this3.pict.LogNoisiness > 1) {
                  _this3.log.trace("PictApp [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.Name, " auto loading data after login..."));
                }
                //TODO: should data load errors funnel here? this creates a weird coupling between login and data load callbacks
                _this3.loadDataAsync(function (pError) {
                  fNext(pError);
                });
              });
            }
            tmpAnticipate.wait(function (pError) {
              if (_this3.pict.LogNoisiness > 2) {
                _this3.log.trace("PictApp [".concat(_this3.UUID, "]::[").concat(_this3.Hash, "] ").concat(_this3.options.Name, " loginAsync() complete."));
              }
              _this3.lastLoginTimestamp = _this3.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * Check if the application state is logged in. Defaults to true. Override this method in your application based on login requirements.
           *
           * @return {boolean}
           */
        }, {
          key: "isLoggedIn",
          value: function isLoggedIn() {
            return true;
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterLoginAsync",
          value: function onAfterLoginAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterLoginAsync:"));
            }
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Application LoadData                     */
          /* -------------------------------------------------------------------------- */

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeLoadDataAsync",
          value: function onBeforeLoadDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeLoadDataAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onLoadDataAsync",
          value: function onLoadDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onLoadDataAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "loadDataAsync",
          value: function loadDataAsync(fCallback) {
            var _this4 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
            var tmpCallback = fCallback;
            if (typeof tmpCallback !== 'function') {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " loadDataAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this4.log.error("PictApp [".concat(_this4.UUID, "]::[").concat(_this4.Hash, "] ").concat(_this4.options.Name, " loadDataAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeLoadDataAsync.bind(this));

            // Walk through any loaded providers and load their data as well.
            var tmpLoadedProviders = Object.keys(this.pict.providers);
            var tmpProvidersToLoadData = [];
            for (var i = 0; i < tmpLoadedProviders.length; i++) {
              var tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
              if (tmpProvider.options.AutoLoadDataWithApp) {
                tmpProvidersToLoadData.push(tmpProvider);
              }
            }
            // Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpProvidersToLoadData.sort(function (a, b) {
              return a.options.AutoLoadDataOrdinal - b.options.AutoLoadDataOrdinal;
            });
            for (var _i7 = 0, _tmpProvidersToLoadDa = tmpProvidersToLoadData; _i7 < _tmpProvidersToLoadDa.length; _i7++) {
              var _tmpProvider = _tmpProvidersToLoadDa[_i7];
              tmpAnticipate.anticipate(_tmpProvider.onBeforeLoadDataAsync.bind(_tmpProvider));
            }
            tmpAnticipate.anticipate(this.onLoadDataAsync.bind(this));

            //TODO: think about ways to parallelize these
            for (var _i8 = 0, _tmpProvidersToLoadDa2 = tmpProvidersToLoadData; _i8 < _tmpProvidersToLoadDa2.length; _i8++) {
              var _tmpProvider2 = _tmpProvidersToLoadDa2[_i8];
              tmpAnticipate.anticipate(_tmpProvider2.onLoadDataAsync.bind(_tmpProvider2));
            }
            tmpAnticipate.anticipate(this.onAfterLoadDataAsync.bind(this));
            for (var _i9 = 0, _tmpProvidersToLoadDa3 = tmpProvidersToLoadData; _i9 < _tmpProvidersToLoadDa3.length; _i9++) {
              var _tmpProvider3 = _tmpProvidersToLoadDa3[_i9];
              tmpAnticipate.anticipate(_tmpProvider3.onAfterLoadDataAsync.bind(_tmpProvider3));
            }
            tmpAnticipate.wait(/** @param {Error} [pError] */
            function (pError) {
              if (_this4.pict.LogNoisiness > 2) {
                _this4.log.trace("PictApp [".concat(_this4.UUID, "]::[").concat(_this4.Hash, "] ").concat(_this4.options.Name, " loadDataAsync() complete."));
              }
              _this4.lastLoadDataTimestamp = _this4.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterLoadDataAsync",
          value: function onAfterLoadDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterLoadDataAsync:"));
            }
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Application SaveData                     */
          /* -------------------------------------------------------------------------- */

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeSaveDataAsync",
          value: function onBeforeSaveDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeSaveDataAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onSaveDataAsync",
          value: function onSaveDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onSaveDataAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "saveDataAsync",
          value: function saveDataAsync(fCallback) {
            var _this5 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
            var tmpCallback = fCallback;
            if (typeof tmpCallback !== 'function') {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " saveDataAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this5.log.error("PictApp [".concat(_this5.UUID, "]::[").concat(_this5.Hash, "] ").concat(_this5.options.Name, " saveDataAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeSaveDataAsync.bind(this));

            // Walk through any loaded providers and load their data as well.
            var tmpLoadedProviders = Object.keys(this.pict.providers);
            var tmpProvidersToSaveData = [];
            for (var i = 0; i < tmpLoadedProviders.length; i++) {
              var tmpProvider = this.pict.providers[tmpLoadedProviders[i]];
              if (tmpProvider.options.AutoSaveDataWithApp) {
                tmpProvidersToSaveData.push(tmpProvider);
              }
            }
            // Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
            tmpProvidersToSaveData.sort(function (a, b) {
              return a.options.AutoSaveDataOrdinal - b.options.AutoSaveDataOrdinal;
            });
            for (var _i0 = 0, _tmpProvidersToSaveDa = tmpProvidersToSaveData; _i0 < _tmpProvidersToSaveDa.length; _i0++) {
              var _tmpProvider4 = _tmpProvidersToSaveDa[_i0];
              tmpAnticipate.anticipate(_tmpProvider4.onBeforeSaveDataAsync.bind(_tmpProvider4));
            }
            tmpAnticipate.anticipate(this.onSaveDataAsync.bind(this));

            //TODO: think about ways to parallelize these
            for (var _i1 = 0, _tmpProvidersToSaveDa2 = tmpProvidersToSaveData; _i1 < _tmpProvidersToSaveDa2.length; _i1++) {
              var _tmpProvider5 = _tmpProvidersToSaveDa2[_i1];
              tmpAnticipate.anticipate(_tmpProvider5.onSaveDataAsync.bind(_tmpProvider5));
            }
            tmpAnticipate.anticipate(this.onAfterSaveDataAsync.bind(this));
            for (var _i10 = 0, _tmpProvidersToSaveDa3 = tmpProvidersToSaveData; _i10 < _tmpProvidersToSaveDa3.length; _i10++) {
              var _tmpProvider6 = _tmpProvidersToSaveDa3[_i10];
              tmpAnticipate.anticipate(_tmpProvider6.onAfterSaveDataAsync.bind(_tmpProvider6));
            }
            tmpAnticipate.wait(/** @param {Error} [pError] */
            function (pError) {
              if (_this5.pict.LogNoisiness > 2) {
                _this5.log.trace("PictApp [".concat(_this5.UUID, "]::[").concat(_this5.Hash, "] ").concat(_this5.options.Name, " saveDataAsync() complete."));
              }
              _this5.lastSaveDataTimestamp = _this5.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterSaveDataAsync",
          value: function onAfterSaveDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterSaveDataAsync:"));
            }
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Initialize Application                   */
          /* -------------------------------------------------------------------------- */
          /**
           * @return {boolean}
           */
        }, {
          key: "onBeforeInitialize",
          value: function onBeforeInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeInitialize:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeInitializeAsync",
          value: function onBeforeInitializeAsync(fCallback) {
            this.onBeforeInitialize();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onInitialize",
          value: function onInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onInitialize:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onInitializeAsync",
          value: function onInitializeAsync(fCallback) {
            this.onInitialize();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "initialize",
          value: function initialize() {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initialize:"));
            }
            if (!this.initializeTimestamp) {
              this.onBeforeInitialize();
              if ('ConfigurationOnlyViews' in this.options) {
                // Load all the configuration only views
                for (var i = 0; i < this.options.ConfigurationOnlyViews.length; i++) {
                  var tmpViewIdentifier = typeof this.options.ConfigurationOnlyViews[i].ViewIdentifier === 'undefined' ? "AutoView-".concat(this.fable.getUUID()) : this.options.ConfigurationOnlyViews[i].ViewIdentifier;
                  this.log.info("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " adding configuration only view: ").concat(tmpViewIdentifier));
                  this.pict.addView(tmpViewIdentifier, this.options.ConfigurationOnlyViews[i]);
                }
              }
              this.onInitialize();

              // Walk through any loaded providers and initialize them as well.
              var tmpLoadedProviders = Object.keys(this.pict.providers);
              var tmpProvidersToInitialize = [];
              for (var _i11 = 0; _i11 < tmpLoadedProviders.length; _i11++) {
                var tmpProvider = this.pict.providers[tmpLoadedProviders[_i11]];
                if (tmpProvider.options.AutoInitialize) {
                  tmpProvidersToInitialize.push(tmpProvider);
                }
              }
              // Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
              tmpProvidersToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i12 = 0; _i12 < tmpProvidersToInitialize.length; _i12++) {
                tmpProvidersToInitialize[_i12].initialize();
              }

              // Now walk through any loaded views and initialize them as well.
              var tmpLoadedViews = Object.keys(this.pict.views);
              var tmpViewsToInitialize = [];
              for (var _i13 = 0; _i13 < tmpLoadedViews.length; _i13++) {
                var tmpView = this.pict.views[tmpLoadedViews[_i13]];
                if (tmpView.options.AutoInitialize) {
                  tmpViewsToInitialize.push(tmpView);
                }
              }
              // Sort the views by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
              tmpViewsToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i14 = 0; _i14 < tmpViewsToInitialize.length; _i14++) {
                tmpViewsToInitialize[_i14].initialize();
              }
              this.onAfterInitialize();
              if (this.options.AutoSolveAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto solving after initialization..."));
                }
                // Solve the template synchronously
                this.solve();
              }
              // Now check and see if we should automatically render as well
              if (this.options.AutoRenderMainViewportViewAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto rendering after initialization..."));
                }
                // Render the template synchronously
                this.render();
              }
              this.initializeTimestamp = this.fable.log.getTimeStamp();
              this.onCompletionOfInitialize();
              return true;
            } else {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initialize called but initialization is already completed.  Aborting."));
              return false;
            }
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "initializeAsync",
          value: function initializeAsync(fCallback) {
            var _this6 = this;
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initializeAsync:"));
            }

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " initializeAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this6.log.error("PictApp [".concat(_this6.UUID, "]::[").concat(_this6.Hash, "] ").concat(_this6.options.Name, " initializeAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (!this.initializeTimestamp) {
              var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');
              if (this.pict.LogNoisiness > 3) {
                this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " beginning initialization..."));
              }
              if ('ConfigurationOnlyViews' in this.options) {
                // Load all the configuration only views
                for (var i = 0; i < this.options.ConfigurationOnlyViews.length; i++) {
                  var tmpViewIdentifier = typeof this.options.ConfigurationOnlyViews[i].ViewIdentifier === 'undefined' ? "AutoView-".concat(this.fable.getUUID()) : this.options.ConfigurationOnlyViews[i].ViewIdentifier;
                  this.log.info("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " adding configuration only view: ").concat(tmpViewIdentifier));
                  this.pict.addView(tmpViewIdentifier, this.options.ConfigurationOnlyViews[i]);
                }
              }
              tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));

              // Walk through any loaded providers and solve them as well.
              var tmpLoadedProviders = Object.keys(this.pict.providers);
              var tmpProvidersToInitialize = [];
              for (var _i15 = 0; _i15 < tmpLoadedProviders.length; _i15++) {
                var tmpProvider = this.pict.providers[tmpLoadedProviders[_i15]];
                if (tmpProvider.options.AutoInitialize) {
                  tmpProvidersToInitialize.push(tmpProvider);
                }
              }
              // Sort the providers by their priority (if they are all priority 0, it will end up being add order due to JSON Object Property Key order stuff)
              tmpProvidersToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i16 = 0; _i16 < tmpProvidersToInitialize.length; _i16++) {
                tmpAnticipate.anticipate(tmpProvidersToInitialize[_i16].initializeAsync.bind(tmpProvidersToInitialize[_i16]));
              }

              // Now walk through any loaded views and initialize them as well.
              // TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
              var tmpLoadedViews = Object.keys(this.pict.views);
              var tmpViewsToInitialize = [];
              for (var _i17 = 0; _i17 < tmpLoadedViews.length; _i17++) {
                var tmpView = this.pict.views[tmpLoadedViews[_i17]];
                if (tmpView.options.AutoInitialize) {
                  tmpViewsToInitialize.push(tmpView);
                }
              }
              // Sort the views by their priority
              // If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
              tmpViewsToInitialize.sort(function (a, b) {
                return a.options.AutoInitializeOrdinal - b.options.AutoInitializeOrdinal;
              });
              for (var _i18 = 0; _i18 < tmpViewsToInitialize.length; _i18++) {
                var _tmpView = tmpViewsToInitialize[_i18];
                tmpAnticipate.anticipate(_tmpView.initializeAsync.bind(_tmpView));
              }
              tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));
              if (this.options.AutoLoginAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto login (asynchronously) after initialization..."));
                }
                tmpAnticipate.anticipate(this.loginAsync.bind(this));
              }
              if (this.options.AutoSolveAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto solving (asynchronously) after initialization..."));
                }
                tmpAnticipate.anticipate(this.solveAsync.bind(this));
              }
              if (this.options.AutoRenderMainViewportViewAfterInitialize) {
                if (this.pict.LogNoisiness > 1) {
                  this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " auto rendering (asynchronously) after initialization..."));
                }
                tmpAnticipate.anticipate(this.renderMainViewportAsync.bind(this));
              }
              tmpAnticipate.wait(function (pError) {
                if (pError) {
                  _this6.log.error("PictApp [".concat(_this6.UUID, "]::[").concat(_this6.Hash, "] ").concat(_this6.options.Name, " initializeAsync Error: ").concat(pError.message || pError), {
                    stack: pError.stack
                  });
                }
                _this6.initializeTimestamp = _this6.fable.log.getTimeStamp();
                if (_this6.pict.LogNoisiness > 2) {
                  _this6.log.trace("PictApp [".concat(_this6.UUID, "]::[").concat(_this6.Hash, "] ").concat(_this6.options.Name, " initialization complete."));
                }
                return tmpCallback();
              });
            } else {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " async initialize called but initialization is already completed.  Aborting."));
              // TODO: Should this be an error?
              return this.onCompletionOfInitializeAsync(tmpCallback);
            }
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onAfterInitialize",
          value: function onAfterInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterInitialize:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterInitializeAsync",
          value: function onAfterInitializeAsync(fCallback) {
            this.onAfterInitialize();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onCompletionOfInitialize",
          value: function onCompletionOfInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onCompletionOfInitialize:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onCompletionOfInitializeAsync",
          value: function onCompletionOfInitializeAsync(fCallback) {
            this.onCompletionOfInitialize();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal Data From All Views              */
          /* -------------------------------------------------------------------------- */
          /**
           * @return {boolean}
           */
        }, {
          key: "onBeforeMarshalFromViews",
          value: function onBeforeMarshalFromViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeMarshalFromViews:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeMarshalFromViewsAsync",
          value: function onBeforeMarshalFromViewsAsync(fCallback) {
            this.onBeforeMarshalFromViews();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onMarshalFromViews",
          value: function onMarshalFromViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onMarshalFromViews:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onMarshalFromViewsAsync",
          value: function onMarshalFromViewsAsync(fCallback) {
            this.onMarshalFromViews();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "marshalFromViews",
          value: function marshalFromViews() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " executing marshalFromViews() function..."));
            }
            this.onBeforeMarshalFromViews();
            // Now walk through any loaded views and initialize them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalFromViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalFromViews.push(tmpView);
            }
            for (var _i19 = 0; _i19 < tmpViewsToMarshalFromViews.length; _i19++) {
              tmpViewsToMarshalFromViews[_i19].marshalFromView();
            }
            this.onMarshalFromViews();
            this.onAfterMarshalFromViews();
            this.lastMarshalFromViewsTimestamp = this.fable.log.getTimeStamp();
            return true;
          }

          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "marshalFromViewsAsync",
          value: function marshalFromViewsAsync(fCallback) {
            var _this7 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalFromViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this7.log.error("PictApp [".concat(_this7.UUID, "]::[").concat(_this7.Hash, "] ").concat(_this7.options.Name, " marshalFromViewsAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalFromViewsAsync.bind(this));
            // Walk through any loaded views and marshalFromViews them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalFromViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalFromViews.push(tmpView);
            }
            for (var _i20 = 0; _i20 < tmpViewsToMarshalFromViews.length; _i20++) {
              tmpAnticipate.anticipate(tmpViewsToMarshalFromViews[_i20].marshalFromViewAsync.bind(tmpViewsToMarshalFromViews[_i20]));
            }
            tmpAnticipate.anticipate(this.onMarshalFromViewsAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalFromViewsAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this7.pict.LogNoisiness > 2) {
                _this7.log.trace("PictApp [".concat(_this7.UUID, "]::[").concat(_this7.Hash, "] ").concat(_this7.options.Name, " marshalFromViewsAsync() complete."));
              }
              _this7.lastMarshalFromViewsTimestamp = _this7.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onAfterMarshalFromViews",
          value: function onAfterMarshalFromViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterMarshalFromViews:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterMarshalFromViewsAsync",
          value: function onAfterMarshalFromViewsAsync(fCallback) {
            this.onAfterMarshalFromViews();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal Data To All Views                */
          /* -------------------------------------------------------------------------- */
          /**
           * @return {boolean}
           */
        }, {
          key: "onBeforeMarshalToViews",
          value: function onBeforeMarshalToViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeMarshalToViews:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeMarshalToViewsAsync",
          value: function onBeforeMarshalToViewsAsync(fCallback) {
            this.onBeforeMarshalToViews();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onMarshalToViews",
          value: function onMarshalToViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onMarshalToViews:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onMarshalToViewsAsync",
          value: function onMarshalToViewsAsync(fCallback) {
            this.onMarshalToViews();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "marshalToViews",
          value: function marshalToViews() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " executing marshalToViews() function..."));
            }
            this.onBeforeMarshalToViews();
            // Now walk through any loaded views and initialize them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalToViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalToViews.push(tmpView);
            }
            for (var _i21 = 0; _i21 < tmpViewsToMarshalToViews.length; _i21++) {
              tmpViewsToMarshalToViews[_i21].marshalToView();
            }
            this.onMarshalToViews();
            this.onAfterMarshalToViews();
            this.lastMarshalToViewsTimestamp = this.fable.log.getTimeStamp();
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "marshalToViewsAsync",
          value: function marshalToViewsAsync(fCallback) {
            var _this8 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalToViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this8.log.error("PictApp [".concat(_this8.UUID, "]::[").concat(_this8.Hash, "] ").concat(_this8.options.Name, " marshalToViewsAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalToViewsAsync.bind(this));
            // Walk through any loaded views and marshalToViews them as well.
            var tmpLoadedViews = Object.keys(this.pict.views);
            var tmpViewsToMarshalToViews = [];
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              tmpViewsToMarshalToViews.push(tmpView);
            }
            for (var _i22 = 0; _i22 < tmpViewsToMarshalToViews.length; _i22++) {
              tmpAnticipate.anticipate(tmpViewsToMarshalToViews[_i22].marshalToViewAsync.bind(tmpViewsToMarshalToViews[_i22]));
            }
            tmpAnticipate.anticipate(this.onMarshalToViewsAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalToViewsAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this8.pict.LogNoisiness > 2) {
                _this8.log.trace("PictApp [".concat(_this8.UUID, "]::[").concat(_this8.Hash, "] ").concat(_this8.options.Name, " marshalToViewsAsync() complete."));
              }
              _this8.lastMarshalToViewsTimestamp = _this8.fable.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onAfterMarshalToViews",
          value: function onAfterMarshalToViews() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterMarshalToViews:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterMarshalToViewsAsync",
          value: function onAfterMarshalToViewsAsync(fCallback) {
            this.onAfterMarshalToViews();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Render View                              */
          /* -------------------------------------------------------------------------- */
          /**
           * @return {boolean}
           */
        }, {
          key: "onBeforeRender",
          value: function onBeforeRender() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onBeforeRender:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onBeforeRenderAsync",
          value: function onBeforeRenderAsync(fCallback) {
            this.onBeforeRender();
            return fCallback();
          }

          /**
           * @param {string} [pViewIdentifier] - The hash of the view to render. By default, the main viewport view is rendered.
           * @param {string} [pRenderableHash] - The hash of the renderable to render.
           * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string} [pTemplateDataAddress] - The address where the data for the template is stored.
           *
           * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
           */
        }, {
          key: "render",
          value: function render(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress) {
            var tmpViewIdentifier = typeof pViewIdentifier !== 'string' ? this.options.MainViewportViewIdentifier : pViewIdentifier;
            var tmpRenderableHash = typeof pRenderableHash !== 'string' ? this.options.MainViewportRenderableHash : pRenderableHash;
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress !== 'string' ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
            var tmpTemplateDataAddress = typeof pTemplateDataAddress !== 'string' ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " VIEW Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateDataAddress[").concat(tmpTemplateDataAddress, "] render:"));
            }
            this.onBeforeRender();

            // Now get the view (by hash) from the loaded views
            var tmpView = typeof tmpViewIdentifier === 'string' ? this.servicesMap.PictView[tmpViewIdentifier] : false;
            if (!tmpView) {
              this.log.error("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " could not render from View ").concat(tmpViewIdentifier, " because it is not a valid view."));
              return false;
            }
            this.onRender();
            tmpView.render(tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress);
            this.onAfterRender();
            return true;
          }
          /**
           * @return {boolean}
           */
        }, {
          key: "onRender",
          value: function onRender() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onRender:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onRenderAsync",
          value: function onRenderAsync(fCallback) {
            this.onRender();
            return fCallback();
          }

          /**
           * @param {string|((error?: Error) => void)} pViewIdentifier - The hash of the view to render. By default, the main viewport view is rendered. (or the callback)
           * @param {string|((error?: Error) => void)} [pRenderableHash] - The hash of the renderable to render. (or the callback)
           * @param {string|((error?: Error) => void)} [pRenderDestinationAddress] - The address where the renderable will be rendered. (or the callback)
           * @param {string|((error?: Error) => void)} [pTemplateDataAddress] - The address where the data for the template is stored. (or the callback)
           * @param {(error?: Error) => void} [fCallback] - The callback, if all other parameters are provided.
           *
           * TODO: Should we support objects for pTemplateDataAddress for parity with pict-view?
           */
        }, {
          key: "renderAsync",
          value: function renderAsync(pViewIdentifier, pRenderableHash, pRenderDestinationAddress, pTemplateDataAddress, fCallback) {
            var _this9 = this;
            var tmpViewIdentifier = typeof pViewIdentifier !== 'string' ? this.options.MainViewportViewIdentifier : pViewIdentifier;
            var tmpRenderableHash = typeof pRenderableHash !== 'string' ? this.options.MainViewportRenderableHash : pRenderableHash;
            var tmpRenderDestinationAddress = typeof pRenderDestinationAddress !== 'string' ? this.options.MainViewportDestinationAddress : pRenderDestinationAddress;
            var tmpTemplateDataAddress = typeof pTemplateDataAddress !== 'string' ? this.options.MainViewportDefaultDataAddress : pTemplateDataAddress;

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : typeof pTemplateDataAddress === 'function' ? pTemplateDataAddress : typeof pRenderDestinationAddress === 'function' ? pRenderDestinationAddress : typeof pRenderableHash === 'function' ? pRenderableHash : typeof pViewIdentifier === 'function' ? pViewIdentifier : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this9.log.error("PictApp [".concat(_this9.UUID, "]::[").concat(_this9.Hash, "] ").concat(_this9.options.Name, " renderAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " VIEW Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderDestinationAddress, "] TemplateDataAddress[").concat(tmpTemplateDataAddress, "] renderAsync:"));
            }
            var tmpRenderAnticipate = this.fable.newAnticipate();
            tmpRenderAnticipate.anticipate(this.onBeforeRenderAsync.bind(this));
            var tmpView = typeof tmpViewIdentifier === 'string' ? this.servicesMap.PictView[tmpViewIdentifier] : false;
            if (!tmpView) {
              var tmpErrorMessage = "PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " could not asynchronously render from View ").concat(tmpViewIdentifier, " because it is not a valid view.");
              if (this.pict.LogNoisiness > 3) {
                this.log.error(tmpErrorMessage);
              }
              return tmpCallback(new Error(tmpErrorMessage));
            }
            tmpRenderAnticipate.anticipate(this.onRenderAsync.bind(this));
            tmpRenderAnticipate.anticipate(function (fNext) {
              tmpView.renderAsync.call(tmpView, tmpRenderableHash, tmpRenderDestinationAddress, tmpTemplateDataAddress, fNext);
            });
            tmpRenderAnticipate.anticipate(this.onAfterRenderAsync.bind(this));
            return tmpRenderAnticipate.wait(tmpCallback);
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "onAfterRender",
          value: function onAfterRender() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " onAfterRender:"));
            }
            return true;
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "onAfterRenderAsync",
          value: function onAfterRenderAsync(fCallback) {
            this.onAfterRender();
            return fCallback();
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "renderMainViewport",
          value: function renderMainViewport() {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderMainViewport:"));
            }
            return this.render();
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "renderMainViewportAsync",
          value: function renderMainViewportAsync(fCallback) {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow APPLICATION [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderMainViewportAsync:"));
            }
            return this.renderAsync(fCallback);
          }
          /**
           * @return {void}
           */
        }, {
          key: "renderAutoViews",
          value: function renderAutoViews() {
            var _this0 = this;
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " beginning renderAutoViews..."));
            }
            // Now walk through any loaded views and sort them by the AutoRender ordinal
            var tmpLoadedViews = Object.keys(this.pict.views);
            // Sort the views by their priority
            // If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
            tmpLoadedViews.sort(function (a, b) {
              return _this0.pict.views[a].options.AutoRenderOrdinal - _this0.pict.views[b].options.AutoRenderOrdinal;
            });
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              if (tmpView.options.AutoRender) {
                tmpView.render();
              }
            }
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAutoViewsAsync complete."));
            }
          }
          /**
           * @param {(error?: Error) => void} fCallback
           */
        }, {
          key: "renderAutoViewsAsync",
          value: function renderAutoViewsAsync(fCallback) {
            var _this1 = this;
            var tmpAnticipate = this.fable.instantiateServiceProviderWithoutRegistration('Anticipate');

            // Allow the callback to be passed in as the last parameter no matter what
            var tmpCallback = typeof fCallback === 'function' ? fCallback : false;
            if (!tmpCallback) {
              this.log.warn("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAutoViewsAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this1.log.error("PictApp [".concat(_this1.UUID, "]::[").concat(_this1.Hash, "] ").concat(_this1.options.Name, " renderAutoViewsAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictApp [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " beginning renderAutoViewsAsync..."));
            }

            // Now walk through any loaded views and sort them by the AutoRender ordinal
            // TODO: Some optimization cleverness could be gained by grouping them into a parallelized async operation, by ordinal.
            var tmpLoadedViews = Object.keys(this.pict.views);
            // Sort the views by their priority
            // If they are all the default priority 0, it will end up being add order due to JSON Object Property Key order stuff
            tmpLoadedViews.sort(function (a, b) {
              return _this1.pict.views[a].options.AutoRenderOrdinal - _this1.pict.views[b].options.AutoRenderOrdinal;
            });
            for (var i = 0; i < tmpLoadedViews.length; i++) {
              var tmpView = this.pict.views[tmpLoadedViews[i]];
              if (tmpView.options.AutoRender) {
                tmpAnticipate.anticipate(tmpView.renderAsync.bind(tmpView));
              }
            }
            tmpAnticipate.wait(function (pError) {
              _this1.lastAutoRenderTimestamp = _this1.fable.log.getTimeStamp();
              if (_this1.pict.LogNoisiness > 0) {
                _this1.log.trace("PictApp [".concat(_this1.UUID, "]::[").concat(_this1.Hash, "] ").concat(_this1.options.Name, " renderAutoViewsAsync complete."));
              }
              return tmpCallback(pError);
            });
          }

          /**
           * @return {boolean}
           */
        }, {
          key: "isPictApplication",
          get: function get() {
            return true;
          }
        }]);
      }(libFableServiceBase);
      module.exports = PictApplication;
    }, {
      "../package.json": 4,
      "fable-serviceproviderbase": 2
    }],
    6: [function (require, module, exports) {
      module.exports = {
        "name": "pict-provider",
        "version": "1.0.9",
        "description": "Pict Provider Base Class",
        "main": "source/Pict-Provider.js",
        "scripts": {
          "start": "node source/Pict-Provider.js",
          "test": "npx mocha -u tdd -R spec",
          "tests": "npx mocha -u tdd --exit -R spec --grep",
          "coverage": "npx nyc --reporter=lcov --reporter=text-lcov npx mocha -- -u tdd -R spec",
          "build": "npx quack build",
          "docker-dev-build": "docker build ./ -f Dockerfile_LUXURYCode -t pict-provider-image:local",
          "docker-dev-run": "docker run -it -d --name pict-provider-dev -p 24125:8080 -p 30027:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/pict-provider\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" pict-provider-image:local",
          "docker-dev-shell": "docker exec -it pict-provider-dev /bin/bash",
          "lint": "eslint source/**",
          "types": "tsc -p ."
        },
        "types": "types/source/Pict-Provider.d.ts",
        "repository": {
          "type": "git",
          "url": "git+https://github.com/stevenvelozo/pict-provider.git"
        },
        "author": "steven velozo <steven@velozo.com>",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/pict-provider/issues"
        },
        "homepage": "https://github.com/stevenvelozo/pict-provider#readme",
        "devDependencies": {
          "@eslint/js": "^9.39.1",
          "eslint": "^9.39.1",
          "pict": "^1.0.345",
          "quackage": "^1.0.48",
          "typescript": "^5.9.3"
        },
        "dependencies": {
          "fable-serviceproviderbase": "^3.0.16"
        },
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        }
      };
    }, {}],
    7: [function (require, module, exports) {
      var libFableServiceBase = require('fable-serviceproviderbase');
      var libPackage = require('../package.json');
      var defaultPictProviderSettings = {
        ProviderIdentifier: false,
        // If this is set to true, when the App initializes this will.
        // After the App initializes, initialize will be called as soon as it's added.
        AutoInitialize: true,
        AutoInitializeOrdinal: 0,
        AutoLoadDataWithApp: true,
        AutoSolveWithApp: true,
        AutoSolveOrdinal: 0,
        Manifests: {},
        Templates: []
      };
      var PictProvider = /*#__PURE__*/function (_libFableServiceBase2) {
        /**
         * @param {import('fable')} pFable - The Fable instance.
         * @param {Record<string, any>} [pOptions] - The options for the provider.
         * @param {string} [pServiceHash] - The service hash for the provider.
         */
        function PictProvider(pFable, pOptions, pServiceHash) {
          var _this10;
          _classCallCheck(this, PictProvider);
          // Intersect default options, parent constructor, service information
          var tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictProviderSettings)), pOptions);
          _this10 = _callSuper(this, PictProvider, [pFable, tmpOptions, pServiceHash]);

          /** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */
          _this10.fable;
          /** @type {import('fable') & import('pict') & { instantiateServiceProviderWithoutRegistration(pServiceType: string, pOptions?: Record<string, any>, pCustomServiceHash?: string): any }} */
          _this10.pict;
          /** @type {any} */
          _this10.log;
          /** @type {Record<string, any>} */
          _this10.options;
          /** @type {string} */
          _this10.UUID;
          /** @type {string} */
          _this10.Hash;
          if (!_this10.options.ProviderIdentifier) {
            _this10.options.ProviderIdentifier = "AutoProviderID-".concat(_this10.fable.getUUID());
          }
          _this10.serviceType = 'PictProvider';
          /** @type {Record<string, any>} */
          _this10._Package = libPackage;

          // Convenience and consistency naming
          _this10.pict = _this10.fable;

          // Wire in the essential Pict application state
          /** @type {Record<string, any>} */
          _this10.AppData = _this10.pict.AppData;
          /** @type {Record<string, any>} */
          _this10.Bundle = _this10.pict.Bundle;
          _this10.initializeTimestamp = false;
          _this10.lastSolvedTimestamp = false;
          for (var i = 0; i < _this10.options.Templates.length; i++) {
            var tmpDefaultTemplate = _this10.options.Templates[i];
            if (!tmpDefaultTemplate.hasOwnProperty('Postfix') || !tmpDefaultTemplate.hasOwnProperty('Template')) {
              _this10.log.error("PictProvider [".concat(_this10.UUID, "]::[").concat(_this10.Hash, "] ").concat(_this10.options.ProviderIdentifier, " could not load Default Template ").concat(i, " in the options array."), tmpDefaultTemplate);
            } else {
              if (!tmpDefaultTemplate.Source) {
                tmpDefaultTemplate.Source = "PictProvider [".concat(_this10.UUID, "]::[").concat(_this10.Hash, "] ").concat(_this10.options.ProviderIdentifier, " options object.");
              }
              _this10.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
            }
          }
          return _this10;
        }

        /* -------------------------------------------------------------------------- */
        /*                        Code Section: Initialization                        */
        /* -------------------------------------------------------------------------- */
        _inherits(PictProvider, _libFableServiceBase2);
        return _createClass(PictProvider, [{
          key: "onBeforeInitialize",
          value: function onBeforeInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " onBeforeInitialize:"));
            }
            return true;
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after pre-pinitialization.
           *
           * @return {void}
           */
        }, {
          key: "onBeforeInitializeAsync",
          value: function onBeforeInitializeAsync(fCallback) {
            this.onBeforeInitialize();
            return fCallback();
          }
        }, {
          key: "onInitialize",
          value: function onInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " onInitialize:"));
            }
            return true;
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
           *
           * @return {void}
           */
        }, {
          key: "onInitializeAsync",
          value: function onInitializeAsync(fCallback) {
            this.onInitialize();
            return fCallback();
          }
        }, {
          key: "initialize",
          value: function initialize() {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow PROVIDER [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " initialize:"));
            }
            if (!this.initializeTimestamp) {
              this.onBeforeInitialize();
              this.onInitialize();
              this.onAfterInitialize();
              this.initializeTimestamp = this.pict.log.getTimeStamp();
              return true;
            } else {
              this.log.warn("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " initialize called but initialization is already completed.  Aborting."));
              return false;
            }
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
           *
           * @return {void}
           */
        }, {
          key: "initializeAsync",
          value: function initializeAsync(fCallback) {
            var _this11 = this;
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow PROVIDER [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " initializeAsync:"));
            }
            if (!this.initializeTimestamp) {
              var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');
              if (this.pict.LogNoisiness > 0) {
                this.log.info("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " beginning initialization..."));
              }
              tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));
              tmpAnticipate.wait(function (pError) {
                _this11.initializeTimestamp = _this11.pict.log.getTimeStamp();
                if (pError) {
                  _this11.log.error("PictProvider [".concat(_this11.UUID, "]::[").concat(_this11.Hash, "] ").concat(_this11.options.ProviderIdentifier, " initialization failed: ").concat(pError.message || pError), {
                    Stack: pError.stack
                  });
                } else if (_this11.pict.LogNoisiness > 0) {
                  _this11.log.info("PictProvider [".concat(_this11.UUID, "]::[").concat(_this11.Hash, "] ").concat(_this11.options.ProviderIdentifier, " initialization complete."));
                }
                return fCallback();
              });
            } else {
              this.log.warn("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " async initialize called but initialization is already completed.  Aborting."));
              // TODO: Should this be an error?
              return fCallback();
            }
          }
        }, {
          key: "onAfterInitialize",
          value: function onAfterInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " onAfterInitialize:"));
            }
            return true;
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after initialization.
           *
           * @return {void}
           */
        }, {
          key: "onAfterInitializeAsync",
          value: function onAfterInitializeAsync(fCallback) {
            this.onAfterInitialize();
            return fCallback();
          }
        }, {
          key: "onPreRender",
          value: function onPreRender() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " onPreRender:"));
            }
            return true;
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after pre-render.
           *
           * @return {void}
           */
        }, {
          key: "onPreRenderAsync",
          value: function onPreRenderAsync(fCallback) {
            this.onPreRender();
            return fCallback();
          }
        }, {
          key: "render",
          value: function render() {
            return this.onPreRender();
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after render.
           *
           * @return {void}
           */
        }, {
          key: "renderAsync",
          value: function renderAsync(fCallback) {
            this.onPreRender();
            return fCallback();
          }
        }, {
          key: "onPreSolve",
          value: function onPreSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " onPreSolve:"));
            }
            return true;
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after pre-solve.
           *
           * @return {void}
           */
        }, {
          key: "onPreSolveAsync",
          value: function onPreSolveAsync(fCallback) {
            this.onPreSolve();
            return fCallback();
          }
        }, {
          key: "solve",
          value: function solve() {
            return this.onPreSolve();
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after solve.
           *
           * @return {void}
           */
        }, {
          key: "solveAsync",
          value: function solveAsync(fCallback) {
            this.onPreSolve();
            return fCallback();
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
           */
        }, {
          key: "onBeforeLoadDataAsync",
          value: function onBeforeLoadDataAsync(fCallback) {
            return fCallback();
          }

          /**
           * Hook to allow the provider to load data during application data load.
           *
           * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
           */
        }, {
          key: "onLoadDataAsync",
          value: function onLoadDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " onLoadDataAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
           */
        }, {
          key: "onAfterLoadDataAsync",
          value: function onAfterLoadDataAsync(fCallback) {
            return fCallback();
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after the data pre-load.
           *
           * @return {void}
           */
        }, {
          key: "onBeforeSaveDataAsync",
          value: function onBeforeSaveDataAsync(fCallback) {
            return fCallback();
          }

          /**
           * Hook to allow the provider to load data during application data load.
           *
           * @param {(pError?: Error) => void} fCallback - The callback to call after the data load.
           *
           * @return {void}
           */
        }, {
          key: "onSaveDataAsync",
          value: function onSaveDataAsync(fCallback) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictProvider [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ProviderIdentifier, " onSaveDataAsync:"));
            }
            return fCallback();
          }

          /**
           * @param {(pError?: Error) => void} fCallback - The callback to call after the data post-load.
           *
           * @return {void}
           */
        }, {
          key: "onAfterSaveDataAsync",
          value: function onAfterSaveDataAsync(fCallback) {
            return fCallback();
          }
        }]);
      }(libFableServiceBase);
      module.exports = PictProvider;
    }, {
      "../package.json": 6,
      "fable-serviceproviderbase": 2
    }],
    8: [function (require, module, exports) {
      var libPictProvider = require('pict-provider');
      var libNavigo = require('navigo');
      var _DEFAULT_PROVIDER_CONFIGURATION = {
        ProviderIdentifier: 'Pict-Router',
        AutoInitialize: true,
        AutoInitializeOrdinal: 0
      };
      var PictRouter = /*#__PURE__*/function (_libPictProvider) {
        function PictRouter(pFable, pOptions, pServiceHash) {
          var _this12;
          _classCallCheck(this, PictRouter);
          var tmpOptions = Object.assign({}, _DEFAULT_PROVIDER_CONFIGURATION, pOptions);
          _this12 = _callSuper(this, PictRouter, [pFable, tmpOptions, pServiceHash]);

          // Initialize the navigo router and set the base path to '/'
          _this12.router = new libNavigo('/', {
            strategy: 'ONE',
            hash: true
          });
          if (_this12.options.Routes) {
            for (var i = 0; i < _this12.options.Routes.length; i++) {
              if (_this12.options.Routes[i].path && _this12.options.Routes[i].template) {
                _this12.addRoute(_this12.options.Routes[i].path, _this12.options.Routes[i].template);
              } else if (_this12.options.Routes[i].path && _this12.options.Routes[i].render) {
                _this12.addRoute(_this12.options.Routes[i].path, _this12.options.Routes[i].render);
              } else {
                _this12.pict.log.warn("Route ".concat(i, " is missing a render function or template string."));
              }
            }
          }

          // This is the route to render after load
          _this12.afterPersistView = '/Manyfest/Overview';
          return _this12;
        }
        _inherits(PictRouter, _libPictProvider);
        return _createClass(PictRouter, [{
          key: "currentScope",
          get: function get() {
            var _this$AppData$Manyfes, _this$AppData;
            return (_this$AppData$Manyfes = (_this$AppData = this.AppData) === null || _this$AppData === void 0 || (_this$AppData = _this$AppData.ManyfestRecord) === null || _this$AppData === void 0 ? void 0 : _this$AppData.Scope) !== null && _this$AppData$Manyfes !== void 0 ? _this$AppData$Manyfes : 'Default';
          }
        }, {
          key: "forwardToScopedRoute",
          value: function forwardToScopedRoute(pData) {
            this.navigate("".concat(pData.url, "/").concat(this.currentScope));
          }
        }, {
          key: "onInitializeAsync",
          value: function onInitializeAsync(fCallback) {
            return _superPropGet(PictRouter, "onInitializeAsync", this, 3)([fCallback]);
          }

          /**
           * Add a route to the router.
           */
        }, {
          key: "addRoute",
          value: function addRoute(pRoute, pRenderable) {
            var _this13 = this;
            if (typeof pRenderable === 'function') {
              this.router.on(pRoute, pRenderable);
              this.resolve();
            } else if (typeof pRenderable === 'string') {
              // Run this as a template, allowing some whack things with functions in template expressions.
              this.router.on(pRoute, function (pData) {
                _this13.pict.parseTemplate(pRenderable, pData, null, _this13.pict);
              });
              this.resolve();
            } else {
              // renderable isn't usable!
              this.pict.log.warn("Route ".concat(pRoute, " has an invalid renderable."));
            }
          }

          /**
           * Navigate to a given route (set the browser URL string, add to history, trigger router)
           * 
           * @param {string} pRoute - The route to navigate to
           */
        }, {
          key: "navigate",
          value: function navigate(pRoute) {
            this.router.navigate(pRoute);
          }

          /**
           * Trigger the router resolving logic; this is expected to be called after all routes are added (to go to the default route).
           *
           */
        }, {
          key: "resolve",
          value: function resolve() {
            this.router.resolve();
          }
        }]);
      }(libPictProvider);
      module.exports = PictRouter;
      module.exports.default_configuration = _DEFAULT_PROVIDER_CONFIGURATION;
    }, {
      "navigo": 3,
      "pict-provider": 7
    }],
    9: [function (require, module, exports) {
      module.exports = {
        "name": "pict-view",
        "version": "1.0.64",
        "description": "Pict View Base Class",
        "main": "source/Pict-View.js",
        "scripts": {
          "test": "mocha -u tdd -R spec",
          "tests": "mocha -u tdd -R spec -g",
          "start": "node source/Pict-View.js",
          "coverage": "nyc --reporter=lcov --reporter=text-lcov npm test",
          "build": "npx quack build",
          "docker-dev-build": "docker build ./ -f Dockerfile_LUXURYCode -t pict-view-image:local",
          "docker-dev-run": "docker run -it -d --name pict-view-dev -p 30001:8080 -p 38086:8086 -v \"$PWD/.config:/home/coder/.config\"  -v \"$PWD:/home/coder/pict-view\" -u \"$(id -u):$(id -g)\" -e \"DOCKER_USER=$USER\" pict-view-image:local",
          "docker-dev-shell": "docker exec -it pict-view-dev /bin/bash",
          "types": "tsc -p .",
          "lint": "eslint source/**"
        },
        "types": "types/source/Pict-View.d.ts",
        "repository": {
          "type": "git",
          "url": "git+https://github.com/stevenvelozo/pict-view.git"
        },
        "author": "steven velozo <steven@velozo.com>",
        "license": "MIT",
        "bugs": {
          "url": "https://github.com/stevenvelozo/pict-view/issues"
        },
        "homepage": "https://github.com/stevenvelozo/pict-view#readme",
        "devDependencies": {
          "@eslint/js": "^9.39.1",
          "browser-env": "^3.3.0",
          "eslint": "^9.39.1",
          "pict": "^1.0.337",
          "quackage": "^1.0.45",
          "typescript": "^5.9.3"
        },
        "mocha": {
          "diff": true,
          "extension": ["js"],
          "package": "./package.json",
          "reporter": "spec",
          "slow": "75",
          "timeout": "5000",
          "ui": "tdd",
          "watch-files": ["source/**/*.js", "test/**/*.js"],
          "watch-ignore": ["lib/vendor"]
        },
        "dependencies": {
          "fable": "^3.1.46",
          "fable-serviceproviderbase": "^3.0.15"
        }
      };
    }, {}],
    10: [function (require, module, exports) {
      var libFableServiceBase = require('fable-serviceproviderbase');
      var libPackage = require('../package.json');
      var defaultPictViewSettings = {
        DefaultRenderable: false,
        DefaultDestinationAddress: false,
        DefaultTemplateRecordAddress: false,
        ViewIdentifier: false,
        // If this is set to true, when the App initializes this will.
        // After the App initializes, initialize will be called as soon as it's added.
        AutoInitialize: true,
        AutoInitializeOrdinal: 0,
        // If this is set to true, when the App autorenders (on load) this will.
        // After the App initializes, render will be called as soon as it's added.
        AutoRender: true,
        AutoRenderOrdinal: 0,
        AutoSolveWithApp: true,
        AutoSolveOrdinal: 0,
        CSSHash: false,
        CSS: false,
        CSSProvider: false,
        CSSPriority: 500,
        Templates: [],
        DefaultTemplates: [],
        Renderables: [],
        Manifests: {}
      };

      /** @typedef {(error?: Error) => void} ErrorCallback */
      /** @typedef {number | boolean} PictTimestamp */

      /**
       * @typedef {'replace' | 'append' | 'prepend' | 'append_once' | 'virtual-assignment'} RenderMethod
       */
      /**
       * @typedef {Object} Renderable
       *
       * @property {string} RenderableHash - A unique hash for the renderable.
       * @property {string} TemplateHash - The hash of the template to use for rendering this renderable.
       * @property {string} [DefaultTemplateRecordAddress] - The default address for resolving the data record for this renderable.
       * @property {string} [ContentDestinationAddress] - The default address (DOM CSS selector) for rendering the content of this renderable.
       * @property {RenderMethod} [RenderMethod=replace] - The method to use when projecting the renderable to the DOM ('replace', 'append', 'prepend', 'append_once', 'virtual-assignment').
       * @property {string} [TestAddress] - The address to use for testing the renderable.
       * @property {string} [TransactionHash] - The transaction hash for the root renderable.
       * @property {string} [RootRenderableViewHash] - The hash of the root renderable.
       * @property {string} [Content] - The rendered content for this renderable, if applicable.
       */

      /**
       * Represents a view in the Pict ecosystem.
       */
      var PictView = /*#__PURE__*/function (_libFableServiceBase3) {
        /**
         * @param {any} pFable - The Fable object that this service is attached to.
         * @param {any} [pOptions] - (optional) The options for this service.
         * @param {string} [pServiceHash] - (optional) The hash of the service.
         */
        function PictView(pFable, pOptions, pServiceHash) {
          var _this14;
          _classCallCheck(this, PictView);
          // Intersect default options, parent constructor, service information
          var tmpOptions = Object.assign({}, JSON.parse(JSON.stringify(defaultPictViewSettings)), pOptions);
          _this14 = _callSuper(this, PictView, [pFable, tmpOptions, pServiceHash]);
          //FIXME: add types to fable and ancillaries
          /** @type {any} */
          _this14.fable;
          /** @type {any} */
          _this14.options;
          /** @type {String} */
          _this14.UUID;
          /** @type {String} */
          _this14.Hash;
          /** @type {any} */
          _this14.log;
          var tmpHashIsUUID = _this14.Hash === _this14.UUID;
          //NOTE: since many places are using the view UUID as the HTML element ID, we prefix it to avoid starting with a number
          _this14.UUID = "V-".concat(_this14.UUID);
          if (tmpHashIsUUID) {
            _this14.Hash = _this14.UUID;
          }
          if (!_this14.options.ViewIdentifier) {
            _this14.options.ViewIdentifier = "AutoViewID-".concat(_this14.fable.getUUID());
          }
          _this14.serviceType = 'PictView';
          /** @type {Record<string, any>} */
          _this14._Package = libPackage;
          // Convenience and consistency naming
          /** @type {import('pict') & { log: any, instantiateServiceProviderWithoutRegistration: (hash: String) => any, instantiateServiceProviderIfNotExists: (hash: string) => any, TransactionTracking: import('pict/types/source/services/Fable-Service-TransactionTracking') }} */
          _this14.pict = _this14.fable;
          // Wire in the essential Pict application state
          _this14.AppData = _this14.pict.AppData;
          _this14.Bundle = _this14.pict.Bundle;

          /** @type {PictTimestamp} */
          _this14.initializeTimestamp = false;
          /** @type {PictTimestamp} */
          _this14.lastSolvedTimestamp = false;
          /** @type {PictTimestamp} */
          _this14.lastRenderedTimestamp = false;
          /** @type {PictTimestamp} */
          _this14.lastMarshalFromViewTimestamp = false;
          /** @type {PictTimestamp} */
          _this14.lastMarshalToViewTimestamp = false;
          _this14.pict.instantiateServiceProviderIfNotExists('TransactionTracking');

          // Load all templates from the array in the options
          // Templates are in the form of {Hash:'Some-Template-Hash',Template:'Template content',Source:'TemplateSource'}
          for (var i = 0; i < _this14.options.Templates.length; i++) {
            var tmpTemplate = _this14.options.Templates[i];
            if (!('Hash' in tmpTemplate) || !('Template' in tmpTemplate)) {
              _this14.log.error("PictView [".concat(_this14.UUID, "]::[").concat(_this14.Hash, "] ").concat(_this14.options.ViewIdentifier, " could not load Template ").concat(i, " in the options array."), tmpTemplate);
            } else {
              if (!tmpTemplate.Source) {
                tmpTemplate.Source = "PictView [".concat(_this14.UUID, "]::[").concat(_this14.Hash, "] ").concat(_this14.options.ViewIdentifier, " options object.");
              }
              _this14.pict.TemplateProvider.addTemplate(tmpTemplate.Hash, tmpTemplate.Template, tmpTemplate.Source);
            }
          }

          // Load all default templates from the array in the options
          // Templates are in the form of {Prefix:'',Postfix:'-List-Row',Template:'Template content',Source:'TemplateSourceString'}
          for (var _i23 = 0; _i23 < _this14.options.DefaultTemplates.length; _i23++) {
            var tmpDefaultTemplate = _this14.options.DefaultTemplates[_i23];
            if (!('Postfix' in tmpDefaultTemplate) || !('Template' in tmpDefaultTemplate)) {
              _this14.log.error("PictView [".concat(_this14.UUID, "]::[").concat(_this14.Hash, "] ").concat(_this14.options.ViewIdentifier, " could not load Default Template ").concat(_i23, " in the options array."), tmpDefaultTemplate);
            } else {
              if (!tmpDefaultTemplate.Source) {
                tmpDefaultTemplate.Source = "PictView [".concat(_this14.UUID, "]::[").concat(_this14.Hash, "] ").concat(_this14.options.ViewIdentifier, " options object.");
              }
              _this14.pict.TemplateProvider.addDefaultTemplate(tmpDefaultTemplate.Prefix, tmpDefaultTemplate.Postfix, tmpDefaultTemplate.Template, tmpDefaultTemplate.Source);
            }
          }

          // Load the CSS if it's available
          if (_this14.options.CSS) {
            var tmpCSSHash = _this14.options.CSSHash ? _this14.options.CSSHash : "View-".concat(_this14.options.ViewIdentifier);
            var tmpCSSProvider = _this14.options.CSSProvider ? _this14.options.CSSProvider : tmpCSSHash;
            _this14.pict.CSSMap.addCSS(tmpCSSHash, _this14.options.CSS, tmpCSSProvider, _this14.options.CSSPriority);
          }

          // Load all renderables
          // Renderables are launchable renderable instructions with templates
          // They look as such: {Identifier:'ContentEntry', TemplateHash:'Content-Entry-Section-Main', ContentDestinationAddress:'#ContentSection', RecordAddress:'AppData.Content.DefaultText', ManifestTransformation:'ManyfestHash', ManifestDestinationAddress:'AppData.Content.DataToTransformContent'}
          // The only parts that are necessary are Identifier and Template
          // A developer can then do render('ContentEntry') and it just kinda works.  Or they can override the ContentDestinationAddress
          /** @type {Record<String, Renderable>} */
          _this14.renderables = {};
          for (var _i24 = 0; _i24 < _this14.options.Renderables.length; _i24++) {
            /** @type {Renderable} */
            var tmpRenderable = _this14.options.Renderables[_i24];
            _this14.addRenderable(tmpRenderable);
          }
          return _this14;
        }

        /**
         * Adds a renderable to the view.
         *
         * @param {string | Renderable} pRenderableHash - The hash of the renderable, or a renderable object.
         * @param {string} [pTemplateHash] - (optional) The hash of the template for the renderable.
         * @param {string} [pDefaultTemplateRecordAddress] - (optional) The default data address for the template.
         * @param {string} [pDefaultDestinationAddress] - (optional) The default destination address for the renderable.
         * @param {RenderMethod} [pRenderMethod=replace] - (optional) The method to use when rendering the renderable (ex. 'replace').
         */
        _inherits(PictView, _libFableServiceBase3);
        return _createClass(PictView, [{
          key: "addRenderable",
          value: function addRenderable(pRenderableHash, pTemplateHash, pDefaultTemplateRecordAddress, pDefaultDestinationAddress, pRenderMethod) {
            /** @type {Renderable} */
            var tmpRenderable;
            if (_typeof(pRenderableHash) == 'object') {
              // The developer passed in the renderable as an object.
              // Use theirs instead!
              tmpRenderable = pRenderableHash;
            } else {
              /** @type {RenderMethod} */
              var tmpRenderMethod = typeof pRenderMethod !== 'string' ? pRenderMethod : 'replace';
              tmpRenderable = {
                RenderableHash: pRenderableHash,
                TemplateHash: pTemplateHash,
                DefaultTemplateRecordAddress: pDefaultTemplateRecordAddress,
                ContentDestinationAddress: pDefaultDestinationAddress,
                RenderMethod: tmpRenderMethod
              };
            }
            if (typeof tmpRenderable.RenderableHash != 'string' || typeof tmpRenderable.TemplateHash != 'string') {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not load Renderable; RenderableHash or TemplateHash are invalid."), tmpRenderable);
            } else {
              if (this.pict.LogNoisiness > 0) {
                this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " adding renderable [").concat(tmpRenderable.RenderableHash, "] pointed to template ").concat(tmpRenderable.TemplateHash, "."));
              }
              this.renderables[tmpRenderable.RenderableHash] = tmpRenderable;
            }
          }

          /* -------------------------------------------------------------------------- */
          /*                        Code Section: Initialization                        */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before the view is initialized.
           */
        }, {
          key: "onBeforeInitialize",
          value: function onBeforeInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeInitialize:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before the view is initialized (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeInitializeAsync",
          value: function onBeforeInitializeAsync(fCallback) {
            this.onBeforeInitialize();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when the view is initialized.
           */
        }, {
          key: "onInitialize",
          value: function onInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onInitialize:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when the view is initialized (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onInitializeAsync",
          value: function onInitializeAsync(fCallback) {
            this.onInitialize();
            return fCallback();
          }

          /**
           * Performs view initialization.
           */
        }, {
          key: "initialize",
          value: function initialize() {
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initialize:"));
            }
            if (!this.initializeTimestamp) {
              this.onBeforeInitialize();
              this.onInitialize();
              this.onAfterInitialize();
              this.initializeTimestamp = this.pict.log.getTimeStamp();
              return true;
            } else {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initialize called but initialization is already completed.  Aborting."));
              return false;
            }
          }

          /**
           * Performs view initialization (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "initializeAsync",
          value: function initializeAsync(fCallback) {
            var _this15 = this;
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " initializeAsync:"));
            }
            if (!this.initializeTimestamp) {
              var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');
              if (this.pict.LogNoisiness > 0) {
                this.log.info("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " beginning initialization..."));
              }
              tmpAnticipate.anticipate(this.onBeforeInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onInitializeAsync.bind(this));
              tmpAnticipate.anticipate(this.onAfterInitializeAsync.bind(this));
              tmpAnticipate.wait(/** @param {Error} pError */
              function (pError) {
                if (pError) {
                  _this15.log.error("PictView [".concat(_this15.UUID, "]::[").concat(_this15.Hash, "] ").concat(_this15.options.ViewIdentifier, " initialization failed: ").concat(pError.message || pError), {
                    stack: pError.stack
                  });
                }
                _this15.initializeTimestamp = _this15.pict.log.getTimeStamp();
                if (_this15.pict.LogNoisiness > 0) {
                  _this15.log.info("PictView [".concat(_this15.UUID, "]::[").concat(_this15.Hash, "] ").concat(_this15.options.ViewIdentifier, " initialization complete."));
                }
                return fCallback();
              });
            } else {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " async initialize called but initialization is already completed.  Aborting."));
              // TODO: Should this be an error?
              return fCallback();
            }
          }
        }, {
          key: "onAfterInitialize",
          value: function onAfterInitialize() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterInitialize:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after the view is initialized (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterInitializeAsync",
          value: function onAfterInitializeAsync(fCallback) {
            this.onAfterInitialize();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                            Code Section: Render                            */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before the view is rendered.
           *
           * @param {Renderable} pRenderable - The renderable that will be rendered.
           */
        }, {
          key: "onBeforeRender",
          value: function onBeforeRender(pRenderable) {
            // Overload this to mess with stuff before the content gets generated from the template
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeRender:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before the view is rendered (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           * @param {Renderable} pRenderable - The renderable that will be rendered.
           */
        }, {
          key: "onBeforeRenderAsync",
          value: function onBeforeRenderAsync(fCallback, pRenderable) {
            this.onBeforeRender(pRenderable);
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers before the view is projected into the DOM.
           *
           * @param {Renderable} pRenderable - The renderable that will be projected.
           */
        }, {
          key: "onBeforeProject",
          value: function onBeforeProject(pRenderable) {
            // Overload this to mess with stuff before the content gets generated from the template
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeProject:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before the view is projected into the DOM (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           * @param {Renderable} pRenderable - The renderable that will be projected.
           */
        }, {
          key: "onBeforeProjectAsync",
          value: function onBeforeProjectAsync(fCallback, pRenderable) {
            this.onBeforeProject(pRenderable);
            return fCallback();
          }

          /**
           * Builds the render options for a renderable.
           *
           * For DRY purposes on the three flavors of render.
           *
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           */
        }, {
          key: "buildRenderOptions",
          value: function buildRenderOptions(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress) {
            var tmpRenderOptions = {
              Valid: true
            };
            tmpRenderOptions.RenderableHash = typeof pRenderableHash === 'string' ? pRenderableHash : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;
            if (!tmpRenderOptions.RenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not find a suitable RenderableHash ").concat(tmpRenderOptions.RenderableHash, " (param ").concat(pRenderableHash, "because it is not a valid renderable."));
              tmpRenderOptions.Valid = false;
            }
            tmpRenderOptions.Renderable = this.renderables[tmpRenderOptions.RenderableHash];
            if (!tmpRenderOptions.Renderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderOptions.RenderableHash, " (param ").concat(pRenderableHash, ") because it does not exist."));
              tmpRenderOptions.Valid = false;
            }
            tmpRenderOptions.DestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderOptions.Renderable.ContentDestinationAddress === 'string' ? tmpRenderOptions.Renderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : false;
            if (!tmpRenderOptions.DestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderOptions.RenderableHash, " (param ").concat(pRenderableHash, ") because it does not have a valid destination address (param ").concat(pRenderDestinationAddress, ")."));
              tmpRenderOptions.Valid = false;
            }
            if (_typeof(pTemplateRecordAddress) === 'object') {
              tmpRenderOptions.RecordAddress = 'Passed in as object';
              tmpRenderOptions.Record = pTemplateRecordAddress;
            } else {
              tmpRenderOptions.RecordAddress = typeof pTemplateRecordAddress === 'string' ? pTemplateRecordAddress : typeof tmpRenderOptions.Renderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderOptions.Renderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
              tmpRenderOptions.Record = typeof tmpRenderOptions.RecordAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpRenderOptions.RecordAddress) : undefined;
            }
            return tmpRenderOptions;
          }

          /**
           * Assigns the content to the destination address.
           *
           * For DRY purposes on the three flavors of render.
           *
           * @param {Renderable} pRenderable - The renderable to render.
           * @param {string} pRenderDestinationAddress - The address where the renderable will be rendered.
           * @param {string} pContent - The content to render.
           * @returns {boolean} - Returns true if the content was assigned successfully.
           * @memberof PictView
           */
        }, {
          key: "assignRenderContent",
          value: function assignRenderContent(pRenderable, pRenderDestinationAddress, pContent) {
            return this.pict.ContentAssignment.projectContent(pRenderable.RenderMethod, pRenderDestinationAddress, pContent, pRenderable.TestAddress);
          }

          /**
           * Render a renderable from this view.
           *
           * @param {string} [pRenderableHash] - The hash of the renderable to render.
           * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object} [pTemplateRecordAddress] - The address where the data for the template is stored.
           * @param {Renderable} [pRootRenderable] - The root renderable for the render operation, if applicable.
           * @return {boolean}
           */
        }, {
          key: "render",
          value: function render(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, pRootRenderable) {
            return this.renderWithScope(this, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, pRootRenderable);
          }

          /**
           * Render a renderable from this view, providing a specifici scope for the template.
           *
           * @param {any} pScope - The scope to use for the template rendering.
           * @param {string} [pRenderableHash] - The hash of the renderable to render.
           * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object} [pTemplateRecordAddress] - The address where the data for the template is stored.
           * @param {Renderable} [pRootRenderable] - The root renderable for the render operation, if applicable.
           * @return {boolean}
           */
        }, {
          key: "renderWithScope",
          value: function renderWithScope(pScope, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, pRootRenderable) {
            var tmpRenderableHash = typeof pRenderableHash === 'string' ? pRenderableHash : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;
            if (!tmpRenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it is not a valid renderable."));
              return false;
            }

            /** @type {Renderable} */
            var tmpRenderable;
            if (tmpRenderableHash == '__Virtual') {
              tmpRenderable = {
                RenderableHash: '__Virtual',
                TemplateHash: this.renderables[this.options.DefaultRenderable].TemplateHash,
                ContentDestinationAddress: typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : null,
                RenderMethod: 'virtual-assignment',
                TransactionHash: pRootRenderable && pRootRenderable.TransactionHash,
                RootRenderableViewHash: pRootRenderable && pRootRenderable.RootRenderableViewHash
              };
            } else {
              tmpRenderable = Object.assign({}, this.renderables[tmpRenderableHash]);
              tmpRenderable.ContentDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : null;
            }
            if (!tmpRenderable.TransactionHash) {
              tmpRenderable.TransactionHash = "ViewRender-V-".concat(this.options.ViewIdentifier, "-R-").concat(tmpRenderableHash, "-U-").concat(this.pict.getUUID());
              tmpRenderable.RootRenderableViewHash = this.Hash;
              this.pict.TransactionTracking.registerTransaction(tmpRenderable.TransactionHash);
            }
            if (!tmpRenderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not exist."));
              return false;
            }
            if (!tmpRenderable.ContentDestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not have a valid destination address."));
              return false;
            }
            var tmpRecordAddress;
            var tmpRecord;
            if (_typeof(pTemplateRecordAddress) === 'object') {
              tmpRecord = pTemplateRecordAddress;
              tmpRecordAddress = 'Passed in as object';
            } else {
              tmpRecordAddress = typeof pTemplateRecordAddress === 'string' ? pTemplateRecordAddress : typeof tmpRenderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
              tmpRecord = typeof tmpRecordAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpRecordAddress) : undefined;
            }

            // Execute the developer-overridable pre-render behavior
            this.onBeforeRender(tmpRenderable);
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderable.ContentDestinationAddress, "] TemplateRecordAddress[").concat(tmpRecordAddress, "] render:"));
            }
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Beginning Render of Renderable[").concat(tmpRenderableHash, "] to Destination [").concat(tmpRenderable.ContentDestinationAddress, "]..."));
            }
            // Generate the content output from the template and data
            tmpRenderable.Content = this.pict.parseTemplateByHash(tmpRenderable.TemplateHash, tmpRecord, null, [this], pScope, {
              RootRenderable: _typeof(pRootRenderable) === 'object' ? pRootRenderable : tmpRenderable
            });
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Assigning Renderable[").concat(tmpRenderableHash, "] content length ").concat(tmpRenderable.Content.length, " to Destination [").concat(tmpRenderable.ContentDestinationAddress, "] using render method [").concat(tmpRenderable.RenderMethod, "]."));
            }
            this.onBeforeProject(tmpRenderable);
            this.onProject(tmpRenderable);
            if (tmpRenderable.RenderMethod !== 'virtual-assignment') {
              this.onAfterProject(tmpRenderable);

              // Execute the developer-overridable post-render behavior
              this.onAfterRender(tmpRenderable);
            }
            return true;
          }

          /**
           * Render a renderable from this view.
           *
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address where the data for the template is stored.
           * @param {Renderable|ErrorCallback} [pRootRenderable] - The root renderable for the render operation, if applicable.
           * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
           *
           * @return {void}
           */
        }, {
          key: "renderAsync",
          value: function renderAsync(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, pRootRenderable, fCallback) {
            return this.renderWithScopeAsync(this, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, pRootRenderable, fCallback);
          }

          /**
           * Render a renderable from this view.
           *
           * @param {any} pScope - The scope to use for the template rendering.
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object|ErrorCallback} [pTemplateRecordAddress] - The address where the data for the template is stored.
           * @param {Renderable|ErrorCallback} [pRootRenderable] - The root renderable for the render operation, if applicable.
           * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
           *
           * @return {void}
           */
        }, {
          key: "renderWithScopeAsync",
          value: function renderWithScopeAsync(pScope, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, pRootRenderable, fCallback) {
            var _this16 = this;
            var tmpRenderableHash = typeof pRenderableHash === 'string' ? pRenderableHash : typeof this.options.DefaultRenderable == 'string' ? this.options.DefaultRenderable : false;

            // Allow the callback to be passed in as the last parameter no matter what
            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : typeof pTemplateRecordAddress === 'function' ? pTemplateRecordAddress : typeof pRenderDestinationAddress === 'function' ? pRenderDestinationAddress : typeof pRenderableHash === 'function' ? pRenderableHash : typeof pRootRenderable === 'function' ? pRootRenderable : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " renderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this16.log.error("PictView [".concat(_this16.UUID, "]::[").concat(_this16.Hash, "] ").concat(_this16.options.Name, " renderAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            if (!tmpRenderableHash) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, "because it is not a valid renderable."));
              return tmpCallback(new Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not asynchronously render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, "because it is not a valid renderable.")));
            }

            /** @type {Renderable} */
            var tmpRenderable;
            if (tmpRenderableHash == '__Virtual') {
              tmpRenderable = {
                RenderableHash: '__Virtual',
                TemplateHash: this.renderables[this.options.DefaultRenderable].TemplateHash,
                ContentDestinationAddress: typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : null,
                RenderMethod: 'virtual-assignment',
                TransactionHash: pRootRenderable && typeof pRootRenderable !== 'function' && pRootRenderable.TransactionHash,
                RootRenderableViewHash: pRootRenderable && typeof pRootRenderable !== 'function' && pRootRenderable.RootRenderableViewHash
              };
            } else {
              tmpRenderable = Object.assign({}, this.renderables[tmpRenderableHash]);
              tmpRenderable.ContentDestinationAddress = typeof pRenderDestinationAddress === 'string' ? pRenderDestinationAddress : typeof tmpRenderable.ContentDestinationAddress === 'string' ? tmpRenderable.ContentDestinationAddress : typeof this.options.DefaultDestinationAddress === 'string' ? this.options.DefaultDestinationAddress : null;
            }
            if (!tmpRenderable.TransactionHash) {
              tmpRenderable.TransactionHash = "ViewRender-V-".concat(this.options.ViewIdentifier, "-R-").concat(tmpRenderableHash, "-U-").concat(this.pict.getUUID());
              tmpRenderable.RootRenderableViewHash = this.Hash;
              this.pict.TransactionTracking.registerTransaction(tmpRenderable.TransactionHash);
            }
            if (!tmpRenderable) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not exist."));
              return tmpCallback(new Error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not exist.")));
            }
            if (!tmpRenderable.ContentDestinationAddress) {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not render ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it does not have a valid destination address."));
              return tmpCallback(new Error("Could not render ".concat(tmpRenderableHash)));
            }
            var tmpRecordAddress;
            var tmpRecord;
            if (_typeof(pTemplateRecordAddress) === 'object') {
              tmpRecord = pTemplateRecordAddress;
              tmpRecordAddress = 'Passed in as object';
            } else {
              tmpRecordAddress = typeof pTemplateRecordAddress === 'string' ? pTemplateRecordAddress : typeof tmpRenderable.DefaultTemplateRecordAddress === 'string' ? tmpRenderable.DefaultTemplateRecordAddress : typeof this.options.DefaultTemplateRecordAddress === 'string' ? this.options.DefaultTemplateRecordAddress : false;
              tmpRecord = typeof tmpRecordAddress === 'string' ? this.pict.DataProvider.getDataByAddress(tmpRecordAddress) : undefined;
            }
            if (this.pict.LogControlFlow) {
              this.log.trace("PICT-ControlFlow VIEW [".concat(this.UUID, "]::[").concat(this.Hash, "] Renderable[").concat(tmpRenderableHash, "] Destination[").concat(tmpRenderable.ContentDestinationAddress, "] TemplateRecordAddress[").concat(tmpRecordAddress, "] renderAsync:"));
            }
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Beginning Asynchronous Render (callback-style)..."));
            }
            var tmpAnticipate = this.fable.newAnticipate();
            tmpAnticipate.anticipate(function (fOnBeforeRenderCallback) {
              _this16.onBeforeRenderAsync(fOnBeforeRenderCallback, tmpRenderable);
            });
            tmpAnticipate.anticipate(function (fAsyncTemplateCallback) {
              // Render the template (asynchronously)
              _this16.pict.parseTemplateByHash(tmpRenderable.TemplateHash, tmpRecord, function (pError, pContent) {
                if (pError) {
                  _this16.log.error("PictView [".concat(_this16.UUID, "]::[").concat(_this16.Hash, "] ").concat(_this16.options.ViewIdentifier, " could not render (asynchronously) ").concat(tmpRenderableHash, " (param ").concat(pRenderableHash, ") because it did not parse the template."), pError);
                  return fAsyncTemplateCallback(pError);
                }
                tmpRenderable.Content = pContent;
                return fAsyncTemplateCallback();
              }, [_this16], pScope, {
                RootRenderable: _typeof(pRootRenderable) === 'object' ? pRootRenderable : tmpRenderable
              });
            });
            tmpAnticipate.anticipate(function (fNext) {
              _this16.onBeforeProjectAsync(fNext, tmpRenderable);
            });
            tmpAnticipate.anticipate(function (fNext) {
              _this16.onProjectAsync(fNext, tmpRenderable);
            });
            if (tmpRenderable.RenderMethod !== 'virtual-assignment') {
              tmpAnticipate.anticipate(function (fNext) {
                _this16.onAfterProjectAsync(fNext, tmpRenderable);
              });

              // Execute the developer-overridable post-render behavior
              tmpAnticipate.anticipate(function (fNext) {
                _this16.onAfterRenderAsync(fNext, tmpRenderable);
              });
            }
            tmpAnticipate.wait(tmpCallback);
          }

          /**
           * Renders the default renderable.
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "renderDefaultAsync",
          value: function renderDefaultAsync(fCallback) {
            // Render the default renderable
            this.renderAsync(fCallback);
          }

          /**
           * @param {string} [pRenderableHash] - The hash of the renderable to render.
           * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           */
        }, {
          key: "basicRender",
          value: function basicRender(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress) {
            return this.basicRenderWithScope(this, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress);
          }

          /**
           * @param {any} pScope - The scope to use for the template rendering.
           * @param {string} [pRenderableHash] - The hash of the renderable to render.
           * @param {string} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|object} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           */
        }, {
          key: "basicRenderWithScope",
          value: function basicRenderWithScope(pScope, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress) {
            var tmpRenderOptions = this.buildRenderOptions(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress);
            if (tmpRenderOptions.Valid) {
              this.assignRenderContent(tmpRenderOptions.Renderable, tmpRenderOptions.DestinationAddress, this.pict.parseTemplateByHash(tmpRenderOptions.Renderable.TemplateHash, tmpRenderOptions.Record, null, [this], pScope, {
                RootRenderable: tmpRenderOptions.Renderable
              }));
              return true;
            } else {
              this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not perform a basic render of ").concat(tmpRenderOptions.RenderableHash, " because it is not valid."));
              return false;
            }
          }

          /**
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|Object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
           */
        }, {
          key: "basicRenderAsync",
          value: function basicRenderAsync(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, fCallback) {
            return this.basicRenderWithScopeAsync(this, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, fCallback);
          }

          /**
           * @param {any} pScope - The scope to use for the template rendering.
           * @param {string|ErrorCallback} [pRenderableHash] - The hash of the renderable to render.
           * @param {string|ErrorCallback} [pRenderDestinationAddress] - The address where the renderable will be rendered.
           * @param {string|Object|ErrorCallback} [pTemplateRecordAddress] - The address of (or actual obejct) where the data for the template is stored.
           * @param {ErrorCallback} [fCallback] - The callback to call when the async operation is complete.
           */
        }, {
          key: "basicRenderWithScopeAsync",
          value: function basicRenderWithScopeAsync(pScope, pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress, fCallback) {
            var _this17 = this;
            // Allow the callback to be passed in as the last parameter no matter what
            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : typeof pTemplateRecordAddress === 'function' ? pTemplateRecordAddress : typeof pRenderDestinationAddress === 'function' ? pRenderDestinationAddress : typeof pRenderableHash === 'function' ? pRenderableHash : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " basicRenderAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this17.log.error("PictView [".concat(_this17.UUID, "]::[").concat(_this17.Hash, "] ").concat(_this17.options.Name, " basicRenderAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            var tmpRenderOptions = this.buildRenderOptions(pRenderableHash, pRenderDestinationAddress, pTemplateRecordAddress);
            if (tmpRenderOptions.Valid) {
              this.pict.parseTemplateByHash(tmpRenderOptions.Renderable.TemplateHash, tmpRenderOptions.Record,
              /**
               * @param {Error} [pError] - The error that occurred during template parsing.
               * @param {string} [pContent] - The content that was rendered from the template.
               */
              function (pError, pContent) {
                if (pError) {
                  _this17.log.error("PictView [".concat(_this17.UUID, "]::[").concat(_this17.Hash, "] ").concat(_this17.options.ViewIdentifier, " could not render (asynchronously) ").concat(tmpRenderOptions.RenderableHash, " because it did not parse the template."), pError);
                  return tmpCallback(pError);
                }
                _this17.assignRenderContent(tmpRenderOptions.Renderable, tmpRenderOptions.DestinationAddress, pContent);
                return tmpCallback();
              }, [this], pScope, {
                RootRenderable: tmpRenderOptions.Renderable
              });
            } else {
              var tmpErrorMessage = "PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " could not perform a basic render of ").concat(tmpRenderOptions.RenderableHash, " because it is not valid.");
              this.log.error(tmpErrorMessage);
              return tmpCallback(new Error(tmpErrorMessage));
            }
          }

          /**
           * @param {Renderable} pRenderable - The renderable that was rendered.
           */
        }, {
          key: "onProject",
          value: function onProject(pRenderable) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onProject:"));
            }
            if (pRenderable.RenderMethod === 'virtual-assignment') {
              this.pict.TransactionTracking.pushToTransactionQueue(pRenderable.TransactionHash, {
                ViewHash: this.Hash,
                Renderable: pRenderable
              }, 'Deferred-Post-Content-Assignment');
            }
            if (this.pict.LogNoisiness > 0) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " Assigning Renderable[").concat(pRenderable.RenderableHash, "] content length ").concat(pRenderable.Content.length, " to Destination [").concat(pRenderable.ContentDestinationAddress, "] using Async render method ").concat(pRenderable.RenderMethod, "."));
            }

            // Assign the content to the destination address
            this.pict.ContentAssignment.projectContent(pRenderable.RenderMethod, pRenderable.ContentDestinationAddress, pRenderable.Content, pRenderable.TestAddress);
            this.lastRenderedTimestamp = this.pict.log.getTimeStamp();
          }

          /**
           * Lifecycle hook that triggers after the view is projected into the DOM (async flow).
           *
           * @param {(error?: Error, content?: string) => void} fCallback - The callback to call when the async operation is complete.
           * @param {Renderable} pRenderable - The renderable that is being projected.
           */
        }, {
          key: "onProjectAsync",
          value: function onProjectAsync(fCallback, pRenderable) {
            this.onProject(pRenderable);
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers after the view is rendered.
           *
           * @param {Renderable} pRenderable - The renderable that was rendered.
           */
        }, {
          key: "onAfterRender",
          value: function onAfterRender(pRenderable) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterRender:"));
            }
            if (pRenderable && pRenderable.RootRenderableViewHash === this.Hash) {
              var tmpTransactionQueue = this.pict.TransactionTracking.clearTransactionQueue(pRenderable.TransactionHash) || [];
              var _iterator = _createForOfIteratorHelper(tmpTransactionQueue),
                _step;
              try {
                for (_iterator.s(); !(_step = _iterator.n()).done;) {
                  var tmpEvent = _step.value;
                  var tmpView = this.pict.views[tmpEvent.Data.ViewHash];
                  if (!tmpView) {
                    this.log.error("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterRender: Could not find view for transaction hash ").concat(pRenderable.TransactionHash, " and ViewHash ").concat(tmpEvent.Data.ViewHash, "."));
                    continue;
                  }
                  tmpView.onAfterProject();

                  // Execute the developer-overridable post-render behavior
                  tmpView.onAfterRender(tmpEvent.Data.Renderable);
                }
              } catch (err) {
                _iterator.e(err);
              } finally {
                _iterator.f();
              }
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after the view is rendered (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           * @param {Renderable} pRenderable - The renderable that was rendered.
           */
        }, {
          key: "onAfterRenderAsync",
          value: function onAfterRenderAsync(fCallback, pRenderable) {
            var _this18 = this;
            this.onAfterRender(pRenderable);
            var tmpAnticipate = this.fable.newAnticipate();
            if (pRenderable && pRenderable.RootRenderableViewHash === this.Hash) {
              var queue = this.pict.TransactionTracking.clearTransactionQueue(pRenderable.TransactionHash) || [];
              var _iterator2 = _createForOfIteratorHelper(queue),
                _step2;
              try {
                var _loop = function _loop() {
                  var event = _step2.value;
                  /** @type {PictView} */
                  var tmpView = _this18.pict.views[event.Data.ViewHash];
                  if (!tmpView) {
                    _this18.log.error("PictView [".concat(_this18.UUID, "]::[").concat(_this18.Hash, "] ").concat(_this18.options.ViewIdentifier, " onAfterRenderAsync: Could not find view for transaction hash ").concat(pRenderable.TransactionHash, " and ViewHash ").concat(event.Data.ViewHash, "."));
                    return 1; // continue
                  }
                  tmpAnticipate.anticipate(tmpView.onAfterProjectAsync.bind(tmpView));
                  tmpAnticipate.anticipate(function (fNext) {
                    tmpView.onAfterRenderAsync(fNext, event.Data.Renderable);
                  });

                  // Execute the developer-overridable post-render behavior
                };
                for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
                  if (_loop()) continue;
                }
              } catch (err) {
                _iterator2.e(err);
              } finally {
                _iterator2.f();
              }
            }
            return tmpAnticipate.wait(fCallback);
          }

          /**
           * Lifecycle hook that triggers after the view is projected into the DOM.
           *
           * @param {Renderable} pRenderable - The renderable that was projected.
           */
        }, {
          key: "onAfterProject",
          value: function onAfterProject(pRenderable) {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterProject:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after the view is projected into the DOM (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           * @param {Renderable} pRenderable - The renderable that was projected.
           */
        }, {
          key: "onAfterProjectAsync",
          value: function onAfterProjectAsync(fCallback, pRenderable) {
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                            Code Section: Solver                            */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before the view is solved.
           */
        }, {
          key: "onBeforeSolve",
          value: function onBeforeSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeSolve:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before the view is solved (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeSolveAsync",
          value: function onBeforeSolveAsync(fCallback) {
            this.onBeforeSolve();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when the view is solved.
           */
        }, {
          key: "onSolve",
          value: function onSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onSolve:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when the view is solved (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onSolveAsync",
          value: function onSolveAsync(fCallback) {
            this.onSolve();
            return fCallback();
          }

          /**
           * Performs view solving and triggers lifecycle hooks.
           *
           * @return {boolean} - True if the view was solved successfully, false otherwise.
           */
        }, {
          key: "solve",
          value: function solve() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
            }
            this.onBeforeSolve();
            this.onSolve();
            this.onAfterSolve();
            this.lastSolvedTimestamp = this.pict.log.getTimeStamp();
            return true;
          }

          /**
           * Performs view solving and triggers lifecycle hooks (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "solveAsync",
          value: function solveAsync(fCallback) {
            var _this19 = this;
            var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');

            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " solveAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this19.log.error("PictView [".concat(_this19.UUID, "]::[").concat(_this19.Hash, "] ").concat(_this19.options.Name, " solveAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeSolveAsync.bind(this));
            tmpAnticipate.anticipate(this.onSolveAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterSolveAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this19.pict.LogNoisiness > 2) {
                _this19.log.trace("PictView [".concat(_this19.UUID, "]::[").concat(_this19.Hash, "] ").concat(_this19.options.ViewIdentifier, " solveAsync() complete."));
              }
              _this19.lastSolvedTimestamp = _this19.pict.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * Lifecycle hook that triggers after the view is solved.
           */
        }, {
          key: "onAfterSolve",
          value: function onAfterSolve() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterSolve:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after the view is solved (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterSolveAsync",
          value: function onAfterSolveAsync(fCallback) {
            this.onAfterSolve();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal From View                        */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before data is marshaled from the view.
           *
           * @return {boolean} - True if the operation was successful, false otherwise.
           */
        }, {
          key: "onBeforeMarshalFromView",
          value: function onBeforeMarshalFromView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeMarshalFromView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before data is marshaled from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeMarshalFromViewAsync",
          value: function onBeforeMarshalFromViewAsync(fCallback) {
            this.onBeforeMarshalFromView();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when data is marshaled from the view.
           */
        }, {
          key: "onMarshalFromView",
          value: function onMarshalFromView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onMarshalFromView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when data is marshaled from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onMarshalFromViewAsync",
          value: function onMarshalFromViewAsync(fCallback) {
            this.onMarshalFromView();
            return fCallback();
          }

          /**
           * Marshals data from the view.
           *
           * @return {boolean} - True if the operation was successful, false otherwise.
           */
        }, {
          key: "marshalFromView",
          value: function marshalFromView() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
            }
            this.onBeforeMarshalFromView();
            this.onMarshalFromView();
            this.onAfterMarshalFromView();
            this.lastMarshalFromViewTimestamp = this.pict.log.getTimeStamp();
            return true;
          }

          /**
           * Marshals data from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "marshalFromViewAsync",
          value: function marshalFromViewAsync(fCallback) {
            var _this20 = this;
            var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');

            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalFromViewAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this20.log.error("PictView [".concat(_this20.UUID, "]::[").concat(_this20.Hash, "] ").concat(_this20.options.Name, " marshalFromViewAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalFromViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onMarshalFromViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalFromViewAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this20.pict.LogNoisiness > 2) {
                _this20.log.trace("PictView [".concat(_this20.UUID, "]::[").concat(_this20.Hash, "] ").concat(_this20.options.ViewIdentifier, " marshalFromViewAsync() complete."));
              }
              _this20.lastMarshalFromViewTimestamp = _this20.pict.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * Lifecycle hook that triggers after data is marshaled from the view.
           */
        }, {
          key: "onAfterMarshalFromView",
          value: function onAfterMarshalFromView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterMarshalFromView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after data is marshaled from the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterMarshalFromViewAsync",
          value: function onAfterMarshalFromViewAsync(fCallback) {
            this.onAfterMarshalFromView();
            return fCallback();
          }

          /* -------------------------------------------------------------------------- */
          /*                     Code Section: Marshal To View                          */
          /* -------------------------------------------------------------------------- */
          /**
           * Lifecycle hook that triggers before data is marshaled into the view.
           */
        }, {
          key: "onBeforeMarshalToView",
          value: function onBeforeMarshalToView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onBeforeMarshalToView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers before data is marshaled into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onBeforeMarshalToViewAsync",
          value: function onBeforeMarshalToViewAsync(fCallback) {
            this.onBeforeMarshalToView();
            return fCallback();
          }

          /**
           * Lifecycle hook that triggers when data is marshaled into the view.
           */
        }, {
          key: "onMarshalToView",
          value: function onMarshalToView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onMarshalToView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers when data is marshaled into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onMarshalToViewAsync",
          value: function onMarshalToViewAsync(fCallback) {
            this.onMarshalToView();
            return fCallback();
          }

          /**
           * Marshals data into the view.
           *
           * @return {boolean} - True if the operation was successful, false otherwise.
           */
        }, {
          key: "marshalToView",
          value: function marshalToView() {
            if (this.pict.LogNoisiness > 2) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " executing solve() function..."));
            }
            this.onBeforeMarshalToView();
            this.onMarshalToView();
            this.onAfterMarshalToView();
            this.lastMarshalToViewTimestamp = this.pict.log.getTimeStamp();
            return true;
          }

          /**
           * Marshals data into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "marshalToViewAsync",
          value: function marshalToViewAsync(fCallback) {
            var _this21 = this;
            var tmpAnticipate = this.pict.instantiateServiceProviderWithoutRegistration('Anticipate');

            /** @type {ErrorCallback} */
            var tmpCallback = typeof fCallback === 'function' ? fCallback : null;
            if (!tmpCallback) {
              this.log.warn("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.Name, " marshalToViewAsync was called without a valid callback.  A callback will be generated but this could lead to race conditions."));
              tmpCallback = function tmpCallback(pError) {
                if (pError) {
                  _this21.log.error("PictView [".concat(_this21.UUID, "]::[").concat(_this21.Hash, "] ").concat(_this21.options.Name, " marshalToViewAsync Auto Callback Error: ").concat(pError), pError);
                }
              };
            }
            tmpAnticipate.anticipate(this.onBeforeMarshalToViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onMarshalToViewAsync.bind(this));
            tmpAnticipate.anticipate(this.onAfterMarshalToViewAsync.bind(this));
            tmpAnticipate.wait(function (pError) {
              if (_this21.pict.LogNoisiness > 2) {
                _this21.log.trace("PictView [".concat(_this21.UUID, "]::[").concat(_this21.Hash, "] ").concat(_this21.options.ViewIdentifier, " marshalToViewAsync() complete."));
              }
              _this21.lastMarshalToViewTimestamp = _this21.pict.log.getTimeStamp();
              return tmpCallback(pError);
            });
          }

          /**
           * Lifecycle hook that triggers after data is marshaled into the view.
           */
        }, {
          key: "onAfterMarshalToView",
          value: function onAfterMarshalToView() {
            if (this.pict.LogNoisiness > 3) {
              this.log.trace("PictView [".concat(this.UUID, "]::[").concat(this.Hash, "] ").concat(this.options.ViewIdentifier, " onAfterMarshalToView:"));
            }
            return true;
          }

          /**
           * Lifecycle hook that triggers after data is marshaled into the view (async flow).
           *
           * @param {ErrorCallback} fCallback - The callback to call when the async operation is complete.
           */
        }, {
          key: "onAfterMarshalToViewAsync",
          value: function onAfterMarshalToViewAsync(fCallback) {
            this.onAfterMarshalToView();
            return fCallback();
          }

          /** @return {boolean} - True if the object is a PictView. */
        }, {
          key: "isPictView",
          get: function get() {
            return true;
          }
        }]);
      }(libFableServiceBase);
      module.exports = PictView;
    }, {
      "../package.json": 9,
      "fable-serviceproviderbase": 2
    }],
    11: [function (require, module, exports) {
      module.exports = {
        "Name": "Parime Management Console",
        "Hash": "ParimeManagement",
        "MainViewportViewIdentifier": "ParimeManagement-Layout",
        "AutoSolveAfterInitialize": true,
        "AutoRenderMainViewportViewAfterInitialize": false,
        "AutoRenderViewsAfterInitialize": false,
        "pict_configuration": {
          "Product": "ParimeManagement-Pict-Application"
        }
      };
    }, {}],
    12: [function (require, module, exports) {
      var libPictApplication = require('pict-application');
      var libPictRouter = require('pict-router');

      // Views
      var libViewLayout = require('./views/PictView-ParimeManagement-Layout.js');
      var libViewTopBar = require('./views/PictView-ParimeManagement-TopBar.js');
      var libViewBottomBar = require('./views/PictView-ParimeManagement-BottomBar.js');
      var libViewLogin = require('./views/PictView-ParimeManagement-Login.js');
      var libViewDashboard = require('./views/PictView-ParimeManagement-Dashboard.js');
      var libViewLakes = require('./views/PictView-ParimeManagement-Lakes.js');
      var libViewConfiguration = require('./views/PictView-ParimeManagement-Configuration.js');
      var ParimeManagementApplication = /*#__PURE__*/function (_libPictApplication) {
        function ParimeManagementApplication(pFable, pOptions, pServiceHash) {
          var _this22;
          _classCallCheck(this, ParimeManagementApplication);
          _this22 = _callSuper(this, ParimeManagementApplication, [pFable, pOptions, pServiceHash]);

          // Add the router provider with routes
          _this22.pict.addProvider('PictRouter', require('./providers/PictRouter-ParimeManagement-Configuration.json'), libPictRouter);

          // Add the layout view (the shell that contains top bar, workspace, bottom bar)
          _this22.pict.addView('ParimeManagement-Layout', libViewLayout.default_configuration, libViewLayout);

          // Add the top bar and bottom bar views
          _this22.pict.addView('ParimeManagement-TopBar', libViewTopBar.default_configuration, libViewTopBar);
          _this22.pict.addView('ParimeManagement-BottomBar', libViewBottomBar.default_configuration, libViewBottomBar);

          // Add the content views
          _this22.pict.addView('ParimeManagement-Login', libViewLogin.default_configuration, libViewLogin);
          _this22.pict.addView('ParimeManagement-Dashboard', libViewDashboard.default_configuration, libViewDashboard);
          _this22.pict.addView('ParimeManagement-Lakes', libViewLakes.default_configuration, libViewLakes);
          _this22.pict.addView('ParimeManagement-Configuration', libViewConfiguration.default_configuration, libViewConfiguration);
          return _this22;
        }
        _inherits(ParimeManagementApplication, _libPictApplication);
        return _createClass(ParimeManagementApplication, [{
          key: "onAfterInitializeAsync",
          value: function onAfterInitializeAsync(fCallback) {
            // Initialize application state
            this.pict.AppData.ParimeManagement = {
              User: {
                LoggedIn: false,
                UserName: '',
                DisplayName: ''
              },
              CurrentRoute: 'Dashboard',
              ServerInfo: {
                Product: '',
                Version: '',
                Port: 0,
                Uptime: '',
                StartTime: ''
              },
              Lakes: {
                Record: [],
                Binary: [],
                Combined: []
              },
              Configuration: {},
              LakeBrowser: {
                ActiveTab: 'Record',
                SelectedCategory: '',
                SelectedKey: '',
                CategoryKeys: [],
                KeyData: null
              }
            };

            // Render the layout shell first, then the initial content
            this.pict.views['ParimeManagement-Layout'].render();
            return _superPropGet(ParimeManagementApplication, "onAfterInitializeAsync", this, 3)([fCallback]);
          }

          /**
           * Navigate to a route using the pict-router.
           *
           * @param {string} pRoute - The route path to navigate to (e.g. '/Dashboard')
           */
        }, {
          key: "navigateTo",
          value: function navigateTo(pRoute) {
            this.pict.providers.PictRouter.navigate(pRoute);
          }

          /**
           * Render a specific content view into the main workspace area.
           * This is called by the router when a route is matched.
           *
           * @param {string} pViewIdentifier - The view identifier to render
           */
        }, {
          key: "showView",
          value: function showView(pViewIdentifier) {
            if (pViewIdentifier in this.pict.views) {
              this.pict.AppData.ParimeManagement.CurrentRoute = pViewIdentifier;
              this.pict.views[pViewIdentifier].render();
              // Re-render top bar to update active nav state
              this.pict.views['ParimeManagement-TopBar'].render();
            } else {
              this.pict.log.warn("View [".concat(pViewIdentifier, "] not found; falling back to dashboard."));
              this.pict.views['ParimeManagement-Dashboard'].render();
            }
          }

          /**
           * Handle user login attempt.
           *
           * @param {string} pUserName - The username
           * @param {string} pPassword - The password
           */
        }, {
          key: "attemptLogin",
          value: function attemptLogin(pUserName, pPassword) {
            this.pict.log.info("Login attempt for user [".concat(pUserName, "]"));

            // Accept any non-empty credentials for now
            if (pUserName && pPassword) {
              this.pict.AppData.ParimeManagement.User.LoggedIn = true;
              this.pict.AppData.ParimeManagement.User.UserName = pUserName;
              this.pict.AppData.ParimeManagement.User.DisplayName = pUserName;

              // Re-render the top bar to show logged-in state, then navigate to dashboard
              this.pict.views['ParimeManagement-TopBar'].render();
              this.navigateTo('/Dashboard');
            } else {
              this.pict.log.warn('Login failed: username and password are required.');
            }
          }

          /**
           * Handle user logout.
           */
        }, {
          key: "logout",
          value: function logout() {
            this.pict.AppData.ParimeManagement.User.LoggedIn = false;
            this.pict.AppData.ParimeManagement.User.UserName = '';
            this.pict.AppData.ParimeManagement.User.DisplayName = '';

            // Re-render the top bar and navigate to login
            this.pict.views['ParimeManagement-TopBar'].render();
            this.navigateTo('/Login');
          }

          /**
           * Fetch server info from the API and update AppData.
           *
           * @param {function} fCallback - Optional callback when data is loaded.
           */
        }, {
          key: "refreshServerInfo",
          value: function refreshServerInfo(fCallback) {
            var _this23 = this;
            var tmpXHR = new XMLHttpRequest();
            tmpXHR.open('GET', '/1.0/ServerInfo', true);
            tmpXHR.onreadystatechange = function () {
              if (tmpXHR.readyState === 4) {
                if (tmpXHR.status === 200) {
                  try {
                    var tmpData = JSON.parse(tmpXHR.responseText);
                    _this23.pict.AppData.ParimeManagement.ServerInfo = tmpData;
                  } catch (pError) {
                    _this23.pict.log.warn('Failed to parse server info response.');
                  }
                }
                if (typeof fCallback === 'function') {
                  fCallback();
                }
              }
            };
            tmpXHR.send();
          }

          /**
           * Fetch lake summary from the API and update AppData.
           *
           * @param {function} fCallback - Optional callback when data is loaded.
           */
        }, {
          key: "refreshLakesSummary",
          value: function refreshLakesSummary(fCallback) {
            var _this24 = this;
            var tmpXHR = new XMLHttpRequest();
            tmpXHR.open('GET', '/1.0/ServerInfo/Lakes', true);
            tmpXHR.onreadystatechange = function () {
              if (tmpXHR.readyState === 4) {
                if (tmpXHR.status === 200) {
                  try {
                    var tmpData = JSON.parse(tmpXHR.responseText);
                    if (tmpData.Lakes) {
                      _this24.pict.AppData.ParimeManagement.Lakes = tmpData.Lakes;
                    }
                  } catch (pError) {
                    _this24.pict.log.warn('Failed to parse lakes summary response.');
                  }
                }
                if (typeof fCallback === 'function') {
                  fCallback();
                }
              }
            };
            tmpXHR.send();
          }

          /**
           * Fetch configuration from the API and update AppData.
           *
           * @param {function} fCallback - Optional callback when data is loaded.
           */
        }, {
          key: "refreshConfiguration",
          value: function refreshConfiguration(fCallback) {
            var _this25 = this;
            var tmpXHR = new XMLHttpRequest();
            tmpXHR.open('GET', '/1.0/ServerInfo', true);
            tmpXHR.onreadystatechange = function () {
              if (tmpXHR.readyState === 4) {
                if (tmpXHR.status === 200) {
                  try {
                    var tmpData = JSON.parse(tmpXHR.responseText);
                    _this25.pict.AppData.ParimeManagement.Configuration = tmpData;
                  } catch (pError) {
                    _this25.pict.log.warn('Failed to parse configuration response.');
                  }
                }
                if (typeof fCallback === 'function') {
                  fCallback();
                }
              }
            };
            tmpXHR.send();
          }

          /**
           * Fetch keys for a specific lake category.
           *
           * @param {string} pLakeType - 'Record', 'Binary', or 'Combined'
           * @param {string} pCategory - The category name
           * @param {function} fCallback - Callback(pKeys)
           */
        }, {
          key: "fetchCategoryKeys",
          value: function fetchCategoryKeys(pLakeType, pCategory, fCallback) {
            var tmpXHR = new XMLHttpRequest();
            tmpXHR.open('GET', "/1.0/".concat(pLakeType, "/").concat(pCategory), true);
            tmpXHR.onreadystatechange = function () {
              if (tmpXHR.readyState === 4) {
                if (tmpXHR.status === 200) {
                  try {
                    var tmpData = JSON.parse(tmpXHR.responseText);
                    fCallback(tmpData.Keys || []);
                  } catch (pError) {
                    fCallback([]);
                  }
                } else {
                  fCallback([]);
                }
              }
            };
            tmpXHR.send();
          }

          /**
           * Fetch a specific record from the API.
           *
           * @param {string} pCategory - The category name
           * @param {string} pKey - The record key
           * @param {function} fCallback - Callback(pData)
           */
        }, {
          key: "fetchRecord",
          value: function fetchRecord(pCategory, pKey, fCallback) {
            var tmpXHR = new XMLHttpRequest();
            tmpXHR.open('GET', "/1.0/Record/".concat(pCategory, "/").concat(pKey), true);
            tmpXHR.onreadystatechange = function () {
              if (tmpXHR.readyState === 4) {
                if (tmpXHR.status === 200) {
                  try {
                    fCallback(JSON.parse(tmpXHR.responseText));
                  } catch (pError) {
                    fCallback(null);
                  }
                } else {
                  fCallback(null);
                }
              }
            };
            tmpXHR.send();
          }
        }]);
      }(libPictApplication);
      module.exports = ParimeManagementApplication;
      module.exports.default_configuration = require('./Pict-Application-ParimeManagement-Configuration.json');
    }, {
      "./Pict-Application-ParimeManagement-Configuration.json": 11,
      "./providers/PictRouter-ParimeManagement-Configuration.json": 13,
      "./views/PictView-ParimeManagement-BottomBar.js": 14,
      "./views/PictView-ParimeManagement-Configuration.js": 15,
      "./views/PictView-ParimeManagement-Dashboard.js": 16,
      "./views/PictView-ParimeManagement-Lakes.js": 17,
      "./views/PictView-ParimeManagement-Layout.js": 18,
      "./views/PictView-ParimeManagement-Login.js": 19,
      "./views/PictView-ParimeManagement-TopBar.js": 20,
      "pict-application": 5,
      "pict-router": 8
    }],
    13: [function (require, module, exports) {
      module.exports = {
        "ProviderIdentifier": "Pict-Router",
        "AutoInitialize": true,
        "AutoInitializeOrdinal": 0,
        "Routes": [{
          "path": "/Dashboard",
          "template": "{~LV:Pict.PictApplication.showView(`ParimeManagement-Dashboard`)~}"
        }, {
          "path": "/Lakes",
          "template": "{~LV:Pict.PictApplication.showView(`ParimeManagement-Lakes`)~}"
        }, {
          "path": "/Configuration",
          "template": "{~LV:Pict.PictApplication.showView(`ParimeManagement-Configuration`)~}"
        }, {
          "path": "/Login",
          "template": "{~LV:Pict.PictApplication.showView(`ParimeManagement-Login`)~}"
        }]
      };
    }, {}],
    14: [function (require, module, exports) {
      var libPictView = require('pict-view');
      var _ViewConfiguration = {
        ViewIdentifier: "ParimeManagement-BottomBar",
        DefaultRenderable: "ParimeManagement-BottomBar-Content",
        DefaultDestinationAddress: "#ParimeManagement-BottomBar-Container",
        AutoRender: false,
        CSS: /*css*/"\n\t\t.parime-bottombar {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\t\t\tbackground-color: var(--theme-color-background-secondary, #F0ECE4);\n\t\t\tcolor: #8A7F72;\n\t\t\tpadding: 0.75em 1.5em;\n\t\t\tfont-size: 0.8em;\n\t\t\tborder-top: 1px solid #DDD6CA;\n\t\t}\n\t\t.parime-bottombar a {\n\t\t\tcolor: #2E7D74;\n\t\t\tmargin-left: 0.5em;\n\t\t}\n\t\t.parime-bottombar a:hover {\n\t\t\tcolor: #256861;\n\t\t}\n\t",
        Templates: [{
          Hash: "ParimeManagement-BottomBar-Template",
          Template: /*html*/"\n<div class=\"parime-bottombar\">\n\tParime Data Lake &mdash; Management Console &mdash;\n\t<a href=\"https://github.com/stevenvelozo/parime\" target=\"_blank\">GitHub</a>\n</div>\n"
        }],
        Renderables: [{
          RenderableHash: "ParimeManagement-BottomBar-Content",
          TemplateHash: "ParimeManagement-BottomBar-Template",
          DestinationAddress: "#ParimeManagement-BottomBar-Container",
          RenderMethod: "replace"
        }]
      };
      var ParimeManagementBottomBarView = /*#__PURE__*/function (_libPictView) {
        function ParimeManagementBottomBarView(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, ParimeManagementBottomBarView);
          return _callSuper(this, ParimeManagementBottomBarView, [pFable, pOptions, pServiceHash]);
        }
        _inherits(ParimeManagementBottomBarView, _libPictView);
        return _createClass(ParimeManagementBottomBarView);
      }(libPictView);
      module.exports = ParimeManagementBottomBarView;
      module.exports.default_configuration = _ViewConfiguration;
    }, {
      "pict-view": 10
    }],
    15: [function (require, module, exports) {
      var libPictView = require('pict-view');
      var _ViewConfiguration = {
        ViewIdentifier: "ParimeManagement-Configuration",
        DefaultRenderable: "ParimeManagement-Configuration-Content",
        DefaultDestinationAddress: "#ParimeManagement-Content-Container",
        AutoRender: false,
        CSS: /*css*/"\n\t\t.parime-config {\n\t\t\tpadding: 2em;\n\t\t\tmax-width: 1200px;\n\t\t\tmargin: 0 auto;\n\t\t}\n\t\t.parime-config-header {\n\t\t\tmargin: 0 0 1.5em 0;\n\t\t\tpadding-bottom: 1em;\n\t\t\tborder-bottom: 1px solid #DDD6CA;\n\t\t}\n\t\t.parime-config-header h1 {\n\t\t\tmargin: 0 0 0.25em 0;\n\t\t\tfont-size: 1.75em;\n\t\t\tfont-weight: 400;\n\t\t\tcolor: #3D3229;\n\t\t}\n\t\t.parime-config-header p {\n\t\t\tmargin: 0;\n\t\t\tcolor: #7A7568;\n\t\t\tfont-size: 1em;\n\t\t}\n\t\t.parime-config-section {\n\t\t\tbackground: #fff;\n\t\t\tborder: 1px solid #DDD6CA;\n\t\t\tborder-radius: 6px;\n\t\t\tmargin-bottom: 1.25em;\n\t\t\toverflow: hidden;\n\t\t}\n\t\t.parime-config-section-header {\n\t\t\tpadding: 0.75em 1.25em;\n\t\t\tbackground: #F0ECE4;\n\t\t\tcolor: #5E5549;\n\t\t\tfont-size: 0.85em;\n\t\t\tfont-weight: 600;\n\t\t\ttext-transform: uppercase;\n\t\t\tletter-spacing: 0.05em;\n\t\t\tborder-bottom: 1px solid #DDD6CA;\n\t\t}\n\t\t.parime-config-table {\n\t\t\twidth: 100%;\n\t\t\tborder-collapse: collapse;\n\t\t}\n\t\t.parime-config-table td {\n\t\t\tpadding: 0.6em 1.25em;\n\t\t\tborder-bottom: 1px solid #EAE3D8;\n\t\t\tfont-size: 0.9em;\n\t\t}\n\t\t.parime-config-table tr:last-child td {\n\t\t\tborder-bottom: none;\n\t\t}\n\t\t.parime-config-table td:first-child {\n\t\t\tcolor: #5E5549;\n\t\t\tfont-weight: 500;\n\t\t\twidth: 200px;\n\t\t}\n\t\t.parime-config-table td:last-child {\n\t\t\tcolor: #423D37;\n\t\t}\n\t\t.parime-config-value-code {\n\t\t\tfont-family: \"SF Mono\", \"Fira Code\", \"Fira Mono\", Menlo, Consolas, monospace;\n\t\t\tfont-size: 0.85em;\n\t\t\tcolor: #9E6B47;\n\t\t\tbackground: #F0ECE4;\n\t\t\tpadding: 0.15em 0.4em;\n\t\t\tborder-radius: 3px;\n\t\t}\n\t\t.parime-config-json {\n\t\t\tpadding: 1.25em;\n\t\t\tbackground: #F0ECE4;\n\t\t\tfont-family: \"SF Mono\", \"Fira Code\", \"Fira Mono\", Menlo, Consolas, monospace;\n\t\t\tfont-size: 0.85em;\n\t\t\tcolor: #423D37;\n\t\t\twhite-space: pre-wrap;\n\t\t\tword-break: break-word;\n\t\t\tmargin: 0;\n\t\t}\n\t\t.parime-config-endpoints {\n\t\t\tpadding: 1.25em;\n\t\t}\n\t\t.parime-config-endpoint-item {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tgap: 0.75em;\n\t\t\tpadding: 0.4em 0;\n\t\t\tfont-size: 0.9em;\n\t\t}\n\t\t.parime-config-endpoint-badge {\n\t\t\tdisplay: inline-block;\n\t\t\tpadding: 0.15em 0.5em;\n\t\t\tborder-radius: 3px;\n\t\t\tfont-size: 0.75em;\n\t\t\tfont-weight: 600;\n\t\t\ttext-transform: uppercase;\n\t\t\tletter-spacing: 0.03em;\n\t\t\tbackground: #E0EDEB;\n\t\t\tcolor: #2E7D74;\n\t\t}\n\t",
        Templates: [{
          Hash: "ParimeManagement-Configuration-Template",
          Template: /*html*/"\n<div class=\"parime-config\">\n\t<div class=\"parime-config-header\">\n\t\t<h1>Configuration</h1>\n\t\t<p>Current server configuration and endpoint status.</p>\n\t</div>\n\t<div id=\"ParimeManagement-Configuration-Body\">\n\t\t<p style=\"color: #8A7F72;\">Loading configuration...</p>\n\t</div>\n</div>\n"
        }],
        Renderables: [{
          RenderableHash: "ParimeManagement-Configuration-Content",
          TemplateHash: "ParimeManagement-Configuration-Template",
          DestinationAddress: "#ParimeManagement-Content-Container",
          RenderMethod: "replace"
        }]
      };
      var ParimeManagementConfigurationView = /*#__PURE__*/function (_libPictView2) {
        function ParimeManagementConfigurationView(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, ParimeManagementConfigurationView);
          return _callSuper(this, ParimeManagementConfigurationView, [pFable, pOptions, pServiceHash]);
        }
        _inherits(ParimeManagementConfigurationView, _libPictView2);
        return _createClass(ParimeManagementConfigurationView, [{
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            var _this26 = this;
            this.pict.PictApplication.refreshConfiguration(function () {
              var tmpConfig = _this26.pict.AppData.ParimeManagement.Configuration;
              var tmpHTML = '';

              // Server section
              tmpHTML += '<div class="parime-config-section">';
              tmpHTML += '<div class="parime-config-section-header">Server</div>';
              tmpHTML += '<table class="parime-config-table">';
              tmpHTML += "<tr><td>Product</td><td>".concat(_this26.escapeHTML(tmpConfig.Product || 'Parime'), "</td></tr>");
              tmpHTML += "<tr><td>Version</td><td><span class=\"parime-config-value-code\">".concat(_this26.escapeHTML(tmpConfig.Version || '?'), "</span></td></tr>");
              tmpHTML += "<tr><td>Port</td><td><span class=\"parime-config-value-code\">".concat(tmpConfig.Port || '?', "</span></td></tr>");
              if (tmpConfig.Uptime) {
                tmpHTML += "<tr><td>Uptime</td><td>".concat(_this26.escapeHTML(tmpConfig.Uptime), "</td></tr>");
              }
              if (tmpConfig.StartTime) {
                tmpHTML += "<tr><td>Start Time</td><td>".concat(_this26.escapeHTML(tmpConfig.StartTime), "</td></tr>");
              }
              tmpHTML += '</table>';
              tmpHTML += '</div>';

              // Storage section
              tmpHTML += '<div class="parime-config-section">';
              tmpHTML += '<div class="parime-config-section-header">Storage</div>';
              tmpHTML += '<table class="parime-config-table">';
              tmpHTML += "<tr><td>Binary Storage Root</td><td><span class=\"parime-config-value-code\">".concat(_this26.escapeHTML(tmpConfig.BinaryStorageRoot || '?'), "</span></td></tr>");
              tmpHTML += '</table>';
              tmpHTML += '</div>';

              // Restify section
              if (tmpConfig.RestifyConfiguration) {
                tmpHTML += '<div class="parime-config-section">';
                tmpHTML += '<div class="parime-config-section-header">Restify Configuration</div>';
                tmpHTML += "<pre class=\"parime-config-json\">".concat(_this26.escapeHTML(JSON.stringify(tmpConfig.RestifyConfiguration, null, 2)), "</pre>");
                tmpHTML += '</div>';
              }

              // Endpoints section
              tmpHTML += '<div class="parime-config-section">';
              tmpHTML += '<div class="parime-config-section-header">Endpoints</div>';
              tmpHTML += '<div class="parime-config-endpoints">';
              var tmpEndpoints = [{
                Name: 'Record Lake',
                Path: '/1.0/Record/:category/:hash'
              }, {
                Name: 'Binary Lake',
                Path: '/1.0/Binary/:category/:hash'
              }, {
                Name: 'Combined Lake',
                Path: '/1.0/Combined/:category/:hash'
              }, {
                Name: 'WebSocket',
                Path: '/1.0/WebSocket/Lake'
              }, {
                Name: 'Server Info',
                Path: '/1.0/ServerInfo'
              }];
              for (var i = 0; i < tmpEndpoints.length; i++) {
                var tmpEndpoint = tmpEndpoints[i];
                tmpHTML += "<div class=\"parime-config-endpoint-item\"><span class=\"parime-config-endpoint-badge\">Active</span> <strong>".concat(_this26.escapeHTML(tmpEndpoint.Name), "</strong> &mdash; <span class=\"parime-config-value-code\">").concat(_this26.escapeHTML(tmpEndpoint.Path), "</span></div>");
              }
              tmpHTML += '</div>';
              tmpHTML += '</div>';
              _this26.pict.ContentAssignment.assignContent('#ParimeManagement-Configuration-Body', tmpHTML);
            });
            return _superPropGet(ParimeManagementConfigurationView, "onAfterRender", this, 3)([pRenderable, pRenderDestinationAddress, pRecord, pContent]);
          }
        }, {
          key: "escapeHTML",
          value: function escapeHTML(pString) {
            if (typeof pString !== 'string') {
              return String(pString);
            }
            return pString.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
          }
        }]);
      }(libPictView);
      module.exports = ParimeManagementConfigurationView;
      module.exports.default_configuration = _ViewConfiguration;
    }, {
      "pict-view": 10
    }],
    16: [function (require, module, exports) {
      var libPictView = require('pict-view');
      var _ViewConfiguration = {
        ViewIdentifier: "ParimeManagement-Dashboard",
        DefaultRenderable: "ParimeManagement-Dashboard-Content",
        DefaultDestinationAddress: "#ParimeManagement-Content-Container",
        AutoRender: false,
        CSS: /*css*/"\n\t\t.parime-dashboard {\n\t\t\tpadding: 2em;\n\t\t\tmax-width: 1200px;\n\t\t\tmargin: 0 auto;\n\t\t}\n\t\t.parime-dashboard-header {\n\t\t\tmargin: 0 0 1.5em 0;\n\t\t\tpadding-bottom: 1em;\n\t\t\tborder-bottom: 1px solid #DDD6CA;\n\t\t}\n\t\t.parime-dashboard-header h1 {\n\t\t\tmargin: 0 0 0.25em 0;\n\t\t\tfont-size: 1.75em;\n\t\t\tfont-weight: 400;\n\t\t\tcolor: #3D3229;\n\t\t}\n\t\t.parime-dashboard-header p {\n\t\t\tmargin: 0;\n\t\t\tcolor: #7A7568;\n\t\t\tfont-size: 1em;\n\t\t}\n\t\t.parime-dashboard-cards {\n\t\t\tdisplay: grid;\n\t\t\tgrid-template-columns: repeat(auto-fill, minmax(280px, 1fr));\n\t\t\tgap: 1.25em;\n\t\t\tmargin-top: 1.5em;\n\t\t}\n\t\t.parime-card {\n\t\t\tbackground: #fff;\n\t\t\tborder: 1px solid #DDD6CA;\n\t\t\tborder-radius: 6px;\n\t\t\tpadding: 1.5em;\n\t\t\ttransition: box-shadow 0.2s, border-color 0.2s;\n\t\t}\n\t\t.parime-card:hover {\n\t\t\tbox-shadow: 0 4px 12px rgba(61, 50, 41, 0.08);\n\t\t\tborder-color: #B5AA9A;\n\t\t}\n\t\t.parime-card-icon {\n\t\t\tfont-size: 1.75em;\n\t\t\tmargin-bottom: 0.5em;\n\t\t}\n\t\t.parime-card h3 {\n\t\t\tmargin: 0 0 0.5em 0;\n\t\t\tfont-size: 1.1em;\n\t\t\tcolor: #3D3229;\n\t\t}\n\t\t.parime-card p {\n\t\t\tmargin: 0;\n\t\t\tcolor: #7A7568;\n\t\t\tfont-size: 0.9em;\n\t\t\tline-height: 1.5;\n\t\t}\n\t\t.parime-card-value {\n\t\t\tfont-size: 1.75em;\n\t\t\tfont-weight: 600;\n\t\t\tcolor: #2E7D74;\n\t\t\tmargin: 0.25em 0;\n\t\t}\n\t\t.parime-card-label {\n\t\t\tfont-size: 0.8em;\n\t\t\tcolor: #8A7F72;\n\t\t\ttext-transform: uppercase;\n\t\t\tletter-spacing: 0.05em;\n\t\t}\n\t",
        Templates: [{
          Hash: "ParimeManagement-Dashboard-Template",
          Template: /*html*/"\n<div class=\"parime-dashboard\">\n\t<div class=\"parime-dashboard-header\">\n\t\t<h1>Dashboard</h1>\n\t\t<p>Overview of your Parime data lake server.</p>\n\t</div>\n\t<div class=\"parime-dashboard-cards\" id=\"ParimeManagement-Dashboard-Cards\">\n\t\t<div class=\"parime-card\">\n\t\t\t<div class=\"parime-card-icon\">&#9881;</div>\n\t\t\t<h3>Server Status</h3>\n\t\t\t<div id=\"ParimeManagement-Dashboard-ServerStatus\">\n\t\t\t\t<p>Loading...</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"parime-card\">\n\t\t\t<div class=\"parime-card-icon\">&#128203;</div>\n\t\t\t<h3>Record Lakes</h3>\n\t\t\t<div id=\"ParimeManagement-Dashboard-RecordLakes\">\n\t\t\t\t<p>Loading...</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"parime-card\">\n\t\t\t<div class=\"parime-card-icon\">&#128190;</div>\n\t\t\t<h3>Binary Lakes</h3>\n\t\t\t<div id=\"ParimeManagement-Dashboard-BinaryLakes\">\n\t\t\t\t<p>Loading...</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"parime-card\">\n\t\t\t<div class=\"parime-card-icon\">&#128451;</div>\n\t\t\t<h3>Combined Lakes</h3>\n\t\t\t<div id=\"ParimeManagement-Dashboard-CombinedLakes\">\n\t\t\t\t<p>Loading...</p>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"parime-card\">\n\t\t\t<div class=\"parime-card-icon\">&#128268;</div>\n\t\t\t<h3>WebSocket</h3>\n\t\t\t<div id=\"ParimeManagement-Dashboard-WebSocket\">\n\t\t\t\t<p class=\"parime-card-label\">Endpoint</p>\n\t\t\t\t<p>/1.0/WebSocket/Lake</p>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"
        }],
        Renderables: [{
          RenderableHash: "ParimeManagement-Dashboard-Content",
          TemplateHash: "ParimeManagement-Dashboard-Template",
          DestinationAddress: "#ParimeManagement-Content-Container",
          RenderMethod: "replace"
        }]
      };
      var ParimeManagementDashboardView = /*#__PURE__*/function (_libPictView3) {
        function ParimeManagementDashboardView(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, ParimeManagementDashboardView);
          return _callSuper(this, ParimeManagementDashboardView, [pFable, pOptions, pServiceHash]);
        }
        _inherits(ParimeManagementDashboardView, _libPictView3);
        return _createClass(ParimeManagementDashboardView, [{
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            var _this27 = this;
            // Fetch server info and update the dashboard cards
            this.pict.PictApplication.refreshServerInfo(function () {
              var tmpInfo = _this27.pict.AppData.ParimeManagement.ServerInfo;
              var tmpServerHTML = '';
              tmpServerHTML += "<p class=\"parime-card-label\">Product</p>";
              tmpServerHTML += "<p>".concat(tmpInfo.Product || 'Parime', " v").concat(tmpInfo.Version || '?', "</p>");
              tmpServerHTML += "<p class=\"parime-card-label\">Port</p>";
              tmpServerHTML += "<p>".concat(tmpInfo.Port || '?', "</p>");
              if (tmpInfo.Uptime) {
                tmpServerHTML += "<p class=\"parime-card-label\">Uptime</p>";
                tmpServerHTML += "<p>".concat(tmpInfo.Uptime, "</p>");
              }
              _this27.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-ServerStatus', tmpServerHTML);
            });

            // Fetch lake summary and update the lake cards
            this.pict.PictApplication.refreshLakesSummary(function () {
              var tmpLakes = _this27.pict.AppData.ParimeManagement.Lakes;

              // Record Lakes
              var tmpRecordLakes = tmpLakes.Record || [];
              var tmpRecordHTML = "<div class=\"parime-card-value\">".concat(tmpRecordLakes.length, "</div>");
              tmpRecordHTML += "<p class=\"parime-card-label\">Categories</p>";
              if (tmpRecordLakes.length > 0) {
                tmpRecordHTML += "<p>".concat(tmpRecordLakes.join(', '), "</p>");
              }
              _this27.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-RecordLakes', tmpRecordHTML);

              // Binary Lakes
              var tmpBinaryLakes = tmpLakes.Binary || [];
              var tmpBinaryHTML = "<div class=\"parime-card-value\">".concat(tmpBinaryLakes.length, "</div>");
              tmpBinaryHTML += "<p class=\"parime-card-label\">Categories</p>";
              if (tmpBinaryLakes.length > 0) {
                tmpBinaryHTML += "<p>".concat(tmpBinaryLakes.join(', '), "</p>");
              }
              _this27.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-BinaryLakes', tmpBinaryHTML);

              // Combined Lakes
              var tmpCombinedLakes = tmpLakes.Combined || [];
              var tmpCombinedHTML = "<div class=\"parime-card-value\">".concat(tmpCombinedLakes.length, "</div>");
              tmpCombinedHTML += "<p class=\"parime-card-label\">Categories</p>";
              if (tmpCombinedLakes.length > 0) {
                tmpCombinedHTML += "<p>".concat(tmpCombinedLakes.join(', '), "</p>");
              }
              _this27.pict.ContentAssignment.assignContent('#ParimeManagement-Dashboard-CombinedLakes', tmpCombinedHTML);
            });
            return _superPropGet(ParimeManagementDashboardView, "onAfterRender", this, 3)([pRenderable, pRenderDestinationAddress, pRecord, pContent]);
          }
        }]);
      }(libPictView);
      module.exports = ParimeManagementDashboardView;
      module.exports.default_configuration = _ViewConfiguration;
    }, {
      "pict-view": 10
    }],
    17: [function (require, module, exports) {
      var libPictView = require('pict-view');
      var _ViewConfiguration = {
        ViewIdentifier: "ParimeManagement-Lakes",
        DefaultRenderable: "ParimeManagement-Lakes-Content",
        DefaultDestinationAddress: "#ParimeManagement-Content-Container",
        AutoRender: false,
        CSS: /*css*/"\n\t\t.parime-lakes {\n\t\t\tpadding: 2em;\n\t\t\tmax-width: 1200px;\n\t\t\tmargin: 0 auto;\n\t\t}\n\t\t.parime-lakes-header {\n\t\t\tmargin: 0 0 1.5em 0;\n\t\t\tpadding-bottom: 1em;\n\t\t\tborder-bottom: 1px solid #DDD6CA;\n\t\t}\n\t\t.parime-lakes-header h1 {\n\t\t\tmargin: 0 0 0.25em 0;\n\t\t\tfont-size: 1.75em;\n\t\t\tfont-weight: 400;\n\t\t\tcolor: #3D3229;\n\t\t}\n\t\t.parime-lakes-header p {\n\t\t\tmargin: 0;\n\t\t\tcolor: #7A7568;\n\t\t\tfont-size: 1em;\n\t\t}\n\t\t.parime-lakes-tabs {\n\t\t\tdisplay: flex;\n\t\t\tgap: 0;\n\t\t\tborder-bottom: 2px solid #DDD6CA;\n\t\t\tmargin-bottom: 1.5em;\n\t\t}\n\t\t.parime-lakes-tab {\n\t\t\tpadding: 0.6em 1.25em;\n\t\t\tcursor: pointer;\n\t\t\tcolor: #7A7568;\n\t\t\tfont-size: 0.95em;\n\t\t\tfont-weight: 500;\n\t\t\tborder-bottom: 2px solid transparent;\n\t\t\tmargin-bottom: -2px;\n\t\t\ttransition: color 0.15s, border-color 0.15s;\n\t\t\tbackground: none;\n\t\t\tborder-top: none;\n\t\t\tborder-left: none;\n\t\t\tborder-right: none;\n\t\t}\n\t\t.parime-lakes-tab:hover {\n\t\t\tcolor: #3D3229;\n\t\t}\n\t\t.parime-lakes-tab.active {\n\t\t\tcolor: #2E7D74;\n\t\t\tborder-bottom-color: #2E7D74;\n\t\t}\n\t\t.parime-lakes-body {\n\t\t\tdisplay: flex;\n\t\t\tgap: 1.5em;\n\t\t\tmin-height: 400px;\n\t\t}\n\t\t.parime-lakes-sidebar {\n\t\t\twidth: 260px;\n\t\t\tflex-shrink: 0;\n\t\t}\n\t\t.parime-lakes-main {\n\t\t\tflex: 1;\n\t\t\tmin-width: 0;\n\t\t}\n\t\t.parime-lakes-list {\n\t\t\tbackground: #fff;\n\t\t\tborder: 1px solid #DDD6CA;\n\t\t\tborder-radius: 6px;\n\t\t\toverflow: hidden;\n\t\t}\n\t\t.parime-lakes-list-header {\n\t\t\tpadding: 0.75em 1em;\n\t\t\tbackground: #F0ECE4;\n\t\t\tcolor: #5E5549;\n\t\t\tfont-size: 0.8em;\n\t\t\tfont-weight: 600;\n\t\t\ttext-transform: uppercase;\n\t\t\tletter-spacing: 0.05em;\n\t\t\tborder-bottom: 1px solid #DDD6CA;\n\t\t}\n\t\t.parime-lakes-list-item {\n\t\t\tpadding: 0.6em 1em;\n\t\t\tcursor: pointer;\n\t\t\tborder-bottom: 1px solid #EAE3D8;\n\t\t\tcolor: #423D37;\n\t\t\tfont-size: 0.9em;\n\t\t\ttransition: background-color 0.1s;\n\t\t}\n\t\t.parime-lakes-list-item:hover {\n\t\t\tbackground-color: #F7F5F0;\n\t\t}\n\t\t.parime-lakes-list-item.active {\n\t\t\tbackground-color: #E0EDEB;\n\t\t\tcolor: #2E7D74;\n\t\t\tfont-weight: 500;\n\t\t}\n\t\t.parime-lakes-list-item:last-child {\n\t\t\tborder-bottom: none;\n\t\t}\n\t\t.parime-lakes-list-empty {\n\t\t\tpadding: 1.5em 1em;\n\t\t\tcolor: #8A7F72;\n\t\t\tfont-size: 0.9em;\n\t\t\ttext-align: center;\n\t\t}\n\t\t.parime-lakes-detail {\n\t\t\tbackground: #fff;\n\t\t\tborder: 1px solid #DDD6CA;\n\t\t\tborder-radius: 6px;\n\t\t\tpadding: 1.5em;\n\t\t\tmin-height: 300px;\n\t\t}\n\t\t.parime-lakes-detail-header {\n\t\t\tfont-size: 0.8em;\n\t\t\tfont-weight: 600;\n\t\t\ttext-transform: uppercase;\n\t\t\tletter-spacing: 0.05em;\n\t\t\tcolor: #5E5549;\n\t\t\tmargin-bottom: 1em;\n\t\t\tpadding-bottom: 0.5em;\n\t\t\tborder-bottom: 1px solid #EAE3D8;\n\t\t}\n\t\t.parime-lakes-json {\n\t\t\tbackground: #F0ECE4;\n\t\t\tborder: 1px solid #DDD6CA;\n\t\t\tborder-radius: 4px;\n\t\t\tpadding: 1em;\n\t\t\tfont-family: \"SF Mono\", \"Fira Code\", \"Fira Mono\", Menlo, Consolas, monospace;\n\t\t\tfont-size: 0.85em;\n\t\t\tcolor: #423D37;\n\t\t\twhite-space: pre-wrap;\n\t\t\tword-break: break-word;\n\t\t\toverflow-x: auto;\n\t\t\tmax-height: 500px;\n\t\t\toverflow-y: auto;\n\t\t}\n\t\t.parime-lakes-placeholder {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\t\t\tmin-height: 300px;\n\t\t\tcolor: #8A7F72;\n\t\t\tfont-size: 0.95em;\n\t\t}\n\t",
        Templates: [{
          Hash: "ParimeManagement-Lakes-Template",
          Template: /*html*/"\n<div class=\"parime-lakes\">\n\t<div class=\"parime-lakes-header\">\n\t\t<h1>Lakes</h1>\n\t\t<p>Browse and inspect record, binary and combined lake data.</p>\n\t</div>\n\t<div class=\"parime-lakes-tabs\" id=\"ParimeManagement-Lakes-Tabs\"></div>\n\t<div class=\"parime-lakes-body\">\n\t\t<div class=\"parime-lakes-sidebar\">\n\t\t\t<div class=\"parime-lakes-list\" id=\"ParimeManagement-Lakes-CategoryList\">\n\t\t\t\t<div class=\"parime-lakes-list-header\">Categories</div>\n\t\t\t\t<div class=\"parime-lakes-list-empty\">Loading...</div>\n\t\t\t</div>\n\t\t\t<div class=\"parime-lakes-list\" id=\"ParimeManagement-Lakes-KeyList\" style=\"margin-top: 1em; display: none;\">\n\t\t\t\t<div class=\"parime-lakes-list-header\">Keys</div>\n\t\t\t</div>\n\t\t</div>\n\t\t<div class=\"parime-lakes-main\">\n\t\t\t<div class=\"parime-lakes-detail\" id=\"ParimeManagement-Lakes-Detail\">\n\t\t\t\t<div class=\"parime-lakes-placeholder\">Select a category and key to view data.</div>\n\t\t\t</div>\n\t\t</div>\n\t</div>\n</div>\n"
        }],
        Renderables: [{
          RenderableHash: "ParimeManagement-Lakes-Content",
          TemplateHash: "ParimeManagement-Lakes-Template",
          DestinationAddress: "#ParimeManagement-Content-Container",
          RenderMethod: "replace"
        }]
      };
      var ParimeManagementLakesView = /*#__PURE__*/function (_libPictView4) {
        function ParimeManagementLakesView(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, ParimeManagementLakesView);
          return _callSuper(this, ParimeManagementLakesView, [pFable, pOptions, pServiceHash]);
        }
        _inherits(ParimeManagementLakesView, _libPictView4);
        return _createClass(ParimeManagementLakesView, [{
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            var _this28 = this;
            var tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
            var tmpPictRef = this.pict.getClientSideReferenceForPict();

            // Render tabs
            var tmpTabs = ['Record', 'Binary', 'Combined'];
            var tmpTabsHTML = '';
            for (var i = 0; i < tmpTabs.length; i++) {
              var tmpTab = tmpTabs[i];
              var tmpActiveClass = tmpBrowser.ActiveTab === tmpTab ? ' active' : '';
              tmpTabsHTML += "<button class=\"parime-lakes-tab".concat(tmpActiveClass, "\" onclick=\"").concat(tmpPictRef, ".views['ParimeManagement-Lakes'].switchTab('").concat(tmpTab, "')\">").concat(tmpTab, "</button>");
            }
            this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Tabs', tmpTabsHTML);

            // Fetch lake categories
            this.pict.PictApplication.refreshLakesSummary(function () {
              _this28.renderCategoryList();
            });
            return _superPropGet(ParimeManagementLakesView, "onAfterRender", this, 3)([pRenderable, pRenderDestinationAddress, pRecord, pContent]);
          }
        }, {
          key: "switchTab",
          value: function switchTab(pTab) {
            var tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
            tmpBrowser.ActiveTab = pTab;
            tmpBrowser.SelectedCategory = '';
            tmpBrowser.SelectedKey = '';
            tmpBrowser.CategoryKeys = [];
            tmpBrowser.KeyData = null;
            this.render();
          }
        }, {
          key: "renderCategoryList",
          value: function renderCategoryList() {
            var tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
            var tmpLakes = this.pict.AppData.ParimeManagement.Lakes;
            var tmpCategories = tmpLakes[tmpBrowser.ActiveTab] || [];
            var tmpPictRef = this.pict.getClientSideReferenceForPict();
            var tmpHTML = '<div class="parime-lakes-list-header">Categories</div>';
            if (tmpCategories.length === 0) {
              tmpHTML += '<div class="parime-lakes-list-empty">No categories found.</div>';
            } else {
              for (var i = 0; i < tmpCategories.length; i++) {
                var tmpCategory = tmpCategories[i];
                var tmpActiveClass = tmpBrowser.SelectedCategory === tmpCategory ? ' active' : '';
                tmpHTML += "<div class=\"parime-lakes-list-item".concat(tmpActiveClass, "\" onclick=\"").concat(tmpPictRef, ".views['ParimeManagement-Lakes'].selectCategory('").concat(tmpCategory, "')\">").concat(tmpCategory, "</div>");
              }
            }
            this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-CategoryList', tmpHTML);

            // Hide key list and detail when no category selected
            var tmpKeyListEl = document.getElementById('ParimeManagement-Lakes-KeyList');
            if (tmpKeyListEl) {
              tmpKeyListEl.style.display = tmpBrowser.SelectedCategory ? 'block' : 'none';
            }
          }
        }, {
          key: "selectCategory",
          value: function selectCategory(pCategory) {
            var _this29 = this;
            var tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
            tmpBrowser.SelectedCategory = pCategory;
            tmpBrowser.SelectedKey = '';
            tmpBrowser.KeyData = null;

            // Update the category list to show active state
            this.renderCategoryList();

            // Show loading in key list
            var tmpKeyListEl = document.getElementById('ParimeManagement-Lakes-KeyList');
            if (tmpKeyListEl) {
              tmpKeyListEl.style.display = 'block';
            }
            this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-KeyList', '<div class="parime-lakes-list-header">Keys</div><div class="parime-lakes-list-empty">Loading...</div>');

            // Clear detail
            this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Detail', '<div class="parime-lakes-placeholder">Select a key to view data.</div>');

            // Fetch keys for this category
            this.pict.PictApplication.fetchCategoryKeys(tmpBrowser.ActiveTab, pCategory, function (pKeys) {
              tmpBrowser.CategoryKeys = pKeys;
              _this29.renderKeyList();
            });
          }
        }, {
          key: "renderKeyList",
          value: function renderKeyList() {
            var tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
            var tmpKeys = tmpBrowser.CategoryKeys || [];
            var tmpPictRef = this.pict.getClientSideReferenceForPict();
            var tmpHTML = '<div class="parime-lakes-list-header">Keys</div>';
            if (tmpKeys.length === 0) {
              tmpHTML += '<div class="parime-lakes-list-empty">No keys found.</div>';
            } else {
              for (var i = 0; i < tmpKeys.length; i++) {
                var tmpKey = tmpKeys[i];
                // Combined lake keys are objects with a Key property
                var tmpKeyDisplay = _typeof(tmpKey) === 'object' && tmpKey.Key ? tmpKey.Key : tmpKey;
                var tmpActiveClass = tmpBrowser.SelectedKey === tmpKeyDisplay ? ' active' : '';
                var tmpEscapedKey = tmpKeyDisplay.replace(/'/g, "\\'");
                tmpHTML += "<div class=\"parime-lakes-list-item".concat(tmpActiveClass, "\" onclick=\"").concat(tmpPictRef, ".views['ParimeManagement-Lakes'].selectKey('").concat(tmpEscapedKey, "')\">").concat(tmpKeyDisplay, "</div>");
              }
            }
            this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-KeyList', tmpHTML);
          }
        }, {
          key: "selectKey",
          value: function selectKey(pKey) {
            var _this30 = this;
            var tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
            tmpBrowser.SelectedKey = pKey;
            this.renderKeyList();

            // Show loading in detail
            this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Detail', '<div class="parime-lakes-detail-header">Loading...</div>');
            if (tmpBrowser.ActiveTab === 'Record') {
              this.pict.PictApplication.fetchRecord(tmpBrowser.SelectedCategory, pKey, function (pData) {
                tmpBrowser.KeyData = pData;
                _this30.renderDetail();
              });
            } else if (tmpBrowser.ActiveTab === 'Binary') {
              // For binary, fetch stat info
              var tmpXHR = new XMLHttpRequest();
              tmpXHR.open('GET', "/1.0/Binary/".concat(tmpBrowser.SelectedCategory, "/").concat(pKey, "/Stat"), true);
              tmpXHR.onreadystatechange = function () {
                if (tmpXHR.readyState === 4) {
                  if (tmpXHR.status === 200) {
                    try {
                      tmpBrowser.KeyData = JSON.parse(tmpXHR.responseText);
                    } catch (pError) {
                      tmpBrowser.KeyData = {
                        Error: 'Failed to parse response.'
                      };
                    }
                  } else {
                    tmpBrowser.KeyData = {
                      Error: "HTTP ".concat(tmpXHR.status)
                    };
                  }
                  _this30.renderDetail();
                }
              };
              tmpXHR.send();
            } else if (tmpBrowser.ActiveTab === 'Combined') {
              // For combined, fetch the record sub-endpoint
              this.pict.PictApplication.fetchRecord(tmpBrowser.SelectedCategory, "".concat(pKey), function (pData) {
                tmpBrowser.KeyData = pData;
                _this30.renderDetail();
              });
            }
          }
        }, {
          key: "renderDetail",
          value: function renderDetail() {
            var tmpBrowser = this.pict.AppData.ParimeManagement.LakeBrowser;
            var tmpData = tmpBrowser.KeyData;
            var tmpHTML = '';
            tmpHTML += "<div class=\"parime-lakes-detail-header\">".concat(tmpBrowser.ActiveTab, " / ").concat(tmpBrowser.SelectedCategory, " / ").concat(tmpBrowser.SelectedKey, "</div>");
            if (tmpData) {
              tmpHTML += "<div class=\"parime-lakes-json\">".concat(JSON.stringify(tmpData, null, 2), "</div>");
            } else {
              tmpHTML += '<p style="color: #8A7F72;">No data available.</p>';
            }
            this.pict.ContentAssignment.assignContent('#ParimeManagement-Lakes-Detail', tmpHTML);
          }
        }]);
      }(libPictView);
      module.exports = ParimeManagementLakesView;
      module.exports.default_configuration = _ViewConfiguration;
    }, {
      "pict-view": 10
    }],
    18: [function (require, module, exports) {
      var libPictView = require('pict-view');
      var _ViewConfiguration = {
        ViewIdentifier: "ParimeManagement-Layout",
        DefaultRenderable: "ParimeManagement-Layout-Shell",
        DefaultDestinationAddress: "#ParimeManagement-Application-Container",
        AutoRender: false,
        CSS: /*css*/"\n\t\t#ParimeManagement-Application-Container {\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\tmin-height: 100vh;\n\t\t}\n\t\t#ParimeManagement-TopBar-Container {\n\t\t\tflex-shrink: 0;\n\t\t}\n\t\t#ParimeManagement-Content-Container {\n\t\t\tflex: 1;\n\t\t}\n\t\t#ParimeManagement-BottomBar-Container {\n\t\t\tflex-shrink: 0;\n\t\t}\n\t",
        Templates: [{
          Hash: "ParimeManagement-Layout-Shell-Template",
          Template: /*html*/"\n<div id=\"ParimeManagement-TopBar-Container\"></div>\n<div id=\"ParimeManagement-Content-Container\"></div>\n<div id=\"ParimeManagement-BottomBar-Container\"></div>\n"
        }],
        Renderables: [{
          RenderableHash: "ParimeManagement-Layout-Shell",
          TemplateHash: "ParimeManagement-Layout-Shell-Template",
          DestinationAddress: "#ParimeManagement-Application-Container",
          RenderMethod: "replace"
        }]
      };
      var ParimeManagementLayoutView = /*#__PURE__*/function (_libPictView5) {
        function ParimeManagementLayoutView(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, ParimeManagementLayoutView);
          return _callSuper(this, ParimeManagementLayoutView, [pFable, pOptions, pServiceHash]);
        }
        _inherits(ParimeManagementLayoutView, _libPictView5);
        return _createClass(ParimeManagementLayoutView, [{
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            // After the layout shell is rendered, render the child views into their containers
            this.pict.views['ParimeManagement-TopBar'].render();
            this.pict.views['ParimeManagement-BottomBar'].render();

            // Render initial content -- the dashboard by default
            this.pict.views['ParimeManagement-Dashboard'].render();

            // Inject all view CSS into the PICT-CSS style element
            this.pict.CSSMap.injectCSS();

            // Now resolve the router so it picks up the current hash URL
            if (this.pict.providers.PictRouter) {
              this.pict.providers.PictRouter.resolve();
            }
            return _superPropGet(ParimeManagementLayoutView, "onAfterRender", this, 3)([pRenderable, pRenderDestinationAddress, pRecord, pContent]);
          }
        }]);
      }(libPictView);
      module.exports = ParimeManagementLayoutView;
      module.exports.default_configuration = _ViewConfiguration;
    }, {
      "pict-view": 10
    }],
    19: [function (require, module, exports) {
      var libPictView = require('pict-view');
      var _ViewConfiguration = {
        ViewIdentifier: "ParimeManagement-Login",
        DefaultRenderable: "ParimeManagement-Login-Content",
        DefaultDestinationAddress: "#ParimeManagement-Content-Container",
        AutoRender: false,
        CSS: /*css*/"\n\t\t.parime-login {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tjustify-content: center;\n\t\t\tmin-height: calc(100vh - 56px - 48px);\n\t\t\tpadding: 2em;\n\t\t}\n\t\t.parime-login-card {\n\t\t\tbackground: #fff;\n\t\t\tborder: 1px solid #DDD6CA;\n\t\t\tborder-radius: 8px;\n\t\t\tpadding: 2.5em;\n\t\t\twidth: 100%;\n\t\t\tmax-width: 400px;\n\t\t\tbox-shadow: 0 2px 8px rgba(61, 50, 41, 0.08);\n\t\t}\n\t\t.parime-login-card h2 {\n\t\t\tmargin: 0 0 0.25em 0;\n\t\t\tfont-size: 1.5em;\n\t\t\tfont-weight: 600;\n\t\t\tcolor: #3D3229;\n\t\t}\n\t\t.parime-login-card p {\n\t\t\tmargin: 0 0 1.5em 0;\n\t\t\tcolor: #7A7568;\n\t\t\tfont-size: 0.9em;\n\t\t}\n\t\t.parime-login-field {\n\t\t\tmargin-bottom: 1em;\n\t\t}\n\t\t.parime-login-field label {\n\t\t\tdisplay: block;\n\t\t\tmargin-bottom: 0.35em;\n\t\t\tfont-size: 0.85em;\n\t\t\tfont-weight: 500;\n\t\t\tcolor: #5E5549;\n\t\t}\n\t\t.parime-login-field input {\n\t\t\twidth: 100%;\n\t\t\tpadding: 0.6em 0.75em;\n\t\t\tborder: 1px solid #DDD6CA;\n\t\t\tborder-radius: 4px;\n\t\t\tfont-size: 0.95em;\n\t\t\tcolor: #423D37;\n\t\t\tbackground: #fff;\n\t\t\ttransition: border-color 0.15s;\n\t\t}\n\t\t.parime-login-field input:focus {\n\t\t\toutline: none;\n\t\t\tborder-color: #2E7D74;\n\t\t\tbox-shadow: 0 0 0 2px #E0EDEB;\n\t\t}\n\t\t.parime-login-button {\n\t\t\twidth: 100%;\n\t\t\tpadding: 0.7em;\n\t\t\tbackground-color: #2E7D74;\n\t\t\tcolor: #fff;\n\t\t\tborder: none;\n\t\t\tborder-radius: 4px;\n\t\t\tfont-size: 1em;\n\t\t\tfont-weight: 500;\n\t\t\tcursor: pointer;\n\t\t\ttransition: background-color 0.15s;\n\t\t\tmargin-top: 0.5em;\n\t\t}\n\t\t.parime-login-button:hover {\n\t\t\tbackground-color: #256861;\n\t\t}\n\t",
        Templates: [{
          Hash: "ParimeManagement-Login-Template",
          Template: /*html*/"\n<div class=\"parime-login\">\n\t<div class=\"parime-login-card\">\n\t\t<h2>Parime Management</h2>\n\t\t<p>Sign in to manage your data lake.</p>\n\t\t<div class=\"parime-login-field\">\n\t\t\t<label for=\"parime-login-username\">Username</label>\n\t\t\t<input type=\"text\" id=\"parime-login-username\" placeholder=\"Enter username\" />\n\t\t</div>\n\t\t<div class=\"parime-login-field\">\n\t\t\t<label for=\"parime-login-password\">Password</label>\n\t\t\t<input type=\"password\" id=\"parime-login-password\" placeholder=\"Enter password\" />\n\t\t</div>\n\t\t<button class=\"parime-login-button\" id=\"parime-login-submit\">Sign In</button>\n\t</div>\n</div>\n"
        }],
        Renderables: [{
          RenderableHash: "ParimeManagement-Login-Content",
          TemplateHash: "ParimeManagement-Login-Template",
          DestinationAddress: "#ParimeManagement-Content-Container",
          RenderMethod: "replace"
        }]
      };
      var ParimeManagementLoginView = /*#__PURE__*/function (_libPictView6) {
        function ParimeManagementLoginView(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, ParimeManagementLoginView);
          return _callSuper(this, ParimeManagementLoginView, [pFable, pOptions, pServiceHash]);
        }
        _inherits(ParimeManagementLoginView, _libPictView6);
        return _createClass(ParimeManagementLoginView, [{
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            var _this31 = this;
            // Wire up the login button click handler
            var tmpLoginButton = document.getElementById('parime-login-submit');
            if (tmpLoginButton) {
              tmpLoginButton.addEventListener('click', function () {
                var tmpUserName = document.getElementById('parime-login-username').value;
                var tmpPassword = document.getElementById('parime-login-password').value;
                _this31.pict.PictApplication.attemptLogin(tmpUserName, tmpPassword);
              });
            }

            // Wire up Enter key on password field
            var tmpPasswordField = document.getElementById('parime-login-password');
            if (tmpPasswordField) {
              tmpPasswordField.addEventListener('keypress', function (pEvent) {
                if (pEvent.key === 'Enter') {
                  var tmpUserName = document.getElementById('parime-login-username').value;
                  var tmpPassword = document.getElementById('parime-login-password').value;
                  _this31.pict.PictApplication.attemptLogin(tmpUserName, tmpPassword);
                }
              });
            }
            return _superPropGet(ParimeManagementLoginView, "onAfterRender", this, 3)([pRenderable, pRenderDestinationAddress, pRecord, pContent]);
          }
        }]);
      }(libPictView);
      module.exports = ParimeManagementLoginView;
      module.exports.default_configuration = _ViewConfiguration;
    }, {
      "pict-view": 10
    }],
    20: [function (require, module, exports) {
      var libPictView = require('pict-view');
      var _ViewConfiguration = {
        ViewIdentifier: "ParimeManagement-TopBar",
        DefaultRenderable: "ParimeManagement-TopBar-Content",
        DefaultDestinationAddress: "#ParimeManagement-TopBar-Container",
        AutoRender: false,
        CSS: /*css*/"\n\t\t.parime-topbar {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tjustify-content: space-between;\n\t\t\tbackground-color: var(--theme-color-text-primary, #3D3229);\n\t\t\tcolor: #F5F0E8;\n\t\t\tpadding: 0 1.5em;\n\t\t\theight: 56px;\n\t\t\tbox-shadow: 0 2px 4px rgba(0, 0, 0, 0.15);\n\t\t\tposition: sticky;\n\t\t\ttop: 0;\n\t\t\tz-index: 100;\n\t\t}\n\t\t.parime-topbar-brand {\n\t\t\tfont-size: 1.25em;\n\t\t\tfont-weight: 600;\n\t\t\tletter-spacing: 0.02em;\n\t\t\tcolor: #2E7D74;\n\t\t\ttext-decoration: none;\n\t\t\tcursor: pointer;\n\t\t}\n\t\t.parime-topbar-brand:hover {\n\t\t\tcolor: #3A9E93;\n\t\t}\n\t\t.parime-topbar-nav {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tgap: 0.25em;\n\t\t}\n\t\t.parime-topbar-nav a {\n\t\t\tcolor: #B5AA9A;\n\t\t\ttext-decoration: none;\n\t\t\tpadding: 0.5em 0.75em;\n\t\t\tborder-radius: 4px;\n\t\t\tfont-size: 0.9em;\n\t\t\ttransition: background-color 0.15s, color 0.15s;\n\t\t\tcursor: pointer;\n\t\t}\n\t\t.parime-topbar-nav a:hover {\n\t\t\tbackground-color: #524438;\n\t\t\tcolor: #F5F0E8;\n\t\t}\n\t\t.parime-topbar-nav a.active {\n\t\t\tbackground-color: #2E7D74;\n\t\t\tcolor: #fff;\n\t\t}\n\t\t.parime-topbar-user {\n\t\t\tdisplay: flex;\n\t\t\talign-items: center;\n\t\t\tgap: 0.75em;\n\t\t\tfont-size: 0.9em;\n\t\t}\n\t\t.parime-topbar-user span {\n\t\t\tcolor: #8A7F72;\n\t\t}\n\t\t.parime-topbar-user a {\n\t\t\tcolor: #B5AA9A;\n\t\t\ttext-decoration: none;\n\t\t\tcursor: pointer;\n\t\t\tpadding: 0.4em 0.6em;\n\t\t\tborder-radius: 4px;\n\t\t\ttransition: background-color 0.15s, color 0.15s;\n\t\t}\n\t\t.parime-topbar-user a:hover {\n\t\t\tbackground-color: #524438;\n\t\t\tcolor: #F5F0E8;\n\t\t}\n\t",
        Templates: [{
          Hash: "ParimeManagement-TopBar-Template",
          Template: /*html*/"\n<div class=\"parime-topbar\">\n\t<a class=\"parime-topbar-brand\" onclick=\"{~P~}.PictApplication.navigateTo('/Dashboard')\">Parime</a>\n\t<div class=\"parime-topbar-nav\" id=\"ParimeManagement-TopBar-Nav\"></div>\n\t<div class=\"parime-topbar-user\" id=\"ParimeManagement-TopBar-UserArea\"></div>\n</div>\n"
        }, {
          Hash: "ParimeManagement-TopBar-LoggedIn-Template",
          Template: /*html*/"<span>{~D:AppData.ParimeManagement.User.DisplayName~}</span><a onclick=\"{~P~}.PictApplication.logout()\">Logout</a>"
        }, {
          Hash: "ParimeManagement-TopBar-LoggedOut-Template",
          Template: /*html*/"<a onclick=\"{~P~}.PictApplication.navigateTo('/Login')\">Login</a>"
        }],
        Renderables: [{
          RenderableHash: "ParimeManagement-TopBar-Content",
          TemplateHash: "ParimeManagement-TopBar-Template",
          DestinationAddress: "#ParimeManagement-TopBar-Container",
          RenderMethod: "replace"
        }]
      };
      var ParimeManagementTopBarView = /*#__PURE__*/function (_libPictView7) {
        function ParimeManagementTopBarView(pFable, pOptions, pServiceHash) {
          _classCallCheck(this, ParimeManagementTopBarView);
          return _callSuper(this, ParimeManagementTopBarView, [pFable, pOptions, pServiceHash]);
        }
        _inherits(ParimeManagementTopBarView, _libPictView7);
        return _createClass(ParimeManagementTopBarView, [{
          key: "onAfterRender",
          value: function onAfterRender(pRenderable, pRenderDestinationAddress, pRecord, pContent) {
            var tmpAppData = this.pict.AppData.ParimeManagement;
            var tmpCurrentRoute = tmpAppData && tmpAppData.CurrentRoute || '';

            // Build navigation links with active state
            var tmpNavLinks = [{
              Route: '/Dashboard',
              Label: 'Dashboard',
              View: 'ParimeManagement-Dashboard'
            }, {
              Route: '/Lakes',
              Label: 'Lakes',
              View: 'ParimeManagement-Lakes'
            }, {
              Route: '/Configuration',
              Label: 'Configuration',
              View: 'ParimeManagement-Configuration'
            }];
            var tmpNavHTML = '';
            for (var i = 0; i < tmpNavLinks.length; i++) {
              var tmpLink = tmpNavLinks[i];
              var tmpActiveClass = tmpCurrentRoute === tmpLink.View ? ' class="active"' : '';
              tmpNavHTML += "<a".concat(tmpActiveClass, " onclick=\"").concat(this.pict.getClientSideReferenceForPict(), ".PictApplication.navigateTo('").concat(tmpLink.Route, "')\">").concat(tmpLink.Label, "</a>");
            }
            this.pict.ContentAssignment.assignContent('#ParimeManagement-TopBar-Nav', tmpNavHTML);

            // Conditionally render the user area based on login state
            var tmpUserData = tmpAppData && tmpAppData.User;
            var tmpTemplateHash = tmpUserData && tmpUserData.LoggedIn ? 'ParimeManagement-TopBar-LoggedIn-Template' : 'ParimeManagement-TopBar-LoggedOut-Template';
            var tmpUserAreaContent = this.pict.parseTemplateByHash(tmpTemplateHash, {}, null, this.pict);
            this.pict.ContentAssignment.assignContent('#ParimeManagement-TopBar-UserArea', tmpUserAreaContent);
            return _superPropGet(ParimeManagementTopBarView, "onAfterRender", this, 3)([pRenderable, pRenderDestinationAddress, pRecord, pContent]);
          }
        }]);
      }(libPictView);
      module.exports = ParimeManagementTopBarView;
      module.exports.default_configuration = _ViewConfiguration;
    }, {
      "pict-view": 10
    }]
  }, {}, [12])(12);
});
//# sourceMappingURL=parime-management.compatible.js.map
