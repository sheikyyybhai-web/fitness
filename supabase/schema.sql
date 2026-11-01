-- ==============================================================================
-- FITNESS METRIC: Complete Supabase PostgreSQL Schema & Security Architecture
-- Evidence-Based Fitness, Nutrition & Biomechanics Analytics Platform
-- ==============================================================================

-- 1. Enable UUID Extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- -----------------------------------------------------------------------------
-- 2. ENUMS & DOMAIN TYPES
-- -----------------------------------------------------------------------------
DO $$ BEGIN
  CREATE TYPE user_role AS ENUM ('user', 'admin');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE account_status AS ENUM ('active', 'inactive', 'suspended');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE dietary_type AS ENUM ('vegetarian', 'vegan', 'non-vegetarian');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE preparation_state AS ENUM ('raw', 'cooked', 'drained', 'packaged', 'prepared');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE meal_type AS ENUM ('breakfast', 'lunch', 'dinner', 'snack');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE exercise_difficulty AS ENUM ('beginner', 'intermediate', 'advanced');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

DO $$ BEGIN
  CREATE TYPE involvement_type AS ENUM ('primary', 'secondary');
EXCEPTION WHEN duplicate_object THEN NULL; END $$;

-- -----------------------------------------------------------------------------
-- 3. TABLE 1: PROFILES (Extends Supabase auth.users)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name TEXT NOT NULL,
  role user_role NOT NULL DEFAULT 'user',
  status account_status NOT NULL DEFAULT 'active',
  age INTEGER CHECK (age >= 10 AND age <= 120),
  height_cm NUMERIC(5,2) CHECK (height_cm >= 50 AND height_cm <= 260),
  current_weight_kg NUMERIC(5,2) CHECK (current_weight_kg >= 25 AND current_weight_kg <= 400),
  sex_for_formula TEXT CHECK (sex_for_formula IN ('male', 'female', 'other')),
  activity_level TEXT DEFAULT 'sedentary',
  fitness_goal TEXT DEFAULT 'general_health',
  unit_preference TEXT DEFAULT 'metric',
  waist_cm NUMERIC(5,2),
  neck_cm NUMERIC(5,2),
  hips_cm NUMERIC(5,2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- Index on role & status for rapid authorization checking
CREATE INDEX IF NOT EXISTS idx_profiles_role ON public.profiles(role);
CREATE INDEX IF NOT EXISTS idx_profiles_status ON public.profiles(status);

-- -----------------------------------------------------------------------------
-- 4. TABLE 2: FOOD_CATEGORIES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.food_categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 5. TABLE 3: FOODS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.foods (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  category_id UUID REFERENCES public.food_categories(id) ON DELETE SET NULL,
  description TEXT,
  dietary_type dietary_type NOT NULL DEFAULT 'vegetarian',
  preparation_state preparation_state NOT NULL DEFAULT 'raw',
  serving_size_g NUMERIC(6,2) NOT NULL DEFAULT 100.0,
  image_path TEXT,
  source_name TEXT NOT NULL DEFAULT 'USDA FoodData Central',
  source_reference TEXT,
  source_date TEXT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_foods_category ON public.foods(category_id);
CREATE INDEX IF NOT EXISTS idx_foods_published ON public.foods(published);
CREATE INDEX IF NOT EXISTS idx_foods_name ON public.foods(name);

-- -----------------------------------------------------------------------------
-- 6. TABLE 4: FOOD_NUTRIENTS (Normalized Micronutrients & Macronutrients)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.food_nutrients (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  food_id UUID NOT NULL REFERENCES public.foods(id) ON DELETE CASCADE,
  nutrient_code TEXT NOT NULL,
  nutrient_name TEXT NOT NULL,
  amount_per_100g NUMERIC(8,3),
  unit TEXT NOT NULL,
  data_status TEXT NOT NULL DEFAULT 'available' CHECK (data_status IN ('available', 'not_available', 'estimated', 'trace')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(food_id, nutrient_code)
);

CREATE INDEX IF NOT EXISTS idx_food_nutrients_food_id ON public.food_nutrients(food_id);
CREATE INDEX IF NOT EXISTS idx_food_nutrients_code ON public.food_nutrients(nutrient_code);

-- -----------------------------------------------------------------------------
-- 7. TABLE 5: MUSCLE_GROUPS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.muscle_groups (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  biomechanical_function TEXT,
  region TEXT CHECK (region IN ('upper_body', 'lower_body', 'core')),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

-- -----------------------------------------------------------------------------
-- 8. TABLE 6: EXERCISES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  difficulty exercise_difficulty NOT NULL DEFAULT 'beginner',
  equipment TEXT NOT NULL DEFAULT 'bodyweight',
  instructions JSONB NOT NULL DEFAULT '[]'::jsonb,
  breathing_guidance TEXT,
  common_mistakes JSONB NOT NULL DEFAULT '[]'::jsonb,
  safety_notes TEXT,
  media_path TEXT,
  published BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_exercises_published ON public.exercises(published);
CREATE INDEX IF NOT EXISTS idx_exercises_difficulty ON public.exercises(difficulty);
CREATE INDEX IF NOT EXISTS idx_exercises_equipment ON public.exercises(equipment);

-- -----------------------------------------------------------------------------
-- 9. TABLE 7: EXERCISE_MUSCLES (Junction between Exercises & Muscles)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.exercise_muscles (
  exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  muscle_group_id UUID NOT NULL REFERENCES public.muscle_groups(id) ON DELETE CASCADE,
  involvement_type involvement_type NOT NULL DEFAULT 'primary',
  PRIMARY KEY (exercise_id, muscle_group_id)
);

CREATE INDEX IF NOT EXISTS idx_ex_muscles_exercise ON public.exercise_muscles(exercise_id);
CREATE INDEX IF NOT EXISTS idx_ex_muscles_muscle ON public.exercise_muscles(muscle_group_id);

-- -----------------------------------------------------------------------------
-- 10. TABLE 8: CALCULATOR_HISTORY
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.calculator_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  calculator_type TEXT NOT NULL,
  inputs JSONB NOT NULL,
  results JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_calc_history_user ON public.calculator_history(user_id);
CREATE INDEX IF NOT EXISTS idx_calc_history_type ON public.calculator_history(calculator_type);

-- -----------------------------------------------------------------------------
-- 11. TABLE 9: FOOD_LOGS (Daily Nutrition Tracking)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.food_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  food_id UUID REFERENCES public.foods(id) ON DELETE SET NULL,
  food_name TEXT NOT NULL,
  logged_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  meal_type meal_type NOT NULL DEFAULT 'breakfast',
  quantity_g NUMERIC(6,2) NOT NULL CHECK (quantity_g > 0),
  nutrition_snapshot JSONB NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_food_logs_user_date ON public.food_logs(user_id, logged_at);

-- -----------------------------------------------------------------------------
-- 12. TABLE 10: WORKOUT_PLANS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workout_plans (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  name TEXT NOT NULL,
  description TEXT,
  day_of_week INTEGER CHECK (day_of_week >= 0 AND day_of_week <= 6),
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_workout_plans_user ON public.workout_plans(user_id);

-- -----------------------------------------------------------------------------
-- 13. TABLE 11: WORKOUT_PLAN_EXERCISES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workout_plan_exercises (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  workout_plan_id UUID NOT NULL REFERENCES public.workout_plans(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  sets INTEGER NOT NULL DEFAULT 3 CHECK (sets > 0),
  reps INTEGER NOT NULL DEFAULT 10 CHECK (reps > 0),
  rest_seconds INTEGER NOT NULL DEFAULT 90 CHECK (rest_seconds >= 0),
  sequence_number INTEGER NOT NULL DEFAULT 1,
  target_weight_kg NUMERIC(6,2)
);

CREATE INDEX IF NOT EXISTS idx_wp_exercises_plan ON public.workout_plan_exercises(workout_plan_id);

-- -----------------------------------------------------------------------------
-- 14. TABLE 12: WORKOUT_LOGS (Historical Performance)
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.workout_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  exercise_id UUID NOT NULL REFERENCES public.exercises(id) ON DELETE CASCADE,
  workout_plan_id UUID REFERENCES public.workout_plans(id) ON DELETE SET NULL,
  completed_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  sets_completed INTEGER NOT NULL DEFAULT 1 CHECK (sets_completed > 0),
  reps_completed INTEGER NOT NULL DEFAULT 1 CHECK (reps_completed > 0),
  weight_used_kg NUMERIC(6,2) NOT NULL DEFAULT 0.0 CHECK (weight_used_kg >= 0),
  notes TEXT
);

CREATE INDEX IF NOT EXISTS idx_workout_logs_user_date ON public.workout_logs(user_id, completed_at);

-- -----------------------------------------------------------------------------
-- 15. TABLE 13: WEIGHT_HISTORY
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.weight_history (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  weight_kg NUMERIC(5,2) NOT NULL CHECK (weight_kg >= 25 AND weight_kg <= 400),
  recorded_at DATE NOT NULL DEFAULT CURRENT_DATE,
  notes TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_weight_history_user_date ON public.weight_history(user_id, recorded_at);

-- -----------------------------------------------------------------------------
-- 16. TABLE 14: FAVORITES
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.favorites (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID NOT NULL REFERENCES public.profiles(id) ON DELETE CASCADE,
  food_id UUID NOT NULL REFERENCES public.foods(id) ON DELETE CASCADE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  UNIQUE(user_id, food_id)
);

CREATE INDEX IF NOT EXISTS idx_favorites_user ON public.favorites(user_id);

-- -----------------------------------------------------------------------------
-- 17. TABLE 15: ADMIN_AUDIT_LOGS
-- -----------------------------------------------------------------------------
CREATE TABLE IF NOT EXISTS public.admin_audit_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  admin_user_id UUID NOT NULL REFERENCES public.profiles(id),
  action TEXT NOT NULL,
  entity_type TEXT NOT NULL,
  entity_id TEXT NOT NULL,
  details TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS idx_audit_logs_created ON public.admin_audit_logs(created_at DESC);

-- -----------------------------------------------------------------------------
-- 18. DATABASE SECURITY: ROW-LEVEL SECURITY (RLS) POLICIES
-- -----------------------------------------------------------------------------

-- Enable RLS on every single table
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.foods ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_nutrients ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.muscle_groups ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.exercise_muscles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.calculator_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.food_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plans ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_plan_exercises ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.workout_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.weight_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.favorites ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_audit_logs ENABLE ROW LEVEL SECURITY;

-- Helper function: verify if requesting session is an authorized Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
  RETURN EXISTS (
    SELECT 1 FROM public.profiles
    WHERE id = auth.uid() AND role = 'admin' AND status = 'active'
  );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Profiles Policies
CREATE POLICY "Users can read their own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id OR public.is_admin());

CREATE POLICY "Users can update their own profile"
  ON public.profiles FOR UPDATE
  USING (auth.uid() = id)
  WITH CHECK (
    -- Prevent non-admins from promoting themselves to admin
    role = (SELECT role FROM public.profiles WHERE id = auth.uid()) OR public.is_admin()
  );

CREATE POLICY "Admins can update any profile"
  ON public.profiles FOR UPDATE
  USING (public.is_admin());

-- Food Categories Policies
CREATE POLICY "Public read for food categories"
  ON public.food_categories FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify food categories"
  ON public.food_categories FOR ALL
  USING (public.is_admin());

-- Foods Policies
CREATE POLICY "Public can view published foods"
  ON public.foods FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can insert and modify foods"
  ON public.foods FOR ALL
  USING (public.is_admin());

-- Food Nutrients Policies
CREATE POLICY "Public can view nutrients of published foods"
  ON public.food_nutrients FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.foods 
      WHERE foods.id = food_nutrients.food_id AND (foods.published = true OR public.is_admin())
    )
  );

CREATE POLICY "Admins can modify nutrients"
  ON public.food_nutrients FOR ALL
  USING (public.is_admin());

-- Muscle Groups Policies
CREATE POLICY "Public can view muscle groups"
  ON public.muscle_groups FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify muscle groups"
  ON public.muscle_groups FOR ALL
  USING (public.is_admin());

-- Exercises Policies
CREATE POLICY "Public can view published exercises"
  ON public.exercises FOR SELECT
  USING (published = true OR public.is_admin());

CREATE POLICY "Admins can modify exercises"
  ON public.exercises FOR ALL
  USING (public.is_admin());

-- Exercise Muscles Policies
CREATE POLICY "Public can view exercise muscles"
  ON public.exercise_muscles FOR SELECT
  USING (true);

CREATE POLICY "Admins can modify exercise muscles"
  ON public.exercise_muscles FOR ALL
  USING (public.is_admin());

-- Calculator History Policies
CREATE POLICY "Users can view their own calculator history"
  ON public.calculator_history FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert into calculator history"
  ON public.calculator_history FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own calculator history"
  ON public.calculator_history FOR DELETE
  USING (auth.uid() = user_id);

-- Food Logs Policies
CREATE POLICY "Users can view their own food logs"
  ON public.food_logs FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own food logs"
  ON public.food_logs FOR INSERT
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update their own food logs"
  ON public.food_logs FOR UPDATE
  USING (auth.uid() = user_id);

CREATE POLICY "Users can delete their own food logs"
  ON public.food_logs FOR DELETE
  USING (auth.uid() = user_id);

-- Workout Plans Policies
CREATE POLICY "Users can manage their own workout plans"
  ON public.workout_plans FOR ALL
  USING (auth.uid() = user_id);

-- Workout Plan Exercises Policies
CREATE POLICY "Users can manage exercises in their own plans"
  ON public.workout_plan_exercises FOR ALL
  USING (
    EXISTS (
      SELECT 1 FROM public.workout_plans
      WHERE workout_plans.id = workout_plan_exercises.workout_plan_id AND workout_plans.user_id = auth.uid()
    )
  );

-- Workout Logs Policies
CREATE POLICY "Users can manage their own workout logs"
  ON public.workout_logs FOR ALL
  USING (auth.uid() = user_id);

-- Weight History Policies
CREATE POLICY "Users can manage their own weight history"
  ON public.weight_history FOR ALL
  USING (auth.uid() = user_id);

-- Favorites Policies
CREATE POLICY "Users can manage their own favorites"
  ON public.favorites FOR ALL
  USING (auth.uid() = user_id);

-- Admin Audit Logs Policies
CREATE POLICY "Admins can view audit logs"
  ON public.admin_audit_logs FOR SELECT
  USING (public.is_admin());

CREATE POLICY "Admins can insert audit logs"
  ON public.admin_audit_logs FOR INSERT
  WITH CHECK (public.is_admin());

-- -----------------------------------------------------------------------------
-- 19. AUTOMATIC TIMESTAMP TRIGGERS
-- -----------------------------------------------------------------------------
CREATE OR REPLACE FUNCTION public.handle_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_profiles_timestamp
  BEFORE UPDATE ON public.profiles
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER update_foods_timestamp
  BEFORE UPDATE ON public.foods
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();

CREATE TRIGGER update_exercises_timestamp
  BEFORE UPDATE ON public.exercises
  FOR EACH ROW EXECUTE PROCEDURE public.handle_updated_at();
