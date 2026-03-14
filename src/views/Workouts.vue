<template>
  <div class="pb-20 lg:pb-0">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold">Workout Planner</h1>
      <p class="text-muted-foreground mt-1">Your weekly training schedule</p>
    </header>

    <!-- Tabs -->
    <div class="flex gap-2 mb-6 overflow-x-auto pb-2">
      <button
        v-for="tab in tabs"
        :key="tab.id"
        @click="activeTab = tab.id"
        :class="[
          'px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all',
          activeTab === tab.id
            ? 'bg-primary text-primary-foreground'
            : 'bg-secondary text-muted-foreground hover:text-foreground'
        ]"
      >
        {{ tab.label }}
      </button>
    </div>

    <!-- Weekly Plan View -->
    <div v-if="activeTab === 'weekly'" class="space-y-4">
      <div
        v-for="(workout, day) in workoutPlan"
        :key="day"
        :class="[
          'bg-card rounded-2xl p-6 border border-border card-hover cursor-pointer',
          day === currentDay ? 'ring-2 ring-primary' : ''
        ]"
        @click="$router.push(`/workouts/${day.toLowerCase()}`)"
      >
        <div class="flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div
              :class="[
                'w-14 h-14 rounded-xl flex flex-col items-center justify-center',
                day === currentDay ? 'bg-primary text-primary-foreground' : 'bg-secondary'
              ]"
            >
              <span class="text-xs font-medium">{{ day.slice(0, 3).toUpperCase() }}</span>
              <span class="text-lg font-bold">{{ getDayNumber(day) }}</span>
            </div>
            <div>
              <h3 class="font-semibold text-lg">{{ workout.name }}</h3>
              <p class="text-sm text-muted-foreground">
                {{ workout.exercises.length }} exercises
                <span v-if="day === currentDay" class="text-primary ml-2">Today</span>
              </p>
            </div>
          </div>
          <div class="flex items-center gap-4">
            <div class="hidden md:flex gap-2">
              <span
                v-for="muscle in workout.muscles.slice(0, 3)"
                :key="muscle"
                class="px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground"
              >
                {{ muscle }}
              </span>
            </div>
            <ChevronRight class="w-5 h-5 text-muted-foreground" />
          </div>
        </div>
      </div>
    </div>

    <!-- Muscle Groups View -->
    <div v-if="activeTab === 'muscles'" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      <div
        v-for="(group, name) in muscleGroups"
        :key="name"
        class="bg-card rounded-2xl p-6 border border-border card-hover"
      >
        <div class="flex items-center gap-3 mb-4">
          <div class="w-12 h-12 rounded-xl bg-primary/20 flex items-center justify-center">
            <component :is="getMuscleIcon(name)" class="w-6 h-6 text-primary" />
          </div>
          <div>
            <h3 class="font-semibold">{{ name }}</h3>
            <p class="text-xs text-muted-foreground">{{ group.exercises.length }} exercises</p>
          </div>
        </div>
        <div class="space-y-2">
          <div
            v-for="(exercise, index) in group.exercises.slice(0, 3)"
            :key="index"
            class="flex items-center justify-between text-sm p-2 bg-secondary/50 rounded-lg"
          >
            <span>{{ exercise.name }}</span>
            <span class="text-muted-foreground">{{ exercise.sets }}x{{ exercise.reps }}</span>
          </div>
          <p v-if="group.exercises.length > 3" class="text-xs text-primary text-center pt-2">
            +{{ group.exercises.length - 3 }} more exercises
          </p>
        </div>
      </div>
    </div>

    <!-- Fat Burn View -->
    <div v-if="activeTab === 'fatburn'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div
          v-for="(workout, index) in fatBurnWorkouts"
          :key="index"
          class="bg-card rounded-2xl p-6 border border-border card-hover"
        >
          <div class="flex items-center justify-between mb-4">
            <h3 class="font-semibold">{{ workout.name }}</h3>
            <span class="px-3 py-1 bg-accent/20 text-accent rounded-full text-xs font-medium">
              {{ workout.calories }} cal
            </span>
          </div>
          <div class="flex items-center gap-4 mb-4">
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Clock class="w-4 h-4" />
              {{ workout.duration }}
            </div>
            <div class="flex items-center gap-2 text-sm text-muted-foreground">
              <Zap class="w-4 h-4" />
              High Intensity
            </div>
          </div>
          <div class="space-y-2">
            <div
              v-for="(exercise, i) in workout.exercises"
              :key="i"
              class="flex items-center justify-between text-sm p-3 bg-secondary/50 rounded-xl"
            >
              <span>{{ exercise.name }}</span>
              <span class="text-muted-foreground">{{ exercise.duration }}</span>
            </div>
          </div>
          <button
            class="w-full mt-4 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            Start Workout
          </button>
        </div>
      </div>

      <!-- Estimated Fat Burn -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Estimated Weekly Fat Burn</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div class="text-center p-4 bg-secondary/50 rounded-xl">
            <p class="text-3xl font-bold text-accent">2,100</p>
            <p class="text-sm text-muted-foreground">Calories/Week</p>
          </div>
          <div class="text-center p-4 bg-secondary/50 rounded-xl">
            <p class="text-3xl font-bold text-primary">0.6</p>
            <p class="text-sm text-muted-foreground">kg Fat/Week</p>
          </div>
          <div class="text-center p-4 bg-secondary/50 rounded-xl">
            <p class="text-3xl font-bold text-blue-500">5</p>
            <p class="text-sm text-muted-foreground">Workouts/Week</p>
          </div>
          <div class="text-center p-4 bg-secondary/50 rounded-xl">
            <p class="text-3xl font-bold text-foreground">120</p>
            <p class="text-sm text-muted-foreground">Minutes/Week</p>
          </div>
        </div>
      </div>
    </div>

    <!-- CrossFit View -->
    <div v-if="activeTab === 'crossfit'" class="space-y-6">
      <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div
          v-for="day in ['Wednesday', 'Saturday']"
          :key="day"
          class="bg-card rounded-2xl p-6 border border-border"
        >
          <div class="flex items-center justify-between mb-6">
            <div>
              <h3 class="text-xl font-semibold">{{ day }}</h3>
              <p class="text-muted-foreground text-sm">CrossFit Training</p>
            </div>
            <div class="w-12 h-12 rounded-xl bg-accent/20 flex items-center justify-center">
              <Zap class="w-6 h-6 text-accent" />
            </div>
          </div>
          <div class="space-y-3">
            <div
              v-for="(exercise, index) in workoutPlan[day].exercises"
              :key="index"
              class="flex items-center gap-4 p-4 bg-secondary/50 rounded-xl"
            >
              <div class="w-8 h-8 rounded-lg bg-accent/20 flex items-center justify-center text-accent font-bold text-sm">
                {{ index + 1 }}
              </div>
              <div class="flex-1">
                <p class="font-medium">{{ exercise.name }}</p>
                <p class="text-sm text-muted-foreground">{{ exercise.sets }} sets x {{ exercise.reps }}</p>
              </div>
              <span class="text-xs text-muted-foreground">{{ exercise.rest }}s rest</span>
            </div>
          </div>
          <button
            @click="$router.push(`/workouts/${day.toLowerCase()}`)"
            class="w-full mt-4 py-3 bg-accent text-accent-foreground rounded-xl font-medium hover:opacity-90 transition-opacity"
          >
            View Full Workout
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ChevronRight, Clock, Zap, Dumbbell, Target, Heart, Activity } from 'lucide-vue-next'
import { workoutPlan, muscleGroups, fatBurnWorkouts } from '../data/workouts'

export default {
  name: 'Workouts',
  components: {
    ChevronRight,
    Clock,
    Zap,
    Dumbbell,
    Target,
    Heart,
    Activity
  },
  data() {
    return {
      activeTab: 'weekly',
      tabs: [
        { id: 'weekly', label: 'Weekly Plan' },
        { id: 'muscles', label: 'By Muscle' },
        { id: 'fatburn', label: 'Fat Burn' },
        { id: 'crossfit', label: 'CrossFit' }
      ],
      workoutPlan,
      muscleGroups,
      fatBurnWorkouts
    }
  },
  computed: {
    currentDay() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      return days[new Date().getDay()]
    }
  },
  methods: {
    getDayNumber(day) {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const today = new Date()
      const currentDayIndex = today.getDay()
      const targetDayIndex = days.indexOf(day)
      const diff = targetDayIndex - currentDayIndex
      const date = new Date(today)
      date.setDate(today.getDate() + diff)
      return date.getDate()
    },
    getMuscleIcon(muscle) {
      const icons = {
        Chest: 'Target',
        Back: 'Dumbbell',
        Shoulders: 'Activity',
        Legs: 'Dumbbell',
        Biceps: 'Dumbbell',
        Triceps: 'Dumbbell',
        Core: 'Heart'
      }
      return icons[muscle] || 'Dumbbell'
    }
  }
}
</script>
