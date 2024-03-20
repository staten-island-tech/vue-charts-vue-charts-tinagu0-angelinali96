<template>
  <h1>Average Score Per School</h1>
    <div>
      <Dropdown v-model="selectedSchool" :options="schoolNames" filter placeholder="Select a School" aria-label="School Selector" class="w-full md:w-14rem" /> 
      <Bar
        id="my-chart-id"
        :data="chartData"        
      />
    </div>
  </template>
  
  <script>
  import Dropdown from 'primevue/dropdown';
  import { ref, onMounted, computed, watch } from 'vue';
  import { Bar } from 'vue-chartjs'
  import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
  
  //puts data into here 
  const scores = ref([]);
  async function getData() {
    try {
      let res = await fetch("https://data.cityofnewyork.us/resource/f9bf-2cp4.json");
      let data = await res.json();
      scores.value = data;
    } catch (error) {
      console.error("massive skill issue", error);
    }
  };
  
  ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
  
  export default {
    props: {
      index: Number,
      scores: Array,
    },
    components: { 
      Bar, 
      Dropdown,
    },
    chartOptions: {
            responsive: true
          },
    setup() {
      // Fetch data when component is mounted
      onMounted(async () => {
        await getData(); // Wait for getData() to get the data
      });
      //info for the dropdown
      //and all the variables
      const selectedSchool = ref('');
      const schoolNames = computed(() => scores.value.map(school => school.school_name));
    
      const reading = ref(0);
      const writing = ref(0);
      const math = ref(0);
      
      const chartData = computed(() => ({
      labels: ['Reading', 'Writing', 'Math'],
      datasets: [{ data:[reading.value, writing.value, math.value], backgroundColor: 'rgb(255,230,234)' }]
    }));

      watch(selectedSchool, async () => {
      const selectedScores = scores.value.find(school => school.school_name === selectedSchool.value);
        // Update individual scores
        reading.value = selectedScores.sat_critical_reading_avg_score;
        writing.value = selectedScores.sat_writing_avg_score;
        math.value = selectedScores.sat_math_avg_score;
    });
    
      return {
        selectedSchool,
        schoolNames,
        chartData,
      }
    }
  };
  </script>
  
  <style scoped>
  </style>