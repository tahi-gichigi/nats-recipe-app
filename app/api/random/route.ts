import { NextResponse } from "next/server";

export async function GET() {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const url = `https://api.spoonacular.com/recipes/random?number=1&apiKey=${apiKey}`;
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
