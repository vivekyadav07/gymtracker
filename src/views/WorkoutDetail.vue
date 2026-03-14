<template>
  <div class="pb-20 lg:pb-0">
    <!-- Header -->
    <header class="mb-8">
      <button @click="$router.back()" class="flex items-center gap-2 text-muted-foreground mb-4 hover:text-foreground transition-colors">
        <ArrowLeft class="w-5 h-5" />
        <span>Back to Workouts</span>
      </button>
      <div class="flex items-start justify-between">
        <div>
          <h1 class="text-2xl lg:text-3xl font-bold">{{ workout?.name || 'Workout' }}</h1>
          <p class="text-muted-foreground mt-1">{{ capitalizedDay }}</p>
        </div>
        <div class="flex items-center gap-2">
          <span 
            v-for="muscle in workout?.muscles || []" 
            :key="muscle"
            class="px-3 py-1 bg-primary/20 text-primary rounded-full text-sm"
          >
            {{ muscle }}
          </span>
        </div>
      </div>
    </header>

    <!-- Progress & Timer -->
    <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
      <div class="lg:col-span-2 bg-card rounded-2xl p-6 border border-border">
        <div class="flex items-center justify-between mb-4">
          <h3 class="font-semibold">Progress</h3>
          <span class="text-sm text-muted-foreground">
            {{ completedCount }}/{{ workout?.exercises?.length || 0 }} completed
          </span>
        </div>
        <div class="h-3 bg-secondary rounded-full overflow-hidden">
          <div 
            class="h-full bg-primary rounded-full transition-all duration-500"
            :style="{ width: `${progressPercentage}%` }"
          />
        </div>
      </div>

      <!-- Rest Timer -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Rest Timer</h3>
        <div class="flex items-center justify-center gap-4">
          <button 
            @click="setTimer(30)"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              timerSeconds === 30 ? 'bg-primary text-primary-foreground' : 'bg-secondary'
            ]"
          >
            30s
          </button>
          <button 
            @click="setTimer(60)"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              timerSeconds === 60 ? 'bg-primary text-primary-foreground' : 'bg-secondary'
            ]"
          >
            60s
          </button>
          <button 
            @click="setTimer(90)"
            :class="[
              'px-4 py-2 rounded-xl text-sm font-medium transition-all',
              timerSeconds === 90 ? 'bg-primary text-primary-foreground' : 'bg-secondary'
            ]"
          >
            90s
          </button>
        </div>
        <div class="text-center mt-4">
          <p class="text-4xl font-bold" :class="{ 'text-accent': isTimerRunning && currentTimer <= 5 }">
            {{ formatTime(currentTimer) }}
          </p>
          <div class="flex items-center justify-center gap-2 mt-3">
            <button 
              v-if="!isTimerRunning"
              @click="startTimer"
              class="p-2 rounded-xl bg-primary text-primary-foreground hover:opacity-90"
            >
              <Play class="w-5 h-5" />
            </button>
            <button 
              v-else
              @click="pauseTimer"
              class="p-2 rounded-xl bg-secondary hover:bg-secondary/80"
            >
              <Pause class="w-5 h-5" />
            </button>
            <button 
              @click="resetTimer"
              class="p-2 rounded-xl bg-secondary hover:bg-secondary/80"
            >
              <RotateCcw class="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Exercise List -->
    <div class="bg-card rounded-2xl p-6 border border-border">
      <h3 class="font-semibold mb-6">Exercises</h3>
      <div class="space-y-4">
        <div 
          v-for="(exercise, index) in workout?.exercises || []" 
          :key="index"
          :class="[
            'flex items-center gap-4 p-4 rounded-xl transition-all cursor-pointer',
            isCompleted(exercise.name) 
              ? 'bg-primary/10 border border-primary/30' 
              : 'bg-secondary/50 hover:bg-secondary'
          ]"
          @click="toggleExercise(exercise.name)"
        >
          <div 
            :class="[
              'w-12 h-12 rounded-xl flex items-center justify-center transition-all',
              isCompleted(exercise.name) 
                ? 'bg-primary text-primary-foreground' 
                : 'bg-muted'
            ]"
          >
            <Check v-if="isCompleted(exercise.name)" class="w-6 h-6" />
            <span v-else class="text-lg font-bold">{{ index + 1 }}</span>
          </div>
          
          <div class="flex-1">
            <p :class="['font-medium text-lg', isCompleted(exercise.name) ? 'line-through opacity-70' : '']">
              {{ exercise.name }}
            </p>
            <div class="flex items-center gap-4 mt-1">
              <span class="text-sm text-muted-foreground">
                {{ exercise.sets }} sets x {{ exercise.reps }} reps
              </span>
              <span class="text-sm text-muted-foreground flex items-center gap-1">
                <Clock class="w-3 h-3" />
                {{ exercise.rest }}s rest
              </span>
            </div>
          </div>

          <div class="flex items-center gap-2">
            <span class="px-3 py-1 bg-secondary rounded-full text-xs text-muted-foreground">
              {{ exercise.muscle }}
            </span>
            <button 
              @click.stop="setTimer(exercise.rest)"
              class="p-2 rounded-lg bg-accent/20 text-accent hover:bg-accent/30 transition-colors"
              title="Start rest timer"
            >
              <Timer class="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Finish Workout Button -->
    <div class="mt-6 flex justify-center">
      <button 
        v-if="completedCount === workout?.exercises?.length"
        @click="finishWorkout"
        class="px-8 py-4 bg-primary text-primary-foreground rounded-2xl font-semibold text-lg hover:opacity-90 transition-all flex items-center gap-2"
      >
        <Trophy class="w-6 h-6" />
        Complete Workout
      </button>
    </div>
  </div>
</template>

<script>
import { ArrowLeft, Check, Clock, Play, Pause, RotateCcw, Timer, Trophy } from 'lucide-vue-next'
import { workoutPlan } from '../data/workouts'

export default {
  name: 'WorkoutDetail',
  components: {
    ArrowLeft,
    Check,
    Clock,
    Play,
    Pause,
    RotateCcw,
    Timer,
    Trophy
  },
  props: {
    userData: {
      type: Object,
      required: true
    }
  },
  emits: ['update-user-data'],
  data() {
    return {
      timerSeconds: 60,
      currentTimer: 60,
      isTimerRunning: false,
      timerInterval: null,
      completedExercises: []
    }
  },
  computed: {
    day() {
      return this.$route.params.day
    },
    capitalizedDay() {
      return this.day ? this.day.charAt(0).toUpperCase() + this.day.slice(1) : ''
    },
    workout() {
      return workoutPlan[this.capitalizedDay]
    },
    completedCount() {
      return this.workout?.exercises?.filter(ex => 
        this.completedExercises.includes(ex.name)
      ).length || 0
    },
    progressPercentage() {
      if (!this.workout?.exercises?.length) return 0
      return (this.completedCount / this.workout.exercises.length) * 100
    }
  },
  methods: {
    isCompleted(exerciseName) {
      return this.completedExercises.includes(exerciseName)
    },
    toggleExercise(exerciseName) {
      if (this.isCompleted(exerciseName)) {
        this.completedExercises = this.completedExercises.filter(e => e !== exerciseName)
      } else {
        this.completedExercises.push(exerciseName)
      }
      this.$emit('update-user-data', { completedExercises: this.completedExercises })
    },
    setTimer(seconds) {
      this.timerSeconds = seconds
      this.currentTimer = seconds
      this.pauseTimer()
    },
    startTimer() {
      this.isTimerRunning = true
      this.timerInterval = setInterval(() => {
        if (this.currentTimer > 0) {
          this.currentTimer--
        } else {
          this.pauseTimer()
          this.playAlert()
        }
      }, 1000)
    },
    pauseTimer() {
      this.isTimerRunning = false
      if (this.timerInterval) {
        clearInterval(this.timerInterval)
      }
    },
    resetTimer() {
      this.pauseTimer()
      this.currentTimer = this.timerSeconds
    },
    formatTime(seconds) {
      const mins = Math.floor(seconds / 60)
      const secs = seconds % 60
      return `${mins}:${secs.toString().padStart(2, '0')}`
    },
    playAlert() {
      // Simple beep using Web Audio API
      try {
        const audioContext = new (window.AudioContext || window.webkitAudioContext)()
        const oscillator = audioContext.createOscillator()
        const gainNode = audioContext.createGain()
        oscillator.connect(gainNode)
        gainNode.connect(audioContext.destination)
        oscillator.frequency.value = 800
        oscillator.type = 'sine'
        gainNode.gain.value = 0.3
        oscillator.start()
        setTimeout(() => oscillator.stop(), 200)
      } catch (e) {
        // Audio not supported
      }
    },
    finishWorkout() {
      const newStreak = this.userData.streak + 1
      this.$emit('update-user-data', { 
        streak: newStreak,
        completedExercises: []
      })
      alert('Congratulations! Workout completed! Your streak is now ' + newStreak + ' days!')
      this.$router.push('/')
    }
  },
  mounted() {
    this.completedExercises = [...(this.userData.completedExercises || [])]
  },
  beforeUnmount() {
    if (this.timerInterval) {
      clearInterval(this.timerInterval)
    }
  }
}
</script>
