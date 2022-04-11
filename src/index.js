import { app } from "./app.js";
import { PORT } from "./config.js";
import { connectToMongoDB } from "./helpers/init_mongodb.js";
import { client } from "./helpers/init_redis.js";

async function startServer() {
  await connectToMongoDB();
  await client.connect();
  app.listen(PORT);
  console.log("Server on port 🚀", PORT);
}

startServer();
