import Link from "next/link";
import type { MealSummary } from "@/lib/mealdb";

export function LiveRecipeCard({ meal }: { meal: MealSummary }) {
  return (
    <Link
      href={`/recipes/${meal.idMeal}`}
      className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/80 hover:ring-stone-300 hover:shadow-sm transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`${meal.strMealThumb}/preview`}
          alt={meal.strMeal}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-stone-500">
          TheMealDB
        </div>
        <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl leading-snug text-stone-900">
          {meal.strMeal}
        </h3>
      </div>
    </Link>
  );
}
