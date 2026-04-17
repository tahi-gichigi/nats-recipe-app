import { isPantryItem } from "./pantry";

export type Ingredient = {
  name: string;
  amount?: string;
  note?: string;
};

export type Recipe = {
  slug: string;
  title: string;
  description: string;
  source: "BBC Food" | "Olive Magazine";
  image: string;
  prepMinutes: number;
  cookMinutes: number;
  servings: number;
  // Main ingredients used for matching against the user's input.
  keyIngredients: string[];
  tags: string[];
  ingredients: Ingredient[];
  method: string[];
};

export const recipes: Recipe[] = [
  {
    slug: "creamy-chicken-and-leek-pie",
    title: "Creamy chicken and leek pie",
    description:
      "A proper Sunday supper — poached chicken and sweet leeks in a tarragon cream sauce under buttery puff pastry.",
    source: "BBC Food",
    image:
      "https://images.unsplash.com/photo-1464500422302-6188776dcbf3?w=1200&auto=format&fit=crop",
    prepMinutes: 20,
    cookMinutes: 45,
    servings: 4,
    keyIngredients: ["chicken", "leek"],
    tags: ["comfort", "family"],
    ingredients: [
      { name: "chicken breasts", amount: "4" },
      { name: "leeks", amount: "3", note: "trimmed and sliced" },
      { name: "puff pastry", amount: "1 sheet", note: "all-butter, chilled" },
      { name: "crème fraîche", amount: "200 ml" },
      { name: "chicken stock", amount: "300 ml" },
      { name: "tarragon", amount: "small bunch", note: "leaves picked" },
      { name: "dijon mustard", amount: "1 tbsp" },
      { name: "plain flour", amount: "2 tbsp" },
      { name: "butter", amount: "30 g" },
      { name: "egg", amount: "1", note: "beaten, to glaze" },
      { name: "salt" },
      { name: "black pepper" },
    ],
    method: [
      "Poach the chicken in the stock for 12 minutes until just cooked. Lift out, shred, and reserve the stock.",
      "Melt the butter in a wide pan, add the leeks and a pinch of salt, and cook gently for 8 minutes until soft.",
      "Stir in the flour, cook for a minute, then whisk in the warm stock until smooth.",
      "Simmer for 5 minutes, then stir through the crème fraîche, mustard, tarragon and shredded chicken. Season.",
      "Tip into a pie dish, lay the pastry over, crimp the edges, brush with egg and cut a steam vent.",
      "Bake at 200°C fan for 25 minutes until deeply golden.",
    ],
  },
  {
    slug: "one-pan-chicken-chorizo",
    title: "One-pan chicken with chorizo and new potatoes",
    description:
      "Smoky, paprika-stained chicken thighs roasted with chorizo, potatoes and red peppers — one tin, zero fuss.",
    source: "Olive Magazine",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&auto=format&fit=crop",
    prepMinutes: 10,
    cookMinutes: 40,
    servings: 4,
    keyIngredients: ["chicken", "chorizo", "potato"],
    tags: ["traybake", "weeknight"],
    ingredients: [
      { name: "chicken thighs", amount: "8", note: "bone-in, skin-on" },
      { name: "cooking chorizo", amount: "200 g", note: "sliced thickly" },
      { name: "new potatoes", amount: "600 g", note: "halved" },
      { name: "red peppers", amount: "2", note: "cut into wedges" },
      { name: "red onion", amount: "1", note: "cut into wedges" },
      { name: "smoked paprika", amount: "1 tsp" },
      { name: "olive oil", amount: "2 tbsp" },
      { name: "garlic", amount: "4 cloves", note: "whole, skin on" },
      { name: "flat-leaf parsley", amount: "small handful", note: "to finish" },
      { name: "salt" },
      { name: "black pepper" },
    ],
    method: [
      "Heat the oven to 200°C fan.",
      "Toss the potatoes, peppers, onion, garlic and olive oil in a large roasting tin with salt and pepper.",
      "Nestle in the chicken thighs and chorizo, rub the skin with smoked paprika and a little more oil.",
      "Roast for 40 minutes, turning the vegetables halfway, until the chicken skin is crisp and the potatoes are golden.",
      "Scatter with parsley and serve straight from the tin.",
    ],
  },
  {
    slug: "sticky-miso-salmon",
    title: "Sticky miso salmon with ginger greens",
    description:
      "Glazed salmon fillets caramelised under the grill, served on quick-wilted pak choi with sesame and soy.",
    source: "Olive Magazine",
    image:
      "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=1200&auto=format&fit=crop",
    prepMinutes: 10,
    cookMinutes: 12,
    servings: 2,
    keyIngredients: ["salmon", "pak choi"],
    tags: ["quick", "healthy"],
    ingredients: [
      { name: "salmon fillets", amount: "2", note: "skin on" },
      { name: "white miso paste", amount: "2 tbsp" },
      { name: "mirin", amount: "1 tbsp" },
      { name: "honey", amount: "1 tbsp" },
      { name: "soy sauce", amount: "1 tbsp" },
      { name: "pak choi", amount: "2 heads", note: "quartered" },
      { name: "fresh ginger", amount: "thumb-sized piece", note: "grated" },
      { name: "garlic", amount: "1 clove", note: "grated" },
      { name: "sesame oil", amount: "1 tsp" },
      { name: "sesame seeds", amount: "1 tsp" },
      { name: "jasmine rice", amount: "150 g", note: "to serve" },
    ],
    method: [
      "Whisk the miso, mirin, honey and half the soy sauce. Sit the salmon on a lined tray, spoon over the glaze.",
      "Grill on high for 8–10 minutes until deeply caramelised and just cooked through.",
      "Meanwhile, heat the sesame oil in a wok, fry the ginger and garlic for 30 seconds, add the pak choi and a splash of water. Cover and wilt for 2 minutes, then splash with the rest of the soy sauce.",
      "Serve the salmon on the greens with steamed rice and a sprinkle of sesame seeds.",
    ],
  },
  {
    slug: "spaghetti-carbonara",
    title: "Spaghetti carbonara",
    description:
      "A proper Roman carbonara — no cream, just silky egg, pecorino and crisp guanciale. Ready in 15 minutes.",
    source: "BBC Food",
    image:
      "https://images.unsplash.com/photo-1588013273468-315fd88ea34c?w=1200&auto=format&fit=crop",
    prepMinutes: 5,
    cookMinutes: 15,
    servings: 2,
    keyIngredients: ["pasta", "egg", "pancetta"],
    tags: ["quick", "italian"],
    ingredients: [
      { name: "spaghetti", amount: "200 g" },
      { name: "guanciale", amount: "120 g", note: "or pancetta, diced" },
      { name: "egg yolks", amount: "3" },
      { name: "whole egg", amount: "1" },
      { name: "pecorino romano", amount: "60 g", note: "finely grated" },
      { name: "black pepper", note: "plenty, freshly cracked" },
      { name: "salt" },
    ],
    method: [
      "Cook the spaghetti in well-salted boiling water until al dente.",
      "Fry the guanciale in a cold pan until its fat has rendered and it is crisp at the edges. Take off the heat.",
      "Whisk the yolks, whole egg, pecorino and a big twist of black pepper in a bowl.",
      "Drain the pasta, keeping a cup of the water. Add the pasta to the guanciale pan off the heat, pour in the egg mix and toss hard, loosening with splashes of pasta water until glossy.",
      "Serve straight away with more pecorino and pepper.",
    ],
  },
  {
    slug: "thai-green-curry-prawns",
    title: "Thai green curry with prawns",
    description:
      "Fragrant, quick and lightly creamy — king prawns simmered with green beans and Thai basil in coconut milk.",
    source: "Olive Magazine",
    image:
      "https://images.unsplash.com/photo-1455619452474-d2be8b1e70cd?w=1200&auto=format&fit=crop",
    prepMinutes: 10,
    cookMinutes: 15,
    servings: 2,
    keyIngredients: ["prawns", "coconut milk"],
    tags: ["quick", "thai"],
    ingredients: [
      { name: "raw king prawns", amount: "250 g", note: "peeled" },
      { name: "green Thai curry paste", amount: "3 tbsp" },
      { name: "coconut milk", amount: "400 ml tin" },
      { name: "fine green beans", amount: "150 g", note: "trimmed" },
      { name: "baby aubergines", amount: "4", note: "quartered (optional)" },
      { name: "fish sauce", amount: "1 tbsp" },
      { name: "lime", amount: "1", note: "juiced" },
      { name: "Thai basil", amount: "small handful" },
      { name: "jasmine rice", amount: "150 g", note: "to serve" },
      { name: "vegetable oil", amount: "1 tbsp" },
    ],
    method: [
      "Heat the oil in a wide pan and fry the curry paste for 1–2 minutes until fragrant.",
      "Pour in the coconut milk, bring to a simmer, then add the green beans and aubergines. Cook for 5 minutes.",
      "Slip in the prawns and cook for 3–4 minutes until pink and cooked through.",
      "Finish with fish sauce and lime juice to taste, scatter with Thai basil and serve with jasmine rice.",
    ],
  },
  {
    slug: "mushroom-risotto",
    title: "Wild mushroom risotto",
    description:
      "A quietly luxurious risotto with chestnut and dried porcini, finished with parmesan and parsley.",
    source: "BBC Food",
    image:
      "https://images.unsplash.com/photo-1476124369491-e7addf5db371?w=1200&auto=format&fit=crop",
    prepMinutes: 10,
    cookMinutes: 30,
    servings: 4,
    keyIngredients: ["mushroom", "risotto rice"],
    tags: ["vegetarian", "italian"],
    ingredients: [
      { name: "arborio risotto rice", amount: "300 g" },
      { name: "chestnut mushrooms", amount: "300 g", note: "sliced" },
      { name: "dried porcini", amount: "20 g" },
      { name: "shallots", amount: "2", note: "finely chopped" },
      { name: "garlic", amount: "2 cloves", note: "minced" },
      { name: "dry white wine", amount: "150 ml" },
      { name: "vegetable stock", amount: "1 litre", note: "hot" },
      { name: "butter", amount: "50 g" },
      { name: "olive oil", amount: "1 tbsp" },
      { name: "parmesan", amount: "50 g", note: "finely grated" },
      { name: "flat-leaf parsley", amount: "small handful", note: "chopped" },
    ],
    method: [
      "Soak the porcini in 200 ml of just-boiled water for 10 minutes, then lift out, chop and keep the liquid.",
      "Melt half the butter with the olive oil, soften the shallots for 5 minutes, then add the chestnut mushrooms and colour.",
      "Add the garlic, rice and a pinch of salt. Stir for a minute, then pour in the wine and let it bubble away.",
      "Add the strained porcini liquid and porcini, then add the hot stock a ladle at a time, stirring, until the rice is just al dente (about 18 minutes).",
      "Beat in the remaining butter and the parmesan off the heat, rest for a minute, then stir through the parsley and serve.",
    ],
  },
  {
    slug: "slow-roast-lamb-shoulder",
    title: "Slow-roast lamb shoulder with rosemary and anchovy",
    description:
      "A fall-apart shoulder of lamb, studded with garlic and anchovy and roasted long and low until meltingly tender.",
    source: "BBC Food",
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?w=1200&auto=format&fit=crop",
    prepMinutes: 15,
    cookMinutes: 240,
    servings: 6,
    keyIngredients: ["lamb"],
    tags: ["sunday roast", "entertaining"],
    ingredients: [
      { name: "shoulder of lamb", amount: "2 kg", note: "bone-in" },
      { name: "anchovy fillets", amount: "6" },
      { name: "garlic", amount: "1 whole bulb", note: "cloves halved" },
      { name: "rosemary", amount: "4 sprigs" },
      { name: "olive oil", amount: "2 tbsp" },
      { name: "dry white wine", amount: "200 ml" },
      { name: "lemon", amount: "1", note: "zest only" },
      { name: "salt" },
      { name: "black pepper" },
    ],
    method: [
      "Heat the oven to 160°C fan.",
      "Pierce the lamb all over with the tip of a knife and push a sliver of garlic, a piece of anchovy and a few rosemary needles into each hole.",
      "Rub with olive oil, lemon zest, sea salt and plenty of pepper. Sit in a roasting tin with the wine and 100 ml of water.",
      "Cover tightly with foil and roast for 3½ hours. Remove the foil and roast for a final 30 minutes to colour.",
      "Rest for 20 minutes, then shred with two forks and serve with the pan juices.",
    ],
  },
  {
    slug: "tomato-butter-bean-stew",
    title: "Smoky tomato and butter bean stew",
    description:
      "A vegan one-pot that tastes like it cooked for hours — butter beans braised with tomato, smoked paprika and kale.",
    source: "Olive Magazine",
    image:
      "https://images.unsplash.com/photo-1547592180-85f173990554?w=1200&auto=format&fit=crop",
    prepMinutes: 10,
    cookMinutes: 30,
    servings: 4,
    keyIngredients: ["butter beans", "tomato"],
    tags: ["vegan", "batch-friendly"],
    ingredients: [
      { name: "butter beans", amount: "2 x 400 g tins", note: "drained" },
      { name: "chopped tomatoes", amount: "400 g tin" },
      { name: "onion", amount: "1", note: "finely chopped" },
      { name: "garlic", amount: "3 cloves", note: "sliced" },
      { name: "smoked paprika", amount: "1 tsp" },
      { name: "tomato purée", amount: "1 tbsp" },
      { name: "vegetable stock", amount: "300 ml" },
      { name: "cavolo nero", amount: "150 g", note: "stems removed, shredded" },
      { name: "olive oil", amount: "2 tbsp" },
      { name: "sourdough", amount: "to serve" },
    ],
    method: [
      "Soften the onion in the olive oil for 8 minutes, add the garlic and smoked paprika and cook for 1 minute more.",
      "Stir in the tomato purée, tip in the tomatoes and stock, and simmer for 10 minutes.",
      "Add the butter beans and cavolo nero, and simmer gently for another 10–12 minutes until the greens are tender and the stew is glossy.",
      "Season well and serve with toasted sourdough.",
    ],
  },
  {
    slug: "roast-chicken-lemon-thyme",
    title: "Roast chicken with lemon and thyme",
    description:
      "The blueprint roast chicken — crisp-skinned, juicy, with thyme butter pushed under the skin and lemon in the cavity.",
    source: "BBC Food",
    image:
      "https://images.unsplash.com/photo-1598103442097-8b74394b95c6?w=1200&auto=format&fit=crop",
    prepMinutes: 15,
    cookMinutes: 80,
    servings: 4,
    keyIngredients: ["chicken"],
    tags: ["sunday roast", "classic"],
    ingredients: [
      { name: "whole chicken", amount: "1.8 kg" },
      { name: "butter", amount: "75 g", note: "soft" },
      { name: "thyme", amount: "small bunch", note: "leaves picked" },
      { name: "lemon", amount: "1", note: "halved" },
      { name: "garlic", amount: "1 bulb", note: "halved across" },
      { name: "olive oil", amount: "1 tbsp" },
      { name: "salt" },
      { name: "black pepper" },
    ],
    method: [
      "Heat the oven to 200°C fan.",
      "Mash the butter with the thyme, a good pinch of salt and plenty of pepper. Loosen the skin over the breast and push the butter under.",
      "Sit the chicken in a tin, push the lemon and garlic into the cavity, rub the skin with olive oil and more salt.",
      "Roast for 1 hour 20 minutes, basting twice, until the juices run clear.",
      "Rest for 15 minutes under loose foil before carving.",
    ],
  },
  {
    slug: "beef-ragu-pappardelle",
    title: "Slow-cooked beef ragù with pappardelle",
    description:
      "Shin of beef braised with tomato, red wine and bay until the ragù is dark, unctuous and clinging to ribbons of pasta.",
    source: "Olive Magazine",
    image:
      "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=1200&auto=format&fit=crop",
    prepMinutes: 15,
    cookMinutes: 180,
    servings: 4,
    keyIngredients: ["beef", "pasta"],
    tags: ["slow-cook", "italian"],
    ingredients: [
      { name: "beef shin", amount: "800 g", note: "diced" },
      { name: "onion", amount: "1", note: "finely chopped" },
      { name: "carrot", amount: "1", note: "finely chopped" },
      { name: "celery", amount: "2 sticks", note: "finely chopped" },
      { name: "garlic", amount: "3 cloves", note: "crushed" },
      { name: "chopped tomatoes", amount: "400 g tin" },
      { name: "red wine", amount: "250 ml" },
      { name: "beef stock", amount: "400 ml" },
      { name: "bay leaf", amount: "2" },
      { name: "tomato purée", amount: "2 tbsp" },
      { name: "pappardelle", amount: "400 g" },
      { name: "parmesan", amount: "to serve" },
      { name: "olive oil", amount: "2 tbsp" },
    ],
    method: [
      "Brown the beef in the oil in batches in a heavy casserole. Set aside.",
      "Soften the onion, carrot and celery for 10 minutes, then add the garlic and tomato purée and cook for 2 minutes.",
      "Pour in the wine and let it bubble down by half. Return the beef, add the tomatoes, stock and bay.",
      "Cover and simmer gently for 2½–3 hours, stirring every so often, until the beef is falling apart. Shred with a spoon and season.",
      "Cook the pappardelle, drain, toss with the ragù and a splash of pasta water. Serve with parmesan.",
    ],
  },
  {
    slug: "butternut-squash-sage-gnocchi",
    title: "Butternut squash and sage brown-butter gnocchi",
    description:
      "Sweet roasted squash tossed with potato gnocchi, crispy sage leaves and nutty brown butter.",
    source: "BBC Food",
    image:
      "https://images.unsplash.com/photo-1516100882582-96c3a05fe590?w=1200&auto=format&fit=crop",
    prepMinutes: 10,
    cookMinutes: 30,
    servings: 2,
    keyIngredients: ["butternut squash", "gnocchi"],
    tags: ["vegetarian", "autumn"],
    ingredients: [
      { name: "butternut squash", amount: "½", note: "peeled and diced" },
      { name: "potato gnocchi", amount: "400 g" },
      { name: "butter", amount: "60 g" },
      { name: "sage leaves", amount: "12" },
      { name: "garlic", amount: "1 clove", note: "sliced" },
      { name: "parmesan", amount: "30 g", note: "grated" },
      { name: "olive oil", amount: "1 tbsp" },
      { name: "salt" },
      { name: "black pepper" },
    ],
    method: [
      "Heat the oven to 200°C fan. Toss the squash with olive oil, salt and pepper and roast for 25 minutes until tender and catching.",
      "Cook the gnocchi in salted boiling water until they bob to the surface, about 2 minutes. Lift out with a slotted spoon.",
      "Melt the butter in a wide pan until it smells nutty and is golden, add the sage and garlic and let the sage crisp, about 1 minute.",
      "Tip in the squash and gnocchi, toss to coat, then scatter with parmesan and a final crack of pepper.",
    ],
  },
  {
    slug: "fish-pie-leek-cheddar",
    title: "Fish pie with leek and cheddar mash",
    description:
      "Salmon, smoked haddock and prawns in a dill-scented sauce, topped with leeky cheddar mash and baked until bubbling.",
    source: "Olive Magazine",
    image:
      "https://images.unsplash.com/photo-1599974579688-8dbdd335c77f?w=1200&auto=format&fit=crop",
    prepMinutes: 25,
    cookMinutes: 40,
    servings: 4,
    keyIngredients: ["salmon", "haddock", "leek", "potato"],
    tags: ["comfort", "family"],
    ingredients: [
      { name: "salmon fillet", amount: "300 g", note: "skinless, diced" },
      { name: "smoked haddock", amount: "300 g", note: "skinless, diced" },
      { name: "raw prawns", amount: "150 g" },
      { name: "leeks", amount: "2", note: "finely sliced" },
      { name: "whole milk", amount: "500 ml" },
      { name: "plain flour", amount: "40 g" },
      { name: "butter", amount: "80 g" },
      { name: "dill", amount: "small bunch", note: "chopped" },
      { name: "dijon mustard", amount: "1 tsp" },
      { name: "floury potatoes", amount: "1 kg", note: "peeled and cubed" },
      { name: "mature cheddar", amount: "80 g", note: "grated" },
      { name: "salt" },
      { name: "black pepper" },
    ],
    method: [
      "Boil the potatoes until tender, drain and mash with 40 g butter and a good splash of the milk. Season well.",
      "Melt the rest of the butter and gently soften the leeks for 6 minutes. Stir in the flour and cook for a minute, then whisk in the milk a little at a time until you have a smooth sauce.",
      "Simmer for 2 minutes, stir in the mustard and dill, then fold through the raw fish and prawns. Season.",
      "Tip into a baking dish, spread the mash over and fork up the top. Scatter with cheddar.",
      "Bake at 190°C fan for 25–30 minutes until golden and bubbling at the edges.",
    ],
  },
];

export function getRecipeBySlug(slug: string): Recipe | undefined {
  return recipes.find((r) => r.slug === slug);
}

// Returns a score for how well a recipe matches a list of user-supplied ingredients.
// Higher score = better match. 0 means no key ingredient matched.
export function scoreRecipe(recipe: Recipe, terms: string[]): number {
  if (terms.length === 0) return 1;
  let score = 0;
  for (const term of terms) {
    const t = term.trim().toLowerCase();
    if (!t) continue;
    if (recipe.keyIngredients.some((k) => k.toLowerCase().includes(t) || t.includes(k.toLowerCase()))) {
      score += 3;
    } else if (recipe.ingredients.some((i) => i.name.toLowerCase().includes(t))) {
      score += 1;
    } else if (recipe.title.toLowerCase().includes(t)) {
      score += 2;
    }
  }
  return score;
}

export function searchRecipes(terms: string[]): Recipe[] {
  if (terms.length === 0) return recipes;
  return recipes
    .map((r) => ({ r, s: scoreRecipe(r, terms) }))
    .filter((x) => x.s > 0)
    .sort((a, b) => b.s - a.s)
    .map((x) => x.r);
}

export function splitIngredients(recipe: Recipe): {
  shopping: Ingredient[];
  fromPantry: Ingredient[];
} {
  const shopping: Ingredient[] = [];
  const fromPantry: Ingredient[] = [];
  for (const ing of recipe.ingredients) {
    if (isPantryItem(ing.name)) fromPantry.push(ing);
    else shopping.push(ing);
  }
  return { shopping, fromPantry };
}

export function totalMinutes(r: Recipe): number {
  return r.prepMinutes + r.cookMinutes;
}

export function formatMinutes(mins: number): string {
  if (mins < 60) return `${mins} min`;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  return m === 0 ? `${h} hr` : `${h} hr ${m} min`;
}
