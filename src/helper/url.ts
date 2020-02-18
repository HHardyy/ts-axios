import { isDate, isPainObject, enCode } from './util'

// 辅助函数，处理url参数
export function buildUrl(url: string, params: any) {
  if (!params) {
    return url
  }
  const parts: string[] = []
  Object.keys(params).forEach(key => {
    const val = params[key]
    if (val === null || typeof val === 'undefined') {
      return
    }
    let values = []
    if (Array.isArray(val)) {
      values = val
      key += []
    } else {
      values = [val]
    }

    values.forEach(val => {
      if (isDate(val)) {
        val = val.toISOString() // 如果是Date类型，转化成字符串格式
      } else if (isPainObject(val)) {
        val = JSON.stringify(val)
      }
      parts.push(`${enCode(key)}=${enCode(val)}`)
    })

    let serializedParams = parts.join('&')

    if (serializedParams) {
      const markIndex = url.indexOf('#')
      if (markIndex !== -1) {
        url = url.slice(0, markIndex)
      }
      url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams
    }
  })
  return url
}
