import Link from "next/link";
import { Search } from "lucide-react";
import { RecipeCard } from "@/components/recipe-card";
import { recipes, searchRecipes } from "@/lib/recipes";

export default async function RecipesPage({
  searchParams,
}: {
  searchParams: Promise<{ ingredients?: string }>;
}) {
  const { ingredients } = await searchParams;
  const terms = ingredients
    ? ingredients
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    : [];

  const results = terms.length ? searchRecipes(terms) : recipes;

  return (
    <div className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          {terms.length > 0 ? (
            <>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl text-stone-900">
                Recipes with{" "}
                <span className="text-stone-900">
                  {terms.join(", ")}
                </span>
              </h1>
              <p className="mt-2 text-stone-600">
                {results.length === 0
                  ? "Nothing in the box matches exactly — try a different ingredient or browse all."
                  : `${results.length} ${results.length === 1 ? "recipe" : "recipes"} matching what you have in.`}
              </p>
              <Link
                href="/"
                className="mt-4 inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900"
              >
                <Search className="h-3.5 w-3.5" />
                New search
              </Link>
            </>
          ) : (
            <>
              <h1 className="font-[family-name:var(--font-heading)] text-3xl text-stone-900">
                The recipe box
              </h1>
              <p className="mt-2 text-stone-600">
                Every recipe, sorted the way they landed in the box.
              </p>
            </>
          )}
        </div>

        {results.length === 0 ? (
          <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-10 text-center">
            <p className="text-stone-700 mb-4">No matches yet.</p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 h-10 text-sm hover:bg-stone-800"
            >
              Try another search
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {results.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
