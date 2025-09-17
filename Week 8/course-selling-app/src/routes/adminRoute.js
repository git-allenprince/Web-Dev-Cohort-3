const express = require("express");
const auth = require("../middlewares/auth");
const router = express.Router();
const {signIn, signUp, editCourse, getCourses, courses} = require("../controllers/adminController")

router.use(express.json());

router.post("/signUp",signUp);
router.post("/signIn",signIn);
router.use(auth)
router.post("/courses",courses);
router.post("/editCourse",editCourse);
router.get("/getCourses",getCourses);

module.exports = router;

