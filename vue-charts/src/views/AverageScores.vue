<template>
    <DropMenu />
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>

<script>
import DropMenu from '../components/DropMenu.vue'
import { apiData } from '@/stores/fetchapi';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { data } from './data'

console.log(apiData)


ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    export default {
        props: {
            apiData: Array,
        },
        components: { 
            Bar, 
            DropMenu,
        },
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

<style scoped>

</style>