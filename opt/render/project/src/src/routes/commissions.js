"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const commission_controller_1 = __importDefault(require("../controllers/commission.controller"));
const router = express_1.default.Router();
const { createCommission, getCommission, deleteCommission, addUsersToCommission, deleteUsersFromCommission, updateUsersCommission, updateCommission, getUserCommissions, } = commission_controller_1.default;
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
exports.default = router;
