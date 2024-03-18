<template>
    <div>
      <Dropdown v-model="selectedSchool" :options="schoolNames" placeholder="Select a School" aria-label="School Selector" class="w-full md:w-14rem" />
      <Bar
        id="my-chart-id"
        :options="chartOptions"
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
    setup() {
      // Fetch data when component is mounted
      onMounted(async () => {
        await getData(); // Wait for getData() to get the data
        console.log(scores.value);
      });
      //info for the dropdown
      const selectedSchool = ref('');
      const schoolNames = computed(() => scores.value.map(school => school.school_name));

    watch(selectedSchool, () => {
    let values = scores.value.filter((school) => school.school_name == selectedSchool.value);
    console.log(values);
    })
    let values = scores.value.filter((school) => school.school_name == selectedSchool.value);
    let scores = [
        {
        reading: values.sat_critical_reading_avg_score,
        writing: values.sat_writing_avg_score,
        math: values.sat_math_avg_score,
        },
    ];
  
      return {
        selectedSchool,
        schoolNames,
        chartData: {
          labels: ['Reading', 'Writing', 'Math'],
          datasets: [{ data: scores, backgroundColor: 'rgb(200,200,200)' }]
        },
        chartOptions: {
          responsive: true
        },
      }
    }
  };
  </script>
  
  <style scoped>
  </style>