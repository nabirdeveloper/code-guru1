import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    const users = await User.find({}, 'name email role');
    res.status(200).json({ users });
  } catch (e) {
    res.status(500).json({ users: [] });
  }
} 