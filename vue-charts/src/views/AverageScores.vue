<template>
    <DropMenu />
    <Bar
      id="my-chart-id"
      :options="chartOptions"
      :data="chartData"
    />
  </template>

<script>
import DropMenu from '../components/DropMenu.vue'
import { ref, onMounted } from 'vue';
import { Bar } from 'vue-chartjs'
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js'
import { data } from './data'

const scores = ref("")
async function getData() {
    let res = await fetch("https://data.cityofnewyork.us/resource/f9bf-2cp4.json");
    let data = await res.json();
    scores.value = data;
}

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale)
    export default {
        props: {
            scores: Array,
        },
        components: { 
            Bar, 
            DropMenu,
        },
        setup(){
            onMounted(() => {
            getData();
            const data = scores.value
            console.log(data);
            });
            return {
            chartData: {
                labels: [ 'January', 'February', 'March', 'April', 'May' ],
                datasets: data
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