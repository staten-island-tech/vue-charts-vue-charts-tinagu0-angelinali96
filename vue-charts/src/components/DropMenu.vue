<template>
    <div>
        <Dropdown v-model="selectedSchool" :options="apiData" optionLabel="school_name" placeholder="Select a School"/>
    </div>
</template>

<script setup>
import { ref } from "vue";
import Dropdown from 'primevue/dropdown';
import { apiData } from '@/stores/fetchapi';

let data = apiData
const selectedSchool = ref({});
//const schools = ref(data);
</script>

<style scoped>

</style>