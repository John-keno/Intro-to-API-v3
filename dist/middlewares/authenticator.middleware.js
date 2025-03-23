"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const httpError_1 = require("../utils/httpError");
const verifyToken = (req, res, next) => {
    var _a;
    const bearerHeader = (_a = req.headers["authorization"]) === null || _a === void 0 ? void 0 : _a.split(" ");
    const bearerToken = bearerHeader && bearerHeader[1];
    if (!bearerToken) {
        res.status(401).send({
            success: false,
            message: "unauthorized",
        });
        return;
    }
    try {
        const data = jsonwebtoken_1.default.verify(bearerToken, process.env.JWT_SECRET || "");
        req.user = data;
        next();
    }
    catch (error) {
        if (error instanceof jsonwebtoken_1.default.TokenExpiredError) {
            return next(new httpError_1.HttpError(401, "Session expired. Please login again"));
        }
        next(new httpError_1.HttpError(403, "Forbidden"));
    }
};
exports.verifyToken = verifyToken;
