// ==============================================================================
// FITNESS METRIC: Scientific Fitness & Nutrition Calculator Engine
// Implements all 12 calculation tools with clinical references & disclaimers
// ==============================================================================

import { ActivityLevel, FitnessGoal, UnitSystem } from '../types/fitness';

export interface BmiResult {
  bmi: number;
  category: 'Underweight' | 'Normal weight' | 'Overweight' | 'Obesity Class I' | 'Obesity Class II' | 'Obesity Class III';
  description: string;
  healthyWeightMinKg: number;
  healthyWeightMaxKg: number;
  disclaimer: string;
}

export interface BmrResult {
  bmr: number;
  formula: string;
  assumptions: string;
  description: string;
}

export interface TdeeResult {
  tdee: number;
  bmr: number;
  multiplier: number;
  activityLabel: string;
  breakdown: {
    bmr: number;
    tef: number; // Thermic Effect of Food (~10%)
    neatAndEat: number; // Non-Exercise & Exercise Activity Thermogenesis
  };
  disclaimer: string;
}

export interface LbmResult {
  lbmKg: number;
  lbmPercentage: number;
  method: string;
  notes: string;
}

export interface FatMassResult {
  fatMassKg: number;
  fatMassPercentage: number;
  lbmKg: number;
  notes: string;
}

export interface BodyFatNavyResult {
  bodyFatPct: number;
  category: 'Essential fat' | 'Athletes' | 'Fitness' | 'Average' | 'Above average';
  fatMassKg: number;
  leanMassKg: number;
  disclaimer: string;
}

export interface ReferenceWeightResult {
  minHealthyBmiWeightKg: number;
  maxHealthyBmiWeightKg: number;
  devineWeightKg: number;
  robinsonWeightKg: number;
  disclaimer: string;
}

export interface WhtrResult {
  whtr: number;
  classification: 'Take care (slender)' | 'Healthy / Low risk' | 'Increased risk' | 'High cardiometabolic risk';
  recommendation: string;
  disclaimer: string;
}

export interface ProteinReqResult {
  proteinTargetG: number;
  gramsPerKg: number;
  caloriesFromProtein: number;
  rationale: string;
  guidance: string;
}

export interface FiberReqResult {
  fiberTargetG: number;
  basis: string;
  solubleRecommendation: string;
  insolubleRecommendation: string;
}

export interface CalorieGoalResult {
  targetCalories: number;
  tdee: number;
  adjustmentKcal: number;
  goalType: FitnessGoal;
  projectedWeeklyChangeKg: number;
  isSafe: boolean;
  safetyWarning?: string;
}

export interface MacroPlannerResult {
  calories: number;
  proteinG: number;
  proteinKcal: number;
  proteinPct: number;
  carbsG: number;
  carbsKcal: number;
  carbsPct: number;
  fatG: number;
  fatKcal: number;
  fatPct: number;
}

// -----------------------------------------------------------------------------
// Unit Conversion Utilities
// -----------------------------------------------------------------------------
export const kgToLb = (kg: number): number => Math.round(kg * 2.20462 * 10) / 10;
export const lbToKg = (lb: number): number => Math.round(lb / 2.20462 * 10) / 10;
export const cmToIn = (cm: number): number => Math.round(cm / 2.54 * 10) / 10;
export const inToCm = (inches: number): number => Math.round(inches * 2.54 * 10) / 10;

// -----------------------------------------------------------------------------
// 1. BMI (Body Mass Index)
// Formula: weight (kg) / height (m)^2
// -----------------------------------------------------------------------------
export function calculateBMI(weightKg: number, heightCm: number): BmiResult {
  if (weightKg <= 0 || heightCm <= 0) {
    throw new Error('Weight and height must be positive numbers');
  }
  const heightM = heightCm / 100;
  const bmi = Math.round((weightKg / (heightM * heightM)) * 10) / 10;

  let category: BmiResult['category'] = 'Normal weight';
  let description = 'Healthy weight range relative to height.';

  if (bmi < 18.5) {
    category = 'Underweight';
    description = 'Body weight is below the standard reference range.';
  } else if (bmi < 25.0) {
    category = 'Normal weight';
    description = 'Body weight is within the standard healthy reference range.';
  } else if (bmi < 30.0) {
    category = 'Overweight';
    description = 'Body weight exceeds the reference range for height.';
  } else if (bmi < 35.0) {
    category = 'Obesity Class I';
    description = 'Moderate degree of elevated adiposity risk.';
  } else if (bmi < 40.0) {
    category = 'Obesity Class II';
    description = 'Severe degree of elevated adiposity risk.';
  } else {
    category = 'Obesity Class III';
    description = 'Very severe degree of elevated adiposity risk.';
  }

  const healthyWeightMinKg = Math.round(18.5 * heightM * heightM * 10) / 10;
  const healthyWeightMaxKg = Math.round(24.9 * heightM * heightM * 10) / 10;

  return {
    bmi,
    category,
    description,
    healthyWeightMinKg,
    healthyWeightMaxKg,
    disclaimer: 'BMI is an epidemiological population screening tool. It does not differentiate between skeletal muscle mass and adipose tissue.'
  };
}

// -----------------------------------------------------------------------------
// 2. BMR (Basal Metabolic Rate) - Mifflin-St Jeor Formula (1990)
// -----------------------------------------------------------------------------
export function calculateBMR(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: 'male' | 'female'
): BmrResult {
  if (weightKg <= 0 || heightCm <= 0 || age <= 0) {
    throw new Error('Weight, height, and age must be greater than zero');
  }

  let bmr: number;
  if (sex === 'male') {
    // 10 * weight (kg) + 6.25 * height (cm) - 5 * age + 5
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age + 5;
  } else {
    // 10 * weight (kg) + 6.25 * height (cm) - 5 * age - 161
    bmr = 10 * weightKg + 6.25 * heightCm - 5 * age - 161;
  }

  return {
    bmr: Math.round(bmr),
    formula: 'Mifflin-St Jeor (1990)',
    assumptions: 'Assumes energy expended at rest in a thermoneutral environment in the post-absorptive state.',
    description: `Estimated resting energy consumption is ${Math.round(bmr)} kcal/day just to maintain cellular and organ function.`
  };
}

// -----------------------------------------------------------------------------
// 3. TDEE (Total Daily Energy Expenditure)
// -----------------------------------------------------------------------------
export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, { multiplier: number; label: string; description: string }> = {
  sedentary: { multiplier: 1.2, label: 'Sedentary', description: 'Desk job, very little or no intentional exercise' },
  lightly_active: { multiplier: 1.375, label: 'Lightly Active', description: 'Light exercise or active lifestyle 1-3 days/week' },
  moderately_active: { multiplier: 1.55, label: 'Moderately Active', description: 'Moderate exercise or sports 3-5 days/week' },
  very_active: { multiplier: 1.725, label: 'Very Active', description: 'Hard exercise or athletic training 6-7 days/week' },
  extremely_active: { multiplier: 1.9, label: 'Extremely Active', description: 'Very hard physical labor or double training sessions' }
};

export function calculateTDEE(
  weightKg: number,
  heightCm: number,
  age: number,
  sex: 'male' | 'female',
  activityLevel: ActivityLevel
): TdeeResult {
  const bmrResult = calculateBMR(weightKg, heightCm, age, sex);
  const factor = ACTIVITY_MULTIPLIERS[activityLevel] || ACTIVITY_MULTIPLIERS.sedentary;
  const tdee = Math.round(bmrResult.bmr * factor.multiplier);

  // Breakdown approximation: TEF is ~10% of total expenditure
  const tef = Math.round(tdee * 0.1);
  const neatAndEat = Math.round(tdee - bmrResult.bmr - tef);

  return {
    tdee,
    bmr: bmrResult.bmr,
    multiplier: factor.multiplier,
    activityLabel: factor.label,
    breakdown: {
      bmr: bmrResult.bmr,
      tef,
      neatAndEat: Math.max(0, neatAndEat)
    },
    disclaimer: 'Activity multipliers represent statistical approximations. Actual energy burn varies with non-exercise movement (NEAT) and metabolic adaptation.'
  };
}

// -----------------------------------------------------------------------------
// 4. LBM (Lean Body Mass)
// -----------------------------------------------------------------------------
export function calculateLBM(
  weightKg: number,
  heightCm: number,
  sex: 'male' | 'female',
  bodyFatPct?: number | null
): LbmResult {
  if (weightKg <= 0 || heightCm <= 0) throw new Error('Invalid weight or height');

  if (bodyFatPct != null && bodyFatPct > 0 && bodyFatPct < 100) {
    const lbmKg = Math.round(weightKg * (1 - bodyFatPct / 100) * 10) / 10;
    const lbmPercentage = Math.round((lbmKg / weightKg) * 1000) / 10;
    return {
      lbmKg,
      lbmPercentage,
      method: 'Body-Fat Percentage Method',
      notes: `Directly derived from specified body fat percentage (${bodyFatPct}%).`
    };
  }

  // Boer Formula (1984)
  let lbmKg: number;
  if (sex === 'male') {
    lbmKg = 0.407 * weightKg + 0.267 * heightCm - 19.2;
  } else {
    lbmKg = 0.252 * weightKg + 0.473 * heightCm - 48.3;
  }
  lbmKg = Math.max(10, Math.round(lbmKg * 10) / 10);
  const lbmPercentage = Math.round((lbmKg / weightKg) * 1000) / 10;

  return {
    lbmKg,
    lbmPercentage,
    method: 'Boer Formula (1984)',
    notes: 'Calculated using anthropometric height and total weight coefficients.'
  };
}

// -----------------------------------------------------------------------------
// 5. Fat Mass
// -----------------------------------------------------------------------------
export function calculateFatMass(
  weightKg: number,
  heightCm: number,
  sex: 'male' | 'female',
  bodyFatPct?: number | null
): FatMassResult {
  const lbm = calculateLBM(weightKg, heightCm, sex, bodyFatPct);
  const fatMassKg = Math.max(0, Math.round((weightKg - lbm.lbmKg) * 10) / 10);
  const fatMassPercentage = Math.round((fatMassKg / weightKg) * 1000) / 10;

  return {
    fatMassKg,
    fatMassPercentage,
    lbmKg: lbm.lbmKg,
    notes: 'Estimated adipose tissue mass calculated as total body weight minus estimated lean body mass.'
  };
}

// -----------------------------------------------------------------------------
// 6. Body-Fat Percentage (U.S. Navy Circumference Method)
// -----------------------------------------------------------------------------
export function calculateBodyFatNavy(
  sex: 'male' | 'female',
  heightCm: number,
  waistCm: number,
  neckCm: number,
  hipsCm?: number | null,
  weightKg?: number
): BodyFatNavyResult {
  if (heightCm <= 0 || waistCm <= 0 || neckCm <= 0) {
    throw new Error('Measurements must be positive numbers');
  }

  let bodyFatPct: number;

  if (sex === 'male') {
    // Male formula: 495 / (1.0324 - 0.19077 * log10(waist - neck) + 0.15456 * log10(height)) - 450
    const diff = waistCm - neckCm;
    if (diff <= 0) throw new Error('Waist circumference must exceed neck circumference');
    const logDiff = Math.log10(diff);
    const logHeight = Math.log10(heightCm);
    bodyFatPct = 495 / (1.0324 - 0.19077 * logDiff + 0.15456 * logHeight) - 450;
  } else {
    // Female formula: 495 / (1.29579 - 0.35004 * log10(waist + hip - neck) + 0.22100 * log10(height)) - 450
    const safeHips = hipsCm && hipsCm > 0 ? hipsCm : waistCm * 1.15;
    const sum = waistCm + safeHips - neckCm;
    if (sum <= 0) throw new Error('Waist + hips must exceed neck circumference');
    const logSum = Math.log10(sum);
    const logHeight = Math.log10(heightCm);
    bodyFatPct = 495 / (1.29579 - 0.35004 * logSum + 0.22100 * logHeight) - 450;
  }

  bodyFatPct = Math.round(Math.max(3, Math.min(60, bodyFatPct)) * 10) / 10;

  let category: BodyFatNavyResult['category'] = 'Fitness';
  if (sex === 'male') {
    if (bodyFatPct < 6) category = 'Essential fat';
    else if (bodyFatPct < 14) category = 'Athletes';
    else if (bodyFatPct < 18) category = 'Fitness';
    else if (bodyFatPct < 25) category = 'Average';
    else category = 'Above average';
  } else {
    if (bodyFatPct < 14) category = 'Essential fat';
    else if (bodyFatPct < 21) category = 'Athletes';
    else if (bodyFatPct < 25) category = 'Fitness';
    else if (bodyFatPct < 32) category = 'Average';
    else category = 'Above average';
  }

  const w = weightKg || 70;
  const fatMassKg = Math.round(w * (bodyFatPct / 100) * 10) / 10;
  const leanMassKg = Math.round((w - fatMassKg) * 10) / 10;

  return {
    bodyFatPct,
    category,
    fatMassKg,
    leanMassKg,
    disclaimer: 'The U.S. Navy method provides an anthropometric estimate with typical ±3% to 4% margin of error compared to DEXA imaging.'
  };
}

// -----------------------------------------------------------------------------
// 7. Ideal or Reference Weight Range
// -----------------------------------------------------------------------------
export function calculateReferenceWeight(heightCm: number, sex: 'male' | 'female'): ReferenceWeightResult {
  const heightM = heightCm / 100;
  const minHealthyBmiWeightKg = Math.round(18.5 * heightM * heightM * 10) / 10;
  const maxHealthyBmiWeightKg = Math.round(24.9 * heightM * heightM * 10) / 10;

  // Devine formula (1974)
  const heightInches = heightCm / 2.54;
  const inchesOver5Feet = Math.max(0, heightInches - 60);
  let devineWeightKg = sex === 'male' 
    ? 50.0 + 2.3 * inchesOver5Feet
    : 45.5 + 2.3 * inchesOver5Feet;

  // Robinson formula (1983)
  let robinsonWeightKg = sex === 'male'
    ? 52.0 + 1.9 * inchesOver5Feet
    : 49.0 + 1.7 * inchesOver5Feet;

  return {
    minHealthyBmiWeightKg,
    maxHealthyBmiWeightKg,
    devineWeightKg: Math.round(devineWeightKg * 10) / 10,
    robinsonWeightKg: Math.round(robinsonWeightKg * 10) / 10,
    disclaimer: 'Reference weight formulas reflect statistical midpoints. They do not account for individual skeletal frame size or lean athletic musculature.'
  };
}

// -----------------------------------------------------------------------------
// 8. Waist-to-Height Ratio (WHtR)
// -----------------------------------------------------------------------------
export function calculateWHtR(waistCm: number, heightCm: number): WhtrResult {
  if (waistCm <= 0 || heightCm <= 0) throw new Error('Invalid measurements');
  const whtr = Math.round((waistCm / heightCm) * 100) / 100;

  let classification: WhtrResult['classification'] = 'Healthy / Low risk';
  let recommendation = 'Waist circumference is less than half your height. Associated with optimal metabolic indicators.';

  if (whtr < 0.40) {
    classification = 'Take care (slender)';
    recommendation = 'Ratio is quite low; evaluate overall nutritional sufficiency and lean mass.';
  } else if (whtr < 0.50) {
    classification = 'Healthy / Low risk';
    recommendation = 'Maintain current nutrition and activity habits.';
  } else if (whtr < 0.60) {
    classification = 'Increased risk';
    recommendation = 'Visceral adiposity is slightly elevated. A moderate caloric deficit and structured resistance exercise are recommended.';
  } else {
    classification = 'High cardiometabolic risk';
    recommendation = 'Waist circumference substantially exceeds half your height, correlating with elevated visceral fat and cardiovascular risk.';
  }

  return {
    whtr,
    classification,
    recommendation,
    disclaimer: 'The "Keep your waist to less than half your height" rule is supported by the UK NICE and WHO guidelines as a predictor of cardiometabolic risk.'
  };
}

// -----------------------------------------------------------------------------
// 9. Daily Protein Requirement
// -----------------------------------------------------------------------------
export function calculateProteinRequirement(
  weightKg: number,
  fitnessGoal: FitnessGoal,
  customGramsPerKg?: number
): ProteinReqResult {
  let gPerKg = 1.6;
  let rationale = 'Supports muscle protein synthesis and recovery.';

  if (customGramsPerKg && customGramsPerKg > 0.5 && customGramsPerKg <= 3.5) {
    gPerKg = customGramsPerKg;
    rationale = `Custom adjusted target of ${gPerKg} g/kg body weight.`;
  } else {
    switch (fitnessGoal) {
      case 'fat_loss':
        gPerKg = 2.0; // Higher protein in deficit to preserve lean mass
        rationale = 'Elevated protein during caloric restriction spares lean skeletal muscle and promotes satiety.';
        break;
      case 'muscle_gain':
      case 'strength':
        gPerKg = 1.8;
        rationale = 'Optimal range (1.6 - 2.2 g/kg) recommended by the International Society of Sports Nutrition (ISSN) for hypertrophy.';
        break;
      case 'maintenance':
      case 'general_health':
      default:
        gPerKg = 1.2;
        rationale = 'Exceeds standard RDA (0.8 g/kg) to provide active adults with sufficient amino acid turnover.';
        break;
    }
  }

  const proteinTargetG = Math.round(weightKg * gPerKg);
  const caloriesFromProtein = proteinTargetG * 4;

  return {
    proteinTargetG,
    gramsPerKg: Math.round(gPerKg * 100) / 100,
    caloriesFromProtein,
    rationale,
    guidance: 'Distribute across 3-4 meals containing 25-40g protein each to maximize leucine-triggered muscle protein synthesis (MPS).'
  };
}

// -----------------------------------------------------------------------------
// 10. Daily Fiber Requirement
// -----------------------------------------------------------------------------
export function calculateFiberRequirement(
  age: number,
  sex: 'male' | 'female',
  dailyCalories?: number
): FiberReqResult {
  let fiberTargetG: number;
  let basis: string;

  if (dailyCalories && dailyCalories > 800) {
    // 14g per 1,000 kcal (Dietary Guidelines for Americans)
    fiberTargetG = Math.round((dailyCalories / 1000) * 14);
    basis = `Calculated on the 14g per 1,000 kcal standard for your ${dailyCalories} kcal daily intake.`;
  } else {
    if (sex === 'male') {
      fiberTargetG = age <= 50 ? 38 : 30;
      basis = `Standard DRI guideline for men aged ${age} years.`;
    } else {
      fiberTargetG = age <= 50 ? 25 : 21;
      basis = `Standard DRI guideline for women aged ${age} years.`;
    }
  }

  return {
    fiberTargetG,
    basis,
    solubleRecommendation: 'Aim for soluble fiber from oats, lentils, chia seeds, and fruits to lower LDL cholesterol and stabilize blood glucose.',
    insolubleRecommendation: 'Incorporate insoluble fiber from whole grains, vegetables, and wheat bran to support gastrointestinal motility.'
  };
}

// -----------------------------------------------------------------------------
// 11. Daily Calorie Goal
// -----------------------------------------------------------------------------
export function calculateCalorieGoal(
  tdee: number,
  fitnessGoal: FitnessGoal,
  sex: 'male' | 'female'
): CalorieGoalResult {
  let adjustmentKcal = 0;
  let projectedWeeklyChangeKg = 0;

  switch (fitnessGoal) {
    case 'fat_loss':
      adjustmentKcal = -400; // ~0.4 kg/week fat loss
      projectedWeeklyChangeKg = -0.4;
      break;
    case 'muscle_gain':
      adjustmentKcal = 250; // Lean surplus
      projectedWeeklyChangeKg = 0.2;
      break;
    case 'strength':
      adjustmentKcal = 150;
      projectedWeeklyChangeKg = 0.1;
      break;
    case 'maintenance':
    case 'general_health':
    default:
      adjustmentKcal = 0;
      projectedWeeklyChangeKg = 0;
      break;
  }

  const targetCalories = Math.round(tdee + adjustmentKcal);
  const minSafeFloor = sex === 'male' ? 1500 : 1200;
  const isSafe = targetCalories >= minSafeFloor;

  let safetyWarning: string | undefined;
  if (!isSafe) {
    safetyWarning = `Target of ${targetCalories} kcal is below the recommended clinical floor of ${minSafeFloor} kcal/day for your sex. Severe restriction risks micronutrient deficiencies and metabolic down-regulation.`;
  }

  return {
    targetCalories,
    tdee,
    adjustmentKcal,
    goalType: fitnessGoal,
    projectedWeeklyChangeKg,
    isSafe,
    safetyWarning
  };
}

// -----------------------------------------------------------------------------
// 12. Macronutrient Planner
// -----------------------------------------------------------------------------
export function planMacronutrients(
  dailyCalories: number,
  proteinPct: number = 30,
  carbsPct: number = 40,
  fatPct: number = 30
): MacroPlannerResult {
  if (dailyCalories <= 0) throw new Error('Daily calories must be greater than zero');
  
  // Normalize percentages to 100
  const totalPct = proteinPct + carbsPct + fatPct;
  const pNorm = proteinPct / totalPct;
  const cNorm = carbsPct / totalPct;
  const fNorm = fatPct / totalPct;

  const proteinKcal = Math.round(dailyCalories * pNorm);
  const carbsKcal = Math.round(dailyCalories * cNorm);
  const fatKcal = Math.round(dailyCalories * fNorm);

  const proteinG = Math.round(proteinKcal / 4);
  const carbsG = Math.round(carbsKcal / 4);
  const fatG = Math.round(fatKcal / 9);

  return {
    calories: dailyCalories,
    proteinG,
    proteinKcal,
    proteinPct: Math.round(pNorm * 100),
    carbsG,
    carbsKcal,
    carbsPct: Math.round(cNorm * 100),
    fatG,
    fatKcal,
    fatPct: Math.round(fNorm * 100)
  };
}
