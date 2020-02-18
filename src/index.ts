// 引入类型定义
import { AxiosRequestConfig } from './types'
import xhr from './xhr'
import { buildUrl } from './helper/url'
import { transformRequest } from './helper/data'

// 主axios函数
function axios(config: AxiosRequestConfig): void {
  processConfig(config)
  xhr(config)
}
// 处理config
function processConfig(config: AxiosRequestConfig): void {
  config.url = transformURL(config)
  config.data = transformRequestData(config)
}

// 对请求data做处理
function transformRequestData(config: AxiosRequestConfig): any {
  return transformRequest(config.data)
}

// 调用buildUrl对url进行转化
function transformURL(config: AxiosRequestConfig): string {
  const { url, params } = config
  return buildUrl(url, params)
}

export default axios
