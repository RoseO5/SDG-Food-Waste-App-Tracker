import { supabase } from "@/lib/supabaseClient";

export async function GET() {
  const { data, error } = await supabase.from("waste").select("*");

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json(data);
}

export async function POST(request) {
  const body = await request.json();
  const { sector, waste } = body;

  const { data, error } = await supabase.from("waste").insert([{ sector, waste }]);

  if (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }

  return Response.json({ message: "Record added successfully", data });
}
