// const cluster = require('cluster');

// if (cluster.isMaster) {
//   for (let i = 0; i < 4; i++) {
//     createServer()
//   }
//   function createServer() {
//     const work = cluster.fork();
//     let miss = 0;
//     // 一来一回
//     let timer = setInterval(() => {
//       if(miss === 3){
//         // 没有收到pong 3次了，就杀掉这个进程
//         console.log(work.process.pid, 'is died');
//         process.kill(work.process.pid)
//         clearInterval(timer);
//         return;
//       }
//       miss ++;
//       work.send('ping' + work.process.pid)
//     }, 1000);
//     work.on('message', function(msg){
//       if(msg == 'pong' + work.process.pid){
//         miss --;
//       }
//     })
//   }

//   // 监听进程退出则在创建一个进程
//   cluster.on('exit', function () {
//     setTimeout(() => {
//       createServer()
//     }, 1000);
//   })

// }
// else {
//   process.on('uncaughtException', (err) => {
//     console.log(err);
//     // 错误码 1 代表错误 0 代表success 
//     process.exit(1);
//   })
//   process.on('message', function(msg){
//     if(msg=='ping' + process.id){
//       process.send('pong' + process.id)
//     }
//   })
//   require('./app.js');
// }

// const cluster = require('cluster');
// // 进程守护 逻辑错误、心跳监测、内存溢出
// if (cluster.isMaster) {
//   for (let i = 0; i < 4; i++) {
//     createServer()
//   }
//   function createServer() {
//     const worker = cluster.fork();
//     //  worker.on('exit')
//     // 
//     let miss = 0;
//     let timer = setInterval(() => {
//       if (miss === 3) {
//         // 没有 收到 pong
//         // 杀之
//         console.log(worker.process.pid, 'is  died ');
//         process.kill(worker.process.pid);
//         clearInterval(timer);
//         return;
//       }
//       miss ++;
//       worker.send('ping' + worker.process.pid)
//     }, 1000);
//     worker.on('message', function(msg) {
//       if (msg === 'pong' + worker.process.pid) {
//         miss --;
//       }
//     })
//     worker.on('exit', ()=>{
//       clearInterval(timer);
//     })
//   }
//   cluster.on('exit', function () {
//     setTimeout(() => {
//       createServer();
//     }, 1000)
//   })
// }
// else {
//   process.on('uncaughtException', (err) => {
//     console.log(err);
//     // 1 错误 0 success
//     process.exit(1);
//   })
//   setInterval(() => {
//     // 内存情况
//     if(process.memoryUsage().rss > 52428800){
//       // 内存溢出
//       console.log('oom')
//       process.exit(1);
//     }
//   }, 5000);
//   process.on('message', function(msg) {
//     if (msg === 'ping' + process.pid) {
//       process.send('pong' + process.pid);
//     }
//   })
//   require('./app.js');
// }


const cluster = require('cluster');
// 进程
// cluster 模式
if (cluster.isMaster) {
  for (let i = 0; i < 4; i++) {
    createServer();
  }
  function createServer() {
    const worker = cluster.fork();
    //  worker.on('exit')
    // 
    let miss = 0;
    let timer = setInterval(() => {
      if (miss === 3) {
        // 没有 收到 pong
        // 杀之
        console.log(worker.process.pid, 'is  died ');
        process.kill(worker.process.pid);
        clearInterval(timer);
        return;
      }
      miss ++;
      worker.send('ping' + worker.process.pid)
    }, 1000);
    worker.on('message', function(msg) {
      if (msg === 'pong' + worker.process.pid) {
        miss --;
      }
    })
    worker.on('exit', () => {
      clearInterval(timer);
    })
  }
  cluster.on('exit', function () {
    setTimeout(() => {
      console.log('restart');
      createServer();
    }, 100)
  })
}
else {
  process.on('uncaughtException', (err) => {
    console.log(123, err);
    // 1 错误 0 success
    process.exit(1);
  })
  process.on('message', function(msg) {
    if (msg === 'ping' + process.pid) {
      process.send('pong' + process.pid);
    }
  })
  setInterval(() => {
    // 当前进程内存情况
    if (process.memoryUsage().rss > 52428800) {
      console.log('oom');
      process.exit(1);
    }
  }, 5000);
  require('./app.js');
}