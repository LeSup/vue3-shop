<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <img src="@/assets/images/logo_white.png" alt="vmall" />
      </div>
      <div class="search">
        <div class="icon">
          <SearchIcon :size="16"></SearchIcon>
        </div>
        <div class="text" v-show="state.hotWords.length">{{ state.hotWords[state.currentHotIdx]?.word }}</div>
      </div>
      <div class="message">
        <MessageIcon :size="24"></MessageIcon>
      </div>
      <div class="login">
        <RouterLink to="/">登录</RouterLink>
      </div>
    </div>
    <div class="nav">
      <ul class="category-list">
        <li v-for="item of state.hotCategories" :key="item" class="category">
          <div class="text">{{ item }}</div>
        </li>
      </ul>
    </div>
    <div class="bg">
      <div class="ads">
        <Swipe class="swipe" :autoplay="3000" indicator-color="white">
          <SwipeItem v-for="item of state.ads" :key="item.id">
            <div class="ad-wrapper">
              <img :src="item.imgUrl" :alt="item.title" />
            </div>
          </SwipeItem>
      </Swipe>
      </div>
      <div class="grids">
        <div class="container">
          <div class="scroll" ref="scrollRef" @scroll="handleScroll">
            <div class="content">
              <div class="grid-group" v-for="(grids, index) of icon_grids" :key="index">
                <div class="grid-item" v-for="grid of grids" :key="grid.id">
                  <img class="image" :src="grid.imgUrl" :alt="grid.title" />
                  <p class="text">{{ grid.title }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div>
          <div class="slider">
            <div class="slide" ref="slideRef" :style="{width: `${state.slideWidth}px`}"></div>
          </div>
        </div>
      </div>
    </div>
    <div class="grandCeremony">
      <img src="@/assets/images/grand_ceremony.gif" alt="" />
    </div>
    <div class="userPerson">
      <img src="@/assets/images/new_person.png" alt="" />
    </div>
    <Card class="qualityPrds" name="甄选推荐">
      <Swipe :autoplay="3000">
        <SwipeItem v-for="item of state.qualityPrds" :key="item.prdId">
          <div class="prd">
            <img :src="item.photoPath + item.photoName" :alt="item.prdName" />
            <div class="info">
              <div class="name">{{ item.prdName }}</div>
              <div class="box">
                <div class="desc">
                  <div class="promotion">{{ item.prdPromotion }}</div>
                  <div class="price">
                    <div class="sale">￥{{ item.salePrice }}</div>
                    <div class="origin" v-if="item.originPrice">￥{{ item.originPrice }}</div>
                  </div>
                </div>
                <div class="button">{{ item.buyBottonText }}</div>
              </div>
            </div>
          </div>
        </SwipeItem>
      </Swipe>
    </Card>
    <Card class="prds" name="手机专区" v-if="state.phonePrds.length">
      <div class="content">
        <div class="prd" v-for="item of state.phonePrds" :key="item.prdId">
          <div class="image">
            <img :src="item.photoPath + item.photoName" :alt="item.prdName" />
          </div>
          <div class="desc">
            <div class="name">{{ item.prdName }}</div>
            <div class="discounts">
              <div class="discount" v-for="prom of item.activityPromInfoList" :key="prom.promotionWords">{{ prom.promotionWords }}</div>
            </div>
            <div class="price">
              <div class="sale">{{ getPrdPrice(item, 'sale') }}</div>
              <div class="origin">{{ getPrdPrice(item, 'origin') }}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <Card class="prds" name="电脑专区" v-if="state.computePrds.length">
      <div class="content">
        <div class="prd" v-for="item of state.computePrds" :key="item.prdId">
          <div class="image">
            <img :src="item.photoPath + item.photoName" :alt="item.prdName" />
          </div>
          <div class="desc">
            <div class="name">{{ item.prdName }}</div>
            <div class="discounts">
              <div class="discount" v-for="prom of item.activityPromInfoList" :key="prom.promotionWords">{{ prom.promotionWords }}</div>
            </div>
            <div class="price">
              <div class="sale">{{ getPrdPrice(item, 'sale') }}</div>
              <div class="origin">{{ getPrdPrice(item, 'origin') }}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <Card class="prds" name="平板专区" v-if="state.ipadPrds.length">
      <div class="content">
        <div class="prd" v-for="item of state.ipadPrds" :key="item.prdId">
          <div class="image">
            <img :src="item.photoPath + item.photoName" :alt="item.prdName" />
          </div>
          <div class="desc">
            <div class="name">{{ item.prdName }}</div>
            <div class="discounts">
              <div class="discount" v-for="prom of item.activityPromInfoList" :key="prom.promotionWords">{{ prom.promotionWords }}</div>
            </div>
            <div class="price">
              <div class="sale">{{ getPrdPrice(item, 'sale') }}</div>
              <div class="origin">{{ getPrdPrice(item, 'origin') }}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
    <BackTop></BackTop>
    <Tabbar></Tabbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, watch, computed, ref, nextTick } from 'vue'
import { RouterLink } from 'vue-router'
import { Swipe, SwipeItem, BackTop } from 'vant'
import Tabbar from '@/components/tabbar/index.vue'
import Card from '@/components/card/index.vue'
import MessageIcon from '@/icons/message.vue'
import SearchIcon from '@/icons/search.vue'
import { getHotWords, getHotCategories, getHomeInfos } from '@/service/home'

const scrollRef = ref<HTMLDivElement>()
const slideRef = ref<HTMLDivElement>()

const state = reactive<{
  hotCategories: string[];
  hotWords: API.HotWord[];
  currentHotIdx: number;
  slideWidth: number;
} & API.HomeInfos>({
  hotCategories: [],
  hotWords: [],
  currentHotIdx: 0,
  ads: [],
  grids: [],
  slideWidth: 0,
  qualityPrds: [],
  phonePrds: [],
  computePrds: [],
  ipadPrds: []
})

let slideRatio = 0

onMounted(async () => {
  state.hotWords = await getHotWords()
  state.hotCategories = await getHotCategories()

  const { ads, grids, qualityPrds, phonePrds, computePrds, ipadPrds } = await getHomeInfos()
  state.ads = ads || []
  state.grids = grids || []
  state.qualityPrds = qualityPrds || []
  state.phonePrds = phonePrds?.slice(0, 4) || []
  state.computePrds = computePrds?.slice(0, 2) || []
  state.ipadPrds = ipadPrds?.slice(0, 2) || []

  nextTick(() => {
    const scrollVal = scrollRef.value;
    slideRatio = (scrollVal?.clientWidth || 0) / (scrollVal?.children?.[0]?.clientWidth || 1)
    state.slideWidth = slideRatio * 40
  })
})

const icon_grids = computed(() => {
  const grids = state.grids
  const len = Math.ceil(grids.length / 2)
  return [
    grids.slice(0, len),
    grids.slice(len)
  ]
})

let timer: undefined | number = undefined
watch(() => state.hotWords, (val, old, onCleanup) => {
  onCleanup(() => {
    clearInterval(timer)
  })

  const len = val.length;
  if (len) {
    timer = setInterval(() => {
      if (state.currentHotIdx >= len - 1) {
        state.currentHotIdx = 0
      } else {
        state.currentHotIdx++
      }
    }, 5000)
  }
})

function handleScroll(e: any) {
  const target = e.target!
  const translateX = 40 * (target.scrollLeft || 0) / (target.scrollWidth || 1)
  slideRef.value!.style.transform = `translate3d(${translateX}px, 0, 0)`
}

function getPrdPrice(item: Product, type: 'sale' | 'origin'): string {
  let str = '￥'
  let isSale = type === 'sale'
  str += (isSale ? item.salePrice :item.originPrice) || 0
  if (isSale && item.priceEndWithQi === '1') {
    str += '起'
  }
  return str
}
</script>

<style scoped lang="less">
.home {
  padding-top: 58px;
  padding-bottom: 64px;
  background: rgb(241, 243, 245) url(/uomcdn/CN/cms/202306/227430D9F26863A8D1F432ADF1223895.png) no-repeat 0 0 / 100% auto;
  .header {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    .flex(space-between);
    height: 58px;
    padding: 0 16px;
    background: url(/uomcdn/CN/cms/202306/227430D9F26863A8D1F432ADF1223895.png) no-repeat 0 0 / 100% auto;
    z-index: 99;
   
    .logo {
      width: 80px;
      height: 24px;
      img {
        display: block;
        .square(100%);
      }
    }
    .search {
      .flex();
      width: 163px;
      height: 40px;
      padding: 0 16px;
      border-radius: 40px;
      background: rgba(255, 255, 255);
      opacity: 0.6;
      .icon {
        .square(16px);
        margin-right: 8px;
      }
      .text {
        flex: 1 1 0%;
        font-size: 14px;
        .ellipsis();
      }
    }
    .message {
      .square(24px);
    }
    .login {
      font-size: 14px;
      line-height: 18px;
      a {
        color: rgba(0, 0, 0);
      }
    }
  }

  .nav {
    padding: 4px 16px 4px 0;
    overflow-x: auto;
    overflow-y: hidden;
    &::-webkit-scrollbar {
      display: none;
    }
    .category-list {
      display: flex;
      width: max-content;
      .category {
        flex: 0 0 auto;
        margin-left: 14px;
        padding: 6px 8px;
        background: rgba(255, 255, 255, 0.2);
        border-radius: 14px;
        .text {
          font-size: 12px;
          line-height: 16px;
          color: rgba(0, 0, 0);
          opacity: 0.9;
        }
      }
    }
  }

  .bg {
    width: 100%;
    background: url(/uomcdn/CN/cms/202306/7E13AF68368B06305346E59CB7445BE0.png) no-repeat 0 0 / 100% 100%;
  }
  .ads {
    margin-top: 8px;
    height: calc((100vw - 32px) * 0.425);
    .ad-wrapper {
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

  .grids {
    margin-top: 8px;
    padding: 0 16px;
    .container {
      overflow: hidden;
      .scroll {
        overflow-y: hidden;
        overflow-x: auto;
        &::-webkit-scrollbar {
          display: none;
        }
        .content {
          width: max-content;
          .grid-group {
            .flex();
            width: max-content;
            .grid-item {
              .flex(center);
              flex-direction: column;
              .image {
                .square(48px);
              }
              .text {
                margin: 4px 0;
                width: calc((100vw - 32px) / 5);
                font-size: 12px;
                color: rgba(255, 255, 255);
                text-align: center;
                .ellipsis();
                -webkit-line-clamp: 2;
              }
            }

            &:first-child {
              margin-bottom: 8px;
            }
          }
        }
      }
    }
    .slider {
      margin: 6px auto;
      width: 40PX;
      height: 4PX;
      border-radius: 3PX;
      background-color: rgba(0, 0, 0, 0.2);
      .slide {
        height: 4PX;
        border-radius: 3PX;
        background-color: rgba(255, 255, 255);
      }
    }
  }

  .grandCeremony {
    margin-top: 8px;
    img {
      display: block;
      width: 100%;
    }
  }

  .userPerson {
    margin-top: 8px;
    padding: 0 16px;
    img {
      display: block;
      width: 100%;
    }
  }

  .qualityPrds {
    position: relative;
    margin: 8px 16px 0;
    :deep(.title) {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      z-index: 1;
    }
    .prd {
      padding-bottom: 26px;
      img {
        display: block;
        width: 100%;
        height: calc((100vw - 32px) * 0.667);
      }
      .info {
        margin: 8px 12px 0;
        .name {
          height: 22px;
          font-size: 16px;
          font-weight: bold;
          line-height: 21px;
          .ellipsis();
        }
        .box {
          .flex(flex-start, flex-end);
          .desc {
            flex: 1;
            .promotion {
              margin-top: 2px;
              height: 16px;
              font-size: 12px;
              line-height: 16px;
              .ellipsis();
            }
            .price {
              .flex();
              flex-direction: row;
              margin-top: 8px;
              height: 20px;
              font-size: 14px;
              line-height: 20px;
              .sale {
                margin-right: 4px;
                font-weight: 600;
              }
              .origin {
                text-decoration: line-through;
                opacity: 0.6;
              }
            }
          }
          .button {
            padding: 0 8px;
            min-width: 84px;
            height: 28px;
            line-height: 28px;
            font-size: 12px;
            font-weight: 600;
            text-align: center;
            border-radius: 14px;
            background-color: rgba(0, 0, 0, 0.05);
          }
        }
      }
    }
    :deep(.van-swipe__indicators) {
      bottom: 12px;
      --van-swipe-indicator-active-background: rgb(207, 10, 44);
    }
  }

  .prds {
    margin: 8px 16px 0;
    .content {
      .flex();
      flex-wrap: wrap;
      padding: 0 12px;
      .prd {
        .flex(center);
        flex-direction: column;
        width: calc(50% - 4px);
        &:nth-child(2n) {
          margin-left: 8px;
        }
        .image {
          padding-top: 8px;
          .flex(center);
          img {
            display: block;
            .square(123px);
          }
        }
        .desc {
          .flex(center);
          flex-direction: column;
          padding: 4px 8px 8px;
          width: 100%;
          .name {
            font-size: 13px;
            font-weight: bold;
            line-height: 18px;
            text-align: center;
            .ellipsis();
          }
          .discounts {
            .flex(center);
            flex-wrap: wrap;
            width: 100%;
            height: 14px;
            overflow: hidden;
            .discount {
              margin-right: 4px;
              padding: 0 2px;
              height: 14px;
              line-height: 14px;
              font-size: 9px;
              color: rgb(207, 10, 44);
              border: 1px solid rgba(226, 0, 36, 0.4);
              border-radius: 4px;
              .ellipsis();
            }
          }
          .price {
            .flex(center);
            margin-top: 4px;
            height: 20px;
            font-size: 14px;
            .sale {
              margin-right: 4px;
              font-weight: bold;
            }
            .origin {
              font-size: 10px;
              color: rgba(0, 0, 0, 0.5);
              text-decoration: line-through;
            }
          }
        }
      }
    }
  }
}
</style>