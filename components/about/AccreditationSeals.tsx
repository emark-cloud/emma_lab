import Image from "next/image";

const SEALS = [
  {
    title: "MLSCN",
    body: "Medical Laboratory Science Council of Nigeria",
    logo: "/images/mlscn-logo.jpg",
    hoverRingClass: "group-hover:border-navy",
  },
  {
    title: "Oyo State Government",
    body: "Ministry of Health",
    logo: "https://upload.wikimedia.org/wikipedia/commons/8/85/Oyo_State_Coat_of_Arms.png",
    hoverRingClass: "group-hover:border-accent",
    logoClass: "p-3",
  },
  {
    title: "GMLD",
    body: "Guild of Medical Laboratory Directors, Nigeria",
    logo: "https://gmldnigeria.org/wp-content/uploads/2021/08/gmld-tran.png",
    hoverRingClass: "group-hover:border-teal",
  },
];

export default function AccreditationSeals() {
  return (
    <section id="accreditations" className="py-12 sm:py-16 lg:py-20 scroll-mt-24">
      <div className="max-w-[var(--container-emma)] mx-auto px-6">
        <header data-reveal="up" className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-3">
            Certified Standards
          </p>
          <h2 className="font-display text-3xl md:text-4xl text-navy font-bold">
            Our Accreditations
          </h2>
          <p className="mt-4 text-ink-body max-w-xl mx-auto">
            Recognised and certified by leading national and international
            healthcare bodies.
          </p>
        </header>

        <div className="flex flex-wrap justify-center gap-16">
          {SEALS.map((s) => (
            <article
              key={s.title}
              data-reveal="up"
              className="group text-center cursor-default"
            >
              <div
                className={`mx-auto w-28 h-28 rounded-full border-[3px] border-gray-300 ${s.hoverRingClass} flex items-center justify-center mb-5 bg-white overflow-hidden transition-all duration-300 ${"logoClass" in s ? s.logoClass : "p-2"}`}
              >
                <Image
                  src={s.logo}
                  alt={s.title}
                  width={88}
                  height={88}
                  className="object-contain w-full h-full grayscale group-hover:grayscale-0 transition-all duration-300"
                />
              </div>
              <h4 className="font-display text-lg text-navy font-bold">
                {s.title}
              </h4>
              <p className="mt-1 text-sm text-ink-body">{s.body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
