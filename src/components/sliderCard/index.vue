<template>
  <div class="sc">
    <div class="sc-container">
      <div class="scroll" ref="scrollRef" @scroll="handleScroll">
        <div class="sc-content">
          <div class="row" v-for="(column, index) of rows" :key="index">
            <div class="item" v-for="item of column" :key="item.imgUrl">
              <div class="img-wrapper">
                <img :src="item.imgUrl" :alt="item.title" />
              </div>
              <div class="sc-text">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <div class="sc-slider">
        <div class="sc-slide" ref="slideRef" :style="{width: `${slideWidth}px`}"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { watchEffect, computed, ref, nextTick } from 'vue'

const scrollRef = ref<HTMLDivElement>()
const slideRef = ref<HTMLDivElement>()
const slideWidth = ref<number>(0)

const props = withDefaults(defineProps<{ data: API.Img[] }>(), { data: () => [] })

const rows = computed(() => {
  const grids = props.data
  const len = Math.ceil(grids.length / 2)
  return [
    grids.slice(0, len),
    grids.slice(len)
  ]
})

watchEffect(() => {
  if (props.data.length) {
    nextTick(() => {
      const scrollVal = scrollRef.value;
      const slideRatio = (scrollVal?.clientWidth || 0) / (scrollVal?.children?.[0]?.clientWidth || 1)
      slideWidth.value = slideRatio * 40
    })
  }
})

function handleScroll(e: any) {
  const target = e.target!
  const translateX = 40 * (target.scrollLeft || 0) / (target.scrollWidth || 1)
  slideRef.value!.style.transform = `translate3d(${translateX}px, 0, 0)`
}

</script>

<style scoped lang="less">
.sc-container {
  overflow: hidden;
  .scroll {
    overflow-y: hidden;
    overflow-x: auto;
    &::-webkit-scrollbar {
      display: none;
    }
  }
}

.sc-content {
  width: max-content;
  .row {
    display: flex;
    width: max-content;
    .item {
      .flex();
      flex-direction: column;
      .img-wrapper {
        .square-img(48px);
      }
    }

    &:first-child {
      margin-bottom: 8px;
    }
  }
}

.sc-text {
  margin: 4px 0;
  width: calc((100vw - 32px) / 5);
  font-size: 12px;
  color: rgba(255, 255, 255);
  text-align: center;
  .line-clamp();
}

.sc-slider {
  margin: 6px auto;
  width: 40PX;
  height: 4PX;
  border-radius: 3PX;
  background-color: rgba(0, 0, 0, 0.2);
}
.sc-slide {
  height: 4PX;
  border-radius: 3PX;
  background-color: rgba(255, 255, 255);
}
</style>