import { connectDB } from '@/lib/mongodb';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const db = await connectDB();
    
    // Try to insert a test document
    const testCollection = db.collection('test');
    const result = await testCollection.insertOne({
      message: 'Test connection',
      timestamp: new Date(),
    });
    
    return NextResponse.json({
      success: true,
      message: '✅ MongoDB connected successfully!',
      insertedId: result.insertedId,
    });
  } catch (error: any) {
    return NextResponse.json({
      success: false,
      error: error.message,
      message: '❌ MongoDB connection failed',
    }, { status: 500 });
  }
}
