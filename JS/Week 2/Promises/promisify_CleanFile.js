import fs from "fs"
function read(){
    return new Promise((resolve,reject)=>{
        fs.readFile("hello.txt","utf-8",(err,data)=>{
            if(err) reject(err)
            else resolve(data)
        })
    })
}

function write(dat){
    const trimmed=dat.trim()
    return new Promise((resolve,reject)=>{
        fs.writeFile("hello.txt",trimmed,(err)=>{
            if(err) reject(err)
            else resolve("File written succefully!")
        })
    })
}

read().then((content)=>{
    console.log(content)
    return write(content)
}).then((msg)=>{
    console.log(msg)
    return read()
}).then((msg)=>{
    console.log(msg)
}).catch((error)=>console.log(error))