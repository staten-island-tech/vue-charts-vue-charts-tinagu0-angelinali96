<template>
    <div class="about">
      <h1>Frequency Distribution of Test Takers</h1>
      <Scatter :data="chartdata" :options="chartOptions" v-if="loaded" aria-label="Distribution of Test Takers Per School in NYC Boroughs"/>
        <p>erm the chart axes labels arent showing up so basically the x axis is the number of test takers and the y axis is the number of schools with that number of test takers</p>
    </div>
  </template>
  <script>
  import {ref} from 'vue';
  import { Scatter } from 'vue-chartjs';
  import { Chart as ChartJS, Title, Tooltip, Legend, CategoryScale, LinearScale,PointElement, LineElement } from 'chart.js';
  ChartJS.register(Title, Tooltip, Legend, CategoryScale, LinearScale, PointElement, LineElement );
  
  let {apiData} = ref({});
  let boroughDistribution = ref([]);
  function filterByBorough(areacode){ // categorize data by borough
    let filteredData = apiData.filter(item => item.dbn.includes(areacode) === true);
    return filteredData.filter(item => item.num_of_sat_test_takers.includes('s') != true); // eliminate non number values
  }
  
  function dataDistribution(borough){
    let count = {};
    borough.forEach(ele => {
      if (count[Number(ele.num_of_sat_test_takers)]) {
          count[Number(ele.num_of_sat_test_takers)] += 1;
      } else {
          count[Number(ele.num_of_sat_test_takers)] = 1;
      }
  });
    let coords = [];
    Object.keys(count).forEach(item => {coords.push({
      x: Number(item),
      y: count[item]
    })});
    return coords;
  }
  
      export default {
          name: 'TestTakerDistribution',
          components: {Scatter}, 
          data: ()=>({
            loaded: false,
            chartdata: null,
            chartOptions: {
              responsive: true,
              /* scales:{
                xAxes: [{
    display: true,
    scaleLabel: {
      display: true,
      labelString: 'Number of Test Takers'
    }
  }],
  yAxes: [{
    display: true,
    scaleLabel: {
      display: true,
      labelString: 'Number of Schools'
    }
  }]
              } */
            }
          }),
    async mounted () {
      this.loaded = false
      try {
        const response = await fetch('https://data.cityofnewyork.us/resource/f9bf-2cp4.json'); // get api
        apiData = await response.json();
        
      boroughDistribution = [
          dataDistribution(filterByBorough('M')),
          dataDistribution(filterByBorough('X')),
          dataDistribution(filterByBorough('K')),
          dataDistribution(filterByBorough('Q')),
          dataDistribution(filterByBorough('R')),
      ];
        const chartdata = {
          datasets: [
            {
              data: boroughDistribution[0],
              backgroundColor: 'rgb(200,200,200)',
              label: 'Manhattan',
              showLine: true,
              borderColor: 'rgb(200,200,200)',
            },
            {
              data: boroughDistribution[1],
              backgroundColor: 'rgb(150,200,200)',
              label: 'Bronx',
              showLine: true,
              borderColor: 'rgb(150,200,200)',
            },
            {
              data: boroughDistribution[2],
              backgroundColor: 'rgb(200,150,200)',
              label: 'Brooklyn',
              showLine: true,
              borderColor: 'rgb(200,150,200)',
            },
            {
              data: boroughDistribution[3],
              backgroundColor: 'rgb(200,200,150)',
              label: 'Queens',
              showLine: true,
              borderColor: 'rgb(200,200,150)',
            },
            {
              data: boroughDistribution[4],
              backgroundColor: 'rgb(150,200,150)',
              label: 'Staten Island',
              showLine: true,
              borderColor: 'rgb(150,200,150)',
            }
          ],
        };
        // console.log(boroughDistribution)
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
  