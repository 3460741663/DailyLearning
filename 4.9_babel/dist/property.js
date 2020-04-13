"use strict";

var _dec, _class, _descriptor, _temp;

function _initializerDefineProperty(target, property, descriptor, context) { if (!descriptor) return; Object.defineProperty(target, property, { enumerable: descriptor.enumerable, configurable: descriptor.configurable, writable: descriptor.writable, value: descriptor.initializer ? descriptor.initializer.call(context) : void 0 }); }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

function _initializerWarningHelper(descriptor, context) { throw new Error('Decorating class property failed. Please ensure that ' + 'proposal-class-properties is enabled and runs after the decorators transform.'); }

function debounce(func, wait) {
  var timeout, result;
  return function () {
    var context = this;
    var args = arguments; // 上一个 定时器 清楚
    // 接着一个 新的定时器 它的时间又会往后推迟

    clearTimeout(timeout); // 几秒过后在执行

    timeout = setTimeout(function () {
      result = func.apply(context, args);
    }, wait);
    return result;
  };
}

function decDebounce(wait) {
  return function handleDescriptor(target, key, descriptor) {
    console.log('target', target, descriptor); // const callback = descriptor.value;

    var callback = descriptor.initializer && descriptor.initializer.call(this);

    if (typeof callback !== 'function') {
      throw new SyntaxError('Only functions can be debounced');
    }

    var fn = debounce(callback, wait); // console.log(fn);
    // console.log(descriptor);
    // descriptor.value = fn;

    return {
      enumerable: true,
      configurable: true,
      get: function get() {
        return fn;
      } // set: function (c) {
      //   fn = c;
      // }

    };
  };
}

var Btn = (_dec = decDebounce(1000), (_class = (_temp = /*#__PURE__*/function () {
  function Btn() {
    _classCallCheck(this, Btn);

    _initializerDefineProperty(this, "handleClick", _descriptor, this);
  }

  _createClass(Btn, [{
    key: "bindEvent",
    value: function bindEvent() {
      document.getElementById('btn').addEventListener('click', this.handleClick);
    }
  }]);

  return Btn;
}(), _temp), (_descriptor = _applyDecoratedDescriptor(_class.prototype, "handleClick", [_dec], {
  configurable: true,
  enumerable: true,
  writable: true,
  initializer: function initializer() {
    return function () {
      console.log(1);
    };
  }
})), _class));
var b = new Btn();
b.bindEvent();