"use client";
import { useState } from "react";

const RECIPES = [
  {
    id: 1,
    title: "Chicken and Leek Pie",
    source: "BBC Food",
    time: "1 hr 20 min",
    image: "https://images.unsplash.com/photo-1598103442097-8b74394b95c3?w=600&auto=format&fit=crop",
    ingredients: ["chicken thighs", "leeks", "double cream", "puff pastry", "thyme"],
    description: "A comforting classic with tender chicken and sweet leeks in a creamy sauce, topped with golden puff pastry.",
  },
  {
    id: 2,
    title: "Roasted Tomato Pasta",
    source: "Olive Magazine",
    time: "45 min",
    image: "https://images.unsplash.com/photo-1621996346565-e3dbc646d9a9?w=600&auto=format&fit=crop",
    ingredients: ["cherry tomatoes", "garlic", "basil", "spaghetti", "olive oil", "parmesan"],
    description: "Slow-roasted tomatoes with garlic and basil tossed through al dente spaghetti. Simple and brilliant.",
  },
  {
    id: 3,
    title: "Spiced Lentil Soup",
    source: "BBC Food",
    time: "35 min",
    image: "https://images.unsplash.com/photo-1547592180-85f173990554?w=600&auto=format&fit=crop",
    ingredients: ["red lentils", "onion", "cumin", "turmeric", "tinned tomatoes", "spinach"],
    description: "A warming, deeply spiced soup that comes together quickly and keeps well in the fridge all week.",
  },
  {
    id: 4,
    title: "Salmon with Ginger and Pak Choi",
    source: "Olive Magazine",
    time: "25 min",
    image: "https://images.unsplash.com/photo-1467003909585-2f8a72700288?w=600&auto=format&fit=crop",
    ingredients: ["salmon fillets", "pak choi", "fresh ginger", "soy sauce", "sesame oil", "rice"],
    description: "Quick, light, and full of flavour. The ginger and soy glaze caramelises beautifully in the pan.",
  },
];

export default function Home() {
  const [ingredients, setIngredients] = useState("");
  const [results, setResults] = useState(RECIPES);
  const [selected, setSelected] = useState<typeof RECIPES[0] | null>(null);

  function search() {
    if (!ingredients.trim()) {
      setResults(RECIPES);
      return;
    }
    const terms = ingredients.toLowerCase().split(/[\s,]+/);
    setResults(
      RECIPES.filter((r) =>
        terms.some((t) => r.ingredients.some((i) => i.includes(t)) || r.title.toLowerCase().includes(t))
      )
    );
  }

  if (selected) {
    return (
      <div className="min-h-screen bg-stone-50">
        <div className="max-w-2xl mx-auto px-4 py-8">
          <button onClick={() => setSelected(null)} className="text-sm text-stone-500 hover:text-stone-800 mb-6">
            ← Back to recipes
          </button>
          <img src={selected.image} alt={selected.title} className="w-full h-64 object-cover rounded-xl mb-6" />
          <div className="text-xs text-stone-400 mb-2">{selected.source} · {selected.time}</div>
          <h1 className="text-2xl font-semibold text-stone-800 mb-3">{selected.title}</h1>
          <p className="text-stone-600 mb-6">{selected.description}</p>
          <h2 className="text-sm font-medium text-stone-500 uppercase tracking-wide mb-3">Ingredients</h2>
          <ul className="space-y-1">
            {selected.ingredients.map((ing) => (
              <li key={ing} className="flex items-center gap-2 text-stone-700">
                <span className="w-1.5 h-1.5 rounded-full bg-stone-400 flex-shrink-0" />
                {ing}
              </li>
            ))}
          </ul>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-stone-50">
      <div className="max-w-2xl mx-auto px-4 py-12">
        <h1 className="text-3xl font-semibold text-stone-800 mb-1">What's for dinner?</h1>
        <p className="text-stone-400 mb-8">Enter what you have and find something to cook.</p>
        <div className="flex gap-2 mb-10">
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && search()}
            placeholder="e.g. chicken, leeks, cream..."
            className="flex-1 px-4 py-2.5 rounded-lg border border-stone-200 bg-white text-stone-800 placeholder:text-stone-300 focus:outline-none focus:ring-2 focus:ring-stone-300"
          />
          <button
            onClick={search}
            className="px-5 py-2.5 bg-stone-800 text-white rounded-lg text-sm font-medium hover:bg-stone-700 transition-colors"
          >
            Find recipes
          </button>
        </div>
        {results.length === 0 ? (
          <p className="text-stone-400">No recipes match those ingredients.</p>
        ) : (
          <div className="grid gap-4">
            {results.map((recipe) => (
              <button
                key={recipe.id}
                onClick={() => setSelected(recipe)}
                className="flex gap-4 bg-white rounded-xl p-3 border border-stone-100 hover:border-stone-300 transition-colors text-left"
              >
                <img src={recipe.image} alt={recipe.title} className="w-24 h-24 object-cover rounded-lg flex-shrink-0" />
                <div className="flex flex-col justify-center">
                  <div className="text-xs text-stone-400 mb-1">{recipe.source} · {recipe.time}</div>
                  <div className="font-medium text-stone-800 mb-1">{recipe.title}</div>
                  <div className="text-sm text-stone-500 line-clamp-2">{recipe.description}</div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
