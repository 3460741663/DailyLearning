"use strict";

var _class;

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

// function classDecorator(target) {
//   // 1: 拿到原来的 target
//   target.flag = true;   // 2: 修改
//   return target;  // 3: 返回
// }
// Object.defineProperty({}, 'k', {
//   value: '123456'
// })   
// // ES 新的提案
// @classDecorator
// class Man{
// }
// // Man 是一个整体
// // 加一个 flag 属性
// // 1: 内部 加，对原有的侵入式的修改
// // 2：AOP：给他动态注入一个 flag
// console.log(Man.flag);
function classDecorator(target) {
  target.flag = true;
}

var Man = classDecorator(_class = function Man() {
  _classCallCheck(this, Man);
}) || _class;

console.log(Man.flag);