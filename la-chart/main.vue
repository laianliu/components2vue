<template>
  <div class="la-chart__wrapper"
       :id="id"></div>
</template>

<script>
import echarts from 'echarts'
export default {
  name: 'LaChart',
  props: {
    id: {
      type: String,
      default: `id-chart${Math.floor(Math.random() * 10000)}`
    },
    option: {
      type: Object,
      default: {}
    },
    width: {
      type: Number || String,
      default: 100
    },
    height: {
      type: Number || String,
      default: 100
    }
  },
  data() {
    return {
      chartInstance: null
    }
  },
  mounted() {
    const me = this
    setTimeout(function () {
      me.setoption()
    }, 20)
  },
  watch: {
    'option': {
      handler(newVal, oldVal) {
        if (newVal) {
          const me = this
          setTimeout(function () {
            me.setoption()
          }, 20)
        }
      },
      immediate: true
    }
  },
  methods: {
    createChart() {
      this.chartInstance = echarts.init(document.getElementById(this.id))
    },
    initChart() {
      this.createChart()
      window.addEventListener('resize', () => {
        this.createChart()
        document.querySelector(this.id).style.width = 100 + '%'
        this.chartInstance.resize()
      })
    },
    setoption() {
      if (!this.chartInstance) {
        this.initChart()
      }
      this.chartInstance.setOption(this.option)
      this.$bus.$emit('chartLoaded', this.chartInstance)
    }
  }
}
</script>

<style>
.la-chart__wrapper {
  width: 100%;
  height: 100%;
}
</style>
