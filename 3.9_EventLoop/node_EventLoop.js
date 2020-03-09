// const fs = require('fs');

// fs.readFile('./timeout.js', () => {
  setTimeout(() => {
   console.log('setTimeout') 
  });
  setImmediate(() => {
    console.log('setImmediate')
  })
// })

// async function async1() {
//   console.log('async1 start'); // 2
//   await async2();
//   console.log('async1 end'); // 7
// }
// async function async2() {
//   console.log('async2'); // 3
// }

// console.log('script start'); // 1

// setTimeout(function () {
//   console.log('setTimeout'); // 8
// }, 0)

// async1();

// new Promise(function (resolve) {
//   console.log('promise1'); // 4
//   resolve();
// }).then(function () {
//   console.log('promise2'); // 6
// });
// console.log('script end'); // 5



// io 阶段 -》check
// 没有优先的说法，对应的回调只能在对应的阶段执行