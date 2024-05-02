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
router.use("/users", UsersRoutes);
// Routes with access for logged in user
router.use("/data", DataRoutes);
router.use("/roles", RoleRoutes);

router.use("/cohorts", CohortRoutes);

router.use("/commissions", CommissionRoutes);

// Auth middleware
router.use(authMiddleware);
router.use(acl.authorize);
export default router;
