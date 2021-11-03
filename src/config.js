import { config } from "dotenv";

config();

// Server Settings
export const PORT = process.env.PORT || 3000;

// Mongodb Settings
export const MONGODB_URI =
  process.env.MONGODB_URI || "mongodb://localhost:27017";
export const MONGODB_DB = process.env.MONGODB_DB || "test";

// SECRET
export const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || "some-secret";
export const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || "some-secret";
