// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"../tools/canvas_tools.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports._initCvs = _initCvs;
exports._primer = _primer;
exports._drawRawOsc = _drawRawOsc;

function _initCvs(ctx, width, height) {
  ctx.fillStyle = "#000";
  ctx.strokeStyle = "#0f0";
}

function _primer(ctx, width, height) {
  ctx.fillRect(0, 0, width, height);
}

function _drawRawOsc(ctx, data, width, height) {
  ctx.beginPath();

  for (var i = 0; i < data.length; i++) {
    var x = i * (width * 1.0 / data.length); // need to fix x

    var v = data[i] / 128.0;
    var y = v * height / 2;
    if (i === 0) ctx.moveTo(x, y);else ctx.lineTo(x, y);
  }

  ctx.stroke();
}
},{}],"../index.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _ct = _interopRequireWildcard(require("./tools/canvas_tools"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classPrivateFieldGet(receiver, privateMap) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to get private field on non-instance"); } if (descriptor.get) { return descriptor.get.call(receiver); } return descriptor.value; }

function _classPrivateFieldSet(receiver, privateMap, value) { var descriptor = privateMap.get(receiver); if (!descriptor) { throw new TypeError("attempted to set private field on non-instance"); } if (descriptor.set) { descriptor.set.call(receiver, value); } else { if (!descriptor.writable) { throw new TypeError("attempted to set read only private field"); } descriptor.value = value; } return value; }

var AudioOSC = function AudioOSC(ctx, cvs, source) {
  var _this = this;

  var dest = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var fft = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 2048;
  var init = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : _ct._initCvs;
  var primer = arguments.length > 6 && arguments[6] !== undefined ? arguments[6] : _ct._primer;

  _classCallCheck(this, AudioOSC);

  _actx.set(this, {
    writable: true,
    value: null
  });

  _cctx.set(this, {
    writable: true,
    value: null
  });

  _anl.set(this, {
    writable: true,
    value: null
  });

  _cvs.set(this, {
    writable: true,
    value: null
  });

  _paused.set(this, {
    writable: true,
    value: false
  });

  _WIDTH.set(this, {
    writable: true,
    value: 300
  });

  _HEIGHT.set(this, {
    writable: true,
    value: 150
  });

  _FFT.set(this, {
    writable: true,
    value: 2048
  });

  _u8ar.set(this, {
    writable: true,
    value: null
  });

  _init.set(this, {
    writable: true,
    value: null
  });

  _primer.set(this, {
    writable: true,
    value: null
  });

  _defineProperty(this, "draw", function () {
    if (!_classPrivateFieldGet(_this, _paused)) requestAnimationFrame(_this.draw);

    _classPrivateFieldGet(_this, _cctx).clearRect(0, 0, _classPrivateFieldGet(_this, _WIDTH), _classPrivateFieldGet(_this, _HEIGHT));

    _classPrivateFieldGet(_this, _primer).call(_this, _classPrivateFieldGet(_this, _cctx), _classPrivateFieldGet(_this, _WIDTH), _classPrivateFieldGet(_this, _HEIGHT));

    _classPrivateFieldGet(_this, _anl).getByteTimeDomainData(_classPrivateFieldGet(_this, _u8ar));

    _ct._drawRawOsc(_classPrivateFieldGet(_this, _cctx), _classPrivateFieldGet(_this, _u8ar), _classPrivateFieldGet(_this, _WIDTH), _classPrivateFieldGet(_this, _HEIGHT));
  });

  _defineProperty(this, "start", function () {
    _classPrivateFieldSet(_this, _paused, false);

    _this.draw();
  });

  _defineProperty(this, "pause", function () {
    _classPrivateFieldSet(_this, _paused, true);
  });

  _defineProperty(this, "reset", function () {
    _classPrivateFieldSet(_this, _u8ar, new Uint8Array().fill(0));

    _classPrivateFieldGet(_this, _cctx).clearRect(0, 0, _classPrivateFieldGet(_this, _WIDTH), _classPrivateFieldGet(_this, _HEIGHT));

    _classPrivateFieldGet(_this, _primer).call(_this, _classPrivateFieldGet(_this, _cctx), _classPrivateFieldGet(_this, _WIDTH), _classPrivateFieldGet(_this, _HEIGHT));

    _ct._drawRawOsc(_classPrivateFieldGet(_this, _cctx), _classPrivateFieldGet(_this, _u8ar), _classPrivateFieldGet(_this, _WIDTH), _classPrivateFieldGet(_this, _HEIGHT));
  });

  _classPrivateFieldSet(this, _actx, ctx);

  _classPrivateFieldSet(this, _FFT, fft);

  _classPrivateFieldSet(this, _cvs, cvs);

  _classPrivateFieldSet(this, _init, init);

  _classPrivateFieldSet(this, _primer, primer);

  _classPrivateFieldSet(this, _anl, _classPrivateFieldGet(this, _actx).createAnalyser()); // Configure Analyzer


  _classPrivateFieldGet(this, _anl).fftSize = _classPrivateFieldGet(this, _FFT);
  source.connect(_classPrivateFieldGet(this, _anl));
  if (dest) _classPrivateFieldGet(this, _anl).connect(dest); // Set up Canvas

  var _classPrivateFieldGet2 = _classPrivateFieldGet(this, _cvs),
      _classPrivateFieldGet3 = _classPrivateFieldGet2.width,
      width = _classPrivateFieldGet3 === void 0 ? 300 : _classPrivateFieldGet3,
      _classPrivateFieldGet4 = _classPrivateFieldGet2.height,
      height = _classPrivateFieldGet4 === void 0 ? 150 : _classPrivateFieldGet4;

  _classPrivateFieldSet(this, _WIDTH, width);

  _classPrivateFieldSet(this, _HEIGHT, height);

  _classPrivateFieldSet(this, _u8ar, new Uint8Array(_classPrivateFieldGet(this, _FFT)));

  _classPrivateFieldSet(this, _cctx, _classPrivateFieldGet(this, _cvs).getContext("2d"));

  _classPrivateFieldGet(this, _init).call(this, _classPrivateFieldGet(this, _cctx), _classPrivateFieldGet(this, _WIDTH), _classPrivateFieldGet(this, _HEIGHT));
};

exports.default = AudioOSC;

var _actx = new WeakMap();

var _cctx = new WeakMap();

var _anl = new WeakMap();

var _cvs = new WeakMap();

var _paused = new WeakMap();

var _WIDTH = new WeakMap();

var _HEIGHT = new WeakMap();

var _FFT = new WeakMap();

var _u8ar = new WeakMap();

var _init = new WeakMap();

var _primer = new WeakMap();
},{"./tools/canvas_tools":"../tools/canvas_tools.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _index = _interopRequireDefault(require("../index"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var osc = null;

function init() {
  var ctx = new AudioContext();
  var cvs = document.querySelector(".cvs");
  navigator.mediaDevices.getUserMedia({
    audio: true,
    video: true
  }).then(function (stream) {
    var _streamSrc = ctx.createMediaStreamSource(stream);

    osc = new _index.default(ctx, cvs, _streamSrc, null, 2048);
    osc.start();
    document.querySelector(".btn.pause").addEventListener("click", osc.pause);
    document.querySelector(".btn.reset").addEventListener("click", osc.reset);
  });
}

document.querySelector(".btn.start").addEventListener("click", init);
},{"../index":"../index.js"}],"../node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "59477" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/app.c328ef1a.js.map