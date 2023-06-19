import { get } from '@/utils/request'

const Code = '0'

export async function getPageInfo(pageId: number) {
  const { code, pageInfos } = await get('/mcp/content/getPageInfoListAsync', {
    pageId
  })

  if (code === Code) {
    return pageInfos
  }

  return []
}