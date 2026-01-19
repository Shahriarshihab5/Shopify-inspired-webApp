import { MongoClient } from "mongodb";

let client: MongoClient;
let db: any;

export async function connectDB() {
  if (db) return db;

  client = new MongoClient(process.env.MONGODB_URI as string);
  await client.connect();
  db = client.db("shopifyClone"); // ঠিক এই নাম
  return db;
}

export async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}
