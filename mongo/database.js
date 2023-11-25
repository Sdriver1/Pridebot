const { MongoClient } = require('mongodb');

// Access the MongoDB token from your environment variable
const uri = process.env.databaseToken;

if (!uri) {
  throw new Error('The MongoDB URI is not set in environment variables.');
}

const client = new MongoClient(uri);

async function connectDb() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    return client.db('Cluster0'); // Replace 'Cluster0' with your actual database name if it's different
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    process.exit(1); // Exit the process if unable to connect
  }
}

async function getSuggestionCount() {
  try {
    const db = await connectDb();
    const suggestionsCollection = db.collection('suggestions');

    const updateResult = await suggestionsCollection.findOneAndUpdate(
      { _id: 'suggestionCount' },
      { $inc: { count: 1 } },
      { 
        returnDocument: 'after',
        upsert: true 
      }
    );

    // Check if the updated document is directly in updateResult or in updateResult.value
    const updatedDocument = updateResult.value || updateResult;

    if (!updatedDocument) {
      console.error("findOneAndUpdate did not return a document. Result:", updateResult);
      throw new Error('No document found or created for suggestion count');
    }

    return updatedDocument.count;
  } catch (error) {
    console.error("Error in getSuggestionCount:", error);
    throw error;
  }
}

module.exports = { connectDb, getSuggestionCount };
