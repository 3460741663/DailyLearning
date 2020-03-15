// instanceOf

// function myInstanceOf(target, origin){
//   let proto = target.__proto__;
//   if(proto){
//     if(proto == origin.prototype){
//       return true;
//     }else{
//       return myInstanceOf(proto, origin)
//     }
//   }else{
//     return false
//   }
// }
// let str = new String('1234');
// console.log(myInstanceOf(str,String))


// 用reduce实现map
Array.prototype.reduceToMap = function (handler){
  return this.reduce((target, current, index)=>{
    target.push(handler.call(this, current, index))
    return target;
  },[])
}
let test = [1,2,3,4];
let cc = test.reduceToMap((curent, index)=>{
  console.log(curent,index);
  curent = curent * 2
  return curent;
})
console.log(test, cc)
// 用reduce实现filter
Array.prototype.reduceToFilter = function(handler){
  return this.reduce((target, curent, index)=>{
    if(handler.call(this,curent,index)){
      target.push(curent)
    }
    return target
  },[])
}
let a = [1,2,3,4];
let result = a.reduceToFilter((current,index)=>{
  console.log(current,index)
  return current>2
})
console.log(result)
