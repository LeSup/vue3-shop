<template>
  <div class="mine">
    <div class="personal">
      <div class="operate">
        <SettingIcon></SettingIcon>
        <MessageIcon></MessageIcon>
      </div>
      <div class="user">
        <div class="avatar">
          <img :src="avatar" alt="" />
        </div>
        <div class="profile">
          <div class="name">{{ '登录/注册' }}</div>
          <div class="medal">
            <img src="@/assets/images/medal-silver.png" alt="" />
          </div>
        </div>
      </div>
      <div class="property">
        <div class="list">
          <div class="item">
            <div class="count">- -</div>
            <div class="name">
              <div class="text">积分</div>
              <RightArrow :width="7" :height="7" fill="#fff" :fill-opacity="0.6"></RightArrow>
            </div>
          </div>
          <Divider vertical :hairline="false"></Divider>
          <div class="item">
            <div class="count">- -</div>
            <div class="name">
              <div class="text">优惠券</div>
              <RightArrow :width="7" :height="7" fill="#fff" :fill-opacity="0.6"></RightArrow>
            </div>
          </div>
          <Divider vertical></Divider>
          <div class="item">
            <div class="count">- -</div>
            <div class="name">
              <div class="text">代金券</div>
              <RightArrow :width="7" :height="7" fill="#fff" :fill-opacity="0.6"></RightArrow>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="content">
      <div class="card order">
        <div class="title">
          <div class="name">我的订单</div>
          <div class="action">
            <div class="text">全部订单</div>
            <RightArrow></RightArrow>
          </div>
        </div>
        <div class="list">
          <div class="item">
            <WalletIcon :size="40"></WalletIcon>
            <div class="desc">
              <div class="text">待付款</div>
            </div>
          </div>
          <div class="item">
            <DeliveryIcon :size="40"></DeliveryIcon>
            <div class="desc">
              <div class="text">待收货</div>
            </div>
          </div>
          <div class="item">
            <EvaluateIcon :size="40"></EvaluateIcon>
            <div class="desc">
              <div class="text">待评价</div>
            </div>
          </div>
          <div class="item">
            <MoneyIcon :size="40"></MoneyIcon>
            <div class="desc">
              <div class="text">退换退款</div>
            </div>
          </div>
          <div class="item">
            <RecycleIcon :size="40"></RecycleIcon>
            <div class="desc">
              <div class="text">回收单</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card promotions" v-if="state.promotions.length">
        <div class="list">
          <div class="item" v-for="item of state.promotions" :key="item.imgUrl">
            <div class="img-wrapper">
              <img :src="item.imgUrl" :alt="item.title" />
            </div>
            <div class="desc">
              <div class="text">{{ item.title }}</div>
            </div>
          </div>
        </div>
      </div>
      <div class="card tools" v-if="state.tools.length">
        <SliderCard :data="state.tools"></SliderCard>
      </div>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted,  reactive, computed } from 'vue'
import { Divider } from 'vant'
import Tabbar from '@/components/tabbar/index.vue'
import SliderCard from '@/components/sliderCard/index.vue'
import SettingIcon from '@/icons/setting.vue'
import MessageIcon from '@/icons/message.vue'
import RightArrow from '@/icons/rightArrow.vue'
import WalletIcon from '@/icons/wallet.vue'
import DeliveryIcon from '@/icons/delivery.vue'
import EvaluateIcon from '@/icons/evaluate.vue'
import MoneyIcon from '@/icons/money.vue'
import RecycleIcon from '@/icons/recycle.vue'
import useUser from '@/stores/user'
import { getMine } from '@/service/mine'
import defaultAvatar from '@/assets/images/avatar.png'

const state = reactive<Required<API.MineInfo>>({
  promotions: [],
  tools: []
})
const user = useUser()

const avatar = computed(() => {
  return user.avatar || defaultAvatar
})

onMounted(async () => {
  const { promotions, tools } = await getMine()
  state.promotions = promotions || []
  state.tools = tools || []
})
</script>

<style scoped lang="less">
.mine {
  margin-bottom: 12px;
  padding-bottom: 56px;
  min-height: calc(100vh - 56px);
  background: rgb(241, 243, 245);
}
.personal {
  padding: 0 16px;
  width: 100vw;
  height: calc(100vw * 0.53);
  background: url(@/assets/images/head_bg_new.png) no-repeat 0 0 / 100% 100%;
  overflow: hidden;
}
.operate {
  .flex(flex-end);
  column-gap: 12px;
  margin-top: 16px;
  height: 26px;
}
.user {
  .flex();
}
.avatar {
  .square-img(48px);
}
.profile {
  .flex(flex-start, flex-start);
  margin-left: 8px;
  padding-top: 4px;
  height: 48px;
  .name {
    margin-right: 3px;
    line-height: 21px;
    font-size: 16px;
    font-weight: 600;
    color: #fff;
  }
  .medal {
    .square-img(20px);
  }
}

.property {
  margin-top: 12px;
  .list {
    .flex(space-evenly);
    padding: 0 20px;
    .item {
      flex: 1;
      .count {
        line-height: 19px;
        font-size: 14px;
        font-weight: 600;
        text-align: center;
        color: #fff;
      }
      .name {
        .flex(center);
        .text {
          margin-right: 4px;
          line-height: 16px;
          font-size: 12px;
          color: #fff;
          opacity: 0.6;
        }
      }
    }
    :deep(.van-divider) {
      margin: 6px 0 0;
      height: 16px;
      opacity: 0.2;
    }
  }
}
.content {
  margin-top: -44px;
  .card {
    margin: 0 16px;
    border-radius: 16px;
    background-color: #fff;
    overflow: hidden;
  }
  .order {
    .title {
      .flex(space-between, flex-start);
      margin: 4px 12px 0;
      height: 40px;
      .name {
        margin-top: 11px;
        font-size: 16px;
        font-weight: 500;
        line-height: 21px;
        color: #000;
      }
      .action {
        .flex();
        margin-top: 9px;
        .text {
          margin-top: 2px;
          margin-right: 4px;
          line-height: 19px;
          font-size: 14px;
          font-weight: 600;
          opacity: 0.6;
          color: #000;
        }
      }
    }
    .list {
      .flex(space-around);
      margin-bottom: 16px;
      padding: 0 8px;
      .item {
        flex: 1;
        .flex(center);
        flex-direction: column;
        .desc {
          width: 100%;
          text-align: center;
          .text {
            margin-top: 2px;
            font-size: 12px;
            line-height: 16px;
            .line-clamp();
          }
        }
      }
    }
  }
  .promotions {
    margin-top: 12px;
    .list {
      .flex(flex-start, flex-start);
      flex-wrap: wrap;
      margin-top: 4px;
      .item {
        .flex();
        flex-direction: column;
        padding-top: 8px;
        width: 20%;
        .img-wrapper {
          .square-img(48px);
        }
        .desc {
          width: 100%;
          text-align: center;
          .text {
            margin: 4px 0;
            font-size: 12px;
            line-height: 16px;
            opacity: 0.9;
            .line-clamp();
          }
        }
      }
    }
  }

  .tools {
    margin-top: 12px;
    padding-top: 12px;
    :deep(.sc-text) {
      color: #000;
      opacity: 0.9;
    }
    :deep(.sc-slide) {
      background-color: rgb(207, 10, 44);
    }
  }
}
</style>
