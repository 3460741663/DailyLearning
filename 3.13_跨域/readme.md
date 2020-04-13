## 跨域
浏览器的安全策略
a.com 请求 b.com 的时候会被阻止，不允许

## cors
cors origin resource share
跨域资源共享，
规定了一些http的首部字段，允许服务器声明哪些站点有资源的访问权限
ctx.set('Access-Control-Allow-Origin', 'http://localhost:8080');
ctx.set('Access-Control-Allow-Methods', 'POST, GET');
ctx.set('Access-Control-Allow-Headers', 'x-custom, Content-Type');
// 允许 是否发送 cookie ... 凭证
ctx.set('Access-Control-Allow-Credentials', true);

### 规则
  cookie只能放在域名下，不能放到ip下
  ctx.set('Access-Control-Allow-Methods', 'POST, GET');只能列举
   1. 预检请求，试探一下是否支持跨域 2：正式请求 预检请求是options
### Cors options
简单请求： html原生form表单可以发出去的请求 1： 正式请求
非简单：分俩步请求： 1. 预检请求，试探一下是否支持跨域 2：正式请求
#### 简单请求
- 简单请求就是可以直接由html构造的如post、get、put,他进行跨域访问的时候就直接把请求发送给了服务端
简单请求就是普通 HTML Form 在不依赖脚本的情况下可以发出的请求，比如表单的 method 如果指定为 POST ，可以用 enctype 属性指定用什么方式对表单内容进行编码，合法的值就是前述这三种。
#### 预检请求
- 复杂请求在进行真正的请求之前，发送一个options，询问服务器是否运行跨域，这就是预检请求
- 预检请求的好处就是，预检请求过后，之后每次就都直接请求而不用再询问服务器否可以跨源了，不用每次请求都让服务器劳神计算  


## 请求代发
服务器代理，顾名思义，当你需要有跨域的请求操作时发送请求给后端，让后端帮你代为请求，然后最后将获取的结果发送给你。

## jsonp
1. 首先前端先设置好回调函数，并将其作为 url 的参数。
2. 服务端接收到请求后，通过该参数获得回调函数名，并将数据放在参数中将其返回
3. 收到结果后因为是 script 标签，所以浏览器会当做是脚本进行运行，从而达到跨域获取数据的目的
