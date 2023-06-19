import { get } from '@/utils/request'
import { getPageInfo } from './common'

const Code = '0'

export async function getCategories(): API.Category[] {
  const pageInfos = await getPageInfo(103040874)

  const dataInfos = pageInfos?.[0]?.cards?.[0]?.dataSourceList?.[0]?.categories?.dataInfos || []
  return dataInfos.map(item => {
    return ({
      ...item,
      configInfo: JSON.parse(item.configInfo),
      subCategoryList: item.subCategoryList?.map(i => {
        return ({
          ...i,
          configInfo: JSON.parse(i.configInfo),
        })
      })
    })
  })
}

async function getDataMap(dataSourceList: string[]): API.DataMap {
  const { code, dataMap } = await get('/mcp/content/getProdInfoListWithPage?1687111213800', {
    dataSourceList: JSON.stringify(dataSourceList)
  })

  if (code === Code) {
    const map: API.DataMap = {}
    for (const key in dataMap) {
      map[key] = dataMap[key]?.dataInfos || []
    }
    return map
  }

  return {}
}

export async function getProductMap(code: string[]): API.DataMap {
  const count = Math.ceil(code.length / 100)
  const results: API.DataMap[] = []

  for (let i = 0; i < count; i++) {
    results.push(await getDataMap(code.slice(i * 100, (i + 1) * 100)))
  }

  return results?.reduce((a, c) => Object.assign(a, c), {});
}