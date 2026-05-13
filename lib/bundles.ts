export type Category = "general" | "sexual" | "mens" | "womens";

export type Bundle = {
  id: string;
  name: string;
  category: Category;
  price: number;
  description: string;
  tests: string[];
  featured?: boolean;
};

export const CATEGORIES: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All" },
  { id: "general", label: "General Health Tests" },
  { id: "sexual", label: "Sexual Health" },
  { id: "mens", label: "Men's Health" },
  { id: "womens", label: "Women's Health" },
];

export const CATEGORY_LABELS: Record<Category, string> = {
  general: "General Health",
  sexual: "Sexual Health",
  mens: "Men's Health",
  womens: "Women's Health",
};

export const BUNDLES: Bundle[] = [
  {
    id: "std-basic",
    name: "STD Screening Basic",
    category: "sexual",
    price: 50000,
    description:
      "A quick, confidential way to assess core sexually transmitted infections.",
    tests: [
      "Blood Disorders",
      "Chlamydia / Gonorrhea",
      "Herpes Simplex Virus I",
      "Herpes Simplex Virus II",
      "HIV A/I",
      "Hepatitis B Surface Antigen",
      "Syphilis / Serofast Diagnosis",
    ],
  },
  {
    id: "std-plus",
    name: "STD Screening Plus",
    category: "sexual",
    price: 75000,
    featured: true,
    description:
      "Our most comprehensive STD panel — best value for complete peace of mind.",
    tests: [
      "Chlamydia / Gonorrhea",
      "Herpes Simplex Virus I & II",
      "HIV A/I",
      "Hepatitis B Surface Antigen",
      "Hepatitis C Antibody",
      "Syphilis / Serofast Diagnosis",
      "Trichomonas Vaginalis",
      "Mycoplasma Genitalium",
    ],
  },
  {
    id: "std-premium",
    name: "STD Screening Premium",
    category: "sexual",
    price: 95000,
    description:
      "Extended panel with rare markers and advanced diagnostics for total assurance.",
    tests: [
      "Full STD Plus panel",
      "HPV DNA Test",
      "Bacterial Vaginosis Screen",
      "PCR Confirmation",
      "Free physician consultation",
    ],
  },
  {
    id: "full-body",
    name: "Full Body Check",
    category: "general",
    price: 45000,
    description:
      "A comprehensive head-to-toe health assessment covering all major organ systems.",
    tests: [
      "Full Blood Count",
      "Liver Function Test",
      "Kidney Function Test",
      "Lipid Profile",
      "Fasting Glucose",
      "Urinalysis",
      "ECG",
    ],
  },
  {
    id: "cardiac",
    name: "Cardiac Wellness",
    category: "general",
    price: 60000,
    description:
      "Advanced cardiac markers and lipid assessment for heart-health monitoring.",
    tests: [
      "12-lead ECG",
      "Lipid Profile",
      "hs-CRP",
      "Troponin I",
      "Homocysteine",
      "Apolipoprotein B",
    ],
  },
  {
    id: "diabetes",
    name: "Diabetes Management",
    category: "general",
    price: 38000,
    description:
      "Complete diabetes monitoring panel for ongoing glucose and metabolic management.",
    tests: [
      "Fasting Plasma Glucose",
      "HbA1c",
      "Random Plasma Glucose",
      "Urine Microalbumin",
      "Lipid Profile",
      "Kidney Function Test",
    ],
  },
  {
    id: "mens-pro",
    name: "Men's Health Pro",
    category: "mens",
    price: 65000,
    description:
      "Targeted screening for prostate, hormonal, and metabolic male-health concerns.",
    tests: [
      "PSA (Prostate Specific Antigen)",
      "Testosterone (Total & Free)",
      "Full Blood Count",
      "Lipid Profile",
      "Liver & Kidney Function",
      "ECG",
    ],
  },
  {
    id: "executive",
    name: "Executive Health Screen",
    category: "mens",
    price: 120000,
    description:
      "The ultimate screen for busy professionals — complete organ and systems assessment.",
    tests: [
      "Full Body Check panel",
      "Cardiac panel",
      "Cancer markers (PSA, CEA, AFP)",
      "Stress ECG",
      "Abdominal Ultrasound",
      "Physician consultation",
    ],
  },
  {
    id: "womens",
    name: "Women's Wellness Complete",
    category: "womens",
    price: 80000,
    description:
      "Comprehensive female-health panel covering hormonal, reproductive, and metabolic wellbeing.",
    tests: [
      "Pap Smear",
      "Hormonal Profile",
      "Full Blood Count",
      "Lipid Profile",
      "Thyroid Function",
      "Pelvic Ultrasound",
    ],
  },
  {
    id: "fertility",
    name: "Fertility Screening",
    category: "womens",
    price: 55000,
    description:
      "Targeted reproductive-health assessment for women planning a pregnancy or monitoring fertility.",
    tests: [
      "AMH (Anti-Müllerian Hormone)",
      "FSH, LH, Estradiol, Progesterone",
      "Prolactin",
      "Thyroid Function",
      "Pelvic Ultrasound",
    ],
  },
  {
    id: "liver",
    name: "Liver Health Panel",
    category: "general",
    price: 32000,
    description:
      "Dedicated liver-function panel for monitoring hepatic enzymes and early damage detection.",
    tests: [
      "ALT, AST",
      "ALP, GGT",
      "Total / Direct Bilirubin",
      "Total Protein & Albumin",
      "Hepatitis B / C Antibody",
    ],
  },
  {
    id: "thyroid",
    name: "Thyroid Panel",
    category: "general",
    price: 28000,
    description:
      "Complete thyroid workup for detecting hypo/hyperthyroidism and monitoring thyroid health.",
    tests: ["TSH", "Free T3", "Free T4", "Anti-TPO Antibody", "Anti-Tg Antibody"],
  },
];
