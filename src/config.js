import { config } from "dotenv";

config();

// Server Settings
export const PORT = process.env.PORT || 3000;

// Mongodb Settings
export const MONGODB_PORT = process.env.MONGODB_PORT || 27017;
export const MONGODB_HOST = process.env.MONGODB_HOST || "localhost";
export const MONGODB_DB = process.env.MONGODB_DB || "test";

export const MONGODB_URI =
  process.env.MONGODB_URI ||
  `mongodb://${MONGODB_HOST}:${MONGODB_PORT}/${MONGODB_DB}`;

// SECRET
export const ACCESS_TOKEN_SECRET =
  process.env.ACCESS_TOKEN_SECRET || "some-secret";
export const REFRESH_TOKEN_SECRET =
  process.env.REFRESH_TOKEN_SECRET || "some-secret";

// Redis
export const REDIS_HOST = process.env.REDIS_HOST || "localhost";
export const REDIS_PORT = process.env.REDIS_PORT || 6379;
