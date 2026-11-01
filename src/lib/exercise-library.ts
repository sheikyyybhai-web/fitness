// ==============================================================================
// FITNESS METRIC: Exercise Library & Biomechanical Muscle Activation Engine
// Evidence-based exercise biomechanics, cues, safety & anatomical targeting
// ==============================================================================

import { ExerciseDifficulty, ExerciseItem, MuscleGroup } from '../types/fitness';

export const MUSCLE_GROUPS: MuscleGroup[] = [
  {
    id: 'muscle-chest',
    name: 'Chest (Pectoralis Major & Minor)',
    description: 'The anterior chest wall muscles responsible for horizontal adduction, flexion, and internal rotation of the humerus.',
    biomechanicalFunction: 'Shoulder horizontal adduction, shoulder flexion (clavicular head), and medial rotation.',
    region: 'upper_body'
  },
  {
    id: 'muscle-lats',
    name: 'Back / Lats (Latissimus Dorsi & Rhomboids)',
    description: 'The broad posterior back musculature facilitating shoulder extension, adduction, and scapular retraction.',
    biomechanicalFunction: 'Shoulder extension, humeral adduction, scapular retraction, and spinal stabilization.',
    region: 'upper_body'
  },
  {
    id: 'muscle-shoulders',
    name: 'Shoulders (Deltoids - Anterior, Lateral, Posterior)',
    description: 'Three-headed muscle capping the glenohumeral joint controlling arm abduction, flexion, and extension.',
    biomechanicalFunction: 'Shoulder abduction, humeral elevation in scapular plane, and rotational stability.',
    region: 'upper_body'
  },
  {
    id: 'muscle-biceps',
    name: 'Biceps (Biceps Brachii & Brachialis)',
    description: 'Anterior upper arm flexor crossing both shoulder and elbow joints, responsible for forearm supination and elbow flexion.',
    biomechanicalFunction: 'Elbow flexion and forearm supination (turning palm upwards).',
    region: 'upper_body'
  },
  {
    id: 'muscle-triceps',
    name: 'Triceps (Triceps Brachii - Lateral, Long, Medial Heads)',
    description: 'Posterior three-headed upper arm complex acting as the primary extensor of the elbow joint.',
    biomechanicalFunction: 'Elbow extension and humeral retroversion/adduction (long head).',
    region: 'upper_body'
  },
  {
    id: 'muscle-core',
    name: 'Core & Abs (Rectus Abdominis & Transverse Abdominis)',
    description: 'The anterior and deep abdominal wall governing spinal flexion, anti-extension, and intra-abdominal pressure.',
    biomechanicalFunction: 'Trunk flexion, posterior pelvic tilt, spinal stabilization, and breathing support.',
    region: 'core'
  },
  {
    id: 'muscle-obliques',
    name: 'Obliques (Internal & External Obliques)',
    description: 'Anterolateral abdominal wall fibers controlling trunk rotation and lateral flexion.',
    biomechanicalFunction: 'Torso rotation, lateral flexion, and anti-rotational stability.',
    region: 'core'
  },
  {
    id: 'muscle-glutes',
    name: 'Glutes (Gluteus Maximus, Medius, Minimus)',
    description: 'The primary hip extensor and external rotator; critical for sprinting, jumping, posture, and pelvic alignment.',
    biomechanicalFunction: 'Hip extension, hip abduction, pelvic stabilization, and external femoral rotation.',
    region: 'lower_body'
  },
  {
    id: 'muscle-quads',
    name: 'Quadriceps (Rectus Femoris, Vastus Lateralis/Medialis/Intermedius)',
    description: 'Four-headed anterior thigh complex functioning as the primary knee extensor.',
    biomechanicalFunction: 'Knee extension and hip flexion (rectus femoris).',
    region: 'lower_body'
  },
  {
    id: 'muscle-hamstrings',
    name: 'Hamstrings (Biceps Femoris, Semitendinosus, Semimembranosus)',
    description: 'Posterior thigh complex crossing hip and knee joints; operates in hip extension and knee flexion.',
    biomechanicalFunction: 'Knee flexion, hip extension, and deceleration during running strides.',
    region: 'lower_body'
  },
  {
    id: 'muscle-calves',
    name: 'Calves (Gastrocnemius & Soleus)',
    description: 'Lower posterior leg complex acting across the ankle to plantarflex the foot and stabilize gait.',
    biomechanicalFunction: 'Ankle plantarflexion, propulsion during jumping, and knee stabilization.',
    region: 'lower_body'
  },
  {
    id: 'muscle-traps',
    name: 'Trapezius (Upper, Middle, Lower Trapezius)',
    description: 'Large kite-shaped muscle extending from skull to thoracic spine governing scapular elevation and retraction.',
    biomechanicalFunction: 'Scapular elevation, upward rotation, retraction, and depression.',
    region: 'upper_body'
  }
];

export const INITIAL_EXERCISES: ExerciseItem[] = [
  // --- CHEST ---
  {
    id: 'ex-001',
    name: 'Barbell Flat Bench Press',
    description: 'Compound horizontal pressing movement building raw pectoralis mass, anterior deltoid strength, and triceps extension power.',
    difficulty: 'intermediate',
    equipment: 'barbell',
    primaryMuscles: ['muscle-chest'],
    secondaryMuscles: ['muscle-triceps', 'muscle-shoulders'],
    recommendedSets: '3-4 sets',
    recommendedReps: '6-10 reps',
    instructions: [
      'Lie flat on the bench with eyes positioned directly beneath the racked barbell.',
      'Grip the bar slightly wider than shoulder width with thumbs wrapped securely.',
      'Retract and depress scapulae, pin upper back into the bench, and plant feet firmly flat on the floor.',
      'Unrack the bar and stabilize it directly over mid-chest with arms locked out.',
      'Inhale deeply and lower the bar in a controlled diagonal arc to the lower sternum.',
      'Touch chest lightly without bouncing, then drive feet into the floor and press the bar upwards along the natural arc to full lockout.'
    ],
    breathingGuidance: 'Inhale and brace core (Valsalva maneuver) as you lower the weight; exhale forcefully past the sticking point on the ascent.',
    commonMistakes: [
      'Bouncing the barbell off the sternum using momentum rather than muscular tension.',
      'Flaring elbows out at a 90-degree angle to the torso, stressing the rotator cuff.',
      'Lifting glutes off the bench to shorten range of motion.'
    ],
    safetyNotes: 'Always use safety pins or a spotter when training near muscular failure. Tuck elbows to ~45-75 degrees.',
    easierVariation: 'Dumbbell Floor Press (restricts shoulder hyperextension)',
    progressionVariation: 'Paused Bench Press (2-second isometric pause at sternum)',
    published: true
  },
  {
    id: 'ex-002',
    name: 'Standard Push-Up',
    description: 'Fundamental closed-kinetic-chain bodyweight movement developing chest, core rigidity, and serratus anterior function.',
    difficulty: 'beginner',
    equipment: 'bodyweight',
    primaryMuscles: ['muscle-chest'],
    secondaryMuscles: ['muscle-triceps', 'muscle-core', 'muscle-shoulders'],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-20 reps',
    instructions: [
      'Place hands on floor shoulder-width apart, fingers pointed slightly outward.',
      'Extend legs back into a rigid high plank position with glutes and abs tightly engaged.',
      'Lower torso by bending elbows until chest hovers approximately 2 inches off the ground.',
      'Maintain an unbroken straight line from crown of head down through heels.',
      'Press palm heels into floor to return to top position, actively spreading shoulder blades apart at peak.'
    ],
    breathingGuidance: 'Inhale during descent; exhale smoothly as you push away from the ground.',
    commonMistakes: [
      'Sagging hips caused by lax transverse abdominis activation.',
      'Craning neck forward toward the floor to mimic false depth.'
    ],
    safetyNotes: 'Keep elbows tucked at a 45-degree arrow shape rather than flared in a T-shape.',
    easierVariation: 'Incline Push-Up (hands elevated on bench or counter)',
    progressionVariation: 'Deficit Push-Up or Ring Push-Up',
    published: true
  },
  {
    id: 'ex-003',
    name: 'Incline Dumbbell Chest Press',
    description: 'Adjustable bench angle pressing movement targeting the clavicular (upper) head of the pectoralis major.',
    difficulty: 'intermediate',
    equipment: 'dumbbell',
    primaryMuscles: ['muscle-chest'],
    secondaryMuscles: ['muscle-shoulders', 'muscle-triceps'],
    recommendedSets: '3 sets',
    recommendedReps: '8-12 reps',
    instructions: [
      'Set bench to a 30-degree incline angle (higher angles shift excessive load to front deltoids).',
      'Sit with dumbbells resting upright on thighs; kick weights up to shoulders as you lean back.',
      'Rotate wrists so palms face forward and tuck elbows comfortably.',
      'Lower dumbbells under control until weight plates are level with clavicles.',
      'Press upward and slightly inward, squeezing upper chest at the peak contraction without clanking bells together.'
    ],
    breathingGuidance: 'Inhale as bells descend into deep chest stretch; exhale upon pressing.',
    commonMistakes: [
      'Setting bench at a steep 45-60 degree incline, making it primarily a shoulder press.'
    ],
    safetyNotes: 'Maintain neutral wrist alignment; do not allow heavy bells to bend wrists backwards.',
    easierVariation: 'Incline Push-Up',
    progressionVariation: 'Alternating Incline Dumbbell Press',
    published: true
  },

  // --- BACK ---
  {
    id: 'ex-004',
    name: 'Pull-Up / Chin-Up',
    description: 'The gold-standard vertical pulling benchmark for lat width, upper back thickness, and forearm grip strength.',
    difficulty: 'intermediate',
    equipment: 'bodyweight',
    primaryMuscles: ['muscle-lats'],
    secondaryMuscles: ['muscle-biceps', 'muscle-traps', 'muscle-core'],
    recommendedSets: '3-4 sets',
    recommendedReps: '5-10 reps',
    instructions: [
      'Grasp overhead bar with overhand (pull-up) or underhand (chin-up) grip slightly wider than shoulders.',
      'Hang at full dead hang extension with shoulders elevated naturally.',
      'Initiate pull by actively depressing scapulae down into back pockets.',
      'Drive elbows down towards hips while pulling chest toward the bar until chin clears bar height.',
      'Lower under control over 2-3 seconds back to dead hang before initiating next rep.'
    ],
    breathingGuidance: 'Exhale while pulling upward; inhale smoothly during controlled descent.',
    commonMistakes: [
      'Kicking legs or kipping to generate unearned momentum.',
      'Failing to reach full dead hang extension at the bottom.'
    ],
    safetyNotes: 'Avoid jerky movements at the bottom dead hang to protect biceps tendons.',
    easierVariation: 'Resistance Band-Assisted Pull-Up or Lat Pulldown',
    progressionVariation: 'Weighted Pull-Up (dip belt)',
    published: true
  },
  {
    id: 'ex-005',
    name: 'Barbell Bent-Over Row',
    description: 'Horizontal pulling powerhouse engaging the entire posterior chain, rhomboids, latissimus dorsi, and posterior deltoids.',
    difficulty: 'advanced',
    equipment: 'barbell',
    primaryMuscles: ['muscle-lats', 'muscle-traps'],
    secondaryMuscles: ['muscle-biceps', 'muscle-hamstrings', 'muscle-core'],
    recommendedSets: '3-4 sets',
    recommendedReps: '8-10 reps',
    instructions: [
      'Stand with feet hip-width apart, bar over midfoot. Hinge at hips until torso is roughly 45 degrees to the floor.',
      'Grasp bar with shoulder-width overhand grip with neutral spine and slight knee bend.',
      'Pull barbell toward lower ribcage / navel by driving elbows straight back.',
      'Squeeze shoulder blades tightly at the peak contraction for a split second.',
      'Lower bar with control until arms are fully extended without rounding lumbar spine.'
    ],
    breathingGuidance: 'Brace core and inhale before pull; exhale near contraction peak.',
    commonMistakes: [
      'Using aggressive hip thrusts to yank the weight upward.',
      'Rounding the lower back (lumbar flexion).'
    ],
    safetyNotes: 'Maintain an iron-clad neutral spine. If lower back fatigue occurs, transition to chest-supported dumbbell rows.',
    easierVariation: 'Chest-Supported Incline Dumbbell Row',
    progressionVariation: 'Pendlay Row (dead stop from the floor on each rep)',
    published: true
  },

  // --- LEGS & GLUTES ---
  {
    id: 'ex-006',
    name: 'Barbell Back Squat',
    description: 'Foundational lower-body compound lift recruiting quadriceps, adductors, gluteus maximus, and spinal erectors.',
    difficulty: 'advanced',
    equipment: 'barbell',
    primaryMuscles: ['muscle-quads', 'muscle-glutes'],
    secondaryMuscles: ['muscle-hamstrings', 'muscle-calves', 'muscle-core'],
    recommendedSets: '3-4 sets',
    recommendedReps: '6-10 reps',
    instructions: [
      'Step under bar, resting it across upper trapezius (high bar) or rear delts (low bar).',
      'Unrack bar, take 2-3 calculated steps back, and set feet shoulder-width with toes angled 15-30 degrees out.',
      'Take a deep diaphragmatic breath, brace core 360 degrees, and unlock hips and knees simultaneously.',
      'Descend until crease of hip drops below the top of the patella (parallel depth).',
      'Drive straight upward through midfoot, maintaining upright chest angle to starting stance.'
    ],
    breathingGuidance: 'Take huge breath into belly and brace before descent; hold breath through bottom turn; exhale past sticking point.',
    commonMistakes: [
      'Knees caving inward (valgus collapse) on ascent.',
      'Excessive forward torso pitch turning the squat into a "good morning".'
    ],
    safetyNotes: 'Always set rack safety catches at hip height. Keep weight centered over midfoot.',
    easierVariation: 'Dumbbell Goblet Squat',
    progressionVariation: 'Paused Squat (3-second pause at parallel)',
    published: true
  },
  {
    id: 'ex-007',
    name: 'Dumbbell Goblet Squat',
    description: 'Beginner-friendly squat pattern using anterior counterbalance to teach pristine upright spinal posture and deep hip mobility.',
    difficulty: 'beginner',
    equipment: 'dumbbell',
    primaryMuscles: ['muscle-quads'],
    secondaryMuscles: ['muscle-glutes', 'muscle-core'],
    recommendedSets: '3 sets',
    recommendedReps: '10-15 reps',
    instructions: [
      'Hold a single dumbbell vertically against chest with palms cupping the top plate ("goblet" hold).',
      'Position feet slightly wider than shoulders, toes flared comfortably outward.',
      'Sit down and back between thighs, letting elbows glide inside inner knees at full depth.',
      'Pause briefly in deep squat position, keeping heels pinned to the floor.',
      'Drive through midfoot and heels to stand erect, squeezing glutes at top.'
    ],
    breathingGuidance: 'Inhale on descent; exhale forcefully on ascent.',
    commonMistakes: [
      'Holding the dumbbell away from chest, fatiguing the arms instead of loading the legs.'
    ],
    safetyNotes: 'Excellent joint-friendly alternative for individuals with lumbar spine sensitivity.',
    easierVariation: 'Bodyweight Box Squat',
    progressionVariation: 'Barbell Front Squat',
    published: true
  },
  {
    id: 'ex-008',
    name: 'Romanian Deadlift (RDL)',
    description: 'Premier hinge exercise isolating hamstrings and glutes through an eccentric stretch with zero spinal flexion.',
    difficulty: 'intermediate',
    equipment: 'barbell',
    primaryMuscles: ['muscle-hamstrings', 'muscle-glutes'],
    secondaryMuscles: ['muscle-core', 'muscle-traps'],
    recommendedSets: '3 sets',
    recommendedReps: '8-12 reps',
    instructions: [
      'Hold barbell at hip height with overhand shoulder-width grip and soft knee bend.',
      'Initiate movement by pushing hips straight back toward the wall behind you, hinging at pelvis.',
      'Trace barbell down front of thighs and shins, keeping it in continuous light contact with legs.',
      'Descend until intense stretch is felt across hamstrings (usually mid-shin level).',
      'Drive hips forward and squeeze glutes to return to standing position.'
    ],
    breathingGuidance: 'Inhale and brace core at the top; descend holding brace; exhale upon hip lock.',
    commonMistakes: [
      'Squatting down and bending knees excessively, turning hinge into a squat.',
      'Letting the bar drift forward away from shins, torqueing the lumbar spine.'
    ],
    safetyNotes: 'Never round the lower back; range of motion is determined by hamstring flexibility, not touching the floor.',
    easierVariation: 'Dumbbell Romanian Deadlift',
    progressionVariation: 'Single-Leg Dumbbell RDL',
    published: true
  },
  {
    id: 'ex-009',
    name: 'Barbell Hip Thrust',
    description: 'Biomechanically optimal horizontal hip extension exercise producing maximum gluteal EMG activation at peak contraction.',
    difficulty: 'intermediate',
    equipment: 'barbell',
    primaryMuscles: ['muscle-glutes'],
    secondaryMuscles: ['muscle-hamstrings', 'muscle-core'],
    recommendedSets: '3-4 sets',
    recommendedReps: '10-12 reps',
    instructions: [
      'Sit on floor with upper back against a sturdy bench and padded barbell rolled over hips.',
      'Plant feet flat on floor roughly shoulder-width apart with shins vertical at top of lift.',
      'Drive through heels, extending hips upward until thighs and torso form a straight horizontal line.',
      'Maintain chin tucked toward chest and ribs locked down to prevent lumbar hyperextension.',
      'Hold top contraction for 1 full second, then lower hips with control.'
    ],
    breathingGuidance: 'Inhale at bottom; exhale aggressively as hips reach full extension.',
    commonMistakes: [
      'Arching lower back rather than posterior tilting the pelvis at the top.',
      'Placing feet too far forward (shifts load to hamstrings) or too close (shifts load to quads).'
    ],
    safetyNotes: 'Always use a thick barbell foam pad or folded mat across hip bones.',
    easierVariation: 'Bodyweight Glute Bridge',
    progressionVariation: 'Single-Leg Hip Thrust',
    published: true
  },

  // --- SHOULDERS & ARMS ---
  {
    id: 'ex-010',
    name: 'Overhead Barbell Shoulder Press (OHP)',
    description: 'Pure vertical pressing compound movement establishing overhead stability, anterior deltoid strength, and core anti-extension.',
    difficulty: 'intermediate',
    equipment: 'barbell',
    primaryMuscles: ['muscle-shoulders'],
    secondaryMuscles: ['muscle-triceps', 'muscle-traps', 'muscle-core'],
    recommendedSets: '3-4 sets',
    recommendedReps: '6-10 reps',
    instructions: [
      'Rack bar at collarbone height. Grip bar just outside shoulders with vertical forearms.',
      'Unrack, squeeze glutes and quads tight, pull chin slightly back, and press bar vertically.',
      'Once bar clears forehead, push head forward into "window" under the bar to lock out over scapulae.',
      'Lower bar in controlled path back down to clavicles.'
    ],
    breathingGuidance: 'Inhale and brace core before pressing; exhale near full overhead lockout.',
    commonMistakes: [
      'Leaning back excessively, turning lift into an incline bench press.',
      'Pressing bar in a wide looping forward arc.'
    ],
    safetyNotes: 'Keep glutes clenched hard throughout the lift to anchor the lumbar spine.',
    easierVariation: 'Seated Dumbbell Shoulder Press',
    progressionVariation: 'Z-Press (seated flat on floor without back support)',
    published: true
  },
  {
    id: 'ex-011',
    name: 'Dumbbell Lateral Raise',
    description: 'Isolation movement targeting the lateral (side) deltoid to develop shoulder width and an aesthetic V-taper physique.',
    difficulty: 'beginner',
    equipment: 'dumbbell',
    primaryMuscles: ['muscle-shoulders'],
    secondaryMuscles: ['muscle-traps'],
    recommendedSets: '3-4 sets',
    recommendedReps: '12-15 reps',
    instructions: [
      'Stand holding dumbbells at sides with slight forward torso lean (10-15 degrees).',
      'Keep slight unlock at elbows; raise weights outward in scapular plane (30 degrees forward of direct side).',
      'Lead with elbows until dumbbells reach shoulder height.',
      'Lower under strict control over 2 seconds; do not swing weights.'
    ],
    breathingGuidance: 'Exhale while raising dumbbells; inhale on smooth descent.',
    commonMistakes: [
      'Shrugging traps to heave heavy dumbbells up.',
      'Rotating wrists so thumbs point up, shifting load to anterior delts.'
    ],
    safetyNotes: 'Light to moderate weights with pristine tempo yield far superior hypertrophy than heavy swinging.',
    easierVariation: 'Resistance Band Lateral Raise',
    progressionVariation: 'Cable Lateral Raise (provides uniform resistance curve)',
    published: true
  },
  {
    id: 'ex-012',
    name: 'Incline Dumbbell Biceps Curl',
    description: 'Places the long head of the biceps brachii under maximum passive stretch across the shoulder joint prior to contraction.',
    difficulty: 'intermediate',
    equipment: 'dumbbell',
    primaryMuscles: ['muscle-biceps'],
    secondaryMuscles: ['muscle-core'],
    recommendedSets: '3 sets',
    recommendedReps: '10-12 reps',
    instructions: [
      'Adjust bench to 45-60 degrees. Sit back with head and shoulders flat against pad.',
      'Hold dumbbells with arms hanging straight down perpendicular to the floor.',
      'Curl dumbbells upward while supinating wrists (turning pinky fingers toward shoulders).',
      'Squeeze biceps at the top without allowing elbows to drift forward.',
      'Lower weights slowly through full stretch over 3 seconds.'
    ],
    breathingGuidance: 'Exhale on curl; inhale on slow stretch.',
    commonMistakes: [
      'Swinging torso or lifting shoulders off the bench to assist the curl.'
    ],
    safetyNotes: 'Do not hyperextend elbows violently at bottom; control the stretch.',
    easierVariation: 'Standing Dumbbell Curl',
    progressionVariation: 'Spider Curl (chest-supported on incline bench)',
    published: true
  },
  {
    id: 'ex-013',
    name: 'Triceps Cable Rope Pushdown',
    description: 'Continuous tension triceps isolation movement targeting the lateral and long heads with peak lockout spread.',
    difficulty: 'beginner',
    equipment: 'cable',
    primaryMuscles: ['muscle-triceps'],
    secondaryMuscles: [],
    recommendedSets: '3-4 sets',
    recommendedReps: '12-15 reps',
    instructions: [
      'Attach rope to high pulley. Grip rope ends with palms facing each other.',
      'Tuck elbows close to ribs and lean forward slightly from hips.',
      'Push hands downward by extending elbows, spreading rope apart at bottom lockout.',
      'Hold contraction for 1 second, then control rope return to 90 degrees at elbows.'
    ],
    breathingGuidance: 'Exhale during downward push; inhale on return.',
    commonMistakes: [
      'Allowing elbows to swing forward and back, recruiting lats instead of triceps.'
    ],
    safetyNotes: 'Keep wrists firm and locked in line with forearms.',
    easierVariation: 'Resistance Band Pushdown',
    progressionVariation: 'Overhead Cable Triceps Extension',
    published: true
  },

  // --- CORE & CARDIO ---
  {
    id: 'ex-014',
    name: 'Hanging Leg / Knee Raise',
    description: 'Advanced anterior core and hip flexor movement demanding tremendous anti-extension and grip endurance.',
    difficulty: 'advanced',
    equipment: 'bodyweight',
    primaryMuscles: ['muscle-core'],
    secondaryMuscles: ['muscle-obliques'],
    recommendedSets: '3 sets',
    recommendedReps: '8-12 reps',
    instructions: [
      'Hang from pull-up bar with overhand grip and engaged scapulae.',
      'Initiate by posteriorly tilting pelvis, then curling knees or straight legs upward toward chest.',
      'Pause at top height, contracting rectus abdominis deeply.',
      'Lower legs under strict control without swinging or arching lower back.'
    ],
    breathingGuidance: 'Exhale sharply as knees rise; inhale on controlled descent.',
    commonMistakes: [
      'Swinging legs like a pendulum rather than curling the pelvis.'
    ],
    safetyNotes: 'If grip fails first, perform hanging knee raises in captain’s chair.',
    easierVariation: 'Lying Reverse Crunch',
    progressionVariation: 'Toes-To-Bar',
    published: true
  },
  {
    id: 'ex-015',
    name: 'Plank with Shoulder Taps',
    description: 'Anti-rotational core stability drill requiring intense abdominal engagement to prevent hip wobble.',
    difficulty: 'intermediate',
    equipment: 'bodyweight',
    primaryMuscles: ['muscle-core', 'muscle-obliques'],
    secondaryMuscles: ['muscle-shoulders'],
    recommendedSets: '3 sets',
    recommendedReps: '10 taps per side',
    instructions: [
      'Begin in high push-up plank position with feet slightly wider than hip width.',
      'Engage glutes and brace abdominals firmly.',
      'Lift right hand to tap left shoulder while keeping hips completely square to floor.',
      'Place right hand back down and repeat with left hand to right shoulder.'
    ],
    breathingGuidance: 'Breathe rhythmically while maintaining steady intra-abdominal tension.',
    commonMistakes: [
      'Rotating hips from side to side with every tap.'
    ],
    safetyNotes: 'Keep neck neutral and shoulders directly over wrists.',
    easierVariation: 'Standard Forearm Plank',
    progressionVariation: 'Plank with Alternating Arm and Leg Raise',
    published: true
  }
];

// Helper to filter exercises by muscle, equipment, difficulty
export function getExercisesForMuscle(
  muscleId: string, 
  involvement?: 'primary' | 'secondary' | 'all'
): ExerciseItem[] {
  return INITIAL_EXERCISES.filter(ex => {
    const isPrimary = ex.primaryMuscles.includes(muscleId);
    const isSecondary = ex.secondaryMuscles.includes(muscleId);

    if (involvement === 'primary') return isPrimary;
    if (involvement === 'secondary') return isSecondary;
    return isPrimary || isSecondary;
  });
}
