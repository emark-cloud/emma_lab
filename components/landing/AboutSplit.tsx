import Image from "next/image";
import Link from "next/link";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { buttonClass } from "@/components/ui/Button";

const STATS = [
  { num: "350,000+", label: "Tests Conducted" },
  { num: "99%", label: "Accuracy Rate" },
  { num: "<24h", label: "Turnaround" },
];

export default function AboutSplit() {
  return (
    <section id="about" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
        <div data-reveal="left" className="relative">
          <div className="grid grid-cols-2 gap-3 sm:gap-4">
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md">
              <Image
                src="/images/About us.jpg"
                alt="Medical professional smiling"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
            <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-md mt-6 sm:mt-12">
              <Image
                src="https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=480&q=80"
                alt="Lab team at work"
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </div>
          </div>
          <div className="absolute bottom-2 left-2 sm:-bottom-4 sm:left-4 bg-navy text-white rounded-2xl px-5 py-4 shadow-lg flex items-center gap-3">
            <span className="font-display text-2xl sm:text-3xl font-bold">14+</span>
            <span className="text-xs leading-tight uppercase tracking-wider">
              Years of
              <br />
              Excellence
            </span>
          </div>
        </div>

        <div data-reveal="right">
          <SectionHeader
            eyebrow="Who We Are"
            title="About Us"
            description="It's the dedication of a focused team that drives meaningful change and significantly enhances patients' well-being."
            className="mb-6"
          />
          <p className="text-ink-body mb-8">
            We stay always striving towards excellence and perfection to provide
            help through our diagnostic processes including laboratory services,
            medical imaging and beyond.
          </p>

          <div className="grid grid-cols-3 gap-2 sm:gap-4 mb-8">
            {STATS.map((s) => (
              <div
                key={s.label}
                className="bg-bg-soft rounded-2xl px-2 py-4 sm:px-4 sm:py-5 text-center"
              >
                <div className="font-display text-lg sm:text-2xl font-bold text-accent">
                  {s.num}
                </div>
                <div className="text-xs text-ink-muted mt-1">{s.label}</div>
              </div>
            ))}
          </div>

          <Link href="/about" className={buttonClass("primary")}>
            Read More <i className="fas fa-arrow-right" aria-hidden />
          </Link>
        </div>
      </div>
    </section>
  );
}
