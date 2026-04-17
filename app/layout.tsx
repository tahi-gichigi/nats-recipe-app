import type { Metadata } from "next";
import { Geist, Fraunces } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const fraunces = Fraunces({
  variable: "--font-heading",
  subsets: ["latin"],
  axes: ["SOFT"],
});

export const metadata: Metadata = {
  title: "Nat's Recipe Box",
  description:
    "A quiet place to find dinner ideas from your ingredients, browse favourite recipes, and keep the ones you love.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${fraunces.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-[#fbf8f3] text-stone-900">
        <header className="border-b border-stone-200/70 bg-[#fbf8f3]/85 backdrop-blur sticky top-0 z-40">
          <div className="max-w-5xl mx-auto px-6 h-16 flex items-center justify-between">
            <Link
              href="/"
              className="font-[family-name:var(--font-heading)] text-xl tracking-tight text-stone-900"
            >
              Recipe Box
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link
                href="/"
                className="px-3 py-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              >
                Find a recipe
              </Link>
              <Link
                href="/recipes"
                className="px-3 py-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              >
                Browse
              </Link>
              <Link
                href="/saved"
                className="px-3 py-1.5 rounded-full text-stone-600 hover:text-stone-900 hover:bg-stone-200/60 transition-colors"
              >
                Saved
              </Link>
            </nav>
          </div>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-stone-200/70 text-xs text-stone-500 py-6 text-center">
          Made with care. Recipes sourced from BBC Food and Olive Magazine.
        </footer>
      </body>
    </html>
  );
}
