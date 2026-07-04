import { cn } from "@/lib/utils";

export function ArabicText({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg" | "xl" | "2xl";
}) {
  const sizes = {
    sm: "text-lg",
    md: "text-2xl",
    lg: "text-3xl",
    xl: "text-4xl",
    "2xl": "text-5xl",
  };
  return (
    <span dir="rtl" className={cn("font-arabic leading-relaxed", sizes[size], className)}>
      {children}
    </span>
  );
}