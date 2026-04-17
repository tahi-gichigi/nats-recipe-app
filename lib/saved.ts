"use client";

import { useEffect, useState, useSyncExternalStore } from "react";

const KEY = "nats-recipe-app:saved-recipes";

type Listener = () => void;
const listeners = new Set<Listener>();

function read(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed.filter((x) => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function write(slugs: string[]) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(slugs));
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
  saved: string[];
  isSaved: (slug: string) => boolean;
  toggle: (slug: string) => void;
  save: (slug: string) => void;
  remove: (slug: string) => void;
  hydrated: boolean;
} {
  const saved = useSyncExternalStore(
    subscribe,
    () => JSON.stringify(read()),
    () => "[]"
  );
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  const parsed: string[] = JSON.parse(saved);

  return {
    saved: parsed,
    hydrated,
    isSaved: (slug) => parsed.includes(slug),
    toggle: (slug) => {
      const current = read();
      if (current.includes(slug)) write(current.filter((s) => s !== slug));
      else write([...current, slug]);
    },
    save: (slug) => {
      const current = read();
      if (!current.includes(slug)) write([...current, slug]);
    },
    remove: (slug) => {
      const current = read();
      write(current.filter((s) => s !== slug));
    },
  };
}
