"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const role_controller_1 = __importDefault(require("../controllers/role.controller"));
const express_1 = __importDefault(require("express"));
const router = express_1.default.Router();
router.get("/", role_controller_1.default.getRoles);
router.get("/user", role_controller_1.default.getUserRole);
exports.default = router;
