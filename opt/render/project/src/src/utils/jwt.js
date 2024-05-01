"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forceDecodeJWT = exports.verifyJWT = exports.createJWT = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const config_1 = require("../config");
const serviceError_1 = __importDefault(require("../services/utils/serviceError"));
const { secretKey } = config_1.jwtConfig;
const createJWT = (content, secret = secretKey, expiration) => {
    const token = jsonwebtoken_1.default.sign({
        content,
        expiresIn: expiration,
    }, secret);
    return token;
};
exports.createJWT = createJWT;
const verifyJWT = (token, secret = secretKey) => jsonwebtoken_1.default.verify(token, secret, (err) => {
    if (err)
        throw new serviceError_1.default("invalid_token", err);
    return "Verified token";
});
exports.verifyJWT = verifyJWT;
const forceDecodeJWT = (token) => {
    const decode = jsonwebtoken_1.default.decode(token);
    return decode;
};
exports.forceDecodeJWT = forceDecodeJWT;
