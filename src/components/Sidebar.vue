<template>
  <aside 
    :class="[
      'fixed left-0 top-0 h-full bg-card border-r border-border z-40 transition-all duration-300 hidden lg:flex flex-col',
      isCollapsed ? 'w-20' : 'w-64'
    ]"
  >
    <div class="flex items-center gap-3 p-6 border-b border-border">
      <div class="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
        <Dumbbell class="w-6 h-6 text-primary-foreground" />
      </div>
      <span v-if="!isCollapsed" class="font-bold text-xl">GymFlow</span>
    </div>

    <nav class="flex-1 p-4 space-y-2">
      <router-link 
        v-for="item in navItems" 
        :key="item.path"
        :to="item.path"
        :class="[
          'flex items-center gap-3 px-4 py-3 rounded-xl transition-all',
          $route.path === item.path 
            ? 'bg-primary text-primary-foreground' 
            : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
        ]"
      >
        <component :is="item.icon" class="w-5 h-5 flex-shrink-0" />
        <span v-if="!isCollapsed">{{ item.label }}</span>
      </router-link>
    </nav>

    <div class="p-4 border-t border-border space-y-2">
      <button 
        @click="$emit('toggle-theme')"
        class="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
      >
        <Sun v-if="isDarkMode" class="w-5 h-5" />
        <Moon v-else class="w-5 h-5" />
        <span v-if="!isCollapsed">{{ isDarkMode ? 'Light Mode' : 'Dark Mode' }}</span>
      </button>
      <button 
        @click="$emit('toggle-sidebar')"
        class="flex items-center gap-3 px-4 py-3 rounded-xl w-full text-muted-foreground hover:bg-secondary hover:text-foreground transition-all"
      >
        <ChevronLeft v-if="!isCollapsed" class="w-5 h-5" />
        <ChevronRight v-else class="w-5 h-5" />
        <span v-if="!isCollapsed">Collapse</span>
      </button>
    </div>
  </aside>
</template>

<script>
import { 
  LayoutDashboard, 
  Dumbbell, 
  UtensilsCrossed, 
  TrendingUp, 
  Settings,
  Sun,
  Moon,
  ChevronLeft,
  ChevronRight
} from 'lucide-vue-next'

export default {
  name: 'Sidebar',
  components: {
    LayoutDashboard,
    Dumbbell,
    UtensilsCrossed,
    TrendingUp,
    Settings,
    Sun,
    Moon,
    ChevronLeft,
    ChevronRight
  },
  props: {
    isCollapsed: {
      type: Boolean,
      default: false
    },
    isDarkMode: {
      type: Boolean,
      default: true
    }
  },
  emits: ['toggle-theme', 'toggle-sidebar'],
  data() {
    return {
      navItems: [
        { path: '/', label: 'Dashboard', icon: 'LayoutDashboard' },
        { path: '/workouts', label: 'Workouts', icon: 'Dumbbell' },
        { path: '/nutrition', label: 'Nutrition', icon: 'UtensilsCrossed' },
        { path: '/progress', label: 'Progress', icon: 'TrendingUp' },
        { path: '/settings', label: 'Settings', icon: 'Settings' }
      ]
    }
  }
}
</script>
