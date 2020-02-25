import { deepMerge, isPainObject } from './util'
import { Method } from '../types'

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

// 将headers格式化成json
export function parseHeaders(headers: string): any {
  let parsed = Object.create(null)
  if (!headers) {
    return parsed
  }
  headers.split('\r\n').forEach(line => {
    let [key, value] = line.split(':')
    key = key.trim().toLowerCase()
    if (!key) {
      return
    }
    if (value) {
      value = value.trim()
    }
    parsed[key] = value
  })
  return parsed
}

export function flattenHeaders(headers: any, method: Method): any {
  if (!headers) {
    return headers
  }
  headers = deepMerge(headers.common, headers[method], headers)
  const methodToDelete = ['delete', 'get', 'head', 'options', 'post', 'put', 'patch', 'common']
  methodToDelete.forEach(method => {
    delete headers[method]
  })
  return headers
}
