import clsx from "clsx";

/* Shared loading indicator. Replaces ad-hoc `fa-spinner fa-spin` usage so
   every loading state looks the same and announces itself to screen readers.
   The slow-spin-under-reduced-motion rule lives in globals.css (.fa-spin). */
export function Spinner({
  className,
  label = "Loading…",
}: {
  className?: string;
  label?: string;
}) {
  return (
    <>
      <i className={clsx("fas fa-spinner fa-spin", className)} aria-hidden />
      <span className="visually-hidden">{label}</span>
    </>
  );
}
