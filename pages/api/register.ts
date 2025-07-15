import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import User from '../../models/User';
import bcrypt from 'bcryptjs';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }
  const { name, email, password, role } = req.body;
  if (!name || !email || !password || !role) {
    return res.status(400).json({ error: 'All fields are required' });
  }
  try {
    await dbConnect();
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: 'Email already registered' });
    }
    const hashed = await bcrypt.hash(password, 10);
    await User.create({ name, email, password: hashed, role });
    return res.status(201).json({ success: true });
  } catch (e) {
    console.log('REGISTER ERROR:', e);
    return res.status(500).json({ error: 'Server error' });
  }
} 