import { IngredientFinder } from "@/components/ingredient-finder";

export default function Home() {
  return (
    <div>
      <section className="px-6 pt-16 pb-20 sm:pt-24 sm:pb-28">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-sm uppercase tracking-[0.2em] text-stone-500">
            Dinner, sorted
          </p>
          <h1 className="mt-4 font-[family-name:var(--font-heading)] text-4xl sm:text-5xl leading-[1.05] tracking-tight text-stone-900">
            What&rsquo;s for dinner tonight?
          </h1>
          <p className="mt-5 text-lg text-stone-600 leading-relaxed">
            Tell us what&rsquo;s in the fridge and we&rsquo;ll find you something
            worth cooking &mdash; real recipes from across the web, never
            AI-generated.
          </p>
        </div>
        <div className="max-w-2xl mx-auto mt-10">
          <IngredientFinder />
        </div>
      </section>
    </div>
  );
}
