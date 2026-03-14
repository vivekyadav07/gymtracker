<template>
  <div class="pb-20 lg:pb-0">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold">Progress Tracker</h1>
      <p class="text-muted-foreground mt-1">Monitor your fitness journey</p>
    </header>

    <!-- Quick Stats -->
    <div class="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
      <div class="bg-card rounded-2xl p-4 border border-border">
        <div class="flex items-center gap-2 text-muted-foreground mb-2">
          <Scale class="w-4 h-4" />
          <span class="text-xs font-medium">Weight</span>
        </div>
        <p class="text-2xl font-bold">{{ currentStats.weight }} kg</p>
        <p :class="['text-xs', weightChange < 0 ? 'text-primary' : 'text-accent']">
          {{ weightChange > 0 ? '+' : '' }}{{ weightChange }} kg this week
        </p>
      </div>

      <div class="bg-card rounded-2xl p-4 border border-border">
        <div class="flex items-center gap-2 text-muted-foreground mb-2">
          <Percent class="w-4 h-4" />
          <span class="text-xs font-medium">Body Fat</span>
        </div>
        <p class="text-2xl font-bold">{{ currentStats.bodyFat }}%</p>
        <p :class="['text-xs', bodyFatChange < 0 ? 'text-primary' : 'text-accent']">
          {{ bodyFatChange > 0 ? '+' : '' }}{{ bodyFatChange }}% this week
        </p>
      </div>

      <div class="bg-card rounded-2xl p-4 border border-border">
        <div class="flex items-center gap-2 text-muted-foreground mb-2">
          <Ruler class="w-4 h-4" />
          <span class="text-xs font-medium">Waist</span>
        </div>
        <p class="text-2xl font-bold">{{ currentStats.waist }} cm</p>
        <p :class="['text-xs', waistChange < 0 ? 'text-primary' : 'text-accent']">
          {{ waistChange > 0 ? '+' : '' }}{{ waistChange }} cm this week
        </p>
      </div>

      <div class="bg-card rounded-2xl p-4 border border-border">
        <div class="flex items-center gap-2 text-muted-foreground mb-2">
          <Dumbbell class="w-4 h-4" />
          <span class="text-xs font-medium">Muscle Mass</span>
        </div>
        <p class="text-2xl font-bold">{{ currentStats.muscleMass }} kg</p>
        <p :class="['text-xs', muscleMassChange > 0 ? 'text-primary' : 'text-accent']">
          {{ muscleMassChange > 0 ? '+' : '' }}{{ muscleMassChange }} kg this week
        </p>
      </div>
    </div>

    <!-- Log New Entry -->
    <div class="bg-card rounded-2xl p-6 border border-border mb-8">
      <h3 class="font-semibold mb-4">Log Today's Measurements</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div>
          <label class="text-sm text-muted-foreground mb-2 block">Weight (kg)</label>
          <input 
            v-model.number="newEntry.weight"
            type="number"
            step="0.1"
            class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label class="text-sm text-muted-foreground mb-2 block">Body Fat (%)</label>
          <input 
            v-model.number="newEntry.bodyFat"
            type="number"
            step="0.1"
            class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label class="text-sm text-muted-foreground mb-2 block">Waist (cm)</label>
          <input 
            v-model.number="newEntry.waist"
            type="number"
            step="0.5"
            class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
          />
        </div>
        <div>
          <label class="text-sm text-muted-foreground mb-2 block">Muscle Mass (kg)</label>
          <input 
            v-model.number="newEntry.muscleMass"
            type="number"
            step="0.1"
            class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
          />
        </div>
      </div>
      <button 
        @click="logEntry"
        class="mt-4 px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90"
      >
        Save Measurements
      </button>
    </div>

    <!-- Charts Grid -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      <!-- Weight Chart -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Weight Progress</h3>
        <div class="h-64">
          <LineChart :data="weightChartData" :color="'#22c55e'" />
        </div>
      </div>

      <!-- Body Fat Chart -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Body Fat Progress</h3>
        <div class="h-64">
          <LineChart :data="bodyFatChartData" :color="'#f97316'" />
        </div>
      </div>

      <!-- Workout Consistency -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Workout Consistency</h3>
        <div class="h-64">
          <CalorieChart :data="workoutConsistencyData" />
        </div>
      </div>

      <!-- Calories Burned -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Calories Burned</h3>
        <div class="h-64">
          <CalorieChart :data="caloriesBurnedData" />
        </div>
      </div>
    </div>

    <!-- Achievements -->
    <div class="bg-card rounded-2xl p-6 border border-border">
      <h3 class="font-semibold mb-4">Achievements</h3>
      <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div 
          v-for="achievement in achievements" 
          :key="achievement.name"
          :class="[
            'p-4 rounded-xl text-center',
            achievement.unlocked ? 'bg-primary/20' : 'bg-secondary/50 opacity-50'
          ]"
        >
          <div :class="[
            'w-12 h-12 rounded-full mx-auto mb-2 flex items-center justify-center',
            achievement.unlocked ? 'bg-primary' : 'bg-muted'
          ]">
            <component 
              :is="achievement.icon" 
              :class="['w-6 h-6', achievement.unlocked ? 'text-primary-foreground' : 'text-muted-foreground']" 
            />
          </div>
          <p class="font-medium text-sm">{{ achievement.name }}</p>
          <p class="text-xs text-muted-foreground">{{ achievement.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { Scale, Percent, Ruler, Dumbbell, Flame, Target, Trophy, Zap } from 'lucide-vue-next'
import LineChart from '../components/LineChart.vue'
import CalorieChart from '../components/CalorieChart.vue'

export default {
  name: 'Progress',
  components: {
    Scale,
    Percent,
    Ruler,
    Dumbbell,
    Flame,
    Target,
    Trophy,
    Zap,
    LineChart,
    CalorieChart
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
      newEntry: {
        weight: null,
        bodyFat: null,
        waist: null,
        muscleMass: null
      },
      achievements: [
        { name: '7-Day Streak', description: 'Workout 7 days in a row', icon: 'Flame', unlocked: true },
        { name: 'Weight Goal', description: 'Reach target weight', icon: 'Target', unlocked: false },
        { name: 'Muscle Builder', description: 'Gain 2kg muscle mass', icon: 'Dumbbell', unlocked: true },
        { name: 'Fat Burner', description: 'Lose 2% body fat', icon: 'Zap', unlocked: false }
      ]
    }
  },
  computed: {
    currentStats() {
      const stats = this.userData.bodyStats || {}
      return {
        weight: stats.weight?.[stats.weight.length - 1] || 75,
        bodyFat: stats.bodyFat?.[stats.bodyFat.length - 1] || 18,
        waist: stats.waist?.[stats.waist.length - 1] || 85,
        muscleMass: stats.muscleMass?.[stats.muscleMass.length - 1] || 62
      }
    },
    weightChange() {
      const w = this.userData.bodyStats?.weight || []
      return w.length >= 2 ? (w[w.length - 1] - w[w.length - 2]).toFixed(1) : 0
    },
    bodyFatChange() {
      const bf = this.userData.bodyStats?.bodyFat || []
      return bf.length >= 2 ? (bf[bf.length - 1] - bf[bf.length - 2]).toFixed(1) : 0
    },
    waistChange() {
      const ws = this.userData.bodyStats?.waist || []
      return ws.length >= 2 ? (ws[ws.length - 1] - ws[ws.length - 2]).toFixed(1) : 0
    },
    muscleMassChange() {
      const mm = this.userData.bodyStats?.muscleMass || []
      return mm.length >= 2 ? (mm[mm.length - 1] - mm[mm.length - 2]).toFixed(1) : 0
    },
    weightChartData() {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
        data: this.userData.bodyStats?.weight || [75, 74.5, 74.8, 74.2, 74, 73.8, 73.5]
      }
    },
    bodyFatChartData() {
      return {
        labels: ['Week 1', 'Week 2', 'Week 3', 'Week 4', 'Week 5', 'Week 6', 'Week 7'],
        data: this.userData.bodyStats?.bodyFat || [18, 17.8, 17.5, 17.3, 17.2, 17, 16.8]
      }
    },
    workoutConsistencyData() {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Workouts',
          data: (this.userData.weeklyWorkouts || [true, true, true, true, true, false, false]).map(w => w ? 1 : 0),
          backgroundColor: '#22c55e',
          borderRadius: 8
        }]
      }
    },
    caloriesBurnedData() {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [{
          label: 'Calories Burned',
          data: [450, 520, 380, 490, 550, 300, 200],
          backgroundColor: '#f97316',
          borderRadius: 8
        }]
      }
    }
  },
  methods: {
    logEntry() {
      const bodyStats = { ...this.userData.bodyStats }
      
      if (this.newEntry.weight) {
        bodyStats.weight = [...(bodyStats.weight || []), this.newEntry.weight]
      }
      if (this.newEntry.bodyFat) {
        bodyStats.bodyFat = [...(bodyStats.bodyFat || []), this.newEntry.bodyFat]
      }
      if (this.newEntry.waist) {
        bodyStats.waist = [...(bodyStats.waist || []), this.newEntry.waist]
      }
      if (this.newEntry.muscleMass) {
        bodyStats.muscleMass = [...(bodyStats.muscleMass || []), this.newEntry.muscleMass]
      }

      this.$emit('update-user-data', { bodyStats })
      
      this.newEntry = {
        weight: null,
        bodyFat: null,
        waist: null,
        muscleMass: null
      }

      alert('Measurements saved!')
    }
  },
  mounted() {
    this.newEntry.weight = this.currentStats.weight
    this.newEntry.bodyFat = this.currentStats.bodyFat
    this.newEntry.waist = this.currentStats.waist
    this.newEntry.muscleMass = this.currentStats.muscleMass
  }
}
</script>
