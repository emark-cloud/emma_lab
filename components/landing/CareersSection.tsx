"use client";

import Image from "next/image";
import { useState, useRef, useCallback } from "react";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { PERKS } from "@/lib/landing-data";

const POSITIONS = [
  "Medical Laboratory Scientist",
  "Medical Laboratory Technician",
  "Radiographer",
  "Radiology Technician",
  "Sonographer",
  "Nurse / Nursing Officer",
  "Medical Officer",
  "Front Desk / Customer Service",
  "Administrative Officer",
  "IT / Systems Support",
  "Accountant / Finance Officer",
  "Other (please specify in cover letter)",
];

type Status = "idle" | "loading" | "success" | "error";

export default function CareersSection() {
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    phone: "",
    position: "",
    coverLetter: "",
  });
  const [cv, setCv] = useState<File | null>(null);
  const [cvError, setCvError] = useState("");
  const [dragging, setDragging] = useState(false);
  const [status, setStatus] = useState<Status>("idle");
  const [serverMessage, setServerMessage] = useState("");
  const fileRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>,
  ) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  const ALLOWED = [
    "application/pdf",
    "application/msword",
    "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  ];

  const validateAndSetFile = useCallback((file: File | null | undefined) => {
    setCvError("");
    if (!file) return setCv(null);
    if (!ALLOWED.includes(file.type)) {
      setCvError("Only PDF or Word documents are accepted.");
      return setCv(null);
    }
    if (file.size > 5 * 1024 * 1024) {
      setCvError("File must be under 5 MB.");
      return setCv(null);
    }
    setCv(file);
  }, []);

  function handleFile(e: React.ChangeEvent<HTMLInputElement>) {
    validateAndSetFile(e.target.files?.[0]);
  }

  function handleDragOver(e: React.DragEvent) {
    e.preventDefault();
    setDragging(true);
  }

  function handleDragLeave(e: React.DragEvent) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) setDragging(false);
  }

  function handleDrop(e: React.DragEvent) {
    e.preventDefault();
    setDragging(false);
    validateAndSetFile(e.dataTransfer.files?.[0]);
    if (fileRef.current) fileRef.current.value = "";
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!cv) { setCvError("Please attach your CV or resume."); return; }
    setStatus("loading");
    setServerMessage("");

    const body = new FormData();
    Object.entries(form).forEach(([k, v]) => body.append(k, v));
    body.append("cv", cv);

    try {
      const res = await fetch("/api/apply", { method: "POST", body });
      const data = await res.json();
      if (res.ok) {
        setStatus("success");
        setForm({ fullName: "", email: "", phone: "", position: "", coverLetter: "" });
        setCv(null);
        if (fileRef.current) fileRef.current.value = "";
      } else {
        setStatus("error");
        setServerMessage(data.message ?? "Something went wrong. Please try again.");
      }
    } catch {
      setStatus("error");
      setServerMessage("Network error — please check your connection and try again.");
    }
  }

  const inputClass =
    "w-full rounded-sm border border-border-soft bg-white px-4 py-3 text-sm text-navy placeholder:text-ink-muted focus:outline-none focus:border-accent transition-colors";
  const labelClass = "block text-sm font-medium text-navy mb-1.5";

  return (
    <>
      {/* Perks / intro strip */}
      <section className="py-12 sm:py-16 bg-bg-soft">
        <div className="max-w-[var(--container-emma)] mx-auto px-6 grid lg:grid-cols-2 gap-12 items-center">
          <div data-reveal="left" className="relative">
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden shadow-lg">
              <Image
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?w=600&q=80"
                alt="Team collaboration"
                fill
                sizes="(min-width: 1024px) 45vw, 90vw"
                className="object-cover"
              />
            </div>
            <div className="absolute bottom-6 left-6 bg-white rounded-2xl px-5 py-3 flex items-center gap-3 shadow-md">
              <div className="w-10 h-10 rounded-full bg-accent-light text-accent flex items-center justify-center">
                <i className="fas fa-users" aria-hidden />
              </div>
              <span className="text-sm font-semibold text-navy">
                Join 80+ Professionals
              </span>
            </div>
          </div>

          <div data-reveal="right">
            <SectionHeader
              eyebrow="We're Hiring"
              title="Why Work With Us"
              description="Join a team where your potential is truly valued and your work makes a difference every day."
              className="mb-6"
            />
            <div className="grid grid-cols-2 gap-3">
              {PERKS.map((p) => (
                <div
                  key={p.label}
                  className="flex items-center gap-3 bg-white rounded-sm border border-border-soft px-4 py-3"
                >
                  <i className={`${p.icon} text-accent`} aria-hidden />
                  <span className="text-sm font-medium">{p.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Application form */}
      <section id="apply" className="py-14 sm:py-20">
        <div className="max-w-[var(--container-emma)] mx-auto px-6">
          <SectionHeader
            eyebrow="Apply Today"
            title="Submit Your Application"
            description="Fill in your details, attach your CV or resume, and we'll be in touch."
            align="center"
            className="mb-10"
          />

          {status === "success" ? (
            <div className="max-w-lg mx-auto text-center py-16 px-8 bg-accent-light/30 rounded-2xl border border-accent/20">
              <div className="w-16 h-16 rounded-full bg-accent/10 text-accent flex items-center justify-center mx-auto mb-4 text-2xl">
                <i className="fas fa-check-circle" aria-hidden />
              </div>
              <h3 className="font-display text-2xl font-bold text-navy mb-2">
                Application Received!
              </h3>
              <p className="text-ink-body mb-6">
                Thank you for applying. Our team will review your details and get back to you shortly.
              </p>
              <button
                onClick={() => setStatus("idle")}
                className="text-accent font-semibold text-sm underline-offset-2 hover:underline"
              >
                Submit another application
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8 sm:p-10 space-y-6"
            >
              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    required
                    placeholder="e.g. Amaka Okafor"
                    value={form.fullName}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="email" className={labelClass}>
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    placeholder="you@example.com"
                    value={form.email}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
              </div>

              <div className="grid sm:grid-cols-2 gap-5">
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    Phone Number <span className="text-accent">*</span>
                  </label>
                  <input
                    id="phone"
                    name="phone"
                    type="tel"
                    required
                    placeholder="0801 234 5678"
                    value={form.phone}
                    onChange={handleChange}
                    className={inputClass}
                  />
                </div>
                <div>
                  <label htmlFor="position" className={labelClass}>
                    Position of Interest <span className="text-accent">*</span>
                  </label>
                  <select
                    id="position"
                    name="position"
                    required
                    value={form.position}
                    onChange={handleChange}
                    className={inputClass}
                  >
                    <option value="">Select a role…</option>
                    {POSITIONS.map((p) => (
                      <option key={p} value={p}>{p}</option>
                    ))}
                  </select>
                </div>
              </div>

              <div>
                <label htmlFor="coverLetter" className={labelClass}>
                  Cover Letter <span className="text-accent">*</span>
                </label>
                <textarea
                  id="coverLetter"
                  name="coverLetter"
                  required
                  rows={5}
                  placeholder="Tell us about yourself, your experience, and why you'd like to join Emma Lab…"
                  value={form.coverLetter}
                  onChange={handleChange}
                  className={`${inputClass} resize-y`}
                />
              </div>

              {/* File upload */}
              <div>
                <label className={labelClass}>
                  CV / Resume <span className="text-accent">*</span>
                </label>
                <label
                  htmlFor="cv"
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  className={`flex flex-col items-center justify-center gap-2 border-2 border-dashed rounded-sm px-6 py-8 cursor-pointer transition select-none
                    ${dragging
                      ? "border-accent bg-accent-light/30 scale-[1.01]"
                      : cv
                        ? "border-accent bg-accent-light/20"
                        : "border-gray-200 hover:border-accent bg-bg-soft hover:bg-accent-light/10"
                    }`}
                >
                  <div className={`text-2xl ${cv || dragging ? "text-accent" : "text-ink-muted"}`}>
                    <i className={dragging ? "fas fa-file-import" : cv ? "fas fa-file-check" : "fas fa-cloud-upload-alt"} aria-hidden />
                  </div>
                  {dragging ? (
                    <span className="text-sm font-semibold text-accent">Drop your file here</span>
                  ) : cv ? (
                    <span className="text-sm font-medium text-navy text-center">{cv.name}</span>
                  ) : (
                    <>
                      <span className="text-sm font-medium text-navy">
                        Drag & drop or click to upload
                      </span>
                      <span className="text-xs text-ink-muted">PDF or Word — max 5 MB</span>
                    </>
                  )}
                  <input
                    id="cv"
                    ref={fileRef}
                    type="file"
                    accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                    onChange={handleFile}
                    className="sr-only"
                  />
                </label>
                {cvError && (
                  <p className="mt-1.5 text-xs text-red-500 flex items-center gap-1">
                    <i className="fas fa-exclamation-circle" aria-hidden /> {cvError}
                  </p>
                )}
              </div>

              {status === "error" && serverMessage && (
                <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-sm px-4 py-3 flex items-center gap-2">
                  <i className="fas fa-exclamation-triangle" aria-hidden /> {serverMessage}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "loading"}
                className="w-full bg-accent hover:bg-accent/90 disabled:opacity-60 text-white font-semibold rounded-sm px-6 py-4 transition flex items-center justify-center gap-2"
              >
                {status === "loading" ? (
                  <>
                    <i className="fas fa-spinner fa-spin" aria-hidden />
                    Submitting…
                  </>
                ) : (
                  <>
                    <i className="fas fa-paper-plane" aria-hidden />
                    Submit Application
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
