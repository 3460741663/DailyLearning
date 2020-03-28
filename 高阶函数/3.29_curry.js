// 柯里化curry
const add = (a, b, c) => a + b + c;
add(1, 2, 3)

function curry(fn){
  let allArgs = [];
  let len = fn.length;// 函数参数长度
  return function next(...args){
    allArgs = allArgs.concat(args);
    if(allArgs.length >= len){
      // 参数够了
      // let temp = allArgs;
      // allArgs = []
      return fn(...args)
    } else {
      return next;
    }
  }
}
const addCurried = curry(add)
console.log(addCurried(1,2,3))
console.log(addCurried(1)(2)(3))
console.log(addCurried(1)(2,3))