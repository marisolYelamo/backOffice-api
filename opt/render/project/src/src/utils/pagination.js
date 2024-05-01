"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const serviceError_1 = __importDefault(require("../services/utils/serviceError"));
const pagination = (page = 1, quantityOfItems = 10, minItems = 1, maxItems = 50) => {
    if (page < 1)
        throw new serviceError_1.default("bad_input", "Page can't be less than 1");
    if (quantityOfItems < minItems)
        throw new serviceError_1.default("bad_input", `Limit can't be less than ${minItems}`);
    if (quantityOfItems > maxItems)
        throw new serviceError_1.default("bad_input", `Limit can't be more than ${maxItems}`);
    const offset = (page - 1) * quantityOfItems;
    return {
        offset,
        limit: quantityOfItems,
        currentPage: Number(page),
    };
};
exports.default = pagination;
