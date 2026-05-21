/* Individual diagnostic tests sourced from lab.md / lab2.md (Emma Lab price
   list). Category IDs match SERVICES in landing-data.ts so the ServicesTabs
   sidebar can filter directly.

   `aliases` covers the common acronyms and local names patients use when
   searching — FBC for CBC, U&E for electrolytes, etc. The search builds a
   normalized haystack from name + aliases. */

export type InvestigationCategory =
  | "xray"
  | "ultrasound"
  | "biochem"
  | "haematology"
  | "microbiology"
  | "serology";

export type Investigation = {
  id: string;
  name: string;
  price: number;
  category: InvestigationCategory;
  aliases?: string[];
  pair?: {
    bothId: string;
    bothName: string;
    bothPrice: number;
  };
};

const XRAY_PAIR = (key: string, partPlural: string): Investigation["pair"] => ({
  bothId: `inv-xray-${key}-both`,
  bothName: `Both ${partPlural} X-ray`,
  bothPrice: 20000,
});

export const INVESTIGATIONS: Investigation[] = [
  { id: "inv-xray-hsg", name: "HSG — Hysterosalpingogram", price: 38000, category: "xray", aliases: ["HSG", "Tubal Patency"] },
  { id: "inv-xray-humerus", name: "Humerus X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("humerus", "Humerus"), aliases: ["Upper Arm X-ray"] },
  { id: "inv-xray-hand", name: "Hand X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("hand", "Hands") },
  { id: "inv-xray-forearm", name: "Forearm X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("forearm", "Forearms"), aliases: ["Radius Ulna X-ray"] },
  { id: "inv-xray-clavicle", name: "Clavicle X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("clavicle", "Clavicles"), aliases: ["Collar Bone X-ray"] },
  { id: "inv-xray-elbow", name: "Elbow X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("elbow", "Elbows") },
  { id: "inv-xray-shoulder", name: "Shoulder X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("shoulder", "Shoulders") },
  { id: "inv-xray-wrist", name: "Wrist X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("wrist", "Wrists") },
  { id: "inv-xray-foot", name: "Foot X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("foot", "Feet") },
  { id: "inv-xray-hip", name: "Hip X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("hip", "Hips") },
  { id: "inv-xray-femur", name: "Femur X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("femur", "Femurs"), aliases: ["Thigh X-ray"] },
  { id: "inv-xray-ankle", name: "Ankle X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("ankle", "Ankles") },
  { id: "inv-xray-leg", name: "Leg X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("leg", "Legs"), aliases: ["Tibia Fibula X-ray"] },
  { id: "inv-xray-knee", name: "Knee X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("knee", "Knees") },
  { id: "inv-xray-paranasal-sinus", name: "Paranasal Sinus X-ray", price: 12000, category: "xray", aliases: ["PNS X-ray", "Sinus X-ray"] },
  { id: "inv-xray-post-nasal-space", name: "Post-nasal Space X-ray", price: 12000, category: "xray", aliases: ["Adenoid X-ray"] },
  { id: "inv-xray-mandible", name: "Mandible X-ray", price: 12000, category: "xray", aliases: ["Jaw X-ray"] },
  { id: "inv-xray-skull", name: "Skull X-ray", price: 12000, category: "xray", aliases: ["Head X-ray"] },
  { id: "inv-xray-pelvis", name: "Pelvis X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-abdominal", name: "Abdominal X-ray", price: 12000, category: "xray", aliases: ["AXR"] },
  { id: "inv-xray-cervical-spine", name: "Cervical Spine X-ray", price: 12000, category: "xray", aliases: ["Neck X-ray", "C-Spine"] },
  { id: "inv-xray-lumbosacral-spine", name: "Lumbosacral Spine X-ray", price: 12000, category: "xray", aliases: ["LS Spine", "Lumbar Spine", "Lower Back X-ray"] },
  { id: "inv-xray-thoracic-spine", name: "Thoracic Spine X-ray", price: 12000, category: "xray", aliases: ["T-Spine", "Upper Back X-ray"] },
  { id: "inv-xray-toe", name: "Toe X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-chest-pa-lat", name: "Chest X-ray (PA/Lat)", price: 15000, category: "xray", aliases: ["CXR PA Lat", "Chest PA Lateral"] },
  { id: "inv-xray-chest", name: "Chest X-ray", price: 8000, category: "xray", aliases: ["CXR", "Lung X-ray"] },

  { id: "inv-us-4d-scan", name: "4D Scan", price: 30000, category: "ultrasound", aliases: ["3D Scan", "Obstetric 4D"] },
  { id: "inv-us-thyroid", name: "Thyroid Scan", price: 15000, category: "ultrasound", aliases: ["Thyroid Ultrasound"] },
  { id: "inv-us-transrectal", name: "Transrectal Scan", price: 15000, category: "ultrasound", aliases: ["TRUS"] },
  { id: "inv-us-transvaginal", name: "Transvaginal Scan", price: 10000, category: "ultrasound", aliases: ["TVS", "TVUS"] },
  { id: "inv-us-neck", name: "Neck Scan", price: 15000, category: "ultrasound", aliases: ["Neck Ultrasound"] },
  { id: "inv-us-breast", name: "Breast Scan", price: 15000, category: "ultrasound", aliases: ["Breast Ultrasound", "BUS"] },
  { id: "inv-us-abdominopelvic", name: "Abdominopelvic Scan", price: 6000, category: "ultrasound", aliases: ["APUSS", "Abdomen and Pelvis Ultrasound"] },
  { id: "inv-us-prostate", name: "Prostate Scan", price: 15000, category: "ultrasound", aliases: ["Prostate Ultrasound"] },
  { id: "inv-us-foetal-well-being", name: "Foetal Well Being", price: 2000, category: "ultrasound", aliases: ["FWB", "Fetal Wellbeing", "Pregnancy Scan"] },
  { id: "inv-us-abdominal", name: "Abdominal Scan", price: 6000, category: "ultrasound", aliases: ["Abdominal Ultrasound", "AUSS"] },
  { id: "inv-us-pelvic", name: "Pelvic Scan", price: 4000, category: "ultrasound", aliases: ["Pelvic Ultrasound"] },
  { id: "inv-us-scrotal", name: "Scrotal Scan", price: 15000, category: "ultrasound", aliases: ["Testicular Scan"] },

  { id: "inv-liver-function-test", name: "Liver Function Test", price: 18000, category: "biochem", aliases: ["LFT", "LFTs"] },
  { id: "inv-electrolytes-urea-creatinine", name: "Electrolytes, Urea & Creatinine", price: 18000, category: "biochem", aliases: ["U&E", "UEC", "EUCr", "Renal Profile", "Kidney Function Test", "KFT"] },
  { id: "inv-fasting-lipid-profile", name: "Fasting Lipid Profile", price: 18000, category: "biochem", aliases: ["Lipid Profile", "Cholesterol Panel", "Lipids"] },
  { id: "inv-psa", name: "PSA — Prostate Specific Antigen", price: 18000, category: "biochem", aliases: ["PSA"] },
  { id: "inv-tft", name: "TFT — Thyroid Function Test", price: 35000, category: "biochem", aliases: ["TFT", "Thyroid", "TSH FT3 FT4"] },
  { id: "inv-vitamin-d", name: "Vitamin D", price: 20000, category: "biochem", aliases: ["25-OH Vitamin D", "Vit D"] },
  { id: "inv-hba1c", name: "Glycated Haemoglobin (HbA1c)", price: 18000, category: "biochem", aliases: ["HbA1c", "A1c", "Diabetes Control", "Glycated Hemoglobin"] },
  { id: "inv-cortisol", name: "Cortisol", price: 20000, category: "biochem" },
  { id: "inv-calcium", name: "Calcium", price: 10000, category: "biochem", aliases: ["Serum Calcium", "Ca"] },
  { id: "inv-prolactin", name: "Prolactin", price: 15000, category: "biochem", aliases: ["PRL"] },
  { id: "inv-c-reactive-protein", name: "C-Reactive Protein", price: 20000, category: "biochem", aliases: ["CRP"] },
  { id: "inv-uric-acid", name: "Uric Acid", price: 10000, category: "biochem", aliases: ["Gout Test"] },
  { id: "inv-fasting-plasma-glucose", name: "Fasting Plasma Glucose", price: 2000, category: "biochem", aliases: ["FPG", "FBS", "Fasting Blood Sugar", "Fasting Sugar"] },
  { id: "inv-random-plasma-glucose", name: "Random Plasma Glucose", price: 2000, category: "biochem", aliases: ["RPG", "RBS", "Random Blood Sugar"] },
  { id: "inv-testosterone-male", name: "Testosterone (Male)", price: 20000, category: "biochem", aliases: ["Total Testosterone"] },
  { id: "inv-egfr", name: "eGFR — Estimated Glomerular Filtration Rate", price: 10000, category: "biochem", aliases: ["eGFR", "GFR", "Kidney Function"] },
  { id: "inv-afp", name: "AFP — Alpha Fetoprotein", price: 20000, category: "biochem", aliases: ["AFP"] },
  { id: "inv-total-cholesterol", name: "Total Cholesterol", price: 8000, category: "biochem", aliases: ["TC"] },
  { id: "inv-triglyceride", name: "Triglyceride", price: 8000, category: "biochem", aliases: ["TG", "Triglycerides"] },
  { id: "inv-hdl", name: "HDL — High Density Lipoprotein Cholesterol", price: 8000, category: "biochem", aliases: ["HDL", "Good Cholesterol"] },
  { id: "inv-ldl", name: "LDL — Low Density Lipoprotein Cholesterol", price: 8000, category: "biochem", aliases: ["LDL", "Bad Cholesterol"] },
  { id: "inv-serum-urea", name: "Serum Urea", price: 8000, category: "biochem", aliases: ["BUN", "Blood Urea Nitrogen"] },
  { id: "inv-serum-creatinine", name: "Serum Creatinine", price: 10000, category: "biochem", aliases: ["Cr"] },
  { id: "inv-alp", name: "ALP — Alkaline Phosphatase", price: 10000, category: "biochem", aliases: ["ALP", "Alk Phos"] },
  { id: "inv-total-protein", name: "Total Protein", price: 8000, category: "biochem", aliases: ["TP"] },
  { id: "inv-albumin", name: "Albumin", price: 8000, category: "biochem", aliases: ["Alb"] },
  { id: "inv-globulin", name: "Globulin", price: 8000, category: "biochem" },
  { id: "inv-hormonal-profile-female", name: "Hormonal Profile (Female)", price: 35000, category: "biochem", aliases: ["Female Hormones", "FSH LH Estradiol Prolactin"] },
  { id: "inv-progesterone-female", name: "Progesterone (Female)", price: 15000, category: "biochem", aliases: ["P4"] },
  { id: "inv-hormonal-profile-male", name: "Hormonal Profile (Male)", price: 50000, category: "biochem", aliases: ["Male Hormones"] },
  { id: "inv-bilirubin-neonate", name: "Bilirubin (Neonate)", price: 10000, category: "biochem", aliases: ["Neonatal Jaundice", "SBR Neonate"] },
  { id: "inv-bilirubin-neonate-sho", name: "Bilirubin (Neonate — SHO)", price: 5000, category: "biochem" },
  { id: "inv-cea", name: "CEA — Carcinoembryonic Antigen", price: 20000, category: "biochem", aliases: ["CEA"] },
  { id: "inv-ca-125", name: "CA-125 (Cancer Antigen-125)", price: 20000, category: "biochem", aliases: ["CA125", "Ovarian Cancer Marker"] },
  { id: "inv-rheumatoid-factor", name: "Rheumatoid Factor", price: 20000, category: "biochem", aliases: ["RF", "RhF"] },
  { id: "inv-troponin-i", name: "Cardiac Troponin I (cTnI)", price: 20000, category: "biochem", aliases: ["Troponin I", "cTnI", "Heart Attack Test"] },
  { id: "inv-creatine-kinase-mb", name: "Creatine Kinase-MB", price: 20000, category: "biochem", aliases: ["CK-MB", "CKMB"] },
  { id: "inv-troponin-t", name: "Cardiac Troponin T (cTnT)", price: 20000, category: "biochem", aliases: ["Troponin T", "cTnT"] },
  { id: "inv-fecal-immunochemical", name: "Fecal Immunochemical Test", price: 20000, category: "biochem", aliases: ["FIT", "Faecal Immunochemical"] },
  { id: "inv-fecal-occult-blood", name: "Fecal Occult Blood", price: 20000, category: "biochem", aliases: ["FOB", "Faecal Occult Blood", "Blood in Stool"] },

  { id: "inv-blood-group", name: "Blood Group", price: 1500, category: "haematology", aliases: ["Blood Type", "ABO", "ABO Rh"] },
  { id: "inv-genotype", name: "Genotype", price: 5000, category: "haematology", aliases: ["Hb Genotype", "Sickle Cell"] },
  { id: "inv-blood-group-genotype", name: "Blood Group & Genotype", price: 5000, category: "haematology", aliases: ["BG Genotype"] },
  { id: "inv-pcv", name: "Packed Cell Volume", price: 1500, category: "haematology", aliases: ["PCV", "Hematocrit", "Haematocrit"] },
  { id: "inv-haemoglobin", name: "Haemoglobin", price: 1500, category: "haematology", aliases: ["Hb", "Hgb", "Hemoglobin"] },
  { id: "inv-pcv-neonate", name: "Packed Cell Volume (Neonate)", price: 1500, category: "haematology", aliases: ["PCV Neonate"] },
  { id: "inv-haemoglobin-neonate", name: "Haemoglobin (Neonate)", price: 1500, category: "haematology", aliases: ["Hb Neonate"] },
  { id: "inv-malaria-parasite", name: "Blood Film for Malaria Parasite", price: 1500, category: "haematology", aliases: ["MP", "BFMP", "Malaria Test", "MPS"] },
  { id: "inv-cbc", name: "Complete Blood Count + Blood Film Pictures", price: 5000, category: "haematology", aliases: ["CBC", "FBC", "Full Blood Count", "FBC BFP"] },
  { id: "inv-cbc-neonate", name: "Complete Blood Count (Neonate) + Blood Film Pictures", price: 5000, category: "haematology", aliases: ["CBC Neonate", "FBC Neonate"] },
  { id: "inv-esr", name: "ESR — Erythrocyte Sedimentation Rate", price: 5000, category: "haematology", aliases: ["ESR", "Sed Rate"] },
  { id: "inv-pt-inr", name: "Prothrombin Time & INR", price: 20000, category: "haematology", aliases: ["PT", "INR", "PT/INR", "Coagulation", "Clotting Time"] },
  { id: "inv-coombs", name: "Indirect Coombs Test", price: 15000, category: "haematology", aliases: ["ICT", "Indirect Antiglobulin"] },

  { id: "inv-urinalysis", name: "Urinalysis", price: 4000, category: "microbiology", aliases: ["UA", "Urine Test", "Urine Dipstick"] },
  { id: "inv-anc-urinalysis", name: "ANC — Urinalysis", price: 2000, category: "microbiology", aliases: ["Antenatal Urine"] },
  { id: "inv-anc-urinalysis-complete", name: "ANC — Urinalysis (Complete)", price: 4000, category: "microbiology", aliases: ["Antenatal Urine Complete"] },
  { id: "inv-urine-mcs", name: "Urine Microscopy, Culture & Sensitivity (MCS)", price: 8000, category: "microbiology", aliases: ["MSU", "Urine MCS", "Urine Culture"] },
  { id: "inv-urine-cs", name: "Urine Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Urine CS"] },
  { id: "inv-hvs-mcs", name: "HVS — High Vaginal Swab MCS", price: 8000, category: "microbiology", aliases: ["HVS", "Vaginal Swab"] },
  { id: "inv-blood-culture", name: "Blood Culture", price: 15000, category: "microbiology", aliases: ["BC", "Blood C/S"] },
  { id: "inv-stool-microscopy", name: "Stool Microscopy", price: 5000, category: "microbiology", aliases: ["Stool Test", "Ova and Parasite", "O&P"] },
  { id: "inv-stool-mcs", name: "Stool Microscopy, Culture & Sensitivity", price: 12000, category: "microbiology", aliases: ["Stool MCS", "Stool Culture"] },
  { id: "inv-wound-cs", name: "Wound Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Wound MCS"] },
  { id: "inv-aspirate-cs", name: "Aspirate Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-pus-cs", name: "Pus Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Pus MCS"] },
  { id: "inv-aural-cs", name: "Aural Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Ear Swab"] },
  { id: "inv-conjunctival-cs", name: "Conjunctival Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Eye Swab"] },
  { id: "inv-semen-cs", name: "Semen Culture & Sensitivity", price: 7000, category: "microbiology" },
  { id: "inv-sputum-mcs", name: "Sputum M/C/S", price: 12000, category: "microbiology", aliases: ["Sputum Culture", "Sputum MCS"] },
  { id: "inv-breast-milk-mcs", name: "Breast Milk MCS", price: 8000, category: "microbiology" },
  { id: "inv-igm-tb", name: "IgM Antibody to Tuberculosis", price: 5000, category: "microbiology", aliases: ["TB IgM", "Tuberculosis"] },
  { id: "inv-mantoux", name: "Mantoux", price: 15000, category: "microbiology", aliases: ["PPD", "TB Skin Test", "Tuberculin"] },

  { id: "inv-hbsag-rapid", name: "HBsAg — Hepatitis B Surface Antigen (Rapid)", price: 3000, category: "serology", aliases: ["HBsAg", "Hep B", "Hepatitis B"] },
  { id: "inv-hbsag-qualitative", name: "HBsAg — Hepatitis B Surface Antigen (Qualitative)", price: 20000, category: "serology", aliases: ["HBsAg", "Hep B", "Hepatitis B"] },
  { id: "inv-hcv-rapid", name: "HCV — Hepatitis C Antibody (Rapid)", price: 3000, category: "serology", aliases: ["HCV", "Hep C", "Hepatitis C"] },
  { id: "inv-hiv-rapid", name: "HIV I & II (Rapid)", price: 5000, category: "serology", aliases: ["HIV", "AIDS Test", "Retroviral Screen"] },
  { id: "inv-pregnancy-hcg-rapid", name: "Pregnancy Test — hCG (Rapid)", price: 1500, category: "serology", aliases: ["Pregnancy Test", "hCG", "Beta hCG", "Urine Pregnancy"] },
  { id: "inv-hsv-rapid", name: "HSV I & II — Antibody (Rapid)", price: 15000, category: "serology", aliases: ["HSV", "Herpes", "Herpes Simplex"] },
  { id: "inv-vdrl-rapid", name: "VDRL — Antibody (Rapid)", price: 3000, category: "serology", aliases: ["VDRL", "Syphilis", "RPR"] },
  { id: "inv-gonorrhoeae-rapid", name: "Neisseria Gonorrhoeae — Antigen (Rapid)", price: 10000, category: "serology", aliases: ["Gonorrhea", "Gonorrhoea", "GC", "NG"] },
  { id: "inv-chlamydia-rapid", name: "Chlamydia — Antigen (Rapid)", price: 10000, category: "serology", aliases: ["Chlamydia trachomatis", "CT"] },
  { id: "inv-widal", name: "Widal", price: 3000, category: "serology", aliases: ["Typhoid", "Typhoid Fever"] },
  { id: "inv-seminalysis", name: "Seminalysis", price: 8000, category: "serology", aliases: ["Semen Analysis", "Sperm Count", "SFA"] },
  { id: "inv-drug-of-abuse", name: "Drug of Abuse", price: 20000, category: "serology", aliases: ["DOA", "Drug Test", "Substance Screen"] },
  { id: "inv-h-pylori", name: "Antibody to H. Pylori", price: 8000, category: "serology", aliases: ["H Pylori", "Helicobacter Pylori", "Ulcer Test"] },
  { id: "inv-hpv", name: "HPV — Human Papilloma Virus (Antigen)", price: 10000, category: "serology", aliases: ["HPV"] },
  { id: "inv-std-panel", name: "STD Panel", price: 50000, category: "serology", aliases: ["STI Panel", "STD Screen"] },
];

export const INVESTIGATION_CATEGORIES: Record<InvestigationCategory, string> = {
  xray: "X-ray",
  ultrasound: "Ultrasound",
  biochem: "Clinical Biochemistry",
  haematology: "Haematology & Blood Banking",
  microbiology: "Microbiology",
  serology: "Serology",
};

/* Normalize for search: lowercase, strip everything that isn't a letter or
   digit. So "X-ray" and "xray" both become "xray", "HbA1c" stays "hba1c",
   and a query of "fbc" matches an alias "FBC" inside a haystack built from
   the test name + alias list. */
function normalize(s: string): string {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, "");
}

const HAYSTACKS = new WeakMap<Investigation, string>();

function haystackFor(inv: Investigation): string {
  let cached = HAYSTACKS.get(inv);
  if (cached === undefined) {
    cached = normalize([inv.name, ...(inv.aliases ?? [])].join(" "));
    HAYSTACKS.set(inv, cached);
  }
  return cached;
}

/** Returns true if every whitespace-separated token in `query`, once
 *  normalized, is a substring of the investigation's normalized haystack
 *  (name + aliases). Empty query → true (caller decides what to do). */
export function matchesInvestigation(
  inv: Investigation,
  query: string,
): boolean {
  const tokens = query
    .trim()
    .split(/\s+/)
    .map(normalize)
    .filter(Boolean);
  if (tokens.length === 0) return true;
  const hay = haystackFor(inv);
  return tokens.every((t) => hay.includes(t));
}
