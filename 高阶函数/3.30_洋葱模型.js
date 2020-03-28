// 把中间件组合成洋葱模型
module.exports = middleware => {
  return context => {
    dispatch(0);
    function dispatch(i) {
      let fn = middleware[i];
      if (!fn) return Promise.resolve();
      // fn = async () => {};  =>
      fn(context, () => {
        return dispatch(i + 1);
      });
      // return Promise.resolve(fn({}, () => {
      //   return dispatch(i + 1);
      // }));
    }
  };
};




// 存放中间件的数组
let fnArray = [];
// use方法收集中间件
function use(next){
  fnArray.push(next)
}
// 把中间件合并成洋葱模型
function run(context, fnArray){
  let temp = 0;
  function runEle(index){
    let fn = fnArray[index];
    if(!fn) return ;
    fn(context,()=>{runEle(index + 1)})
  }
  runEle(temp)
}