<template>
  <header>
    <img alt="Vue logo" class="logo" src="@/assets/logo.svg" width="125" height="125" />

    <div class="wrapper">

      <nav>
        <RouterLink to="/">Home</RouterLink>
        <RouterLink to="/testtakers">Test Takers</RouterLink>
        <RouterLink to="/avgscores">Average Scores</RouterLink>
      </nav>
    </div>
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
