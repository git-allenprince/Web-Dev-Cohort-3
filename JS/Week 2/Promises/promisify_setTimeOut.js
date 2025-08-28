function TakeTime(ms){
    return new Promise((resolve,reject)=>{
        setTimeout(resolve,ms)
    })
}


TakeTime(2000).then(()=>console.log("hi"))