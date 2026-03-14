<template>
  <Line :data="chartData" :options="chartOptions" />
</template>

<script>
import { Line } from 'vue-chartjs'
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement,
  LineElement, 
  Title, 
  Tooltip, 
  Legend,
  Filler
} from 'chart.js'

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler)

export default {
  name: 'LineChart',
  components: {
    Line
  },
  props: {
    data: {
      type: Object,
      required: true
    },
    color: {
      type: String,
      default: '#22c55e'
    }
  },
  computed: {
    chartData() {
      return {
        labels: this.data.labels,
        datasets: [{
          label: 'Progress',
          data: this.data.data,
          borderColor: this.color,
          backgroundColor: this.hexToRgba(this.color, 0.1),
          fill: true,
          tension: 0.4,
          pointRadius: 4,
          pointHoverRadius: 6,
          pointBackgroundColor: this.color,
          pointBorderColor: '#141414',
          pointBorderWidth: 2
        }]
      }
    },
    chartOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            display: false
          },
          tooltip: {
            backgroundColor: '#1a1a1a',
            titleColor: '#fafafa',
            bodyColor: '#fafafa',
            borderColor: '#262626',
            borderWidth: 1,
            padding: 12,
            cornerRadius: 8
          }
        },
        scales: {
          x: {
            grid: {
              display: false
            },
            ticks: {
              color: '#a3a3a3'
            }
          },
          y: {
            grid: {
              color: '#262626'
            },
            ticks: {
              color: '#a3a3a3'
            }
          }
        }
      }
    }
  },
  methods: {
    hexToRgba(hex, alpha) {
      const r = parseInt(hex.slice(1, 3), 16)
      const g = parseInt(hex.slice(3, 5), 16)
      const b = parseInt(hex.slice(5, 7), 16)
      return `rgba(${r}, ${g}, ${b}, ${alpha})`
    }
  }
}
</script>
