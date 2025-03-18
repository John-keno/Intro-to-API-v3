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
exports.paginate = exports.generateId = void 0;
const cuid2_1 = require("@paralleldrive/cuid2");
/**
 * Utility functions for ID generation and pagination
 * @module helpers
 */
/**
 * Generates a unique identifier using CUID2
 * @returns {string} A unique string identifier of length 10
 */
/**
 * Performs pagination on a Mongoose model query
 * @template T - The document type of the model
 * @param {Model<T>} model - The Mongoose model to query
 * @param {number} page - The current page number (1-based)
 * @param {number} limit - The number of items per page
 * @param {Record<string, any>} [query={}] - Optional query parameters for filtering
 * @returns {Promise<{
 *   total: number,
 *   page: number,
 *   limit: number,
 *   totalPages: number,
 *   data: T[]
 * }>} Pagination result object containing:
 * - total: Total number of documents matching the query
 * - page: Current page number
 * - limit: Number of items per page
 * - totalPages: Total number of pages
 * - data: Array of documents for the current page
 */
const createId = (0, cuid2_1.init)({
    length: 10,
});
const generateId = () => {
    return createId();
};
exports.generateId = generateId;
const paginate = (model_1, page_1, limit_1, ...args_1) => __awaiter(void 0, [model_1, page_1, limit_1, ...args_1], void 0, function* (model, page, limit, query = {}) {
    const skip = (page - 1) * limit;
    const data = yield model.find(query).skip(skip).limit(limit).exec();
    const total = yield model.countDocuments(query).exec();
    return { total, page, limit, totalPages: Math.ceil(total / limit), data };
});
exports.paginate = paginate;
