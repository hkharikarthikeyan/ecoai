// checkMongoConnection.js

import { MongoClient } from "mongodb"

const uri = "mongodb+srv://Hari:Hari91959799@cluster1.vpugu.mongodb.net/?retryWrites=true&w=majority&appName=Cluster1" // Replace this with your full URI

// 🔁 Replace <username> and <password> with your actual MongoDB Atlas credentials

const client = new MongoClient(uri)

async function checkConnection() {
  try {
    await client.connect()
    console.log("✅ MongoDB connection successful")

    const dbs = await client.db().admin().listDatabases()
    console.log("📁 Available databases:")
    dbs.databases.forEach(db => console.log(` - ${db.name}`))
  } catch (error) {
    console.error("❌ MongoDB connection failed:", error.message)
  } finally {
    await client.close()
  }
}

checkConnection()
