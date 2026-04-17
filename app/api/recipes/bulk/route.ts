import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const ids = searchParams.get("ids") || "";
  if (!ids.trim()) {
    return NextResponse.json([]);
  }

  const url = `https://api.spoonacular.com/recipes/informationBulk?ids=${encodeURIComponent(
    ids
  )}&includeNutrition=false&apiKey=${apiKey}`;

  const res = await fetch(url);
  if (!res.ok) {
    const text = await res.text();
    return NextResponse.json(
      { error: "Spoonacular error", detail: text },
      { status: res.status }
    );
  }

  const data = await res.json();
  return NextResponse.json(data);
}
