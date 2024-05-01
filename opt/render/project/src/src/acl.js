"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_acl_1 = __importDefault(require("express-acl"));
//needs ts fix
const configObject = {
    filename: "nacl.yaml",
    path: "src",
    defaultRole: "anonymous",
    roleSearchPath: "role",
};
const responseObject = {
    code: 403,
    message: "You are not authorized to access this resource",
};
express_acl_1.default.config(configObject, responseObject);
exports.default = express_acl_1.default;
