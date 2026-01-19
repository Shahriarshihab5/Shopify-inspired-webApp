import { connectDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const { uid } = params;
    
    const db = await connectDB();
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ uid });
    
    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    return NextResponse.json({
      uid: user.uid,
      email: user.email,
      role: user.role,
    });
  } catch (error: any) {
    console.error('Get user error:', error);
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
