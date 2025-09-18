const {
    signUp,
    login,
    purchasedCourses,
    buyCourse,
    courses,
} = require("../controllers/userController");
const userAuth = require("../middlewares/userAuth");
const express = require("express");
const router = express.Router();

router.use(express.json());
router.post("/signUp", signUp);
router.post("/login", login);
router.use(userAuth);
router.post("/buyCourse/:courseID", buyCourse);
router.get("/purchasedCourses", purchasedCourses);
router.get("/courses", courses);

module.exports = router;
