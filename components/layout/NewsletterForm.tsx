"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { newsletterSchema } from "@/lib/schemas";
import { subscribeNewsletter } from "@/lib/api";
import { useToast } from "@/lib/toast-store";
import { Spinner } from "@/components/ui/Spinner";

type NewsletterInput = z.infer<typeof newsletterSchema>;

export default function NewsletterForm() {
  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<NewsletterInput>({ resolver: zodResolver(newsletterSchema) });
  const showToast = useToast((s) => s.show);

  async function onSubmit({ email }: NewsletterInput) {
    const result = await subscribeNewsletter(email);
    if (result.ok) {
      reset();
      showToast("Subscribed — thank you!", "success");
    } else {
      setError("email", { message: result.message });
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="w-full max-w-md"
    >
      <div className="flex items-stretch bg-white/10 rounded-full overflow-hidden border border-white/15 focus-within:border-accent transition-colors">
        <input
          {...register("email")}
          type="email"
          placeholder="Email"
          autoComplete="email"
          aria-label="Email address"
          className="flex-1 bg-transparent px-5 py-3 text-sm text-white placeholder:text-white/50 focus:outline-none"
        />
        <button
          type="submit"
          disabled={isSubmitting}
          className="px-5 py-3 bg-accent text-white text-sm font-semibold hover:bg-navy transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <Spinner label="Subscribing…" />
          ) : (
            <>
              <i className="fas fa-arrow-right" aria-hidden /> Submit
            </>
          )}
        </button>
      </div>
      {errors.email && (
        <p className="mt-2 text-xs text-danger" role="alert">
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
