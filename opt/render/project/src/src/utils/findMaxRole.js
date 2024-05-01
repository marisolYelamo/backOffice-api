"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const findMaxRole = (roles) => {
    if (!roles.length)
        return "anonymous";
    const arrOfRoles = roles.map((role) => role.name);
    if (arrOfRoles.includes("admin"))
        return "admin";
    if (arrOfRoles.includes("editor"))
        return "editor";
    if (arrOfRoles.includes("viewer"))
        return "viewer";
    return "anonymous";
};
exports.default = findMaxRole;
