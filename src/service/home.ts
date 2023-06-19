import { get } from '@/utils/request'
import { getPageInfo } from './common'

const Code = '0'
const InSearchBox = 1

export async function getHotWords(): API.HotWord[] {
  const { code, hotWordList } = await get('/mcp/queryHotWord?1686815211759', {
    _: 1686815211759
  })

  if (code === Code) {
    return hotWordList?.filter(item => item.inSearchBox === InSearchBox)
  }
  
  return []
}

export async function getHotCategories(): string[] {
  const pageInfos = await getPageInfo(102000119)
  
  const tabInfos = pageInfos?.[0]?.tabInfos || []

  return tabInfos.filter((item, index) => index !== 0).map(item => item.tabName)
}

export async function getHomeInfos(): API.HomeInfos {
  const pageInfos = await getPageInfo(257)

  const cards = pageInfos?.[0]?.cards || []
  const ads = cards?.[1]?.dataSourceList?.[0]?.ads?.dataInfos || [] 
  const grids = cards?.[3]?.dataSourceList?.[0]?.icon?.dataInfos || []
  const qualityPrds = cards.find(i => i.layout?.cardTitle === '甄选推荐')?.dataSourceList?.[0]?.product?.dataInfos || []
  const phonePrds = cards.find(i => i.layout?.cardTitle === '手机专区')?.dataSourceList?.[0]?.product?.dataInfos || []
  const computePrds = cards.find(i => i.layout?.cardTitle === '电脑专区')?.dataSourceList?.[0]?.product?.dataInfos || []
  const ipadPrds = cards.find(i => i.layout?.cardTitle === '平板专区')?.dataSourceList?.[0]?.product?.dataInfos || []

  return {
    ads,
    grids,
    qualityPrds,
    phonePrds,
    computePrds,
    ipadPrds
  }
}