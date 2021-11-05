import app from "./app";
import { PORT } from "./config";
import { connectToMongoDB } from "./helpers/init_mongodb";
import client from "./helpers/init_redis";

client.set("foo", "bar");

client.get("foo", (err, result) => {
  if (err) {
    console.log(err);
  }
  console.log(result)
});

async function startServer() {
  await connectToMongoDB();
  app.listen(PORT);
  console.log("Server on port 🚀", PORT);
}

startServer();
