parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"Bzn5":[function(require,module,exports) {
var define;
var t;function e(t){return(e="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(t){return typeof t}:function(t){return t&&"function"==typeof Symbol&&t.constructor===Symbol&&t!==Symbol.prototype?"symbol":typeof t})(t)}parcelRequire=function(r,n,i,o){var c,s="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function a(t,e){if(!n[t]){if(!r[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!e&&i)return i(t,!0);if(s)return s(t,!0);if(u&&"string"==typeof t)return u(t);var o=new Error("Cannot find module '"+t+"'");throw o.code="MODULE_NOT_FOUND",o}l.resolve=function(e){return r[t][1][e]||e},l.cache={};var c=n[t]=new a.Module(t);r[t][0].call(c.exports,l,c,c.exports,this)}return n[t].exports;function l(t){return a(l.resolve(t))}}a.isParcelRequire=!0,a.Module=function(t){this.id=t,this.bundle=a,this.exports={}},a.modules=r,a.cache=n,a.parent=s,a.register=function(t,e){r[t]=[function(t,r){r.exports=e},{}]};for(var l=0;l<i.length;l++)try{a(i[l])}catch(r){c||(c=r)}if(i.length){var f=a(i[i.length-1]);"object"==("undefined"==typeof exports?"undefined":e(exports))&&"undefined"!=typeof module?module.exports=f:"function"==typeof t&&t.amd?t(function(){return f}):this[o]=f}if(parcelRequire=a,c)throw c;return a}({zttq:[function(t,e,r){"use strict";Object.defineProperty(r,"__esModule",{value:!0}),r._initCvs=function(t,e,r){t.fillStyle="#000",t.strokeStyle="#0f0"},r._primer=function(t,e,r){t.fillRect(0,0,e,r);var n=t.strokeStyle;t.strokeStyle="#777",t.beginPath(),t.moveTo(0,r/2),t.lineTo(e,r/2),t.stroke(),t.strokeStyle=n},r._drawRawOsc=function(t,e,r,n){t.beginPath();for(var i=0;i<e.length;i++){var o=i*(1*r/e.length),c=e[i]/128*n/2;0===i?t.moveTo(o,c):t.lineTo(o,c)}t.stroke()}},{}],Focm:[function(t,r,n){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.Oscilloscope=c,n.MediaStreamOscilloscope=function(t,e){var r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:null,n=arguments.length>3&&void 0!==arguments[3]?arguments[3]:2048,i=arguments.length>4&&void 0!==arguments[4]?arguments[4]:null,o=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,u=s(),a=u.createMediaStreamSource(t);return new c(u,a,e,r,n,i,o)},n.createAudioContext=s;var i=function(t){if(t&&t.__esModule)return t;if(null===t||"object"!=e(t)&&"function"!=typeof t)return{default:t};var r=o();if(r&&r.has(t))return r.get(t);var n={},i=Object.defineProperty&&Object.getOwnPropertyDescriptor;for(var c in t)if(Object.prototype.hasOwnProperty.call(t,c)){var s=i?Object.getOwnPropertyDescriptor(t,c):null;s&&(s.get||s.set)?Object.defineProperty(n,c,s):n[c]=t[c]}return n.default=t,r&&r.set(t,n),n}(t("./tools/canvas_tools"));function o(){if("function"!=typeof WeakMap)return null;var t=new WeakMap;return o=function(){return t},t}function c(t,e,r){var n=this,o=arguments.length>3&&void 0!==arguments[3]?arguments[3]:null,c=arguments.length>4&&void 0!==arguments[4]?arguments[4]:2048,s=arguments.length>5&&void 0!==arguments[5]?arguments[5]:null,u=arguments.length>6&&void 0!==arguments[6]?arguments[6]:null;this.actx=t,this.FFT=c,this.cvs=r,this.init=s||i._initCvs,this.primer=u||i._primer,this.paused=!1,this.anl=this.actx.createAnalyser(),this.ctx=t,this.src=e,this.dest=o,this.anl.fftSize=this.FFT,this.src.connect(this.anl),this.dest&&this.anl.connect(this.dest);var a=this.cvs,l=a.width,f=void 0===l?300:l,h=a.height,d=void 0===h?150:h;this.WIDTH=f,this.HEIGHT=d,this.u8ar=new Uint8Array(this.FFT),this.cctx=this.cvs.getContext("2d"),this.init(this.cctx,this.WIDTH,this.HEIGHT),this.draw=function(){n.paused||requestAnimationFrame(n.draw),n.cctx.clearRect(0,0,n.WIDTH,n.HEIGHT),n.primer(n.cctx,n.WIDTH,n.HEIGHT),n.anl.getByteTimeDomainData(n.u8ar),i._drawRawOsc(n.cctx,n.u8ar,n.WIDTH,n.HEIGHT)},this.start=function(){n.paused=!1,n.draw()},this.pause=function(){n.paused=!0},this.reset=function(){n.paused=!0,requestAnimationFrame(function(){n.u8ar=new Uint8Array(n.FFT).fill(0),n.cctx.clearRect(0,0,n.WIDTH,n.HEIGHT),n.primer(n.cctx,n.WIDTH,n.HEIGHT),i._drawRawOsc(n.cctx,n.u8ar,n.WIDTH,n.HEIGHT)})}}function s(){return new(window.AudioContext||window.webkitAudioContext)}},{"./tools/canvas_tools":"zttq"}]},{},["Focm"],"_osc");
},{}],"A2T1":[function(require,module,exports) {
"use strict";var e=require("../dist/index");function t(e,t,r){var n=e.strokeStyle;e.strokeStyle="#444",e.fillRect(0,0,t,r),e.beginPath();for(var o=0;o<t;o+=10)e.moveTo(o,0),e.lineTo(o,r);for(var i=0;i<r;i+=10)e.moveTo(0,i),e.lineTo(t,i);e.stroke(),e.strokeStyle=n}function r(){var r=document.querySelector(".cvs");navigator.mediaDevices.getUserMedia({audio:!0}).then(function(n){var o=new e.MediaStreamOscilloscope(n,r,null,2048,null,t);o.start(),document.querySelector(".btn.pause").addEventListener("click",o.pause),document.querySelector(".btn.reset").addEventListener("click",o.reset)})}document.querySelector(".start").addEventListener("click",r);
},{"../dist/index":"Bzn5"}]},{},["A2T1"], null)
//# sourceMappingURL=/webaudio-oscilloscope/app.0deb5823.js.map