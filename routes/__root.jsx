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
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">Prime Machine</h1>

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

      <main className="mx-auto max-w-4xl px-4 py-8">
        <Outlet />
      </main>

      <footer className="mx-auto max-w-4xl px-4 pb-6 pt-2 text-xs text-slate-500">
        TP — Générateur de nombres premiers optimisé
      </footer>
    </div>
  );
}
