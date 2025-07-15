import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import User from '@/models/User';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'DELETE') {
    try {
      await dbConnect();
      const user = await User.findById(req.query.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      if (user.role === 'admin') return res.status(403).json({ error: 'Cannot delete admin user' });
      await User.deleteOne({ _id: req.query.id });
      res.status(204).end();
    } catch (e) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PUT') {
    try {
      await dbConnect();
      const { role } = req.body;
      if (!['user', 'admin'].includes(role)) return res.status(400).json({ error: 'Invalid role' });
      const user = await User.findById(req.query.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.role = role;
      await user.save();
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Server error' });
    }
  } else if (req.method === 'PATCH') {
    try {
      await dbConnect();
      const { blocked } = req.body;
      const user = await User.findById(req.query.id);
      if (!user) return res.status(404).json({ error: 'User not found' });
      user.blocked = !!blocked;
      await user.save();
      res.status(200).json({ success: true });
    } catch (e) {
      res.status(500).json({ error: 'Server error' });
    }
  } else {
    res.status(405).json({ error: 'Method not allowed' });
  }
} 