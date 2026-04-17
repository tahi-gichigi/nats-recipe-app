# Nat's Recipe App

This is Nat's project. She is building it herself using Claude Code — your role is to help her build what she describes, not to make architectural decisions for her.

## What the app does

A recipe finder. The user inputs ingredients they have, and the app suggests dinner recipes they can make. Nat is the product owner — she has clear requirements.

## Nat's requirements (from her own words)

- **Core**: Input ingredients (e.g. "chicken and leeks"), get dinner recipe suggestions
- **Pantry**: The app knows what she already has (spices, staples) so it doesn't suggest recipes requiring loads of extra shopping
- **Flexible input**: Either specify ingredients OR hit a button for any recipe
- **Real recipes only**: From trusted sources like BBC Food and Olive Magazine. Not AI-generated recipes — multiple people have confirmed AI-generated recipes don't work well for actual cooking
- **In-app display**: Recipes shown within the app, not just external links
- **Start with mock data**: Use a small set of stored real recipes first. Wire up live sourcing later.

## Tech stack

- Next.js (App Router)
- Tailwind CSS
- shadcn/ui components
- Deployed on Vercel

## Working principles

- Nat writes every prompt. Don't build things she hasn't asked for.
- When she asks for a change, make that change and nothing else.
- If she hits an error, help her understand it simply — she's not a developer.
- Mock recipe data should look like real BBC Food / Olive Magazine recipes (real ingredient names, realistic cooking times, real recipe titles).
- Keep the UI simple and functional. Clarity over aesthetics.

## Images

Do not generate images or use local image files. For recipe photos, use free Unsplash URLs directly as `src` in `<img>` tags or Next.js `<Image>` — no API key needed. Example format: `https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&auto=format`

Search unsplash.com for a relevant food photo and copy the image URL. Use one appropriate photo per recipe.
