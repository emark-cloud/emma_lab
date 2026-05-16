"use client";

import { useState } from "react";
import { useForm, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  signInSchema,
  signUpSchema,
  type SignUpInput,
} from "@/lib/schemas";
import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { Modal } from "@/components/ui/Modal";
import { Button } from "@/components/ui/Button";

type Mode = "signin" | "signup";

const field =
  "w-full px-4 py-3 rounded-xl border border-border-soft bg-white focus:outline-none focus:border-accent transition-colors";

export default function AuthModal({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const [mode, setMode] = useState<Mode>("signin");

  return (
    <Modal
      open={open}
      onOpenChange={(v) => {
        onOpenChange(v);
        if (!v) setMode("signin");
      }}
      size="sm"
      title={mode === "signin" ? "Welcome back" : "Create your account"}
      description={
        mode === "signin"
          ? "Sign in to manage your bookings and wellness plans."
          : "Sign up to track your bookings and saved wellness plans."
      }
    >
      {/* Re-mount the form when the mode flips so RHF state resets cleanly. */}
      <AuthForm
        key={mode}
        mode={mode}
        onSwitch={() => setMode(mode === "signin" ? "signup" : "signin")}
        onDone={() => onOpenChange(false)}
      />
    </Modal>
  );
}

function AuthForm({
  mode,
  onSwitch,
  onDone,
}: {
  mode: Mode;
  onSwitch: () => void;
  onDone: () => void;
}) {
  const isSignup = mode === "signup";
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<SignUpInput>({
    // signin has no fullName field; the unknown cast bridges the two schemas.
    resolver: zodResolver(
      isSignup ? signUpSchema : signInSchema,
    ) as unknown as Resolver<SignUpInput>,
  });
  const [serverError, setServerError] = useState("");
  const [checkEmail, setCheckEmail] = useState(false);

  async function onSubmit(values: SignUpInput) {
    setServerError("");
    if (!isSupabaseConfigured) {
      setServerError(
        "Authentication isn't configured yet. Add the Supabase keys to .env.local.",
      );
      return;
    }
    const supabase = createClient();

    if (isSignup) {
      const { data, error } = await supabase.auth.signUp({
        email: values.email,
        password: values.password,
        options: {
          data: { full_name: values.fullName },
          emailRedirectTo:
            typeof window !== "undefined" ? window.location.origin : undefined,
        },
      });
      if (error) {
        setServerError(error.message);
        return;
      }
      // No session means email confirmation is required.
      if (!data.session) {
        setCheckEmail(true);
        return;
      }
      onDone();
      return;
    }

    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (error) {
      setServerError(error.message);
      return;
    }
    onDone();
  }

  if (checkEmail) {
    return (
      <div className="text-center py-4">
        <div className="w-14 h-14 mx-auto rounded-full bg-teal/15 text-teal flex items-center justify-center text-2xl mb-4">
          <i className="fas fa-envelope" aria-hidden />
        </div>
        <h3 className="font-display text-xl text-navy font-bold mb-2">
          Confirm your email
        </h3>
        <p className="text-ink-body text-sm">
          We sent a confirmation link to your inbox. Click it to activate your
          account, then sign in.
        </p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      noValidate
      className="space-y-4 mt-2"
    >
      {isSignup && (
        <Field label="Full name" error={errors.fullName?.message}>
          <input
            {...register("fullName")}
            type="text"
            placeholder="e.g. Emeka Okafor"
            autoComplete="name"
            className={field}
          />
        </Field>
      )}
      <Field label="Email" error={errors.email?.message}>
        <input
          {...register("email")}
          type="email"
          placeholder="you@example.com"
          autoComplete="email"
          className={field}
        />
      </Field>
      <Field label="Password" error={errors.password?.message}>
        <input
          {...register("password")}
          type="password"
          placeholder="••••••••"
          autoComplete={isSignup ? "new-password" : "current-password"}
          className={field}
        />
      </Field>

      {serverError && (
        <p className="text-sm text-danger" role="alert">
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={isSubmitting} className="w-full">
        {isSubmitting
          ? "Please wait…"
          : isSignup
            ? "Create account"
            : "Sign in"}
      </Button>

      <p className="text-sm text-center text-ink-body">
        {isSignup ? "Already have an account?" : "New to Emma Lab?"}{" "}
        <button
          type="button"
          onClick={onSwitch}
          className="text-accent font-semibold hover:underline"
        >
          {isSignup ? "Sign in" : "Create an account"}
        </button>
      </p>
    </form>
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
