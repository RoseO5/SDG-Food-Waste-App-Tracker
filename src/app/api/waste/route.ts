import { NextRequest, NextResponse } from 'next/server';
import clientPromise from '@/lib/mongodb';

export async function POST(request: NextRequest) {
  try {
    const { foodType, quantityKg, reason } = await request.json();

    // Validate input
    if (!foodType || !quantityKg) {
      return NextResponse.json(
        { error: 'Food type and quantity are required' },
        { status: 400 }
      );
    }

    const client = await clientPromise;
    const db = client.db('foodwaste'); // your DB name
    const collection = db.collection('wasteLogs'); // your collection

    const result = await collection.insertOne({
      foodType: foodType.trim(),
      quantityKg: parseFloat(quantityKg),
      reason: reason?.trim() || '',
      loggedAt: new Date(),
    });

    return NextResponse.json(
      { 
        message: 'Waste log saved successfully!', 
        id: result.insertedId.toString() 
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('API Error:', error);
    return NextResponse.json(
      { error: 'Failed to save waste log. Please try again.' },
      { status: 500 }
    );
  }
}
