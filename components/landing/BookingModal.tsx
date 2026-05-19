"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";
import { Spinner } from "@/components/ui/Spinner";
import { TEST_OPTIONS } from "@/lib/landing-data";
import { bookingSchema, type BookingInput } from "@/lib/schemas";
import { useToast } from "@/lib/toast-store";

export default function BookingModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<BookingInput>({
    resolver: zodResolver(bookingSchema),
    defaultValues: { fullName: "", phone: "", testType: "", preferredDate: "" },
  });
  const showToast = useToast((s) => s.show);
  const [submitted, setSubmitted] = useState(false);

  // No booking endpoint exists yet (see lib/api.ts) — this stays a validated
  // client-only confirmation. Wire to a real route once the backend adds one.
  function onSubmit() {
    setSubmitted(true);
    showToast("Booking received", "success");
  }

  function close() {
    onOpenChange(false);
    setSubmitted(false);
    reset();
  }

  const field =
    "w-full px-4 py-3 rounded-xl border border-border-soft bg-white focus:outline-none focus:border-accent transition-colors";

  return (
    <Modal
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) {
          setSubmitted(false);
          reset();
        }
      }}
      title="Book a Diagnostic Test"
      description="Fill in the form below and our team will get in touch."
    >
      {submitted ? (
        <div className="text-center py-10">
          <div className="w-14 h-14 mx-auto rounded-full bg-teal/15 text-teal flex items-center justify-center text-2xl mb-4">
            <i className="fas fa-check" aria-hidden />
          </div>
          <h3 className="font-display text-xl text-navy font-semibold">
            Booking received
          </h3>
          <p className="text-ink-body mt-1 mb-6">
            We&apos;ll be in touch within 24 hours.
          </p>
          <Button type="button" onClick={close}>
            Done
          </Button>
        </div>
      ) : (
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="space-y-4"
          noValidate
        >
          <div className="grid sm:grid-cols-2 gap-4">
            <Field label="Full name" error={errors.fullName?.message}>
              <input
                {...register("fullName")}
                type="text"
                placeholder="e.g. Emeka Okafor"
                autoComplete="name"
                className={field}
              />
            </Field>
            <Field label="Phone number" error={errors.phone?.message}>
              <input
                {...register("phone")}
                type="tel"
                placeholder="0801 234 5678"
                autoComplete="tel"
                className={field}
              />
            </Field>
          </div>
          <Field label="Test type" error={errors.testType?.message}>
            <select {...register("testType")} className={field}>
              <option value="">Select Test Type</option>
              {TEST_OPTIONS.map((t) => (
                <option key={t}>{t}</option>
              ))}
            </select>
          </Field>
          <Field label="Preferred date" error={errors.preferredDate?.message}>
            <input {...register("preferredDate")} type="date" className={field} />
          </Field>
          <Button type="submit" className="w-full" disabled={isSubmitting}>
            {isSubmitting ? (
              <Spinner label="Submitting…" />
            ) : (
              <>
                Confirm Booking <i className="fas fa-arrow-right" aria-hidden />
              </>
            )}
          </Button>
        </form>
      )}
    </Modal>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-sm font-medium text-navy mb-1.5">
        {label}
      </span>
      {children}
      {error && (
        <span className="block text-xs text-danger mt-1" role="alert">
          {error}
        </span>
      )}
    </label>
  );
}
