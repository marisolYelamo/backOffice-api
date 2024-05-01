"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const randomNumber = (maxNumber) => Math.floor(Math.random() * (maxNumber + 1));
const randomChar = () => {
    const random = randomNumber(2);
    if (!random)
        return randomNumber(9);
    const n = randomNumber(25);
    const firstPosition = random > 1 ? "A".charCodeAt(0) : "a".charCodeAt(0);
    return String.fromCharCode(n + firstPosition);
};
const randomIdGenerator = (length = 10) => {
    let result = "";
    for (let i = 0; i < length; i++)
        result += randomChar();
    return result;
};
exports.default = randomIdGenerator;
