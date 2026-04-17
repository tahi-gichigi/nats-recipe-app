export type RecipeCard = {
  title: string;
  url: string;
  image?: string;
  sourceName: string;
  totalTime?: string;
  difficulty?: string;
};

export type FullRecipe = {
  title: string;
  image?: string;
  description?: string;
  prepTime?: string;
  cookTime?: string;
  totalTime?: string;
  servings?: string | number | string[];
  ingredients: string[];
  instructions: string[];
  sourceUrl: string;
};

export type SavedRecipe = RecipeCard & { savedAt: number };
