/* Individual diagnostic tests sourced from lab.md (Emma Lab price list).
   Category IDs match SERVICES in landing-data.ts so the ServicesTabs
   sidebar can filter directly. */

export type InvestigationCategory =
  | "xray"
  | "ultrasound"
  | "biochem"
  | "haematology"
  | "microbiology"
  | "serology";

/* `pair` is set on single-side X-rays that also have a bilateral variant.
   The tile shows a 1↔2 quantity selector; selecting 2 swaps the cart item
   to the bilateral variant (different id, different price). */
export type Investigation = {
  id: string;
  name: string;
  price: number;
  category: InvestigationCategory;
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
  { id: "inv-xray-hsg", name: "HSG — Hysterosalpingogram", price: 38000, category: "xray" },
  { id: "inv-xray-humerus", name: "Humerus X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("humerus", "Humerus") },
  { id: "inv-xray-hand", name: "Hand X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("hand", "Hands") },
  { id: "inv-xray-forearm", name: "Forearm X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("forearm", "Forearms") },
  { id: "inv-xray-clavicle", name: "Clavicle X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("clavicle", "Clavicles") },
  { id: "inv-xray-elbow", name: "Elbow X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("elbow", "Elbows") },
  { id: "inv-xray-shoulder", name: "Shoulder X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("shoulder", "Shoulders") },
  { id: "inv-xray-wrist", name: "Wrist X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("wrist", "Wrists") },
  { id: "inv-xray-foot", name: "Foot X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("foot", "Feet") },
  { id: "inv-xray-hip", name: "Hip X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("hip", "Hips") },
  { id: "inv-xray-femur", name: "Femur X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("femur", "Femurs") },
  { id: "inv-xray-ankle", name: "Ankle X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("ankle", "Ankles") },
  { id: "inv-xray-leg", name: "Leg X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("leg", "Legs") },
  { id: "inv-xray-knee", name: "Knee X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("knee", "Knees") },
  { id: "inv-xray-paranasal-sinus", name: "Paranasal Sinus X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-post-nasal-space", name: "Post-nasal Space X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-mandible", name: "Mandible X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-skull", name: "Skull X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-pelvis", name: "Pelvis X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-abdominal", name: "Abdominal X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-cervical-spine", name: "Cervical Spine X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-lumbosacral-spine", name: "Lumbosacral Spine X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-thoracic-spine", name: "Thoracic Spine X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-toe", name: "Toe X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-chest-pa-lat", name: "Chest X-ray (PA/Lat)", price: 15000, category: "xray" },
  { id: "inv-xray-chest", name: "Chest X-ray", price: 8000, category: "xray" },

  { id: "inv-us-4d-scan", name: "4D Scan", price: 30000, category: "ultrasound" },
  { id: "inv-us-thyroid", name: "Thyroid Scan", price: 15000, category: "ultrasound" },
  { id: "inv-us-transrectal", name: "Transrectal Scan", price: 15000, category: "ultrasound" },
  { id: "inv-us-transvaginal", name: "Transvaginal Scan", price: 10000, category: "ultrasound" },
  { id: "inv-us-neck", name: "Neck Scan", price: 15000, category: "ultrasound" },
  { id: "inv-us-breast", name: "Breast Scan", price: 15000, category: "ultrasound" },
  { id: "inv-us-abdominopelvic", name: "Abdominopelvic Scan", price: 6000, category: "ultrasound" },
  { id: "inv-us-prostate", name: "Prostate Scan", price: 15000, category: "ultrasound" },
  { id: "inv-us-foetal-well-being", name: "Foetal Well Being", price: 2000, category: "ultrasound" },
  { id: "inv-us-abdominal", name: "Abdominal Scan", price: 6000, category: "ultrasound" },
  { id: "inv-us-pelvic", name: "Pelvic Scan", price: 4000, category: "ultrasound" },
  { id: "inv-us-scrotal", name: "Scrotal Scan", price: 15000, category: "ultrasound" },

  { id: "inv-liver-function-test", name: "Liver Function Test", price: 18000, category: "biochem" },
  { id: "inv-electrolytes-urea-creatinine", name: "Electrolytes, Urea & Creatinine", price: 18000, category: "biochem" },
  { id: "inv-fasting-lipid-profile", name: "Fasting Lipid Profile", price: 18000, category: "biochem" },
  { id: "inv-psa", name: "PSA — Prostate Specific Antigen", price: 18000, category: "biochem" },
  { id: "inv-tft", name: "TFT — Thyroid Function Test", price: 35000, category: "biochem" },
  { id: "inv-vitamin-d", name: "Vitamin D", price: 20000, category: "biochem" },
  { id: "inv-hba1c", name: "Glycated Haemoglobin (HbA1c)", price: 18000, category: "biochem" },
  { id: "inv-cortisol", name: "Cortisol", price: 20000, category: "biochem" },
  { id: "inv-calcium", name: "Calcium", price: 10000, category: "biochem" },
  { id: "inv-prolactin", name: "Prolactin", price: 15000, category: "biochem" },
  { id: "inv-c-reactive-protein", name: "C-Reactive Protein", price: 20000, category: "biochem" },
  { id: "inv-uric-acid", name: "Uric Acid", price: 10000, category: "biochem" },
  { id: "inv-fasting-plasma-glucose", name: "Fasting Plasma Glucose", price: 2000, category: "biochem" },
  { id: "inv-random-plasma-glucose", name: "Random Plasma Glucose", price: 2000, category: "biochem" },
  { id: "inv-testosterone-male", name: "Testosterone (Male)", price: 20000, category: "biochem" },
  { id: "inv-egfr", name: "eGFR — Estimated Glomerular Filtration Rate", price: 10000, category: "biochem" },
  { id: "inv-afp", name: "AFP — Alpha Fetoprotein", price: 20000, category: "biochem" },
  { id: "inv-total-cholesterol", name: "Total Cholesterol", price: 8000, category: "biochem" },
  { id: "inv-triglyceride", name: "Triglyceride", price: 8000, category: "biochem" },
  { id: "inv-hdl", name: "HDL — High Density Lipoprotein Cholesterol", price: 8000, category: "biochem" },
  { id: "inv-ldl", name: "LDL — Low Density Lipoprotein Cholesterol", price: 8000, category: "biochem" },
  { id: "inv-serum-urea", name: "Serum Urea", price: 8000, category: "biochem" },
  { id: "inv-serum-creatinine", name: "Serum Creatinine", price: 10000, category: "biochem" },
  { id: "inv-alp", name: "ALP — Alkaline Phosphatase", price: 10000, category: "biochem" },
  { id: "inv-total-protein", name: "Total Protein", price: 8000, category: "biochem" },
  { id: "inv-albumin", name: "Albumin", price: 8000, category: "biochem" },
  { id: "inv-globulin", name: "Globulin", price: 8000, category: "biochem" },
  { id: "inv-hormonal-profile-female", name: "Hormonal Profile (Female)", price: 35000, category: "biochem" },
  { id: "inv-progesterone-female", name: "Progesterone (Female)", price: 15000, category: "biochem" },
  { id: "inv-hormonal-profile-male", name: "Hormonal Profile (Male)", price: 50000, category: "biochem" },
  { id: "inv-bilirubin-neonate", name: "Bilirubin (Neonate)", price: 10000, category: "biochem" },
  { id: "inv-bilirubin-neonate-sho", name: "Bilirubin (Neonate — SHO)", price: 5000, category: "biochem" },
  { id: "inv-cea", name: "CEA — Carcinoembryonic Antigen", price: 20000, category: "biochem" },
  { id: "inv-ca-125", name: "CA-125 (Cancer Antigen-125)", price: 20000, category: "biochem" },
  { id: "inv-rheumatoid-factor", name: "Rheumatoid Factor", price: 20000, category: "biochem" },
  { id: "inv-troponin-i", name: "Cardiac Troponin I (cTnI)", price: 20000, category: "biochem" },
  { id: "inv-creatine-kinase-mb", name: "Creatine Kinase-MB", price: 20000, category: "biochem" },
  { id: "inv-troponin-t", name: "Cardiac Troponin T (cTnT)", price: 20000, category: "biochem" },
  { id: "inv-fecal-immunochemical", name: "Fecal Immunochemical Test", price: 20000, category: "biochem" },
  { id: "inv-fecal-occult-blood", name: "Fecal Occult Blood", price: 20000, category: "biochem" },

  { id: "inv-blood-group", name: "Blood Group", price: 1500, category: "haematology" },
  { id: "inv-genotype", name: "Genotype", price: 5000, category: "haematology" },
  { id: "inv-blood-group-genotype", name: "Blood Group & Genotype", price: 5000, category: "haematology" },
  { id: "inv-pcv", name: "Packed Cell Volume", price: 1500, category: "haematology" },
  { id: "inv-haemoglobin", name: "Haemoglobin", price: 1500, category: "haematology" },
  { id: "inv-pcv-neonate", name: "Packed Cell Volume (Neonate)", price: 1500, category: "haematology" },
  { id: "inv-haemoglobin-neonate", name: "Haemoglobin (Neonate)", price: 1500, category: "haematology" },
  { id: "inv-malaria-parasite", name: "Blood Film for Malaria Parasite", price: 1500, category: "haematology" },
  { id: "inv-cbc", name: "Complete Blood Count + Blood Film Pictures", price: 5000, category: "haematology" },
  { id: "inv-cbc-neonate", name: "Complete Blood Count (Neonate) + Blood Film Pictures", price: 5000, category: "haematology" },
  { id: "inv-esr", name: "ESR — Erythrocyte Sedimentation Rate", price: 5000, category: "haematology" },
  { id: "inv-pt-inr", name: "Prothrombin Time & INR", price: 20000, category: "haematology" },
  { id: "inv-coombs", name: "Indirect Coombs Test", price: 15000, category: "haematology" },

  { id: "inv-urinalysis", name: "Urinalysis", price: 4000, category: "microbiology" },
  { id: "inv-anc-urinalysis", name: "ANC — Urinalysis", price: 2000, category: "microbiology" },
  { id: "inv-anc-urinalysis-complete", name: "ANC — Urinalysis (Complete)", price: 4000, category: "microbiology" },
  { id: "inv-urine-mcs", name: "Urine Microscopy, Culture & Sensitivity (MCS)", price: 8000, category: "microbiology" },
  { id: "inv-urine-cs", name: "Urine Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-hvs-mcs", name: "HVS — High Vaginal Swab MCS", price: 8000, category: "microbiology" },
  { id: "inv-blood-culture", name: "Blood Culture", price: 15000, category: "microbiology" },
  { id: "inv-stool-microscopy", name: "Stool Microscopy", price: 5000, category: "microbiology" },
  { id: "inv-stool-mcs", name: "Stool Microscopy, Culture & Sensitivity", price: 12000, category: "microbiology" },
  { id: "inv-wound-cs", name: "Wound Swab Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-aspirate-cs", name: "Aspirate Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-pus-cs", name: "Pus Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-aural-cs", name: "Aural Swab Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-conjunctival-cs", name: "Conjunctival Swab Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-semen-cs", name: "Semen Culture & Sensitivity", price: 7000, category: "microbiology" },
  { id: "inv-sputum-mcs", name: "Sputum M/C/S", price: 12000, category: "microbiology" },
  { id: "inv-breast-milk-mcs", name: "Breast Milk MCS", price: 8000, category: "microbiology" },
  { id: "inv-igm-tb", name: "IgM Antibody to Tuberculosis", price: 5000, category: "microbiology" },
  { id: "inv-mantoux", name: "Mantoux", price: 15000, category: "microbiology" },

  { id: "inv-hbsag-rapid", name: "HBsAg — Hepatitis B Surface Antigen (Rapid)", price: 3000, category: "serology" },
  { id: "inv-hbsag-qualitative", name: "HBsAg — Hepatitis B Surface Antigen (Qualitative)", price: 20000, category: "serology" },
  { id: "inv-hcv-rapid", name: "HCV — Hepatitis C Antibody (Rapid)", price: 3000, category: "serology" },
  { id: "inv-hiv-rapid", name: "HIV I & II (Rapid)", price: 5000, category: "serology" },
  { id: "inv-pregnancy-hcg-rapid", name: "Pregnancy Test — hCG (Rapid)", price: 1500, category: "serology" },
  { id: "inv-hsv-rapid", name: "HSV I & II — Antibody (Rapid)", price: 15000, category: "serology" },
  { id: "inv-vdrl-rapid", name: "VDRL — Antibody (Rapid)", price: 3000, category: "serology" },
  { id: "inv-gonorrhoeae-rapid", name: "Neisseria Gonorrhoeae — Antigen (Rapid)", price: 10000, category: "serology" },
  { id: "inv-chlamydia-rapid", name: "Chlamydia — Antigen (Rapid)", price: 10000, category: "serology" },
  { id: "inv-widal", name: "Widal", price: 3000, category: "serology" },
  { id: "inv-seminalysis", name: "Seminalysis", price: 8000, category: "serology" },
  { id: "inv-drug-of-abuse", name: "Drug of Abuse", price: 20000, category: "serology" },
  { id: "inv-h-pylori", name: "Antibody to H. Pylori", price: 8000, category: "serology" },
  { id: "inv-hpv", name: "HPV — Human Papilloma Virus (Antigen)", price: 10000, category: "serology" },
  { id: "inv-std-panel", name: "STD Panel", price: 50000, category: "serology" },
];

export const INVESTIGATION_CATEGORIES: Record<InvestigationCategory, string> = {
  xray: "X-ray",
  ultrasound: "Ultrasound",
  biochem: "Clinical Biochemistry",
  haematology: "Haematology & Blood Banking",
  microbiology: "Microbiology",
  serology: "Serology",
};
