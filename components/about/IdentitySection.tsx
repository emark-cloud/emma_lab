import Image from "next/image";

const VALUES = [
  { icon: "fas fa-quote-right", label: "Integrity", color: "bg-navy text-white" },
  { icon: "fas fa-lightbulb", label: "Innovation", color: "bg-accent text-white" },
  { icon: "fas fa-star", label: "Excellence", color: "bg-teal text-white" },
  { icon: "fas fa-heart", label: "Compassion", color: "bg-gold text-white" },
];

export default function IdentitySection() {
  return (
    <section id="identity" className="py-12 sm:py-16 lg:py-20 scroll-mt-24">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <div data-reveal="up" className="mb-12">
          <h2 className="font-display text-4xl md:text-5xl text-navy font-bold">
            Our Identity
          </h2>
        </div>

        {/* Vision */}
        <div
          data-reveal="up"
          className="bg-bg-soft rounded-3xl p-6 md:p-10 mb-10 flex flex-col items-center text-center"
        >
          <div className="relative w-full aspect-[4/1] rounded-2xl overflow-hidden mb-6">
            <Image
              src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
              alt="Our Vision"
              fill
              sizes="90vw"
              className="object-cover"
            />
            <div className="absolute top-4 left-4 w-10 h-10 rounded-full bg-white text-accent flex items-center justify-center shadow-md">
              <i className="fas fa-eye" aria-hidden />
            </div>
          </div>
          <p className="text-sm uppercase tracking-[0.2em] font-semibold text-accent mb-3">
            Our Vision
          </p>
          <blockquote className="text-navy font-medium leading-relaxed max-w-2xl">
            &ldquo;At Emma Lab, we aim to create a future where every
            diagnosis is a step towards better health, guided by our
            commitment to accuracy and compassion in medical reporting.&rdquo;
          </blockquote>
        </div>

        {/* Mission + Core Values */}
        <div className="grid md:grid-cols-2 gap-10">
          <div
            data-reveal="left"
            className="bg-bg-soft rounded-3xl p-6 md:p-8 flex flex-col gap-5"
          >
            <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1518065896235-a4c93e088e7a?w=800&q=80"
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
              <p className="text-sm uppercase tracking-[0.2em] font-semibold text-accent mb-3">
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
            className="bg-navy text-white rounded-3xl p-6 md:p-8 flex flex-col"
          >
            <p className="text-sm uppercase tracking-[0.2em] font-semibold text-gold mb-3">
              What Drives Us
            </p>
            <h3 className="font-display text-3xl font-bold mb-8">
              Our Core Values
            </h3>
            <div className="grid grid-cols-2 gap-6 flex-1 content-between">
              {VALUES.map((v) => (
                <div
                  key={v.label}
                  className="flex flex-col items-center justify-center gap-3 bg-white/10 rounded-2xl px-4 py-[60px] h-full"
                >
                  <div
                    className={`w-20 h-20 rounded-full ${v.color} flex items-center justify-center text-3xl`}
                  >
                    <i className={v.icon} aria-hidden />
                  </div>
                  <span className="font-semibold text-lg text-center">{v.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
