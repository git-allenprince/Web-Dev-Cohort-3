const express = require("express");
const jwt=require("jsonwebtoken")
const app = express();

const user = [];

app.use(express.json());

// function generateToken(length = 32) {
//   const chars =
//     "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
//   let token = "";
//   for (let i = 0; i < length; i++) {
//     const randomIndex = Math.floor(Math.random() * chars.length);
//     token += chars[randomIndex];
//   }
//   return token;
// }

app.post("/sign-up", (req, res) => {
  const { username, password } = req.body;
  user.push({ username: username, password: password });
  res.json({ message: "Sign Up Succesful" });
});

app.post("/sign-in", (req, res) => {
  const { username, password } = req.body;
  const check = user.find(
    (u) => u.username === username && u.password === password
  );
  if (check != null) {
    const token = jwt.sign({username:username},'helloaloalo');
    res.json({
    username: check.username,
    password: check.password,
    token: token,
  });
  } else {
    return res.status(404).json({ msg: "user not found." });
  }
  
});

app.get("/me", (req, res) => {
  const token  = req.headers.token;
  const decodedInfo = jwt.verify(token,'helloaloalo')
  const foundUser=user.find(u=>u.username===decodedInfo.username)
  const username=decodedInfo.username;
  if(foundUser)
    res.json(`hi ${foundUser.username}, Your password is ${foundUser.password}`);
  else
    res.json.status(404).json({msg:"User not found"});
});

app.listen(3000);
