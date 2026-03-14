<template>
  <div class="relative inline-flex items-center justify-center">
    <svg :width="size" :height="size" class="transform -rotate-90">
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="trackColor"
        :stroke-width="strokeWidth"
      />
      <circle
        :cx="size / 2"
        :cy="size / 2"
        :r="radius"
        fill="none"
        :stroke="color"
        :stroke-width="strokeWidth"
        :stroke-dasharray="circumference"
        :stroke-dashoffset="dashOffset"
        stroke-linecap="round"
        class="progress-ring-circle transition-all duration-1000"
      />
    </svg>
    <div class="absolute inset-0 flex flex-col items-center justify-center">
      <span :class="['font-bold', valueSizeClass]">{{ displayValue }}</span>
      <span v-if="label" class="text-xs text-muted-foreground">{{ label }}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'ProgressRing',
  props: {
    value: {
      type: Number,
      default: 0
    },
    max: {
      type: Number,
      default: 100
    },
    size: {
      type: Number,
      default: 120
    },
    strokeWidth: {
      type: Number,
      default: 8
    },
    color: {
      type: String,
      default: '#22c55e'
    },
    trackColor: {
      type: String,
      default: '#262626'
    },
    label: {
      type: String,
      default: ''
    },
    showPercentage: {
      type: Boolean,
      default: true
    }
  },
  computed: {
    radius() {
      return (this.size - this.strokeWidth) / 2
    },
    circumference() {
      return 2 * Math.PI * this.radius
    },
    percentage() {
      return Math.min((this.value / this.max) * 100, 100)
    },
    dashOffset() {
      return this.circumference - (this.percentage / 100) * this.circumference
    },
    displayValue() {
      return this.showPercentage ? `${Math.round(this.percentage)}%` : this.value
    },
    valueSizeClass() {
      if (this.size >= 120) return 'text-2xl'
      if (this.size >= 80) return 'text-lg'
      return 'text-sm'
    }
  }
}
</script>
