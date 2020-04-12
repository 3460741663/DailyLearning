function Parent(name) { 
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log('parent name:', this.name);
}
function Child(name) {
  this.name = name;
}

Child.prototype = new Parent('father');
// Child.prototype.constructor = Child;

Child.prototype.sayName = function() {
  console.log('child name:', this.name);
}
var child = new Child('son');
child.sayName();    // child name: son
// 1. 原型链继承
// `Child.prototype = new Parent('father');`这样 Child.prototype ->{name: "father", sayName: ƒ}
// childe.__proto__ -> {name: "father", sayName: ƒ}
// 问题1来了，child.constructor -> Parent(name) {this.name = name;}是为什么
// parent.constructor是这么来的，首先找自己，自己没有就找parent.__proto__发现上面有，就这个属性指向的就是-> Parent(name) {this.name = name;}
// child自己没有，child.__proto__ = {name: "father", sayName: ƒ}也没有,就继续沿着__proto__找，找到了 -> Parent(name) {this.name = name;}解决
// 问题2 为什么不直接Child.prototype = Parent.prototype
// 很明显这样的话，Child.prototype 和 Parent.prototype就是指向的同一个对象，他们就变成了同一个类，共享方法了，
// 比如上诉的`Child.prototype.sayName = function(){console.log('child name:', this.name);}`会直接把Parent.sayName()给修改掉
// 1. 子类对象找方法是沿着原型链找的，先找自己的，在找父类的
// 缺点 Child.prototype.sayName 必须写在 Child.prototype = new Parent('father'); 之后，不然就会被覆盖掉。
// 无法继承属性
function Parent(age,height) { 
  this.age = age;
  this.height = height;
}
Parent.prototype.sayName = function() {
  console.log('parent name:', this.name);
}
Parent.prototype.doSomething = function() {
  console.log('parent do something!');
}
function Child(name, parentName) {
  Parent.call(this, parentName); // 第二次调用
  this.name = name;
}
Child.prototype = new Parent();   // 第一次调用    
Child.prototype.constructor = Child;
Child.prototype.sayName = function() {
  console.log('child name:', this.name);
}
var child = new Child('son');
child.sayName();       // child name: son
child.doSomething(); 
// 2. 组合式继承
// 相比上面增加了`Parent.call(this, parentName);`意图很明显，在Child这个this上绑上Parent的属性，为后面的属性继承做铺垫
// 还增加了Child.prototype.constructor = Child;让它有自己的constructor,child.__proto__指向的就是Child，这样来实现对属性的继承
// 问题来了：组合继承使用过程中父类会被调用两次：一次是创建子类型的时候，另一次是在子类型构造函数的内部
// 第一次调用的意义就是获得Parent上的方法，本来直接Child.prototype = Parent.prototype就可以，但是上面说过这样的问题
// 解决方法：使用过渡的中间类，让这个中间类的prototype -> Parent.prototype，这时需要new这个过度类，看似意义不打，但是如果Parent是一个很大的对象，这就有用了
// 代码看第三种继承
function Parent(name) {
  this.name = name;
}
Parent.prototype.sayName = function() {
  console.log('parent name:', this.name);
}
function Child(name, parentName) {
  Parent.call(this, parentName);  
  this.name = name;    
}
// ****** 修改部分
function create(proto) {
  function F(){}
  F.prototype = proto;
  return new F();
}
Child.prototype = create(Parent.prototype);
// ******
Child.prototype.sayName = function() {
  console.log('child name:', this.name);
}
Child.prototype.constructor = Child;
var parent = new Parent('father');
parent.sayName();    // parent name: father
var child = new Child('son', 'father');
child.sayName();     // child name: son
// 寄生组合式继承
// 思路就是上面的：用一个 F 空的构造函数去取代执行了 Parent 这个构造函数。我只需要父类原型的上的方法，不需要构造它的属性
class Parent {
  constructor(name) {
this.name = name;
  }
  doSomething() {
console.log('parent do something!');
  }
  sayName() {
console.log('parent name:', this.name);
  }
}
class Child extends Parent {
  constructor(name, parentName) {
super(parentName);
this.name = name;
  }
  sayName() {
 console.log('child name:', this.name);
  }
}
const child = new Child('son', 'father');
child.sayName();            // child name: son
child.doSomething();        // parent do something!
const parent = new Parent('father');
parent.sayName();           // parent name: father
// ES6的继承就和java的继承一样了，使用extends关键字
// https://zhuanlan.zhihu.com/p/25578222
