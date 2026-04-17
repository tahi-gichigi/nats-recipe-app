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

interface RecipeCard {
  title: string;
  url: string;
  image?: string;
  sourceName: string;
  totalTime?: string;
  difficulty?: string;
}

// ---------------------------------------------------------------------------
// BBC Good Food
// ---------------------------------------------------------------------------
function parseBBCSearch(html: string): RecipeCard[] {
  const recipes: RecipeCard[] = [];
  const promoRegex =
    /<a\s+class="promo[^"]*"\s+href="(\/food\/recipes\/([^"]+))"[^>]*>([\s\S]*?)<\/a>/gi;
  let match;
  while ((match = promoRegex.exec(html)) !== null) {
    const path = match[1];
    const content = match[3];
    const titleMatch = content.match(
      /<h3[^>]*class="[^"]*promo__title[^"]*"[^>]*>([\s\S]*?)<\/h3>/i,
    );
    if (!titleMatch) continue;
    const title = titleMatch[1].replace(/<[^>]+>/g, "").trim();
    if (!title) continue;
    const imgMatch =
      content.match(/data-src="([^"]+)"/i) ||
      content.match(/src="(https?:\/\/[^"]+)"/i);
    const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const timeMatch = text.match(
      /(\d+\s*(?:hr|hrs|hours?)\s*(?:and\s*)?\d*\s*(?:mins?)?|\d+\s*mins?)/i,
    );
    recipes.push({
      title,
      url: `https://www.bbc.co.uk${path}`,
      image: imgMatch?.[1],
      sourceName: "BBC Good Food",
      totalTime: timeMatch?.[1]?.trim(),
    });
  }
  return recipes;
}

// ---------------------------------------------------------------------------
// Olive Magazine
// ---------------------------------------------------------------------------
function parseOliveSearch(html: string): RecipeCard[] {
  const recipes: RecipeCard[] = [];
  const cardRegex =
    /<article[^>]*data-item-name="([^"]+)"[^>]*data-item-type="recipe"[^>]*>([\s\S]*?)<\/article>/gi;
  let match;
  while ((match = cardRegex.exec(html)) !== null) {
    const title = match[1].trim();
    const content = match[2];
    const urlMatch = content.match(
      /href="(https:\/\/www\.olivemagazine\.com\/recipes\/[^"]+)"/i,
    );
    if (!urlMatch) continue;
    const imgMatch = content.match(
      /src="(https:\/\/images\.immediate\.co\.uk[^"]+)"/i,
    );
    const text = content.replace(/<[^>]+>/g, " ").replace(/\s+/g, " ");
    const timeMatch = text.match(
      /(\d+\s*(?:hr|hrs|hours?)\s*(?:and\s*)?\d*\s*(?:mins?)?|\d+\s*mins?)/i,
    );
    const diffMatch = text.match(
      /\b(Easy|Medium|A little effort|More effort)\b/i,
    );
    recipes.push({
      title,
      url: urlMatch[1],
      image: imgMatch?.[1],
      sourceName: "Olive Magazine",
      totalTime: timeMatch?.[1]?.trim(),
      difficulty: diffMatch?.[1],
    });
  }
  return recipes;
}

// ---------------------------------------------------------------------------
// Sources config — add new sources here
// ---------------------------------------------------------------------------
const SOURCES = [
  {
    name: "BBC Good Food",
    searchUrl: (q: string) =>
      `https://www.bbc.co.uk/food/search?q=${encodeURIComponent(q)}`,
    parse: parseBBCSearch,
  },
  {
    name: "Olive Magazine",
    searchUrl: (q: string) =>
      `https://www.olivemagazine.com/search/?search=${encodeURIComponent(q)}`,
    parse: parseOliveSearch,
  },
];

// ---------------------------------------------------------------------------
Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { ingredients, page = 1 } = await req.json();
    if (!ingredients?.length) {
      return new Response(
        JSON.stringify({ error: "ingredients array required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const query = Array.isArray(ingredients)
      ? ingredients.join(" ")
      : String(ingredients);

    const fetches = SOURCES.map((s) =>
      fetch(s.searchUrl(query), { headers: HEADERS })
        .then((r) => (r.ok ? r.text() : ""))
        .catch(() => ""),
    );

    const htmlPages = await Promise.all(fetches);

    // Parse each source and collect results
    const perSource = SOURCES.map((s, i) => s.parse(htmlPages[i]));

    // Interleave results across sources so no single source dominates
    const interleaved: RecipeCard[] = [];
    const maxLen = Math.max(...perSource.map((r) => r.length));
    for (let i = 0; i < maxLen; i++) {
      for (const results of perSource) {
        if (i < results.length) interleaved.push(results[i]);
      }
    }

    // Simple page slicing (10 per page)
    const pageSize = 10;
    const start = (page - 1) * pageSize;
    const paged = interleaved.slice(start, start + pageSize);
    const hasMore = interleaved.length > start + pageSize;

    return new Response(
      JSON.stringify({ recipes: paged, hasMore, total: interleaved.length }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } },
    );
  } catch (err) {
    console.error(err);
    return new Response(JSON.stringify({ error: "Search failed" }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
