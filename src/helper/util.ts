/*
 *   val is Object  === 类型谓词
 *   Hardy @2020.2.18
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

// 将字符串转化成url字符编码, 字符转化
export function enCode(val: string): string {
  return encodeURIComponent(val)
    .replace(/%40/g, '@')
    .replace(/%3A/gi, ':')
    .replace(/%24/g, '$')
    .replace(/%2C/gi, ',')
    .replace(/%20/g, '+')
    .replace(/%5B/gi, '[')
    .replace(/%5D/gi, ']')
}
