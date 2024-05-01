"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cohort_controller_1 = __importDefault(require("../controllers/cohort.controller"));
const router = express_1.default.Router();
const { createCohort, getAllCohorts, deleteCohort, updateCohort, getCohortsStudents, } = cohort_controller_1.default;
router.route("/").get(getAllCohorts).post(createCohort);
//TO DO: Update cohort route
router.route("/students").get(getCohortsStudents);
router.route("/:label").delete(deleteCohort).patch(updateCohort);
exports.default = router;
