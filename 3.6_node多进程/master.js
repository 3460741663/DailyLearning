// master.js
// 多核cpu,启动多个进程，每个进程都监听8080端口，用户访问 127.0.0.1：8080
// 这样 启动多个cpu来干活
// 1. httpserver.js lister(8080)
// 0 ~ cpu.length - 1 fork('httpserver.js)
// 多个进程不能监听一个端口号
// 解决：在主进程进行端口监听，然后讲监听的套接字传个子进程，交给子进程干活

const { fork } = require('child_process');
const cpus = require('os').cpus();
const net = require('net')
const server = net.createServer();

const logWorker = fork('./log.js');

// for (let i = 0, len = cpus.length - 1; i < len; i++) {
//   const worker = fork('./fib.js');
//   worker.send(Math.floor(Math.random() * 10 + 4)); // 要计算的num
//   worker.on('message', (data) => { // 计算后返回的结果
//     logWorker.send(data); // 将结果发送给输出进程
//   })
// }
server.listen(8080,()=>{
  for (let i = 0, len = cpus.length - 1; i < len; i++) {
    const work = fork('./httpserver.js');
    // server.on('connection',socket =>{
      
    // })
    work.send('server', server)
  }
})
