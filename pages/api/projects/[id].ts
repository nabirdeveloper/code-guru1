import type { NextApiRequest, NextApiResponse } from 'next';
import { ObjectId } from 'mongodb';
import clientPromise from '../../../lib/mongodb';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const {
    query: { id },
    method,
    body,
  } = req;
  const client = await clientPromise;
  const db = client.db();
  const collection = db.collection('projects');

  if (method === 'PUT') {
    const { title, description, imageUrl, link } = body;
    if (!title || !description || !imageUrl || !link) {
      return res.status(400).json({ error: 'All fields are required.' });
    }
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id as string) },
      { $set: { title, description, imageUrl, link } },
      { returnDocument: 'after' }
    );
    return res.status(200).json(result.value);
  }

  if (method === 'DELETE') {
    await collection.deleteOne({ _id: new ObjectId(id as string) });
    return res.status(204).end();
  }

  res.setHeader('Allow', ['PUT', 'DELETE']);
  res.status(405).end(`Method ${method} Not Allowed`);
} 