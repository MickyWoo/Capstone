<template>
    <div class="chart">
    </div>
</template>

<script>

import { Line } from 'vue-chartjs'

export default {
      name: "stockChart",
  extends: Line,
  props: {
    chartdata: {
      type: Object,
      default: null
    },
    options: {
      responsive: true,
      maintainAspectRatio: false
    }
  },
  create () {
    this.renderChart(this.chartdata, this.options)
  }
}

</script>

<style scoped>

</style>