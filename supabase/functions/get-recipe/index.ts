const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

const HEADERS = {
  "User-Agent":
    "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  Accept:
    "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
  "Accept-Language": "en-GB,en;q=0.9",
};

// ---------------------------------------------------------------------------
// JSON-LD extraction — works for any site with schema.org Recipe markup
// which covers BBC Good Food, Olive Magazine, Serious Eats, Delicious, etc.
// ---------------------------------------------------------------------------
type SchemaObj = Record<string, unknown>;

function findRecipeSchema(html: string): SchemaObj | null {
  const matches = [
    ...html.matchAll(
      /<script[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/gi,
    ),
  ];
  for (const m of matches) {
    try {
      const json = JSON.parse(m[1].trim());
      const candidates = Array.isArray(json) ? json : [json];
      for (const node of candidates) {
        const found = findRecipeNode(node);
        if (found) return found;
      }
    } catch {
      // malformed JSON-LD — skip
    }
  }
  return null;
}

function findRecipeNode(node: unknown): SchemaObj | null {
  if (!node || typeof node !== "object") return null;
  const obj = node as SchemaObj;
  const type = obj["@type"];
  const isRecipe =
    type === "Recipe" ||
    (Array.isArray(type) && type.includes("Recipe"));
  if (isRecipe) return obj;
  // Search @graph
  if (Array.isArray(obj["@graph"])) {
    for (const child of obj["@graph"]) {
      const found = findRecipeNode(child);
      if (found) return found;
    }
  }
  return null;
}

function imageUrl(image: unknown): string | undefined {
  if (!image) return undefined;
  if (typeof image === "string") return image;
  if (Array.isArray(image)) return imageUrl(image[0]);
  if (typeof image === "object") {
    const o = image as SchemaObj;
    return (o.url ?? o.contentUrl) as string | undefined;
  }
}

function isoDuration(iso: unknown): string | undefined {
  if (!iso || typeof iso !== "string") return undefined;
  const h = iso.match(/(\d+)H/);
  const m = iso.match(/(\d+)M/);
  const hours = h ? parseInt(h[1]) : 0;
  const mins = m ? parseInt(m[1]) : 0;
  if (hours && mins) return `${hours} hr ${mins} min`;
  if (hours) return `${hours} hr`;
  if (mins) return `${mins} min`;
  return undefined;
}

function extractSteps(instructions: unknown): string[] {
  if (!instructions) return [];
  if (typeof instructions === "string") {
    return instructions
      .split(/\r?\n/)
      .map((s) => s.replace(/^\s*\d+[\.\)]\s*/, "").trim())
      .filter((s) => s.length > 15);
  }
  if (Array.isArray(instructions)) {
    return instructions.flatMap((item) => {
      if (typeof item === "string") return item.trim() ? [item.trim()] : [];
      const obj = item as SchemaObj;
      if (obj["@type"] === "HowToStep") {
        const text = (obj.text ?? obj.name) as string | undefined;
        return text?.trim() ? [text.trim()] : [];
      }
      if (
        obj["@type"] === "HowToSection" &&
        Array.isArray(obj.itemListElement)
      ) {
        return extractSteps(obj.itemListElement);
      }
      return [];
    });
  }
  return [];
}

function stripHtml(s: unknown): string {
  if (typeof s !== "string") return "";
  return s.replace(/<[^>]+>/g, "").trim();
}

// ---------------------------------------------------------------------------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { url } = await req.json();
    if (!url || typeof url !== "string") {
      return new Response(JSON.stringify({ error: "url required" }), {
        status: 400,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    const res = await fetch(url, { headers: HEADERS });
    if (!res.ok) {
      return new Response(
        JSON.stringify({ error: `Fetch failed: ${res.status}` }),
        {
          status: 502,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const html = await res.text();
    const schema = findRecipeSchema(html);

    if (!schema) {
      return new Response(
        JSON.stringify({ error: "No recipe schema found on page" }),
        {
          status: 422,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const recipe = {
      title: stripHtml(schema.name),
      image: imageUrl(schema.image),
      description: stripHtml(schema.description),
      prepTime: isoDuration(schema.prepTime),
      cookTime: isoDuration(schema.cookTime),
      totalTime: isoDuration(schema.totalTime),
      servings: schema.recipeYield,
      ingredients: (schema.recipeIngredient as string[] | undefined) ?? [],
      instructions: extractSteps(schema.recipeInstructions),
      sourceUrl: url,
    };

    return new Response(JSON.stringify(recipe), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Failed to fetch recipe" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
