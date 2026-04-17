import Link from "next/link";
import { Clock, Users } from "lucide-react";
import type { Recipe } from "@/lib/recipes";
import { formatMinutes, totalMinutes } from "@/lib/recipes";

export function RecipeCard({ recipe }: { recipe: Recipe }) {
  return (
    <Link
      href={`/recipes/${recipe.slug}`}
      className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/80 hover:ring-stone-300 hover:shadow-sm transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={recipe.image}
          alt={recipe.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
        />
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-stone-500">
          {recipe.source}
        </div>
        <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl leading-snug text-stone-900">
          {recipe.title}
        </h3>
        <p className="mt-2 text-sm text-stone-600 line-clamp-2">
          {recipe.description}
        </p>
        <div className="mt-4 flex items-center gap-4 text-xs text-stone-500">
          <span className="inline-flex items-center gap-1.5">
            <Clock className="h-3.5 w-3.5" />
            {formatMinutes(totalMinutes(recipe))}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Users className="h-3.5 w-3.5" />
            Serves {recipe.servings}
          </span>
        </div>
      </div>
    </Link>
  );
}
