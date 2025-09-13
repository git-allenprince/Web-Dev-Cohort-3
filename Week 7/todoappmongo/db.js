const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = mongoose.Schema;

const User = new Schema({
    username: String,
    password: String,
    name: String,
});

const Todo = new Schema({
    title: String,
    done: Boolean,
    userId: ObjectId,
});

const UserModel = mongoose.model("users", User);
const ToDoModel = mongoose.model("todos", todo);

module.exports({ UserModel: UserModel, ToDoModel: ToDoModel });
