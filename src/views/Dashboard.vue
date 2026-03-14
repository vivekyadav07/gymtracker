<template>
  <div class="pb-20 lg:pb-0">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold text-balance">
        Welcome back, {{ userData.name }}
      </h1>
      <p class="text-muted-foreground mt-1">Track your fitness journey</p>
    </header>

    <!-- Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      <!-- Streak Card -->
      <div class="bg-card rounded-2xl p-6 border border-border card-hover">
        <div class="flex items-center justify-between mb-4">
          <div class="flex items-center gap-2 text-muted-foreground">
            <Flame class="w-5 h-5 text-accent" />
            <span class="text-sm font-medium">Gym Streak</span>
          </div>
        </div>
        <div class="flex items-end gap-4">
          <div class="streak-glow rounded-2xl bg-gradient-to-br from-accent/20 to-accent/5 p-4">
            <span class="text-4xl font-bold text-accent count-up">{{ userData.streak }}</span>
          </div>
          <div>
            <p class="text-sm text-muted-foreground">days</p>
            <p class="text-xs text-primary">Personal best: 21</p>
          </div>
        </div>
      </div>

      <!-- Weekly Consistency -->
      <div class="bg-card rounded-2xl p-6 border border-border card-hover">
        <div class="flex items-center gap-2 text-muted-foreground mb-4">
          <Target class="w-5 h-5 text-primary" />
          <span class="text-sm font-medium">Weekly Consistency</span>
        </div>
        <div class="flex items-center gap-4">
          <ProgressRing 
            :value="userData.weeklyConsistency" 
            :max="100" 
            :size="80" 
            :stroke-width="6"
            color="#22c55e"
          />
          <div class="flex gap-1">
            <div 
              v-for="(completed, index) in userData.weeklyWorkouts" 
              :key="index"
              :class="[
                'w-3 h-8 rounded-full',
                completed ? 'bg-primary' : 'bg-secondary'
              ]"
            />
          </div>
        </div>
      </div>

      <!-- Today's Calories -->
      <div class="bg-card rounded-2xl p-6 border border-border card-hover">
        <div class="flex items-center gap-2 text-muted-foreground mb-4">
          <Utensils class="w-5 h-5 text-blue-500" />
          <span class="text-sm font-medium">Today's Calories</span>
        </div>
        <div class="flex items-center gap-4">
          <ProgressRing 
            :value="userData.todayCalories.eaten" 
            :max="userData.todayCalories.goal" 
            :size="80" 
            :stroke-width="6"
            color="#3b82f6"
            :show-percentage="false"
          />
          <div class="text-sm">
            <p><span class="font-semibold text-foreground">{{ userData.todayCalories.eaten }}</span> eaten</p>
            <p class="text-muted-foreground">{{ remainingCalories }} remaining</p>
          </div>
        </div>
      </div>

      <!-- Protein Intake -->
      <div class="bg-card rounded-2xl p-6 border border-border card-hover">
        <div class="flex items-center gap-2 text-muted-foreground mb-4">
          <Beef class="w-5 h-5 text-red-500" />
          <span class="text-sm font-medium">Protein Intake</span>
        </div>
        <div class="flex items-center gap-4">
          <ProgressRing 
            :value="userData.proteinIntake" 
            :max="proteinGoal" 
            :size="80" 
            :stroke-width="6"
            color="#ef4444"
            :show-percentage="false"
          />
          <div class="text-sm">
            <p><span class="font-semibold text-foreground">{{ userData.proteinIntake }}g</span> consumed</p>
            <p class="text-muted-foreground">{{ proteinGoal }}g goal</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Main Content Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
      <!-- Today's Workout -->
      <div class="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h2 class="text-xl font-semibold">Today's Workout</h2>
            <p class="text-muted-foreground text-sm">{{ todayWorkout.name }}</p>
          </div>
          <router-link 
            :to="`/workouts/${currentDay.toLowerCase()}`"
            class="px-4 py-2 bg-primary text-primary-foreground rounded-xl text-sm font-medium hover:opacity-90 transition-opacity"
          >
            Start Workout
          </router-link>
        </div>

        <!-- Progress Bar -->
        <div class="mb-6">
          <div class="flex items-center justify-between mb-2">
            <span class="text-sm text-muted-foreground">Progress</span>
            <span class="text-sm font-medium">{{ completedCount }}/{{ todayWorkout.exercises.length }}</span>
          </div>
          <div class="h-2 bg-secondary rounded-full overflow-hidden">
            <div 
              class="h-full bg-primary rounded-full transition-all duration-500"
              :style="{ width: `${(completedCount / todayWorkout.exercises.length) * 100}%` }"
            />
          </div>
        </div>

        <!-- Exercise List Preview -->
        <div class="space-y-3">
          <div 
            v-for="(exercise, index) in todayWorkout.exercises.slice(0, 4)" 
            :key="index"
            :class="[
              'flex items-center gap-4 p-4 rounded-xl transition-all',
              isExerciseCompleted(exercise.name) ? 'bg-primary/10' : 'bg-secondary/50'
            ]"
          >
            <div 
              :class="[
                'w-10 h-10 rounded-xl flex items-center justify-center',
                isExerciseCompleted(exercise.name) ? 'bg-primary text-primary-foreground' : 'bg-muted'
              ]"
            >
              <Check v-if="isExerciseCompleted(exercise.name)" class="w-5 h-5" />
              <span v-else class="text-sm font-medium">{{ index + 1 }}</span>
            </div>
            <div class="flex-1">
              <p class="font-medium">{{ exercise.name }}</p>
              <p class="text-sm text-muted-foreground">{{ exercise.sets }} sets x {{ exercise.reps }} reps</p>
            </div>
            <div class="text-right text-sm text-muted-foreground">
              {{ exercise.muscle }}
            </div>
          </div>
        </div>

        <router-link 
          v-if="todayWorkout.exercises.length > 4"
          :to="`/workouts/${currentDay.toLowerCase()}`"
          class="block text-center text-primary text-sm font-medium mt-4 hover:underline"
        >
          View all {{ todayWorkout.exercises.length }} exercises
        </router-link>
      </div>

      <!-- Quick Stats Sidebar -->
      <div class="space-y-6">
        <!-- Apple Fitness Style Rings -->
        <div class="bg-card rounded-2xl p-6 border border-border">
          <h3 class="font-semibold mb-4">Activity Rings</h3>
          <div class="flex justify-center">
            <div class="relative">
              <ProgressRing 
                :value="userData.todayCalories.burned" 
                :max="500" 
                :size="160" 
                :stroke-width="12"
                color="#ef4444"
                label="Move"
              />
              <div class="absolute inset-0 flex items-center justify-center">
                <ProgressRing 
                  :value="45" 
                  :max="60" 
                  :size="120" 
                  :stroke-width="12"
                  color="#22c55e"
                  label=""
                />
              </div>
              <div class="absolute inset-0 flex items-center justify-center">
                <ProgressRing 
                  :value="8" 
                  :max="12" 
                  :size="80" 
                  :stroke-width="12"
                  color="#3b82f6"
                  label=""
                />
              </div>
            </div>
          </div>
          <div class="grid grid-cols-3 gap-2 mt-4">
            <div class="text-center">
              <div class="w-3 h-3 rounded-full bg-red-500 mx-auto mb-1" />
              <p class="text-xs text-muted-foreground">Move</p>
              <p class="text-sm font-medium">{{ userData.todayCalories.burned }} cal</p>
            </div>
            <div class="text-center">
              <div class="w-3 h-3 rounded-full bg-primary mx-auto mb-1" />
              <p class="text-xs text-muted-foreground">Exercise</p>
              <p class="text-sm font-medium">45 min</p>
            </div>
            <div class="text-center">
              <div class="w-3 h-3 rounded-full bg-blue-500 mx-auto mb-1" />
              <p class="text-xs text-muted-foreground">Stand</p>
              <p class="text-sm font-medium">8 hrs</p>
            </div>
          </div>
        </div>

        <!-- Quick Actions -->
        <div class="bg-card rounded-2xl p-6 border border-border">
          <h3 class="font-semibold mb-4">Quick Actions</h3>
          <div class="space-y-3">
            <router-link 
              to="/nutrition"
              class="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div class="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <Plus class="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p class="font-medium text-sm">Log Meal</p>
                <p class="text-xs text-muted-foreground">Track your calories</p>
              </div>
            </router-link>
            <router-link 
              to="/progress"
              class="flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary transition-colors"
            >
              <div class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <Scale class="w-5 h-5 text-primary" />
              </div>
              <div>
                <p class="font-medium text-sm">Log Weight</p>
                <p class="text-xs text-muted-foreground">Update body stats</p>
              </div>
            </router-link>
          </div>
        </div>

        <!-- Weekly Workout Schedule -->
        <div class="bg-card rounded-2xl p-6 border border-border">
          <h3 class="font-semibold mb-4">This Week</h3>
          <div class="space-y-2">
            <div 
              v-for="(day, index) in weekSchedule" 
              :key="index"
              :class="[
                'flex items-center justify-between p-3 rounded-xl text-sm',
                day.name === currentDay ? 'bg-primary/10 border border-primary/30' : 'bg-secondary/30'
              ]"
            >
              <div class="flex items-center gap-3">
                <span :class="['font-medium w-10', day.name === currentDay ? 'text-primary' : '']">
                  {{ day.name.slice(0, 3) }}
                </span>
                <span class="text-muted-foreground">{{ day.workout }}</span>
              </div>
              <Check v-if="day.completed" class="w-4 h-4 text-primary" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  Flame, 
  Target, 
  Utensils, 
  Beef, 
  Check, 
  Plus, 
  Scale 
} from 'lucide-vue-next'
import ProgressRing from '../components/ProgressRing.vue'
import { workoutPlan } from '../data/workouts'

export default {
  name: 'Dashboard',
  components: {
    Flame,
    Target,
    Utensils,
    Beef,
    Check,
    Plus,
    Scale,
    ProgressRing
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  computed: {
    currentDay() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return days[new Date().getDay()]
    },
    todayWorkout() {
      return workoutPlan[this.currentDay] || workoutPlan['Monday']
    },
    remainingCalories() {
      return Math.max(0, this.userData.todayCalories.goal - this.userData.todayCalories.eaten + this.userData.todayCalories.burned)
    },
    proteinGoal() {
      const multipliers = {
        muscle_gain: 2,
        fat_loss: 2.2,
        maintenance: 1.5
      }
      return Math.round(this.userData.weight * (multipliers[this.userData.goal] || 2))
    },
    completedCount() {
      return this.todayWorkout.exercises.filter(ex => 
        this.userData.completedExercises.includes(ex.name)
      ).length
    },
    weekSchedule() {
      const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']
      return days.map((day, index) => ({
        name: day,
        workout: workoutPlan[day]?.name || 'Rest',
        completed: this.userData.weeklyWorkouts[index] || false
      }))
    }
  },
  methods: {
    isExerciseCompleted(exerciseName) {
      return this.userData.completedExercises.includes(exerciseName)
    }
  }
}
</script>
