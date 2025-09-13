const express = require("express");
const jwt = require("jsonwebtoken");
const cors = require("cors");


const app = express();
const JWT_SECRET = "ahdsuihfibdsjbeidhifhiehfihdkjfsjhvcs";

const users = [];
function auth(req, res, next) {
    const token = req.headers.token;
    if (token) {
        if (jwt.verify(token, JWT_SECRET)) {
            req.user = jwt.verify(token, JWT_SECRET);
            next();
        } else {
            res.status(404).json({ msg: "Wrong credentials." });
        }
    } else {
        res.status(404).json({ msg: "Sign in again." });
    }
}
app.use(cors());
app.use(express.json());
app.post("/sign-up", (req, res) => {
    const { username, password } = req.body;
    if (users.find((u) => u.username === username))
        return res.status(404).json({ message: "User already exists!" });
    else {
        users.push({ username: username, password: password });
        res.json({ message: "Signed Up Successfully" });
    }
});

app.post("/sign-in", (req, res) => {
    const { username, password } = req.body;
    if (users.find((u) => u.username === username && u.password === password)) {
        const token = jwt.sign({ username: username }, JWT_SECRET);
        res.json({ token: token });
    } else {
        return res.status(401).json({ message: "Invalid username or password" });
    }
});
app.use(auth);
app.get("/me", (req, res) => {
    const username = req.user.username;
    const foundUser = users.find((u) => u.username === username);
    if (foundUser) {
        res.json({username:foundUser.username, password:foundUser.password});
    }
});

app.listen(3000);
