import { MongoClient } from "mongodb"

const uri = process.env.MONGODB_URI!
const options = {}

let client: MongoClient
export let clientPromise: Promise<MongoClient>

if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local")
}

// For development environments, use a global promise to prevent repeated connections during hot reloads
if (process.env.NODE_ENV === "development") {
  if (!(global as any)._mongoClientPromise) {
    client = new MongoClient(uri, options)
    ;(global as any)._mongoClientPromise = client.connect()
  }
  clientPromise = (global as any)._mongoClientPromise
} else {
  client = new MongoClient(uri, options)
  clientPromise = client.connect()
}

// Export a function to connect to the database and return the database object
export async function connectToDatabase() {
  const client = await clientPromise
  const db = client.db() // Use the default database defined in the URI
  return { client, db }
}
