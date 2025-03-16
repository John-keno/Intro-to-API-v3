"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const router_1 = __importDefault(require("./routes/router"));
const errorHandler_middleware_1 = require("./middlewares/errorHandler.middleware");
const logger_middleware_1 = require("./middlewares/logger.middleware");
const dbMongo_config_1 = __importDefault(require("./config/dbMongo.config"));
const app = (0, express_1.default)();
const port = process.env.PORT ? parseInt(process.env.PORT) : 3000;
/* Middleware Registration*/
// For handling CORS
app.use((0, cors_1.default)({
    credentials: true,
}));
// For parsing JSON data
app.use(express_1.default.json());
// For logging requests
app.use(logger_middleware_1.reqLogger);
// Routes
app.use("/", (0, router_1.default)());
// Not found Error handling
app.use(errorHandler_middleware_1.notFound);
// Client Error handling
app.use(errorHandler_middleware_1.clientError);
// Connect to the database and start the server
function startServer(port) {
    const server = app.listen(port, () => {
        console.log(`Server is running on http://localhost:${port}`);
    });
    server.on("error", (err) => {
        if (err.code === "EADDRINUSE") {
            let newPort = port + 1;
            console.error(`Port ${port} is already in use.`);
            console.log(`Trying to start server on Port ${newPort}`);
            startServer(newPort);
        }
        else {
            console.error("An error occurred: ", err);
            process.exit(1);
        }
    });
}
(0, dbMongo_config_1.default)().then(() => {
    startServer(port);
});
// export default app;
