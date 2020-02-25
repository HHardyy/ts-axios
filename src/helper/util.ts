/*
 *   val is Object  === 类型谓词
 * */

// 缓存toString方法
const _toString = Object.prototype.toString

// 判断是否日期类型
export function isDate(val: any): val is Date {
  return _toString.call(val) === '[object Date]'
}

// 是否是Object
export function isObject(val: any): val is Object {
  return val !== null && typeof val === 'object'
}

// 是否是普通对象
export function isPainObject(val: any): val is Object {
  return _toString.call(val) === '[object Object]'
}

// copy
export function extend<T, U>(to: T, form: U): T & U {
  for (const key in form) {
    ;(to as T & U)[key] = form[key] as any
  }
  return to as T & U
}

// 深度合并
export function deepMerge(...objs: any[]): any {
  const result = Object.create(null)
  objs.forEach(obj => {
    if (obj) {
      Object.keys(obj).forEach(key => {
        const val = obj[key]
        if (isPainObject(val)) {
          if (isPainObject(result[key])) {
            result[key] = deepMerge(result[key], val)
          } else {
            result[key] = deepMerge(val)
          }
        } else {
          result[key] = val
        }
      })
    }
  })
  return result
}
