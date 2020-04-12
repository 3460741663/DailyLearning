// // 1. 最简版本
// let a = {b:1,c:{d:1}};
// // let a = function (){}
// let aa = JSON.parse(JSON.stringify(a));
// a.c.d = 2;
// console.log(a,aa);
// // 无法拷贝函数、循环引用


// // 2.手写递归版本
// function deepClone(obj){
//   if(typeof obj === 'object'){
//     let res = {};
//     for (const key in obj) {
//       res[key] = deepClone(obj[key])
//     }
//     return res;
//   }else{
//     return obj
//   } 
// }
// let b = {b:1,c:{d:1}};
// // let bb = JSON.parse(JSON.stringify(b));
// let bb = deepClone(b)
// b.c.d = 2;
// console.log(b,bb)
// // 依旧是无法处理循环引用，函数

// 3. 数组和循环引用的优化,弱应用
// 什么是弱引用呢？
// 在计算机程序设计中，弱引用与强引用相对，是指不能确保其引用的对象不会被垃圾回收器回收的引用。
// 一个对象若只被弱引用所引用，则被认为是不可访问（或弱可访问）的，并因此可能在任何时刻被回收。
// function deepClone(obj, map = new WeakMap()){
//   if(typeof obj == 'object'){
//     let res = Array.isArray(obj) ? [] : {};
//     if(map.get(obj)){
//       return map.get(obj)
//     }
//     map.set(obj,res)
//     for (const key in obj) {
//       res[key] = deepClone(obj[key],map)
//     }
//     return res;
//   }else{
//     return obj
//   } 
// }
// let f = {b:1,c:{d:[1,2,3,4]}};
// // f.e = f;
// let ff = deepClone(f)
// f.c.d[0] = -1;
// console.log(f,ff)
// 加入map,保存键值对


// // 多类型优化
// function cloneSet(set) {
//   let t = new Set();
//   set.forEach(v => {
//     t.add(clone(v));
//   })
//   return t;
// }
// // Map  for
// function cloneArray(arr) {
//   let t = [];
//   arr.forEach(v => {
//     t.push(clone(v))
//   })
//   return t;
// }
// function cloneReg(targe) {
//   //{}
//   const result = new RegExp(targe.source);
//   result.lastIndex = targe.lastIndex;
//   return result;
// }
// function cloneObj(obj) {
//   let t = {};
//   Object.keys(obj).forEach(k => {
//     t[k] = clone(obj[k]);
//   })
//   return t
// }
// function cloneFun(func) {
//   const funcString = func.toString();
//   let paramReg = /\((.+)\)/;
//   let bodyReg = /(?<={)(.|\n)+(?=})/m;
//   if (func.prototype) {
//     const param = paramReg.exec(funcString);
//     const body = bodyReg.exec(funcString);
//     if (body) {
//       if (param) {
//         const paramArr = param[1].split(',');
//         return new Function(...paramArr, body[0]);
//       } else {
//         return new Function(body[0]);
//       }
//     } else {
//       return null;
//     }
//   } else {
//     return eval(funcString);
//   }
// }
// const mapTag = '[object Map]';
// const setTag = '[object Set]';
// const arrayTag = '[object Array]';
// const objectTag = '[object Object]';

// const boolTag = '[object Boolean]';
// const dateTag = '[object Date]';
// const errorTag = '[object Error]';
// const numberTag = '[object Number]';
// const regexpTag = '[object RegExp]';
// const stringTag = '[object String]';
// const symbolTag = '[object Symbol]';


// const needClone = {
//   '[object Set]': cloneSet,
//   '[object Array]': cloneArray,
//   '[object RegExp]': cloneReg,
//   '[object Object]': cloneObj,
//   '[object Function]': cloneFun
// }
// const whiteList = ['[object String]', '[object Number]']
// function getType(target) {
//   return Object.prototype.toString.call(target);
// }
// function clone(data) {
//   let type = getType(data)
//   if (whiteList.includes(type)) return data;
//   return needClone[type](data)
// }

// let c = function(a, b) { return a + b }
// let data = { obj: { a: 1 }, b: [1], c: /[a-z]/, fun: c}
// let data1 = clone(data);
// data1.b.push(2);
// console.log(data1, data);
// console.log(data1.c === data.c);
// console.log(data1.fun === data.fun, data1.fun(1,2));


// 调用到的函数
const needClone = {
  '[object Object]': cloneObj,
  '[object Set]': cloneSet,
  '[object RegExp]': cloneReg,
  '[object Array]': cloneArr,
  '[object Function]': cloneFun
}
// 克隆对象
function cloneObj(target) {
  let res = {};
  for (const key in target) {
    res[key] = clone(target[key])
  }
  return res;
}
// 克隆Set
function cloneSet(target) {
  let res = new Set();
  target.forEach(element => {
    res.add(clone(element))
  });
  return res;
}
// 克隆Arr
function cloneArr(target) {
  let res = [];
  for (const key in target) {
    res.push(clone(target[key]))
  }
  return res;
}
// 克隆Reg
function cloneReg(targe) {
  let res = new RegExp(targe.source);
  res.lastIndex = targe.lastIndex;
  return res;
}
// 克隆方法
// function cloneFun(target){
//   // 克隆方法主要是参数处理比较复杂，箭头函数就很简单
//   let funStr = target.toString();
//   // 箭头函数没有prototype
//   if(target.prototype){
//     // 分离出参数和函数体
//     let parmReg = /\((.+)\)/; // 参数列表匹配
//     // let bodyReg = 
//   }else{
//     return eval(funStr)
//   }
// }
// 克隆箭头函数很简单eval(string)就行了
// 普通函数只能就要匹配出参数和函数体了
// new Function(...[参数列表],函数体)
function cloneFun(func) {
  let paramReg = /\((.+)\)/;
  let bodyReg = /\{([\s\S]+)\}$/m;
  const funcString = func.toString();
  if (func.prototype) {
    console.log('普通函数');
    const param = paramReg.exec(funcString);
    const body = bodyReg.exec(funcString);
    if (body) {
      console.log('匹配到函数体：', body[0]);
      if (param) {
        const paramArr = param[1].split(',');
        console.log('匹配到参数：', paramArr);
        let newFun = new Function(...paramArr, body[0])
        return newFun
      } else {
        return new Function(body[0]);
      }
    } else {
      return null;
    }
  } else {
    return eval(funcString);
  }
}
// 白名单，不是应用类型
let whiteList = ['[object Number]', '[object String]'];
function getType(target) {
  return Object.prototype.toString.call(target)
}
// 入口
function clone(target) {
  let type = getType(target);
  if (whiteList.includes(type)) return target;
  return needClone[type](target)
}
let f = {
  obj: { a: 1 }, b: [1], c: /[a-z]/, func1: () => {
    console.log('code秘密花园');
  },
  func2: function (a, b) {
    return a + b;
  }
}
// f.e = f;
let ff = clone(f)
f.b[0] = 10;
console.log(f, ff)

// let funStr = func2.toString();
// console.log(funStr)
// const bodyReg = /(?<={)(.|\n)+(?=})/m;
// function a(b,c,d){
//   return ()=>{
//     return a+b+c;
//   }
// }
// let funStr = a.toString();
// let paramReg = /\((.+)\)/;
// let bodyReg = /\{([\s\S]+)\}$/m;
// const param = paramReg.exec(funStr);
// const body = bodyReg.exec(funStr);
// console.log(param[1],body[0])

