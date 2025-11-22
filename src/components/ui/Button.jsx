// src/components/ui/Button.jsx
export default function Button({ children, className = "", ...props }) {
  return (
    <button
      className={`inline-flex items-center justify-center rounded-md border border-emerald-500
                  bg-emerald-600 px-4 py-2 text-sm font-medium text-slate-50
                  shadow-sm transition hover:bg-emerald-500 hover:-translate-y-[1px]
                  focus:outline-none focus:ring-2 focus:ring-emerald-400 focus:ring-offset-2
                  focus:ring-offset-slate-950 disabled:opacity-50 disabled:cursor-not-allowed
                  ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
