import CohortRoutes from "./cohorts";
import CommissionRoutes from "./commissions";
import DataRoutes from "./data";
import RoleRoutes from "./role";
import UsersRoutes from "./users";
import express from "express";
import authMiddleware from "../middlewares/authMiddleware";
import acl from "../acl";

const router = express.Router();

// Auth middleware
router.use(authMiddleware);
router.use(acl.authorize);

// Routes with access for logged in user
router.use("/data", DataRoutes);
router.use("/roles", RoleRoutes);

router.use("/cohorts", CohortRoutes);

router.use("/commissions", CommissionRoutes);

router.use("/users", UsersRoutes);

export default router;
