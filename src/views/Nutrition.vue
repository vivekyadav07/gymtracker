<template>
  <div class="pb-20 lg:pb-0">
    <!-- Header -->
    <header class="mb-8">
      <h1 class="text-2xl lg:text-3xl font-bold">Nutrition Tracker</h1>
      <p class="text-muted-foreground mt-1">Track your calories, protein, and diet</p>
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

    <!-- Calorie Tracking -->
    <div v-if="activeTab === 'calories'" class="space-y-6">
      <!-- Today's Summary -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-card rounded-2xl p-6 border border-border">
          <div class="flex items-center gap-2 text-muted-foreground mb-4">
            <UtensilsCrossed class="w-5 h-5 text-blue-500" />
            <span class="text-sm font-medium">Calories Eaten</span>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-4xl font-bold">{{ localCalories.eaten }}</span>
            <span class="text-muted-foreground mb-1">/ {{ localCalories.goal }}</span>
          </div>
          <div class="h-2 bg-secondary rounded-full mt-4 overflow-hidden">
            <div 
              class="h-full bg-blue-500 rounded-full transition-all"
              :style="{ width: `${Math.min((localCalories.eaten / localCalories.goal) * 100, 100)}%` }"
            />
          </div>
        </div>

        <div class="bg-card rounded-2xl p-6 border border-border">
          <div class="flex items-center gap-2 text-muted-foreground mb-4">
            <Flame class="w-5 h-5 text-accent" />
            <span class="text-sm font-medium">Calories Burned</span>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-4xl font-bold text-accent">{{ localCalories.burned }}</span>
            <span class="text-muted-foreground mb-1">cal</span>
          </div>
          <p class="text-sm text-muted-foreground mt-4">From today's activities</p>
        </div>

        <div class="bg-card rounded-2xl p-6 border border-border">
          <div class="flex items-center gap-2 text-muted-foreground mb-4">
            <Target class="w-5 h-5 text-primary" />
            <span class="text-sm font-medium">Remaining</span>
          </div>
          <div class="flex items-end gap-2">
            <span class="text-4xl font-bold text-primary">{{ remainingCalories }}</span>
            <span class="text-muted-foreground mb-1">cal</span>
          </div>
          <p class="text-sm text-muted-foreground mt-4">Net calories left today</p>
        </div>
      </div>

      <!-- Add Meal -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Log Meal</h3>
        <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div class="md:col-span-2">
            <label class="text-sm text-muted-foreground mb-2 block">Food Item</label>
            <input 
              v-model="newMeal.name"
              type="text"
              placeholder="e.g., Grilled Chicken"
              class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label class="text-sm text-muted-foreground mb-2 block">Calories</label>
            <input 
              v-model.number="newMeal.calories"
              type="number"
              placeholder="250"
              class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
            />
          </div>
          <div class="flex items-end">
            <button 
              @click="addMeal"
              class="w-full px-6 py-3 bg-primary text-primary-foreground rounded-xl font-medium hover:opacity-90"
            >
              Add Meal
            </button>
          </div>
        </div>
      </div>

      <!-- Calorie Chart -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Weekly Calorie Intake</h3>
        <div class="h-64">
          <CalorieChart :data="weeklyCalorieData" />
        </div>
      </div>

      <!-- Meal Log -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Today's Meals</h3>
        <div class="space-y-3">
          <div 
            v-for="(meal, index) in todaysMeals" 
            :key="index"
            class="flex items-center justify-between p-4 bg-secondary/50 rounded-xl"
          >
            <div class="flex items-center gap-3">
              <div class="w-10 h-10 rounded-xl bg-blue-500/20 flex items-center justify-center">
                <UtensilsCrossed class="w-5 h-5 text-blue-500" />
              </div>
              <div>
                <p class="font-medium">{{ meal.name }}</p>
                <p class="text-sm text-muted-foreground">{{ meal.time }}</p>
              </div>
            </div>
            <div class="text-right">
              <p class="font-semibold">{{ meal.calories }} cal</p>
              <p class="text-xs text-muted-foreground">{{ meal.protein }}g protein</p>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Protein Tracking -->
    <div v-if="activeTab === 'protein'" class="space-y-6">
      <!-- Protein Calculator -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Protein Requirement Calculator</h3>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div>
            <label class="text-sm text-muted-foreground mb-2 block">Body Weight (kg)</label>
            <input 
              v-model.number="proteinCalc.weight"
              type="number"
              class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
            />
          </div>
          <div>
            <label class="text-sm text-muted-foreground mb-2 block">Goal</label>
            <select 
              v-model="proteinCalc.goal"
              class="w-full px-4 py-3 bg-secondary rounded-xl border border-border focus:border-primary focus:outline-none"
            >
              <option value="muscle_gain">Muscle Gain</option>
              <option value="fat_loss">Fat Loss</option>
              <option value="maintenance">Maintenance</option>
            </select>
          </div>
          <div class="flex flex-col justify-end">
            <div class="text-center p-4 bg-primary/20 rounded-xl">
              <p class="text-sm text-muted-foreground">Daily Protein Target</p>
              <p class="text-3xl font-bold text-primary">{{ calculatedProtein }}g</p>
            </div>
          </div>
        </div>

        <div class="mt-6 p-4 bg-secondary/50 rounded-xl">
          <p class="text-sm text-muted-foreground">
            <strong>Formula:</strong><br />
            Muscle Gain: Weight x 2g<br />
            Fat Loss: Weight x 2.2g<br />
            Maintenance: Weight x 1.5g
          </p>
        </div>
      </div>

      <!-- Protein Progress -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <div class="flex items-center justify-between mb-6">
          <h3 class="font-semibold">Today's Protein Intake</h3>
          <span class="text-sm text-muted-foreground">{{ localProtein }}g / {{ calculatedProtein }}g</span>
        </div>
        <div class="flex items-center gap-6">
          <ProgressRing 
            :value="localProtein" 
            :max="calculatedProtein" 
            :size="140" 
            :stroke-width="12"
            color="#ef4444"
            :show-percentage="false"
          />
          <div class="flex-1">
            <div class="h-4 bg-secondary rounded-full overflow-hidden">
              <div 
                class="h-full bg-red-500 rounded-full transition-all"
                :style="{ width: `${Math.min((localProtein / calculatedProtein) * 100, 100)}%` }"
              />
            </div>
            <div class="flex justify-between mt-2 text-sm">
              <span class="text-muted-foreground">0g</span>
              <span class="text-muted-foreground">{{ calculatedProtein }}g</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Add Protein -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Log Protein</h3>
        <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
          <button 
            v-for="amount in [10, 20, 30, 50]" 
            :key="amount"
            @click="addProtein(amount)"
            class="p-4 bg-secondary rounded-xl hover:bg-secondary/80 transition-colors"
          >
            <p class="text-2xl font-bold text-red-500">+{{ amount }}g</p>
            <p class="text-sm text-muted-foreground mt-1">Add protein</p>
          </button>
        </div>
      </div>
    </div>

    <!-- Diet Planner -->
    <div v-if="activeTab === 'diet'" class="space-y-6">
      <!-- Diet Preference -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <h3 class="font-semibold mb-4">Diet Preference</h3>
        <div class="flex gap-4">
          <button 
            @click="dietPreference = 'veg'"
            :class="[
              'flex-1 p-4 rounded-xl border-2 transition-all',
              dietPreference === 'veg' 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
            ]"
          >
            <Leaf class="w-8 h-8 mx-auto mb-2 text-primary" />
            <p class="font-medium">Vegetarian</p>
          </button>
          <button 
            @click="dietPreference = 'non_veg'"
            :class="[
              'flex-1 p-4 rounded-xl border-2 transition-all',
              dietPreference === 'non_veg' 
                ? 'border-primary bg-primary/10' 
                : 'border-border hover:border-primary/50'
            ]"
          >
            <Drumstick class="w-8 h-8 mx-auto mb-2 text-accent" />
            <p class="font-medium">Non-Vegetarian</p>
          </button>
        </div>
      </div>

      <!-- Today's Diet Plan -->
      <div class="bg-card rounded-2xl p-6 border border-border">
        <div class="flex items-center justify-between mb-6">
          <div>
            <h3 class="font-semibold">Today's Diet Plan</h3>
            <p class="text-sm text-muted-foreground">{{ todayWorkoutName }} - High Protein Diet</p>
          </div>
          <span :class="[
            'px-3 py-1 rounded-full text-sm font-medium',
            dietPreference === 'veg' ? 'bg-primary/20 text-primary' : 'bg-accent/20 text-accent'
          ]">
            {{ dietPreference === 'veg' ? 'Vegetarian' : 'Non-Veg' }}
          </span>
        </div>

        <div class="space-y-4">
          <div 
            v-for="meal in currentDietPlan" 
            :key="meal.time"
            class="p-4 bg-secondary/50 rounded-xl"
          >
            <div class="flex items-center justify-between mb-3">
              <div class="flex items-center gap-2">
                <Clock class="w-4 h-4 text-muted-foreground" />
                <span class="text-sm font-medium">{{ meal.time }}</span>
              </div>
              <span class="text-xs text-muted-foreground">{{ meal.calories }} cal</span>
            </div>
            <h4 class="font-semibold mb-2">{{ meal.name }}</h4>
            <div class="flex flex-wrap gap-2">
              <span 
                v-for="item in meal.items" 
                :key="item"
                class="px-2 py-1 bg-background rounded-lg text-xs"
              >
                {{ item }}
              </span>
            </div>
            <div class="flex gap-4 mt-3 text-sm text-muted-foreground">
              <span>Protein: {{ meal.protein }}g</span>
              <span>Carbs: {{ meal.carbs }}g</span>
              <span>Fat: {{ meal.fat }}g</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Recommended Foods -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div class="bg-card rounded-2xl p-6 border border-border">
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <Leaf class="w-5 h-5 text-primary" />
            Vegetarian Options
          </h3>
          <div class="space-y-3">
            <div 
              v-for="food in vegFoods" 
              :key="food.name"
              class="flex items-center justify-between p-3 bg-secondary/50 rounded-xl"
            >
              <span>{{ food.name }}</span>
              <span class="text-sm text-primary font-medium">{{ food.protein }}g protein</span>
            </div>
          </div>
        </div>

        <div class="bg-card rounded-2xl p-6 border border-border">
          <h3 class="font-semibold mb-4 flex items-center gap-2">
            <Drumstick class="w-5 h-5 text-accent" />
            Non-Veg Options
          </h3>
          <div class="space-y-3">
            <div 
              v-for="food in nonVegFoods" 
              :key="food.name"
              class="flex items-center justify-between p-3 bg-secondary/50 rounded-xl"
            >
              <span>{{ food.name }}</span>
              <span class="text-sm text-accent font-medium">{{ food.protein }}g protein</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { 
  UtensilsCrossed, 
  Flame, 
  Target, 
  Leaf, 
  Drumstick, 
  Clock
} from 'lucide-vue-next'
import ProgressRing from '../components/ProgressRing.vue'
import CalorieChart from '../components/CalorieChart.vue'
import { workoutPlan } from '../data/workouts'

export default {
  name: 'Nutrition',
  components: {
    UtensilsCrossed,
    Flame,
    Target,
    Leaf,
    Drumstick,
    Clock,
    ProgressRing,
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
      activeTab: 'calories',
      tabs: [
        { id: 'calories', label: 'Calories' },
        { id: 'protein', label: 'Protein' },
        { id: 'diet', label: 'Diet Plan' }
      ],
      localCalories: {
        eaten: 1850,
        burned: 450,
        goal: 2400
      },
      localProtein: 120,
      newMeal: {
        name: '',
        calories: null
      },
      proteinCalc: {
        weight: 75,
        goal: 'muscle_gain'
      },
      dietPreference: 'non_veg',
      todaysMeals: [
        { name: 'Oatmeal with Berries', time: '7:30 AM', calories: 350, protein: 12 },
        { name: 'Grilled Chicken Salad', time: '12:30 PM', calories: 550, protein: 45 },
        { name: 'Protein Shake', time: '3:00 PM', calories: 200, protein: 30 },
        { name: 'Salmon with Rice', time: '7:00 PM', calories: 650, protein: 42 }
      ],
      vegFoods: [
        { name: 'Paneer (100g)', protein: 18 },
        { name: 'Lentils (1 cup)', protein: 18 },
        { name: 'Soybean (100g)', protein: 36 },
        { name: 'Tofu (100g)', protein: 8 },
        { name: 'Greek Yogurt (200g)', protein: 20 },
        { name: 'Chickpeas (1 cup)', protein: 15 }
      ],
      nonVegFoods: [
        { name: 'Chicken Breast (100g)', protein: 31 },
        { name: 'Eggs (2 large)', protein: 12 },
        { name: 'Salmon (100g)', protein: 25 },
        { name: 'Tuna (100g)', protein: 30 },
        { name: 'Turkey Breast (100g)', protein: 29 },
        { name: 'Shrimp (100g)', protein: 24 }
      ],
      vegDietPlan: [
        { time: '7:00 AM', name: 'Breakfast', items: ['Oats', 'Almonds', 'Banana', 'Greek Yogurt'], calories: 450, protein: 20, carbs: 55, fat: 15 },
        { time: '10:00 AM', name: 'Snack', items: ['Protein Shake', 'Peanut Butter Toast'], calories: 300, protein: 25, carbs: 25, fat: 12 },
        { time: '1:00 PM', name: 'Lunch', items: ['Paneer Curry', 'Brown Rice', 'Salad'], calories: 600, protein: 35, carbs: 60, fat: 22 },
        { time: '4:00 PM', name: 'Snack', items: ['Cottage Cheese', 'Mixed Nuts'], calories: 250, protein: 20, carbs: 10, fat: 15 },
        { time: '7:30 PM', name: 'Dinner', items: ['Tofu Stir-fry', 'Quinoa', 'Vegetables'], calories: 550, protein: 30, carbs: 50, fat: 20 }
      ],
      nonVegDietPlan: [
        { time: '7:00 AM', name: 'Breakfast', items: ['Egg Omelette', 'Whole Wheat Toast', 'Avocado'], calories: 500, protein: 28, carbs: 35, fat: 28 },
        { time: '10:00 AM', name: 'Snack', items: ['Protein Shake', 'Almonds'], calories: 280, protein: 30, carbs: 15, fat: 12 },
        { time: '1:00 PM', name: 'Lunch', items: ['Grilled Chicken', 'Brown Rice', 'Vegetables'], calories: 650, protein: 50, carbs: 55, fat: 18 },
        { time: '4:00 PM', name: 'Snack', items: ['Boiled Eggs', 'Greek Yogurt'], calories: 220, protein: 22, carbs: 8, fat: 12 },
        { time: '7:30 PM', name: 'Dinner', items: ['Salmon', 'Sweet Potato', 'Asparagus'], calories: 600, protein: 45, carbs: 40, fat: 25 }
      ]
    }
  },
  computed: {
    remainingCalories() {
      return Math.max(0, this.localCalories.goal - this.localCalories.eaten + this.localCalories.burned)
    },
    calculatedProtein() {
      const multipliers = {
        muscle_gain: 2,
        fat_loss: 2.2,
        maintenance: 1.5
      }
      return Math.round(this.proteinCalc.weight * (multipliers[this.proteinCalc.goal] || 2))
    },
    currentDietPlan() {
      return this.dietPreference === 'veg' ? this.vegDietPlan : this.nonVegDietPlan
    },
    todayWorkoutName() {
      const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      const today = days[new Date().getDay()]
      return workoutPlan[today]?.name || 'Rest Day'
    },
    weeklyCalorieData() {
      return {
        labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
        datasets: [
          {
            label: 'Calories',
            data: this.userData.weeklyCalories || [2100, 2300, 2150, 2400, 2250, 2100, 1850],
            backgroundColor: '#3b82f6',
            borderRadius: 8
          }
        ]
      }
    }
  },
  methods: {
    addMeal() {
      if (this.newMeal.name && this.newMeal.calories) {
        this.todaysMeals.push({
          name: this.newMeal.name,
          time: new Date().toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' }),
          calories: this.newMeal.calories,
          protein: Math.round(this.newMeal.calories * 0.15)
        })
        this.localCalories.eaten += this.newMeal.calories
        this.newMeal = { name: '', calories: null }
      }
    },
    addProtein(amount) {
      this.localProtein += amount
    }
  },
  mounted() {
    this.localCalories = { ...this.userData.todayCalories }
    this.localProtein = this.userData.proteinIntake
    this.proteinCalc.weight = this.userData.weight
    this.proteinCalc.goal = this.userData.goal
    this.dietPreference = this.userData.dietPreference
  }
}
</script>
