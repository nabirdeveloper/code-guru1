import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '../../lib/mongoose';
import AdminLoginLog from '../../models/AdminLoginLog';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  if (req.method === 'GET') {
    try {
      const logs = await AdminLoginLog.find({}).sort({ timestamp: -1 });
      return res.status(200).json({ success: true, data: logs });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Failed to fetch logs' });
    }
  } else if (req.method === 'POST') {
    try {
      const { email, name, ip } = req.body;
      const log = await AdminLoginLog.create({ email, name, ip });
      return res.status(201).json({ success: true, data: log });
    } catch (err) {
      return res.status(500).json({ success: false, error: 'Failed to create log' });
    }
  } else {
    res.setHeader('Allow', ['GET', 'POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }
} 