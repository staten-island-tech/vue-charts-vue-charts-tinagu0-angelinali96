<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/testtakers">Test Takers</RouterLink>
        <RouterLink to="/avgscores">Average Scores</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<script>
import ElseLmao from './views/ElseLmao.vue';

  export default {
    name: "App",
    components: { ElseLmao }
}
</script>

<style scoped>

</style>
