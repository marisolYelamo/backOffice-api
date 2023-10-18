import express from "express";
import CohortController from "../controllers/cohort.controller";

const router = express.Router();

const {
  createCohort,
  getAllCohorts,
  deleteCohort,
  updateCohort,
  getCohortsStudents,
} = CohortController;

router.route("/").get(getAllCohorts).post(createCohort);
//TO DO: Update cohort route

router.route("/students").get(getCohortsStudents);

router.route("/:label").delete(deleteCohort).patch(updateCohort);

export default router;
