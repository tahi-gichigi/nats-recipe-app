"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import type { SavedRecipe } from "./types";

const KEY = "nats-recipe-app:saved-recipes-v2";

type Listener = () => void;
const listeners = new Set<Listener>();

function read(): SavedRecipe[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

function write(recipes: SavedRecipe[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(recipes));
  listeners.forEach((l) => l());
}

function subscribe(listener: Listener) {
  listeners.add(listener);
  const onStorage = (e: StorageEvent) => {
    if (e.key === KEY) listener();
  };
  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

export function useSavedRecipes(): {
  saved: SavedRecipe[];
  isSaved: (url: string) => boolean;
  toggle: (recipe: Omit<SavedRecipe, "savedAt">) => void;
  hydrated: boolean;
} {
  const raw = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(read()),
    () => "[]",
  );
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const saved: SavedRecipe[] = JSON.parse(raw);

  return {
    saved,
    hydrated,
    isSaved: (url) => saved.some((r) => r.url === url),
    toggle: (recipe) => {
      const current = read();
      if (current.some((r) => r.url === recipe.url)) {
        write(current.filter((r) => r.url !== recipe.url));
      } else {
        write([...current, { ...recipe, savedAt: Date.now() }]);
      }
    },
  };
}
