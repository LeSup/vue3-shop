<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'vant'
import type { ConfigProviderThemeVars } from 'vant'

const themeVars: ConfigProviderThemeVars = {
  tabbarHeight: '55px',
  tabbarItemActiveColor: 'rgb(207, 10, 44)'
};

</script>

<template>
  <ConfigProvider :theme-vars="themeVars">
    <RouterView />
  </ConfigProvider>
</template>

<style scoped>
</style>
