// promise的简单版本原理也很简单
// resolve把state从PENDING -> FULFILLED
// reject把state从PENDING -> REJECTED

const PENDING = 'pending';
const FULFILLED = 'fulfilled';
const REJECTED = 'rejected';

// function MyPromise(executor){
//   this.state = PENDING;
//   this.value = null;
//   this.reason = null;
//   const resolve = (value) => {
//     // 状态只能改变一次
//     if(this.state == PENDING){
//       this.state = FULFILLED;
//       this.value = value
//     }
//   }
//   const reject = (reason) => {
//     if(this.state == PENDING){
//       this.state = REJECTED;
//       this.reason = reason
//     }
//   }
//   try{
//     executor(resolve, reject)
//   }catch(reason){
//     reject(reason)
//   }
// }

// then优化
function MyPromise(executor){
  this.state = PENDING;
  this.value = null;
  this.reason = null;
  // promise 从pending -> fulfilled调用的函数数组
  this.onFulfilledCallbacks = [];
  // promise 从pending -> rejected调用的函数数组
  this.onRejectedCallbacks = [];


  const resolve = (value) => {
    // 状态只能改变一次
    if(this.state == PENDING){
      this.state = FULFILLED;
      this.value = value;
      // 状态确定了fulfilled，调用一下onFulfilledCallbacks队列里的函数
      this.onFulfilledCallbacks.forEach(element => {
        element();
      });
    }
  }
  const reject = (reason) => {
    if(this.state == PENDING){
      this.state = REJECTED;
      this.reason = reason
      // 状态确定为reject，调用一下onRejectedCallbacks队列里的函数
      this.onRejectedCallbacks.forEach(element=>{
        element();
      })
    }
  }
  try{
    executor(resolve, reject)
  }catch(reason){
    reject(reason)
  }
}
MyPromise.prototype.then = function(onFullFilled, onRejected){
  // 不同的promise的状态onFullFilled, onRejected的执行不一样
  switch(this.state){
    // promise的状态已经是fulfilled,直接执行onFullFilled就行了
    case FULFILLED :
      onFullFilled(this.value);break;
    // promise的状态已经是reject,直接执行onRejected
    case REJECTED:
      onRejected(this.reason);break;
    // promise的状态未定，把他俩加入等待队列中
    case PENDING:
      this.onFulfilledCallbacks.push(()=>{
        onFullFilled(this.value)
      })
      this.onRejectedCallbacks.push(()=>{
        onRejected(this.reason)
      })
      break;
  }
}