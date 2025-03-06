import express, { Request, Response, NextFunction } from "express";
import http from "http";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";
import { HttpError } from "./errors/HttpError";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

const reqLogger = (req: Request, res: Response, next: NextFunction) => {
	console.log(`${req.method} ${req.path}`);
	next();
};

// Error handling for routes that are not found
const notFound = (req: Request, res: Response, next: NextFunction) => {
	res.status(404).json({ message: "Not found" });
	console.error(`${res.statusCode} ${req.method} ${req.path} Not Found`);
	next();
};

// Global Middleware used for Client error logs excluding internal logs
const clientError = (
	err: HttpError | Error,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	if (err instanceof HttpError) {
		res.status(err.status).json({ message: err.message });
		console.log(`${err.status}  ${err.message}`);
	}
	console.error("internal Error: ", err.message);
	res.status(500).json({ message: "Internal Server Error" });
};



/* Middleware Registration*/

// For handling CORS
app.use(
	cors({
		credentials: true,
	})
);
// For logging requests
app.use(reqLogger);

// For parsing JSON data
app.use(express.json());

// For compressing responses
app.use(compression());

// Routes
app.use("/", router());

// Not found Error handling
app.use(notFound);

// Client Error handling
app.use(clientError);

/* Server Initialization */
// Create a server and listen on the specified port
const server = http.createServer(app);

// Start the server
server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});


// Database Connection
const dbUrl = process.env.MONGO_DB_URL ||
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
	console.error("Error connecting to MongoDB", err);
});

// mongoose.disconnect();