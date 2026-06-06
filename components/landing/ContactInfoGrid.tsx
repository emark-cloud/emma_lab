import { SocialIcons } from "@/components/ui/SocialIcons";

export default function ContactInfoGrid() {
  return (
    <div data-reveal="left">
      <p className="text-xs uppercase tracking-[0.2em] font-semibold text-accent mb-2">
        Contact Details
      </p>
      <h2 className="font-display text-2xl md:text-3xl text-navy font-bold mb-8">
        How to Reach Us
      </h2>

      <div className="divide-y divide-border-soft">
        {/* Call */}
        <div className="flex gap-4 py-6 first:pt-0">
          <div className="w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="fas fa-phone-alt text-sm" aria-hidden />
          </div>
          <div>
            <h4 className="font-semibold text-navy mb-1">Call Us</h4>
            <p className="text-xs text-ink-muted leading-relaxed mb-2">
              Laboratory: 24 hours / 7 days
              <br />
              Ultrasound &amp; X-Ray (Mon–Sat): 8am–5pm
            </p>
            <a
              href="tel:+2348136025120"
              className="block text-sm text-accent font-medium hover:underline"
            >
              +234 813 602 5120
            </a>
            <a
              href="tel:+2348035789680"
              className="block text-sm text-accent font-medium hover:underline"
            >
              +234 803 578 9680
            </a>
          </div>
        </div>

        {/* WhatsApp */}
        <div className="flex gap-4 py-6">
          <div className="w-10 h-10 rounded-full bg-teal/10 text-teal flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="fab fa-whatsapp text-sm" aria-hidden />
          </div>
          <div>
            <h4 className="font-semibold text-navy mb-1">WhatsApp</h4>
            <p className="text-xs text-ink-muted mb-2">
              We reply within minutes during working hours
            </p>
            <a
              href="https://wa.me/2349120914837"
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-accent font-medium hover:underline"
            >
              +234 912 091 4837
            </a>
          </div>
        </div>

        {/* Email */}
        <div className="flex gap-4 py-6">
          <div className="w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="fas fa-envelope text-sm" aria-hidden />
          </div>
          <div>
            <h4 className="font-semibold text-navy mb-1">Email</h4>
            <p className="text-xs text-ink-muted mb-2">
              We'll get back to you within 24 hours
            </p>
            <a
              href="mailto:emmalabglobal@gmail.com"
              className="text-sm text-accent font-medium hover:underline"
            >
              emmalabglobal@gmail.com
            </a>
          </div>
        </div>

        {/* Social */}
        <div className="flex gap-4 py-6">
          <div className="w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center flex-shrink-0 mt-0.5">
            <i className="fas fa-share-alt text-sm" aria-hidden />
          </div>
          <div>
            <h4 className="font-semibold text-navy mb-1">Follow Us</h4>
            <p className="text-xs text-ink-muted mb-3">
              Health tips &amp; updates on social
            </p>
            <SocialIcons
              variant="card"
              only={["X (Twitter)", "Instagram", "Facebook"]}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
