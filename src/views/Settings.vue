<template>
  <div class="pb-20 lg:pb-0">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold">Settings</h1>
      <p class="text-muted-foreground mt-1">Customize your GymFlow experience</p>
    </header>

    <div class="max-w-2xl space-y-6">
      <!-- Profile Settings -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-6 flex items-center gap-2">
          <User class="w-5 h-5" />
          Profile
        </h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-muted-foreground mb-2 block">Name</label>
            <input 
              v-model="localSettings.name"
              type="text"
              class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
            />
          </div>
          <div class="grid grid-cols-2 gap-4">
            <div>
              <label class="text-sm text-muted-foreground mb-2 block">Weight (kg)</label>
              <input 
                v-model.number="localSettings.weight"
                type="number"
                step="0.1"
                class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
              />
            </div>
            <div>
              <label class="text-sm text-muted-foreground mb-2 block">Goal</label>
              <select 
                v-model="localSettings.goal"
                class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
              >
                <option value="muscle_gain">Muscle Gain</option>
                <option value="fat_loss">Fat Loss</option>
                <option value="maintenance">Maintenance</option>
              </select>
            </div>
          </div>
          <div>
            <label class="text-sm text-muted-foreground mb-2 block">Diet Preference</label>
            <div class="flex gap-4">
              <button 
                @click="localSettings.dietPreference = 'veg'"
                :class="[
                  'flex-1 p-4 rounded-xl border-2 transition-all',
                  localSettings.dietPreference === 'veg' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                ]"
              >
                <Leaf class="w-6 h-6 mx-auto mb-2 text-primary" />
                <p class="text-sm font-medium">Vegetarian</p>
              </button>
              <button 
                @click="localSettings.dietPreference = 'non_veg'"
                :class="[
                  'flex-1 p-4 rounded-xl border-2 transition-all',
                  localSettings.dietPreference === 'non_veg' 
                    ? 'border-primary bg-primary/10' 
                    : 'border-border hover:border-primary/50'
                ]"
              >
                <Drumstick class="w-6 h-6 mx-auto mb-2 text-accent" />
                <p class="text-sm font-medium">Non-Vegetarian</p>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Calorie Goals -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-6 flex items-center gap-2">
          <Target class="w-5 h-5" />
          Daily Goals
        </h3>
        <div class="space-y-4">
          <div>
            <label class="text-sm text-muted-foreground mb-2 block">Daily Calorie Goal</label>
            <input 
              v-model.number="localSettings.calorieGoal"
              type="number"
              class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
            />
          </div>
          <div class="p-4 bg-secondary/50 rounded-xl">
            <p class="text-sm text-muted-foreground mb-2">Calculated Protein Goal</p>
            <p class="text-2xl font-bold text-primary">{{ calculatedProtein }}g / day</p>
            <p class="text-xs text-muted-foreground mt-1">Based on your weight and goal</p>
          </div>
        </div>
      </div>

      <!-- Optional Activities -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-6 flex items-center gap-2">
          <Activity class="w-5 h-5" />
          Optional Activities
        </h3>
        <p class="text-sm text-muted-foreground mb-4">Enable additional activities to add to your routine</p>
        <div class="space-y-3">
          <div 
            v-for="activity in activities" 
            :key="activity.id"
            class="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-primary/20 flex items-center justify-center">
                <component :is="activity.icon" class="w-5 h-5 text-primary" />
              </div>
              <div>
                <p class="font-medium">{{ activity.name }}</p>
                <p class="text-xs text-muted-foreground">{{ activity.description }}</p>
              </div>
            </div>
            <button 
              @click="toggleActivity(activity.id)"
              :class="[
                'w-12 h-7 rounded-full transition-all relative',
                localSettings.optionalActivities[activity.id] ? 'bg-primary' : 'bg-muted'
              ]"
            >
              <span 
                :class="[
                  'absolute top-1 w-5 h-5 rounded-full bg-white transition-all',
                  localSettings.optionalActivities[activity.id] ? 'left-6' : 'left-1'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Notifications (UI Only) -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-6 flex items-center gap-2">
          <Bell class="w-5 h-5" />
          Notifications
        </h3>
        <div class="space-y-3">
          <div 
            v-for="notification in notifications" 
            :key="notification.id"
            class="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
          >
            <div>
              <p class="font-medium">{{ notification.name }}</p>
              <p class="text-xs text-muted-foreground">{{ notification.description }}</p>
            </div>
            <button 
              @click="notification.enabled = !notification.enabled"
              :class="[
                'w-12 h-7 rounded-full transition-all relative',
                notification.enabled ? 'bg-primary' : 'bg-muted'
              ]"
            >
              <span 
                :class="[
                  'absolute top-1 w-5 h-5 rounded-full bg-white transition-all',
                  notification.enabled ? 'left-6' : 'left-1'
                ]"
              />
            </button>
          </div>
        </div>
      </div>

      <!-- Data Management -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-6 flex items-center gap-2">
          <Database class="w-5 h-5" />
          Data Management
        </h3>
        <div class="space-y-4">
          <button 
            @click="exportData"
            class="w-full px-4 py-3 bg-secondary rounded-xl text-left hover:bg-secondary/80 transition-colors flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <Download class="w-5 h-5" />
              <span>Export Data</span>
            </div>
            <ChevronRight class="w-5 h-5 text-muted-foreground" />
          </button>
          <button 
            @click="resetData"
            class="w-full px-4 py-3 bg-destructive/10 text-destructive rounded-xl text-left hover:bg-destructive/20 transition-colors flex items-center justify-between"
          >
            <div class="flex items-center gap-3">
              <Trash2 class="w-5 h-5" />
              <span>Reset All Data</span>
            </div>
            <ChevronRight class="w-5 h-5" />
          </button>
        </div>
      </div>

      <!-- Save Button -->
      <button 
        @click="saveSettings"
        class="w-full py-4 bg-primary text-primary-foreground rounded-2xl font-semibold hover:opacity-90 transition-opacity"
      >
        Save Changes
      </button>
    </div>
  </div>
</template>

<script>
import { 
  User, 
  Leaf, 
  Drumstick, 
  Target, 
  Activity, 
  Bell, 
  Database, 
  Download, 
  Trash2, 
  ChevronRight,
  Music,
  Heart,
  Footprints,
  Bike
} from 'lucide-vue-next'

export default {
  name: 'Settings',
  components: {
    User,
    Leaf,
    Drumstick,
    Target,
    Activity,
    Bell,
    Database,
    Download,
    Trash2,
    ChevronRight,
    Music,
    Heart,
    Footprints,
    Bike
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
      localSettings: {
        name: 'Alex',
        weight: 75,
        goal: 'muscle_gain',
        dietPreference: 'non_veg',
        calorieGoal: 2400,
        optionalActivities: {
          dance: false,
          zumba: false,
          yoga: true,
          running: true
        }
      },
      activities: [
        { id: 'dance', name: 'Dance', description: 'Fun cardio workouts', icon: 'Music' },
        { id: 'zumba', name: 'Zumba', description: 'Latin-inspired dance fitness', icon: 'Heart' },
        { id: 'yoga', name: 'Yoga', description: 'Flexibility and mindfulness', icon: 'Activity' },
        { id: 'running', name: 'Running', description: 'Outdoor cardio sessions', icon: 'Footprints' }
      ],
      notifications: [
        { id: 'workout', name: 'Workout Reminders', description: 'Daily reminder to complete your workout', enabled: true },
        { id: 'meals', name: 'Meal Logging', description: 'Reminder to log your meals', enabled: true },
        { id: 'hydration', name: 'Hydration', description: 'Drink water reminders', enabled: false },
        { id: 'progress', name: 'Weekly Progress', description: 'Weekly progress summary', enabled: true }
      ]
    }
  },
  computed: {
    calculatedProtein() {
      const multipliers = {
        muscle_gain: 2,
        fat_loss: 2.2,
        maintenance: 1.5
      }
      return Math.round(this.localSettings.weight * (multipliers[this.localSettings.goal] || 2))
    }
  },
  methods: {
    toggleActivity(activityId) {
      this.localSettings.optionalActivities[activityId] = !this.localSettings.optionalActivities[activityId]
    },
    saveSettings() {
      this.$emit('update-user-data', {
        name: this.localSettings.name,
        weight: this.localSettings.weight,
        goal: this.localSettings.goal,
        dietPreference: this.localSettings.dietPreference,
        todayCalories: {
          ...this.userData.todayCalories,
          goal: this.localSettings.calorieGoal
        },
        optionalActivities: { ...this.localSettings.optionalActivities }
      })
      alert('Settings saved successfully!')
    },
    exportData() {
      const dataStr = JSON.stringify(this.userData, null, 2)
      const dataBlob = new Blob([dataStr], { type: 'application/json' })
      const url = URL.createObjectURL(dataBlob)
      const link = document.createElement('a')
      link.href = url
      link.download = 'gymflow-data.json'
      link.click()
      URL.revokeObjectURL(url)
    },
    resetData() {
      if (confirm('Are you sure you want to reset all data? This cannot be undone.')) {
        localStorage.removeItem('gymflow-data')
        location.reload()
      }
    }
  },
  mounted() {
    this.localSettings = {
      name: this.userData.name || 'Alex',
      weight: this.userData.weight || 75,
      goal: this.userData.goal || 'muscle_gain',
      dietPreference: this.userData.dietPreference || 'non_veg',
      calorieGoal: this.userData.todayCalories?.goal || 2400,
      optionalActivities: { ...this.userData.optionalActivities }
    }
  }
}
</script>
