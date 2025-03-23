import { AuthData } from './data';
import { Model } from "mongoose";
import { init } from "@paralleldrive/cuid2";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";


/**
 * Generates a unique identifier using CUID2
 * @returns {string} A unique string identifier of length 10
 */
const createId = init({
	length: 10,
});
export const generateId = (): string => {
	return createId();
};

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
export const paginate = async <T>(
	model: Model<T>,
	page: number,
	limit: number,
	query: Record<string, any> = {}
): Promise<{
	total: number;
	page: number;
	limit: number;
	totalPages: number;
	data: T[];
}> => {
	const skip = (page - 1) * limit;
	const data = await model.find(query).skip(skip).limit(limit).exec();
	const total = await model.countDocuments(query).exec();

	return { total, page, limit, totalPages: Math.ceil(total / limit), data };
};

/**
 * Hashes a password using bcrypt
 * @param {string} password - The password to hash
 * @returns {Promise<string>} The hashed password
 */
export const encryptPassword = async (password: string): Promise<string> => {
	const saltrounds = 10;
	return await bcrypt.hash(password, saltrounds);
};

/**
 * Compares a password with its hashed version
 * @param {string} password - The password to compare
 * @param {string} encryptedPassword - The hashed password to compare against
 * @returns {Promise<boolean>} A boolean indicating whether the password matches the hashed password
 */
export const decryptPassword = async (
	password: string,
	encryptedPassword: string
): Promise<boolean> => {
	return await bcrypt.compare(password, encryptedPassword);
};


/**
 * Generates a JWT token
 * @param {AuthData} data - The data to encode in the token
 * @returns {string} The generated JWT token
 */
export const generateToken = (data: AuthData): string => {
	return jwt.sign(data, process.env.JWT_SECRET || "", {
		expiresIn: "1h",
	});
};

