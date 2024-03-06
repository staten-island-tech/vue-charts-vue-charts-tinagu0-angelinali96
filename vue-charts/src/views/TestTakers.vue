<template>
  <div class="about">
    <h1>Highest and Lowest Number of Test Takers</h1>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData"/>
  </div>
</template>
<script>
import {ref, onBeforeMount} from 'vue';
import { apiData } from '@/stores/fetchapi';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const dataaa = ref('');
async function getsgsdg(){
  dataaa.value = data;
}
onBeforeMount(()=> {getsgsdg()});

const boroughs = {
  'Manhattan': 'M',
  'Bronx': 'X',
  'Brooklyn': 'K',
  'Queens': 'Q',
  'Staten Island': 'R'
};

function filterByBorough(areacode){
  return apiData[0].filter(item => item);
}

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
<style>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>
