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
exports.generateToken = exports.decryptPassword = exports.encryptPassword = exports.paginate = exports.generateId = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
/**
 * Generates a unique identifier using CUID2
 * @returns {string} A unique string identifier of length 10
 */
const createId = (0, cuid2_1.init)({
    length: 10,
});
const generateId = () => {
    return createId();
};
exports.generateId = generateId;
/**
 * Performs pagination on a Mongoose model query
 * @template T - The document type of the model
 * @param {Model<T>} model - The Mongoose model to query
 * @param {number} page - The current page number (1-based)
 * @param {number} limit - The number of items per page
 * @param {Record<string, any>} [query={}] - Optional query parameters for filtering
 * @returns {Promise<{
 *   total: number,
 *  page: number,
 * limit: number,
 * totalPages: number,
 * data: T[]
 * }>} Pagination result object containing:
 * - total: Total number of documents matching the query
 * - page: Current page number
 * - limit: Number of items per page
 * - totalPages: Total number of pages
 * - data: Array of documents for the current page
 */
const paginate = (model_1, page_1, limit_1, ...args_1) => __awaiter(void 0, [model_1, page_1, limit_1, ...args_1], void 0, function* (model, page, limit, query = {}) {
    const skip = (page - 1) * limit;
    const data = yield model.find(query).skip(skip).limit(limit).exec();
    const total = yield model.countDocuments(query).exec();
    return { total, page, limit, totalPages: Math.ceil(total / limit), data };
});
exports.paginate = paginate;
/**
 * Hashes a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} The hashed password
 */
const encryptPassword = (password) => __awaiter(void 0, void 0, void 0, function* () {
    const saltrounds = 10;
    return yield bcryptjs_1.default.hash(password, saltrounds);
});
exports.encryptPassword = encryptPassword;
/**
 * Compares a password with its hashed version
 * @param {string} password - The password to compare
 * @param {string} encryptedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} A boolean indicating whether the password matches the hashed password
 */
const decryptPassword = (password, encryptedPassword) => __awaiter(void 0, void 0, void 0, function* () {
    return yield bcryptjs_1.default.compare(password, encryptedPassword);
});
exports.decryptPassword = decryptPassword;
/**
 * Generates a JWT token
 * @param {AuthData} data - The data to encode in the token
 * @returns {string} The generated JWT token
 */
const generateToken = (data) => {
    return jsonwebtoken_1.default.sign(data, process.env.JWT_SECRET || "", {
        expiresIn: "1h",
    });
};
exports.generateToken = generateToken;
