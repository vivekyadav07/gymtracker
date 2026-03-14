<template>
  <nav class="fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 lg:hidden">
    <div class="flex items-center justify-around py-2">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        :class="[
          'flex flex-col items-center gap-1 px-4 py-2 rounded-xl transition-all',
          $route.path === item.path 
            ? 'text-primary' 
            : 'text-muted-foreground'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5" />
        <span class="text-xs">{{ item.label }}</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
import { 
  LayoutDashboard, 
  Dumbbell, 
  UtensilsCrossed, 
  TrendingUp, 
  Settings
} from 'lucide-vue-next'

export default {
  name: 'MobileNav',
  components: {
    LayoutDashboard,
    Dumbbell,
    UtensilsCrossed,
    TrendingUp,
    Settings
  },
  data() {
    return {
      navItems: [
        { path: '/', label: 'Home', icon: 'LayoutDashboard' },
        { path: '/workouts', label: 'Workouts', icon: 'Dumbbell' },
        { path: '/nutrition', label: 'Nutrition', icon: 'UtensilsCrossed' },
        { path: '/progress', label: 'Progress', icon: 'TrendingUp' },
        { path: '/settings', label: 'Settings', icon: 'Settings' }
      ]
    }
  }
}
</script>
