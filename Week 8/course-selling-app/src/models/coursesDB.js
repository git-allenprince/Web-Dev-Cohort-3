

const mongoose=require("mongoose");
const Schema = mongoose.Schema;

const Course = new Schema({
    courseID: Number,
    title: String,
    description: String,
    price: Number,
    imageLink:String,
    published: Boolean,
})

const CourseModel = mongoose.model("courses", Course);
module.exports = {CourseModel: CourseModel}