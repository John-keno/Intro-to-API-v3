import express, { Request, Response, NextFunction } from "express";
import http from "http";
import bodyParser from "body-parser";
import cookieParser from "cookie-parser";
import compression from "compression";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import router from "./router";
import { HttpError } from "./errors/HttpError";
import { error } from "console";

const app = express();

dotenv.config();
const port = process.env.PORT || 5000;

app.use(
	cors({
		origin: `http://localhost:${port}`,
		credentials: true,
	})
);

app.use(compression());
app.use(cookieParser());
app.use(express.json());

const server = http.createServer(app);

server.listen(port, () => {
	console.log(`Server is running on http://localhost:${port}`);
});

app.use("/", router());

app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(404).json({ message: "Not found" });
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
	if (err instanceof HttpError) {
		console.error(`${err.status}  ${err.message}`);
		res.status(err.status).json({ message: err.message });
	}
	console.log("internal Error: ", err.message);
	res.status(500).json({ message: "Something went wrong" });
});
const dbUrl =
	process.env.MONGO_DB_URL ||
	`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority`;
mongoose.Promise = global.Promise;
mongoose.connect(dbUrl);
mongoose.connection.on("connected", () => {
	console.log("Connected to MongoDB");
});
mongoose.connection.on("error", (err) => {
	console.log("Error connecting to MongoDB", err);
});
