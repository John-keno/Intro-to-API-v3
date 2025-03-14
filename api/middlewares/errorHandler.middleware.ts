import NoteSchema from "../validation/note.schema";
import { HttpError } from "../utils/httpError";
import { Request, Response, NextFunction, RequestHandler } from "express";
import { ZodTypeAny, ZodError, z, ZodType } from "zod";

// Error handling for routes that are not found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({ success: false, message: "Not found" });
    res.on("finish", () => {
        console.error(`[${new Date().toUTCString()}] [${res.statusCode}] ${req.path} Not Found`);
    }) 
	next();
};

// Global Middleware used for Client error logs excluding internal logs
export const clientError = (
	err: Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
    
	if (err instanceof HttpError) {
		res.status(err.status).json({ success: false, message: err.message });
		console.error(`[${new Date().toUTCString()}] [${res.statusCode}] ${req.path}`);
        
	}
	next(`[${new Date().toUTCString()}] [${res.statusCode}] ${req.path} ${err.message}`);
}
