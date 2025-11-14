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

import PrimesPage from "./pages/PrimesPage.jsx";

// ---------- Layout racine ----------
function RootLayout() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-50">
      <header className="border-b border-slate-800">
        <nav className="mx-auto flex max-w-4xl items-center justify-between px-4 py-3">
          <h1 className="text-lg font-semibold">Prime Machine</h1>

          <div className="flex gap-4 text-sm">
            <Link
              to="/"
              className="hover:text-emerald-300 transition-colors [&.active]:text-emerald-400 [&.active]:underline"
            >
              Accueil
            </Link>
            <Link
              to="/primes"
              className="hover:text-emerald-300 transition-colors [&.active]:text-emerald-400 [&.active]:underline"
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

// ---------- Routes ----------
const rootRoute = createRootRoute({
  component: RootLayout,
});

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: function HomePage() {
    return (
      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Accueil</h2>
        <p className="text-sm text-slate-300">
          Bienvenue sur la machine à nombres premiers.
        </p>
        <p className="text-sm text-slate-300">Cette application illustre :</p>
        <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
          <li>TanStack Router pour la navigation.</li>
          <li>TanStack Query pour les appels asynchrones.</li>
          <li>Zod pour la validation stricte de la donnée.</li>
          <li>Zustand pour la logique métier.</li>
          <li>TailwindCSS pour la mise en forme.</li>
        </ul>
        <p className="text-sm text-slate-400">
          Rendez-vous sur{" "}
          <span className="font-mono text-emerald-300">/primes</span> pour
          jouer avec les nombres premiers.
        </p>
      </section>
    );
  },
});

const primesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/primes",
  component: PrimesPage,
});

const routeTree = rootRoute.addChildren([indexRoute, primesRoute]);

const router = createRouter({
  routeTree,
});

// ---------- React Query + rendu ----------
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  </React.StrictMode>
);
