import { forwardRef } from "react";
import type { ButtonHTMLAttributes } from "react";
import clsx from "clsx";

type Variant = "primary" | "outline" | "outline-navy" | "ghost" | "white";

const base =
  "inline-flex items-center justify-center gap-2.5 px-7 py-3 rounded-full font-semibold text-sm whitespace-nowrap " +
  "border-2 border-transparent transition-all duration-300 relative overflow-hidden cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-[0_6px_24px_rgba(13,45,79,.22)] hover:bg-accent hover:-translate-y-0.5 hover:shadow-[0_12px_32px_rgba(26,111,181,.3)]",
  outline:
    "bg-transparent text-navy border-navy hover:bg-navy hover:text-white hover:-translate-y-0.5 hover:shadow-sm",
  "outline-navy":
    "bg-transparent text-navy border-navy hover:bg-navy hover:text-white hover:-translate-y-0.5 hover:shadow-sm",
  ghost:
    "bg-accent-light text-accent hover:bg-accent hover:text-white hover:-translate-y-0.5",
  white:
    "bg-white text-navy shadow-[0_6px_24px_rgba(255,255,255,.18)] hover:bg-accent-light hover:-translate-y-0.5",
};

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: Variant;
};

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button({ variant = "primary", className, ...rest }, ref) {
    return (
      <button
        ref={ref}
        className={clsx(base, variants[variant], className)}
        {...rest}
      />
    );
  },
);

export function buttonClass(
  variant: Variant = "primary",
  extra?: string,
): string {
  return clsx(base, variants[variant], extra);
}
