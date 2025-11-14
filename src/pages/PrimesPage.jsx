import { useEffect, useMemo, useState } from "react";
import { usePrimeAlea } from "../../hooks/usePrimeAlea.jsx";
import { usePrimeStore } from "../../stores/usePrimeStore.js";
import { inputNumberSchema } from "../../schemas/numberSchema.jsx";
import { Prime } from "../../components/Prime.jsx";   // ⬅ ICI : import nommé
import Button from "../../components/ui/Button.jsx";


export default function PrimesPage() {
  const { data, isLoading, isError, error, refetch, isFetching } =
    usePrimeAlea();

  const {
    lastNumber,
    isPrime,
    history,
    mode,
    setFromApi,
    checkManualNumber,
  } = usePrimeStore();

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  useEffect(() => {
    if (data?.number != null) {
      setFromApi(data.number);
    }
  }, [data, setFromApi]);

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
    <section className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">Nombres premiers</h2>
        <p className="text-sm text-slate-300">
          Page combinant TanStack Query, Zustand, Zod et une logique métier
          optimisée.
        </p>
      </header>

      <div className="grid gap-6 md:grid-cols-2">
        {/* Bloc API */}
        <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
          <h3 className="font-medium">Nombre aléatoire (API simulée)</h3>

          {isLoading || isFetching ? (
            <p className="text-sm text-slate-400">Chargement du nombre…</p>
          ) : isError ? (
            <p className="text-sm text-red-400">
              Erreur lors de la récupération :{" "}
              {error?.message ?? "Erreur inconnue"}
            </p>
          ) : (
            <div className="space-y-2 text-sm">
              {data && (
                <p>
                  Nombre reçu :{" "}
                  <span className="font-mono font-semibold">
                    {data.number}
                  </span>
                </p>
              )}

              <Button onClick={() => refetch()}>Re-générer un nombre</Button>

              <p className="text-xs text-slate-500">
                Le nombre doit être entre 1 et 50 (validation Zod côté API).
              </p>
            </div>
          )}
        </div>

        {/* Bloc formulaire manuel */}
        <form
          onSubmit={handleManualSubmit}
          className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4"
        >
          <h3 className="font-medium">Tester un nombre</h3>
          <p className="text-sm text-slate-300">
            Entrez un nombre entier, il sera validé avec Zod puis analysé.
          </p>

          <div className="space-y-2">
            <input
              type="text"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              className="w-full rounded-md border border-slate-700 bg-slate-900 px-3 py-2 text-sm outline-none focus:border-emerald-400"
              placeholder="Ex: 17"
            />
            {inputError && (
              <p className="text-xs text-red-400">{inputError}</p>
            )}
          </div>

          <Button type="submit">Vérifier</Button>
        </form>
      </div>

      {/* Résultat courant */}
      <div className="space-y-2 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="font-medium">Résultat courant</h3>

        {lastNumber == null ? (
          <p className="text-sm text-slate-400">
            Aucun nombre analysé pour le moment.
          </p>
        ) : (
          <>
            <Prime number={lastNumber} isPrime={isPrime} />
            <p className="text-xs text-slate-500">
              Source :{" "}
              <span className="font-mono">
                {mode === "api" ? "API simulée" : "manuel"}
              </span>
            </p>
          </>
        )}
      </div>

      {/* Historique */}
      <div className="space-y-3 rounded-xl border border-slate-800 bg-slate-900/60 p-4">
        <h3 className="font-medium">Historique</h3>

        {history.length === 0 ? (
          <p className="text-sm text-slate-400">
            Aucun nombre analysé pour l&apos;instant.
          </p>
        ) : (
          <>
            <p className="text-xs text-slate-400">
              Total : {stats.total} — Premiers : {stats.primesCount}
            </p>

            <ul className="grid grid-cols-2 gap-2 text-xs md:grid-cols-4">
              {history.map((item, index) => (
                <li
                  key={`${item.number}-${index}`}
                  className="rounded-md border border-slate-800 bg-slate-950/60 px-2 py-1"
                >
                  <span className="font-mono">{item.number}</span>{" "}
                  <span
                    className={
                      item.isPrime
                        ? "font-medium text-emerald-400"
                        : "font-medium text-slate-400"
                    }
                  >
                    {item.isPrime ? "Premier" : "Composé"}
                  </span>
                  <span className="block text-[10px] text-slate-500">
                    {item.source === "api" ? "API" : "manuel"}
                  </span>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
