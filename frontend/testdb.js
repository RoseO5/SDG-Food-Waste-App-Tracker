// testdb.js
import mongoose from "mongoose";

const uri = process.env.MONGODB_URI;

async function testConnection() {
  try {
    await mongoose.connect(uri);
    console.log("MongoDB connection successful!");
    process.exit(0);
  } catch (error) {
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
}

testConnection();

