"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = default_1;
const auth_controller_1 = __importDefault(require("../controllers/auth.controller"));
const validators_middleware_1 = require("../middlewares/validators.middleware");
const user_schema_1 = require("../validation/user.schema");
const { registerUser, loginUser } = new auth_controller_1.default();
function default_1(router) {
    router.post("/v2/api/auth/register", (0, validators_middleware_1.RequestValidator)(user_schema_1.RegisterSchema), registerUser);
    router.post("/v2/api/auth/login", (0, validators_middleware_1.RequestValidator)(user_schema_1.LoginSchema), loginUser);
}
