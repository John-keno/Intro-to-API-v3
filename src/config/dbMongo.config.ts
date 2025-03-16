import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

export default async function connectToDatabase() {
    // Database Connection
    const dbUrl =
        process.env.MONGO_DB_URL ||
        `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_CLUSTER_URL}/?retryWrites=true&w=majority`;
    mongoose.Promise = global.Promise;
    mongoose.connect(dbUrl);
    mongoose.connection.on("connected", () => {
        console.log("Connected to MongoDB successfully");
    });
    mongoose.connection.on("error", (err) => {
        console.error("Error connecting to MongoDB ", err);
    });

    /* Uncomment the line below to disconnect from database and simulate server error*/
    // mongoose.disconnect();
}