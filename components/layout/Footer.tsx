import Link from "next/link";
import NewsletterForm from "./NewsletterForm";
import { SocialIcons } from "@/components/ui/SocialIcons";

const NAV_LINKS = [
  { label: "About Us", href: "/about" },
  { label: "Diagnostic Tests", href: "/diagnostic-tests" },
  { label: "View Plans", href: "/plans" },
  { label: "Contact Us", href: "/#contact" },
  { label: "Career", href: "/careers" },
];

const CONTACTS = [
  { icon: "fas fa-phone-alt", label: "+234 912 091 4837", href: "tel:+2349120914837" },
  { icon: "fas fa-phone-alt", label: "+234 081 360 2512", href: "tel:+2340813602512" },
  { icon: "fas fa-envelope", label: "emmalabglobal@gmail.com", href: "mailto:emmalabglobal@gmail.com" },
];

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer id="footer" className="bg-navy text-white mt-20">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 py-14">
        <div className="flex flex-wrap items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-accent flex items-center justify-center">
              <i className="fas fa-flask text-white" aria-hidden />
            </div>
            <div className="leading-tight">
              <span className="block font-display font-bold text-lg">
                Emma Lab
              </span>
              <span className="block text-[10px] uppercase tracking-widest text-white/60">
                Global Services Ltd.
              </span>
            </div>
          </div>
          <SocialIcons
            variant="footer"
            only={["X (Twitter)", "Instagram", "Facebook"]}
          />
          <Link
            href="/plans"
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-accent text-white text-sm font-semibold hover:bg-white hover:text-navy transition-colors"
          >
            <i className="fas fa-arrow-right" aria-hidden /> Book a Test
          </Link>
        </div>

        <hr className="border-white/10 my-10" />

        <div className="grid md:grid-cols-3 gap-10">
          <div>
            <h6 className="text-xs uppercase tracking-widest text-white/60 mb-4">
              Navigation
            </h6>
            <nav className="flex flex-col gap-2 text-sm">
              {NAV_LINKS.map(({ label, href }) => (
                <Link
                  key={href}
                  href={href}
                  className="text-white/85 hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              ))}
            </nav>
          </div>

          <div>
            <h6 className="text-xs uppercase tracking-widest text-white/60 mb-4">
              Contact Us
            </h6>
            <div className="flex flex-col gap-2 text-sm">
              {CONTACTS.map(({ icon, label, href }) => (
                <a
                  key={label}
                  href={href}
                  className="flex items-center gap-2 text-white/85 hover:text-accent transition-colors"
                >
                  <i className={`${icon} text-accent text-xs`} aria-hidden />
                  {label}
                </a>
              ))}
            </div>
          </div>

          <div>
            <h6 className="text-xs uppercase tracking-widest text-white/60 mb-2">
              Subscribe to our Newsletter
            </h6>
            <p className="text-sm text-white/70 mb-4">
              Stay informed, get inspired, and never miss out on our latest
              updates and offers.
            </p>
            <NewsletterForm />
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="max-w-[var(--container-emma)] mx-auto px-6 py-5 text-xs text-white/55 text-center">
          All Rights Reserved. Copyright {year}
        </div>
      </div>
    </footer>
  );
}
