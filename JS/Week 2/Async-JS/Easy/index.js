fs=require("fs")

const contents=fs.readFileSync("temp.txt","utf-8")
console.log(contents)