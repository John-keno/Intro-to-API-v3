"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.HttpError = void 0;
/**
 * Custom error class that extends the built-in Error class to include HTTP status codes
 * @class HttpError
 * @extends {Error}
 * @property {number} status - The HTTP status code associated with the error
 * @param {number} status - The HTTP status code to be set
 * @param {string} message - The error message to be displayed
 */
class HttpError extends Error {
    constructor(status, message) {
        super(message);
        this.status = status;
    }
}
exports.HttpError = HttpError;
