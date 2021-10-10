import mongoose from 'mongoose'
import { MongoMemoryServer } from 'mongodb-memory-server'

let mongo

/**
 * connect to in memory server database
 */
async function connect() {
  mongo = await MongoMemoryServer.create()
  const uri = mongo.getUri()
  await mongoose.connect(uri)
}

/**
 * drop the database and drop the connection
 */
async function closeDatabase() {
  await mongoose.connection.dropDatabase()
  await mongoose.connection.close()
  await mongo.stop()
}

/**
 * clear the database, remove the data
 */
async function clearDatabase() {
  const collections = mongoose.connection.collections
  for (const key in collections) {
    const collection = collections[key]
    await collection.deleteMany({})
  }
}

export default { connect, closeDatabase, clearDatabase }
