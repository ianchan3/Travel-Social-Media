const { MongoClient } = require("mongodb");

let cachedClient = null;

async function getClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event) => {
  try {
    const page = Number(event.queryStringParameters?.page || 1);
    const LIMIT = 8;
    const startIndex = (page - 1) * LIMIT;

    const client = await getClient();

    // change "test" if your DB name is different
    const db = client.db("test");
    const collection = db.collection("posts");

    const total = await collection.countDocuments({}); // ✅ define total
    const posts = await collection
      .find({})
      .sort({ _id: -1 })
      .skip(startIndex)
      .limit(LIMIT)
      .toArray();

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        data: posts,
        currentPage: page,
        numberOfPages: Math.ceil(total / LIMIT), // ✅ uses total
      }),
    };
  } catch (err) {
    console.error("posts function error:", err);
    return {
      statusCode: 500,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: err.message }),
    };
  }
};
