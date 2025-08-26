function TakeTime(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(()=>resolve("Hello"),ms)
    })
}


TakeTime(2000).then((val)=>console.log(val))