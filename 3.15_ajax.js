// readyState 状态码：
// 0:请求未初始化
// 1:服务器连接已建立
// 2:请求已接受
// 3:请求处理中
// 4:请求已完成，且响应已就绪
// HTTP 状态码：
// 200 - 服务器成功返回网页
// 404 - 请求的网页不存在
// 503 - 服务器暂时不可用
function ajax(url,method='get',param={}){
  return new Promise((resolve,reject)=>{
    const xhr = new XMLHttpRequest();
    // url补充
    if(method=='get' && param){
      let paramString = paraToString(param)
      // 把parm加到url上面
      url += url.indexOf('?') == -1 ? `?${paramString}` : paramString 
    }
    xhr.open(method,url);
    if(method == 'post'){
      xhr.send(param)
    }else{
      xhr.send()
    }
    // 状态码发生变化就调用 xhr.onreadystatechange
    // 状态码为4才调用 xhr.onload
    xhr.onload = function() {
      const result = {
        status : xhr.status,
        statusText : xhr.statusText,
        header: xhr.getAllResponseHeaders,
        data: xhr.response || xhr.responseText
      };
      if((xhr.status >= 200 && xhr <= 300) || xhr == 304){
        resolve(data)
      }else{
        reject(data)
      }
    }
    // 错误处理
    xhr.onerror = function () {
      reject(new TypeError('请求出错'));
    }
    xhr.timeout = function () {
      reject(new TypeError('请求超时'));
    }
    xhr.onabort = function () {
      reject(new TypeError('请求被终止'));
    }
  })
}
function paraToString(param){
  let res = '';
  param.forEach(element => {
    res+=element
  });
  return res;
}
// console.log(paraToString([1,2,3,4]))