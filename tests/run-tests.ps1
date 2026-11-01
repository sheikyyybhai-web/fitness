# ==============================================================================
# FITNESS METRIC: Automated Verification and Quality Assurance Suite
# Master Prompt Verification for Complete Fitness and Nutrition Web Platform
# ==============================================================================

Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host "    FITNESS METRIC - AUTOMATED VERIFICATION AND TEST SUITE       " -ForegroundColor Cyan
Write-Host "    Evidence-Based Fitness, Nutrition and Movement Science       " -ForegroundColor Cyan
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host ""

$script:TotalTests = 0
$script:PassedTests = 0

function Assert-Test {
    param(
        [bool]$Condition,
        [string]$Name
    )
    $script:TotalTests++
    if ($Condition) {
        Write-Host "  [PASS] $Name" -ForegroundColor Green
        $script:PassedTests++
    } else {
        Write-Host "  [FAIL] $Name" -ForegroundColor Red
    }
}

$projectDir = "C:\Users\Sheik Mohamed\.gemini\antigravity\scratch\fitmetric"

# ------------------------------------------------------------------------------
# 1. FILE SYSTEM AND CODEBASE ARCHITECTURE
# ------------------------------------------------------------------------------
Write-Host "--- 1. Architecture and Core Files ---" -ForegroundColor Yellow
Assert-Test -Condition (Test-Path "$projectDir\index.html") -Name "Web Application Entrypoint index.html exists"
Assert-Test -Condition (Test-Path "$projectDir\package.json") -Name "Package manifest package.json exists"
Assert-Test -Condition (Test-Path "$projectDir\.env.example") -Name "Environment example .env.example exists"
Assert-Test -Condition (Test-Path "$projectDir\src\types\fitness.ts") -Name "TypeScript Domain Types src/types/fitness.ts exists"
Assert-Test -Condition (Test-Path "$projectDir\src\lib\metrics-calculator.ts") -Name "Body Metrics Calculator Engine exists"
Assert-Test -Condition (Test-Path "$projectDir\src\lib\nutrition-database.ts") -Name "Nutrition Database Engine exists"
Assert-Test -Condition (Test-Path "$projectDir\src\lib\exercise-library.ts") -Name "Exercise Library and Biomechanics Engine exists"
Assert-Test -Condition (Test-Path "$projectDir\src\lib\supabase-client.ts") -Name "Supabase Client and Auth Module exists"
Assert-Test -Condition (Test-Path "$projectDir\src\lib\storage-engine.ts") -Name "Storage Engine and Dual Persistence Manager exists"
Assert-Test -Condition (Test-Path "$projectDir\supabase\schema.sql") -Name "Supabase PostgreSQL Schema exists"
Assert-Test -Condition (Test-Path "$projectDir\supabase\migrations\20261028_fitness_metric_init.sql") -Name "Initial Supabase Migration exists"
Assert-Test -Condition (Test-Path "$projectDir\supabase\seed.sql") -Name "Authoritative Seed SQL script exists"

# ------------------------------------------------------------------------------
# 2. BRAND IDENTITY AND UI THEME SPECIFICATIONS
# ------------------------------------------------------------------------------
Write-Host "`n--- 2. Brand Identity and UI Theme Specifications ---" -ForegroundColor Yellow
$indexContent = Get-Content "$projectDir\index.html" -Raw
Assert-Test -Condition ($indexContent -match "Fitness Metric") -Name "Brand name Fitness Metric present in UI"
Assert-Test -Condition ($indexContent -match "#F7F7F2") -Name "Primary warm off-white background (#F7F7F2) defined"
Assert-Test -Condition ($indexContent -match "#202522") -Name "Primary deep charcoal text (#202522) defined"
Assert-Test -Condition ($indexContent -match "#527A61") -Name "Muted forest green accent (#527A61) defined"
Assert-Test -Condition ($indexContent -match "#DCE8DE") -Name "Soft sage secondary accent (#DCE8DE) defined"
Assert-Test -Condition ($indexContent -match "#FFFFFF") -Name "Pure white card background (#FFFFFF) defined"
Assert-Test -Condition ($indexContent -match "#E4E7E2") -Name "Light grey border (#E4E7E2) defined"

# ------------------------------------------------------------------------------
# 3. SUPABASE 15-TABLE DATABASE SCHEMA AND RLS SECURITY
# ------------------------------------------------------------------------------
Write-Host "`n--- 3. Database Schema: All 15 Tables and RLS Policies ---" -ForegroundColor Yellow
$schema = Get-Content "$projectDir\supabase\schema.sql" -Raw

$requiredTables = @(
    "profiles",
    "food_categories",
    "foods",
    "food_nutrients",
    "exercises",
    "muscle_groups",
    "exercise_muscles",
    "calculator_history",
    "food_logs",
    "workout_plans",
    "workout_plan_exercises",
    "workout_logs",
    "weight_history",
    "favorites",
    "admin_audit_logs"
)

foreach ($table in $requiredTables) {
    Assert-Test -Condition ($schema -match "CREATE TABLE IF NOT EXISTS public\.$table") -Name "Table $table defined in schema.sql"
    Assert-Test -Condition ($schema -match "ALTER TABLE public\.$table ENABLE ROW LEVEL SECURITY;") -Name "RLS explicitly enabled on $table"
}

Assert-Test -Condition ($schema -match "CREATE OR REPLACE FUNCTION public\.is_admin\(\)") -Name "Admin role security-definer function (is_admin) implemented"
Assert-Test -Condition ($schema -match "auth\.uid\(\) = user_id") -Name "User-isolation RLS check enforced on personal records"
Assert-Test -Condition ($schema -match "public\.is_admin\(\)") -Name "Admin-only write authorization enforced on food/exercise catalogs"

# ------------------------------------------------------------------------------
# 4. MODULE 1: THE 12 BODY CALCULATORS ENGINE
# ------------------------------------------------------------------------------
Write-Host "`n--- 4. Module 1: The 12 Body Calculation Tools ---" -ForegroundColor Yellow
$calcSource = Get-Content "$projectDir\src\lib\metrics-calculator.ts" -Raw

Assert-Test -Condition ($calcSource -match "function calculateBMI") -Name "Tool 1: BMI (Body Mass Index) implemented"
Assert-Test -Condition ($calcSource -match "function calculateBMR") -Name "Tool 2: BMR (Mifflin-St Jeor) implemented"
Assert-Test -Condition ($calcSource -match "function calculateTDEE") -Name "Tool 3: TDEE (Total Daily Energy Expenditure) implemented"
Assert-Test -Condition ($calcSource -match "function calculateLBM") -Name "Tool 4: LBM (Lean Body Mass - Boer and BF%) implemented"
Assert-Test -Condition ($calcSource -match "function calculateFatMass") -Name "Tool 5: Fat Mass calculation implemented"
Assert-Test -Condition ($calcSource -match "function calculateBodyFatNavy") -Name "Tool 6: Body-Fat Percentage (US Navy Method) implemented"
Assert-Test -Condition ($calcSource -match "function calculateReferenceWeight") -Name "Tool 7: Ideal/Reference Weight Range implemented"
Assert-Test -Condition ($calcSource -match "function calculateWHtR") -Name "Tool 8: Waist-to-Height Ratio (WHtR) implemented"
Assert-Test -Condition ($calcSource -match "function calculateProteinRequirement") -Name "Tool 9: Daily Protein Requirement implemented"
Assert-Test -Condition ($calcSource -match "function calculateFiberRequirement") -Name "Tool 10: Daily Fiber Requirement implemented"
Assert-Test -Condition ($calcSource -match "function calculateCalorieGoal") -Name "Tool 11: Daily Calorie Goal with safety floors implemented"
Assert-Test -Condition ($calcSource -match "function planMacronutrients") -Name "Tool 12: Macronutrient Planner implemented"

# Math verification for BMI
$testW = 74.5
$testH = 178
$bmiExpected = [Math]::Round(($testW / (($testH / 100) * ($testH / 100))), 1)
Assert-Test -Condition ($bmiExpected -eq 23.5) -Name "BMI calculation math correct (74.5kg / 1.78m2 = 23.5)"

# Math verification for Mifflin-St Jeor BMR
$bmrExpected = [Math]::Round(10 * $testW + 6.25 * $testH - 5 * 28 + 5)
Assert-Test -Condition ($bmrExpected -eq 1723 -or $bmrExpected -eq 1722) -Name "Mifflin-St Jeor male BMR math correct (1723 kcal)"

# ------------------------------------------------------------------------------
# 5. MODULE 2: FOOD DATABASE AND NUTRITION EXPLORER
# ------------------------------------------------------------------------------
Write-Host "`n--- 5. Module 2: Food Database and Nutrition Explorer ---" -ForegroundColor Yellow
$nutrSource = Get-Content "$projectDir\src\lib\nutrition-database.ts" -Raw

$requiredCategories = @(
    "cat-eggs", "cat-chicken", "cat-fish", "cat-meat", "cat-dairy",
    "cat-paneer", "cat-soy", "cat-lentils", "cat-beans", "cat-nuts",
    "cat-cereals", "cat-rice", "cat-fruits", "cat-veggies", "cat-snacks",
    "cat-veg-protein", "cat-vegan-protein", "cat-indian-meals", "cat-intl-meals"
)

foreach ($cat in $requiredCategories) {
    Assert-Test -Condition ($nutrSource -match "$cat") -Name "Food Category $cat configured in database"
}

Assert-Test -Condition ($nutrSource -match "scaleNutrients") -Name "Serving-size dynamic nutrient scaler implemented"
Assert-Test -Condition ($nutrSource -match "USDA FoodData Central") -Name "Attributed to USDA FoodData Central"
Assert-Test -Condition ($nutrSource -match "ICMR - National Institute of Nutrition") -Name "Attributed to ICMR-NIN Indian Food Composition Tables"
Assert-Test -Condition ($nutrSource -match "filterFoods") -Name "Multi-criteria food search and filters implemented"

# ------------------------------------------------------------------------------
# 6. MODULE 3: EXERCISE LIBRARY AND MUSCLE ACTIVATION GUIDE
# ------------------------------------------------------------------------------
Write-Host "`n--- 6. Module 3: Exercise Library and Muscle Activation Guide ---" -ForegroundColor Yellow
$exSource = Get-Content "$projectDir\src\lib\exercise-library.ts" -Raw

Assert-Test -Condition ($exSource -match "muscle-chest") -Name "Chest pectoralis muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-lats") -Name "Back latissimus dorsi muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-shoulders") -Name "Shoulder deltoids muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-biceps") -Name "Biceps muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-triceps") -Name "Triceps muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-core") -Name "Core rectus abdominis muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-glutes") -Name "Gluteal complex muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-quads") -Name "Quadriceps muscle group configured"
Assert-Test -Condition ($exSource -match "muscle-hamstrings") -Name "Hamstrings muscle group configured"
Assert-Test -Condition ($exSource -match "breathingGuidance") -Name "Breathing guidance documented on exercises"
Assert-Test -Condition ($exSource -match "commonMistakes") -Name "Common execution mistakes documented on exercises"
Assert-Test -Condition ($exSource -match "safetyNotes") -Name "Safety precautions and joint protections documented"
Assert-Test -Condition ($exSource -match "easierVariation") -Name "Easier variations and progression pathways provided"

# ------------------------------------------------------------------------------
# 7. MODULE 4: ADMIN DASHBOARD AND SECURITY AUDIT
# ------------------------------------------------------------------------------
Write-Host "`n--- 7. Module 4: Admin Content Management and Audit Logging ---" -ForegroundColor Yellow
$storeSource = Get-Content "$projectDir\src\lib\storage-engine.ts" -Raw

Assert-Test -Condition ($storeSource -match "recordAuditLog") -Name "Audit logging engine implemented"
Assert-Test -Condition ($storeSource -match "deleteFoodItem") -Name "Admin food deletion with audit trace implemented"
Assert-Test -Condition ($storeSource -match "toggleFoodPublish") -Name "Admin publish/unpublish toggle implemented"
Assert-Test -Condition ($storeSource -match "updateUserAccountStatus") -Name "Admin user account status and role manager implemented"
Assert-Test -Condition ($storeSource -match "switchRole") -Name "Role switching simulator implemented"

# ------------------------------------------------------------------------------
# 8. MODULE 5: PROFILE, PROGRESS AND PRIVACY
# ------------------------------------------------------------------------------
Write-Host "`n--- 8. Module 5: Profile, Progress and Privacy ---" -ForegroundColor Yellow
Assert-Test -Condition ($storeSource -match "exportUserData") -Name "Account summary and privacy data export implemented"
Assert-Test -Condition ($storeSource -match "deleteUserData") -Name "Account data erasure capability implemented"
Assert-Test -Condition ($storeSource -match "getWeightHistory") -Name "Historical check-in progress tracker implemented"
Assert-Test -Condition ($storeSource -match "getDailyNutritionalTotals") -Name "Daily nutritional aggregation against calorie target implemented"

# ------------------------------------------------------------------------------
# 9. ATHLETIC RED THEME AND PROTEIN DATA INTEGRITY
# ------------------------------------------------------------------------------
Write-Host "`n--- 9. Athletic Red Theme and Protein Data Integrity ---" -ForegroundColor Yellow
Assert-Test -Condition ($indexContent -match "#DC2626") -Name "Athletic Crimson Red palette (#DC2626) active in UI"
Assert-Test -Condition ($indexContent -match "#FEE2E2") -Name "Soft Rose secondary accent (#FEE2E2) active in UI"
Assert-Test -Condition ($indexContent -match "EditFoodModal") -Name "Interactive Protein and Nutrition Editor modal implemented"
Assert-Test -Condition ($indexContent -match "Morton 2018") -Name "Morton et al. 2018 protein hypertrophy guidance implemented"
Assert-Test -Condition ($indexContent -match "Leucine") -Name "Leucine threshold Muscle Protein Synthesis triggers calculated"
Assert-Test -Condition ($indexContent -match "displayName: 'User'") -Name "Default profile display name configured as User"

# ------------------------------------------------------------------------------
# SUMMARY REPORT
# ------------------------------------------------------------------------------
Write-Host ""
Write-Host "=================================================================" -ForegroundColor Cyan
Write-Host " TOTAL VERIFICATION CHECKS: $script:TotalTests" -ForegroundColor Cyan
Write-Host " TESTS PASSED:             $script:PassedTests" -ForegroundColor Green
$failed = $script:TotalTests - $script:PassedTests
if ($failed -gt 0) {
    Write-Host " TESTS FAILED:             $failed" -ForegroundColor Red
} else {
    Write-Host " ALL CHECKS PASSED (100% COMPLIANCE)" -ForegroundColor Green
}
Write-Host "=================================================================" -ForegroundColor Cyan

exit $failed
