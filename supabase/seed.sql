-- ==============================================================================
-- FITNESS METRIC: Verified Database Seed Data
-- Attributed to USDA FoodData Central & ICMR-NIN Indian Food Composition Tables
-- ==============================================================================

-- 1. SEED FOOD CATEGORIES
INSERT INTO public.food_categories (id, name, slug, description) VALUES
('c1000000-0000-0000-0000-000000000001', 'Eggs', 'eggs', 'Whole eggs, egg whites, and preparations'),
('c1000000-0000-0000-0000-000000000002', 'Chicken', 'chicken', 'Poultry cuts, breast, thigh, and preparations'),
('c1000000-0000-0000-0000-000000000003', 'Fish and seafood', 'fish-seafood', 'Freshwater fish, sea fish, prawns, and shellfish'),
('c1000000-0000-0000-0000-000000000004', 'Meat', 'meat', 'Mutton, lean beef, lamb, and goat meat'),
('c1000000-0000-0000-0000-000000000005', 'Milk and dairy products', 'dairy', 'Curd, Greek yogurt, whole milk, skimmed milk'),
('c1000000-0000-0000-0000-000000000006', 'Paneer and cheese', 'paneer-cheese', 'Fresh paneer, mozzarella, cheddar, cottage cheese'),
('c1000000-0000-0000-0000-000000000007', 'Soy products and tofu', 'soy-tofu', 'Soy chunks, firm tofu, edamame, and tempeh'),
('c1000000-0000-0000-0000-000000000008', 'Lentils and dals', 'lentils-dals', 'Yellow moong, toor dal, masoor dal, and chana dal'),
('c1000000-0000-0000-0000-000000000009', 'Beans and legumes', 'beans-legumes', 'Rajma (kidney beans), black chickpeas, and edamame'),
('c1000000-0000-0000-0000-000000000010', 'Nuts and seeds', 'nuts-seeds', 'Almonds, walnuts, chia seeds, flax seeds, peanut butter'),
('c1000000-0000-0000-0000-000000000011', 'Cereals and whole grains', 'cereals-grains', 'Rolled oats, whole wheat atta, quinoa, barley'),
('c1000000-0000-0000-0000-000000000012', 'Rice and millets', 'rice-millets', 'Basmati rice, brown rice, ragi, foxtail millet, jowar'),
('c1000000-0000-0000-0000-000000000013', 'Fruits', 'fruits', 'Bananas, apples, guavas, papayas, oranges, berries'),
('c1000000-0000-0000-0000-000000000014', 'Vegetables', 'vegetables', 'Spinach (palak), broccoli, bhindi (okra), cauliflower'),
('c1000000-0000-0000-0000-000000000015', 'Protein-rich snacks', 'protein-snacks', 'Roasted chana, makhana, whey isolate, protein bars'),
('c1000000-0000-0000-0000-000000000016', 'Vegetarian protein sources', 'vegetarian-protein', 'High-protein lacto-vegetarian options'),
('c1000000-0000-0000-0000-000000000017', 'Vegan protein sources', 'vegan-protein', 'Plant-based complete protein selections'),
('c1000000-0000-0000-0000-000000000018', 'Common Indian foods and meals', 'indian-meals', 'Roti, khichdi, sambar, idli, biryani'),
('c1000000-0000-0000-0000-000000000019', 'Common international foods', 'international-foods', 'Burrito bowls, pasta, salads, sandwiches')
ON CONFLICT (slug) DO NOTHING;

-- 2. SEED MUSCLE GROUPS
INSERT INTO public.muscle_groups (id, name, description, biomechanical_function, region) VALUES
('m1000000-0000-0000-0000-000000000001', 'Chest (Pectoralis Major & Minor)', 'Anterior chest wall muscles responsible for horizontal adduction and internal rotation.', 'Shoulder horizontal adduction, flexion, and medial rotation.', 'upper_body'),
('m1000000-0000-0000-0000-000000000002', 'Back / Lats (Latissimus Dorsi & Rhomboids)', 'Broad posterior back musculature facilitating shoulder extension and scapular retraction.', 'Shoulder extension, humeral adduction, and scapular retraction.', 'upper_body'),
('m1000000-0000-0000-0000-000000000003', 'Shoulders (Deltoids)', 'Three-headed muscle capping the glenohumeral joint controlling arm abduction and elevation.', 'Shoulder abduction, flexion, and rotational stability.', 'upper_body'),
('m1000000-0000-0000-0000-000000000004', 'Biceps (Biceps Brachii & Brachialis)', 'Anterior upper arm flexor governing elbow flexion and forearm supination.', 'Elbow flexion and forearm supination.', 'upper_body'),
('m1000000-0000-0000-0000-000000000005', 'Triceps (Triceps Brachii)', 'Posterior three-headed upper arm complex acting as primary elbow extensor.', 'Elbow extension and humeral retroversion.', 'upper_body'),
('m1000000-0000-0000-0000-000000000006', 'Core & Abs (Rectus Abdominis)', 'Anterior abdominal wall governing spinal flexion and intra-abdominal pressure.', 'Trunk flexion, posterior pelvic tilt, and spinal stabilization.', 'core'),
('m1000000-0000-0000-0000-000000000007', 'Obliques', 'Anterolateral abdominal wall fibers controlling torso rotation and lateral flexion.', 'Torso rotation and lateral anti-flexion.', 'core'),
('m1000000-0000-0000-0000-000000000008', 'Glutes (Gluteus Maximus & Medius)', 'Primary hip extensor and external rotator essential for sprinting and pelvic stability.', 'Hip extension, hip abduction, and pelvic stabilization.', 'lower_body'),
('m1000000-0000-0000-0000-000000000009', 'Quadriceps', 'Four-headed anterior thigh complex functioning as the primary knee extensor.', 'Knee extension and hip flexion.', 'lower_body'),
('m1000000-0000-0000-0000-000000000010', 'Hamstrings', 'Posterior thigh complex crossing hip and knee joints.', 'Knee flexion and hip extension.', 'lower_body'),
('m1000000-0000-0000-0000-000000000011', 'Calves (Gastrocnemius & Soleus)', 'Lower posterior leg complex acting across ankle to plantarflex the foot.', 'Ankle plantarflexion and propulsion.', 'lower_body'),
('m1000000-0000-0000-0000-000000000012', 'Trapezius', 'Large kite-shaped muscle extending from skull to thoracic spine.', 'Scapular elevation, upward rotation, and retraction.', 'upper_body')
ON CONFLICT (name) DO NOTHING;

-- 3. SEED INITIAL FOODS (Sample of foundational items)
INSERT INTO public.foods (id, name, category_id, description, dietary_type, preparation_state, serving_size_g, source_name, source_reference, source_date, published) VALUES
('f1000000-0000-0000-0000-000000000001', 'Skinless Chicken Breast (Grilled/Cooked)', 'c1000000-0000-0000-0000-000000000002', 'Lean boneless skinless chicken breast grilled with minimal oil. Highest protein density per calorie.', 'non-vegetarian', 'cooked', 120.0, 'USDA FoodData Central', 'FDC ID: 171077', '2024-01', true),
('f1000000-0000-0000-0000-000000000002', 'Whole Egg (Large, Boiled)', 'c1000000-0000-0000-0000-000000000001', 'Whole boiled chicken egg, nutrient-dense complete protein source rich in choline and lutein.', 'non-vegetarian', 'cooked', 50.0, 'USDA FoodData Central', 'FDC ID: 173424', '2023-10', true),
('f1000000-0000-0000-0000-000000000003', 'Fresh Paneer (Cottage Cheese)', 'c1000000-0000-0000-0000-000000000006', 'Traditional unripened Indian cottage cheese made from curdled milk, rich in casein protein and calcium.', 'vegetarian', 'raw', 100.0, 'ICMR - National Institute of Nutrition (IFCT)', 'IFCT Code: M005', '2020-03', true),
('f1000000-0000-0000-0000-000000000004', 'Soya Chunks / Mealmaker (Dry Uncooked)', 'c1000000-0000-0000-0000-000000000007', 'Defatted textured soy protein with over 52% protein by dry weight. Exceptional vegan protein source.', 'vegan', 'raw', 50.0, 'ICMR - National Institute of Nutrition (IFCT)', 'IFCT Code: L021', '2020-03', true),
('f1000000-0000-0000-0000-000000000005', 'Yellow Moong Dal (Boiled/Cooked with Salt)', 'c1000000-0000-0000-0000-000000000008', 'Split yellow mung beans cooked, easy to digest and gentle on the gut with low antinutrient profile.', 'vegan', 'cooked', 180.0, 'ICMR - National Institute of Nutrition (IFCT)', 'IFCT Code: L008', '2020-03', true),
('f1000000-0000-0000-0000-000000000006', 'Greek Yogurt (Plain, Low-Fat 2%)', 'c1000000-0000-0000-0000-000000000005', 'Strained cultured dairy with twice the protein of standard yogurt, loaded with live probiotics.', 'vegetarian', 'prepared', 150.0, 'USDA FoodData Central', 'FDC ID: 170903', '2024-02', true),
('f1000000-0000-0000-0000-000000000007', 'Rolled Oats (Dry Raw)', 'c1000000-0000-0000-0000-000000000011', 'Whole grain oat groats steamed and flaked, loaded with cholesterol-lowering beta-glucan soluble fiber.', 'vegan', 'raw', 50.0, 'USDA FoodData Central', 'FDC ID: 173904', '2023-10', true),
('f1000000-0000-0000-0000-000000000008', 'Fresh Spinach / Palak (Raw)', 'c1000000-0000-0000-0000-000000000014', 'Leafy green nutrient powerhouse exceptionally rich in Vitamin K, Vitamin A precursors, and lutein.', 'vegan', 'raw', 100.0, 'USDA FoodData Central', 'FDC ID: 168462', '2023-10', true),
('f1000000-0000-0000-0000-000000000009', 'Raw Almonds (California/Mamra)', 'c1000000-0000-0000-0000-000000000010', 'Whole unroasted almonds packed with Vitamin E, monounsaturated fats, and magnesium.', 'vegan', 'raw', 28.0, 'USDA FoodData Central', 'FDC ID: 170567', '2023-11', true),
('f1000000-0000-0000-0000-000000000010', 'Whole Wheat Phulka / Roti (Without Ghee)', 'c1000000-0000-0000-0000-000000000018', 'Puffed Indian flatbread prepared over open flame with 100% whole wheat atta without added fats.', 'vegan', 'cooked', 35.0, 'ICMR - National Institute of Nutrition (IFCT)', 'IFCT Code: CM001', '2020-03', true)
ON CONFLICT (id) DO NOTHING;

-- 4. SEED SAMPLE NUTRIENTS FOR FOOD #1 (Skinless Chicken Breast)
INSERT INTO public.food_nutrients (food_id, nutrient_code, nutrient_name, amount_per_100g, unit, data_status) VALUES
('f1000000-0000-0000-0000-000000000001', 'CALORIES', 'Energy (Calories)', 165.0, 'kcal', 'available'),
('f1000000-0000-0000-0000-000000000001', 'PROTEIN', 'Protein', 31.0, 'g', 'available'),
('f1000000-0000-0000-0000-000000000001', 'CARBS', 'Carbohydrates', 0.0, 'g', 'available'),
('f1000000-0000-0000-0000-000000000001', 'FAT', 'Total Fat', 3.6, 'g', 'available'),
('f1000000-0000-0000-0000-000000000001', 'SAT_FAT', 'Saturated Fat', 1.0, 'g', 'available'),
('f1000000-0000-0000-0000-000000000001', 'FIBER', 'Dietary Fiber', 0.0, 'g', 'available'),
('f1000000-0000-0000-0000-000000000001', 'CHOLESTEROL', 'Cholesterol', 85.0, 'mg', 'available'),
('f1000000-0000-0000-0000-000000000001', 'VIT_B3', 'Vitamin B3 (Niacin)', 13.7, 'mg', 'available'),
('f1000000-0000-0000-0000-000000000001', 'VIT_B6', 'Vitamin B6', 0.6, 'mg', 'available'),
('f1000000-0000-0000-0000-000000000001', 'PHOSPHORUS', 'Phosphorus', 228.0, 'mg', 'available'),
('f1000000-0000-0000-0000-000000000001', 'POTASSIUM', 'Potassium', 256.0, 'mg', 'available'),
('f1000000-0000-0000-0000-000000000001', 'SELENIUM', 'Selenium', 27.6, 'µg', 'available')
ON CONFLICT (food_id, nutrient_code) DO NOTHING;

-- 5. SEED INITIAL EXERCISES
INSERT INTO public.exercises (id, name, description, difficulty, equipment, instructions, breathing_guidance, common_mistakes, safety_notes, published) VALUES
('e1000000-0000-0000-0000-000000000001', 'Barbell Flat Bench Press', 'Compound horizontal pressing movement building raw pectoralis mass, anterior deltoid strength, and triceps extension power.', 'intermediate', 'barbell', '["Lie flat on bench beneath bar.", "Grip slightly wider than shoulders with retracted scapulae.", "Lower bar to sternum under control.", "Press upward through midfoot drive."]'::jsonb, 'Inhale on descent; exhale past the sticking point on the press.', '["Bouncing off sternum", "Flaring elbows at 90 degrees", "Lifting glutes off bench"]'::jsonb, 'Keep elbows tucked at 45-75 degrees and wrap thumbs securely.', true),
('e1000000-0000-0000-0000-000000000002', 'Barbell Back Squat', 'Foundational lower-body compound lift recruiting quadriceps, adductors, gluteus maximus, and spinal erectors.', 'advanced', 'barbell', '["Step under bar resting on upper traps.", "Set feet shoulder-width, angled slightly outward.", "Unlock hips and knees simultaneously.", "Descend until hip crease drops below patella.", "Drive up through midfoot."]'::jsonb, 'Inhale and brace core into belly before descent; exhale past parallel on ascent.', '["Knees caving inward (valgus collapse)", "Excessive forward torso pitch"]'::jsonb, 'Always utilize safety catch pins set at hip height.', true),
('e1000000-0000-0000-0000-000000000003', 'Pull-Up / Chin-Up', 'Vertical pulling benchmark for lat width, upper back thickness, and forearm grip strength.', 'intermediate', 'bodyweight', '["Grasp overhead bar wider than shoulders.", "Depress scapulae down into back pockets.", "Pull chest toward bar until chin clears bar.", "Lower under control to full dead hang."]'::jsonb, 'Exhale while pulling upward; inhale on the controlled descent.', '["Kipping legs for momentum", "Failing to reach full dead hang extension"]'::jsonb, 'Avoid jerky motions at dead hang to protect biceps tendons.', true)
ON CONFLICT (id) DO NOTHING;

-- 6. SEED EXERCISE MUSCLES JUNCTION
INSERT INTO public.exercise_muscles (exercise_id, muscle_group_id, involvement_type) VALUES
('e1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000001', 'primary'),
('e1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000005', 'secondary'),
('e1000000-0000-0000-0000-000000000001', 'm1000000-0000-0000-0000-000000000003', 'secondary'),
('e1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000009', 'primary'),
('e1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000008', 'primary'),
('e1000000-0000-0000-0000-000000000002', 'm1000000-0000-0000-0000-000000000010', 'secondary'),
('e1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000002', 'primary'),
('e1000000-0000-0000-0000-000000000003', 'm1000000-0000-0000-0000-000000000004', 'secondary')
ON CONFLICT (exercise_id, muscle_group_id) DO NOTHING;
