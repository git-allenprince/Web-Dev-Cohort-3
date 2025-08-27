// Write code to read contents of a file and print it to the console. 
// You can use the fs library to as a black box, the goal is to understand async tasks. 
// Try to do an expensive operation below the file read and see how it affects the output. 
// Make the expensive operation more and more expensive and see how it affects the output.


import fs from "fs"

const contents=fs.readFile("temp.txt","utf-8",(err,data)=>{
    if(err)
        console.log(err)
    else
        console.log("Contents: ",data)
})

let c=0;
for(let i=0;i<100000;i++){
    c+=i
}
console.log("Expensive operation done.")