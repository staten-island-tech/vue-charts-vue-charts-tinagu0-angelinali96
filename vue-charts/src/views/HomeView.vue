<script setup>
import TheWelcome from '../components/TheWelcome.vue'
import { apiData } from '@/stores/fetchapi';
console.log(apiData);
</script>

<template>
  <main>
    <TheWelcome />
  </main>
</template>
