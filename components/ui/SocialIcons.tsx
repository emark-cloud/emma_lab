import clsx from "clsx";

const ICONS = [
  { label: "Google", icon: "fab fa-google", href: "#" },
  {
    label: "Instagram",
    icon: "fab fa-instagram",
    href: "https://www.instagram.com/emmalabglobal?igsh=MWk5bGpibWU0aTQweA==",
  },
  {
    label: "Facebook",
    icon: "fab fa-facebook-f",
    href: "https://www.facebook.com/share/1EJGGXXTzV/",
  },
  { label: "X (Twitter)", icon: "fab fa-x-twitter", href: "https://x.com/emmalabglobal" },
] as const;

type Variant = "topbar" | "footer" | "card";
type IconLabel = (typeof ICONS)[number]["label"];

export function SocialIcons({
  variant = "topbar",
  only,
  className,
}: {
  variant?: Variant;
  only?: IconLabel[];
  className?: string;
}) {
  const list = only ? ICONS.filter((i) => only.includes(i.label)) : ICONS;

  const itemClass = clsx({
    "w-8 h-8 rounded-full flex items-center justify-center text-ink-body hover:text-accent transition-colors":
      variant === "topbar",
    "w-10 h-10 rounded-full bg-white/10 text-white flex items-center justify-center hover:bg-accent transition-colors":
      variant === "footer",
    "w-9 h-9 rounded-full bg-accent-light text-accent flex items-center justify-center hover:bg-accent hover:text-white transition-colors":
      variant === "card",
  });

  return (
    <div className={clsx("flex items-center gap-3", className)}>
      {list.map(({ label, icon, href }) => {
        const external = href !== "#";
        return (
          <a
            key={label}
            href={href}
            aria-label={label}
            className={itemClass}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
          >
            <i className={icon} aria-hidden />
          </a>
        );
      })}
    </div>
  );
}
