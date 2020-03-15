// var events = require('events');
// var eventEmitter = new events.EventEmitter();
// // 监听器 #1
// var listener1 = function listener1() {
//    console.log('监听器 listener1 执行。');
// }
// // 监听器 #2
// var listener2 = function listener2() {
//   console.log('监听器 listener2 执行。');
// }
// // 绑定 connection 事件，处理函数为 listener1 
// eventEmitter.addListener('connection', listener1);
// // 绑定 connection 事件，调用一次，处理函数为 listener2
// eventEmitter.once('connection', listener2);
// // 处理 connection 事件 
// eventEmitter.emit('connection');
// // 处理 connection 事件 
// eventEmitter.emit('connection');

// function EventEmitter() {
//   this._maxListeners = 10;
//   this._events = Object.create(null);
// }

// // 向事件队列添加事件
// // prepend为true表示向事件队列头部添加事件
// EventEmitter.prototype.addListener = function (type, listener, prepend) {
//   if (!this._events) {
//     this._events = Object.create(null);
//   }
//   if (this._events[type]) {
//     if (prepend) {
//       this._events[type].unshift(listener);
//     } else {
//       this._events[type].push(listener);
//     }
//   } else {
//     this._events[type] = [listener];
//   }
// };

// // 执行某类事件
// EventEmitter.prototype.emit = function (type, ...args) {
//   if (Array.isArray(this._events[type])) {
//     this._events[type].forEach(fn => {
//       fn.apply(this, args);
//     });
//   }
// };


// var emitter = new EventEmitter();
// var listener = function (args) {
//   console.log('我是一个listener', args, this);
// }
// emitter.addListener('click', listener);
// emitter.emit('click', '参数');
// emitter.emit('click');
// emitter.emit('click');


// EventEmitter的原理很简单
// 订阅就是把方法放进数组里，发布就是把这个事件对应的数组取出来执行一下
function EventEmitter(){
  this._maxListeners = 10
  this._event = Object.create(null)
}
EventEmitter.prototype.addListener = function (type, listener){
  console.log('增加监听事件')
  // event对象的type事件存放的数组初始化
  if(!this._event){
    this._event = Object.create(null)
  }
  if(this._event[type]){
    this._event[type].push(listener)
  }else{
    this._event[type] = [listener]
  }
}
EventEmitter.prototype.removeLister = function (type, listener){
  console.log('移除监听');
  
}

EventEmitter.prototype.emit = function (type, ...args){
  console.log('事件发布了')
  if(Array.isArray(this._event[type])){
    this._event[type].forEach(element => {
      element.apply(this,args)
    });
  }
}

var emitter = new EventEmitter();
var listener = function(args){
  console.log('我是一个监听者',args,this)
}
emitter.addListener('click',listener);
emitter.emit('click','开始发布信息了')

// var emitter = new EventEmitter();
// var listener = function (args) {
//   console.log('我是一个listener', args, this);
// }
// emitter.addListener('click', listener);
// emitter.emit('click', '参数');
