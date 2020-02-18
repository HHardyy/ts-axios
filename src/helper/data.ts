import { isPainObject } from '../helper/util'

export function transformRequest(data: any): any {
  // isObject方法的话，如果是formData，所以另外写了个isPainObject，如果是formData这么判断就过不去
  if (isPainObject(data)) {
    return JSON.stringify(data)
  }
  return data
}
