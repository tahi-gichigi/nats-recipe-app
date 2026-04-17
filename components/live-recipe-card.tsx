import Link from "next/link";
import { Clock } from "lucide-react";
import type { RecipeCard } from "@/lib/types";

export function LiveRecipeCard({ recipe }: { recipe: RecipeCard }) {
  const href = `/recipes/view?url=${encodeURIComponent(recipe.url)}`;
  return (
    <Link
      href={href}
      className="group block overflow-hidden rounded-2xl bg-white ring-1 ring-stone-200/80 hover:ring-stone-300 hover:shadow-sm transition-all"
    >
      <div className="aspect-[4/3] overflow-hidden bg-stone-100">
        {recipe.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={recipe.image}
            alt={recipe.title}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="h-full w-full flex items-center justify-center text-stone-300 text-4xl">
            🍽
          </div>
        )}
      </div>
      <div className="p-5">
        <div className="text-xs uppercase tracking-wider text-stone-500">
          {recipe.sourceName}
        </div>
        <h3 className="mt-1 font-[family-name:var(--font-heading)] text-xl leading-snug text-stone-900">
          {recipe.title}
        </h3>
        <div className="mt-3 flex flex-wrap items-center gap-3 text-xs text-stone-500">
          {recipe.totalTime && (
            <span className="inline-flex items-center gap-1.5">
              <Clock className="h-3.5 w-3.5" />
              {recipe.totalTime}
            </span>
          )}
          {recipe.difficulty && <span>{recipe.difficulty}</span>}
        </div>
      </div>
    </Link>
  );
}
