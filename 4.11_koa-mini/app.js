const http = require('http')
const compose = require('./composes')
module.export = class app {
  constructor(){
    this.middleWare = [];
    this.ctx = null;
  }
  use(fn){
    this.middleWare.push(fn);
    return this;
  }
  handleRequest(ctx,fnMiddleWare){
    fnMiddleWare(ctx).then(()=>this.handleResponse)
  }
  handleResponse(){
    const body = this.ctx.body
    this.ctx.res.end(body)
  }
  callback(){
    // 组合中间件
    const fn = compose(this.middleWare);
    return (req, res)=>{
      fn();
      const ctx = {
        req,
        res
      }
      this.handleRequest(ctx)
    }
  }
  listen(...args){
    // 这里处理请求响应
    const server = http.createServer(this.callback());
    server.listen(...args)
  }

}