<template>
  <div class="tabbar">
    <Tabbar route>
      <TabbarItem to="/home" :icon="homeIcon">首页</TabbarItem>
      <TabbarItem to="/category" :icon="categoryIcon">分类</TabbarItem>
      <TabbarItem to="/cart" :icon="cartIcon">购物车</TabbarItem>
      <TabbarItem to="/mine" :icon="userIcon">我的</TabbarItem>
    </Tabbar>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { Tabbar, TabbarItem } from 'vant'

const route = useRoute()

const homeIcon = computed(() => {
  return route.path === '/home' ? 'wap-home' : 'wap-home-o'
})

const categoryIcon = computed(() => {
  return route.path === '/category' ? 'bag' : 'bag-o'
})

const cartIcon = computed(() => {
  return route.path === '/cart' ? 'shopping-cart' : 'shopping-cart-o'
})

const userIcon = computed(() => {
  return route.path === '/mine' ? 'manager' : 'manager-o'
})
</script>
