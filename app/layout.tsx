import type { Metadata, Viewport } from "next";
import { Poppins, DM_Sans } from "next/font/google";
import "./globals.css";
import TopBar from "@/components/layout/TopBar";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Script from "next/script";
import ScrollToTopOnReload from "@/components/ui/ScrollToTopOnReload";
import AccountSync from "@/components/account/AccountSync";
import ToastViewport from "@/components/ui/Toast";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const dmSans = DM_Sans({
  variable: "--font-dm-sans",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://emmalab.example.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Emma Lab — Accurate diagnostics, trusted across Nigeria",
    template: "%s | Emma Lab",
  },
  description:
    "Emma Lab Global Services Ltd. delivers accurate, precise, and timely diagnostic results — trusted by thousands of patients across Nigeria.",
  openGraph: {
    type: "website",
    siteName: "Emma Lab",
    locale: "en_NG",
    url: "/",
    images: [
      {
        url: "/images/Hero 1.png",
        alt: "Emma Lab diagnostic services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/images/Hero 1.png"],
  },
  icons: { icon: "/images/Emma Logo.png" },
  alternates: { canonical: "/" },
};

export const viewport: Viewport = {
  themeColor: "#0d2d4f",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${poppins.variable} ${dmSans.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-bg text-ink font-sans">
        {/* Runs before hydration / image load / browser scroll restoration.
            On a reload we opt out of native restoration so a tall,
            image-heavy page (the home page) still lands at the top;
            back/forward keep restoration (type !== "reload"). */}
        <Script id="scroll-restoration" strategy="beforeInteractive">
          {`try{var n=performance.getEntriesByType('navigation')[0];if(n&&n.type==='reload'&&'scrollRestoration' in history)history.scrollRestoration='manual';}catch(e){}`}
        </Script>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css"
        />
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <ScrollToTopOnReload />
        <AccountSync />
        <TopBar />
        <Navbar />
        <main id="main-content" className="flex-1 flex flex-col">
          {children}
        </main>
        <Footer />
        <ToastViewport />
      </body>
    </html>
  );
}
