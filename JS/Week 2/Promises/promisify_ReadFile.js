fs=require("fs")

function letsRead(){
    return new Promise((resolve,reject)=>{
         fs.readFile("helloo.txt","utf-8",(err,data)=>{
            if(err)
                reject(err)
            else
                resolve(data)
         })
    })
}


letsRead().then((val)=>console.log(val)).catch((err)=>console.log(err))