<template>
  <div class="about">
    <h1>Highest and Lowest Number of Test Takers Per School</h1>
    <Bar id="my-chart-id" :data="chartdata" v-if="loaded" aria-label="Highest and Lowest Number of Test Takers Per School in NYC Boroughs"/>
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

let {apiData} = ref({});
let boroughData = ref({});
function filterByBorough(areacode){ // categorize data by borough
  let filteredData = apiData.filter(item => item.dbn.includes(areacode) === true);
  return filteredData.filter(item => item.num_of_sat_test_takers.includes('s') != true); // eliminate non number values
}
function sortByTestTaker(a, b) { // sort data in increasing order by number of test takers
  return a.num_of_sat_test_takers - b.num_of_sat_test_takers;
}
function returnExtrema(arr){ // get highest and lowest number for floating bar chart
  return [Number(arr[0].num_of_sat_test_takers), Number(arr[arr.length-1].num_of_sat_test_takers)];
}
function dataToUse(borough){ // reduce length of function in object bc clearly i cant organize anything
  return returnExtrema(filterByBorough(borough).sort(sortByTestTaker))
}

    export default {
        name: 'AverageScores',
        components: {Bar}, 
        data: ()=>({
          loaded: false,
          chartdata: null
        }),
  async mounted () {
    this.loaded = false
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json');
      apiData = await response.json();
      boroughData = {
        manhattan: dataToUse('M'),
        bronx: dataToUse('X'),
        brooklyn: dataToUse('K'),
        queens: dataToUse('Q'),
        statenisland: dataToUse('R'),
      }; 
      const chartdata = {
        labels: ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'],
        datasets: [{data: [boroughData.manhattan,boroughData.bronx,boroughData.brooklyn,boroughData.queens,boroughData.statenisland],
      backgroundColor: 'rgb(200,200,200)',label: 'Highest and Lowest Number of Test Takers'}],
      };
      this.chartdata = chartdata;
      this.loaded = true;      
    } catch (e) {
      console.error(e)
    }
  }
    };

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
