<template>
  <div class="home">
    <div class="header">
      <div class="logo">
        <img src="@/assets/images/logo_white.png" alt="vmall" />
      </div>
      <Search></Search>
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
        <Swiper :data="state.ads"></Swiper>
      </div>
      <div class="grids">
        <SliderCard :data="state.grids"></SliderCard>
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
import { onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import { Swipe, SwipeItem, BackTop } from 'vant'
import Tabbar from '@/components/tabbar/index.vue'
import Search from '@/components/search/index.vue'
import Swiper from '@/components/swiper/index.vue'
import SliderCard from '@/components/sliderCard/index.vue'
import Card from '@/components/card/index.vue'
import MessageIcon from '@/icons/message.vue'
import {  getHotCategories, getHomeInfos } from '@/service/home'

const state = reactive<{
  hotCategories: string[];
  slideWidth: number;
} & Required<API.HomeInfos>>({
  hotCategories: [],
  ads: [],
  grids: [],
  slideWidth: 0,
  qualityPrds: [],
  phonePrds: [],
  computePrds: [],
  ipadPrds: []
})

onMounted(async () => {
  state.hotCategories = await getHotCategories()

  const { ads, grids, qualityPrds, phonePrds, computePrds, ipadPrds } = await getHomeInfos()
  state.ads = ads || []
  state.grids = grids || []
  state.qualityPrds = qualityPrds || []
  state.phonePrds = phonePrds?.slice(0, 4) || []
  state.computePrds = computePrds?.slice(0, 2) || []
  state.ipadPrds = ipadPrds?.slice(0, 2) || []
})

function getPrdPrice(item: API.Product, type: 'sale' | 'origin'): string {
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
    gap: 16px;
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
    .message {
      .square(24px);
    }
    .login {
      font-size: 14px;
      line-height: 18px;
      a {
        color: #FFFFFF;
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
          color: #FFFFFF;
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
  }

  .grids {
    margin-top: 8px;
    padding: 0 16px;
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