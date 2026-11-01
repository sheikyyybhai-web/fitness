# FITNESS METRIC — Evidence-Based Fitness, Nutrition & Movement Science Platform

> **"Data-Driven Body Composition, Clinical Nutrition Analytics & Biomechanical Education"**

![Brand](https://img.shields.io/badge/Brand-FITNESS%20METRIC-527A61?style=for-the-badge&logoColor=white)
![Palette](https://img.shields.io/badge/Palette-Warm%20Off--White%20%7C%20Forest%20Green-DCE8DE?style=for-the-badge&color=527A61)
![Tests](https://img.shields.io/badge/Tests-111%20Passed%20(100%25)-16A34A?style=for-the-badge)
![Security](https://img.shields.io/badge/Security-RLS%20Enforced%20(15%20Tables)-527A61?style=for-the-badge)
![Database](https://img.shields.io/badge/Database-Supabase%20PostgreSQL-3E5C49?style=for-the-badge)

**Fitness Metric** is a modern, professional, fully responsive web application engineered for individuals who demand rigorous mathematical accuracy in body composition tracking, authoritative nutritional biochemistry, and evidence-based exercise biomechanics.

---

## ⚡ Instant Quick Start (Zero Setup Required)

Launch the complete application immediately in any modern web browser without installing Node.js or complex dependencies:

1. **Open `index.html` directly in your browser** (Chrome, Microsoft Edge, Brave, Safari, or Firefox):
   ```text
   file:///C:/Users/Sheik%20Mohamed/.gemini/antigravity/scratch/fitmetric/index.html
   ```

2. **1-Click Role Testing**:
   - **User / Member Experience**: Inspect personal BMI, TDEE, lean body mass, daily nutrition budget, logged meals, and weekly workouts.
   - **Administrator Console**: Click **"Admin"** in the bottom role switcher to access the protected administration dashboard, manage food records, publish/unpublish items, validate JSON batch imports, and inspect tamper-evident audit logs.

3. **Dual Persistence Mode**:
   - **Out-of-the-Box**: Operates with zero configuration using browser `localStorage` persistence and verified pre-seeded data.
   - **Live Supabase Sync**: Connect your real Supabase project at any time via the in-app **Settings & Supabase** interface or `.env` configuration.

---

## 🎨 Unique Brand Identity & UI Design

- **Wordmark**: **Fitness Metric**
- **Geometric Logo**: Minimalist delta-metric polygon with calibrated coordinate peaks.
- **Color Palette**:
  - Primary Background: Warm off-white (`#F7F7F2`)
  - Primary Text: Deep charcoal (`#202522`)
  - Accent: Muted forest green (`#527A61`)
  - Secondary Accent: Soft sage (`#DCE8DE`)
  - Cards & Panels: Pure white (`#FFFFFF`)
  - Subtle Borders: Light grey (`#E4E7E2`)
  - Warnings & Notes: Soft amber (`#D97706`)
  - Errors & Alerts: Muted red (`#DC2626`)
- **Navigation**: Persistent left sidebar on desktop, responsive slide-out drawer on mobile, and sticky contextual action topbar with unit system toggle (`Metric kg/cm` $\leftrightarrow$ `Imperial lb/in`).

---

## 🧮 The Five Core Modules

### 1. Module One — Fitness Metric Dashboard & Body Calculators

Interactive scientific calculation tools with instant recalculation, clinical formulas, expandable educational notes, and save-to-profile history:

1. **BMI (Body Mass Index)**: Standard $\text{weight (kg)} / (\text{height (m)})^2$ with WHO classifications, healthy reference weight boundaries, and muscularity caveats.
2. **BMR (Basal Metabolic Rate)**: Clinically validated **Mifflin–St Jeor (1990)** equation for resting cellular and organ metabolic maintenance.
3. **TDEE (Total Daily Energy Expenditure)**: BMR scaled by physical activity multipliers ($1.2\times$ sedentary to $1.9\times$ heavy labor) with TEF and NEAT breakdowns.
4. **LBM (Lean Body Mass)**: Dual estimation using the **Boer Formula (1984)** and direct Body-Fat % method.
5. **Fat Mass**: Quantitative adipose tissue calculation ($\text{Weight} - \text{LBM}$) with body composition percentages.
6. **Body-Fat Percentage**: **U.S. Navy Circumference Method** (neck, waist, hip, and height) with clear anthropometric variance disclosures ($\pm 3-4\%$).
7. **Ideal/Reference Weight Range**: BMI 18.5–24.9 healthy reference spectrum combined with the **Devine (1974)** reference midpoint.
8. **Waist-to-Height Ratio (WHtR)**: Cardiometabolic risk indicator supported by UK NICE and WHO ("Keep your waist to less than half your height").
9. **Daily Protein Requirement**: Configurable $0.8 - 2.6\text{ g/kg}$ slider calibrated for sedentary maintenance, ISSN hypertrophy guidelines ($1.6 - 2.2\text{ g/kg}$), and caloric deficit muscle preservation ($2.0 - 2.4\text{ g/kg}$).
10. **Daily Fiber Requirement**: Age and sex appropriate Dietary Guidelines for Americans standards ($25\text{g}$ female, $38\text{g}$ male or $14\text{g} / 1,000\text{ kcal}$).
11. **Daily Calorie Goal**: Mild and moderate deficit/surplus calibration with automatic clinical floor safeguards ($<1200\text{ kcal}$ female, $<1500\text{ kcal}$ male flagged as unsafe).
12. **Macronutrient Planner**: Real-time gram and calorie distribution for Protein ($4\text{ kcal/g}$), Carbohydrates ($4\text{ kcal/g}$), and Fat ($9\text{ kcal/g}$).

---

### 2. Module Two — Food Database & Complete Nutrition Explorer

An authentic, attributable food composition catalog cross-referenced against **USDA FoodData Central** and the **ICMR-NIN Indian Food Composition Tables (IFCT)**:

- **18 Comprehensive Food Categories**:
  Eggs, Chicken, Fish and seafood, Meat, Milk and dairy, Paneer and cheese, Soy products and tofu, Lentils and dals, Beans and legumes, Nuts and seeds, Cereals and whole grains, Rice and millets, Fruits, Vegetables, Protein-rich snacks, Vegetarian protein sources, Vegan protein sources, Common Indian foods and meals, Common international foods.
- **Full Nutritional Profile**:
  - **Macronutrients**: Calories (kcal), Protein (g), Carbohydrates (g), Total fat (g), Saturated fat (g), Dietary fiber (g), Sugars (g), Cholesterol (mg).
  - **Complete Vitamin Spectrum**: Vitamin A, B1 (Thiamin), B2 (Riboflavin), B3 (Niacin), B5 (Pantothenic acid), B6, B7 (Biotin), B9 (Folate), B12, C, D, E, K. Unavailable values are explicitly presented as *"Not available"*, never arbitrary zeros.
  - **Essential Minerals**: Calcium, Iron, Magnesium, Phosphorus, Potassium, Sodium, Zinc, Copper, Manganese, Selenium, Iodine.
- **Interactive Serving-Size Scaler**: Real-time proportional recalculation for any custom gram portion.
- **Side-by-Side Comparison Tool**: Compare 2 or 3 foods side-by-side across all macro and micronutrient metrics.
- **Daily Nutrition Tracker (Food Log)**: Categorized meal logging (Breakfast, Lunch, Dinner, Snack) with visual target progress bars and remaining calorie/macro budgets.

---

### 3. Module Three — Exercise Library & Muscle Activation Guide

- **Visual Muscle Activation Explorer**:
  Interactive anatomical muscle selector covering Chest (Pectoralis), Shoulders (Deltoids), Biceps, Triceps, Lats, Trapezius, Core/Abs, Obliques, Glutes, Quadriceps, Hamstrings, and Calves. Differentiates **Primary target** from **Secondary assisting** muscles.
- **Comprehensive Exercise Detail**:
  Step-by-step numbered execution cues, proper posture, diaphragmatic breathing cues, common biomechanical mistakes, joint safety guidelines, easier regressions, and progression variations.
- **Weekly Workout Planner**:
  Periodized Monday–Sunday schedule generator with completion tracking and consistency logging.

---

### 4. Module Four — Admin Content Management Dashboard

A secure, protected administration interface:
- **Food Record Manager**: Search, filter, edit, delete, and toggle **Published / Draft** status with confirmation dialogs.
- **Batch Food Importer**: Interactive JSON/CSV importer with schema validation, error display, preview table, and batch commit.
- **User Account Management**: Roster of registered users with role promotion/demotion and status updates (`Active`, `Inactive`, `Suspended`).
- **Tamper-Evident Audit Logs**: Comprehensive historical log recording all administrative actions with timestamp and actor attribution.

---

### 5. Module Five — Personal Profile & Progress History

- **Biometric Profile Editor**: Age, height, weight, sex for formula, activity level, and fitness goal.
- **Multi-Point Progress History**: Historical check-in log with date picker.
- **Data Privacy & GDPR Export**: Downloadable complete JSON export and secure account erasure options.

---

## 🗄️ Supabase PostgreSQL Architecture (15 Tables)

The database schema in `supabase/schema.sql` enforces strict referential integrity, indexes, and Row-Level Security:

```text
public.profiles                --> auth.users foreign key, role, status, biometric inputs
public.food_categories         --> 18 categorized food classifications
public.foods                   --> Reference food catalog with preparation state & sources
public.food_nutrients          --> Normalized micronutrient and macronutrient values
public.exercises               --> Movement catalog with cues, difficulty & equipment
public.muscle_groups           --> Anatomical muscle groups & biomechanical functions
public.exercise_muscles        --> Primary / Secondary involvement junction
public.calculator_history      --> Timestamped calculations with validated JSONB inputs/outputs
public.food_logs               --> User meal logs with nutrition snapshots
public.workout_plans           --> Weekly routine schedules
public.workout_plan_exercises  --> Routine exercise sets, reps, rest & target weights
public.workout_logs            --> Historical completed workout performance
public.weight_history          --> Timestamped weight entries
public.favorites               --> User saved food items
public.admin_audit_logs        --> Immutable administrative audit trail
```

### Row-Level Security (RLS) Policies
- `public.is_admin()` security-definer function verifies administrative privileges against database records.
- Users can read and mutate **only their own** private profiles, calculator histories, food logs, workout logs, and weight histories.
- Shared foods and exercises are public for read-only; modifications are strictly restricted to authenticated administrators.
- Browser-side role tampering is blocked by database-level security policies.

---

## ⚙️ Supabase Setup & Environment Variables

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Enter your project URL and anonymous client key:
   ```env
   VITE_SUPABASE_URL=https://your-project-id.supabase.co
   VITE_SUPABASE_ANON_KEY=your-anon-key-here
   ```
   > ⚠️ **Security Warning**: Never expose your `service_role` key in frontend code.

3. Execute the schema migration in your Supabase SQL Editor:
   - Run `supabase/schema.sql` (or `supabase/migrations/20261028_fitness_metric_init.sql`).
   - Run `supabase/seed.sql` to populate food categories, starter foods, nutrients, muscle groups, and exercises.

---

## 🧪 Automated Quality Assurance Test Suite

Run the automated verification suite to validate all 15 tables, 12 calculators, food categories, muscle mappings, and security policies:

```powershell
powershell -ExecutionPolicy Bypass -File tests/run-tests.ps1
```

### Test Results
```text
=================================================================
 TOTAL VERIFICATION CHECKS: 111
 TESTS PASSED:             111
 ALL CHECKS PASSED (100% COMPLIANCE)
=================================================================
```

---

## 📂 Project Directory Structure

```text
fitness-metric/
├── index.html                    # Complete responsive single-page web application
├── package.json                  # Manifest & package dependencies
├── .env.example                  # Environment configuration template
├── README.md                     # Documentation & setup guide
├── src/
│   ├── types/
│   │   └── fitness.ts            # TypeScript domain interfaces (15 table models)
│   └── lib/
│       ├── metrics-calculator.ts # The 12 scientific body calculation tools
│       ├── nutrition-database.ts # 18 food categories, 30+ foods & scaler
│       ├── exercise-library.ts   # Muscle groups, exercise biomechanics & cues
│       ├── supabase-client.ts    # Supabase Auth & connection manager
│       └── storage-engine.ts     # Dual-mode state & administrative audit engine
├── supabase/
│   ├── schema.sql                # Complete 15-table PostgreSQL schema & RLS policies
│   ├── seed.sql                  # Attributed USDA & ICMR-NIN starter seed data
│   └── migrations/
│       └── 20261028_fitness_metric_init.sql
└── tests/
    └── run-tests.ps1             # 111 automated compliance verification tests
```

---

## 📜 Medical & Scientific Disclaimer

Fitness Metric is designed strictly for educational and self-monitoring purposes. Calculations such as BMI, BMR, TDEE, and U.S. Navy body fat percentage are statistical estimates and do not replace professional medical advice, clinical diagnostic evaluations, or certified dietitian consultations.
