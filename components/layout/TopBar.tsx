import { SocialIcons } from "@/components/ui/SocialIcons";

export default function TopBar() {
  return (
    <div className="bg-topbar text-ink-body text-sm">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-2.5 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-5 flex-wrap">
          <a
            href="tel:+2349120914837"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <i className="fas fa-phone-alt text-accent text-xs" aria-hidden />
            +234 912 091 4837
          </a>
          <a
            href="mailto:emmalabglobal@gmail.com"
            className="flex items-center gap-2 hover:text-accent transition-colors"
          >
            <i className="fas fa-envelope text-accent text-xs" aria-hidden />
            emmalabglobal@gmail.com
          </a>
        </div>
        <SocialIcons
          variant="topbar"
          only={["Google", "Instagram", "Facebook"]}
        />
      </div>
    </div>
  );
}
