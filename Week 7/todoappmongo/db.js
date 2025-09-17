const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.ObjectId;

const User = new Schema({
    username: { type: String, unique: true },
    password: String,
    name: String,
});

const Todo = new Schema({
    userId: ObjectId,
    todos: [{ id:Number, title: String, done: Boolean }],
});

const UserModel = mongoose.model("users", User);
const ToDoModel = mongoose.model("todos", Todo);

module.exports = { UserModel: UserModel, ToDoModel: ToDoModel };
