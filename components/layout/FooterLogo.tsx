"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function FooterLogo() {
  const pathname = usePathname();

  function handleClick(e: React.MouseEvent) {
    if (pathname === "/") {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }

  return (
    <Link
      href="/"
      onClick={handleClick}
      className="flex items-center gap-0 hover:opacity-80 transition-opacity"
    >
      <div className="w-16 h-16 relative flex-shrink-0">
        <Image src="/images/Emma Logo.png" alt="Emma Lab" fill sizes="64px" className="object-contain" />
      </div>
      <div className="leading-tight">
        <span className="block font-display font-bold text-lg">Emma Lab</span>
        <span className="block text-[10px] uppercase tracking-widest text-white/60">
          Global Services Ltd.
        </span>
      </div>
    </Link>
  );
}
