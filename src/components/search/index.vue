<template>
  <div class="search">
    <SearchIcon :size="16"></SearchIcon>
    <div class="text" v-show="state.hotWords.length">{{ state.hotWords[state.currentIdx]?.word }}</div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch } from 'vue'
import SearchIcon from '@/icons/search.vue'
import { getHotWords } from '@/service/home'

const state = reactive<{
  hotWords: API.HotWord[];
  currentIdx: number;
}>({
  hotWords: [],
  currentIdx: 0
})

onMounted(async () => {
  state.hotWords = await getHotWords()
})

let timer: undefined | number = undefined
watch(() => state.hotWords, (val, old, onCleanup) => {
  onCleanup(() => {
    clearInterval(timer)
  })

  const len = val.length;
  if (len) {
    timer = setInterval(() => {
      if (state.currentIdx >= len - 1) {
        state.currentIdx = 0
      } else {
        state.currentIdx++
      }
    }, 5000)
  }
})

</script>

<style scoped lang="less">
.search {
  .flex();
  
  flex: 1 1 auto;
  padding: 0 16px;
  height: 40px;
  gap: 8px;
  border-radius: 40px;
  background: rgba(255, 255, 255);
  opacity: 0.6;
  .text {
    flex: 1 1 0%;
    font-size: 14px;
    .ellipsis();
  }
}
</style>