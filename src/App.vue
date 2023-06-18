<script setup lang="ts">
import { RouterView } from 'vue-router'
import { ConfigProvider } from 'vant'
import type { ConfigProviderThemeVars } from 'vant'

const themeVars: ConfigProviderThemeVars = {
  tabbarHeight: '55px',
  tabbarItemActiveColor: 'rgb(207, 10, 44)',
  sidebarBackground: 'rgb(241, 243, 245)',
  sidebarSelectedBackground: 'rgb(241, 243, 245)',
  sidebarSelectedTextColor: 'rgb(207, 10, 44)',
  sidebarSelectedBorderWidth: '2px',
  sidebarSelectedBorderColor: 'rgb(207, 10, 44)'
};

</script>

<template>
  <ConfigProvider :theme-vars="themeVars">
    <RouterView />
  </ConfigProvider>
</template>

<style scoped>
</style>
