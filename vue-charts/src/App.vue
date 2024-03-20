<template>
  <header>
      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/testtakers">Test Takers</RouterLink>
        <RouterLink to="/avgscores">Average Scores</RouterLink>
        <RouterLink to="/takerdist">Distribution of Test Takers</RouterLink>
        <RouterLink to="/totalscore">Total Score</RouterLink>
      </nav>
  </header>

  <RouterView />
</template>

<script>

  export default {
    name: "App",
    components: { }
}
</script>


<style scoped>
nav a:first-of-type {
  border: 0;
}

</style>
