-- Seed catalog tables to mirror lib/bundles.ts.
-- Run after 0002_bookings.sql. Fully idempotent: safe to re-run after
-- editing the in-code catalog (re-runs will upsert and replace
-- bundle_test rows for the seeded bundles).
--
-- Test "names" are taken verbatim from lib/bundles.ts. Some entries
-- there (e.g. "Full Body Check panel", "Cardiac panel", "Free physician
-- consultation") are composites or services rather than discrete tests —
-- left as-is here so the seed matches the marketing site one-for-one.
-- Content owners can normalise once Healthray's test catalog is mapped
-- into the `lims_test_code` column.

begin;

-- ── Tests ──────────────────────────────────────────────────────
insert into public.test (code, name) values
  ('blood-disorders',                'Blood Disorders'),
  ('chlamydia-gonorrhea',            'Chlamydia / Gonorrhea'),
  ('herpes-simplex-virus-i',         'Herpes Simplex Virus I'),
  ('herpes-simplex-virus-ii',        'Herpes Simplex Virus II'),
  ('herpes-simplex-virus-i-ii',      'Herpes Simplex Virus I & II'),
  ('hiv-a-i',                        'HIV A/I'),
  ('hepatitis-b-surface-antigen',    'Hepatitis B Surface Antigen'),
  ('hepatitis-c-antibody',           'Hepatitis C Antibody'),
  ('hepatitis-b-c-antibody',         'Hepatitis B / C Antibody'),
  ('syphilis-serofast-diagnosis',    'Syphilis / Serofast Diagnosis'),
  ('trichomonas-vaginalis',          'Trichomonas Vaginalis'),
  ('mycoplasma-genitalium',          'Mycoplasma Genitalium'),
  ('full-std-plus-panel',            'Full STD Plus panel'),
  ('hpv-dna-test',                   'HPV DNA Test'),
  ('bacterial-vaginosis-screen',     'Bacterial Vaginosis Screen'),
  ('pcr-confirmation',               'PCR Confirmation'),
  ('free-physician-consultation',    'Free physician consultation'),
  ('physician-consultation',         'Physician consultation'),
  ('full-blood-count',               'Full Blood Count'),
  ('liver-function-test',            'Liver Function Test'),
  ('kidney-function-test',           'Kidney Function Test'),
  ('liver-kidney-function',          'Liver & Kidney Function'),
  ('lipid-profile',                  'Lipid Profile'),
  ('fasting-glucose',                'Fasting Glucose'),
  ('fasting-plasma-glucose',         'Fasting Plasma Glucose'),
  ('random-plasma-glucose',          'Random Plasma Glucose'),
  ('hba1c',                          'HbA1c'),
  ('urine-microalbumin',             'Urine Microalbumin'),
  ('urinalysis',                     'Urinalysis'),
  ('ecg',                            'ECG'),
  ('12-lead-ecg',                    '12-lead ECG'),
  ('stress-ecg',                     'Stress ECG'),
  ('hs-crp',                         'hs-CRP'),
  ('troponin-i',                     'Troponin I'),
  ('homocysteine',                   'Homocysteine'),
  ('apolipoprotein-b',               'Apolipoprotein B'),
  ('psa-prostate-specific-antigen',  'PSA (Prostate Specific Antigen)'),
  ('testosterone-total-free',        'Testosterone (Total & Free)'),
  ('cancer-markers-psa-cea-afp',     'Cancer markers (PSA, CEA, AFP)'),
  ('abdominal-ultrasound',           'Abdominal Ultrasound'),
  ('pelvic-ultrasound',              'Pelvic Ultrasound'),
  ('pap-smear',                      'Pap Smear'),
  ('hormonal-profile',               'Hormonal Profile'),
  ('thyroid-function',               'Thyroid Function'),
  ('amh-anti-mullerian-hormone',     'AMH (Anti-Müllerian Hormone)'),
  ('fsh-lh-estradiol-progesterone',  'FSH, LH, Estradiol, Progesterone'),
  ('prolactin',                      'Prolactin'),
  ('alt-ast',                        'ALT, AST'),
  ('alp-ggt',                        'ALP, GGT'),
  ('total-direct-bilirubin',         'Total / Direct Bilirubin'),
  ('total-protein-albumin',          'Total Protein & Albumin'),
  ('tsh',                            'TSH'),
  ('free-t3',                        'Free T3'),
  ('free-t4',                        'Free T4'),
  ('anti-tpo-antibody',              'Anti-TPO Antibody'),
  ('anti-tg-antibody',               'Anti-Tg Antibody'),
  ('full-body-check-panel',          'Full Body Check panel'),
  ('cardiac-panel',                  'Cardiac panel')
on conflict (code) do update set
  name = excluded.name;

-- ── Bundles ────────────────────────────────────────────────────
insert into public.bundle (slug, name, category, price, description, featured) values
  ('std-basic',   'STD Screening Basic',          'sexual',  50000,
    'A quick, confidential way to assess core sexually transmitted infections.', false),
  ('std-plus',    'STD Screening Plus',           'sexual',  75000,
    'Our most comprehensive STD panel — best value for complete peace of mind.', true),
  ('std-premium', 'STD Screening Premium',        'sexual',  95000,
    'Extended panel with rare markers and advanced diagnostics for total assurance.', false),
  ('full-body',   'Full Body Check',              'general', 45000,
    'A comprehensive head-to-toe health assessment covering all major organ systems.', false),
  ('cardiac',     'Cardiac Wellness',             'general', 60000,
    'Advanced cardiac markers and lipid assessment for heart-health monitoring.', false),
  ('diabetes',    'Diabetes Management',          'general', 38000,
    'Complete diabetes monitoring panel for ongoing glucose and metabolic management.', false),
  ('mens-pro',    'Men''s Health Pro',            'mens',    65000,
    'Targeted screening for prostate, hormonal, and metabolic male-health concerns.', false),
  ('executive',   'Executive Health Screen',      'mens',    120000,
    'The ultimate screen for busy professionals — complete organ and systems assessment.', false),
  ('womens',      'Women''s Wellness Complete',   'womens',  80000,
    'Comprehensive female-health panel covering hormonal, reproductive, and metabolic wellbeing.', false),
  ('fertility',   'Fertility Screening',          'womens',  55000,
    'Targeted reproductive-health assessment for women planning a pregnancy or monitoring fertility.', false),
  ('liver',       'Liver Health Panel',           'general', 32000,
    'Dedicated liver-function panel for monitoring hepatic enzymes and early damage detection.', false),
  ('thyroid',     'Thyroid Panel',                'general', 28000,
    'Complete thyroid workup for detecting hypo/hyperthyroidism and monitoring thyroid health.', false)
on conflict (slug) do update set
  name        = excluded.name,
  category    = excluded.category,
  price       = excluded.price,
  description = excluded.description,
  featured    = excluded.featured;

-- ── Bundle → Tests ─────────────────────────────────────────────
-- Wipe and re-insert only for the bundles we seed so that removed
-- tests don't linger after a catalog edit.
delete from public.bundle_test
where bundle_slug in (
  'std-basic','std-plus','std-premium','full-body','cardiac','diabetes',
  'mens-pro','executive','womens','fertility','liver','thyroid'
);

insert into public.bundle_test (bundle_slug, test_code) values
  -- std-basic
  ('std-basic',   'blood-disorders'),
  ('std-basic',   'chlamydia-gonorrhea'),
  ('std-basic',   'herpes-simplex-virus-i'),
  ('std-basic',   'herpes-simplex-virus-ii'),
  ('std-basic',   'hiv-a-i'),
  ('std-basic',   'hepatitis-b-surface-antigen'),
  ('std-basic',   'syphilis-serofast-diagnosis'),
  -- std-plus
  ('std-plus',    'chlamydia-gonorrhea'),
  ('std-plus',    'herpes-simplex-virus-i-ii'),
  ('std-plus',    'hiv-a-i'),
  ('std-plus',    'hepatitis-b-surface-antigen'),
  ('std-plus',    'hepatitis-c-antibody'),
  ('std-plus',    'syphilis-serofast-diagnosis'),
  ('std-plus',    'trichomonas-vaginalis'),
  ('std-plus',    'mycoplasma-genitalium'),
  -- std-premium
  ('std-premium', 'full-std-plus-panel'),
  ('std-premium', 'hpv-dna-test'),
  ('std-premium', 'bacterial-vaginosis-screen'),
  ('std-premium', 'pcr-confirmation'),
  ('std-premium', 'free-physician-consultation'),
  -- full-body
  ('full-body',   'full-blood-count'),
  ('full-body',   'liver-function-test'),
  ('full-body',   'kidney-function-test'),
  ('full-body',   'lipid-profile'),
  ('full-body',   'fasting-glucose'),
  ('full-body',   'urinalysis'),
  ('full-body',   'ecg'),
  -- cardiac
  ('cardiac',     '12-lead-ecg'),
  ('cardiac',     'lipid-profile'),
  ('cardiac',     'hs-crp'),
  ('cardiac',     'troponin-i'),
  ('cardiac',     'homocysteine'),
  ('cardiac',     'apolipoprotein-b'),
  -- diabetes
  ('diabetes',    'fasting-plasma-glucose'),
  ('diabetes',    'hba1c'),
  ('diabetes',    'random-plasma-glucose'),
  ('diabetes',    'urine-microalbumin'),
  ('diabetes',    'lipid-profile'),
  ('diabetes',    'kidney-function-test'),
  -- mens-pro
  ('mens-pro',    'psa-prostate-specific-antigen'),
  ('mens-pro',    'testosterone-total-free'),
  ('mens-pro',    'full-blood-count'),
  ('mens-pro',    'lipid-profile'),
  ('mens-pro',    'liver-kidney-function'),
  ('mens-pro',    'ecg'),
  -- executive
  ('executive',   'full-body-check-panel'),
  ('executive',   'cardiac-panel'),
  ('executive',   'cancer-markers-psa-cea-afp'),
  ('executive',   'stress-ecg'),
  ('executive',   'abdominal-ultrasound'),
  ('executive',   'physician-consultation'),
  -- womens
  ('womens',      'pap-smear'),
  ('womens',      'hormonal-profile'),
  ('womens',      'full-blood-count'),
  ('womens',      'lipid-profile'),
  ('womens',      'thyroid-function'),
  ('womens',      'pelvic-ultrasound'),
  -- fertility
  ('fertility',   'amh-anti-mullerian-hormone'),
  ('fertility',   'fsh-lh-estradiol-progesterone'),
  ('fertility',   'prolactin'),
  ('fertility',   'thyroid-function'),
  ('fertility',   'pelvic-ultrasound'),
  -- liver
  ('liver',       'alt-ast'),
  ('liver',       'alp-ggt'),
  ('liver',       'total-direct-bilirubin'),
  ('liver',       'total-protein-albumin'),
  ('liver',       'hepatitis-b-c-antibody'),
  -- thyroid
  ('thyroid',     'tsh'),
  ('thyroid',     'free-t3'),
  ('thyroid',     'free-t4'),
  ('thyroid',     'anti-tpo-antibody'),
  ('thyroid',     'anti-tg-antibody');

commit;
