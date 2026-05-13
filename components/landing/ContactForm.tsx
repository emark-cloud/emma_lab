"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema, type ContactInput } from "@/lib/schemas";
import { submitContact } from "@/lib/api";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";

export default function ContactForm() {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<ContactInput>({ resolver: zodResolver(contactSchema) });
  const [serverError, setServerError] = useState("");
  const [success, setSuccess] = useState(false);

  async function onSubmit(values: ContactInput) {
    setServerError("");
    const result = await submitContact(values);
    if (result.ok) {
      setSuccess(true);
      reset();
    } else {
      setServerError(result.message);
    }
  }

  const field =
    "w-full px-4 py-3 rounded-xl border border-border-soft bg-white focus:outline-none focus:border-accent transition-colors";

  return (
    <section id="message" className="py-20">
      <div className="max-w-3xl mx-auto px-6" data-reveal="up">
        <SectionHeader
          eyebrow="We'd Love to Hear From You"
          title="Send Us a Message"
          description="You can reach us anytime."
          align="center"
        />

        {success ? (
          <div className="bg-white rounded-2xl shadow-sm p-10 text-center">
            <div className="w-14 h-14 mx-auto rounded-full bg-teal/15 text-teal flex items-center justify-center text-2xl mb-4">
              <i className="fas fa-check" aria-hidden />
            </div>
            <h3 className="font-display text-2xl text-navy font-bold mb-2">
              Message Sent!
            </h3>
            <p className="text-ink-body mb-6">
              Thank you for reaching out. Our team will get back to you within
              24 hours.
            </p>
            <Button
              type="button"
              variant="outline-navy"
              onClick={() => setSuccess(false)}
            >
              Send Another
            </Button>
          </div>
        ) : (
          <form
            onSubmit={handleSubmit(onSubmit)}
            noValidate
            className="bg-white rounded-2xl shadow-sm p-8 md:p-10 space-y-5"
          >
            <div className="grid sm:grid-cols-2 gap-5">
              <Field
                label="Last Name"
                error={errors.lastName?.message}
                input={
                  <input
                    {...register("lastName")}
                    type="text"
                    placeholder="e.g. Okafor"
                    autoComplete="family-name"
                    className={field}
                  />
                }
              />
              <Field
                label="Your Email"
                error={errors.email?.message}
                input={
                  <input
                    {...register("email")}
                    type="email"
                    placeholder="you@example.com"
                    autoComplete="email"
                    className={field}
                  />
                }
              />
              <Field
                label="First Name"
                error={errors.firstName?.message}
                input={
                  <input
                    {...register("firstName")}
                    type="text"
                    placeholder="e.g. Emeka"
                    autoComplete="given-name"
                    className={field}
                  />
                }
              />
              <Field
                label="Phone Number"
                error={errors.phone?.message}
                input={
                  <input
                    {...register("phone")}
                    type="tel"
                    placeholder="+234 800 000 0000"
                    autoComplete="tel"
                    className={field}
                  />
                }
              />
            </div>
            <Field
              label="How can we help?"
              error={errors.message?.message}
              input={
                <textarea
                  {...register("message")}
                  rows={5}
                  placeholder="Tell us about your inquiry or what test you'd like to book…"
                  className={field}
                />
              }
            />
            {serverError && (
              <p className="text-sm text-danger" role="alert">
                {serverError}
              </p>
            )}
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "Sending…" : "Submit"}{" "}
              <i className="fas fa-arrow-right" aria-hidden />
            </Button>
          </form>
        )}
      </div>
    </section>
  );
}

function Field({
  label,
  input,
  error,
}: {
  label: string;
  input: React.ReactNode;
  error?: string;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy mb-1.5">
        {label}
      </span>
      {input}
      {error && (
        <span className="block text-xs text-danger mt-1" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
