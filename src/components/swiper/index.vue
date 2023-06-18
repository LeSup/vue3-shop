<template>
  <div class="swiper">
    <div class="content">
      <Swipe :autoplay="3000" indicator-color="white">
        <SwipeItem v-for="item of props.data" :key="item.imgUrl">
          <div class="wrapper">
            <img :src="item.imgUrl" :alt="item.title" />
          </div>
        </SwipeItem>
      </Swipe>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Swipe, SwipeItem } from 'vant'
const props = withDefaults(
  defineProps<{
    data: API.Img[];
  }>(),
  {
    data: () => []
  }
)
</script>

<style scoped lang="less">
.swiper {
  position: relative;
  width: 100%;
  height: 0;
  padding-bottom: calc((100% - 32px) * 0.428);
  .content {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    .wrapper {
      padding: 0 16px;
      height: 100%;
      img {
        display: block;
        width: 100%;
        height: 100%;
        border-radius: 16px;
      }
    }
  }
}
</style>