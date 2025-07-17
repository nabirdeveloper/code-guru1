import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export async function POST(request: NextRequest) {
  try {
    await dbConnect();
    
    const { email, password } = await request.json();

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    if (user.blocked) {
      return NextResponse.json({ message: 'Your account is blocked. Please contact support.' }, { status: 403 });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return NextResponse.json({ message: 'Invalid email or password' }, { status: 401 });
    }

    // Don't send password in response
    const userWithoutPassword = {
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
    };

    // Log admin login
    if (user.role === 'admin') {
      try {
        const ip = request.headers.get('x-forwarded-for') || request.ip || '';
        // Directly use the model to avoid fetch overhead
        const AdminLoginLog = (await import('@/models/AdminLoginLog')).default;
        await AdminLoginLog.create({
          email: user.email,
          name: user.name,
          ip: Array.isArray(ip) ? ip[0] : ip,
        });
      } catch (e) {
        console.error('Failed to log admin login:', e);
      }
    }

    return NextResponse.json({ 
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
  }
}