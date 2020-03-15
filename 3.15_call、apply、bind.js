// call和apply改变了函数的this上下文后便执行该函数,而bind则是返回改变了上下文后的一个函数。
// 他们俩之间的差别在于参数的区别，call和aplly的第一个参数都是要改变上下文的对象，
// 而call从第二个参数开始以参数列表的形式展现，apply则是把除了改变上下文对象的参数放在一个数组里面作为它的第二个参数。


// call实现
// Function.prototype.myCall = function(context, ...args){
//   if(this == Function.prototype){
//     // 如果有恶心的用户刁钻的用户用Function.prototype，防止死循环
//     return undefined;
//   }
//   // 让context上也有一个方法，再通过context来调用就好了
//   // context不能为空
//   context = context || window;
//   // 给context一个属性，这个属性上挂上这个方法
//   const fn = Symbol();
//   // this指的就是调用call的方法
//   context[fn] = this;
//   const result = context[fn](...args);
//   // 调用函数后即删除该Symbol属性
//   delete context[fn];
//   return result;
// }


// Function.prototype.mycall = function (context,...args){
//   context.fn = this;
//   const result = context.fn(...args);
//   delete context.fn;
//   return result;
// }



// // apply实现
// Function.prototype.myApply = function (context, args){
//   if(this == Function.prototype){
//     return undefined
//   }
//   const fn = Symbol();
//   context = context || window;
//   context[fn] = this;
//   let result;
//   // 第二个参数只能是数组
//   if(Array.isArray(args)){
//     result = context[fn](args);
//   }else{
//     result = context[fn]();
//   }
//   delete context[fn];
//   return result
// }
// // 极速版
// Function.prototype.myApply = function (context, args){
//   context.fn = this;
//   let result;
//   if(Array.isArray(args)){
//     result = context.fn(args)
//   }else{
//     result = context.fn();
//   }
//   delete context.fn;
//   return result;
// }

Function.prototype.myBind = function (context,...args1) {
  const _this = this
  return function F(...args2) {
    return _this.apply(context, args1.concat(args2))
  }
}

Function.prototype.myBind = function (context, ...args1){
  if(this == Function.prototype){
    return new TypeError();
  }
  let _this = this;
  return function F(...args2){
    if(this == F){
      return new _this.context(...args1,...args2)
    }else{
      return _this.apply(context, args1.concat(args2))
    }
  }
}


function abc (){
  this.a = 1;
  this.b = 2;
  console.log(this.c);
  return 3456;
}
let obj = {c:1};
abc.myApply(obj);
console.log(obj)

