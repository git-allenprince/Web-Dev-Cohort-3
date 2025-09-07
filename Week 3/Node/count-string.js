const { program } = require("commander");
const fs = require("fs");
program
.option("--char","count character")
.option("--words","count words")
  .argument("fileName", "name of file")
  .action((fileName,options) => {
    let data=fs.readFileSync(fileName,'utf-8');
    if(options.char)
      console.log(data.length);
    else if(options.words) console.log(data.split(" ").length)

  });

  program.parse();
