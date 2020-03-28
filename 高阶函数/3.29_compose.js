// koa (递归) redux (compose) 中间件 组合的思想
const add1 = x => x + 1
const sub20 = x => x - 20
const mul10 = x => x * 10
// 继承
// FP 函数式编程
const res = mul10(sub20(add1()))

const compose  = (...args) =>
  // 处理每个函数的组合
  args.reduceRight((fna, fnb) => (...params) => {return fnb(fna(params))})

const fn = compose(add1, sub20, mul10)
console.log(fn(1))