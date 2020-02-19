// 引入类型定义
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from './types'
import { parseHeaders } from './helper/headers'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    const { data = null, method = 'get', url, headers, responseType = null, timeout = 0 } = config
    const request = new XMLHttpRequest() // new XMLHttpRequest
    if (responseType) {
      request.responseType = responseType
    }
    if (timeout) {
      request.timeout = timeout // timeout如果不传，默认是0，单位是毫秒
    }
    request.open(method.toUpperCase(), url, true)
    // 请求处理
    request.onreadystatechange = function handleLoad() {
      // 响应失败
      if (request.readyState !== 4) {
        return
      }
      // 发生网络错误或者超时错误status===0
      if (request.status === 0) {
        return
      }
      const responseHeaders = parseHeaders(request.getAllResponseHeaders())
      const responseData = responseType !== 'text' ? request.response : request.responseText
      const response: AxiosResponse = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config,
        request
      }
      // 返回的状态码在200 - 300之间代表成功
      handelResponse(response)
    }
    // 网络错误处理
    request.onerror = function handelError() {
      reject(new Error('Network Error'))
    }
    // 请求超时处理
    request.ontimeout = function handelTimeout() {
      reject(new Error(`timeout of ${timeout}ms exceeded`))
    }

    Object.keys(headers).forEach(name => {
      if (data === null && name.toLowerCase() === 'content-type') {
        delete headers[name]
      } else {
        request.setRequestHeader(name, headers[name])
      }
    })
    request.send(data)
    // 返回状态码在200 - 300之间表示成功
    function handelResponse(response: any): void {
      if (response.status >= 200 && response.status < 300) {
        resolve(response)
      } else {
        reject(new Error(`Request failed width status code ${response.status}`))
      }
    }
  })
}
