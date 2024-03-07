<script setup>
import card from "../card.vue";

const props = defineProps({
  data: Array,
});
</script>

<template>
  <!-- life -->
  <div class="lg:max-w-[1200px] lg:mx-auto">
    <div class="px-4 lg:px-0">
      <div
        class="pt-7 pb-6 flex justify-center items-center lg:justify-between lg:pl-6 lg:pr-10"
      >
        <h2
          class="text-center text-[30px] text-[#188E6B] font-700 lg:text-left"
        >
          熱門打卡景點
        </h2>
        <button class="btn hidden lg:block">查看更多</button>
      </div>

      <div class="relative">
        <div
          class="flex gap-5 flex-wrap justify-center pb-8 lg:flex-nowrap lg:justify-unset lg:overflow-x-hidden lg:gap-12"
        >
          <card
            v-for="data in props.data"
            :key="data.id"
            :cardData="data"
          ></card>
        </div>
      </div>
    </div>
    <div class="flex justify-center pb-9 lg:hidden">
      <button class="btn">查看更多</button>
    </div>
  </div>
</template>

<style>
</style>

