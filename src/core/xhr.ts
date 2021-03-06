// 引入类型定义
import { AxiosRequestConfig, AxiosPromise, AxiosResponse } from '../types'
import { parseHeaders } from '../helper/headers' // 格式化headers成json对象的格式
import { createError } from '../helper/error' // 创建多个error信息（原来只能catch(e)=>e.message）
import { isURLSameOrigin } from '../helper/url'
import { isFormData } from '../helper/util'

import cookie from '../helper/cookies'

export default function xhr(config: AxiosRequestConfig): AxiosPromise {
  return new Promise((resolve, reject) => {
    // 传入的一些config
    const {
      data = null,
      method = 'get',
      url,
      headers,
      responseType = null,
      timeout,
      cancelToken,
      withCredentials,
      xsrfCookieName,
      xsrfHeaderName,
      onDownloadProgress,
      onUploadProgress,
      auth,
      validateStatus
    } = config

    const request = new XMLHttpRequest() // new XMLHttpRequest

    request.open(method.toUpperCase(), url!, true)

    // 请求设置
    configureRequest()
    // 请求处理
    addEvents()
    // 请求头处理
    processHeaders()
    // 请求取消
    processCancel()

    request.send(data)

    function configureRequest(): void {
      if (responseType) {
        request.responseType = responseType
      }
      if (timeout) {
        request.timeout = timeout // timeout如果不传，默认是0，单位是毫秒
      }
      if (withCredentials) {
        request.withCredentials = withCredentials // 判断是否允许跨域请求携带cookie
      }
    }

    function addEvents(): void {
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
        reject(createError('Network Error', config, null, request))
      }
      // 请求超时处理
      request.ontimeout = function handelTimeout() {
        reject(createError(`Timeout of ${timeout}ms exceeded`, config, 'ECONNABORTED', request))
      }

      // 下载进度
      if (onDownloadProgress) {
        request.onprogress = onDownloadProgress
      }

      // 上传进度
      if (onUploadProgress) {
        request.upload.onprogress = onUploadProgress
      }
    }

    function processHeaders(): void {
      if (isFormData(data)) {
        delete headers['Content-Type']
      }

      if ((withCredentials || isURLSameOrigin(url!)) && xsrfCookieName) {
        const xsrfValue = cookie.read(xsrfCookieName)
        if (xsrfValue && xsrfHeaderName) {
          headers[xsrfHeaderName] = xsrfValue
        }
      }

      if (auth) {
        // btoa() 方法用于创建一个 base-64 编码的字符串, atob()用于解码
        headers['Authorization'] = 'Basic ' + btoa(auth.username + ':' + auth.password)
      }

      Object.keys(headers).forEach(name => {
        if (data === null && name.toLowerCase() === 'content-type') {
          delete headers[name]
        } else {
          request.setRequestHeader(name, headers[name])
        }
      })
    }

    function processCancel(): void {
      // 如果有cancelToken，则取消掉这个xhr的请求
      if (cancelToken) {
        cancelToken.promise.then(reason => {
          request.abort()
          reject(reason)
        })
      }
    }
    // 返回状态码在200 - 300之间表示成功
    function handelResponse(response: AxiosResponse): void {
      if (!validateStatus || validateStatus(response.status)) {
        resolve(response)
      } else {
        reject(
          createError(
            `Request failed width status code ${response.status}`,
            config,
            null,
            request,
            response
          )
        )
      }
    }
  })
}
