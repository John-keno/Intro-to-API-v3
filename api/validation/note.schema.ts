import { z } from "zod";

const NoteSchema = z
	.object({
		title: z
			.string({
				required_error: "field is required",
			})
			.min(3, "Title must be at least 3 characters long"),
		content: z.string({
			required_error: "field is required",
		}),
		category: z
			.object({
				name: z
					.string({
						required_error: "field is required",
					})
					.min(3, "Category name must be at least 3 characters long"),
			})
			.strict(),
	})
	.strict();

export default NoteSchema;
