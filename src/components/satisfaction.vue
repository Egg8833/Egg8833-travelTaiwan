<script setup>
import { computed } from "vue";
import start from "../assets/images/icon/star-filled.svg";

const props = defineProps({
  totalStart: { type: Number, default: 5 },
  startNum: { type: Number, default: 0 },
  commit: { type: Boolean, default: false },
  commitNum: { type: Number, default: 100 },
});

const outLineStart = computed(() => {
  return props.totalStart - props.startNum;
});
</script>

<template>
  <div class="flex items-end">
    <div class="flex gap-1">
      <img v-for="i in props.startNum" :key="i" :src="start" alt="start" />
      <img
        v-for="i in outLineStart"
        :key="i"
        src="../assets/images/icon/star-outline.svg"
        alt="start"
      />
    </div>
    <p v-if="commit" class="ml-2 text-[#808080] text-[14px] font-500">
      {{ props.commitNum }} 則評價
    </p>
  </div>
</template>

<style>
</style>

