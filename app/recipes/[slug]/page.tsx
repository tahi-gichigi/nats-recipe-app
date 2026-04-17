import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ExternalLink, Timer, Users } from "lucide-react";
import { SaveButton } from "@/components/save-button";
import { ShoppingList } from "@/components/shopping-list";
import {
  formatMinutes,
  getRecipeBySlug,
  recipes,
  splitIngredients,
  totalMinutes,
} from "@/lib/recipes";
import {
  extractIngredients,
  getMealById,
  parseInstructions,
} from "@/lib/mealdb";

export function generateStaticParams() {
  return recipes.map((r) => ({ slug: r.slug }));
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  // TheMealDB recipe — numeric ID
  if (/^\d+$/.test(slug)) {
    const meal = await getMealById(slug);
    if (!meal) notFound();

    const ingredients = extractIngredients(meal);
    const steps = parseInstructions(meal.strInstructions);

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
                {meal.strArea} · {meal.strCategory}
              </div>
              <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl leading-[1.05] tracking-tight text-stone-900">
                {meal.strMeal}
              </h1>

              {meal.strSource && (
                <a
                  href={meal.strSource}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 inline-flex items-center gap-1.5 text-sm text-stone-500 hover:text-stone-900"
                >
                  <ExternalLink className="h-3.5 w-3.5" />
                  View original recipe
                </a>
              )}

              <div className="mt-6">
                <SaveButton slug={slug} />
              </div>
            </div>

            <div className="order-1 md:order-2">
              <div className="overflow-hidden rounded-2xl ring-1 ring-stone-200/80 bg-stone-100">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={meal.strMealThumb}
                  alt={meal.strMeal}
                  className="w-full aspect-[4/3] object-cover"
                />
              </div>
            </div>
          </div>

          <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14">
            <aside className="lg:sticky lg:top-24 h-fit">
              <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-6">
                <h2 className="font-[family-name:var(--font-heading)] text-xl text-stone-900 mb-4">
                  Ingredients
                </h2>
                <ul className="space-y-2">
                  {ingredients.map((ing, i) => (
                    <li key={i} className="flex gap-3 text-sm">
                      <span className="text-stone-400 flex-none w-20 text-right shrink-0">
                        {ing.amount}
                      </span>
                      <span className="text-stone-800">{ing.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </aside>

            <section>
              <h2 className="font-[family-name:var(--font-heading)] text-2xl text-stone-900 mb-4">
                Method
              </h2>
              <ol className="space-y-5">
                {steps.map((step, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-none inline-flex items-center justify-center h-8 w-8 rounded-full bg-stone-900 text-white text-sm font-medium">
                      {i + 1}
                    </span>
                    <p className="text-stone-800 leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </section>
          </div>
        </div>
      </article>
    );
  }

  // Mock recipe — text slug
  const recipe = getRecipeBySlug(slug);
  if (!recipe) notFound();

  const { shopping, fromPantry } = splitIngredients(recipe);

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
              {recipe.source}
            </div>
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl leading-[1.05] tracking-tight text-stone-900">
              {recipe.title}
            </h1>
            <p className="mt-4 text-lg text-stone-600 leading-relaxed">
              {recipe.description}
            </p>

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-stone-700">
              <Stat icon={<Timer className="h-4 w-4" />} label="Prep">
                {formatMinutes(recipe.prepMinutes)}
              </Stat>
              <Stat icon={<Clock className="h-4 w-4" />} label="Cook">
                {formatMinutes(recipe.cookMinutes)}
              </Stat>
              <Stat icon={<Users className="h-4 w-4" />} label="Serves">
                {recipe.servings}
              </Stat>
              <Stat label="Total">{formatMinutes(totalMinutes(recipe))}</Stat>
            </div>

            <div className="mt-6">
              <SaveButton slug={recipe.slug} />
            </div>
          </div>

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
        </div>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1fr_1.4fr] gap-10 lg:gap-14">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="rounded-2xl bg-white ring-1 ring-stone-200 p-6">
              <ShoppingList shopping={shopping} fromPantry={fromPantry} />
            </div>
          </aside>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl text-stone-900 mb-4">
              Method
            </h2>
            <ol className="space-y-5">
              {recipe.method.map((step, i) => (
                <li key={i} className="flex gap-4">
                  <span className="flex-none inline-flex items-center justify-center h-8 w-8 rounded-full bg-stone-900 text-white text-sm font-medium">
                    {i + 1}
                  </span>
                  <p className="text-stone-800 leading-relaxed pt-1">{step}</p>
                </li>
              ))}
            </ol>
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
