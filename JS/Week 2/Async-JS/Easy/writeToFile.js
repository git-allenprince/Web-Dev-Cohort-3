// Using the fs library again, try to write to the contents of a file.
// You can use the fs library to as a black box, the goal is to understand async tasks.

import fs from "fs";

const data="New content."
fs.writeFile("newFile.txt", data, (err)=>{
    if(err) console.log(err)
    else console.log("File written successfully.")
})