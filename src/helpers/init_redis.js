import redis from "redis";
import { REDIS_HOST, REDIS_PORT } from "../config";

const client = redis.createClient({
  port: REDIS_PORT,
  host: REDIS_HOST,
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

export default client;
