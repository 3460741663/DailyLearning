function getSum(...args) {
  let res = 0;
  console.log(args)
  for(let i = 0; i < args.length; i++){
    if(Array.isArray(args[i])){
      res += getSum(...args[i])
    }else{
      res += parseInt(args[i])
    }
  }
  return res;
}
console.log(getSum([1, '2', [3, [4, 5]]]));