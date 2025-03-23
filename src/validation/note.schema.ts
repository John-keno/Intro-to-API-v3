import { number, z } from "zod";

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

export const NoteSchema = z.object({
		title: z.string({
				required_error: "field is required",
			}).min(3, "Title must be at least 3 characters long"),

		content: z.string({
			required_error: "field is required",
		}),
		category: z.object({
					name: z.string({
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

export const NoteQuerySchema = z.object({
	page: z.string().optional().transform(Number)
		.refine((value) => Number.isInteger(value) && value > 0, {
			message: "page must be a positive whole number or a non fractional number",
		}),
	limit: z.string().optional().transform(Number)
		.refine((value) => Number.isInteger(value) && value > 0, {
			message: "limit must be a positive number or a non fractional number",
		})
}).strict({
	message: "Unrecognized keys were found in the query parameters"
});
