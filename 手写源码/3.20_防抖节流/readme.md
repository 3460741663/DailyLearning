## 去抖和节流的作用就是解决浏览器因事件频繁、频繁执行DOM操作、资源加载等重行为而感到发生的卡顿、崩溃
* window的resize、scroll事件
* 拖拽的movemouse事件
* 文字输入，自动完成的keyup事件
- 去抖: 举个例子，你进入电梯后，等2秒才关上，这俩秒内，又有人按了电梯，就要重新等俩秒。也就是说当调用动作n毫秒后，才会执行该动作，若在这n毫秒内又调用此动作则将重新计算执行时间。
输入事件，输入停止0.5秒自动去搜索啥的
```js
var debounce = function (idle, actions) {
  var last;
  return function(...args){
    var _this = this
    clearTimeout(last)
    last = setTimeout(() => {
      actions.apply(_this,args)
    },  idle);
  }
}
```
- 节流：让你这个方法，在一定的时间段内只能执行一次
```js
var throttle = function (delay, action){
  let last = 0;
  let _this = this;
  return function(...args){
    var cur = +new Date();
    if(cur - last > delay){
      action.apply(this, args)
      last = cur
    }
  }
}
```

