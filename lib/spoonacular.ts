export type RecipeSummary = {
  id: number;
  title: string;
  image: string;
  readyInMinutes?: number;
  servings?: number;
  sourceName?: string;
  sourceUrl?: string;
};

export type SearchResponse = {
  results: RecipeSummary[];
  offset: number;
  number: number;
  totalResults: number;
};

export type RecipeIngredient = {
  name: string;
  original: string;
  amount: number;
  unit: string;
};

export type RecipeStep = {
  number: number;
  step: string;
};

export type RecipeDetail = {
  id: number;
  title: string;
  image: string;
  readyInMinutes: number;
  servings: number;
  sourceName?: string;
  sourceUrl?: string;
  summary: string;
  extendedIngredients: RecipeIngredient[];
  analyzedInstructions: { steps: RecipeStep[] }[];
  instructions?: string;
  dishTypes?: string[];
  cuisines?: string[];
};

export function stripHtml(s: string): string {
  return s.replace(/<[^>]+>/g, "").trim();
}

export function extractSteps(detail: RecipeDetail): string[] {
  const grouped = detail.analyzedInstructions?.[0]?.steps;
  if (grouped && grouped.length > 0) {
    return grouped.map((s) => s.step);
  }
  if (detail.instructions) {
    return detail.instructions
      .split(/\r?\n|\.(?=\s[A-Z])/)
      .map((s) => s.replace(/<[^>]+>/g, "").trim())
      .filter((s) => s.length > 10);
  }
  return [];
}
