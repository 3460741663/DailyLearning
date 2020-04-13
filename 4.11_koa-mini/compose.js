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