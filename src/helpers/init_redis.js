import { createClient } from "redis";
import { REDIS_HOST } from "../config";

export const client = createClient({
  HOST: REDIS_HOST,
});

client.on("connect", () => {
  console.log("Redis client connected");
});

client.on("ready", () => {
  console.log("Redis client ready");
});

client.on("error", (err) => {
  console.log(err.message);
});

client.on("end", () => {
  console.log("Redis client disconnected");
});

process.on("SIGINT", () => {
  client.quit();
});
