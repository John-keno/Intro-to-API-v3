"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.reqLogger = void 0;
const logger_1 = __importDefault(require("../utils/logger"));
const reqLogger = (req, res, next) => {
    const reqStartTime = Date.now();
    res.on("finish", () => {
        const reqDuration = Date.now() - reqStartTime;
        const logLevel = res.statusCode >= 500 ? "error" : res.statusCode >= 400 ? "warn" : "info";
        logger_1.default.log(logLevel, `METHOD: ${req.method} | URL: ${req.url} | STATUS: ${res.statusCode} | DURATION: ${reqDuration}ms | IP: ${req.ip} | USER-AGENT: ${req.headers["user-agent"]}`);
    });
    next();
};
exports.reqLogger = reqLogger;
