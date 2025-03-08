"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.clientError = exports.notFound = void 0;
const httpError_1 = require("../utils/httpError");
// Error handling for routes that are not found
const notFound = (req, res, next) => {
    res.status(404).json({ success: false, message: "Not found" });
    console.error(`${res.statusCode} ${req.method} ${req.path} Not Found`);
    next();
};
exports.notFound = notFound;
// Global Middleware used for Client error logs excluding internal logs
const clientError = (err, req, res, next) => {
    if (err instanceof httpError_1.HttpError) {
        res.status(err.status).json({ success: false, message: err.message });
        console.log(`${err.status}  ${err.message}`);
    }
    console.error("Error: ", err.message);
};
exports.clientError = clientError;
//# sourceMappingURL=errorHandler.middleware.js.map