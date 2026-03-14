export const workoutPlan = {
  Monday: {
    name: 'Chest + Triceps',
    muscles: ['Chest', 'Triceps'],
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', muscle: 'Chest', rest: 90 },
      { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', muscle: 'Chest', rest: 60 },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', muscle: 'Chest', rest: 45 },
      { name: 'Dips', sets: 3, reps: '10-12', muscle: 'Triceps', rest: 60 },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', muscle: 'Triceps', rest: 45 },
      { name: 'Overhead Tricep Extension', sets: 3, reps: '12-15', muscle: 'Triceps', rest: 45 }
    ]
  },
  Tuesday: {
    name: 'Back + Biceps',
    muscles: ['Back', 'Biceps'],
    exercises: [
      { name: 'Deadlift', sets: 4, reps: '6-8', muscle: 'Back', rest: 120 },
      { name: 'Pull-ups', sets: 4, reps: '8-10', muscle: 'Back', rest: 90 },
      { name: 'Barbell Rows', sets: 4, reps: '8-10', muscle: 'Back', rest: 60 },
      { name: 'Lat Pulldowns', sets: 3, reps: '10-12', muscle: 'Back', rest: 60 },
      { name: 'Barbell Curls', sets: 3, reps: '10-12', muscle: 'Biceps', rest: 45 },
      { name: 'Hammer Curls', sets: 3, reps: '12-15', muscle: 'Biceps', rest: 45 }
    ]
  },
  Wednesday: {
    name: 'CrossFit',
    muscles: ['Full Body'],
    exercises: [
      { name: 'Burpees', sets: 4, reps: '15', muscle: 'Full Body', rest: 30 },
      { name: 'Box Jumps', sets: 4, reps: '12', muscle: 'Legs', rest: 30 },
      { name: 'Battle Ropes', sets: 4, reps: '30 sec', muscle: 'Arms', rest: 30 },
      { name: 'Kettlebell Swings', sets: 4, reps: '20', muscle: 'Full Body', rest: 30 },
      { name: 'Wall Balls', sets: 3, reps: '15', muscle: 'Full Body', rest: 30 },
      { name: 'Rowing Machine', sets: 3, reps: '500m', muscle: 'Cardio', rest: 60 }
    ]
  },
  Thursday: {
    name: 'Shoulders',
    muscles: ['Shoulders', 'Traps'],
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '8-10', muscle: 'Shoulders', rest: 90 },
      { name: 'Lateral Raises', sets: 4, reps: '12-15', muscle: 'Shoulders', rest: 45 },
      { name: 'Front Raises', sets: 3, reps: '12-15', muscle: 'Shoulders', rest: 45 },
      { name: 'Rear Delt Flyes', sets: 3, reps: '12-15', muscle: 'Shoulders', rest: 45 },
      { name: 'Face Pulls', sets: 3, reps: '15-20', muscle: 'Shoulders', rest: 45 },
      { name: 'Shrugs', sets: 4, reps: '12-15', muscle: 'Traps', rest: 45 }
    ]
  },
  Friday: {
    name: 'Legs',
    muscles: ['Quads', 'Hamstrings', 'Glutes', 'Calves'],
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', muscle: 'Quads', rest: 120 },
      { name: 'Romanian Deadlifts', sets: 4, reps: '10-12', muscle: 'Hamstrings', rest: 90 },
      { name: 'Leg Press', sets: 4, reps: '10-12', muscle: 'Quads', rest: 60 },
      { name: 'Leg Curls', sets: 3, reps: '12-15', muscle: 'Hamstrings', rest: 45 },
      { name: 'Leg Extensions', sets: 3, reps: '12-15', muscle: 'Quads', rest: 45 },
      { name: 'Calf Raises', sets: 4, reps: '15-20', muscle: 'Calves', rest: 45 }
    ]
  },
  Saturday: {
    name: 'CrossFit',
    muscles: ['Full Body'],
    exercises: [
      { name: 'Thrusters', sets: 4, reps: '12', muscle: 'Full Body', rest: 30 },
      { name: 'Sled Push', sets: 4, reps: '20m', muscle: 'Legs', rest: 45 },
      { name: 'Rope Climbs', sets: 3, reps: '3', muscle: 'Arms', rest: 60 },
      { name: 'Double Unders', sets: 4, reps: '50', muscle: 'Cardio', rest: 30 },
      { name: 'Clean and Jerk', sets: 4, reps: '8', muscle: 'Full Body', rest: 60 },
      { name: 'Assault Bike', sets: 3, reps: '30 sec', muscle: 'Cardio', rest: 30 }
    ]
  },
  Sunday: {
    name: 'Rest / Yoga',
    muscles: ['Recovery'],
    exercises: [
      { name: 'Sun Salutation', sets: 3, reps: '5 min', muscle: 'Full Body', rest: 0 },
      { name: 'Downward Dog', sets: 1, reps: '2 min', muscle: 'Stretch', rest: 0 },
      { name: 'Warrior Pose', sets: 2, reps: '1 min each', muscle: 'Legs', rest: 0 },
      { name: 'Child\'s Pose', sets: 1, reps: '3 min', muscle: 'Recovery', rest: 0 },
      { name: 'Foam Rolling', sets: 1, reps: '10 min', muscle: 'Recovery', rest: 0 },
      { name: 'Meditation', sets: 1, reps: '10 min', muscle: 'Mind', rest: 0 }
    ]
  }
}

export const muscleGroups = {
  Chest: {
    name: 'Chest',
    exercises: [
      { name: 'Bench Press', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Incline Dumbbell Press', sets: 4, reps: '10-12', rest: 60 },
      { name: 'Cable Flyes', sets: 3, reps: '12-15', rest: 45 },
      { name: 'Push-ups', sets: 3, reps: '15-20', rest: 45 },
      { name: 'Dumbbell Pullover', sets: 3, reps: '12-15', rest: 45 }
    ]
  },
  Back: {
    name: 'Back',
    exercises: [
      { name: 'Deadlift', sets: 4, reps: '6-8', rest: 120 },
      { name: 'Pull-ups', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Barbell Rows', sets: 4, reps: '8-10', rest: 60 },
      { name: 'Lat Pulldowns', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Seated Cable Rows', sets: 3, reps: '10-12', rest: 45 }
    ]
  },
  Shoulders: {
    name: 'Shoulders',
    exercises: [
      { name: 'Overhead Press', sets: 4, reps: '8-10', rest: 90 },
      { name: 'Lateral Raises', sets: 4, reps: '12-15', rest: 45 },
      { name: 'Front Raises', sets: 3, reps: '12-15', rest: 45 },
      { name: 'Rear Delt Flyes', sets: 3, reps: '12-15', rest: 45 },
      { name: 'Face Pulls', sets: 3, reps: '15-20', rest: 45 }
    ]
  },
  Legs: {
    name: 'Legs',
    exercises: [
      { name: 'Squats', sets: 4, reps: '8-10', rest: 120 },
      { name: 'Romanian Deadlifts', sets: 4, reps: '10-12', rest: 90 },
      { name: 'Leg Press', sets: 4, reps: '10-12', rest: 60 },
      { name: 'Lunges', sets: 3, reps: '12 each', rest: 45 },
      { name: 'Calf Raises', sets: 4, reps: '15-20', rest: 45 }
    ]
  },
  Biceps: {
    name: 'Biceps',
    exercises: [
      { name: 'Barbell Curls', sets: 4, reps: '10-12', rest: 45 },
      { name: 'Hammer Curls', sets: 3, reps: '12-15', rest: 45 },
      { name: 'Concentration Curls', sets: 3, reps: '12-15', rest: 45 },
      { name: 'Cable Curls', sets: 3, reps: '12-15', rest: 45 }
    ]
  },
  Triceps: {
    name: 'Triceps',
    exercises: [
      { name: 'Dips', sets: 3, reps: '10-12', rest: 60 },
      { name: 'Tricep Pushdowns', sets: 3, reps: '12-15', rest: 45 },
      { name: 'Overhead Extension', sets: 3, reps: '12-15', rest: 45 },
      { name: 'Skull Crushers', sets: 3, reps: '10-12', rest: 45 }
    ]
  },
  Core: {
    name: 'Core',
    exercises: [
      { name: 'Plank', sets: 3, reps: '60 sec', rest: 30 },
      { name: 'Crunches', sets: 3, reps: '20', rest: 30 },
      { name: 'Leg Raises', sets: 3, reps: '15', rest: 30 },
      { name: 'Russian Twists', sets: 3, reps: '20 each', rest: 30 },
      { name: 'Mountain Climbers', sets: 3, reps: '30 sec', rest: 30 }
    ]
  }
}

export const fatBurnWorkouts = [
  {
    name: 'HIIT Circuit',
    duration: '20 min',
    calories: 300,
    exercises: [
      { name: 'Burpees', duration: '30 sec', rest: '15 sec' },
      { name: 'Jump Squats', duration: '30 sec', rest: '15 sec' },
      { name: 'Mountain Climbers', duration: '30 sec', rest: '15 sec' },
      { name: 'High Knees', duration: '30 sec', rest: '15 sec' }
    ]
  },
  {
    name: 'Core Blast',
    duration: '15 min',
    calories: 150,
    exercises: [
      { name: 'Plank', duration: '45 sec', rest: '15 sec' },
      { name: 'Bicycle Crunches', duration: '30 sec', rest: '15 sec' },
      { name: 'Leg Raises', duration: '30 sec', rest: '15 sec' },
      { name: 'Dead Bug', duration: '30 sec', rest: '15 sec' }
    ]
  },
  {
    name: 'CrossFit Circuit',
    duration: '25 min',
    calories: 400,
    exercises: [
      { name: 'Thrusters', duration: '45 sec', rest: '15 sec' },
      { name: 'Box Jumps', duration: '45 sec', rest: '15 sec' },
      { name: 'Kettlebell Swings', duration: '45 sec', rest: '15 sec' },
      { name: 'Battle Ropes', duration: '45 sec', rest: '15 sec' }
    ]
  }
]
