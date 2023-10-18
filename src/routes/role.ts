import RoleController from "../controllers/role.controller";
import express from "express";

const router = express.Router();

router.get("/", RoleController.getRoles);
router.get("/user", RoleController.getUserRole);

export default router;
