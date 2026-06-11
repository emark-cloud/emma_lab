/* Individual diagnostic tests sourced from lab.md / lab2.md (Emma Lab price
   list). Category IDs match SERVICES in landing-data.ts so the ServicesTabs
   sidebar can filter directly.

   `aliases` covers the common acronyms and local names patients use when
   searching — FBC for CBC, U&E for electrolytes, etc. The search builds a
   normalized haystack from name + aliases. */

export type InvestigationCategory =
  | "xray"
  | "ultrasound"
  | "ecg"
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
  { id: "inv-xray-rug", name: "RUG — Retrograde Urethrogram", price: 45000, category: "xray", aliases: ["RUG", "Urethrogram"] },
  { id: "inv-xray-mucg", name: "MUCG — Micturating Urethrogram", price: 45000, category: "xray", aliases: ["MUCG", "Micturating Cystourethrogram", "MCU"] },
  { id: "inv-xray-rug-mucg", name: "RUG + MUCG (Combo)", price: 75000, category: "xray", aliases: ["RUG MUCG", "Urethrogram Combo"] },
  { id: "inv-xray-hsg", name: "HSG — Hysterosalpingogram", price: 38000, category: "xray", aliases: ["HSG", "Tubal Patency"] },
  { id: "inv-xray-chest-pa-lat", name: "Chest X-ray (PA/Lat)", price: 15000, category: "xray", aliases: ["CXR PA Lat", "Chest PA Lateral"] },
  { id: "inv-xray-chest", name: "Chest X-ray", price: 8000, category: "xray", aliases: ["CXR", "Lung X-ray"] },
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

  // Skeletal — missing views
  { id: "inv-xray-finger", name: "Finger X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("finger", "Fingers") },
  { id: "inv-xray-thumb", name: "Thumb X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("thumb", "Thumbs") },
  { id: "inv-xray-patella", name: "Patella X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("patella", "Patellas"), aliases: ["Kneecap X-ray"] },
  { id: "inv-xray-calcaneus", name: "Calcaneus X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("calcaneus", "Calcanei"), aliases: ["Heel Bone X-ray"] },
  { id: "inv-xray-sacrum", name: "Sacrum X-ray", price: 12000, category: "xray" },
  { id: "inv-xray-coccyx", name: "Coccyx X-ray", price: 12000, category: "xray", aliases: ["Tailbone X-ray"] },
  { id: "inv-xray-sacrococcygeal", name: "Sacrococcygeal X-ray", price: 12000, category: "xray", aliases: ["Sacrococcyx X-ray"] },
  { id: "inv-xray-sternum", name: "Sternum X-ray", price: 12000, category: "xray", aliases: ["Breastbone X-ray"] },
  { id: "inv-xray-ribs", name: "Ribs X-ray", price: 12000, category: "xray", aliases: ["Rib X-ray"] },
  { id: "inv-xray-scapula", name: "Scapula X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("scapula", "Scapulae"), aliases: ["Shoulder Blade X-ray"] },
  { id: "inv-xray-facial-bones", name: "Facial Bones X-ray", price: 12000, category: "xray", aliases: ["Face X-ray"] },
  { id: "inv-xray-orbit", name: "Orbit X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("orbit", "Orbits"), aliases: ["Eye Socket X-ray"] },
  { id: "inv-xray-nasal-bone", name: "Nasal Bone X-ray", price: 12000, category: "xray", aliases: ["Nose X-ray"] },
  { id: "inv-xray-tmj", name: "Temporomandibular Joint X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("tmj", "TMJs"), aliases: ["TMJ X-ray", "Jaw Joint X-ray"] },
  { id: "inv-xray-mastoid", name: "Mastoid X-ray", price: 12000, category: "xray", pair: XRAY_PAIR("mastoid", "Mastoids"), aliases: ["Mastoid Process X-ray"] },
  { id: "inv-xray-full-spine", name: "Full Spine X-ray", price: 20000, category: "xray", aliases: ["Whole Spine X-ray", "Scoliosis X-ray"] },
  { id: "inv-xray-bone-age", name: "Bone Age Study", price: 15000, category: "xray", aliases: ["Bone Age", "Skeletal Maturity", "Wrist Age X-ray"] },
  { id: "inv-xray-skeletal-survey", name: "Skeletal Survey", price: 50000, category: "xray", aliases: ["Bone Survey", "Metastatic Survey"] },

  // Contrast studies
  { id: "inv-xray-barium-swallow", name: "Barium Swallow", price: 35000, category: "xray", aliases: ["Barium Oesophagram", "Swallowing Study"] },
  { id: "inv-xray-barium-meal", name: "Barium Meal", price: 35000, category: "xray", aliases: ["Upper GI Barium", "Stomach Barium"] },
  { id: "inv-xray-barium-enema", name: "Barium Enema", price: 40000, category: "xray", aliases: ["Lower GI Barium", "Colon Barium"] },
  { id: "inv-xray-ivu", name: "IVU — Intravenous Urogram", price: 45000, category: "xray", aliases: ["IVP", "Intravenous Pyelogram", "Kidney Contrast X-ray"] },
  { id: "inv-xray-cystogram", name: "Cystogram", price: 35000, category: "xray", aliases: ["Bladder Contrast Study"] },
  { id: "inv-xray-sinogram", name: "Sinogram / Fistulogram", price: 35000, category: "xray", aliases: ["Fistulogram", "Sinus Tract Study"] },
  { id: "inv-xray-loopogram", name: "Loopogram", price: 35000, category: "xray", aliases: ["Ileal Loop Study", "Conduit Study"] },
  { id: "inv-xray-sialogram", name: "Sialogram", price: 35000, category: "xray", aliases: ["Salivary Gland Contrast", "Parotid Duct Study"] },
  { id: "inv-xray-myelogram", name: "Myelogram", price: 50000, category: "xray", aliases: ["Spinal Contrast Study"] },

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

  // Obstetric
  { id: "inv-us-obstetric-dating", name: "Obstetric Scan (Dating / 1st Trimester)", price: 6000, category: "ultrasound", aliases: ["Dating Scan", "Booking Scan", "1st Trimester Scan"] },
  { id: "inv-us-obstetric-anomaly", name: "Obstetric Scan (Anomaly / 2nd Trimester)", price: 10000, category: "ultrasound", aliases: ["Anomaly Scan", "20-Week Scan", "Morphology Scan"] },
  { id: "inv-us-obstetric-growth", name: "Obstetric Scan (Growth / 3rd Trimester)", price: 8000, category: "ultrasound", aliases: ["Growth Scan", "3rd Trimester Scan"] },
  { id: "inv-us-foetal-doppler", name: "Foetal Doppler Study", price: 15000, category: "ultrasound", aliases: ["Umbilical Artery Doppler", "Fetal Doppler"] },
  { id: "inv-us-cervical-length", name: "Cervical Length Measurement", price: 8000, category: "ultrasound", aliases: ["Cervical Length", "Preterm Risk Scan"] },

  // Organ-specific
  { id: "inv-us-renal", name: "Renal Scan", price: 10000, category: "ultrasound", aliases: ["Kidney Scan", "Renal Ultrasound", "KUB Ultrasound"] },
  { id: "inv-us-liver", name: "Liver Scan", price: 10000, category: "ultrasound", aliases: ["Liver Ultrasound", "Hepatic Scan"] },
  { id: "inv-us-gallbladder", name: "Gallbladder Scan", price: 10000, category: "ultrasound", aliases: ["Gallbladder Ultrasound", "Biliary Scan"] },
  { id: "inv-us-hepatobiliary", name: "Hepatobiliary Scan", price: 12000, category: "ultrasound", aliases: ["Liver Gallbladder Scan", "Hepatobiliary Ultrasound"] },
  { id: "inv-us-spleen", name: "Splenic Scan", price: 8000, category: "ultrasound", aliases: ["Spleen Scan", "Spleen Ultrasound"] },
  { id: "inv-us-pancreas", name: "Pancreatic Scan", price: 10000, category: "ultrasound", aliases: ["Pancreas Ultrasound"] },
  { id: "inv-us-adrenal", name: "Adrenal Gland Scan", price: 12000, category: "ultrasound", aliases: ["Adrenal Ultrasound"] },
  { id: "inv-us-bladder", name: "Urinary Bladder Scan", price: 6000, category: "ultrasound", aliases: ["Bladder Ultrasound", "Post-Void Residual"] },
  { id: "inv-us-axilla", name: "Axillary Scan", price: 10000, category: "ultrasound", aliases: ["Axilla Ultrasound", "Armpit Scan"] },
  { id: "inv-us-inguinal", name: "Inguinal Region Scan", price: 10000, category: "ultrasound", aliases: ["Inguinal Ultrasound", "Groin Scan"] },
  { id: "inv-us-salivary-gland", name: "Salivary Gland Scan", price: 10000, category: "ultrasound", aliases: ["Parotid Scan", "Salivary Gland Ultrasound"] },
  { id: "inv-us-neonatal-brain", name: "Neonatal Brain Scan", price: 15000, category: "ultrasound", aliases: ["Cranial Ultrasound", "Neonatal Head Scan", "Fontanelle Scan"] },
  { id: "inv-us-infant-hip", name: "Infant Hip Scan", price: 12000, category: "ultrasound", aliases: ["Hip Dysplasia Scan", "DDH Scan"] },

  // Doppler / vascular
  { id: "inv-us-carotid-doppler", name: "Carotid Doppler Study", price: 20000, category: "ultrasound", aliases: ["Carotid Ultrasound", "Carotid Doppler"] },
  { id: "inv-us-lower-limb-doppler", name: "Lower Limb Doppler Study", price: 20000, category: "ultrasound", aliases: ["DVT Scan", "Venous Doppler", "Lower Limb Venous"] },
  { id: "inv-us-upper-limb-doppler", name: "Upper Limb Doppler Study", price: 20000, category: "ultrasound", aliases: ["Upper Limb Venous", "Arm Doppler"] },
  { id: "inv-us-scrotal-doppler", name: "Scrotal Doppler Study", price: 20000, category: "ultrasound", aliases: ["Testicular Doppler", "Varicocele Scan"] },
  { id: "inv-us-renal-doppler", name: "Renal Doppler Study", price: 20000, category: "ultrasound", aliases: ["Renal Artery Doppler", "Kidney Doppler"] },
  { id: "inv-us-hepatic-doppler", name: "Hepatic Doppler Study", price: 20000, category: "ultrasound", aliases: ["Portal Vein Doppler", "Hepatic Vein Doppler"] },

  // Soft tissue / musculoskeletal
  { id: "inv-us-soft-tissue", name: "Soft Tissue Scan", price: 10000, category: "ultrasound", aliases: ["Soft Tissue Ultrasound", "Lump Scan"] },
  { id: "inv-us-musculoskeletal", name: "Musculoskeletal Scan", price: 12000, category: "ultrasound", aliases: ["MSK Scan", "Joint Ultrasound", "Tendon Scan"] },
  { id: "inv-us-shoulder", name: "Shoulder Scan", price: 12000, category: "ultrasound", aliases: ["Shoulder Ultrasound", "Rotator Cuff Scan"] },

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
  { id: "inv-cea", name: "CEA — Carcinoembryonic Antigen", price: 20000, category: "biochem", aliases: ["CEA"] },
  { id: "inv-ca-125", name: "CA-125 (Cancer Antigen-125)", price: 20000, category: "biochem", aliases: ["CA125", "Ovarian Cancer Marker"] },
  { id: "inv-rheumatoid-factor", name: "Rheumatoid Factor", price: 20000, category: "biochem", aliases: ["RF", "RhF"] },
  { id: "inv-troponin-i", name: "Cardiac Troponin I (cTnI)", price: 20000, category: "biochem", aliases: ["Troponin I", "cTnI", "Heart Attack Test"] },
  { id: "inv-creatine-kinase-mb", name: "Creatine Kinase-MB", price: 20000, category: "biochem", aliases: ["CK-MB", "CKMB"] },
  { id: "inv-troponin-t", name: "Cardiac Troponin T (cTnT)", price: 20000, category: "biochem", aliases: ["Troponin T", "cTnT"] },
  { id: "inv-fecal-immunochemical", name: "Fecal Immunochemical Test", price: 20000, category: "biochem", aliases: ["FIT", "Faecal Immunochemical"] },
  { id: "inv-fecal-occult-blood", name: "Fecal Occult Blood", price: 20000, category: "biochem", aliases: ["FOB", "Faecal Occult Blood", "Blood in Stool"] },

  // Liver enzymes (individual)
  { id: "inv-alt", name: "ALT — Alanine Aminotransferase", price: 8000, category: "biochem", aliases: ["ALT", "SGPT", "Liver Enzyme"] },
  { id: "inv-ast", name: "AST — Aspartate Aminotransferase", price: 8000, category: "biochem", aliases: ["AST", "SGOT"] },
  { id: "inv-ggt", name: "GGT — Gamma-Glutamyl Transferase", price: 8000, category: "biochem", aliases: ["GGT", "Gamma GT"] },
  { id: "inv-total-bilirubin", name: "Total Bilirubin", price: 8000, category: "biochem", aliases: ["TBil", "Bilirubin Total"] },
  { id: "inv-direct-bilirubin", name: "Direct Bilirubin", price: 8000, category: "biochem", aliases: ["DBil", "Conjugated Bilirubin"] },
  { id: "inv-indirect-bilirubin", name: "Indirect Bilirubin", price: 8000, category: "biochem", aliases: ["IBil", "Unconjugated Bilirubin"] },

  // Pancreatic
  { id: "inv-amylase", name: "Amylase", price: 10000, category: "biochem", aliases: ["Serum Amylase", "Pancreatic Amylase"] },
  { id: "inv-lipase", name: "Lipase", price: 10000, category: "biochem", aliases: ["Serum Lipase", "Pancreatic Lipase"] },

  // Electrolytes (individual)
  { id: "inv-sodium", name: "Sodium", price: 5000, category: "biochem", aliases: ["Na", "Serum Sodium"] },
  { id: "inv-potassium", name: "Potassium", price: 5000, category: "biochem", aliases: ["K", "Serum Potassium"] },
  { id: "inv-chloride", name: "Chloride", price: 5000, category: "biochem", aliases: ["Cl", "Serum Chloride"] },
  { id: "inv-bicarbonate", name: "Bicarbonate", price: 5000, category: "biochem", aliases: ["HCO3", "Bicarb"] },
  { id: "inv-magnesium", name: "Magnesium", price: 8000, category: "biochem", aliases: ["Mg", "Serum Magnesium"] },
  { id: "inv-phosphate", name: "Phosphate", price: 8000, category: "biochem", aliases: ["Inorganic Phosphorus", "PO4"] },

  // Iron studies
  { id: "inv-tibc", name: "TIBC — Total Iron Binding Capacity", price: 10000, category: "biochem", aliases: ["TIBC", "Total Iron Binding"] },

  // Hormones (individual / additional)
  { id: "inv-fsh", name: "FSH — Follicle Stimulating Hormone", price: 15000, category: "biochem", aliases: ["FSH"] },
  { id: "inv-lh", name: "LH — Luteinising Hormone", price: 15000, category: "biochem", aliases: ["LH"] },
  { id: "inv-estradiol", name: "Oestradiol (E2)", price: 15000, category: "biochem", aliases: ["Estradiol", "E2"] },
  { id: "inv-testosterone-female", name: "Testosterone (Female)", price: 20000, category: "biochem", aliases: ["Female Testosterone"] },
  { id: "inv-amh", name: "AMH — Anti-Müllerian Hormone", price: 35000, category: "biochem", aliases: ["AMH", "Ovarian Reserve"] },

  // Metabolic
  { id: "inv-2hr-ppg", name: "2-Hour Post-Prandial Glucose", price: 3000, category: "biochem", aliases: ["2hr PPG", "Post Prandial Sugar", "Post Meal Glucose"] },
  { id: "inv-ogtt", name: "Oral Glucose Tolerance Test", price: 8000, category: "biochem", aliases: ["OGTT", "Glucose Tolerance"] },

  // Inflammatory / other markers
  { id: "inv-ldh", name: "LDH — Lactate Dehydrogenase", price: 10000, category: "biochem", aliases: ["LDH", "Lactate Dehydrogenase"] },
  { id: "inv-fibrinogen-biochem", name: "Fibrinogen", price: 15000, category: "biochem", aliases: ["Fibrinogen Level", "Clotting Factor"] },

  // Tumour markers (additional)
  { id: "inv-ca-19-9", name: "CA 19-9 (Cancer Antigen 19-9)", price: 20000, category: "biochem", aliases: ["CA19-9", "Pancreatic Cancer Marker"] },
  { id: "inv-ca-15-3", name: "CA 15-3 (Cancer Antigen 15-3)", price: 20000, category: "biochem", aliases: ["CA15-3", "Breast Cancer Marker"] },
  { id: "inv-beta-hcg-quantitative", name: "Beta hCG (Quantitative)", price: 15000, category: "biochem", aliases: ["Quantitative hCG", "Beta HCG Quant"] },

  { id: "inv-blood-group", name: "Blood Group", price: 1500, category: "haematology", aliases: ["Blood Type", "ABO", "ABO Rh"] },
  { id: "inv-genotype", name: "Genotype", price: 5000, category: "haematology", aliases: ["Hb Genotype", "Sickle Cell"] },
  { id: "inv-blood-group-genotype", name: "Blood Group & Genotype", price: 5000, category: "haematology", aliases: ["BG Genotype"] },
  { id: "inv-pcv", name: "Packed Cell Volume", price: 1500, category: "haematology", aliases: ["PCV", "Hematocrit", "Haematocrit"] },
  { id: "inv-haemoglobin", name: "Haemoglobin", price: 1500, category: "haematology", aliases: ["Hb", "Hgb", "Hemoglobin"] },
  { id: "inv-pcv-neonate", name: "Packed Cell Volume (Neonate)", price: 1500, category: "haematology", aliases: ["PCV Neonate"] },
  { id: "inv-haemoglobin-neonate", name: "Haemoglobin (Neonate)", price: 1500, category: "haematology", aliases: ["Hb Neonate"] },
  { id: "inv-malaria-parasite", name: "Blood Film for Malaria Parasite", price: 1500, category: "haematology", aliases: ["MP", "BFMP", "Malaria Test", "MPS"] },
  { id: "inv-cbc", name: "Complete Blood Count + Blood Film Pictures", price: 5000, category: "haematology", aliases: ["CBC", "FBC", "Full Blood Count", "FBC BFP"] },
  { id: "inv-esr", name: "ESR — Erythrocyte Sedimentation Rate", price: 5000, category: "haematology", aliases: ["ESR", "Sed Rate"] },
  { id: "inv-pt-inr", name: "Prothrombin Time & INR", price: 20000, category: "haematology", aliases: ["PT", "INR", "PT/INR", "Coagulation", "Clotting Time"] },
  { id: "inv-coombs", name: "Indirect Coombs Test", price: 15000, category: "haematology", aliases: ["ICT", "Indirect Antiglobulin"] },
  { id: "inv-direct-coombs", name: "Direct Coombs Test", price: 15000, category: "haematology", aliases: ["DCT", "Direct Antiglobulin Test", "DAT"] },
  { id: "inv-aptt", name: "APTT — Activated Partial Thromboplastin Time", price: 15000, category: "haematology", aliases: ["APTT", "PTTK", "PTT"] },
  { id: "inv-thrombin-time", name: "Thrombin Time", price: 15000, category: "haematology", aliases: ["TT", "Thrombin Clotting Time"] },
  { id: "inv-fibrinogen-haem", name: "Fibrinogen", price: 15000, category: "haematology", aliases: ["Fibrinogen Level", "Clotting Factor"] },
  { id: "inv-bleeding-time", name: "Bleeding Time", price: 5000, category: "haematology", aliases: ["BT"] },
  { id: "inv-clotting-time", name: "Clotting Time", price: 5000, category: "haematology", aliases: ["CT"] },
  { id: "inv-g6pd", name: "G6PD — Glucose-6-Phosphate Dehydrogenase", price: 10000, category: "haematology", aliases: ["G6PD", "G6PD Deficiency"] },
  { id: "inv-hb-electrophoresis", name: "Haemoglobin Electrophoresis", price: 15000, category: "haematology", aliases: ["Hb Electrophoresis", "Haemoglobinopathy Screen"] },
  { id: "inv-microfilaria", name: "Blood Film for Microfilaria", price: 5000, category: "haematology", aliases: ["Microfilaria", "Filariasis", "BFMF"] },
  { id: "inv-platelet-count", name: "Platelet Count", price: 3000, category: "haematology", aliases: ["PLT", "Thrombocytes"] },
  { id: "inv-wbc-differential", name: "WBC & Differential Count", price: 3000, category: "haematology", aliases: ["WBC Diff", "White Cell Differential", "Leucocyte Count"] },
  { id: "inv-peripheral-blood-film", name: "Peripheral Blood Film", price: 5000, category: "haematology", aliases: ["PBF", "Blood Smear"] },

  { id: "inv-urinalysis", name: "Urinalysis", price: 4000, category: "microbiology", aliases: ["UA", "Urine Test", "Urine Dipstick"] },
  { id: "inv-urine-mcs", name: "Urine Microscopy, Culture & Sensitivity (MCS)", price: 8000, category: "microbiology", aliases: ["MSU", "Urine MCS", "Urine Culture"] },
  { id: "inv-hvs-mcs", name: "HVS — High Vaginal Swab MCS", price: 8000, category: "microbiology", aliases: ["HVS", "Vaginal Swab"] },
  { id: "inv-blood-culture", name: "Blood Culture", price: 15000, category: "microbiology", aliases: ["BC", "Blood C/S"] },
  { id: "inv-stool-microscopy", name: "Stool Microscopy", price: 5000, category: "microbiology", aliases: ["Stool Test", "Ova and Parasite", "O&P"] },
  { id: "inv-stool-mcs", name: "Stool Microscopy, Culture & Sensitivity", price: 12000, category: "microbiology", aliases: ["Stool MCS", "Stool Culture"] },
  { id: "inv-wound-cs", name: "Wound Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Wound MCS"] },
  { id: "inv-aspirate-cs", name: "Aspirate Culture & Sensitivity", price: 8000, category: "microbiology" },
  { id: "inv-pus-cs", name: "Pus Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Pus MCS"] },
  { id: "inv-aural-cs", name: "Aural Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Ear Swab"] },
  { id: "inv-conjunctival-cs", name: "Conjunctival Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Eye Swab"] },
  { id: "inv-seminalysis", name: "Seminalysis", price: 8000, category: "microbiology", aliases: ["Semen Analysis", "Sperm Count", "SFA"] },
  { id: "inv-seminalysis-cs", name: "Seminalysis, Culture & Sensitivity", price: 15000, category: "microbiology", aliases: ["Semen MCS", "Semen Analysis Culture"] },
  { id: "inv-sputum-mcs", name: "Sputum M/C/S", price: 12000, category: "microbiology", aliases: ["Sputum Culture", "Sputum MCS"] },
  { id: "inv-breast-milk-mcs", name: "Breast Milk MCS", price: 8000, category: "microbiology" },
  { id: "inv-throat-swab-cs", name: "Throat Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Throat MCS", "Throat Culture"] },
  { id: "inv-nasal-swab-cs", name: "Nasal Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Nasal MCS", "Nasal Culture"] },
  { id: "inv-urethral-swab-cs", name: "Urethral Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Urethral MCS", "Urethral Culture"] },
  { id: "inv-endocervical-swab-cs", name: "Endocervical Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Endocervical MCS", "Cervical Swab"] },
  { id: "inv-rectal-swab-cs", name: "Rectal Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Rectal MCS", "Rectal Culture"] },
  { id: "inv-csf-cs", name: "CSF Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Cerebrospinal Fluid Culture", "CSF MCS"] },
  { id: "inv-pleural-fluid-cs", name: "Pleural Fluid Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Pleural MCS", "Pleural Culture"] },
  { id: "inv-ascitic-fluid-cs", name: "Ascitic Fluid Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Peritoneal Fluid MCS", "Ascites Culture"] },
  { id: "inv-synovial-fluid-cs", name: "Synovial Fluid Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Joint Fluid MCS", "Joint Fluid Culture"] },
  { id: "inv-nasopharyngeal-swab-cs", name: "Nasopharyngeal Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["NPS MCS", "NPS Culture", "Nasopharyngeal MCS"] },
  { id: "inv-pericardial-fluid-cs", name: "Pericardial Fluid Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Pericardial MCS", "Pericardial Culture"] },
  { id: "inv-bile-cs", name: "Bile Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Bile MCS", "Bile Culture"] },
  { id: "inv-prostatic-fluid-cs", name: "Prostatic Fluid Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Prostatic MCS", "Prostatic Secretion Culture"] },
  { id: "inv-umbilical-swab-cs", name: "Umbilical Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Umbilical MCS", "Cord Swab Culture"] },
  { id: "inv-skin-swab-cs", name: "Skin Swab Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Skin MCS", "Skin Culture"] },
  { id: "inv-catheter-tip-cs", name: "Catheter Tip Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Catheter MCS", "IV Tip Culture"] },
  { id: "inv-tracheal-aspirate-cs", name: "Tracheal Aspirate Culture & Sensitivity", price: 8000, category: "microbiology", aliases: ["Tracheal MCS", "ET Aspirate Culture"] },
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
  { id: "inv-drug-of-abuse", name: "Drug of Abuse", price: 20000, category: "serology", aliases: ["DOA", "Drug Test", "Substance Screen"] },
  { id: "inv-igm-tb", name: "IgM Antibody to Tuberculosis", price: 5000, category: "serology", aliases: ["TB IgM", "Tuberculosis"] },
  { id: "inv-h-pylori", name: "Antibody to H. Pylori", price: 8000, category: "serology", aliases: ["H Pylori", "Helicobacter Pylori", "Ulcer Test"] },
  { id: "inv-h-pylori-stool-ag", name: "H. Pylori — Stool Antigen", price: 20000, category: "serology", aliases: ["H Pylori Stool", "Helicobacter Pylori Stool Antigen", "HpSA"] },
  { id: "inv-hpv", name: "HPV — Human Papilloma Virus (Antigen)", price: 10000, category: "serology", aliases: ["HPV"] },
  { id: "inv-std-panel", name: "STD Panel", price: 50000, category: "serology", aliases: ["STI Panel", "STD Screen"] },

  // Electrocardiography
  { id: "inv-ecg-resting", name: "Resting 12-Lead ECG", price: 7000, category: "ecg", aliases: ["ECG", "EKG", "Resting ECG"] },
  { id: "inv-ecg-stress", name: "Stress ECG", price: 7000, category: "ecg", aliases: ["Exercise ECG", "ETT", "Exercise Tolerance Test", "Stress Test"] },
];

export const INVESTIGATION_CATEGORIES: Record<InvestigationCategory, string> = {
  xray: "X-ray",
  ultrasound: "Ultrasound",
  ecg: "Electrocardiography",
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
