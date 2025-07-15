import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import ActivityLog from '@/models/ActivityLog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === 'GET') {
    const logs = await ActivityLog.find().sort({ timestamp: -1 }).limit(50);
    res.status(200).json({ logs });
  } else if (req.method === 'POST') {
    const { action, user, target } = req.body;
    if (!action || !user) return res.status(400).json({ error: 'Missing fields' });
    const log = await ActivityLog.create({ action, user, target });
    res.status(201).json({ log });
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 