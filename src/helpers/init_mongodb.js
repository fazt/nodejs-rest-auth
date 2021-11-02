import { connect, connection } from 'mongoose'
import { MONGODB_URI, MONGODB_DB } from '../config'

export const connectToMongoDB = async () => {
  try {
    const db = await connect(MONGODB_URI, {
      dbName: MONGODB_DB
    })
    console.log('MongoDB connected to', db.connection.db.databaseName)
  } catch (error) {
    console.log(error)
  }
}

connection.on('connected', () => {
  console.log('MongoDB connected')
})

connection.on('disconnected', () => {
  console.log('MongoDB was disconnected')

})
connection.on('error', (err) => {
  console.log(err.message)
})

process.on('SIGINT', async () => {
  await connection.close()
  process.exit(0)
})