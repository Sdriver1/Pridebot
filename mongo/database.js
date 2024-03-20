const { MongoClient } = require("mongodb");

const uri = process.env.databaseToken;

if (!uri) {
  throw new Error("The MongoDB URI is not set in environment variables.");
}

const client = new MongoClient(uri);
let db;

async function connectDb() {
  if (db) return db; 
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("Cluster0"); 
    return db;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    process.exit(1); 
  }
}

module.exports = { connectDb };
