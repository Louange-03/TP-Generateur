// src/routes/index.jsx
import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Accueil</h2>
      <p className="text-sm text-slate-300">
        Bienvenue sur la machine à nombres premiers optimisée.
      </p>

      <p className="text-sm text-slate-300">
        Cette application démontre l&apos;utilisation combinée de :
      </p>

      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>TanStack Router pour la navigation entre les pages.</li>
        <li>TanStack Query (React Query) pour l&apos;appel API simulé.</li>
        <li>Zod pour la validation stricte des données reçues.</li>
        <li>Zustand pour la logique métier et le stockage d&apos;état.</li>
        <li>TailwindCSS pour la mise en forme et le thème visuel.</li>
      </ul>

      <p className="text-sm text-slate-400">
        Rendez-vous sur la page{" "}
        <span className="font-mono text-emerald-300">/primes</span> pour
        générer et analyser des nombres.
      </p>
    </section>
  );
}
