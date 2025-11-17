// client/app/api/waste/route.js
import clientPromise from "@/lib/mongodb";
import { ObjectId } from "mongodb";

async function connectDb() {
  const client = await clientPromise;
  const db = client.db("Foodwastetracker");
  return { db, client };
}

export async function GET(request) {
  try {
    const { db } = await connectDb();
    const data = await db.collection("waste").find({}).sort({ createdAt: -1 }).toArray();
    return Response.json(data);
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { sector, waste } = body;
    if (!sector || typeof waste !== "number") {
      return Response.json({ error: "sector and waste (number) required" }, { status: 400 });
    }
    const { db } = await connectDb();
    const doc = { sector, waste, createdAt: new Date() };
    const result = await db.collection("waste").insertOne(doc);
    return Response.json({ message: "Inserted", id: result.insertedId }, { status: 201 });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request) {
  try {
    const body = await request.json();
    const { id, sector, waste } = body;
    if (!id) return Response.json({ error: "id required" }, { status: 400 });

    const { db } = await connectDb();
    const filter = { _id: new ObjectId(id) };
    const updateDoc = { $set: { sector, waste: Number(waste), updatedAt: new Date() } };
    const result = await db.collection("waste").updateOne(filter, updateDoc);
    if (result.matchedCount === 0) {
      return Response.json({ error: "Not found" }, { status: 404 });
    }
    return Response.json({ message: "Updated" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request) {
  try {
    const url = new URL(request.url);
    const id = url.searchParams.get("id");
    if (!id) return Response.json({ error: "id query param required" }, { status: 400 });

    const { db } = await connectDb();
    const result = await db.collection("waste").deleteOne({ _id: new ObjectId(id) });
    if (result.deletedCount === 0) return Response.json({ error: "Not found" }, { status: 404 });
    return Response.json({ message: "Deleted" });
  } catch (err) {
    return Response.json({ error: err.message }, { status: 500 });
  }
}}
