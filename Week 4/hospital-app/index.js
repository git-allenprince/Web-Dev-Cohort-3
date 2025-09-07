const express = require("express");
const app = express();

const users = [
  {
    name: "John",
    kidneys: [{ healthy: true }, { healthy: false }],
  },
];

app.get("/", function (req, res) {
  const johnKidneys = users[0].kidneys;
  var healthyKidneys = 2;
  for (let i = 0; i < johnKidneys.length; i++) {
    if (!johnKidneys[i].healthy) healthyKidneys--;
  }
  const unhealthyKidneys = 2 - healthyKidneys;

  res.json({ healthyKidneys, unhealthyKidneys });
});

app.post("/", function (req, res) {
  for (let i = 0; i < users[0].kidneys.length; i++) {
    users[0].kidneys[i].healthy = true;
  }
  res.json("done");
});

app.delete("/", function (req, res) {
  var proceed = false;

  for (let i = 0; i < users[0].kidneys.length; i++) {
    if (!users[0].kidneys[i].healthy) {
      proceed = true;
    }
  }

  if (proceed) {
    for (let i = 0; i < users[0].kidneys.length; i++) {
      if (!users[0].kidneys[i].healthy) {
        users[0].kidneys.splice(i, 1);
      }
    }
    res.json("done");
  }
  else{
    res.status(411).json("oooooooooooo");
  }
  
});

app.listen(3000);
