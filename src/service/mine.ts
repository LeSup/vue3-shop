import { getPageInfo } from './common'

export async function getMine(): API.MineInfo {
  const pageInfos = await getPageInfo(104001642)

  const cards = pageInfos?.[0]?.cards || []
  const promotions = cards.find(i => i.resSiteName === '用户活跃')?.dataSourceList?.[0]?.icon?.dataInfos || []
  const tools = cards.find(i => i.resSiteName === '工具')?.dataSourceList?.[0]?.icon?.dataInfos || []

  return {
    promotions,
    tools
  }
}