import { z } from "zod";

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

const NoteSchema = z.object({
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

export default NoteSchema;
