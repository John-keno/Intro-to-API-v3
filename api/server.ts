import express from "express";
import cors from "cors";
import router from "./routes/router";
import { notFound, clientError } from "./middlewares/errorHandler.middleware";
import { reqLogger } from "./middlewares/logger.middleware";
import connectToDatabase from "./config/dbMongo.config";

const app = express();

const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;

/* Middleware Registration*/

// For handling CORS
app.use(
	cors({
		credentials: true,
	})
);

// For parsing JSON data
app.use(express.json());

// For logging requests
app.use(reqLogger);

// Routes
app.use("/", router());

// Not found Error handling
app.use(notFound);

// Client Error handling
app.use(clientError);

// Connect to the database and start the server
function startServer(port: number): void {
	const server = app.listen(port, () => {
		console.log(`Server is running on http://localhost:${port}`);
	});

	server.on("error", (err: any) => {
		if (err.code === "EADDRINUSE") {
			let newPort = port + 1;
			console.error(`Port ${port} is already in use.`);
			console.log(`Trying to start server on Port ${newPort}`);
			startServer(newPort);
		} else {
			console.error("An error occurred: ", err);
			process.exit(1);
		}
	});
}
connectToDatabase().then(() => {
	startServer(port);
});

export default app;
