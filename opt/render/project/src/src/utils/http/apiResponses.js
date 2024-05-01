"use strict";
/**
 * This file contain Success and Error response for sending to client / user
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.error = exports.success = void 0;
/**
 * Send any success response
 *
 * @param   {string} message
 * @param   {number} status
 * @param   {object | array} content
 */
const success = (status, message, content) => ({
    status,
    message,
    content,
});
exports.success = success;
/**
 * Send any error response
 *
 * @param   {string} message
 * @param   {number} status
 * @param   {object | array} error
 */
const error = (status, message, error) => ({
    status,
    message,
    error,
});
exports.error = error;
