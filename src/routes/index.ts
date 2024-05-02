import CohortRoutes from "./cohorts";
import CommissionRoutes from "./commissions";
import DataRoutes from "./data";
import RoleRoutes from "./role";
import UsersRoutes from "./users";
import AuthRoutes from "./auth";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import acl from "../acl";

const router = express.Router();
router.use("/auth", AuthRoutes);
router.use("/users", authMiddleware, UsersRoutes);
// Routes with access for logged in user

router.use(acl.authorize);
router.use("/data", authMiddleware, DataRoutes);
router.use("/roles", authMiddleware, RoleRoutes);

router.use("/cohorts", authMiddleware, CohortRoutes);

router.use("/commissions", authMiddleware, CommissionRoutes);

export default router;
