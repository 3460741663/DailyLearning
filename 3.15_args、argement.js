// 下述实验结论
// 1. 从参数列表里获取的args是数组，arguments是类数组对象
// 2. ...可以解构数组，也可以解构argument
// 3. argument就是把参数列表封装成了一个对象，按照在索引中的下标，args就是直接拿剩余参数形成数组，不定长参数列表
// 数组去重使用set
var arr = [0,0,1,1,4,4];
console.log(...new Set[arr]);

// 获取argument对象 类数组对象 不能调用数组方法
 function test1() {
  console.log('获取argument对象 类数组对象 不能调用数组方法', arguments);
}

// 获取参数数组  可以调用数组方法
function test2(...args) {
  console.log('获取参数数组  可以调用数组方法', args);
}

// 获取除第一个参数的剩余参数数组
function test3(first, ...args) {
  console.log('能调用数组方法', args);
}

// 透传参数
function test4(first, ...args) {
  console.log(args);
  console.log(...args)
  
  console.log(arguments)
  console.log(...arguments)
  fn(args);
  fn(...args)
  fn(arguments)
  fn(...arguments);
}

function fn() {
  console.log('_____',arguments)
  console.log('透传', ...arguments);
}

test1(1, 2, 3);
test2(1, 2, 3);
test3(1, 2, 3);
test4(1, 2, 3);