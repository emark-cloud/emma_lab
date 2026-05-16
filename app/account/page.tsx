import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import AccountDashboard from "@/components/account/AccountDashboard";
import AccountSignInPrompt from "@/components/account/AccountSignInPrompt";
import RevealOnScroll from "@/components/ui/RevealOnScroll";

export const metadata: Metadata = {
  title: "My Account",
  description: "Your saved wellness plans and order history with Emma Lab.",
};

export default async function AccountPage() {
  if (!isSupabaseConfigured) {
    return (
      <AccountShell>
        <p className="text-ink-body">
          Accounts aren&apos;t configured yet. Add the Supabase keys to
          <code className="font-mono mx-1">.env.local</code> to enable saved
          plans and order history.
        </p>
      </AccountShell>
    );
  }

  const supabase = await createClient();
  const { data } = await supabase.auth.getClaims();
  const claims = data?.claims;

  if (!claims) {
    return (
      <AccountShell>
        <AccountSignInPrompt />
      </AccountShell>
    );
  }

  return (
    <AccountShell>
      <AccountDashboard email={(claims.email as string) ?? ""} />
      <RevealOnScroll />
    </AccountShell>
  );
}

function AccountShell({ children }: { children: React.ReactNode }) {
  return (
    <main className="max-w-[var(--container-emma)] mx-auto px-6 py-12 sm:py-16 lg:py-20 w-full">
      <header className="mb-8">
        <p className="text-accent font-semibold text-sm uppercase tracking-widest mb-2">
          Your space
        </p>
        <h1 className="font-display text-3xl md:text-4xl text-navy font-bold">
          My Account
        </h1>
      </header>
      {children}
    </main>
  );
}
