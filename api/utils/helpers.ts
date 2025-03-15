import { init } from "@paralleldrive/cuid2";
/**
 * Generates a unique identifier string using CUID2.
 * The generated ID has a fixed length of 10 characters.
 * Uses the @paralleldrive/cuid2 library for secure and collision-resistant ID generation.
 *
 * @returns {string} A unique 10-character identifier string
 *
 * @example
 * const id = generateId(); // Returns something like "c2xu5hli8p"
 */

const createId = init({
	length: 10,
});

export const generateId = (): string => {
	return createId();
};
