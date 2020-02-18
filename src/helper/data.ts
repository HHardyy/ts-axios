import { isPainObject } from '../helper/util'

export function transformRequest(data: any): any {
  // isObject方法的话，如果是formData，所以另外写了个isPainObject，如果是formData这么判断就过不去
  if (isPainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}

// 请求返回的data尝试转成json
export function transformResponse(data: any): any {
  if (typeof data === 'string') {
    try {
      data = JSON.parse(data)
    } catch (e) {
      // no nothing
    }
  }
  return data
}
