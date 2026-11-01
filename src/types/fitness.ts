// ==============================================================================
// FITNESS METRIC: TypeScript Domain Models & Interfaces
// Premium Fitness Analytics, Evidence-Based Nutrition & Movement Science
// ==============================================================================

export type UserRole = 'user' | 'admin';
export type AccountStatus = 'active' | 'inactive' | 'suspended';
export type UnitSystem = 'metric' | 'imperial';
export type FitnessGoal = 'fat_loss' | 'maintenance' | 'muscle_gain' | 'strength' | 'general_health';
export type ActivityLevel = 'sedentary' | 'lightly_active' | 'moderately_active' | 'very_active' | 'extremely_active';
export type DietaryType = 'vegetarian' | 'vegan' | 'non-vegetarian';
export type PreparationState = 'raw' | 'cooked' | 'drained' | 'packaged' | 'prepared';
export type MealType = 'breakfast' | 'lunch' | 'dinner' | 'snack';
export type ExerciseDifficulty = 'beginner' | 'intermediate' | 'advanced';
export type EquipmentType = 
  | 'bodyweight' 
  | 'dumbbell' 
  | 'barbell' 
  | 'cable' 
  | 'machine' 
  | 'resistance_band' 
  | 'kettlebell' 
  | 'cardio';

export type CalculatorType = 
  | 'BMI' 
  | 'BMR' 
  | 'TDEE' 
  | 'LBM' 
  | 'FAT_MASS' 
  | 'BODY_FAT_PCT' 
  | 'IDEAL_WEIGHT' 
  | 'WAIST_TO_HEIGHT' 
  | 'PROTEIN_REQ' 
  | 'FIBER_REQ' 
  | 'CALORIE_GOAL' 
  | 'MACRO_PLANNER';

// 1. profiles table model
export interface UserProfile {
  id: string;
  email: string;
  displayName: string;
  role: UserRole;
  status: AccountStatus;
  age: number;
  heightCm: number;
  currentWeightKg: number;
  sexForFormula: 'male' | 'female';
  activityLevel: ActivityLevel;
  fitnessGoal: FitnessGoal;
  unitPreference: UnitSystem;
  waistCm?: number;
  neckCm?: number;
  hipsCm?: number;
  createdAt: string;
  updatedAt: string;
}

// 2. food_categories table model
export interface FoodCategory {
  id: string;
  name: string;
  slug: string;
  description?: string;
  itemCount?: number;
}

// 4. food_nutrients table model
export interface FoodNutrient {
  id: string;
  foodId: string;
  nutrientCode: string;
  nutrientName: string;
  amountPer100g: number | null;
  unit: string;
  dataStatus: 'available' | 'not_available' | 'estimated' | 'trace';
}

// 3. foods table model
export interface FoodItem {
  id: string;
  name: string;
  categoryId: string;
  categoryName?: string;
  description: string;
  dietaryType: DietaryType;
  preparationState: PreparationState;
  servingSizeG: number;
  imagePath?: string;
  sourceName: string;
  sourceReference: string;
  sourceDate: string;
  published: boolean;
  createdAt: string;
  updatedAt: string;
  
  // Quick-access macronutrient cache per 100g
  caloriesPer100g: number;
  proteinPer100g: number;
  carbsPer100g: number;
  fatPer100g: number;
  saturatedFatPer100g?: number | null;
  monounsaturatedFatPer100g?: number | null;
  polyunsaturatedFatPer100g?: number | null;
  fiberPer100g: number;
  sugarsPer100g?: number | null;
  addedSugarsPer100g?: number | null;
  cholesterolMgPer100g?: number | null;

  // Vitamins per 100g (null means Not Available)
  vitA_ug?: number | null;
  vitB1_mg?: number | null;
  vitB2_mg?: number | null;
  vitB3_mg?: number | null;
  vitB5_mg?: number | null;
  vitB6_mg?: number | null;
  vitB7_ug?: number | null;
  vitB9_ug?: number | null;
  vitB12_ug?: number | null;
  vitC_mg?: number | null;
  vitD_ug?: number | null;
  vitE_mg?: number | null;
  vitK_ug?: number | null;

  // Minerals per 100g
  calcium_mg?: number | null;
  iron_mg?: number | null;
  magnesium_mg?: number | null;
  phosphorus_mg?: number | null;
  potassium_mg?: number | null;
  sodium_mg?: number | null;
  zinc_mg?: number | null;
  copper_mg?: number | null;
  manganese_mg?: number | null;
  selenium_ug?: number | null;
  iodine_ug?: number | null;
}

// 6. muscle_groups table model
export interface MuscleGroup {
  id: string;
  name: string;
  description: string;
  biomechanicalFunction: string;
  region: 'upper_body' | 'lower_body' | 'core';
}

// 7. exercise_muscles junction
export interface ExerciseMuscle {
  exerciseId: string;
  muscleGroupId: string;
  involvementType: 'primary' | 'secondary';
}

// 5. exercises table model
export interface ExerciseItem {
  id: string;
  name: string;
  description: string;
  difficulty: ExerciseDifficulty;
  equipment: EquipmentType;
  instructions: string[];
  breathingGuidance: string;
  commonMistakes: string[];
  safetyNotes: string;
  mediaPath?: string;
  published: boolean;
  primaryMuscles: string[];   // Muscle group IDs or names
  secondaryMuscles: string[]; // Muscle group IDs or names
  recommendedSets: string;
  recommendedReps: string;
  easierVariation?: string;
  progressionVariation?: string;
}

// 8. calculator_history table model
export interface CalculatorHistoryEntry {
  id: string;
  userId: string;
  calculatorType: CalculatorType;
  inputs: Record<string, any>;
  results: Record<string, any>;
  createdAt: string;
}

// 9. food_logs table model
export interface FoodLogEntry {
  id: string;
  userId: string;
  foodId: string;
  foodName: string;
  loggedAt: string; // ISO date / timestamp
  mealType: MealType;
  quantityG: number;
  nutritionSnapshot: {
    calories: number;
    proteinG: number;
    carbsG: number;
    fatG: number;
    fiberG: number;
    sodiumMg?: number;
    potassiumMg?: number;
    ironMg?: number;
    calciumMg?: number;
  };
}

// 10. workout_plans table model
export interface WorkoutPlan {
  id: string;
  userId: string;
  name: string;
  description: string;
  dayOfWeek?: number; // 0=Sunday..6=Saturday
  createdAt: string;
  exercises: WorkoutPlanExercise[];
}

// 11. workout_plan_exercises table model
export interface WorkoutPlanExercise {
  id: string;
  workoutPlanId: string;
  exerciseId: string;
  exerciseName: string;
  sets: number;
  reps: number;
  restSeconds: number;
  sequenceNumber: number;
  targetWeightKg?: number;
}

// 12. workout_logs table model
export interface WorkoutLogEntry {
  id: string;
  userId: string;
  exerciseId: string;
  exerciseName: string;
  workoutPlanId?: string;
  completedAt: string;
  setsCompleted: number;
  repsCompleted: number;
  weightUsedKg: number;
  notes?: string;
}

// 13. weight_history table model
export interface WeightHistoryEntry {
  id: string;
  userId: string;
  weightKg: number;
  recordedAt: string; // YYYY-MM-DD
  notes?: string;
}

// 14. favorites table model
export interface FavoriteEntry {
  id: string;
  userId: string;
  foodId: string;
  createdAt: string;
}

// 15. admin_audit_logs table model
export interface AdminAuditLogEntry {
  id: string;
  adminUserId: string;
  adminEmail?: string;
  action: string;
  entityType: 'food' | 'exercise' | 'muscle_group' | 'user' | 'import' | 'system';
  entityId: string;
  details?: string;
  createdAt: string;
}

// Import schema validation model
export interface FoodImportRow {
  name: string;
  category: string;
  dietary_type: DietaryType;
  preparation_state: PreparationState;
  serving_size_g: number;
  calories_100g: number;
  protein_100g: number;
  carbs_100g: number;
  fat_100g: number;
  fiber_100g: number;
  source_name: string;
  source_reference?: string;
}

export interface ImportValidationResult {
  valid: boolean;
  rowNumber: number;
  data?: FoodImportRow;
  errors: string[];
}
