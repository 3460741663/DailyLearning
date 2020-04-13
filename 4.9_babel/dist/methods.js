"use strict";

var _dec, _dec2, _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) { var desc = {}; Object.keys(descriptor).forEach(function (key) { desc[key] = descriptor[key]; }); desc.enumerable = !!desc.enumerable; desc.configurable = !!desc.configurable; if ('value' in desc || desc.initializer) { desc.writable = true; } desc = decorators.slice().reverse().reduce(function (desc, decorator) { return decorator(target, property, desc) || desc; }, desc); if (context && desc.initializer !== void 0) { desc.value = desc.initializer ? desc.initializer.call(context) : void 0; desc.initializer = undefined; } if (desc.initializer === void 0) { Object.defineProperty(target, property, desc); desc = null; } return desc; }

var log = function log(type) {
  // add divide
  return function (target, name, descriptor) {
    // 1: 拿到原来的 method
    var method = descriptor.value; //  2: 对 原来的 method 修改

    descriptor.value = function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      console.info("(".concat(type, ") \u6B63\u5728\u6267\u884C: ").concat(name, "(").concat(args, ") = ?"));
      var ret;

      try {
        ret = method.apply(target, args);
        console.info("(".concat(type, ") \u6210\u529F : ").concat(name, "(").concat(args, ") => ").concat(ret));
      } catch (error) {
        console.error("(".concat(type, ") \u5931\u8D25: ").concat(name, "(").concat(args, ") => ").concat(error));
      }

      return ret;
    }; // 3: 返回


    return descriptor;
  };
};

var Math = (_dec = log('ADD'), _dec2 = log('divide'), (_class = /*#__PURE__*/function () {
  function Math() {
    _classCallCheck(this, Math);
  }

  _createClass(Math, [{
    key: "add",
    value: function add(a, b) {
      return a + b;
    }
  }, {
    key: "divide",
    value: function divide(a, b) {
      return a / b;
    }
  }]);

  return Math;
}(), (_applyDecoratedDescriptor(_class.prototype, "add", [_dec], Object.getOwnPropertyDescriptor(_class.prototype, "add"), _class.prototype), _applyDecoratedDescriptor(_class.prototype, "divide", [_dec2], Object.getOwnPropertyDescriptor(_class.prototype, "divide"), _class.prototype)), _class)); // add
// 加上日志的功能 add、divide 被调用的时候，log输出一下

var math = new Math();
console.log('log', math.add(1, 3));
console.log('log', math.divide(1, 3)); // 装饰者模式：
// AOP：