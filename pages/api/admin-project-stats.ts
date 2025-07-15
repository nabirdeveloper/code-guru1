import type { NextApiRequest, NextApiResponse } from 'next';
import dbConnect from '@/lib/mongoose';
import Project from '@/models/Project';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  await dbConnect();
  // Get last 12 months
  const now = new Date();
  const months = [];
  for (let i = 11; i >= 0; i--) {
    const d = new Date(now.getFullYear(), now.getMonth() - i, 1);
    months.push({
      label: d.toLocaleString('default', { month: 'short', year: '2-digit' }),
      year: d.getFullYear(),
      month: d.getMonth(),
      count: 0,
    });
  }
  // Get all projects in last 12 months
  const from = new Date(now.getFullYear(), now.getMonth() - 11, 1);
  const projects = await Project.find({ createdAt: { $gte: from } });
  projects.forEach(p => {
    const d = new Date(p.createdAt);
    const idx = months.findIndex(m => m.year === d.getFullYear() && m.month === d.getMonth());
    if (idx !== -1) months[idx].count++;
  });
  res.status(200).json({ stats: months });
} 