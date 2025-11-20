// src/components/Prime.jsx

export function Prime({ number, isPrime }) {
  if (number == null) {
    return (
      <p className="text-sm text-slate-400">
        Aucun nombre analysé pour le moment.
      </p>
    );
  }

  return (
    <p className="text-sm">
      Le nombre{" "}
      <span className="font-semibold text-slate-50">{number}</span>{" "}
      est{" "}
      <span
        className={
          isPrime ? "font-semibold text-emerald-400" : "font-semibold text-red-400"
        }
      >
        {isPrime ? "premier" : "composé"}
      </span>
      .
    </p>
  );
}
