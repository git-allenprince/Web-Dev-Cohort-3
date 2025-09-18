const mongoose = require("mongoose");
const { required } = require("zod/mini");
const Schema = mongoose.Schema;

const enrolled_courses = new Schema({
    userID: {type: Schema.Types.ObjectId, ref: "users", required:true},
    courseID: {type: Schema.Types.ObjectId, ref: "courses", required:true},
});

const EnrollmentModel = mongoose.model("enrollments", enrolled_courses);

module.exports = { EnrollmentModel: EnrollmentModel };
