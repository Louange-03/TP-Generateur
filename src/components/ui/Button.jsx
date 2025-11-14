export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={
        "inline-flex items-center justify-center rounded-md border border-emerald-500/60 " +
        "bg-emerald-500/10 px-3 py-1.5 text-xs font-medium text-emerald-100 " +
        "transition hover:bg-emerald-500/20 disabled:cursor-not-allowed disabled:opacity-40 " +
        className
      }
      {...props}
    >
      {children}
    </button>
  );
}
