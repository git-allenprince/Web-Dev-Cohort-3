let arr = [1, 2, 3, 4, 5];
a = arr.filter((val) => {
  if(val%2==0)
    return val;
});

console.log(a);