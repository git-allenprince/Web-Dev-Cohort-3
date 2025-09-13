const express = require("express");
const jwt = require("jsonwebtoken");
const { UserModel, ToDoModel } = require("./db");

const app = express();

app.post("/sign-up", async (req, res) => {
    const { username, password, name } = req.body;
    try {
        await UserModel.insertOne({
            username: username,
            password: password,
            name: name,
        });
        res.json({message: "Signed Up Succesfully"})
    } catch (err) {
        console.error(err.response?.data || err.message);
    }
});

app.post("/sign-in", (req, res) => {});
