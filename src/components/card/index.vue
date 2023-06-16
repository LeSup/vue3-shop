<template>
  <div class="card">
    <Title :name="props.name"></Title>
    <slot></slot>
  </div>
</template>

<script setup lang="ts">
import Title from '../title/index.vue'

const props = defineProps<{ name: string }>()
</script>

<style scoped lang="less">
.card {
  padding: 4px 0;
  background-color: rgba(255, 255, 255);
  border-radius: 16px;
  overflow: hidden;
}
</style>