// src/routes/__root.jsx
import {
  Outlet,
  Link,
  createRootRouteWithContext,
} from "@tanstack/react-router";

export const Route = createRootRouteWithContext()({
  component: RootLayout,
});

function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/80 backdrop-blur">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold tracking-tight">
            Prime Machine
          </h1>

          <div className="flex gap-4 text-sm">
            <Link
              to="/"
              className="hover:text-emerald-300 transition-colors"
              activeProps={{ className: "text-emerald-400 underline" }}
            >
              Accueil
            </Link>
            <Link
              to="/primes"
              className="hover:text-emerald-300 transition-colors"
              activeProps={{ className: "text-emerald-400 underline" }}
            >
              Nombres premiers
            </Link>
          </div>
        </nav>
      </header>

      <main className="flex-1 mx-auto w-full max-w-4xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="border-t border-slate-800 bg-slate-900/80">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-2 text-[11px] text-slate-500">
          <span>TP — Générateur de nombres premiers optimisé</span>
          <span className="hidden sm:inline">
            TanStack Router • TanStack Query • Zustand • Zod • TailwindCSS
          </span>
        </div>
      </footer>
    </div>
  );
}
