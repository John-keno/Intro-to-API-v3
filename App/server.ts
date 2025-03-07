import express from "express";
import cors from "cors";
import router from "./routes/router";
import { notFound, clientError } from "./middlewares/errorHandler.middleware";
import { reqLogger } from "./middlewares/logger.middleware";
import connectToDatabase from "./config/dbMongo.config";

const app = express();

const port = process.env.PORT || 5000;

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

// Routes
app.use("/", router());

// Not found Error handling
app.use(notFound);

// Client Error handling
app.use(clientError);

// Connect to the database and start the server
connectToDatabase().then(() => {
		app.listen(port, () => {
			console.log(`Server is running on http://localhost:${port}`);
		});
	})
