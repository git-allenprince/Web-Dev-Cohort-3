const { isUtf8 } = require("buffer");
const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

// const dir_path=path.join(__dirname)

app.get("/files", function (req, res) {
  fs.readdir(__dirname, (err, files) => {
    if (err) {
      console.log("Error");
      res.status(500).json({ error: "Failed to read directory" });
    } else res.json({ files });
  });
});

app.get("/files/:fileName", (req, res) => {
  const { fileName } = req.params;
  const filePath = path.join(__dirname, fileName);

  fs.readFile(filePath, "utf-8", (err, data) => {
    if (err) {
      console.log("Error");
      res.status(500).json({ error: "Failed to read file" });
    } else res.json({ data });
  });
});
app.listen(3000);
