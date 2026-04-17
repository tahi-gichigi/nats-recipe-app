"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Search } from "lucide-react";
import { LiveRecipeCard } from "@/components/live-recipe-card";
import type { RecipeCard } from "@/lib/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

async function searchRecipes(
  ingredients: string[],
  page: number,
): Promise<{ recipes: RecipeCard[]; hasMore: boolean }> {
  const res = await fetch(`${SUPABASE_URL}/functions/v1/search-recipes`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
    },
    body: JSON.stringify({ ingredients, page }),
  });
  if (!res.ok) throw new Error(`Search failed: ${res.status}`);
  return res.json();
}

function RecipesContent() {
  const searchParams = useSearchParams();
  const ingredientsParam = searchParams.get("ingredients");
  const terms = ingredientsParam
    ? ingredientsParam.split(",").map((s) => s.trim()).filter(Boolean)
    : [];

  const [recipes, setRecipes] = useState<RecipeCard[]>([]);
  const [hasMore, setHasMore] = useState(false);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!ingredientsParam) return;
    setLoading(true);
    setError(null);
    setPage(1);
    setRecipes([]);
    searchRecipes(terms, 1)
      .then((data) => {
        setRecipes(data.recipes);
        setHasMore(data.hasMore);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsParam]);

  const loadMore = () => {
    const next = page + 1;
    setLoadingMore(true);
    searchRecipes(terms, next)
      .then((data) => {
        setRecipes((prev) => [...prev, ...data.recipes]);
        setHasMore(data.hasMore);
        setPage(next);
      })
      .catch((e) => setError(e.message))
      .finally(() => setLoadingMore(false));
  };

  if (terms.length === 0) {
    return (
      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-12 text-center">
            <h1 className="font-[family-name:var(--font-heading)] text-2xl text-stone-900">
              Search for an ingredient to get started
            </h1>
            <p className="mt-2 text-stone-600">
              Type something you have in the fridge and we&apos;ll find recipes
              for it.
            </p>
            <Link
              href="/"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 h-10 text-sm hover:bg-stone-800"
            >
              Go to search
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-stone-900">
            Recipes with {terms.join(", ")}
          </h1>
          {!loading && !error && recipes.length > 0 && (
            <p className="mt-2 text-stone-600">
              Showing {recipes.length} recipe{recipes.length !== 1 ? "s" : ""}.
            </p>
          )}
          <Link
            href="/"
            className="mt-4 inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900"
          >
            <Search className="h-3.5 w-3.5" />
            New search
          </Link>
        </div>

        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
          </div>
        ) : error ? (
          <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-10 text-center">
            <p className="text-stone-700 mb-4">
              Couldn&apos;t reach the recipe sources. Try again in a moment.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 h-10 text-sm hover:bg-stone-800"
            >
              Back to search
            </Link>
          </div>
        ) : recipes.length === 0 ? (
          <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-10 text-center">
            <p className="text-stone-700 mb-4">
              Nothing found — try a different ingredient.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 h-10 text-sm hover:bg-stone-800"
            >
              Try another search
            </Link>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {recipes.map((r) => (
                <LiveRecipeCard key={r.url} recipe={r} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={loadMore}
                  disabled={loadingMore}
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-6 h-11 text-sm hover:bg-stone-800 disabled:opacity-50"
                >
                  {loadingMore ? (
                    <>
                      <Loader2 className="h-4 w-4 animate-spin" />
                      Loading
                    </>
                  ) : (
                    "Show 10 more"
                  )}
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

export default function RecipesPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-20">
          <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
        </div>
      }
    >
      <RecipesContent />
    </Suspense>
  );
}
