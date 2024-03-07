<template>
  <Header></Header>
  <router-view id="view"></router-view>
  <Footer></Footer>

  <!-- 圓圈 -->
  <!-- <div
        class="flex items-center justify-center w-[32px] h-[32px] rounded-full border-1 border-solid border-[#1Fb588]"
      > -->
</template>

<script setup>
import { onMounted } from "vue";
import Header from "./components/header.vue";
import Footer from "./components/Footer.vue";
import WOW from "wow.js";
import "animate.css";
import { useHead } from "@vueuse/head";

useHead({
  title: "島遊",
  meta: [
    {
      name: "description",
      content: "島遊台灣，台灣島遊，探索台灣的旅程",
    },
  ],
});

onMounted(() => {
  new WOW({
    boxClass: "wow",
    animateClass: "animate__animated",
    offset: 200,
    mobile: true,
    live: true,
  }).init();
});
</script>

<style lang="scss">
@use "./assets/scss/main.scss";
#app {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

#view {
  flex: 1;
}
img {
  -webkit-user-drag: none;
}
</style>