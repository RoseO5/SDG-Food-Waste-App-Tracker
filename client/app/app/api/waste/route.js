export async function GET() {
  return Response.json({
    message: "Food waste list",
    data: [],
  });
}

export async function POST(req) {
  const body = await req.json();

  return Response.json({
    message: "New waste entry added",
    entry: body,
  });
}
