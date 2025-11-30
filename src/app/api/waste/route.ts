import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { foodType, quantityKg, reason } = await request.json();

    if (!foodType || !quantityKg) {
      return NextResponse.json(
        { error: 'Food type and quantity are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('foodwaste');
    const collection = db.collection('wasteLogs');

    const result = await collection.insertOne({
      foodType: foodType.trim(),
      quantityKg: parseFloat(quantityKg),
      reason: reason?.trim() || '',
      loggedAt: new Date(),
    });

    return NextResponse.json(
      { message: 'Waste logged successfully!', id: result.insertedId.toString() },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to save waste log' },
      { status: 500 }
    );
  }
}
