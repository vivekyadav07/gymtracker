<template>
  <div :class="{ 'light': !isDarkMode }">
    <div class="min-h-screen bg-background text-foreground">
      <Sidebar 
        :is-collapsed="isSidebarCollapsed" 
        :is-dark-mode="isDarkMode"
        @toggle-theme="toggleTheme"
        @toggle-sidebar="toggleSidebar"
      />
      <main 
        :class="[
          'transition-all duration-300',
          isSidebarCollapsed ? 'lg:ml-20' : 'lg:ml-64'
        ]"
      >
        <div class="p-4 lg:p-6">
          <router-view :user-data="userData" @update-user-data="updateUserData" />
        </div>
      </main>
      <MobileNav />
    </div>
  </div>
</template>

<script>
import Sidebar from './components/Sidebar.vue'
import MobileNav from './components/MobileNav.vue'

export default {
  name: 'App',
  components: {
    Sidebar,
    MobileNav
  },
  data() {
    return {
      isDarkMode: true,
      isSidebarCollapsed: false,
      userData: {
        name: 'Alex',
        weight: 75,
        goal: 'muscle_gain',
        dietPreference: 'non_veg',
        streak: 12,
        weeklyConsistency: 85,
        todayCalories: {
          eaten: 1850,
          burned: 450,
          goal: 2400
        },
        proteinIntake: 120,
        completedExercises: [],
        bodyStats: {
          weight: [75, 74.5, 74.8, 74.2, 74, 73.8, 73.5],
          bodyFat: [18, 17.8, 17.5, 17.3, 17.2, 17, 16.8],
          waist: [85, 84.5, 84, 83.8, 83.5, 83, 82.5],
          muscleMass: [62, 62.2, 62.5, 62.8, 63, 63.2, 63.5]
        },
        weeklyCalories: [2100, 2300, 2150, 2400, 2250, 2100, 1850],
        weeklyWorkouts: [true, true, true, true, true, false, false],
        optionalActivities: {
          dance: false,
          zumba: false,
          yoga: true,
          running: true
        }
      }
    }
  },
  methods: {
    toggleTheme() {
      this.isDarkMode = !this.isDarkMode
      localStorage.setItem('gymflow-theme', this.isDarkMode ? 'dark' : 'light')
    },
    toggleSidebar() {
      this.isSidebarCollapsed = !this.isSidebarCollapsed
    },
    updateUserData(newData) {
      this.userData = { ...this.userData, ...newData }
      localStorage.setItem('gymflow-data', JSON.stringify(this.userData))
    },
    loadUserData() {
      const savedData = localStorage.getItem('gymflow-data')
      if (savedData) {
        this.userData = { ...this.userData, ...JSON.parse(savedData) }
      }
      const savedTheme = localStorage.getItem('gymflow-theme')
      if (savedTheme) {
        this.isDarkMode = savedTheme === 'dark'
      }
    }
  },
  mounted() {
    this.loadUserData()
  }
}
</script>
