import { connectDB } from '@/lib/mongodb';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(
  req: NextRequest,
  { params }: { params: { uid: string } }
) {
  try {
    const uid = params.uid;
    console.log('📡 Fetching user with UID:', uid);
    
    const db = await connectDB();
    const usersCollection = db.collection('users');
    
    const user = await usersCollection.findOne({ uid });
    console.log('🔍 User found in DB:', !!user);
    
    if (!user) {
      console.warn('❌ User not found in MongoDB for UID:', uid);
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }
    
    console.log('✅ Returning user data');
    
    return NextResponse.json({
      uid: user.uid,
      email: user.email,
      name: user.name || 'User',
      role: user.role || 'customer',
      createdAt: user.createdAt,
    });
  } catch (error: any) {
    console.error('❌ Get user error:', error.message);
    return NextResponse.json(
      { error: error.message || 'Failed to fetch user' },
      { status: 500 }
    );
  }
}
