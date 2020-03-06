// const http = require('http');
// module.exports = http.createServer((req, res) => {
//   res.end('hello world');
//   // 进程挂掉了，重启一个进程
//   console.log(a);
//   // 僵尸进程 心跳监测（每分钟发一条消息，如果超过三次没有回复，认为你心跳停止）
//   while(true){}
// }).listen(3000, () => {
//   console.log('listened 3000')
// })
const http = require('http');
let t = []; // 读取书的内容
module.exports = http.createServer((req, res) => {
  // 模拟内存溢出
  let content = require('fs').readFileSync('./123.pdf');
  t.push(content);
  res.end('hello world');
  // console.log(a);
  // while(true) {}  // 僵尸进程


}).listen(3000, () => {
  console.log('listened 3000')
})