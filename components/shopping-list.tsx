"use client";

import { useState } from "react";
import { Check } from "lucide-react";
import type { Ingredient } from "@/lib/recipes";
import { cn } from "@/lib/utils";

export function ShoppingList({
  shopping,
  fromPantry,
}: {
  shopping: Ingredient[];
  fromPantry: Ingredient[];
}) {
  const [checked, setChecked] = useState<Set<string>>(new Set());

  const toggle = (key: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key);
      else next.add(key);
      return next;
    });
  };

  return (
    <div className="space-y-6">
      <div>
        <div className="flex items-baseline justify-between mb-3">
          <h3 className="font-[family-name:var(--font-heading)] text-lg text-stone-900">
            Shopping list
          </h3>
          <span className="text-xs text-stone-500">
            {shopping.length} {shopping.length === 1 ? "item" : "items"}
          </span>
        </div>
        {shopping.length === 0 ? (
          <p className="text-sm text-stone-500">
            Nothing to buy — it&rsquo;s all in the pantry.
          </p>
        ) : (
          <ul className="space-y-1.5">
            {shopping.map((ing) => {
              const key = ing.name;
              const on = checked.has(key);
              return (
                <li key={key}>
                  <button
                    type="button"
                    onClick={() => toggle(key)}
                    className={cn(
                      "w-full flex items-start gap-3 text-left py-1.5 px-2 -mx-2 rounded-md hover:bg-stone-50 transition-colors",
                      on && "opacity-50"
                    )}
                  >
                    <span
                      className={cn(
                        "mt-0.5 h-[18px] w-[18px] flex-none rounded-md border flex items-center justify-center transition-colors",
                        on
                          ? "bg-emerald-600 border-emerald-600 text-white"
                          : "border-stone-300"
                      )}
                    >
                      {on && <Check className="h-3 w-3" strokeWidth={3} />}
                    </span>
                    <span className={cn("text-sm text-stone-800", on && "line-through")}>
                      {ing.amount && (
                        <span className="text-stone-500">{ing.amount} </span>
                      )}
                      <span className="text-stone-900 font-medium">{ing.name}</span>
                      {ing.note && (
                        <span className="text-stone-500">, {ing.note}</span>
                      )}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        )}
      </div>

      {fromPantry.length > 0 && (
        <div>
          <h3 className="font-[family-name:var(--font-heading)] text-lg text-stone-900 mb-1">
            From your pantry
          </h3>
          <p className="text-xs text-stone-500 mb-3">
            You should already have these — double-check before you start.
          </p>
          <ul className="text-sm text-stone-600 space-y-1">
            {fromPantry.map((ing) => (
              <li key={ing.name} className="flex items-baseline gap-2">
                <span className="h-1 w-1 rounded-full bg-stone-400" />
                <span>
                  {ing.amount && <span className="text-stone-500">{ing.amount} </span>}
                  {ing.name}
                  {ing.note && <span className="text-stone-500">, {ing.note}</span>}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
