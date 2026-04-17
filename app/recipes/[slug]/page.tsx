import Link from "next/link";
import { headers } from "next/headers";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, ExternalLink, Users } from "lucide-react";
import { SaveButton } from "@/components/save-button";
import { extractSteps, stripHtml, type RecipeDetail } from "@/lib/spoonacular";

async function fetchRecipe(id: string): Promise<RecipeDetail | null> {
  const h = await headers();
  const host = h.get("host");
  const proto = h.get("x-forwarded-proto") || "http";
  const res = await fetch(`${proto}://${host}/api/recipe/${id}`, {
    cache: "no-store",
  });
  if (!res.ok) return null;
  return res.json();
}

export default async function RecipePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!/^\d+$/.test(slug)) notFound();

  const recipe = await fetchRecipe(slug);
  if (!recipe) notFound();

  const steps = extractSteps(recipe);
  const summary = recipe.summary ? stripHtml(recipe.summary) : "";

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
            {recipe.sourceName && (
              <div className="text-xs uppercase tracking-[0.18em] text-stone-500">
                {recipe.sourceName}
              </div>
            )}
            <h1 className="mt-2 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl leading-[1.05] tracking-tight text-stone-900">
              {recipe.title}
            </h1>
            {summary && (
              <p className="mt-4 text-stone-600 leading-relaxed line-clamp-4">
                {summary}
              </p>
            )}

            <div className="mt-6 flex flex-wrap gap-6 text-sm text-stone-700">
              {recipe.readyInMinutes != null && (
                <Stat icon={<Clock className="h-4 w-4" />} label="Total">
                  {recipe.readyInMinutes} min
                </Stat>
              )}
              {recipe.servings != null && (
                <Stat icon={<Users className="h-4 w-4" />} label="Serves">
                  {recipe.servings}
                </Stat>
              )}
            </div>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              <SaveButton slug={slug} />
              {recipe.sourceUrl && (
                <a
                  href={recipe.sourceUrl}
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
              <h2 className="font-[family-name:var(--font-heading)] text-xl text-stone-900 mb-4">
                Ingredients
              </h2>
              <ul className="space-y-2">
                {recipe.extendedIngredients?.map((ing, i) => (
                  <li key={i} className="text-sm text-stone-800">
                    {ing.original}
                  </li>
                ))}
              </ul>
            </div>
          </aside>

          <section>
            <h2 className="font-[family-name:var(--font-heading)] text-2xl text-stone-900 mb-4">
              Method
            </h2>
            {steps.length > 0 ? (
              <ol className="space-y-5">
                {steps.map((step, i) => (
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
                Method not available — tap &ldquo;View original&rdquo; for the
                full recipe.
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
