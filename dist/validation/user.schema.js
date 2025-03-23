"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LoginSchema = exports.RegisterSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.RegisterSchema = zod_1.default.object({
    name: zod_1.default.string().min(3, "Name must be at least 3 characters"),
    email: zod_1.default.string().email().min(3, "field is required"),
    password: zod_1.default.string()
        .min(8, "Password must be at least 8 characters")
        .regex(/[A-Z]/, "Password must contain at least one uppercase letter")
        .regex(/[a-z]/, "Password must contain at least one lowercase letter")
        .regex(/[0-9]/, "Password must contain at least one number")
        .regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
}).strict();
exports.LoginSchema = zod_1.default.object({
    email: zod_1.default.string().email("email not valid").min(3, "field is required"),
    password: zod_1.default.string().min(8, "Password must be at least 8 characters"),
}).strict();
