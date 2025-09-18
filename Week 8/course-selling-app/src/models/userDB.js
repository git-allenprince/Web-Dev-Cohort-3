const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const User = new Schema({
    email: String,
    userID: String,
    password: String,
});

const UserModel = mongoose.model("users", User);

module.exports = { UserModel: UserModel };
