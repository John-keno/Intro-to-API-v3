import { HttpError } from "../utils/httpError";
import { Request, Response, NextFunction } from "express";

// Error handling for routes that are not found
export const notFound = (req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ success: false, message: "Not found" });
    console.error(`${res.statusCode} ${req.method} ${req.path} Not Found`);
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
        res.status(err.status).json({ success: false, message: err.message});
        console.log(`${err.status}  ${err.message}`);
    }
    console.error("Error: ", err.message);
};