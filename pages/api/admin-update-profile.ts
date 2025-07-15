import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ message: 'Method not allowed' });
  }
  try {
    await dbConnect();
    const { email, newName, newEmail } = req.body;
    if (!email || !newName || !newEmail) {
      return res.status(400).json({ message: 'Missing required fields' });
    }
    const user = await User.findOne({ email });
    if (!user || user.role !== 'admin') {
      return res.status(403).json({ message: 'Not authorized' });
    }
    if (newEmail !== email) {
      const existing = await User.findOne({ email: newEmail });
      if (existing) {
        return res.status(400).json({ message: 'Email already in use' });
      }
    }
    user.name = newName;
    user.email = newEmail;
    await user.save();
    return res.status(200).json({ message: 'Profile updated successfully', user: { name: user.name, email: user.email } });
  } catch (error) {
    console.error('Update profile error:', error);
    return res.status(500).json({ message: 'Internal server error' });
  }
} 