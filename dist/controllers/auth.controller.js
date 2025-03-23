"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = require("../services/user.service");
const httpError_1 = require("../utils/httpError");
const helpers_1 = require("../utils/helpers");
const { registerUser, loginUser, getUserByEmail } = new user_service_1.UserService();
class AuthController {
    registerUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { name, email, password } = req.body;
                const user = yield getUserByEmail(email);
                if (user !== null) {
                    return next(new httpError_1.HttpError(400, "Account already exists"));
                }
                const data = yield registerUser({ name, email, password });
                if (data) {
                    res.status(201).send({
                        success: true,
                        message: `Account with email ${data.email} created successfully. Now you can login`,
                    });
                }
                else {
                    res.status(500).send({
                        success: false,
                        message: `Account with email ${email} creation failed`,
                    });
                }
            }
            catch (error) {
                next(new httpError_1.HttpError(500, "Internal Server Error"));
            }
        });
    }
    loginUser(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const { email, password } = req.body;
                const user = yield getUserByEmail(email);
                if (!user) {
                    return next(new httpError_1.HttpError(401, "Invalid email or password"));
                }
                const data = yield loginUser(password, user);
                if (!data) {
                    return next(new httpError_1.HttpError(401, "Invalid email or password"));
                }
                else {
                    const userData = { email: user.email, userId: user._id, name: user.name };
                    const token = (0, helpers_1.generateToken)(userData);
                    res.status(200).send({
                        success: true,
                        message: "Login successful",
                        data: { email: user.email, token },
                    });
                }
            }
            catch (error) {
                next(new httpError_1.HttpError(500, "Error logging in"));
            }
        });
    }
}
exports.default = AuthController;
