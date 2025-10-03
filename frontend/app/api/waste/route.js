export async function GET() {
  const sampleData = [
    { sector: "Households", wasteKg: 25 },
    { sector: "Restaurants", wasteKg: 40 },
    { sector: "Schools", wasteKg: 15 }
  ];

  return new Response(JSON.stringify(sampleData), {
    headers: { "Content-Type": "application/json" },
  });
}

export async function POST(request) {
  const body = await request.json();

  // In a real app, save to database
  return new Response(
    JSON.stringify({ message: "Waste record saved", data: body }),
    { headers: { "Content-Type": "application/json" } }
  );
}
