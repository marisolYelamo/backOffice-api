import UsersController from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.get("/roles", UsersController.getUsersRoles);
router.put("/:id/roles", UsersController.updateUserRoles);

export default router;
