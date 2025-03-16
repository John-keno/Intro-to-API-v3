"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const winston_1 = require("winston");
/**
 * Creates and configures a Winston logger instance for application logging.
 *
 * The logger is configured with:
 * - Info level logging
 * - Timestamp format: "YYYY-MM-DD hh:mm:ss.SSS A"
 * - Custom format: timestamp [LEVEL]: message
 *
 * @exports {Logger} - Configured Winston logger instance
 *
 * Transports:
 * - Console output with colorized messages
 * - File output to "logs/requests.log"
 */
exports.default = (0, winston_1.createLogger)({
    level: "info",
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-DD hh:mm:ss.SSS A" }), winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`)),
    transports: [
        new winston_1.transports.Console({
            format: winston_1.format.combine(winston_1.format.printf(({ timestamp, level, message }) => `${timestamp} [${level.toUpperCase()}]: ${message}`), winston_1.format.colorize({ all: true })),
        }),
        new winston_1.transports.File({ filename: "logs/requests.log" }), // Log to a file
    ],
});
