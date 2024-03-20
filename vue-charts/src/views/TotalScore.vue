<template>
    <h1>Total Score out of 2200</h1>
    <div>
        <Doughnut :data="data" :options="options" />
    </div>  
</template>

<script>
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { Doughnut } from 'vue-chartjs';

ChartJS.register(ArcElement, Tooltip, Legend)

export default {
    components: { Doughnut },
    setup() {
        return
    }}


</script>

<style scoped>

</style>