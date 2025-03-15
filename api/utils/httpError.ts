/**
 * Custom error class that extends the built-in Error class to include HTTP status codes
 * @class HttpError
 * @extends {Error}
 * @property {number} status - The HTTP status code associated with the error
 * @param {number} status - The HTTP status code to be set
 * @param {string} message - The error message to be displayed
 */
export class HttpError extends Error {
	status: number;

	constructor(status: number, message: string) {
		super(message);
		this.status = status;
		
	}
}
