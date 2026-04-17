"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Search } from "lucide-react";
import { LiveRecipeCard } from "@/components/live-recipe-card";
import type { RecipeSummary, SearchResponse } from "@/lib/spoonacular";

const PAGE_SIZE = 10;

function RecipesContent() {
  const searchParams = useSearchParams();
  const ingredientsParam = searchParams.get("ingredients");

  const terms = ingredientsParam
    ? ingredientsParam
        .split(",")
        .map((s) => s.trim().toLowerCase())
        .filter(Boolean)
    : [];

  const [recipes, setRecipes] = useState<RecipeSummary[]>([]);
  const [totalResults, setTotalResults] = useState(0);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPage = async (newOffset: number, append: boolean) => {
    if (append) setLoadingMore(true);
    else setLoading(true);
    setError(null);

    try {
      const res = await fetch(
        `/api/search?ingredients=${encodeURIComponent(terms.join(","))}&offset=${newOffset}&number=${PAGE_SIZE}`
      );
      if (!res.ok) {
        const body = await res.json().catch(() => ({}));
        throw new Error(body.error || `Request failed (${res.status})`);
      }
      const data: SearchResponse = await res.json();
      setRecipes((prev) => (append ? [...prev, ...data.results] : data.results));
      setTotalResults(data.totalResults);
      setOffset(newOffset);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (!ingredientsParam) return;
    fetchPage(0, false);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsParam]);

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

  const hasMore = recipes.length < totalResults;

  return (
    <div className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-stone-900">
            Recipes with {terms.join(", ")}
          </h1>
          {!loading && !error && (
            <p className="mt-2 text-stone-600">
              {totalResults === 0
                ? "Nothing found — try a different ingredient."
                : `Showing ${recipes.length} of ${totalResults} recipes.`}
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
              Couldn&apos;t reach the recipe service. Try again in a moment.
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
              No recipes found for that ingredient.
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
                <LiveRecipeCard key={r.id} recipe={r} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => fetchPage(offset + PAGE_SIZE, true)}
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
