<template>
  <div class="cart">
    <div class="header">
      <div class="title">购物车</div>
    </div>
    <div class="main">
      <Empty image-size="96" description="您的购物车没有商品">
        <template #image>
          <ShoppingCart></ShoppingCart>
        </template>
        <Button round class="shopping">去购物</Button>
      </Empty>
    </div>
    <tabbar></tabbar>
  </div>
</template>

<script setup lang="ts">
import { Empty, Button } from 'vant'
import Tabbar from '@/components/tabbar/index.vue'
import ShoppingCart from '@/icons/shoppingCart.vue'
import useUser from '@/stores/user'

const user = useUser()
</script>

<style scoped lang="less">
.cart {
  background: rgb(241, 243, 245);
}
.header {
  .flex();
  padding: 0 16px;
  height: 56px;
}
.title {
  padding-left: 8px;
  font-size: 24px;
  font-weight: 500;
}
.main {
  height: calc(100vh - 112px);
  overflow: hidden;
}
.shopping {
  width: 120px;
  height: 40px;
  background: #cf0a2c;
  color: #fff;
}
</style>