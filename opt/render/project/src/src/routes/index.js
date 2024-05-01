"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const cohorts_1 = __importDefault(require("./cohorts"));
const commissions_1 = __importDefault(require("./commissions"));
const data_1 = __importDefault(require("./data"));
const role_1 = __importDefault(require("./role"));
const users_1 = __importDefault(require("./users"));
const express_1 = __importDefault(require("express"));
const authMiddleware_1 = __importDefault(require("../middlewares/authMiddleware"));
const acl_1 = __importDefault(require("../acl"));
const router = express_1.default.Router();
router.use("/users", users_1.default);
// Routes with access for logged in user
router.use("/data", data_1.default);
router.use("/roles", role_1.default);
router.use("/cohorts", cohorts_1.default);
router.use("/commissions", commissions_1.default);
// Auth middleware
router.use(authMiddleware_1.default);
router.use(acl_1.default.authorize);
exports.default = router;
