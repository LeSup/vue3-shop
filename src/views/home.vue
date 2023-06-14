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
        <div class="text">nova 11</div>
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
    <tabbar></tabbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive } from 'vue'
import { RouterLink } from 'vue-router'
import Tabbar from '@/components/tabbar/index.vue'
import MessageIcon from '@/icons/message.vue'
import SearchIcon from '@/icons/search.vue'
import { getHotCategories } from '@/service/home'

const state = reactive<{ hotCategories: string[] }>({ hotCategories: [] })

onMounted(async () => {
  state.hotCategories = await getHotCategories()
  console.log('state.hotCategories', state.hotCategories)
})
</script>

<style scoped lang="less">
.home {
  background: url(@/assets/images/618.webp) repeat 0 0 / 100% auto;
  .header {
    .flex(space-between);

    height: 58px;
    padding: 0 16px;
   
    .logo {
      width: 80px;
      height: 24px;
      img {
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
}
</style>