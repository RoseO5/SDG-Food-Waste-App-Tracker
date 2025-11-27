import { MongoClient } from "mongodb";

const client = new MongoClient(process.env.MONGODB_URI);

export async function GET(req) {
  try {
    await client.connect();
    const db = client.db("foodwastetracker");
    const collection = db.collection("waste");
    const data = await collection.find({}).toArray();
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  } finally {
    await client.close();
  }
}
