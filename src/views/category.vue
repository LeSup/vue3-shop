<template>
  <div class="category">
    <div class="header">
      <Search></Search>
      <MessageIcon :size="24" fill="#000000"></MessageIcon>
    </div>
    <div class="main">
      <Sidebar v-model="state.idx">
        <SidebarItem v-for="item of state.categories" :key="item.categoryId" :title="item.categoryName"></SidebarItem>
      </Sidebar>
      <div class="content">
        <template v-if="category">
          <div class="swiper-container">
            <Swiper :data="toImg(state.productMap[category.configInfo.dataSourceList[0].dataSourceCode] as API.AdImg[])"></Swiper>
          </div>
          <div class="cards">
            <div class="card" v-for="item of category.subCategoryList" :key="item.categoryId">
              <div class="title">{{ item.categoryName }}</div>
              <div class="prds">
                <div class="prd" v-for="prd of (state.productMap[item.configInfo.dataSourceList[0].dataSourceCode] as API.Product[])" :key="prd.prdId">
                  <div class="img-wrapper">
                    <img :src="prd.photoPath + prd.photoName" :alt="prd.prdName" />
                  </div>
                  <div class="name">{{ prd.prdName }}</div>
                </div>
              </div>
            </div>
          </div>
        </template>
      </div>
    </div>
    <Tabbar></Tabbar>
  </div>
</template>

<script setup lang="ts">
import { onMounted, reactive, computed } from 'vue'
import { Sidebar, SidebarItem } from 'vant'
import Tabbar from '@/components/tabbar/index.vue'
import Search from '@/components/search/index.vue'
import Swiper from '@/components/swiper/index.vue'
import MessageIcon from '@/icons/message.vue'
import { getCategories, getProductMap } from '@/service/category'

const state = reactive<{
  categories: API.Category[];
  productMap: API.DataMap;
  idx: number;
}>({
  categories: [],
  productMap: {},
  idx: 0
})

onMounted(async () => {
  state.categories = await getCategories()
  state.productMap = await getProductMap(getCode(state.categories.slice(0, 1)))
  state.productMap = Object.assign(
    state.productMap,
    await getProductMap(getCode(state.categories.slice(1)))
  )
  console.log('state.productMap', state.productMap)
})

const category = computed(() => state.categories[state.idx])

function getCode(data: API.Category[]): string[] {
  const code: string[] = []
  data.forEach(item => {
    item.configInfo.dataSourceList.forEach(i => code.push(i.dataSourceCode))
    if (item.subCategoryList) {
      code.push(...getCode(item.subCategoryList))
    }
  })
  return code
}

function toImg(data: API.AdImg[]): API.Img[] {
  return data?.map(item => ({ imgUrl: item.adImgUrl, title: item.adTitle }))
}

</script>

<style scoped lang="less">
.category {
  padding-bottom: 56px;
  background: rgb(241, 243, 245);
  .header {
    .flex();
    padding: 0 16px;
    height: 58px;
    gap: 16px;
  }

  .main {
    .flex(flex-start, flex-start);
    height: calc(100vh - 114px);
    :deep(.van-sidebar) {
      width: 23.3%;
      height: 100%;
      &::-webkit-scrollbar {
        display: none;
      }
    }

    .content {
      flex: 1;
      padding-top: 8px;
      height: 100%;
      overflow-y: auto;

      &::-webkit-scrollbar {
        display: none;
      }

      .swiper-container {
        margin-bottom: 12px;
      }

      .cards {
        padding: 0 16px;
        .card {
          padding: 4px 0 12px;
          margin-bottom: 12px;
          border-radius: 16px;
          background-color: rgba(255, 255, 255);
          .title {
            padding: 0 12px;
            height: 36px;
            line-height: 36px;
            font-size: 14px;
            font-weight: bold;
            .ellipsis();
          }
          .prds {
            .flex(flex-start, flex-start);
            flex-wrap: wrap;
            padding: 0 12px;
            column-gap: 12px;
            .prd {
              margin-top: 8px;
              width: calc(33.33% - 8px);
              .img-wrapper {
                position: relative;
                margin-bottom: 4px;
                padding-bottom: 100%;
                width: 100%;
                height: 0;
                img {
                  position: absolute;
                  top: 0;
                  left: 0;
                  right: 0;
                  bottom: 0;
                  padding: 8px;
                  .square(100%);
                }
              }
              .name {
                font-size: 11px;
                text-align: center;
                .line-clamp();
              }
            }
          }
        }
      }
    }
  }
}
</style>