<template>
    <h1>Total Score out of 2200</h1>
    <div>
        <Dropdown v-model="selectedSchool" :options="schoolNames" filter placeholder="Select a School" aria-label="School Selector" class="w-full md:w-14rem" /> 
    </div>
    <div>
        <Doughnut :data="chartData" />
    </div>  
</template>

<script>
  import Dropdown from 'primevue/dropdown';
  import { ref, onMounted, computed, watch } from 'vue';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

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

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    props: {
        scores: Array,
    },
    components: { Dropdown, Doughnut },
    setup() {
      // Fetch data when component is mounted
      onMounted(async () => {
        await getData(); // Wait for getData() to get the data
      });
      //info for the dropdown
      //and all the variables
    const selectedSchool = ref('');
    const schoolNames = computed(() => scores.value.map(school => school.school_name));
    const total = ref(0);
    const lost =ref(0);

    watch(selectedSchool, async () => {
      const selectedScores = scores.value.find(school => school.school_name === selectedSchool.value);
      let r = Number(selectedScores.sat_critical_reading_avg_score);
      let w = Number(selectedScores.sat_writing_avg_score);
      let m = Number(selectedScores.sat_math_avg_score);
      let res = (r + w + m)
      total.value = res
      lost.value = 2200 - res
      
    });


    const chartData = computed(() => ({
    labels: ['Total Points', 'Lost Points'],
    datasets: [{ data:[total.value, lost.value], backgroundColor: 'rgb(255,230,234)', label: 'Score for each Subject' }]
    }));


        return {
            selectedSchool,
            schoolNames,
            chartData
        }
    }}


</script>

<style scoped>

</style>