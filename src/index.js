import { app } from "./app";
import { PORT } from "./config";
import { connectToMongoDB } from "./helpers/init_mongodb";
import { client } from "./helpers/init_redis";

async function startServer() {
  await connectToMongoDB();
  await client.connect();
  app.listen(PORT);
  console.log("Server on port 🚀", PORT);
}

startServer();
