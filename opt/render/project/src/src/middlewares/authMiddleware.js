"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const httpErrors_1 = require("../utils/http/httpErrors");
const jwt_1 = require("../utils/jwt");
const httpStatusCodes_1 = __importDefault(require("../utils/http/httpStatusCodes"));
const findMaxRole_1 = __importDefault(require("../utils/findMaxRole"));
const { UNAUTHORIZED } = httpStatusCodes_1.default;
const authMiddleware = (req, _res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    try {
        if (!req.headers.authorization)
            throw new httpErrors_1.Api401Error("Authorization header missing");
        const token = req.headers.authorization.split(" ")[1];
        if (!token)
            throw new httpErrors_1.Api401Error("Authorization token missing");
        const decode = (0, jwt_1.forceDecodeJWT)(token);
        if (!(decode === null || decode === void 0 ? void 0 : decode.user) && !(decode === null || decode === void 0 ? void 0 : decode.service))
            throw new httpErrors_1.Api403Error("Not allowed to access resource");
        (0, jwt_1.verifyJWT)(token);
        if (decode && (decode === null || decode === void 0 ? void 0 : decode.service)) {
            switch (decode === null || decode === void 0 ? void 0 : decode.service) {
                case "discord-bot":
                    req.role = "bot";
                    break;
                case "pledu-bff":
                    req.role = "pledu";
                    break;
                case "landing-bff":
                    req.role = "landing";
                    break;
            }
        }
        else {
            req.role = ((_a = decode === null || decode === void 0 ? void 0 : decode.user) === null || _a === void 0 ? void 0 : _a.roles)
                ? (0, findMaxRole_1.default)(decode.user.roles)
                : "anonymous";
            req.user = decode.user;
        }
        next();
    }
    catch (err) {
        if (err.internalError)
            err.status = UNAUTHORIZED;
        next(err);
    }
});
exports.default = authMiddleware;
