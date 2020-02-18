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
