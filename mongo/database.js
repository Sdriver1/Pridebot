const { MongoClient } = require("mongodb");

// Access the MongoDB token from your environment variable
const uri = process.env.databaseToken;

if (!uri) {
  throw new Error("The MongoDB URI is not set in environment variables.");
}

const client = new MongoClient(uri);
let db;

async function connectDb() {
  if (db) return db; // Use existing database connection if it's already established
  try {
    await client.connect();
    console.log("Connected to MongoDB");
    db = client.db("Cluster0"); // Replace with your actual database name
    return db;
  } catch (e) {
    console.error("Error connecting to MongoDB:", e);
    process.exit(1); // Exit the process if unable to connect
  }
}

async function getSuggestionCount() {
  try {
    const db = await connectDb();
    const suggestionsCollection = db.collection("suggestions");

    const updateResult = await suggestionsCollection.findOneAndUpdate(
      { _id: "suggestionCount" },
      { $inc: { count: 1 } },
      {
        returnDocument: "after",
        upsert: true,
      }
    );

    // Check if the updated document is directly in updateResult or in updateResult.value
    const updatedDocument = updateResult.value || updateResult;

    if (!updatedDocument) {
      console.error(
        "findOneAndUpdate did not return a document. Result:",
        updateResult
      );
      throw new Error("No document found or created for suggestion count");
    }

    return updatedDocument.count;
  } catch (error) {
    console.error("Error in getSuggestionCount:", error);
    throw error;
  }
}

async function getRandomTopic() {
  try {
    const db = await connectDb();
    const topicsCollection = db.collection("topics");
    const count = await topicsCollection.countDocuments();

    if (count === 0) {
      throw new Error("No topics available");
    }

    const random = Math.floor(Math.random() * count);
    const topicArray = await topicsCollection
      .find()
      .skip(random)
      .limit(1)
      .toArray();

    if (topicArray.length === 0) {
      throw new Error("Failed to fetch random topic");
    }

    return topicArray[0].topic;
  } catch (error) {
    console.error("Error in getRandomTopic:", error);
    throw error;
  }
}

//async function addTopics() {
//try {
//  const db = await connectDb();
//  const topicsCollection = db.collection("topics");

//  const topics = [];

// Insert topics if they do not already exist to avoid duplicates
//   for (const topic of topics) {
//   const topicExists = await topicsCollection.countDocuments({
//      topic: topic,
//    });
//    if (topicExists === 0) {
//      await topicsCollection.insertOne({ topic: topic });
//console.log(`Topic added: ${topic}`);
//    } else {
//      console.log(`Topic already exists, skipping: ${topic}`);
//}
//   }
//  } catch (error) {
//console.error("Error in addTopics:", error);
//    throw error; // Re-throw the error to be caught by the calling function
//  }
//}

//(async () => {
// try {
//   console.log("Adding topics to the database...");
//   await addTopics();
//   console.log("Finished adding topics.");
// } catch (error) {
//   console.error("Error during adding topics:", error);
//} finally {
//   await client.close();
// }
// })();
module.exports = { connectDb, getSuggestionCount, getRandomTopic };
