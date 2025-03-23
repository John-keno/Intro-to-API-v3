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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const user_model_1 = __importDefault(require("../models/user.model"));
const helpers_1 = require("../utils/helpers");
class UserService {
    registerUser(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const { name, email, password } = data;
            const encryptedPassword = yield (0, helpers_1.encryptPassword)(password);
            return yield user_model_1.default.create({ name, email, password: encryptedPassword });
        });
    }
    loginUser(password, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const isPasswordMatch = yield (0, helpers_1.decryptPassword)(password, user.password);
            return isPasswordMatch;
        });
    }
    getUserByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_model_1.default.findOne({ email });
        });
    }
}
exports.UserService = UserService;
