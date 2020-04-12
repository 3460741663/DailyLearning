- 命名空间 name space 
    Phaser { }
    1. 声明领地
    取名字 var MIUI = {} MIUI.version = '10.1'; MIUI.openSystem = function(){}
    游戏框架 最小化入侵我们的window 污染
    2. var Phaser = {} 直接挂载到 window 上  作用域 scope
    window => 
    3. es5 里面 类的构造 使用function(){}
    如果函数名首字母大写，那么它就是类 构造函数
    方法 Phaser.Game.prototype.getName