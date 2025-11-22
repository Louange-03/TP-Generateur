// src/pages/PrimesPage.jsx
import { useEffect, useMemo, useState } from "react";
import { z } from "zod";

import { usePrimeAlea } from "../hooks/usePrimeAlea.jsx";
import { usePrimeStore } from "../stores/usePrimeStore.js";
import Prime from "../components/Prime.jsx";
import Button from "../components/ui/Button.jsx";

const inputNumberSchema = z
  .string()
  .min(1, "Veuillez entrer un nombre")
  .regex(/^\d+$/, "Le nombre doit être un entier positif")
  .transform((v) => Number(v))
  .refine((n) => n >= 1 && n <= 1000000, {
    message: "Le nombre doit être entre 1 et 1 000 000",
  });

export default function PrimesPage() {
  const { data, isLoading, isFetching, isError, error, refetch } = usePrimeAlea();

  const { currentNumber, isCurrentPrime, source, history, checkManual } =
    usePrimeStore();

  const [inputValue, setInputValue] = useState("");
  const [inputError, setInputError] = useState("");

  const apiErrorMessage = useMemo(() => {
    if (!isError) return null;
    if (error?.errors) {
      return "La donnée reçue ne respecte pas le schéma (Zod).";
    }
    return "Erreur lors de la récupération du nombre aléatoire.";
  }, [isError, error]);

  function handleSubmit(e) {
    e.preventDefault();
    setInputError("");

    try {
      const parsed = inputNumberSchema.parse(inputValue);
      checkManual(parsed);
      setInputValue("");
    } catch (err) {
      if (err instanceof z.ZodError) {
        setInputError(err.issues[0]?.message ?? "Valeur invalide");
      } else {
        setInputError("Valeur invalide");
      }
    }
  }

  useEffect(() => {
    if (data?.number != null) {
      // Le hook a déjà poussé la valeur dans Zustand via onSuccess,
      // donc ici on n'a pas forcément besoin de refaire quelque chose.
    }
  }, [data]);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-2xl font-semibold">Nombres premiers</h2>
        <p className="text-sm text-slate-300">
          Utilisation combinée de TanStack Query, Zustand, Zod et d&apos;une
          logique métier optimisée avec cache interne.
        </p>
      </header>

      <section className="grid gap-6 md:grid-cols-2">
        {/* Bloc API aléatoire */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            Nombre aléatoire (API simulée)
          </h3>

          {isLoading || isFetching ? (
            <p className="text-sm text-slate-400">Chargement du nombre aléatoire…</p>
          ) : isError ? (
            <div className="rounded-md border border-rose-700/60 bg-rose-950/40 p-3 text-xs text-rose-300">
              <p className="font-semibold mb-1">Erreur lors de la récupération :</p>
              <p>{apiErrorMessage}</p>
            </div>
          ) : data ? (
            <div className="space-y-2">
              <p className="text-xs text-slate-400">
                Nombre validé par Zod (entre 1 et 50).
              </p>
              <p className="text-4xl font-mono text-emerald-300">
                {data.number}
              </p>
            </div>
          ) : (
            <p className="text-sm text-slate-400">
              Lancez une première requête pour récupérer un nombre.
            </p>
          )}

          <div className="mt-4">
            <Button onClick={() => refetch()}>
              Générer un nombre aléatoire
            </Button>
          </div>
        </div>

        {/* Bloc formulaire utilisateur */}
        <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-slate-200 mb-2">
            Tester un nombre
          </h3>
          <p className="text-xs text-slate-400 mb-4">
            Entrez un nombre entier, il sera validé avec Zod puis analysé par la
            logique métier stockée dans Zustand.
          </p>

          <form onSubmit={handleSubmit} className="space-y-3">
            <div>
              <input
                className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-2 text-sm
                           text-slate-50 placeholder:text-slate-500 focus:outline-none
                           focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                placeholder="Ex : 17"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
              />
              {inputError && (
                <p className="mt-1 text-xs text-rose-400">{inputError}</p>
              )}
            </div>

            <Button type="submit">Vérifier</Button>
          </form>
        </div>
      </section>

      {/* Résultat courant */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm space-y-2">
        <h3 className="text-sm font-semibold text-slate-200">
          Résultat courant
        </h3>
        <Prime value={currentNumber} isPrime={isCurrentPrime} />
        {currentNumber != null && (
          <p className="text-xs text-slate-500">
            Source :{" "}
            <span className="font-mono">
              {source === "api" ? "api" : "manuel"}
            </span>
          </p>
        )}
      </section>

      {/* Historique */}
      <section className="rounded-xl border border-slate-800 bg-slate-900/60 p-5 shadow-sm space-y-3">
        <h3 className="text-sm font-semibold text-slate-200">Historique</h3>
        {history.length === 0 ? (
          <p className="text-xs text-slate-500">
            Aucun nombre testé pour le moment.
          </p>
        ) : (
          <>
            <p className="text-xs text-slate-500">
              Total : {history.length} — Premiers :{" "}
              {
                history.filter((h) => h.isPrime).length
              }
            </p>
            <div className="grid gap-2 md:grid-cols-2 lg:grid-cols-4">
              {history.map((item) => (
                <div
                  key={item.id}
                  className="rounded-lg border border-slate-800 bg-slate-950/60 px-3 py-2 text-xs space-y-1"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-mono text-sm">
                      {item.value}
                    </span>
                    <span
                      className={
                        item.isPrime
                          ? "text-emerald-400"
                          : "text-rose-400"
                      }
                    >
                      {item.isPrime ? "Premier" : "Composé"}
                    </span>
                  </div>
                  <p className="text-[10px] text-slate-500">
                    {item.source === "api" ? "API" : "manuel"}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </section>
    </div>
  );
}
