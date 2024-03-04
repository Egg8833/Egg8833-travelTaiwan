<script setup>
import satisfaction from "../components/satisfaction.vue";
import favoriteImg from "../assets/images/icon/heart-outline.svg";
const props = defineProps({
  cardData: {
    type: Array,
    // default: [
    //   {
    //     id: Number,
    //     title: String,
    //     photoSrc: String,
    //     favoriteImg: String,
    //     tagText: Array,
    //     description: String,
    //     phone: Number,
    //     openTime: String,
    //   },
    // ],
  },
});
</script>

<template>
  <div
    class="card shadow024 px-6 pt-5 pb-6 rounded-8px lg:flex-shrink-0"
    v-for="card in cardData"
    :key="card.id"
  >
    <div class="relative inline-block mb-2">
      <img :src="card.photoSrc" class="object-cover w-[305px] h-[210px]" />
      <div
        class="absolute top-2 right-2 flex items-center justify-center w-10 h-10 bg-white border-[#28DAA5] rounded-full border-1 border-solid"
      >
        <img :src="favoriteImg" alt="heart" />
      </div>
    </div>
    <h3 class="pb-1 text-[#434343] text-[24px] font-700 truncate">
      {{ card.title }}
    </h3>
    <satisfaction :startNum="card.startNum"></satisfaction>
    <div class="pt-2 gap-2 flex">
      <button v-for="(tag, index) in card.tagText" :key="index" class="tag">
        {{ tag }}
      </button>
    </div>
  </div>
</template>

<style>
.card {
  max-width: 354px;
}
.shadow024 {
  box-shadow: 0px 4px 10px 0px #80808033;
}
</style>

