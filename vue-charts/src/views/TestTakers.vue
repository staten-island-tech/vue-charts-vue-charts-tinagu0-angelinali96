<template>
  <div class="about">
    <h1>Highest and Lowest Number of Test Takers</h1>
    <Bar id="my-chart-id" :options="chartOptions" :data="chartData" v-if="loaded"/>
  </div>
</template>
<script>
import {ref, onMounted} from 'vue';
// import { apiData } from '@/stores/fetchapi';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

/* const dataaa = ref('');
async function getsgsdg(){
  dataaa.value = data;
} */

const boroughs = {
  'Manhattan': 'M',
  'Bronx': 'X',
  'Brooklyn': 'K',
  'Queens': 'Q',
  'Staten Island': 'R'
};
const {apiData} = {};
function filterByBorough(areacode){
  return apiData[0].filter(item => item.dbn.includes(areacode) === true);
}

    export default {
        name: 'AverageScores',
        components: {Bar}, 
        data: ()=>({
          loaded: false,
          chartData: null
        }),
  async mounted () {
    this.loaded = false

    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json');
      apiData = await response.json();
      const dataByBorough = {
        manhattan: filterByBorough('M'),
        bronx: filterByBorough('X'),
        brooklyn: filterByBorough('K'),
        queens: filterByBorough('Q'),
        statenisland: filterByBorough('R'),
      }; 
      this.chartdata = {
        labels: ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'],
        datasets: [{data: [[40, 20],[30, 10],[10, 8],[20, 40],[40, 20]],
      backgroundColor: '#FFF'}],
      };

      this.loaded = true;
    } catch (e) {
      console.error(e)
    }
  }
    };

    /* chartData: {
        labels: Object.keys(boroughs),
        datasets: [ { data: [[40, 20],[30, 10],[10, 8],[20, 40],[40, 20]] , 
            backgroundColor: '#FFF'} ],
       
      }, */
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
