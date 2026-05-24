"use client";

import { useEffect, useMemo, useState } from "react";
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
import { customerSchema, type CustomerInput } from "@/lib/schemas";
import { initiatePayment, verifyPayment } from "@/lib/api";
import { useUser } from "@/lib/hooks/useUser";
import { recordOrder } from "@/lib/supabase/account";
import { Spinner } from "@/components/ui/Spinner";
import Link from "next/link";

type Step = "review" | "details" | "payment" | "success";

const STEPS: { id: Step; label: string }[] = [
  { id: "review", label: "Review" },
  { id: "details", label: "Details" },
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
    PaystackPop?: {
      setup: (options: Record<string, unknown>) => { openIframe: () => void };
    };
  }
}

export default function CheckoutModal() {
  const open = useCartUi((s) => s.checkoutOpen);
  const setOpen = useCartUi((s) => s.setCheckoutOpen);
  const setCartOpen = useCartUi((s) => s.setCartOpen);
  const items = useCart((s) => s.items);
  const total = useCart((s) => s.total());
  const removeItem = useCart((s) => s.remove);
  const clearCart = useCart((s) => s.clear);
  const hydrated = useHasHydrated();
  const { user } = useUser();

  /* Prefill the details step from the signed-in account. Phone isn't
     collected at signup, so it stays blank for the user to fill. */
  const prefill = useMemo<CustomerInput>(() => {
    const fullName =
      (user?.user_metadata?.full_name as string | undefined)?.trim() ?? "";
    const parts = fullName ? fullName.split(/\s+/) : [];
    return {
      firstName: parts[0] ?? "",
      lastName: parts.slice(1).join(" "),
      email: user?.email ?? "",
      phone: "",
    };
  }, [user]);

  const [step, setStep] = useState<Step>("review");
  const [customer, setCustomer] = useState<CustomerInput | null>(null);
  const [txRef, setTxRef] = useState<string | null>(null);
  const [method, setMethod] = useState("card");
  const [error, setError] = useState("");

  useEffect(() => {
    // Reset the wizard whenever the modal (re)opens. `open` is an
    // external trigger, so resetting the transient step state here is
    // intentional rather than a render-derivable value.
    if (open) {
      /* eslint-disable react-hooks/set-state-in-effect */
      setStep("review");
      setCustomer(null);
      setTxRef(null);
      setMethod("card");
      setError("");
      /* eslint-enable react-hooks/set-state-in-effect */
    }
  }, [open]);

  /* Single transition point so every step change also clears any stale
     error banner from the previous step (e.g. a failed payment). */
  const goTo = (s: Step) => {
    setError("");
    setStep(s);
  };

  if (!hydrated) return null;

  return (
    <Dialog.Root open={open} onOpenChange={setOpen} modal={false}>
      <Dialog.Portal>
        {/* modal=false so the Paystack inline iframe (rendered at body level)
            still receives clicks — Radix's default focus/pointer trap blocks
            Paystack's test-mode helper buttons otherwise. */}
        <Dialog.Overlay className="fixed inset-0 bg-navy/60 backdrop-blur-sm z-50 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out data-[state=open]:fade-in" />
        <Dialog.Content className="fixed left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-50 w-[92vw] max-w-2xl bg-white rounded-2xl shadow-lg p-8 md:p-10 max-h-[92vh] overflow-y-auto">
          <Dialog.Close asChild>
            <button
              aria-label="Close"
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-bg-soft text-ink hover:bg-surface hover:rotate-90 transition-all flex items-center justify-center"
            >
              <i className="fas fa-times text-sm" aria-hidden />
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
              onRemove={removeItem}
              onEdit={() => {
                setOpen(false);
                setCartOpen(true);
              }}
              onNext={() => {
                if (items.length === 0)
                  return setError("Your basket is empty.");
                goTo("details");
              }}
            />
          )}
          {step === "details" && (
            <DetailsStep
              initial={customer ?? prefill}
              onBack={() => goTo("review")}
              onSubmit={(values) => {
                setCustomer(values);
                goTo("payment");
              }}
            />
          )}
          {step === "payment" && customer && (
            <PaymentStep
              customer={customer}
              items={items}
              total={total}
              method={method}
              onMethodChange={setMethod}
              onBack={() => goTo("details")}
              onSuccess={(ref) => {
                setError("");
                setTxRef(ref);
                // Best-effort order history for signed-in users; never
                // blocks the success screen.
                void recordOrder({
                  reference: ref,
                  items: items.map(({ id, name, price }) => ({
                    id,
                    name,
                    price,
                  })),
                  total,
                  currency: "NGN",
                });
                clearCart();
                setStep("success");
              }}
              onError={setError}
            />
          )}
          {step === "success" && (
            <SuccessStep
              txRef={txRef}
              signedIn={!!user}
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
  onRemove,
  onEdit,
  onNext,
}: {
  items: { id: string; name: string; price: number }[];
  total: number;
  onRemove: (id: string) => void;
  onEdit: () => void;
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
            <li key={i.id} className="flex items-center gap-3 py-3">
              <span className="flex-1 min-w-0 font-medium text-navy truncate">
                {i.name}
              </span>
              <span className="text-accent font-semibold">
                {formatPrice(i.price)}
              </span>
              <button
                type="button"
                onClick={() => onRemove(i.id)}
                aria-label={`Remove ${i.name}`}
                className="w-8 h-8 rounded-full bg-bg-soft text-ink-muted hover:bg-danger hover:text-white transition-colors flex items-center justify-center shrink-0"
              >
                <i className="fas fa-trash text-xs" aria-hidden />
              </button>
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
      <div className="flex flex-wrap items-center justify-between gap-3">
        <button
          type="button"
          onClick={onEdit}
          className="text-sm text-ink-muted hover:text-navy"
        >
          <i className="fas fa-pen text-xs mr-1.5" aria-hidden />
          Edit basket
        </button>
        <button
          type="button"
          onClick={onNext}
          disabled={items.length === 0}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          Continue <i className="fas fa-arrow-right" aria-hidden />
        </button>
      </div>
    </div>
  );
}

function DetailsStep({
  initial,
  onBack,
  onSubmit,
}: {
  initial: CustomerInput;
  onBack: () => void;
  onSubmit: (values: CustomerInput) => void;
}) {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CustomerInput>({
    resolver: zodResolver(customerSchema),
    // Reactive: syncs once the signed-in user resolves after mount.
    values: initial,
  });

  const field =
    "w-full px-4 py-3 rounded-xl border border-border-soft bg-white focus:outline-none focus:border-accent transition-colors";

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
            placeholder="0801 234 5678"
            className={field}
          />
          {errors.phone && (
            <span className="block text-xs text-danger mt-1">
              {errors.phone.message}
            </span>
          )}
        </label>
      </div>
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {isSubmitting ? (
            <>
              Continuing… <Spinner />
            </>
          ) : (
            <>
              Continue to payment <i className="fas fa-arrow-right" aria-hidden />
            </>
          )}
        </button>
      </div>
    </form>
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
    const publicKey = process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY;

    if (!publicKey || typeof window.PaystackPop?.setup !== "function") {
      // Fallback for local dev without a Paystack key — verify directly.
      const v = await verifyPayment({
        reference: txRef,
        expected_amount: total,
        expected_currency: "NGN",
        dev: true,
      });
      setSubmitting(false);
      if (!v.ok) onError(v.message);
      else onSuccess(txRef);
      return;
    }

    const channels =
      method === "card"
        ? ["card"]
        : method === "transfer"
          ? ["bank_transfer"]
          : method === "ussd"
            ? ["ussd"]
            : ["card", "bank_transfer", "ussd"];

    const handler = window.PaystackPop.setup({
      key: publicKey,
      email: customer.email,
      amount: Math.round(total * 100), // NGN → kobo
      currency: "NGN",
      ref: txRef,
      channels,
      firstname: customer.firstName,
      lastname: customer.lastName,
      phone: customer.phone,
      metadata: {
        custom_fields: [
          {
            display_name: "Phone",
            variable_name: "phone",
            value: customer.phone,
          },
          {
            display_name: "Items",
            variable_name: "items",
            value: items.map((i) => i.name).join(", "),
          },
        ],
      },
      callback: (response: { reference: string }) => {
        verifyPayment({
          reference: response.reference,
          expected_amount: total,
          expected_currency: "NGN",
        }).then((v) => {
          setSubmitting(false);
          if (!v.ok) onError(v.message);
          else onSuccess(txRef);
        });
      },
      onClose: () => setSubmitting(false),
    });
    handler.openIframe();
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
        aria-label="Payment method"
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
        >
          {submitting ? (
            <>
              Processing… <Spinner />
            </>
          ) : (
            <>
              Pay {formatPrice(total)} <i className="fas fa-lock" aria-hidden />
            </>
          )}
        </button>
      </div>
    </div>
  );
}

function SuccessStep({
  txRef,
  signedIn,
  onClose,
}: {
  txRef: string | null;
  signedIn: boolean;
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
      <div className="flex flex-wrap items-center justify-center gap-3">
        {signedIn && (
          <Link
            href="/account"
            onClick={onClose}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full bg-navy text-white font-semibold hover:bg-accent transition-colors"
          >
            View order history <i className="fas fa-arrow-right" aria-hidden />
          </Link>
        )}
        <button
          type="button"
          onClick={onClose}
          className={clsx(
            "inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold transition-colors",
            signedIn
              ? "border-2 border-navy text-navy hover:bg-navy hover:text-white"
              : "bg-navy text-white hover:bg-accent",
          )}
        >
          Close
        </button>
      </div>
    </div>
  );
}
