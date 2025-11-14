// app/components/Prime.jsx

export default function Prime({ number, isPrime }) {
  if (number == null) return null;

  return (
    <p className="text-sm">
      Le nombre{" "}
      <span className="font-mono font-semibold text-emerald-300">{number}</span>{" "}
      est{" "}
      {isPrime ? (
        <span className="text-emerald-400 font-semibold">premier</span>
      ) : (
        <span className="text-red-400 font-semibold">non premier</span>
      )}
      .
    </p>
  );
}
