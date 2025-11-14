import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/")({
  component: HomePage,
});

function HomePage() {
  return (
    <section className="space-y-4">
      <h2 className="text-2xl font-semibold">Accueil</h2>
      <p className="text-sm text-slate-300">
        Bienvenue sur la machine à nombres premiers.
      </p>
      <p className="text-sm text-slate-300">
        Cette application illustre :
      </p>
      <ul className="list-disc space-y-1 pl-5 text-sm text-slate-300">
        <li>TanStack Router pour la navigation.</li>
        <li>TanStack Query pour les appels asynchrones.</li>
        <li>Zod pour la validation stricte de la donnée.</li>
        <li>Zustand pour la logique métier et l&apos;état global.</li>
        <li>TailwindCSS pour la mise en forme.</li>
      </ul>
      <p className="text-sm text-slate-400">
        Rendez-vous sur la page <span className="font-mono">/primes</span> pour
        jouer avec les nombres premiers.
      </p>
    </section>
  );
}
