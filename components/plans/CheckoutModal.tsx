"use client";

import { useEffect, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import * as RadioGroup from "@radix-ui/react-radio-group";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import {
  useCart,
  useCartUi,
  useHasHydrated,
} from "@/lib/cart-store";
import { formatPrice } from "@/lib/format";
import {
  customerSchema,
  otpSchema,
  type CustomerInput,
} from "@/lib/schemas";
import {
  sendOtp,
  verifyOtp,
  initiatePayment,
  verifyPayment,
} from "@/lib/api";
import { useOtpTimer } from "@/lib/hooks/useOtpTimer";

type Step = "review" | "details" | "otp" | "payment" | "success";

const STEPS: { id: Step; label: string }[] = [
  { id: "review", label: "Review" },
  { id: "details", label: "Details" },
  { id: "otp", label: "Verify" },
  { id: "payment", label: "Pay" },
  { id: "success", label: "Done" },
];

const PAYMENT_METHODS = [
  { id: "card", label: "Credit / Debit Card", icon: "fas fa-credit-card" },
  { id: "transfer", label: "Bank Transfer", icon: "fas fa-university" },
  { id: "ussd", label: "USSD", icon: "fas fa-mobile-alt" },
];

declare global {
  interface Window {
    FlutterwaveCheckout?: (options: Record<string, unknown>) => void;
  }
}

export default function CheckoutModal() {
  const open = useCartUi((s) => s.checkoutOpen);
  const setOpen = useCartUi((s) => s.setCheckoutOpen);
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const clearCart = useCart((s) => s.clear);
  const hydrated = useHasHydrated();

  const [step, setStep] = useState<Step>("review");
  const [customer, setCustomer] = useState<CustomerInput | null>(null);
  const [txRef, setTxRef] = useState<string | null>(null);
  const [method, setMethod] = useState("card");
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setStep("review");
      setCustomer(null);
      setTxRef(null);
      setMethod("card");
      setError("");
    }
  }, [open]);

  if (!hydrated) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-navy/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[94vw] max-w-2xl bg-white rounded-2xl shadow-lg p-6 md:p-8 max-h-[92vh] overflow-y-auto">
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-bg-soft text-ink hover:bg-surface hover:rotate-90 transition-all flex items-center justify-center"
            >
              <i className="fas fa-times" aria-hidden />
            </button>
          </Dialog.Close>

          <Dialog.Title className="font-display text-2xl text-navy font-bold">
            Checkout
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Complete your wellness bundle purchase
          </Dialog.Description>

          <StepBar current={step} />

          {error && (
            <p
              role="alert"
              className="mt-3 text-sm text-danger bg-danger/10 rounded-lg px-3 py-2"
            >
              {error}
            </p>
          )}

          {step === "review" && (
            <ReviewStep
              items={items}
              total={total}
              onNext={() => {
                if (items.length === 0)
                  return setError("Your basket is empty.");
                setError("");
                setStep("details");
              }}
            />
          )}
          {step === "details" && (
            <DetailsStep
              onBack={() => setStep("review")}
              onSubmit={async (values) => {
                setError("");
                setCustomer(values);
                const r = await sendOtp(
                  values.email,
                  `${values.firstName} ${values.lastName}`,
                );
                if (!r.ok) {
                  setError(r.message);
                  return;
                }
                setStep("otp");
              }}
            />
          )}
          {step === "otp" && customer && (
            <OtpStep
              email={customer.email}
              name={`${customer.firstName} ${customer.lastName}`}
              onBack={() => setStep("details")}
              onSuccess={() => {
                setError("");
                setStep("payment");
              }}
              onError={setError}
            />
          )}
          {step === "payment" && customer && (
            <PaymentStep
              customer={customer}
              items={items}
              total={total}
              method={method}
              onMethodChange={setMethod}
              onBack={() => setStep("otp")}
              onSuccess={(ref) => {
                setError("");
                setTxRef(ref);
                clearCart();
                setStep("success");
              }}
              onError={setError}
            />
          )}
          {step === "success" && (
            <SuccessStep
              txRef={txRef}
              onClose={() => setOpen(false)}
            />
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

function StepBar({ current }: { current: Step }) {
  const currentIdx = STEPS.findIndex((s) => s.id === current);
  return (
    <ol className="flex items-center gap-2 mt-5 mb-6 text-xs font-medium overflow-x-auto">
      {STEPS.map((s, i) => {
        const done = i < currentIdx;
        const isCurrent = i === currentIdx;
        return (
          <li key={s.id} className="flex items-center gap-2">
            <span
              className={clsx(
                "w-6 h-6 rounded-full flex items-center justify-center text-[11px] font-bold",
                done
                  ? "bg-teal text-white"
                  : isCurrent
                    ? "bg-navy text-white"
                    : "bg-bg-muted text-ink-muted",
              )}
            >
              {done ? <i className="fas fa-check" aria-hidden /> : i + 1}
            </span>
            <span
              className={clsx(
                "uppercase tracking-wider",
                isCurrent ? "text-navy" : "text-ink-muted",
              )}
            >
              {s.label}
            </span>
            {i < STEPS.length - 1 && (
              <i
                className="fas fa-chevron-right text-[10px] text-ink-muted/40 mx-1"
                aria-hidden
              />
            )}
          </li>
        );
      })}
    </ol>
  );
}

function ReviewStep({
  items,
  total,
  onNext,
}: {
  items: { id: string; name: string; price: number }[];
  total: number;
  onNext: () => void;
}) {
  return (
    <div>
      {items.length === 0 ? (
        <p className="text-ink-body">
          Your basket is empty. Close this modal and add a bundle to continue.
        </p>
      ) : (
        <ul className="divide-y divide-border-soft mb-5">
          {items.map((i) => (
            <li key={i.id} className="flex items-center justify-between py-3">
              <span className="font-medium text-navy">{i.name}</span>
              <span className="text-accent font-semibold">
                {formatPrice(i.price)}
              </span>
            </li>
          ))}
        </ul>
      )}
      <div className="flex items-center justify-between bg-bg-soft rounded-xl px-4 py-3 mb-5">
        <span className="text-sm text-ink-muted">Total</span>
        <strong className="font-display text-2xl text-navy">
          {formatPrice(total)}
        </strong>
      </div>
      <button
        type="button"
        onClick={onNext}
        disabled={items.length === 0}
        className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors disabled:opacity-60"
      >
        Continue <i className="fas fa-arrow-right" aria-hidden />
      </button>
    </div>
  );
}

function DetailsStep({
  onBack,
  onSubmit,
}: {
  onBack: () => void;
  onSubmit: (values: CustomerInput) => Promise<void>;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerInput>({ resolver: zodResolver(customerSchema) });

  const field =
    "w-full px-4 py-3 rounded-xl border border-border-soft bg-bg-soft focus:outline-none focus:border-accent transition-colors";

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-4">
      <div className="grid sm:grid-cols-2 gap-4">
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">
            First name
          </span>
          <input
            {...register("firstName")}
            type="text"
            autoComplete="given-name"
            className={field}
          />
          {errors.firstName && (
            <span className="block text-xs text-danger mt-1">
              {errors.firstName.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">
            Last name
          </span>
          <input
            {...register("lastName")}
            type="text"
            autoComplete="family-name"
            className={field}
          />
          {errors.lastName && (
            <span className="block text-xs text-danger mt-1">
              {errors.lastName.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">
            Email
          </span>
          <input
            {...register("email")}
            type="email"
            autoComplete="email"
            className={field}
          />
          {errors.email && (
            <span className="block text-xs text-danger mt-1">
              {errors.email.message}
            </span>
          )}
        </label>
        <label className="block">
          <span className="block text-sm font-medium text-navy mb-1.5">
            Phone
          </span>
          <input
            {...register("phone")}
            type="tel"
            autoComplete="tel"
            className={field}
          />
          {errors.phone && (
            <span className="block text-xs text-danger mt-1">
              {errors.phone.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex items-center justify-between gap-3 pt-2">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink-muted hover:text-navy"
        >
          ← Back
        </button>
        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors disabled:opacity-60"
        >
          {isSubmitting ? "Sending OTP…" : "Send OTP"}{" "}
          <i className="fas fa-paper-plane" aria-hidden />
        </button>
      </div>
    </form>
  );
}

function OtpStep({
  email,
  name,
  onBack,
  onSuccess,
  onError,
}: {
  email: string;
  name: string;
  onBack: () => void;
  onSuccess: () => void;
  onError: (msg: string) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<{ otp: string }>({ resolver: zodResolver(otpSchema) });
  const { secondsLeft, start, canResend } = useOtpTimer(60);

  useEffect(() => {
    start(60);
  }, [start]);

  async function onResend() {
    onError("");
    const r = await sendOtp(email, name, true);
    if (!r.ok) onError(r.message);
    else start(60);
  }

  async function onVerify({ otp }: { otp: string }) {
    onError("");
    const r = await verifyOtp(email, otp);
    if (!r.ok) {
      onError(r.message);
      return;
    }
    onSuccess();
  }

  return (
    <div>
      <p className="text-ink-body text-sm mb-5">
        We sent a 6-digit code to <strong className="text-navy">{email}</strong>
        . Enter it below to verify your identity.
      </p>
      <form onSubmit={handleSubmit(onVerify)} noValidate className="space-y-4">
        <input
          {...register("otp")}
          inputMode="numeric"
          maxLength={6}
          autoComplete="one-time-code"
          placeholder="••••••"
          className="w-full text-center font-mono text-2xl tracking-[0.5em] px-4 py-4 rounded-xl border border-border-soft bg-bg-soft focus:outline-none focus:border-accent transition-colors"
        />
        {errors.otp && (
          <p className="text-xs text-danger" role="alert">
            {errors.otp.message}
          </p>
        )}

        <div className="flex items-center justify-between gap-3">
          <button
            type="button"
            onClick={onBack}
            className="text-sm text-ink-muted hover:text-navy"
          >
            ← Back
          </button>
          <button
            type="submit"
            disabled={isSubmitting}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors disabled:opacity-60"
          >
            {isSubmitting ? "Verifying…" : "Verify OTP"}{" "}
            <i className="fas fa-check" aria-hidden />
          </button>
        </div>
      </form>
      <p className="text-xs text-ink-muted mt-5 text-center">
        {canResend ? (
          <button
            type="button"
            onClick={onResend}
            className="text-accent font-semibold hover:underline"
          >
            Resend code
          </button>
        ) : (
          <>Resend available in {secondsLeft}s</>
        )}
      </p>
    </div>
  );
}

function PaymentStep({
  customer,
  items,
  total,
  method,
  onMethodChange,
  onBack,
  onSuccess,
  onError,
}: {
  customer: CustomerInput;
  items: { id: string; name: string; price: number }[];
  total: number;
  method: string;
  onMethodChange: (id: string) => void;
  onBack: () => void;
  onSuccess: (txRef: string) => void;
  onError: (msg: string) => void;
}) {
  const [submitting, setSubmitting] = useState(false);

  async function onPay() {
    onError("");
    setSubmitting(true);

    const init = await initiatePayment({
      email: customer.email,
      name: `${customer.firstName} ${customer.lastName}`,
      phone: customer.phone,
      amount: total,
      currency: "NGN",
      items: items.map(({ name, price }) => ({ name, price })),
    });

    if (!init.ok) {
      setSubmitting(false);
      onError(init.message);
      return;
    }

    const txRef = init.data.txRef;
    const publicKey = process.env.NEXT_PUBLIC_FLW_PUBLIC_KEY;

    if (!publicKey || typeof window.FlutterwaveCheckout !== "function") {
      // Fallback for local dev without Flutterwave script — verify directly.
      const v = await verifyPayment({
        transaction_id: `dev-${Date.now()}`,
        tx_ref: txRef,
        expected_amount: total,
        expected_currency: "NGN",
      });
      setSubmitting(false);
      if (!v.ok) onError(v.message);
      else onSuccess(txRef);
      return;
    }

    window.FlutterwaveCheckout({
      public_key: publicKey,
      tx_ref: txRef,
      amount: total,
      currency: "NGN",
      payment_options: method === "card" ? "card" : method,
      customer: {
        email: customer.email,
        phone_number: customer.phone,
        name: `${customer.firstName} ${customer.lastName}`,
      },
      customizations: {
        title: "Emma Lab",
        description: items.map((i) => i.name).join(", "),
        logo: "/images/Emma Logo.png",
      },
      callback: async (data: { transaction_id?: string }) => {
        const v = await verifyPayment({
          transaction_id: data.transaction_id ?? "",
          tx_ref: txRef,
          expected_amount: total,
          expected_currency: "NGN",
        });
        setSubmitting(false);
        if (!v.ok) onError(v.message);
        else onSuccess(txRef);
      },
      onclose: () => setSubmitting(false),
    });
  }

  return (
    <div>
      <p className="text-sm text-ink-body mb-3">
        Total due:{" "}
        <strong className="text-navy">{formatPrice(total)}</strong>
      </p>
      <RadioGroup.Root
        value={method}
        onValueChange={onMethodChange}
        className="grid sm:grid-cols-3 gap-3 mb-6"
      >
        {PAYMENT_METHODS.map((m) => (
          <RadioGroup.Item
            key={m.id}
            value={m.id}
            className="bg-white border border-border-soft rounded-xl p-4 text-left data-[state=checked]:border-accent data-[state=checked]:bg-accent-light flex flex-col items-start gap-2 transition-colors"
          >
            <i className={`${m.icon} text-accent text-lg`} aria-hidden />
            <span className="text-sm font-semibold text-navy">{m.label}</span>
            <RadioGroup.Indicator className="absolute" />
          </RadioGroup.Item>
        ))}
      </RadioGroup.Root>

      <div className="flex items-center justify-between gap-3">
        <button
          type="button"
          onClick={onBack}
          className="text-sm text-ink-muted hover:text-navy"
        >
          ← Back
        </button>
        <button
          type="button"
          onClick={onPay}
          disabled={submitting}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors disabled:opacity-60"
        >
          {submitting ? "Processing…" : `Pay ${formatPrice(total)}`}{" "}
          <i className="fas fa-lock" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function SuccessStep({
  txRef,
  onClose,
}: {
  txRef: string | null;
  onClose: () => void;
}) {
  return (
    <div className="text-center py-8">
      <div className="w-16 h-16 mx-auto rounded-full bg-teal/15 text-teal flex items-center justify-center text-2xl mb-4">
        <i className="fas fa-check" aria-hidden />
      </div>
      <h3 className="font-display text-2xl text-navy font-bold mb-2">
        Payment received
      </h3>
      <p className="text-ink-body mb-2">
        We&apos;ve emailed your receipt. Our team will reach out to confirm
        your appointment within 24 hours.
      </p>
      {txRef && (
        <p className="text-xs text-ink-muted mb-6">
          Reference: <code className="font-mono">{txRef}</code>
        </p>
      )}
      <button
        type="button"
        onClick={onClose}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors"
      >
        Close
      </button>
    </div>
  );
}
