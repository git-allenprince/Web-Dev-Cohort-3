import fs from "fs"

function setTimeoutPromisified(ms) {
  return new Promise((resolve, reject) => {
    setTimeout(resolve, ms);
  });
}

function readFileAsync(filename){
    return new Promise((resolve,reject)=>{
        fs.readFile(filename, "utf-8",(err,data)=>{
            if(err) reject(err)
            else resolve(data)
        })
    })
}

async function readFileAfterMs(){
    await setTimeoutPromisified(5000)
    var contents=await readFileAsync("hello.txt")
    console.log("Contents:", contents)
}

readFileAfterMs()