"use client";

import { Bookmark, BookmarkCheck } from "lucide-react";
import { useSavedRecipes } from "@/lib/saved";
import type { RecipeCard } from "@/lib/types";
import { cn } from "@/lib/utils";

export function SaveButton({
  recipe,
  variant = "default",
  className,
}: {
  recipe: RecipeCard;
  variant?: "default" | "icon";
  className?: string;
}) {
  const { isSaved, toggle, hydrated } = useSavedRecipes();
  const saved = hydrated && isSaved(recipe.url);

  if (variant === "icon") {
    return (
      <button
        type="button"
        onClick={() => toggle(recipe)}
        aria-label={saved ? "Remove from saved" : "Save recipe"}
        className={cn(
          "inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/90 text-stone-700 ring-1 ring-stone-200 hover:bg-white hover:text-stone-900 transition-colors",
          saved &&
            "text-emerald-700 bg-emerald-50 ring-emerald-200 hover:bg-emerald-100",
          className,
        )}
      >
        {saved ? (
          <BookmarkCheck className="h-4 w-4" />
        ) : (
          <Bookmark className="h-4 w-4" />
        )}
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={() => toggle(recipe)}
      className={cn(
        "inline-flex items-center gap-2 rounded-full border px-4 h-10 text-sm font-medium transition-colors",
        saved
          ? "border-emerald-300 bg-emerald-50 text-emerald-800 hover:bg-emerald-100"
          : "border-stone-300 bg-white text-stone-800 hover:border-stone-400",
        className,
      )}
    >
      {saved ? (
        <>
          <BookmarkCheck className="h-4 w-4" />
          Saved
        </>
      ) : (
        <>
          <Bookmark className="h-4 w-4" />
          Save recipe
        </>
      )}
    </button>
  );
}
