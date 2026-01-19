import { connectDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function POST(req: NextRequest) {
  try {
    const { uid, email, name, role } = await req.json();
    
    const db = await connectDB();
    const usersCollection = db.collection('users');
    
    // Check if user already exists
    const existingUser = await usersCollection.findOne({ uid });
    if (existingUser) {
      return NextResponse.json(
        { message: 'User already exists', user: existingUser },
        { status: 200 }
      );
    }
    
    // Create new user
    const newUser = {
      uid,
      email,
      name,
      role: role || 'merchant',
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    
    await usersCollection.insertOne(newUser);
    
    return NextResponse.json(
      { 
        message: 'User added to MongoDB successfully',
        user: newUser
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error('Fix user error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
