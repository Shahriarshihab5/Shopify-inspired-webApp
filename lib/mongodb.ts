import { MongoClient } from 'mongodb';

let client: MongoClient;
let db: any;

export async function connectDB() {
  if (db) return db;

  try {
    client = new MongoClient(process.env.MONGODB_URI as string);
    await client.connect();
    db = client.db('shopify-clone');
    console.log('✅ MongoDB connected successfully');
    return db;
  } catch (error) {
    console.error('❌ MongoDB connection failed:', error);
    throw error;
  }
}

export async function getDB() {
  if (!db) {
    await connectDB();
  }
  return db;
}
