<!-- <script setup>
import HelloWorld from './components/HelloWorld.vue'
</script>

<template>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="/vite.svg" class="logo" alt="Vite logo" />
    </a>
    <a href="https://vuejs.org/" target="_blank">
      <img src="./assets/vue.svg" class="logo vue" alt="Vue logo" />
    </a>
  </div>
  <HelloWorld msg="Vite + Vue" />
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style> -->

<!-- <template>
  <div class="text-green-700 text-xl">Hello, from TailwindCSS!</div>
</template> -->

<template>
  <div id="frontend-app">
    <NavBarMeraki />
    <router-view />
    <FooterMeraki />
  </div>
</template>

<script type="text/javascript">
import NavBar from "./components/NavBar.vue";
import NavBarMeraki from "./components/NavBarMeraki.vue";
import FooterMeraki from "./components/FooterMeraki.vue";

export default {
  components: {
    NavBar, // register component
    NavBarMeraki,
    FooterMeraki
  },
};
</script>