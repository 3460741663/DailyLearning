function _new(fn, ...arg) {
  const obj = Object.create(fn.prototype);
  const ret = fn.apply(obj, arg);
  // 如果fn的返回值是一个对象，这new的结果就是这个返回值
  return ret instanceof Object ? ret : obj;
}
// new 的原理
// 1. 创建一个对象
// 2. 绑定this的指向