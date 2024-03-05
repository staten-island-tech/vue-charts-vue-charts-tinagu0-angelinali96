<template>
    <div>
        <Bar id="my-chart-id" :options="chartOptions" :data="chartData"/>
    </div>
</template>

<script>
import { apiData } from '@/stores/fetchapi';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const boroughs = {
  'Manhattan': 'M',
  'Bronx': 'X',
  'Brooklyn': 'K',
  'Queens': 'Q',
  'Staten Island': 'R'
};
    export default {
        name: 'AverageScores',
        components: {Bar}, 
        data(){
            return {
      chartData: {
        labels: Object.keys(boroughs),
        datasets: [ { data: [[40, 20],[30, 10],[10, 8],[20, 40],[40, 20]] , 
            backgroundColor: '#FFF'} ],
       
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