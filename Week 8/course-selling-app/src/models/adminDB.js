const mongoose = require("mongoose");
const Schema = mongoose.Schema;


const Admin= new Schema({
    username: String,
    password: String
})


const AdminModel = mongoose.model("admin", Admin);

module.exports = {AdminModel:AdminModel}