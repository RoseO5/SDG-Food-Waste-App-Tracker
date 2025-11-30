import { NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function GET() {
  try {
    const client = await clientPromise;
    const db = client.db('foodwaste');
    const collections = await db.listCollections().toArray();
    return NextResponse.json({ success: true, collections: collections.map(c => c.name) });
  } catch (err) {
    return NextResponse.json({ success: false, error: (err as Error).message }, { status: 500 });
  }
}
