"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.formattedNowDate = void 0;
const formattedNowDate = () => {
    const today = new Date();
    return today.toLocaleDateString("es-AR", {
        day: "2-digit",
        month: "2-digit",
        year: "2-digit",
        hour: "numeric",
        minute: "numeric",
        timeZone: "America/Argentina/Buenos_Aires",
    });
};
exports.formattedNowDate = formattedNowDate;
