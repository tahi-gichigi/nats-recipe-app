"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { Loader2, Search } from "lucide-react";
import { RecipeCard } from "@/components/recipe-card";
import { LiveRecipeCard } from "@/components/live-recipe-card";
import { recipes } from "@/lib/recipes";
import { searchMealsByIngredient, type MealSummary } from "@/lib/mealdb";

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

  const [allMeals, setAllMeals] = useState<MealSummary[]>([]);
  const [visible, setVisible] = useState(PAGE_SIZE);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    if (!ingredientsParam) return;
    setLoading(true);
    setError(false);
    setVisible(PAGE_SIZE);
    setAllMeals([]);

    searchMealsByIngredient(terms[0])
      .then((meals) => setAllMeals(meals))
      .catch(() => setError(true))
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ingredientsParam]);

  if (terms.length === 0) {
    return (
      <div className="px-6 py-12">
        <div className="max-w-5xl mx-auto">
          <div className="mb-8">
            <h1 className="font-[family-name:var(--font-heading)] text-3xl text-stone-900">
              The recipe box
            </h1>
            <p className="mt-2 text-stone-600">
              Every recipe, sorted the way they landed in the box.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {recipes.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </div>
      </div>
    );
  }

  const displayedMeals = allMeals.slice(0, visible);
  const hasMore = visible < allMeals.length;

  return (
    <div className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-stone-900">
            Recipes with {terms.join(", ")}
          </h1>
          {!loading && !error && (
            <p className="mt-2 text-stone-600">
              {allMeals.length === 0
                ? "Nothing found — try a different ingredient."
                : `Showing ${Math.min(visible, allMeals.length)} of ${allMeals.length} recipes.`}
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
              Couldn&apos;t reach the recipe database. Try again in a moment.
            </p>
            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 h-10 text-sm hover:bg-stone-800"
            >
              Back to search
            </Link>
          </div>
        ) : allMeals.length === 0 ? (
          <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-10 text-center">
            <p className="text-stone-700 mb-4">No recipes found for that ingredient.</p>
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
              {displayedMeals.map((meal) => (
                <LiveRecipeCard key={meal.idMeal} meal={meal} />
              ))}
            </div>
            {hasMore && (
              <div className="mt-10 text-center">
                <button
                  onClick={() => setVisible((v) => v + PAGE_SIZE)}
                  className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-6 h-11 text-sm hover:bg-stone-800"
                >
                  Show 10 more
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
