import express from "express";
import CourseController from "../controllers/course.controller";
import TypeOfCourseController from "../controllers/typeOfCourse.controller";

const router = express.Router();

router.get("/courses", CourseController.getCourses);

// Courses
router.route("/courses").post(CourseController.addCourse);

router
  .route("/courses/:id")
  .get(CourseController.getCourse)
  .patch(CourseController.updateCourse)
  .delete(CourseController.deleteCourse);

// Types of Courses
router
  .route("/typesofcourses")
  .get(TypeOfCourseController.getTypesOfCourses)
  .post(TypeOfCourseController.addTypeOfCourse);

export default router;
