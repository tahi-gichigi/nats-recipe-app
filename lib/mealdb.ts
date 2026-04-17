export type MealSummary = {
  idMeal: string;
  strMeal: string;
  strMealThumb: string;
};

export type MealDetail = {
  idMeal: string;
  strMeal: string;
  strCategory: string;
  strArea: string;
  strInstructions: string;
  strMealThumb: string;
  strSource: string | null;
  strTags: string | null;
  strYoutube: string | null;
  [key: string]: string | null;
};

export type MealIngredient = {
  name: string;
  amount: string;
};

export async function searchMealsByIngredient(ingredient: string): Promise<MealSummary[]> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/filter.php?i=${encodeURIComponent(ingredient)}`
    );
    if (!res.ok) return [];
    const data = await res.json();
    return data.meals || [];
  } catch {
    return [];
  }
}

export async function getMealById(id: string): Promise<MealDetail | null> {
  try {
    const res = await fetch(
      `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`
    );
    if (!res.ok) return null;
    const data = await res.json();
    return data.meals?.[0] || null;
  } catch {
    return null;
  }
}

export function extractIngredients(meal: MealDetail): MealIngredient[] {
  const ingredients: MealIngredient[] = [];
  for (let i = 1; i <= 20; i++) {
    const name = meal[`strIngredient${i}`];
    const amount = meal[`strMeasure${i}`];
    if (name && name.trim()) {
      ingredients.push({
        name: name.trim(),
        amount: (amount || "").trim(),
      });
    }
  }
  return ingredients;
}

export function parseInstructions(instructions: string): string[] {
  return instructions
    .split(/\r?\n/)
    .map((s) =>
      s
        .replace(/^\s*\d+[\.\)]\s*/, "")
        .replace(/^\s*step\s*\d+\s*:?\s*/i, "")
        .trim()
    )
    .filter((s) => s.length > 15);
}
