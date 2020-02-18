import { isPainObject } from './util'

// 规范化content-type,小写转化成大写
function normallizeHeadersName(headers: any, normallizeName: string): void {
  if (!headers) {
    return
  }
  Object.keys(headers).forEach(name => {
    if (name !== normallizeName && name.toUpperCase() === normallizeName.toUpperCase()) {
      headers[normallizeName] = headers[name]
      delete headers[name]
    }
  })
}

// 处理请求头工具函数
export function processHeaders(headers: any, data: string): any {
  normallizeHeadersName(headers, 'Content-Type')
  if (isPainObject(data)) {
    if (headers && !headers['Content-type']) {
      headers['Content-Type'] = 'application/json;charset=utf-8'
    }
  }
  return headers
}
