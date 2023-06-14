import { get } from '@/utils/request'

const CODE = '0'

export async function getHotCategories(): string[] {
  const { code, pageInfos } = await get('/api/mcp/content/getPageInfoListAsync', {
    pageId: 102000119,
    portal: 2
  })

  if (code === CODE) {
    const tabInfos = pageInfos?.[0]?.tabInfos || []
    return tabInfos.filter((item, index) => index !== 0).map(item => item.tabName)
  }

  return []
}