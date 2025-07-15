import { NextApiRequest, NextApiResponse } from 'next';
import bcrypt from 'bcryptjs';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    await dbConnect();
    
    const { email, password } = req.body;

    // Find user by email
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    if (user.blocked) {
      return res.status(403).json({ message: 'Your account is blocked. Please contact support.' });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid email or password' });
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
        const ip = req.headers['x-forwarded-for'] || req.socket.remoteAddress || '';
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

    res.status(200).json({ 
      message: 'Login successful',
      user: userWithoutPassword
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
} 