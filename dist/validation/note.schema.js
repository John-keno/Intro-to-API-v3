"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
const NoteSchema = zod_1.z.object({
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
exports.default = NoteSchema;
