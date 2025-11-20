// src/components/ui/Button.jsx
export default function Button({
  children,
  className = "",
  variant = "primary",
  ...props
}) {
  const base =
    "inline-flex items-center justify-center rounded-lg px-4 py-2 text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-emerald-400/60 focus-visible:ring-offset-2 focus-visible:ring-offset-slate-950 disabled:cursor-not-allowed disabled:opacity-50";

  const variants = {
    primary:
      "bg-emerald-500 text-slate-950 hover:bg-emerald-400 active:bg-emerald-500",
    ghost:
      "border border-slate-700 bg-slate-900 hover:bg-slate-800 text-slate-100",
  };

  return (
    <button
      className={`${base} ${variants[variant]} ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
