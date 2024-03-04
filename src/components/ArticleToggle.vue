<template>
  <div class="ArticleToggle">
    <pre class="whitespace-pre-line break-all">
      {{ displayContent }}
    </pre>
    <button
      v-if="isEllipsis"
      class="btn btn-secondary cursor-pointer mt-3 mx-auto block py-2"
      @click="isCollapsed = false"
    >
      顯示全部
    </button>
    <slot v-else></slot>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
const props = defineProps({
  content: {
    type: String,
    default: "",
  },
  maxSummaryWordCount: {
    type: Number,
    default: 100,
  },
});

const isCollapsed = ref(true);
const isContentOverflow = computed(
  () => props.content.length > props.maxSummaryWordCount
);
const isEllipsis = computed(() => isCollapsed.value && isContentOverflow.value);
const displayContent = computed(() => {
  return isEllipsis.value
    ? props.content.slice(0, props.maxSummaryWordCount) + "…"
    : props.content;
});
</script>

<style lang="scss">
.ArticleToggle {
}

// xl | lg | md | sm
// @screen xl {}
</style>