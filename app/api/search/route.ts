import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const apiKey = process.env.SPOONACULAR_API_KEY;
  if (!apiKey) {
    return NextResponse.json({ error: "Missing API key" }, { status: 500 });
  }

  const { searchParams } = new URL(req.url);
  const ingredients = searchParams.get("ingredients") || "";
  const offset = searchParams.get("offset") || "0";
  const number = searchParams.get("number") || "10";

  if (!ingredients.trim()) {
    return NextResponse.json({ error: "ingredients required" }, { status: 400 });
  }

  const url = new URL("https://api.spoonacular.com/recipes/complexSearch");
  url.searchParams.set("includeIngredients", ingredients);
  url.searchParams.set("number", number);
  url.searchParams.set("offset", offset);
  url.searchParams.set("sort", "popularity");
  url.searchParams.set("addRecipeInformation", "true");
  url.searchParams.set("instructionsRequired", "true");
  url.searchParams.set("apiKey", apiKey);

  const res = await fetch(url.toString());
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
