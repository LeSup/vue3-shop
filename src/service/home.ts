import { get } from '@/utils/request'

const Code = '0'
const InSearchBox = 1

export async function getHotWords(): API.HotWord[] {
  const { code, hotWordList } = await get('/api/mcp/queryHotWord?1686815211759', {
    _: 1686815211759,
    portal: 2
  })

  if (code === Code) {
    return hotWordList?.filter(item => item.inSearchBox === InSearchBox)
  }
  
  return []
}

export async function getHotCategories(): string[] {
  const { code, pageInfos } = await get('/api/mcp/content/getPageInfoListAsync', {
    pageId: 102000119,
    portal: 2
  })

  if (code === Code) {
    const tabInfos = pageInfos?.[0]?.tabInfos || []
    return tabInfos.filter((item, index) => index !== 0).map(item => item.tabName)
  }

  return []
}

export async function getHomeInfos(): API.HomeInfos {
  const { code, pageInfos } = await get('/api/mcp/content/getPageInfoListAsync', {
    pageId: 257,
    portal: 2
  })

  if (code === Code) {
    const cards = pageInfos?.[0]?.cards || []
    const ads = cards?.[1]?.dataSourceList?.[0]?.ads?.dataInfos || [] 
    const grids = cards?.[3]?.dataSourceList?.[0]?.icon?.dataInfos || []
    const qualityPrds = cards?.[6]?.dataSourceList?.[0]?.product?.dataInfos || []
    const phonePrds = cards?.[7]?.dataSourceList?.[0]?.product?.dataInfos || []
    const computePrds = cards?.[8]?.dataSourceList?.[0]?.product?.dataInfos || []
    const ipadPrds = cards?.[9]?.dataSourceList?.[0]?.product?.dataInfos || []

    return {
      ads,
      grids,
      qualityPrds,
      phonePrds,
      computePrds,
      ipadPrds
    }
  }

  return {}
}