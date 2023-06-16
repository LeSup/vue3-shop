<template>
  <div class="title">
    <div class="name">{{ props.name }}</div>
    <div class="action">
      <span>更多</span>
      <RightArrow></RightArrow>
    </div>
  </div>
</template>

<script setup lang="ts">
import RightArrow from '@/icons/rightArrow.vue'
const props = defineProps<{ name: string }>()
</script>

<style scoped lang="less">
.title {
  .flex();
  padding: 0 12px;
  height: 40px;
  .name {
    flex: 1 1 0%;
    margin-right: 8px;
    font-size: 16px;
    font-weight: bold;
    line-height: 21px;
    .ellipsis();
  }
  .action {
    .flex();
    font-size: 14px;
    line-height: 19px;
    opacity: 0.6;
  }
}
</style>