import type { NextApiRequest, NextApiResponse } from 'next';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('projects');

  if (req.method === 'GET') {
    const projects = await collection.find({}).toArray();
    return res.status(200).json(projects);
  }

  if (req.method === 'POST') {
    const { title, description, imageUrl, link } = req.body;
    if (!title || !description || !imageUrl || !link) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const result = await collection.insertOne({ title, description, imageUrl, link });
    return res.status(201).json(result.ops?.[0] || { _id: result.insertedId, title, description, imageUrl, link });
  }

  res.setHeader('Allow', ['GET', 'POST']);
  res.status(405).end(`Method ${req.method} Not Allowed`);
} 