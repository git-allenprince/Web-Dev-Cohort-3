const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, ToDoModel } = require("./db");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const { z } = require("zod");
require("dotenv").config();

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
    const requiredBody = z.object({
        username: z.string().min(5).max(100),
        password: z.string().min(5).max(100).refine((val)=>/[A-Z]/.test(val),{
            message:"Password must contain atleast 1 uppercase."
        }),
        name: z.string().min(5).max(100),
    });
    const {success,data,error} = requiredBody.safeParse(req.body);
    if(!success){

        return res.status(403).json({error: error.issues.map(e=>e.message)});
    } 
    const { username, password, name } = data;

    console.log(username, password, name);
    try {
        const hashPassword = await bcrypt.hash(password, 10);
        console.log(hashPassword);
        await UserModel.create({
            username: username,
            password: hashPassword,
            name: name,
        });
        res.json({ message: "Signed Up Succesfully" });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({ error: err.message });
    }
});

app.post("/sign-in", async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await UserModel.findOne({
            username: username,
        });
        if (!user) {
            res.status(403).json({ message: "User does not exist." });
            return;
        }

        const passwordMatch = await bcrypt.compare(password, user.password);
        console.log(passwordMatch);
        if (passwordMatch) {
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
        console.log("tododoccc", toDoDoc);
        if (!toDoDoc) {
            const todo = await ToDoModel.create({
                userId: user_id,
                todos: [{ id: 1, title, done }],
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

app.get("/todos", async (req, res) => {
    const user_id = req.user._id;
    try {
        const toDoDoc = await ToDoModel.findOne({ userId: user_id });
        if (toDoDoc) {
            res.json(toDoDoc.todos);
        } else {
            return res.json({
                message: "No todos.",
            });
        }
    } catch (error) {
        console.error(error.message);
    }
});
app.listen(3000);
