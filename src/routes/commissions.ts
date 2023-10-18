import express from "express";
import CommissionController from "../controllers/commission.controller";

const router = express.Router();

const {
  createCommission,
  getCommission,
  deleteCommission,
  addUsersToCommission,
  deleteUsersFromCommission,
  updateUsersCommission,
  updateCommission,
  getUserCommissions,
} = CommissionController;

router.route("/").post(createCommission);

router
  .route("/:id")
  .get(getCommission)
  .delete(deleteCommission)
  .patch(updateCommission);

router
  .route("/:id/users")
  .post(addUsersToCommission)
  .delete(deleteUsersFromCommission)
  .put(updateUsersCommission);

router.route("/users/:id").get(getUserCommissions);

export default router;
