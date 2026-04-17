"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { Bookmark, Loader2 } from "lucide-react";
import { LiveRecipeCard } from "@/components/live-recipe-card";
import { useSavedRecipes } from "@/lib/saved";
import { getMealById, type MealSummary } from "@/lib/mealdb";

export default function SavedPage() {
  const { saved, hydrated } = useSavedRecipes();
  const [meals, setMeals] = useState<MealSummary[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (!hydrated) return;
    if (saved.length === 0) {
      setMeals([]);
      return;
    }
    setLoading(true);
    Promise.all(
      saved.map(async (id) => {
        const meal = await getMealById(id);
        if (!meal) return null;
        return {
          idMeal: meal.idMeal,
          strMeal: meal.strMeal,
          strMealThumb: meal.strMealThumb,
        } as MealSummary;
      })
    )
      .then((results) =>
        setMeals(results.filter((m): m is MealSummary => m !== null))
      )
      .finally(() => setLoading(false));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [saved.join(","), hydrated]);

  return (
    <div className="px-6 py-12">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="font-[family-name:var(--font-heading)] text-3xl text-stone-900">
            Saved recipes
          </h1>
          <p className="mt-2 text-stone-600">
            Your keep-forever list. Tap the bookmark on any recipe to add it
            here.
          </p>
        </div>

        {!hydrated || loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
          </div>
        ) : meals.length === 0 ? (
          <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-12 text-center">
            <div className="mx-auto h-12 w-12 rounded-full bg-stone-100 flex items-center justify-center">
              <Bookmark className="h-5 w-5 text-stone-500" />
            </div>
            <h2 className="mt-4 font-[family-name:var(--font-heading)] text-xl text-stone-900">
              Nothing saved yet
            </h2>
            <p className="mt-1 text-sm text-stone-600 max-w-sm mx-auto">
              When you find a recipe you like, hit save and it&rsquo;ll live
              here waiting for you.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 h-10 text-sm hover:bg-stone-800"
            >
              Find something to cook
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {meals.map((meal) => (
              <LiveRecipeCard key={meal.idMeal} meal={meal} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
