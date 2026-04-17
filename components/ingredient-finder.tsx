"use client";

import { useRouter } from "next/navigation";
import { useState, KeyboardEvent } from "react";
import { Plus, Search, Shuffle, X } from "lucide-react";

export function IngredientFinder() {
  const router = useRouter();
  const [tags, setTags] = useState<string[]>([]);
  const [draft, setDraft] = useState("");

  const addTag = (value: string) => {
    const v = value.trim().toLowerCase();
    if (!v) return;
    if (tags.includes(v)) {
      setDraft("");
      return;
    }
    setTags([...tags, v]);
    setDraft("");
  };

  const removeTag = (value: string) =>
    setTags(tags.filter((t) => t !== value));

  const handleKey = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" || e.key === ",") {
      e.preventDefault();
      addTag(draft);
    } else if (e.key === "Backspace" && !draft && tags.length) {
      setTags(tags.slice(0, -1));
    }
  };

  const goFind = () => {
    const q = tags.length ? `?ingredients=${encodeURIComponent(tags.join(","))}` : "";
    router.push(`/recipes${q}`);
  };

  const surprise = async () => {
    const res = await fetch(
      "https://www.themealdb.com/api/json/v1/1/random.php"
    );
    const data = await res.json();
    const id = data.meals?.[0]?.idMeal;
    if (id) router.push(`/recipes/${id}`);
  };

  return (
    <div className="w-full">
      <div className="rounded-2xl bg-white ring-1 ring-stone-200 shadow-sm p-3 sm:p-4">
        <div className="flex flex-wrap items-center gap-2">
          <Search className="h-4 w-4 text-stone-400 ml-1.5" />
          {tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 rounded-full bg-stone-100 text-stone-800 text-sm px-3 py-1"
            >
              {tag}
              <button
                type="button"
                onClick={() => removeTag(tag)}
                aria-label={`Remove ${tag}`}
                className="hover:text-stone-600"
              >
                <X className="h-3.5 w-3.5" />
              </button>
            </span>
          ))}
          <input
            value={draft}
            onChange={(e) => setDraft(e.target.value)}
            onKeyDown={handleKey}
            placeholder={
              tags.length === 0 ? "e.g. chicken, leeks" : "Add another ingredient"
            }
            className="flex-1 min-w-[160px] bg-transparent outline-none text-base px-2 py-2 placeholder:text-stone-400"
          />
          {draft && (
            <button
              type="button"
              onClick={() => addTag(draft)}
              className="inline-flex items-center gap-1 rounded-full bg-stone-100 hover:bg-stone-200 text-stone-700 text-sm px-3 py-1"
            >
              <Plus className="h-3.5 w-3.5" /> Add
            </button>
          )}
        </div>
      </div>

      <div className="mt-4 flex flex-col sm:flex-row gap-3">
        <button
          type="button"
          onClick={goFind}
          className="inline-flex justify-center items-center gap-2 h-12 px-6 rounded-full bg-stone-900 text-white font-medium hover:bg-stone-800 transition-colors flex-1"
        >
          <Search className="h-4 w-4" />
          {tags.length === 0 ? "Browse all recipes" : "Find recipes"}
        </button>
        <button
          type="button"
          onClick={surprise}
          className="inline-flex justify-center items-center gap-2 h-12 px-6 rounded-full bg-amber-50 text-amber-900 ring-1 ring-amber-200 hover:bg-amber-100 font-medium transition-colors"
        >
          <Shuffle className="h-4 w-4" />
          Surprise me
        </button>
      </div>
    </div>
  );
}
