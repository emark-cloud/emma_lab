export type Service = {
  id: string;
  label: string;
  icon: string;
  image: string;
  title: string;
  blurb: string;
  bullets: string[];
};

export const SERVICES: Service[] = [
  {
    id: "xray",
    label: "X-ray",
    icon: "fas fa-radiation-alt",
    image: "/images/hero-xray.jpg",
    title: "X-ray",
    blurb:
      "Our state-of-the-art digital X-ray equipment provides clear, high-resolution images to aid swift and accurate diagnosis.",
    bullets: [
      "Digital Chest X-Rays",
      "Bone & Joint Imaging",
      "Spine & Pelvis X-Rays",
      "Skull & Sinus Imaging",
      "Abdominal X-Rays",
      "Rapid Result Turnaround",
    ],
  },
  {
    id: "ecg",
    label: "Electrocardiography",
    icon: "fas fa-heartbeat",
    image: "https://images.unsplash.com/photo-1678695972687-033fa0bdbac9?w=1400&q=95",
    title: "Electrocardiography",
    blurb:
      "Our ECG service detects irregular rhythms, heart attacks, and other cardiac conditions with precision.",
    bullets: [
      "Resting 12-Lead ECG",
      "Stress ECG (Exercise Tolerance Test)",
      "Holter Monitoring",
      "Arrhythmia Detection",
      "Pre-Operative Cardiac Screening",
      "Rapid Interpretation & Reporting",
    ],
  },
  {
    id: "biochem",
    label: "Clinical Biochemistry",
    icon: "fas fa-flask",
    image: "https://images.pexels.com/photos/3825435/pexels-photo-3825435.jpeg?auto=compress&cs=tinysrgb&w=1400",
    title: "Clinical Biochemistry",
    blurb:
      "A full spectrum of biochemistry tests covering organ function, hormones, and metabolic panels.",
    bullets: [
      "Liver & Kidney Function Tests",
      "Thyroid Function Tests (T3, T4, TSH)",
      "Lipid & Cholesterol Profiles",
      "Cancer Screening Hormones",
      "Electrolytes & Uric Acid",
      "Prostate-Specific Antigen (PSA)",
    ],
  },
  {
    id: "ultrasound",
    label: "Ultrasound",
    icon: "fas fa-wave-square",
    image: "/images/hero-ultrasound.jpg",
    title: "Ultrasound",
    blurb:
      "Modern ultrasound scanners deliver real-time imagery for abdominal, obstetric, and musculoskeletal assessments.",
    bullets: [
      "Abdominal & Pelvic Scans",
      "Obstetric Ultrasound (All Trimesters)",
      "Doppler Blood Flow Studies",
      "Scrotal & Breast Ultrasound",
      "Musculoskeletal Soft-Tissue Imaging",
      "Guided Aspirations & Biopsies",
    ],
  },
  {
    id: "haematology",
    label: "Haematology & Blood Banking",
    icon: "fas fa-tint",
    image: "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=1400&q=95",
    title: "Haematology & Blood Banking",
    blurb:
      "Our blood banking services ensure safe transfusion and complete blood analysis.",
    bullets: [
      "Full Blood Count (FBC)",
      "Blood Grouping & Cross-Matching",
      "Coagulation & Clotting Studies",
      "Erythrocyte Sedimentation Rate (ESR)",
      "Peripheral Blood Film & Differential",
      "Sickle-Cell Screening",
    ],
  },
  {
    id: "microbiology",
    label: "Microbiology",
    icon: "fas fa-bacterium",
    image: "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=1400&q=95",
    title: "Microbiology",
    blurb:
      "Our microbiology unit identifies bacteria, fungi, parasites, and viruses with sensitivity testing.",
    bullets: [
      "Culture & Sensitivity Testing",
      "Malaria Parasite (Thick & Thin Film)",
      "Urinalysis & Microscopy",
      "Stool Microscopy & Culture",
      "Wound & Throat Swab Cultures",
      "Genital & High-Vaginal Swabs",
    ],
  },
  {
    id: "serology",
    label: "Serology",
    icon: "fas fa-vials",
    image: "https://images.pexels.com/photos/13466253/pexels-photo-13466253.jpeg?auto=compress&cs=tinysrgb&w=1400",
    title: "Serology",
    blurb:
      "Serological tests detect antibodies and antigens to identify infectious diseases and immune responses.",
    bullets: [
      "HIV 1 & 2 Screening",
      "Hepatitis B & C Serology",
      "Herpes Simplex Virus I & II",
      "VDRL / Syphilis Screening",
      "Rheumatoid Factor",
      "H. Pylori Antibody Test",
    ],
  },
];

export type FeaturedBundle = {
  id: string;
  name: string;
  badge: string;
  price: number;
  description: string;
  testCount: number;
  tests: string[];
  featured?: boolean;
};

export const FEATURED_BUNDLES: FeaturedBundle[] = [
  {
    id: "std-essentials",
    name: "STD Screening — Essentials",
    badge: "STD Screening",
    price: 50000,
    description:
      "Protect your health with our comprehensive STD screening panel conducted with strict confidentiality.",
    testCount: 9,
    tests: [
      "Blood Disorders",
      "Chlamydia / Gonorrhea Trachomatis",
      "Herpes Simplex Virus I",
      "Herpes Simplex Virus II",
      "HIV A/I",
      "Hepatitis B Surface Antigen",
      "Syphilis / Serofast Diagnosis",
    ],
  },
  {
    id: "std-most-popular",
    name: "STD Screening — Comprehensive",
    badge: "STD Screening",
    price: 50000,
    featured: true,
    description:
      "Our most comprehensive panel — ideal for routine wellness and peace-of-mind testing.",
    testCount: 9,
    tests: [
      "Blood Disorders",
      "Chlamydia / Gonorrhea Trachomatis",
      "Herpes Simplex Virus I",
      "Herpes Simplex Virus II",
      "HIV A/I",
      "Hepatitis B Surface Antigen",
      "Syphilis / Serofast Diagnosis",
    ],
  },
  {
    id: "std-extended",
    name: "STD Screening — Extended",
    badge: "STD Screening",
    price: 50000,
    description:
      "Extended panel for thorough screening including rare markers and advanced diagnostics.",
    testCount: 9,
    tests: [
      "Chlamydia / Gonorrhea Trachomatis",
      "Herpes Simplex Virus I",
      "Herpes Simplex Virus II",
      "HIV A/I",
      "Hepatitis B Surface Antigen",
      "Syphilis / Serofast Diagnosis",
      "Trichomonas Vaginalis",
    ],
  },
];

export const WHY_ITEMS: { title: string; body: string }[] = [
  {
    title: "Timely and Convenient Services",
    body: "We prioritise your time with fast turnaround on results, online booking, and home sample collection — because health should never wait.",
  },
  {
    title: "Comprehensive Range of Testing",
    body: "From routine blood panels to advanced molecular diagnostics, our laboratory covers over 200 test types under one roof.",
  },
  {
    title: "Patient Safety and Confidentiality",
    body: "Your health information is protected with strict data security protocols. Results are delivered securely and handled with absolute discretion.",
  },
  {
    title: "Accurate and Precise Diagnosis",
    body: "Our accredited equipment and highly trained scientists ensure a 98%+ accuracy rate across all diagnostic tests conducted.",
  },
];

export const PERKS = [
  { icon: "fas fa-hand-holding-heart", label: "Health Benefits" },
  { icon: "fas fa-graduation-cap", label: "Training & Growth" },
  { icon: "fas fa-clock", label: "Flexible Hours" },
  { icon: "fas fa-map-marker-alt", label: "Great Location" },
];

export const HERO_SLIDES = [
  {
    src: "/images/hero-ultrasound.jpg",
    alt: "Obstetric ultrasound scan on a diagnostic monitor",
  },
  {
    src: "/images/hero-xray.jpg",
    alt: "X-ray technician examining an X-ray film",
  },
  {
    src: "/images/hero-chemistry.jpg",
    alt: "Clinical chemistry blood sample tubes in a medical laboratory",
  },
];

export const TEST_OPTIONS = [
  "X-ray",
  "Electrocardiography",
  "Clinical Biochemistry",
  "Ultrasound",
  "Haematology & Blood Banking",
  "Microbiology",
  "Serology",
  "Wellness Check Bundle",
];
