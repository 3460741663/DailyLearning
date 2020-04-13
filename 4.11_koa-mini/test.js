const Koa = require('./koa-mini/app.js');
// const fs = require('fs');
const app = new Koa();
app.use(async (ctx, next) => {
  if (ctx.url === '/favicon.ico') return false;
  // ctx.body = `
  // <strong>strong</strong>
  // `;
  // const stream = fs.createReadStream('../lib/context.js');
  // ctx.body = stream;
  ctx.body = 'hello koa'
  await next();
  // await primise === next()
  // await next();
});
app.use(async (ctx, next) => {
  console.log('this is second mid before');
  await next();
  console.log('this is second mid after');
});
app.use(async (ctx, next) => {
  console.log('this is third mid before');
  await next();
  console.log('this is third mid after');
});
app.listen(9090, () => {
  console.log('server is 9090');
});

// async (ctx, next) => {
//   if (ctx.url === '/favicon.ico') return false;
//   ctx.body = `
//   <strong>strong</strong>
//   `;
//   await async (ctx, next) => {
//     console.log('this is second mid before');
//     await async (ctx, next) => {
//       console.log('this is third mid before');
//       await next();
//       console.log('this is third mid after');
//     }
//     console.log('this is second mid after');
//   }
// };