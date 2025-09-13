const express = require("express");
const app = express();

function isOldEnoughMiddleware(req, res, next) {
  if (req.query.age >= 14) next();
  res.status(411).json({ message: "Not of age." });
}

app.get("/ride1", isOldEnoughMiddleware, (req, res) => {
  res.json({ message: "Ride successfully completed." });
});

app.listen(3000);
