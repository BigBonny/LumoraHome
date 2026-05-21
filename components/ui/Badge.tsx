interface BadgeProps {
  children: React.ReactNode;
  variant?: "default" | "sale" | "new";
}

export function Badge({ children, variant = "default" }: BadgeProps) {
  const variants = {
    default: "bg-violet-600 text-white",
    sale: "bg-red-500 text-white",
    new: "bg-green-500 text-white",
  };

  return (
    <span
      className={`px-3 py-1 rounded-full text-xs font-semibold ${variants[variant]}`}
    >
      {children}
    </span>
  );
}
