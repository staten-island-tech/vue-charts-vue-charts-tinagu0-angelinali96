<template>
  <div class="about">
    <h1>Highest and Lowest Number of Test Takers Per School</h1>
    <Bar id="my-chart-id" :data="chartdata" v-if="loaded" aria-label="Highest and Lowest Number of Test Takers Per School in NYC Boroughs"/>
  </div>
</template>
<script>
import {ref} from 'vue';
import { Bar } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

let {apiData} = ref({});
let boroughMinMax = ref([]);
let boroughAvg = ref([]);
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
function dataMinMax(borough){ // reduce length of function in object 
  return returnExtrema(filterByBorough(borough).sort(sortByTestTaker))
}

function avgNumPpl(borough){ // get average number of test takers by borough
  let numbers = filterByBorough(borough);
  let total = 0;
  numbers.forEach(item => total = total+Number(item.num_of_sat_test_takers));
  return total/(numbers.length);
}

    export default {
        name: 'AverageScores',
        components: {Bar}, 
        data: ()=>({
          loaded: false,
          chartdata: null,
          chartOptions: {
            responsive: true
          },
          scales:{
            y:{
              stacked: true
            }
          }
        }),
  async mounted () {
    this.loaded = false
    try {
      const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json'); // get api
      apiData = await response.json();
      boroughMinMax = [
        dataMinMax('M'),
        dataMinMax('X'),
        dataMinMax('K'),
        dataMinMax('Q'),
        dataMinMax('R'),
    ]; 
    boroughAvg = [
        avgNumPpl('M'),
        avgNumPpl('X'),
        avgNumPpl('K'),
        avgNumPpl('Q'),
        avgNumPpl('R'),
    ];
      const chartdata = {
        labels: ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'],
        datasets: [
          {
            data: boroughMinMax,
            backgroundColor: 'rgb(200,200,200)',
            label: 'Highest and Lowest Number of Test Takers',
            type: 'bar'
          },
          {
            data: boroughAvg,
            backgroundColor: 'rgb(250,200,200)',
            label: 'Average Test Takers',
            type: 'bar'
          }
        ],
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

</style>
