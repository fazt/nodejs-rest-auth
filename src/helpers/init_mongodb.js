import mongoose from "mongoose";
import { MONGODB_URI } from "../config.js";

export const connectToMongoDB = async () => {
  try {
    const db = await mongoose.connect(MONGODB_URI);
    console.log("MongoDB connected to", db.connection.db.databaseName);
  } catch (error) {
    console.log(error);
  }
};

mongoose.connection.on("connected", () => {
  console.log("MongoDB connected");
});

mongoose.connection.on("disconnected", () => {
  console.log("MongoDB was disconnected");
});

mongoose.connection.on("error", (err) => {
  console.log(err.message);
});

process.on("SIGINT", async () => {
  await mongoose.connection.close();
  process.exit(0);
});
