const express = require("express");
const bcrypt = require("bcrypt");
const { AdminModel } = require("../models/adminDB");
const { CourseModel } = require("../models/courseDB");
const auth = require("../middlewares/auth");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);
const app = express();

app.use(express.json());

async function signUp(req, res) {
    const { username, password } = req.body;
    try {
        const hashPassword = await bcrypt.hash(password, 5);
        await AdminModel.create({
            username: username,
            password: hashPassword,
        });
        res.json({ message: "Admin created successfully" });
    } catch (err) {
        res.status(403).json({ error: err.message });
    }
}

async function signIn(req, res) {
    const { username, password } = req.body;
    try {
        const user = AdminModel.findOne({
            username: username,
        });
        if (!user)
            return res.status(403).json({ error: "User does not exist" });
        else {
            const passwordMatch = bcrypt.compare(password, user.password);
            if (!passwordMatch)
                return res.status(403).json({ error: "Invalid password" });
            else {
                const token = jwt.sign({ id: user._id }, JWT_SECRET);
                res.json({ message: "Logged in successfully", token: token });
            }
        }
    } catch (err) {
        return res.status(403).json({ error: err.message });
    }
}

async function courses(req, res) {
    const { courseID, title, description, price, imageLink, published } =
        req.body;
    try {
        const course = await CourseModel.create({
            courseID,
            title,
            description,
            price,
            imageLink,
            published,
        });
        res.json({ message: "Course added successfully.", course: course });
    } catch (err) {
        res.status(401).json({ error: err.message });
    }
}

async function editCourse(req, res) {
    const { courseID, title, description, price, imageLink, published } =
        req.body;
    try {
        const course = await CourseModel.findOne({ courseID: courseID });
        if (!course)
            return res.status(401).json({ error: "Course not found." });
        else {
            course.courseID = courseID;
            course.title = title;
            course.description = description;
            course.price = price;
            course.imageLink = imageLink;
            course.published = published;
            await course.save();
            
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}
