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
    image:
      "https://images.unsplash.com/photo-1559757175-5700dde675bc?w=700&q=80",
    title: "X-ray",
    blurb:
      "Our state-of-the-art digital X-ray equipment provides clear, high-resolution images to aid swift and accurate diagnosis.",
    bullets: [
      "Digital chest X-rays",
      "Bone & joint imaging",
      "Rapid result turnaround",
    ],
  },
  {
    id: "ecg",
    label: "Electrocardiography",
    icon: "fas fa-heartbeat",
    image:
      "https://images.unsplash.com/photo-1530026405186-ed1f139313f3?w=700&q=80",
    title: "Electrocardiography",
    blurb:
      "Our ECG service detects irregular rhythms, heart attacks, and other cardiac conditions with precision.",
    bullets: ["Resting 12-lead ECG", "Stress ECG", "Holter monitoring"],
  },
  {
    id: "biochem",
    label: "Clinical Biochemistry",
    icon: "fas fa-flask",
    image:
      "https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=700&q=80",
    title: "Clinical Biochemistry",
    blurb:
      "A full spectrum of biochemistry tests covering organ function, hormones, and metabolic panels.",
    bullets: [
      "Liver & kidney function",
      "Thyroid function tests",
      "Lipid & glucose profiles",
    ],
  },
  {
    id: "ultrasound",
    label: "Ultrasound",
    icon: "fas fa-wave-square",
    image:
      "https://images.unsplash.com/photo-1666214280557-f1b5022eb634?w=700&q=80",
    title: "Ultrasound",
    blurb:
      "Modern ultrasound scanners deliver real-time imagery for abdominal, obstetric, and musculoskeletal assessments.",
    bullets: [
      "Abdominal scans",
      "Obstetric ultrasound",
      "Doppler blood flow studies",
    ],
  },
  {
    id: "haematology",
    label: "Haematology & Blood Banking",
    icon: "fas fa-tint",
    image:
      "https://images.unsplash.com/photo-1579154204601-01588f351e67?w=700&q=80",
    title: "Haematology & Blood Banking",
    blurb:
      "Our blood banking services ensure safe transfusion and complete blood analysis.",
    bullets: [
      "Full blood count (FBC)",
      "Blood grouping & cross-matching",
      "Coagulation studies",
    ],
  },
  {
    id: "microbiology",
    label: "Microbiology",
    icon: "fas fa-bacterium",
    image:
      "https://images.unsplash.com/photo-1518152006812-edab29b069ac?w=700&q=80",
    title: "Microbiology",
    blurb:
      "Our microbiology unit identifies bacteria, fungi, parasites, and viruses with sensitivity testing.",
    bullets: [
      "Culture & sensitivity",
      "Malaria parasite test",
      "Urinalysis & stool analysis",
    ],
  },
  {
    id: "serology",
    label: "Serology",
    icon: "fas fa-vials",
    image:
      "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=700&q=80",
    title: "Serology",
    blurb:
      "Serological tests detect antibodies and antigens to identify infectious diseases and immune responses.",
    bullets: [
      "HIV & Hepatitis screening",
      "Widal & VDRL tests",
      "Rheumatoid factor",
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
    src: "/images/Hero 2.png",
    webp: "/images/Hero 2.webp",
    alt: "Lab scientist working at a microscope",
  },
  {
    src: "/images/Hero 1.png",
    webp: "/images/Hero 1.webp",
    alt: "Blood samples being prepared for analysis",
  },
  {
    src: "/images/Hero 3.png",
    webp: "/images/Hero 3.webp",
    alt: "Doctor consulting with a patient",
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
