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

  export default {
    name: "App",
    components: { }
}
</script>

<style scoped>

</style>
