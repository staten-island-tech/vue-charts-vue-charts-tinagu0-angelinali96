<template>
  <div class="about">
    <h1>Highest and Lowest Number of Test Takers</h1>
    <Bar id="my-chart-id" :data="chartData" v-if="loaded"/>
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
      boroughData = {
        manhattan: returnExtrema(filterByBorough('M').sort(sortByTestTaker)),
        bronx: returnExtrema(filterByBorough('X').sort(sortByTestTaker)),
        brooklyn: returnExtrema(filterByBorough('K').sort(sortByTestTaker)),
        queens: returnExtrema(filterByBorough('Q').sort(sortByTestTaker)),
        statenisland: returnExtrema(filterByBorough('R').sort(sortByTestTaker)),
      }; 
      // boroughData.manhattan = boroughData.manhattan.sort(sortByTestTaker);
      // boroughData.manhattan = returnExtrema(boroughData.manhattan);
      this.chartdata = {
        labels: ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'],
        datasets: [{data: [boroughData.manhattan,boroughData.bronx,boroughData.brooklyn,boroughData.queens,boroughData.statenisland],
      backgroundColor: '#FFF'}],
      };
      this.loaded = true;
      console.log(boroughData);
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
