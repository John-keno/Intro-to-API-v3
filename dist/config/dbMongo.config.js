"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = connectToDatabase;
const mongoose_1 = __importDefault(require("mongoose"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
function connectToDatabase() {
    return __awaiter(this, void 0, void 0, function* () {
        // Database Connection
        const dbUrl = process.env.MONGO_DB_URL ||
            `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority`;
        mongoose_1.default.Promise = global.Promise;
        mongoose_1.default.connect(dbUrl);
        mongoose_1.default.connection.on("connected", () => {
            console.log("Connected to MongoDB successfully");
        });
        mongoose_1.default.connection.on("error", (err) => {
            console.error("Error connecting to MongoDB ", err);
        });
    });
}
//# sourceMappingURL=dbMongo.config.js.map