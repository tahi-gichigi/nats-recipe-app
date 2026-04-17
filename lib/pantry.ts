// Staples Nat already has at home — used to decide what goes on the shopping list.
// Matching is case-insensitive and checks whether the pantry item appears anywhere
// in the recipe ingredient name (so "olive oil" matches "extra virgin olive oil").

export const pantry: string[] = [
  // Oils & fats
  "olive oil",
  "vegetable oil",
  "sunflower oil",
  "butter",
  // Seasoning
  "salt",
  "black pepper",
  "sea salt",
  // Dried herbs & spices
  "bay leaf",
  "dried oregano",
  "dried thyme",
  "dried rosemary",
  "paprika",
  "smoked paprika",
  "ground cumin",
  "ground coriander",
  "ground cinnamon",
  "chilli flakes",
  "cayenne pepper",
  "turmeric",
  "curry powder",
  "nutmeg",
  // Aromatics & condiments
  "garlic",
  "onion",
  "plain flour",
  "cornflour",
  "caster sugar",
  "brown sugar",
  "honey",
  "soy sauce",
  "worcestershire sauce",
  "dijon mustard",
  "tomato purée",
  "white wine vinegar",
  "red wine vinegar",
  "balsamic vinegar",
  "stock cube",
  "vegetable stock",
  "chicken stock",
  // Pantry basics
  "rice",
  "pasta",
  "tinned tomatoes",
  "chopped tomatoes",
];

export function isPantryItem(ingredientName: string): boolean {
  const name = ingredientName.toLowerCase();
  return pantry.some((p) => name.includes(p));
}
