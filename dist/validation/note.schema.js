"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NoteQuerySchema = exports.NoteSchema = void 0;
const zod_1 = require("zod");
/**
 * Schema validation for Note objects using Zod
 * @remarks
 * This schema enforces strict validation of note objects with specific field requirements
 *
 * @property title - String with minimum length of 3 characters
 * @property content - Required string field
 * @property category - Object containing name property
 * @property category.name - String with minimum length of 3 characters
 *
 * @throws {ZodError} When validation fails for any field
 *
 * @example
 * ```typescript
 * const validNote = {
 *   title: "My Note",
 *   content: "Some content",
 *   category: {
 *     name: "Personal"
 *   }
 * };
 * ```
 */
exports.NoteSchema = zod_1.z.object({
    title: zod_1.z.string({
        required_error: "field is required",
    }).min(3, "Title must be at least 3 characters long"),
    content: zod_1.z.string({
        required_error: "field is required",
    }),
    category: zod_1.z.object({
        name: zod_1.z.string({
            required_error: "field is required",
        }).min(3, "Category name must be at least 3 characters long"),
    }).strict(),
}).strict();
/**
 * Schema validation for query parameters using Zod
 * @remarks
 * This schema enforces strict validation of query parameters with specific field requirements
 * @property page - Optional string field that must be a positive integer
 * @property limit - Optional string field that must be a positive integer
 * @throws {ZodError} When validation fails for any field
 * @example
 * ```typescript
 * const validQuery = {
 *  page: "1",
 * limit: "10"
 * };
 * ```
 */
exports.NoteQuerySchema = zod_1.z.object({
    page: zod_1.z.string().optional().transform(Number)
        .refine((value) => Number.isInteger(value) && value > 0, {
        message: "page must be a positive whole number or a non fractional number",
    }),
    limit: zod_1.z.string().optional().transform(Number)
        .refine((value) => Number.isInteger(value) && value > 0, {
        message: "limit must be a positive number or a non fractional number",
    })
}).strict({
    message: "Unrecognized keys were found in the query parameters"
});
