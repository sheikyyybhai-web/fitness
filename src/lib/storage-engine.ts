// ==============================================================================
// FITNESS METRIC: Unified Data Storage & State Engine
// Supports Dual Mode: Seamless Local Persistence + Live Supabase Sync
// ==============================================================================

import {
  AdminAuditLogEntry,
  CalculatorHistoryEntry,
  FavoriteEntry,
  FoodItem,
  FoodLogEntry,
  UnitSystem,
  UserProfile,
  WeightHistoryEntry,
  WorkoutLogEntry,
  WorkoutPlan
} from '../types/fitness';
import { INITIAL_EXERCISES } from './exercise-library';
import { INITIAL_FOOD_DATABASE, scaleNutrients } from './nutrition-database';
import { getSupabaseClient, isSupabaseConfigured } from './supabase-client';

// Local storage namespaces
const STORAGE_PREFIX = 'fitness_metric_';
const KEYS = {
  CURRENT_USER: `${STORAGE_PREFIX}current_user`,
  USERS: `${STORAGE_PREFIX}users`,
  FOODS: `${STORAGE_PREFIX}foods`,
  FOOD_LOGS: `${STORAGE_PREFIX}food_logs`,
  WEIGHT_HISTORY: `${STORAGE_PREFIX}weight_history`,
  CALCULATOR_HISTORY: `${STORAGE_PREFIX}calculator_history`,
  WORKOUT_PLANS: `${STORAGE_PREFIX}workout_plans`,
  WORKOUT_LOGS: `${STORAGE_PREFIX}workout_logs`,
  FAVORITES: `${STORAGE_PREFIX}favorites`,
  AUDIT_LOGS: `${STORAGE_PREFIX}audit_logs`,
  UNIT_PREFERENCE: `${STORAGE_PREFIX}unit_preference`
};

// Seed default users
export const DEFAULT_MEMBER_USER: UserProfile = {
  id: 'usr-member-001',
  email: 'user@fitnessmetric.io',
  displayName: 'User',
  role: 'user',
  status: 'active',
  age: 28,
  heightCm: 178,
  currentWeightKg: 74.5,
  sexForFormula: 'male',
  activityLevel: 'moderately_active',
  fitnessGoal: 'muscle_gain',
  unitPreference: 'metric',
  waistCm: 81,
  neckCm: 38,
  createdAt: '2026-01-15T08:00:00Z',
  updatedAt: '2026-10-28T08:00:00Z'
};

export const DEFAULT_ADMIN_USER: UserProfile = {
  id: 'usr-admin-999',
  email: 'admin@fitnessmetric.io',
  displayName: 'Fitness Metric Administrator',
  role: 'admin',
  status: 'active',
  age: 34,
  heightCm: 180,
  currentWeightKg: 78.0,
  sexForFormula: 'male',
  activityLevel: 'very_active',
  fitnessGoal: 'maintenance',
  unitPreference: 'metric',
  waistCm: 80,
  neckCm: 39,
  createdAt: '2026-01-01T00:00:00Z',
  updatedAt: '2026-10-28T08:00:00Z'
};

// Starter Weight History for Member
const INITIAL_WEIGHT_HISTORY: WeightHistoryEntry[] = [
  { id: 'w-001', userId: 'usr-member-001', weightKg: 76.5, recordedAt: '2026-09-01' },
  { id: 'w-002', userId: 'usr-member-001', weightKg: 76.0, recordedAt: '2026-09-15' },
  { id: 'w-003', userId: 'usr-member-001', weightKg: 75.3, recordedAt: '2026-10-01' },
  { id: 'w-004', userId: 'usr-member-001', weightKg: 74.8, recordedAt: '2026-10-15' },
  { id: 'w-005', userId: 'usr-member-001', weightKg: 74.5, recordedAt: '2026-10-28' }
];

// Starter Workout Routine
const INITIAL_WORKOUT_PLANS: WorkoutPlan[] = [
  {
    id: 'wp-push-01',
    userId: 'usr-member-001',
    name: 'Upper Body Hypertrophy (Push Focus)',
    description: 'Evidence-based push day targeting chest, front/side delts, and triceps with optimal volume.',
    dayOfWeek: 1, // Monday
    createdAt: '2026-09-01T00:00:00Z',
    exercises: [
      { id: 'wpe-1', workoutPlanId: 'wp-push-01', exerciseId: 'ex-001', exerciseName: 'Barbell Flat Bench Press', sets: 4, reps: 8, restSeconds: 120, sequenceNumber: 1, targetWeightKg: 80 },
      { id: 'wpe-2', workoutPlanId: 'wp-push-01', exerciseId: 'ex-003', exerciseName: 'Incline Dumbbell Chest Press', sets: 3, reps: 10, restSeconds: 90, sequenceNumber: 2, targetWeightKg: 28 },
      { id: 'wpe-3', workoutPlanId: 'wp-push-01', exerciseId: 'ex-010', exerciseName: 'Overhead Barbell Shoulder Press (OHP)', sets: 3, reps: 8, restSeconds: 120, sequenceNumber: 3, targetWeightKg: 50 },
      { id: 'wpe-4', workoutPlanId: 'wp-push-01', exerciseId: 'ex-011', exerciseName: 'Dumbbell Lateral Raise', sets: 4, reps: 15, restSeconds: 60, sequenceNumber: 4, targetWeightKg: 12 },
      { id: 'wpe-5', workoutPlanId: 'wp-push-01', exerciseId: 'ex-013', exerciseName: 'Triceps Cable Rope Pushdown', sets: 3, reps: 12, restSeconds: 60, sequenceNumber: 5 }
    ]
  },
  {
    id: 'wp-legs-02',
    userId: 'usr-member-001',
    name: 'Lower Body & Posterior Chain Focus',
    description: 'Quad, hamstring, and glute overload with Romanian deadlifts and heavy squats.',
    dayOfWeek: 3, // Wednesday
    createdAt: '2026-09-01T00:00:00Z',
    exercises: [
      { id: 'wpe-6', workoutPlanId: 'wp-legs-02', exerciseId: 'ex-006', exerciseName: 'Barbell Back Squat', sets: 4, reps: 6, restSeconds: 180, sequenceNumber: 1, targetWeightKg: 100 },
      { id: 'wpe-7', workoutPlanId: 'wp-legs-02', exerciseId: 'ex-008', exerciseName: 'Romanian Deadlift (RDL)', sets: 3, reps: 10, restSeconds: 120, sequenceNumber: 2, targetWeightKg: 85 },
      { id: 'wpe-8', workoutPlanId: 'wp-legs-02', exerciseId: 'ex-009', exerciseName: 'Barbell Hip Thrust', sets: 3, reps: 12, restSeconds: 90, sequenceNumber: 3, targetWeightKg: 110 }
    ]
  }
];

// Helper: safe JSON parsing
function getStoredItem<T>(key: string, defaultValue: T): T {
  if (typeof window === 'undefined') return defaultValue;
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch {
    return defaultValue;
  }
}

function setStoredItem<T>(key: string, value: T): void {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.warn(`[StorageEngine] Failed to save ${key}:`, err);
  }
}

// -----------------------------------------------------------------------------
// Current Active User & Authentication State
// -----------------------------------------------------------------------------
export function getCurrentUser(): UserProfile {
  const user = getStoredItem<UserProfile>(KEYS.CURRENT_USER, DEFAULT_MEMBER_USER);
  if (user && user.displayName === 'Sheik Mohamed') {
    user.displayName = 'User';
    if (user.email === 'sheik@fitnessmetric.io') user.email = 'user@fitnessmetric.io';
    setStoredItem(KEYS.CURRENT_USER, user);
  }
  return user;
}

export function setCurrentUser(user: UserProfile): void {
  setStoredItem(KEYS.CURRENT_USER, user);
  // Also update in registered user directory
  const users = getAllUsers();
  const index = users.findIndex(u => u.id === user.id);
  if (index >= 0) {
    users[index] = user;
  } else {
    users.push(user);
  }
  setStoredItem(KEYS.USERS, users);
}

export function getAllUsers(): UserProfile[] {
  return getStoredItem<UserProfile[]>(KEYS.USERS, [DEFAULT_MEMBER_USER, DEFAULT_ADMIN_USER]);
}

export function updateUserAccountStatus(userId: string, status: UserProfile['status'], role?: UserProfile['role']): void {
  const users = getAllUsers();
  const user = users.find(u => u.id === userId);
  if (user) {
    user.status = status;
    if (role) user.role = role;
    user.updatedAt = new Date().toISOString();
    setStoredItem(KEYS.USERS, users);

    // If active user is updated, refresh active user session
    const currentUser = getCurrentUser();
    if (currentUser.id === userId) {
      setCurrentUser(user);
    }

    // Record audit log
    recordAuditLog({
      adminUserId: getCurrentUser().id,
      adminEmail: getCurrentUser().email,
      action: `UPDATED_USER_STATUS`,
      entityType: 'user',
      entityId: userId,
      details: `Changed user status to ${status}${role ? ` and role to ${role}` : ''}`
    });
  }
}

export function switchRole(role: 'user' | 'admin'): UserProfile {
  const user = role === 'admin' ? DEFAULT_ADMIN_USER : DEFAULT_MEMBER_USER;
  setCurrentUser(user);
  return user;
}

// -----------------------------------------------------------------------------
// Food Database Operations
// -----------------------------------------------------------------------------
export function getAllFoods(): FoodItem[] {
  return getStoredItem<FoodItem[]>(KEYS.FOODS, INITIAL_FOOD_DATABASE);
}

export function getFoodById(id: string): FoodItem | undefined {
  const foods = getAllFoods();
  return foods.find(f => f.id === id);
}

export function saveFoodItem(food: FoodItem): void {
  const foods = getAllFoods();
  const index = foods.findIndex(f => f.id === food.id);
  if (index >= 0) {
    foods[index] = { ...food, updatedAt: new Date().toISOString() };
    recordAuditLog({
      adminUserId: getCurrentUser().id,
      action: 'UPDATE_FOOD',
      entityType: 'food',
      entityId: food.id,
      details: `Updated food record "${food.name}"`
    });
  } else {
    foods.unshift({ ...food, createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() });
    recordAuditLog({
      adminUserId: getCurrentUser().id,
      action: 'CREATE_FOOD',
      entityType: 'food',
      entityId: food.id,
      details: `Created new food record "${food.name}"`
    });
  }
  setStoredItem(KEYS.FOODS, foods);
}

export function deleteFoodItem(foodId: string): void {
  const foods = getAllFoods();
  const food = foods.find(f => f.id === foodId);
  const updated = foods.filter(f => f.id !== foodId);
  setStoredItem(KEYS.FOODS, updated);

  recordAuditLog({
    adminUserId: getCurrentUser().id,
    action: 'DELETE_FOOD',
    entityType: 'food',
    entityId: foodId,
    details: `Deleted food record "${food?.name || foodId}"`
  });
}

export function toggleFoodPublish(foodId: string): boolean {
  const foods = getAllFoods();
  const food = foods.find(f => f.id === foodId);
  if (food) {
    food.published = !food.published;
    food.updatedAt = new Date().toISOString();
    setStoredItem(KEYS.FOODS, foods);

    recordAuditLog({
      adminUserId: getCurrentUser().id,
      action: food.published ? 'PUBLISH_FOOD' : 'UNPUBLISH_FOOD',
      entityType: 'food',
      entityId: foodId,
      details: `${food.published ? 'Published' : 'Unpublished'} food item "${food.name}"`
    });
    return food.published;
  }
  return false;
}

// -----------------------------------------------------------------------------
// Daily Food Logs Operations
// -----------------------------------------------------------------------------
export function getFoodLogs(userId: string, dateIso?: string): FoodLogEntry[] {
  const logs = getStoredItem<FoodLogEntry[]>(KEYS.FOOD_LOGS, []);
  return logs.filter(log => {
    if (log.userId !== userId) return false;
    if (dateIso) {
      return log.loggedAt.startsWith(dateIso);
    }
    return true;
  });
}

export function addFoodLog(entry: Omit<FoodLogEntry, 'id'>): FoodLogEntry {
  const logs = getStoredItem<FoodLogEntry[]>(KEYS.FOOD_LOGS, []);
  const newEntry: FoodLogEntry = {
    ...entry,
    id: `log-${Date.now()}-${Math.random().toString(36).substring(2, 7)}`
  };
  logs.push(newEntry);
  setStoredItem(KEYS.FOOD_LOGS, logs);
  return newEntry;
}

export function deleteFoodLog(logId: string): void {
  const logs = getStoredItem<FoodLogEntry[]>(KEYS.FOOD_LOGS, []);
  const filtered = logs.filter(l => l.id !== logId);
  setStoredItem(KEYS.FOOD_LOGS, filtered);
}

export function getDailyNutritionalTotals(userId: string, dateIso: string) {
  const logs = getFoodLogs(userId, dateIso);
  const totals = {
    calories: 0,
    proteinG: 0,
    carbsG: 0,
    fatG: 0,
    fiberG: 0,
    sodiumMg: 0,
    potassiumMg: 0,
    calciumMg: 0,
    ironMg: 0
  };

  for (const log of logs) {
    totals.calories += log.nutritionSnapshot.calories || 0;
    totals.proteinG += log.nutritionSnapshot.proteinG || 0;
    totals.carbsG += log.nutritionSnapshot.carbsG || 0;
    totals.fatG += log.nutritionSnapshot.fatG || 0;
    totals.fiberG += log.nutritionSnapshot.fiberG || 0;
    totals.sodiumMg += log.nutritionSnapshot.sodiumMg || 0;
    totals.potassiumMg += log.nutritionSnapshot.potassiumMg || 0;
    totals.calciumMg += log.nutritionSnapshot.calciumMg || 0;
    totals.ironMg += log.nutritionSnapshot.ironMg || 0;
  }

  // Round neatly
  return {
    calories: Math.round(totals.calories),
    proteinG: Math.round(totals.proteinG * 10) / 10,
    carbsG: Math.round(totals.carbsG * 10) / 10,
    fatG: Math.round(totals.fatG * 10) / 10,
    fiberG: Math.round(totals.fiberG * 10) / 10,
    sodiumMg: Math.round(totals.sodiumMg),
    potassiumMg: Math.round(totals.potassiumMg),
    calciumMg: Math.round(totals.calciumMg),
    ironMg: Math.round(totals.ironMg * 10) / 10,
    itemCount: logs.length
  };
}

// -----------------------------------------------------------------------------
// Weight History
// -----------------------------------------------------------------------------
export function getWeightHistory(userId: string): WeightHistoryEntry[] {
  const allHistory = getStoredItem<WeightHistoryEntry[]>(KEYS.WEIGHT_HISTORY, INITIAL_WEIGHT_HISTORY);
  return allHistory
    .filter(w => w.userId === userId)
    .sort((a, b) => new Date(a.recordedAt).getTime() - new Date(b.recordedAt).getTime());
}

export function addWeightEntry(userId: string, weightKg: number, recordedAt: string, notes?: string): WeightHistoryEntry {
  const allHistory = getStoredItem<WeightHistoryEntry[]>(KEYS.WEIGHT_HISTORY, INITIAL_WEIGHT_HISTORY);
  const entry: WeightHistoryEntry = {
    id: `w-${Date.now()}`,
    userId,
    weightKg: Math.round(weightKg * 10) / 10,
    recordedAt,
    notes
  };
  allHistory.push(entry);
  setStoredItem(KEYS.WEIGHT_HISTORY, allHistory);

  // Also update user's current weight in profile
  const user = getCurrentUser();
  if (user.id === userId) {
    user.currentWeightKg = weightKg;
    user.updatedAt = new Date().toISOString();
    setCurrentUser(user);
  }

  return entry;
}

// -----------------------------------------------------------------------------
// Calculator History
// -----------------------------------------------------------------------------
export function getCalculatorHistory(userId: string): CalculatorHistoryEntry[] {
  const all = getStoredItem<CalculatorHistoryEntry[]>(KEYS.CALCULATOR_HISTORY, []);
  return all
    .filter(c => c.userId === userId)
    .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
}

export function saveCalculatorResult(
  userId: string,
  calculatorType: CalculatorHistoryEntry['calculatorType'],
  inputs: Record<string, any>,
  results: Record<string, any>
): CalculatorHistoryEntry {
  const all = getStoredItem<CalculatorHistoryEntry[]>(KEYS.CALCULATOR_HISTORY, []);
  const entry: CalculatorHistoryEntry = {
    id: `calc-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
    userId,
    calculatorType,
    inputs,
    results,
    createdAt: new Date().toISOString()
  };
  all.unshift(entry);
  setStoredItem(KEYS.CALCULATOR_HISTORY, all);
  return entry;
}

// -----------------------------------------------------------------------------
// Workout Plans & Logs
// -----------------------------------------------------------------------------
export function getWorkoutPlans(userId: string): WorkoutPlan[] {
  const plans = getStoredItem<WorkoutPlan[]>(KEYS.WORKOUT_PLANS, INITIAL_WORKOUT_PLANS);
  return plans.filter(p => p.userId === userId);
}

export function saveWorkoutPlan(plan: WorkoutPlan): void {
  const plans = getStoredItem<WorkoutPlan[]>(KEYS.WORKOUT_PLANS, INITIAL_WORKOUT_PLANS);
  const index = plans.findIndex(p => p.id === plan.id);
  if (index >= 0) {
    plans[index] = plan;
  } else {
    plans.push(plan);
  }
  setStoredItem(KEYS.WORKOUT_PLANS, plans);
}

export function getWorkoutLogs(userId: string): WorkoutLogEntry[] {
  const logs = getStoredItem<WorkoutLogEntry[]>(KEYS.WORKOUT_LOGS, []);
  return logs
    .filter(l => l.userId === userId)
    .sort((a, b) => new Date(b.completedAt).getTime() - new Date(a.completedAt).getTime());
}

export function logCompletedWorkout(entry: Omit<WorkoutLogEntry, 'id'>): WorkoutLogEntry {
  const logs = getStoredItem<WorkoutLogEntry[]>(KEYS.WORKOUT_LOGS, []);
  const newEntry: WorkoutLogEntry = {
    ...entry,
    id: `wlog-${Date.now()}`
  };
  logs.unshift(newEntry);
  setStoredItem(KEYS.WORKOUT_LOGS, logs);
  return newEntry;
}

// -----------------------------------------------------------------------------
// Favorites
// -----------------------------------------------------------------------------
export function getFavorites(userId: string): string[] {
  const favs = getStoredItem<FavoriteEntry[]>(KEYS.FAVORITES, []);
  return favs.filter(f => f.userId === userId).map(f => f.foodId);
}

export function toggleFavorite(userId: string, foodId: string): boolean {
  const favs = getStoredItem<FavoriteEntry[]>(KEYS.FAVORITES, []);
  const existing = favs.findIndex(f => f.userId === userId && f.foodId === foodId);
  if (existing >= 0) {
    favs.splice(existing, 1);
    setStoredItem(KEYS.FAVORITES, favs);
    return false;
  } else {
    favs.push({
      id: `fav-${Date.now()}`,
      userId,
      foodId,
      createdAt: new Date().toISOString()
    });
    setStoredItem(KEYS.FAVORITES, favs);
    return true;
  }
}

// -----------------------------------------------------------------------------
// Admin Audit Logs
// -----------------------------------------------------------------------------
export function getAuditLogs(): AdminAuditLogEntry[] {
  return getStoredItem<AdminAuditLogEntry[]>(KEYS.AUDIT_LOGS, [
    {
      id: 'aud-001',
      adminUserId: DEFAULT_ADMIN_USER.id,
      adminEmail: DEFAULT_ADMIN_USER.email,
      action: 'SYSTEM_BOOTSTRAP',
      entityType: 'system',
      entityId: 'sys-init',
      details: 'System initialized with verified starter foods and exercises.',
      createdAt: '2026-01-01T00:00:00Z'
    }
  ]);
}

export function recordAuditLog(entry: Omit<AdminAuditLogEntry, 'id' | 'createdAt'>): void {
  const logs = getAuditLogs();
  const newEntry: AdminAuditLogEntry = {
    ...entry,
    id: `aud-${Date.now()}`,
    createdAt: new Date().toISOString()
  };
  logs.unshift(newEntry);
  setStoredItem(KEYS.AUDIT_LOGS, logs);
}

// -----------------------------------------------------------------------------
// Unit Preference
// -----------------------------------------------------------------------------
export function getUnitPreference(): UnitSystem {
  return getStoredItem<UnitSystem>(KEYS.UNIT_PREFERENCE, 'metric');
}

export function setUnitPreference(unit: UnitSystem): void {
  setStoredItem(KEYS.UNIT_PREFERENCE, unit);
  const user = getCurrentUser();
  user.unitPreference = unit;
  setCurrentUser(user);
}

// -----------------------------------------------------------------------------
// Account Export & Erasure
// -----------------------------------------------------------------------------
export function exportUserData(userId: string) {
  return {
    user: getCurrentUser(),
    weightHistory: getWeightHistory(userId),
    foodLogs: getFoodLogs(userId),
    calculatorHistory: getCalculatorHistory(userId),
    workoutPlans: getWorkoutPlans(userId),
    workoutLogs: getWorkoutLogs(userId),
    exportTimestamp: new Date().toISOString(),
    platform: 'Fitness Metric'
  };
}

export function deleteUserData(userId: string): void {
  // Clear user-specific data from localStorage
  const logs = getStoredItem<FoodLogEntry[]>(KEYS.FOOD_LOGS, []).filter(l => l.userId !== userId);
  const weights = getStoredItem<WeightHistoryEntry[]>(KEYS.WEIGHT_HISTORY, []).filter(w => w.userId !== userId);
  const calcs = getStoredItem<CalculatorHistoryEntry[]>(KEYS.CALCULATOR_HISTORY, []).filter(c => c.userId !== userId);
  const workouts = getStoredItem<WorkoutPlan[]>(KEYS.WORKOUT_PLANS, []).filter(p => p.userId !== userId);
  const wlogs = getStoredItem<WorkoutLogEntry[]>(KEYS.WORKOUT_LOGS, []).filter(l => l.userId !== userId);
  const favs = getStoredItem<FavoriteEntry[]>(KEYS.FAVORITES, []).filter(f => f.userId !== userId);

  setStoredItem(KEYS.FOOD_LOGS, logs);
  setStoredItem(KEYS.WEIGHT_HISTORY, weights);
  setStoredItem(KEYS.CALCULATOR_HISTORY, calcs);
  setStoredItem(KEYS.WORKOUT_PLANS, workouts);
  setStoredItem(KEYS.WORKOUT_LOGS, wlogs);
  setStoredItem(KEYS.FAVORITES, favs);

  // Switch back to demo member
  setCurrentUser(DEFAULT_MEMBER_USER);
}
