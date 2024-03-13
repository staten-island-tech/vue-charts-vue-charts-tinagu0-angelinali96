<template>
  <div class="about">
    <h1>Highest and Lowest Number of Test Takers Per School</h1>
    <Chart type="line" id="barchart" :data="chartdata" v-if="loaded" aria-label="Highest and Lowest Number of Test Takers Per School in NYC Boroughs"/>
  </div>
</template>
<script>
import {ref} from 'vue';
import { Chart } from 'vue-chartjs';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, LineController  } from 'chart.js';
ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale, PointElement, LineElement, LineController);

let {apiData} = ref({});
let boroughMinMax = ref([]);
let boroughAvg = ref([]);
let boroughMedian = ref([]);
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

function findMedian(borough) {
  let numbers = filterByBorough(borough).sort(sortByTestTaker);
    const middleIndex = Math.floor(numbers.length / 2);

    if (numbers.length % 2 === 0) {
        return (Number(numbers[middleIndex - 1].num_of_sat_test_takers) + Number(numbers[middleIndex].num_of_sat_test_takers)) / 2;
    } else {
        return Number(numbers[middleIndex].num_of_sat_test_takers);
    }
}


    export default {
        name: 'AverageScores',
        components: {Chart}, 
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
    boroughMedian = [
        findMedian('M'),
        findMedian('X'),
        findMedian('K'),
        findMedian('Q'),
        findMedian('R'),
    ];

      const chartdata = {
        labels: ['Manhattan', 'Bronx', 'Brooklyn', 'Queens', 'Staten Island'],
        datasets: [
          {
            data: boroughMinMax,
            backgroundColor: 'rgb(150,150,200)',
            label: 'Highest and Lowest Number of Test Takers',
            type: 'bar',
            order: 1
          },
          {
            data: boroughAvg,
            backgroundColor: 'rgb(250,150,150)',
            borderColor: 'rgb(250,150,150)',
            label: 'Average Test Takers',
            order: 0
          },
          {
            data: boroughMedian,
            backgroundColor: 'rgb(50,150,250)',
            borderColor: 'rgb(50,150,250)',
            label: 'Median Test Takers',
            order: 0
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
