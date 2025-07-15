import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    await dbConnect();
    const userCount = await User.countDocuments();
    res.status(200).json({ userCount });
  } catch (e) {
    res.status(500).json({ userCount: 0 });
  }
} 