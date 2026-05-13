"use client";

import { useState } from "react";
import { subscribeNewsletter } from "@/lib/api";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "sending" | "ok" | "error">(
    "idle",
  );
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    const val = email.trim();
    setError("");
    if (!val) return setError("Please enter your email address.");
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val))
      return setError("Please enter a valid email address.");

    setStatus("sending");
    const result = await subscribeNewsletter(val);
    if (result.ok) {
      setStatus("ok");
      setEmail("");
      setTimeout(() => setStatus("idle"), 3500);
    } else {
      setStatus("error");
      setError(result.message);
    }
  }

  return (
    <form onSubmit={onSubmit} noValidate className="w-full max-w-md">
      <div className="flex items-stretch bg-white/10 rounded-full overflow-hidden border border-white/15 focus-within:border-accent transition-colors">
        <input
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            if (error) setError("");
          }}
          placeholder="Email"
          autoComplete="email"
          aria-label="Email address"
          className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={status === "sending"}
          className="px-5 py-3 bg-accent text-white text-sm font-semibold hover:bg-navy transition-colors disabled:opacity-60"
        >
          {status === "sending" ? (
            <i className="fas fa-spinner fa-spin" aria-hidden />
          ) : status === "ok" ? (
            <>
              <i className="fas fa-check" aria-hidden /> Subscribed
            </>
          ) : (
            <>
              <i className="fas fa-arrow-right" aria-hidden /> Submit
            </>
          )}
        </button>
      </div>
      {error && (
        <p className="mt-2 text-xs text-danger" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
