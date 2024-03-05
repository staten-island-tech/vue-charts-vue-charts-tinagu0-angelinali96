<template>
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>

<script>
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { data } from './data'

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    export default {
        components: { Bar },
        setup(){
            return {
            chartData: {
                labels: [ 'January', 'February', 'March', 'April', 'May' ],
                datasets: data
            },
            chartOptions: {
                responsive: true
        }
    }
        }
    }
</script>

<style lang="scss" scoped>

</style>