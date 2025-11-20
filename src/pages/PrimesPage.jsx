// src/pages/PrimesPage.jsx
import { useEffect, useMemo, useState } from "react";
import { usePrimeAlea } from "../hooks/usePrimeAlea.jsx";
import { usePrimeStore } from "../stores/usePrimeStore.js";
import { inputNumberSchema } from "../schemas/numberSchema.jsx";
import { Prime } from "../components/Prime.jsx";
import Button from "../components/ui/Button.jsx";

export default function PrimesPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    usePrimeAlea();

  const { lastNumber, isPrime, history, mode, setFromApi, checkManualNumber } =
    usePrimeStore();

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  // Quand l'API renvoie un nombre validé, on met à jour le store
  useEffect(() => {
    if (data?.number != null) {
      setFromApi(data.number);
    }
  }, [data, setFromApi]);

  // Statistiques dérivées avec useMemo (cache interne)
  const stats = useMemo(() => {
    const total = history.length;
    const primesCount = history.filter((h) => h.isPrime).length;
    return { total, primesCount };
  }, [history]);

  const handleManualSubmit = (event) => {
    event.preventDefault();
    setInputError("");

    const parsed = inputNumberSchema.safeParse(inputValue);

    if (!parsed.success) {
      setInputError(parsed.error.issues[0]?.message ?? "Valeur invalide");
      return;
    }

    checkManualNumber(parsed.data);
    setInputValue("");
  };

  return (
    <section className="space-y-8">
      {/* Header */}
      <header className="space-y-2">
        <h2 className="text-3xl font-semibold tracking-tight">
          Nombres premiers
        </h2>
        <p className="text-sm text-slate-300">
          Utilisation combinée de TanStack Query, Zustand, Zod et d&apos;une
          logique métier optimisée avec cache interne.
        </p>
      </header>

      {/* Grid API + Form */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Bloc API simulée */}
        <div className="card bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80">
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <h3 className="font-medium text-slate-50">
                Nombre aléatoire (API simulée)
              </h3>
              <p className="text-xs text-slate-400">
                Valeur générée puis validée côté client avec Zod.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-400">
              TanStack Query
            </span>
          </div>

          <div className="space-y-3 text-sm">
            {isLoading || isFetching ? (
              <div className="flex items-center gap-2 text-slate-400">
                <span className="h-3 w-3 animate-ping rounded-full bg-emerald-400/70" />
                <span>Chargement du nombre aléatoire…</span>
              </div>
            ) : isError ? (
              <div className="space-y-2 rounded-xl border border-red-500/40 bg-red-950/40 px-3 py-2 text-sm text-red-200">
                <p className="font-medium">Erreur lors de la récupération</p>
                <p className="text-xs">
                  {error?.message ??
                    "Une erreur est survenue pendant la récupération du nombre."}
                </p>
              </div>
            ) : data ? (
              <div className="space-y-3">
                <p className="text-xs uppercase text-slate-400">
                  Nombre validé par Zod (entre 1 et 50)
                </p>
                <p className="text-5xl font-semibold tracking-tight text-emerald-300">
                  {data.number}
                </p>
                <p className="text-xs text-slate-400">
                  Le nombre est mis en cache dans Zustand pour éviter les
                  recalculs.
                </p>
              </div>
            ) : (
              <p className="text-sm text-slate-400">
                Cliquez sur &quot;Générer un nombre&quot; pour commencer.
              </p>
            )}

            <Button onClick={() => refetch()} className="mt-2">
              Générer un nombre
            </Button>
          </div>
        </div>

        {/* Bloc formulaire manuel */}
        <form
          onSubmit={handleManualSubmit}
          className="card bg-gradient-to-br from-slate-900/80 via-slate-900/40 to-slate-950/80"
        >
          <div className="flex items-center justify-between gap-4 mb-3">
            <div>
              <h3 className="font-medium text-slate-50">Tester un nombre</h3>
              <p className="text-xs text-slate-400">
                Contrôle de l&apos;entrée avec Zod avant analyse.
              </p>
            </div>
            <span className="inline-flex items-center rounded-full bg-slate-900/80 px-3 py-1 text-[11px] uppercase tracking-wide text-slate-400">
              Formulaire + Zod
            </span>
          </div>

          <p className="text-sm text-slate-300 mb-3">
            Entrez un nombre entier, il sera validé avec Zod puis analysé par
            la logique métier stockée dans Zustand.
          </p>

          <div className="space-y-2 mb-3">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-lg border border-slate-700 bg-slate-950/80 px-3 py-2 text-sm outline-none ring-emerald-400/40 focus:border-emerald-400 focus:ring-2"
              placeholder="Ex: 17"
            />
            {inputError && (
              <p className="text-xs text-red-400">{inputError}</p>
            )}
          </div>

          <Button type="submit" className="mt-1">
            Vérifier
          </Button>
        </form>
      </div>

      {/* Résultat courant */}
      <div className="card-muted">
        <h3 className="font-medium text-slate-50 mb-2">Résultat courant</h3>

        {lastNumber == null ? (
          <p className="text-sm text-slate-400">
            Aucun nombre analysé pour le moment. Utilisez l&apos;API ou le
            formulaire pour lancer une vérification.
          </p>
        ) : (
          <>
            <Prime number={lastNumber} isPrime={isPrime} />
            <p className="mt-1 text-xs text-slate-500">
              Source :{" "}
              <span className="font-mono">
                {mode === "api" ? "API simulée" : "manuel"}
              </span>
            </p>
          </>
        )}
      </div>

      {/* Historique */}
      <div className="card-muted">
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium text-slate-50">Historique</h3>
          <p className="text-xs text-slate-400">
            Total : {stats.total} —{" "}
            <span className="text-emerald-300">
              Premiers : {stats.primesCount}
            </span>
          </p>
        </div>

        {history.length === 0 ? (
          <p className="text-sm text-slate-400">
            Aucun nombre analysé pour l&apos;instant.
          </p>
        ) : (
          <ul className="grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
            {history.map((item, index) => (
              <li
                key={`${item.number}-${index}`}
                className="rounded-lg border border-slate-800 bg-slate-950 px-3 py-2"
              >
                <div className="flex items-baseline justify-between gap-2">
                  <span className="font-mono text-sm text-slate-50">
                    {item.number}
                  </span>
                  <span
                    className={
                      item.isPrime
                        ? "font-medium text-emerald-400"
                        : "font-medium text-slate-400"
                    }
                  >
                    {item.isPrime ? "Premier" : "Composé"}
                  </span>
                </div>
                <p className="mt-1 text-[10px] text-slate-500">
                  {item.source === "api" ? "API simulée" : "manuel"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
