import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { IngredientFinder } from "@/components/ingredient-finder";
import { RecipeCard } from "@/components/recipe-card";
import { recipes } from "@/lib/recipes";

export default function Home() {
  const featured = recipes.slice(0, 6);

  return (
    <div>
      <section className="px-6 pt-16 pb-10 sm:pt-24 sm:pb-14">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
            Dinner, sorted
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl leading-[1.05] tracking-tight text-stone-900">
            What&rsquo;s for dinner tonight?
          </h1>
          <p className="mt-5 text-lg text-stone-600 leading-relaxed">
            Tell us what&rsquo;s in the fridge and we&rsquo;ll suggest something
            worth cooking &mdash; proper recipes from BBC Food and Olive Magazine,
            never AI-generated.
          </p>
        </div>
        <div className="max-w-2xl mx-auto mt-10">
          <IngredientFinder />
        </div>
      </section>

      <section className="px-6 pb-20">
        <div className="max-w-5xl mx-auto">
          <div className="flex items-end justify-between mb-6">
            <div>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-stone-900">
                A few ideas to get you started
              </h2>
              <p className="text-sm text-stone-500 mt-1">
                Hand-picked from the recipe box.
              </p>
            </div>
            <Link
              href="/recipes"
              className="hidden sm:inline-flex items-center gap-1.5 text-sm text-stone-600 hover:text-stone-900"
            >
              Browse all
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {featured.map((r) => (
              <RecipeCard key={r.slug} recipe={r} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
