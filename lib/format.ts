/* Format a Naira amount as ₦12,500. Ported from Js/utils.js → EmmaLab.formatPrice. */
export function formatPrice(amount: number): string {
  return `₦${amount.toLocaleString("en-NG")}`;
}

/* Class merge helper. Keeps Tailwind classes flat; if conditional logic gets
   complex, swap for `tailwind-merge` later. */
export { default as clsx } from "clsx";
