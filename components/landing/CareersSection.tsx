import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/Button";
import { PERKS } from "@/lib/landing-data";

export default function CareersSection() {
  return (
    <section id="careers" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div data-reveal="left" className="relative">
          <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
            <Image
              src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
              alt="Team collaboration"
              fill
              sizes="(min-width: 1024px) 45vw, 90vw"
              className="object-cover"
            />
          </div>
          <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-md">
            <div className="w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center">
              <i className="fas fa-users" aria-hidden />
            </div>
            <span className="text-sm font-semibold text-navy">
              Join 80+ Professionals
            </span>
          </div>
        </div>

        <div data-reveal="right">
          <SectionHeader
            eyebrow="We're Hiring"
            title="Careers"
            description="Join a team where your potential is truly valued and your work makes a difference every day."
            className="mb-4"
          />
          <p className="text-ink-body mb-8">
            Explore our career opportunities and apply online to start your
            journey with us today. We&apos;re always looking for passionate
            individuals committed to healthcare excellence.
          </p>

          <div className="grid grid-cols-2 gap-3 mb-8">
            {PERKS.map((p) => (
              <div
                key={p.label}
                className="flex items-center gap-3 bg-bg-soft rounded-xl px-4 py-3"
              >
                <i className={`${p.icon} text-accent`} aria-hidden />
                <span className="text-sm font-medium">{p.label}</span>
              </div>
            ))}
          </div>

          <Link href="/#contact" className={buttonClass("primary")}>
            <i className="fas fa-paper-plane" aria-hidden /> Apply Now
          </Link>
        </div>
      </div>
    </section>
  );
}
