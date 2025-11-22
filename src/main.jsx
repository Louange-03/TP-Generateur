// src/main.jsx
import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

import {
  Link,
  Outlet,
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import PrimesPage from "./pages/PrimesPage.jsx";

// -----------------------------------------------------------------------------
// Layout racine
// -----------------------------------------------------------------------------
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

// -----------------------------------------------------------------------------
// Page d'accueil (route "/")
// -----------------------------------------------------------------------------
function HomePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Accueil</h2>
      <p className="text-sm text-slate-300">
        Bienvenue sur la machine à nombres premiers optimisée.
      </p>
      <p className="text-sm text-slate-300">
        Cette application illustre TanStack Router, TanStack Query, Zustand,
        Zod et TailwindCSS.
      </p>
      <p className="text-sm text-slate-400">
        Utilisez le menu ci-dessus pour accéder à{" "}
        <span className="font-mono text-emerald-300">/primes</span>.
      </p>
    </section>
  );
}

// -----------------------------------------------------------------------------
// Définition des routes TanStack Router
// -----------------------------------------------------------------------------
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});

const primesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/primes",
  component: PrimesPage,
});

const routeTree = rootRoute.addChildren([indexRoute, primesRoute]);
const router = createRouter({ routeTree });

// -----------------------------------------------------------------------------
// React Query + rendu React
// -----------------------------------------------------------------------------
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      {/* App + navigation */}
      <RouterProvider router={router} />

      {/* Logo TanStack Router en bas à gauche */}
      <TanStackRouterDevtools router={router} position="bottom-left" />
    </QueryClientProvider>
  </React.StrictMode>
);
