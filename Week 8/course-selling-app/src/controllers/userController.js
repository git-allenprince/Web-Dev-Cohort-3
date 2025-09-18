const bcrypt = require("bcrypt");
const { UserModel } = require("../models/userDB");
const { EnrollmentModel } = require("../models/enrollmentsDB");
const { CourseModel } = require("../models/coursesDB");
const enrollmentsDB = require("../models/enrollmentsDB");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const JWT_SECRET = process.env.JWT_SECRET;
async function signUp(req, res) {
    const { email, userID, password } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await UserModel.create({
            email: email,
            userID: userID,
            password: hashedPassword,
        });
        res.json({ message: "Signed up successfully." });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function login(req, res) {
    const { userID, password } = req.body;
    try {
        const user = await UserModel.findOne({
            userID: userID,
        });
        if (!user) return res.status(403).json({ error: "User not found." });
        else {
            const passwordMatch = await bcrypt.compare(password, user.password);
            if (!passwordMatch)
                return res
                    .status(403)
                    .json({ error: "Incorrect credentials." });
            else {
                const token = jwt.sign({ id: user._id }, JWT_SECRET);
                res.json({ message: "Logged in successfully.", token: token });
            }
        }
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
}

async function buyCourse(req, res) {
    const { courseID } = req.params;
    const user = req.user;
    try {
        const course = await CourseModel.findOne({
            courseID: courseID,
        });
        const check = await EnrollmentModel.findOne({
            userID: user._id,
            courseID: course._id,
        });
        if (check) return res.json({ message: "Course already purchased." });
        else {
            await EnrollmentModel.create({
                userID: user._id,
                courseID: course._id,
            });
        }
        res.json({ message: "Course purchased successfully." });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
}

async function purchasedCourses(req, res) {
    const user = req.user;
    try {
        courses = await EnrollmentModel.find({
            userID: user._id,
        }).populate("courseID");
        res.json({ courses });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
}

async function courses(req, res) {
    try {
        courses = await CourseModel.find();
        res.json({ courses });
    } catch (error) {
        res.status(403).json({ error: error.message });
    }
}

module.exports = { signUp, login, buyCourse, purchasedCourses, courses };
