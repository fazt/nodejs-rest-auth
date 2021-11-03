import app from './app'
import { PORT } from './config'
import { connectToMongoDB } from './helpers/init_mongodb'

async function startServer() {
  await connectToMongoDB()
  app.listen(PORT)
  console.log('Server on port 🚀', PORT)
}

startServer()
