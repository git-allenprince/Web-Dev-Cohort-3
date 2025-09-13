const express = require("express");
const cors=require("cors")
const app = express();

app.use(cors());

app.get("/:a/:b", (req, res) => {
  const { a, b } = req.params;
  res.json({ sum: Number(a) + Number(b) });
});

app.listen(3000);
