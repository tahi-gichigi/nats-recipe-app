"use client";

import { Suspense, useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Clock, ExternalLink, Loader2, Users } from "lucide-react";
import { SaveButton } from "@/components/save-button";
import type { FullRecipe } from "@/lib/types";

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

function servingsText(s: FullRecipe["servings"]): string | undefined {
  if (!s) return undefined;
  if (Array.isArray(s)) return s[0] ? String(s[0]) : undefined;
  return String(s);
}

function RecipeContent() {
  const searchParams = useSearchParams();
  const recipeUrl = searchParams.get("url");

  const [recipe, setRecipe] = useState<FullRecipe | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!recipeUrl) {
      setError("No recipe URL provided.");
      setLoading(false);
      return;
    }
    fetch(`${SUPABASE_URL}/functions/v1/get-recipe`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${SUPABASE_ANON_KEY}`,
      },
      body: JSON.stringify({ url: recipeUrl }),
    })
      .then((r) => {
        if (!r.ok) throw new Error(`Failed to load recipe (${r.status})`);
        return r.json();
      })
      .then(setRecipe)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [recipeUrl]);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
      </div>
    );
  }

  if (error || !recipe) {
    return (
      <div className="px-6 py-12 max-w-5xl mx-auto">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to recipes
        </Link>
        <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-12 text-center">
          <p className="text-stone-700 mb-2">Couldn&apos;t load this recipe.</p>
          <p className="text-sm text-stone-500 mb-6">{error}</p>
          {recipeUrl && (
            <a
              href={recipeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full bg-stone-900 text-white px-5 h-10 text-sm hover:bg-stone-800"
            >
              <ExternalLink className="h-3.5 w-3.5" />
              Open on source site
            </a>
          )}
        </div>
      </div>
    );
  }

  const servings = servingsText(recipe.servings);

  // Derive source name from URL for the SaveButton
  const sourceName = recipeUrl?.includes("bbc.co.uk")
    ? "BBC Good Food"
    : recipeUrl?.includes("olivemagazine.com")
      ? "Olive Magazine"
      : new URL(recipeUrl ?? "https://example.com").hostname.replace(
          "www.",
          "",
        );

  const recipeCard = {
    title: recipe.title,
    url: recipeUrl ?? "",
    image: recipe.image,
    sourceName,
  };

  return (
    <article className="px-6 py-10">
      <div className="max-w-5xl mx-auto">
        <Link
          href="/recipes"
          className="inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900 mb-6"
        >
          <ArrowLeft className="h-3.5 w-3.5" />
          Back to recipes
        </Link>

        <div className="grid grid-cols-1 md:grid-cols-[1.1fr_1fr] gap-8 items-start">
          <div className="order-2 md:order-1">
            <div className="text-xs uppercase tracking-[0.18em] text-stone-500">
              {sourceName}
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl leading-[1.05] tracking-tight text-stone-900">
              {recipe.title}
            </h1>
            {recipe.description && (
              <p className="mt-4 text-stone-600 leading-relaxed line-clamp-3">
                {recipe.description}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-stone-700">
              {recipe.prepTime && (
                <Stat icon={<Clock className="h-4 w-4" />} label="Prep">
                  {recipe.prepTime}
                </Stat>
              )}
              {recipe.cookTime && (
                <Stat icon={<Clock className="h-4 w-4" />} label="Cook">
                  {recipe.cookTime}
                </Stat>
              )}
              {recipe.totalTime && !recipe.prepTime && !recipe.cookTime && (
                <Stat icon={<Clock className="h-4 w-4" />} label="Total">
                  {recipe.totalTime}
                </Stat>
              )}
              {servings && (
                <Stat icon={<Users className="h-4 w-4" />} label="Serves">
                  {servings}
                </Stat>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SaveButton recipe={recipeCard} />
              {recipeUrl && (
                <a
                  href={recipeUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 rounded-full border border-stone-300 bg-white text-stone-800 hover:border-stone-400 px-4 h-10 text-sm font-medium"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View original
                </a>
              )}
            </div>
          </div>

          {recipe.image && (
            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-2xl ring-1 ring-stone-200/80 bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={recipe.image}
                  alt={recipe.title}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          )}
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-6">
              <h2 className="font-[family-name:var(--font-heading)] text-xl text-stone-900 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.ingredients.map((ing, i) => (
                  <li key={i} className="text-sm text-stone-800">
                    {ing}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl text-stone-900 mb-4">
              Method
            </h2>
            {recipe.instructions.length > 0 ? (
              <ol className="space-y-5">
                {recipe.instructions.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-none inline-flex items-center justify-center h-8 w-8 rounded-full bg-stone-900 text-white text-sm font-medium">
                      {i + 1}
                    </span>
                    <p className="text-stone-800 leading-relaxed pt-1">
                      {step}
                    </p>
                  </li>
                ))}
              </ol>
            ) : (
              <p className="text-stone-600">
                Method not available in-app —{" "}
                <a
                  href={recipeUrl ?? "#"}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline hover:text-stone-900"
                >
                  view original recipe
                </a>
                .
              </p>
            )}
          </section>
        </div>
      </div>
    </article>
  );
}

function Stat({
  icon,
  label,
  children,
}: {
  icon?: React.ReactNode;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="flex items-center gap-2">
      {icon && <span className="text-stone-400">{icon}</span>}
      <div className="leading-tight">
        <div className="text-[11px] uppercase tracking-wider text-stone-500">
          {label}
        </div>
        <div className="font-medium text-stone-900">{children}</div>
      </div>
    </div>
  );
}

export default function RecipeViewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex items-center justify-center py-32">
          <Loader2 className="h-8 w-8 animate-spin text-stone-400" />
        </div>
      }
    >
      <RecipeContent />
    </Suspense>
  );
}
