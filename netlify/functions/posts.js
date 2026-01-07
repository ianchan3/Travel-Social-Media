const { MongoClient } = require("mongodb");

let cachedClient;

async function getClient() {
  if (cachedClient) return cachedClient;
  const client = new MongoClient(process.env.MONGODB_URI);
  await client.connect();
  cachedClient = client;
  return client;
}

exports.handler = async (event) => {
  try {
    const page = Number(event.queryStringParameters?.page ?? 1);
    const limit = 10;
    const skip = (page - 1) * limit;

    const client = await getClient();
    const db = client.db(); // or client.db("yourDbName")
    const posts = await db
      .collection("posts")
      .find({})
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .toArray();

      return {
        statusCode: 200,
        body: JSON.stringify({
          data: posts,
          currentPage: page,
          numberOfPages: Math.ceil(total / LIMIT),
        }),
      };
      
  } catch (err) {
    return { statusCode: 500, body: err?.message || "Server error" };
  }
};
