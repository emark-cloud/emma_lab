import Image from "next/image";

const VALUES = [
  { icon: "fas fa-quote-right", label: "Integrity", color: "bg-navy text-white" },
  { icon: "fas fa-lightbulb", label: "Innovation", color: "bg-accent text-white" },
  { icon: "fas fa-star", label: "Excellence", color: "bg-teal text-white" },
  { icon: "fas fa-heart", label: "Compassion", color: "bg-gold text-white" },
];

export default function IdentitySection() {
  return (
    <section id="identity" className="py-12 sm:py-16 lg:py-20">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <div data-reveal="up" className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">
            Our Identity
          </h2>
        </div>

        {/* Vision */}
        <div
          data-reveal="up"
          className="grid md:grid-cols-[1fr_1.4fr] gap-8 items-center bg-bg-soft rounded-3xl p-6 md:p-10 mb-10"
        >
          <div className="relative aspect-square rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1576086213369-97a306d36557?w=500&q=80"
              alt="Our Vision"
              fill
              sizes="(min-width: 768px) 35vw, 90vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-accent flex items-center justify-center shadow-md">
              <i className="fas fa-eye" aria-hidden />
            </div>
          </div>
          <div>
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
              Our Vision
            </p>
            <blockquote className="font-display text-xl md:text-2xl text-navy leading-relaxed">
              &ldquo;At Emma Lab, we aim to create a future where every
              diagnosis is a step towards better health, guided by our
              commitment to accuracy and compassion in medical reporting.&rdquo;
            </blockquote>
          </div>
        </div>

        {/* Mission + Core Values */}
        <div className="grid md:grid-cols-2 gap-10">
          <div
            data-reveal="left"
            className="bg-bg-soft rounded-3xl p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1582719508461-905c673771fd?w=400&q=80"
                alt="Our Mission"
                fill
                sizes="(min-width: 768px) 35vw, 90vw"
                className="object-cover"
              />
              <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-accent flex items-center justify-center shadow-md">
                <i className="fas fa-bullseye" aria-hidden />
              </div>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
                Our Mission
              </p>
              <blockquote className="text-navy font-medium leading-relaxed">
                &ldquo;Our mission is to serve as a vital link in the healthcare
                ecosystem by delivering reliable diagnostic care that aids in
                disease prevention and the well-being of the communities we
                serve.&rdquo;
              </blockquote>
            </div>
          </div>

          <div
            data-reveal="right"
            className="bg-navy text-white rounded-3xl p-6 md:p-8"
          >
            <p className="text-xs uppercase tracking-[0.2em] font-semibold text-gold mb-3">
              What Drives Us
            </p>
            <h3 className="font-display text-3xl font-bold mb-8">
              Our Core Values
            </h3>
            <div className="grid grid-cols-2 gap-4">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="flex items-center gap-3 bg-white/10 rounded-2xl px-4 py-4"
                >
                  <div
                    className={`w-10 h-10 rounded-full ${v.color} flex items-center justify-center`}
                  >
                    <i className={v.icon} aria-hidden />
                  </div>
                  <span className="font-semibold">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
