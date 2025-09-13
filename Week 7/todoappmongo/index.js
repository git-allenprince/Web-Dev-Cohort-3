const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, ToDoModel } = require("./db");
const mongoose = require("mongoose");
require('dotenv').config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;
mongoose.connect(MONGO_URI);
const app = express();
app.use(express.json());

async function auth(req, res, next) {
    const { token } = req.headers;
    try {
        const decodedInfo = jwt.verify(token, JWT_SECRET);
        console.log(decodedInfo);
        const user = await UserModel.findById(decodedInfo.id);
        // console.log(user);
        if (user) {
            req.user = user;
            next();
        } else return res.status(404).json({ message: "Not authorized." });
    } catch (err) {
        console.error(err.message);
        return res.status(404).json({ message: "Error" });
    }
}

app.post("/sign-up", async (req, res) => {
    const { username, password, name } = req.body;
    try {
        await UserModel.insertOne({
            username: username,
            password: password,
            name: name,
        });
        res.json({ message: "Signed Up Succesfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
});

app.post("/sign-in", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({
            username: username,
            password: password,
        });
        if (user) {
            const token = jwt.sign({ id: user._id }, JWT_SECRET);
            // localStorage.setItem("token", token);
            res.json({ token: token });
        } else return res.status(403).json({ message: "User does not exist." });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: "Something went wrong." });
    }
});
app.use(auth);
app.post("/todo", async (req, res) => {
    const user_id = req.user._id;
    const { title, done } = req.body;
    try {
        const toDoDoc = await ToDoModel.findOne({ userId: user_id });
        console.log("tododoccc",toDoDoc);
        if (!toDoDoc) {
            const todo = await ToDoModel.create({
                userId: user_id,
                todos:[{ id: 1, title, done }]
            });
            res.json({
                message: "Todo added successfully",
                todos: todo,
            });
        } else {
            toDoDoc.todos.push({ id: toDoDoc.todos.length + 1, title, done });
            await toDoDoc.save();
            res.json({
                message: "Todo added successfully",
                todos: toDoDoc.todos,
            });
        }
    } catch (error) {
        console.error(error.message);
    }
});

app.get("/todos",async (req,res)=>{
    const user_id = req.user._id;
    try {
        const toDoDoc = await ToDoModel.findOne({ userId: user_id });
        if (toDoDoc) {
            res.json(toDoDoc.todos)
            
        } else {
            return res.json({
                message: "No todos.",
            });
        }
    } catch (error) {
        console.error(error.message);
    }
})
app.listen(3000);
