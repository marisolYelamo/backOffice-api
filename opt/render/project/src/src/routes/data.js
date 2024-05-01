"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const course_controller_1 = __importDefault(require("../controllers/course.controller"));
const typeOfCourse_controller_1 = __importDefault(require("../controllers/typeOfCourse.controller"));
const router = express_1.default.Router();
router.get("/courses", course_controller_1.default.getCourses);
// Courses
router.route("/courses").post(course_controller_1.default.addCourse);
router
    .route("/courses/:id")
    .get(course_controller_1.default.getCourse)
    .patch(course_controller_1.default.updateCourse)
    .delete(course_controller_1.default.deleteCourse);
// Types of Courses
router
    .route("/typesofcourses")
    .get(typeOfCourse_controller_1.default.getTypesOfCourses)
    .post(typeOfCourse_controller_1.default.addTypeOfCourse);
exports.default = router;
