"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.requestQueryValidator = exports.RequestValidator = void 0;
const zod_1 = require("zod");
/**
 * Express middleware factory function that creates a request validator using Zod schema.
 * @param schema - The Zod schema to validate request body against
 * @returns {RequestHandler} Express middleware that validates request body
 *
 * @throws {ZodError} When request body validation fails
 *
 * @example
 * ```typescript
 * const userSchema = z.object({
 *   name: z.string(),
 *   email: z.string().email()
 * });
 *
 * app.post('/users', RequestValidator(userSchema), (req, res) => {
 *   // Handle validated request
 * });
 * ```
 */
const RequestValidator = (schema) => (req, res, next) => {
    try {
        req.body = schema.parse(req.body);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const errors = err.errors.map((err) => ({
                field: err.path.join("."),
                message: err.message,
            }));
            res.status(400).send({
                success: false,
                errors,
            });
        }
        next(err);
    }
};
exports.RequestValidator = RequestValidator;
const requestQueryValidator = (schema) => (req, res, next) => {
    try {
        const userReq = req.query;
        req.query = schema.parse(userReq);
        next();
    }
    catch (err) {
        if (err instanceof zod_1.ZodError) {
            const errors = err.errors.map((err) => ({
                queryParams: err.path.join("."),
                message: err.message,
            }));
            res.status(400).send({
                success: false,
                errors,
            });
        }
        next(err);
    }
};
exports.requestQueryValidator = requestQueryValidator;
