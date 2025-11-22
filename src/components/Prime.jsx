// src/components/Prime.jsx
export default function Prime({ value, isPrime }) {
  if (value == null) {
    return (
      <p className="text-sm text-slate-400">
        Aucune valeur pour le moment. Lancez une requête ou testez un nombre.
      </p>
    );
  }

  return (
    <p className="text-lg">
      Le nombre{" "}
      <span className="font-mono text-emerald-300 font-semibold">{value}</span>{" "}
      est{" "}
      <span className={isPrime ? "text-emerald-400 font-semibold" : "text-rose-400 font-semibold"}>
        {isPrime ? "premier" : "composé"}.
      </span>
    </p>
  );
}
