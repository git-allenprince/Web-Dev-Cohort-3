import fs from "fs";
function WritingToFile(){
    return new Promise((resolve,reject)=>{
        const data="Writing to file...."
        fs.writeFile("new.txt",data,(err)=>{
            if(err)
                reject(err)
            else
                resolve("File written successfully!")
        })
    })
}

function letsRead(){
    return new Promise((resolve,reject)=>{
         fs.readFile("new.txt","utf-8",(err,data)=>{
            if(err)
                reject(err)
            else
                resolve(data)
         })
    })
}

WritingToFile().then((msg)=>{console.log(msg) 
    return letsRead()}).then((content)=>console.log(content)).catch((err)=>console.log(err))