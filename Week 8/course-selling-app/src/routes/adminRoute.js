const express = require("express");
const adminAuth = require("../middlewares/adminAuth");
const router = express.Router();
const {
    signIn,
    signUp,
    editCourse,
    getCourses,
    courses,
} = require("../controllers/adminController");

router.use(express.json());

router.post("/signUp", signUp);
router.post("/signIn", signIn);
router.use(adminAuth);
router.post("/courses", courses);
router.put("/editCourse/:courseID", editCourse);
router.get("/getCourses", getCourses);

module.exports = router;
