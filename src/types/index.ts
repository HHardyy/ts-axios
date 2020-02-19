// 定义method
export type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'Delete'
  | 'post'
  | 'POST'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH'

/*
 * axios参数类型接口定义
 * url：请求地址
 * method：请求方式
 * data：（post）请求参数
 * params：(get)请求参数
 * headers：请求头
 * responseType：返回值类型
 * timeout：超时
 * */
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
}

/*
 * axios返回类型接口定义
 * data：返回的data
 * status：请求状态码
 * statusText：提示
 * config：配置信息
 * headers：响应头
 * request：请求
 * */
export interface AxiosResponse {
  data: any
  status: number
  statusText: string
  config: AxiosRequestConfig
  headers: any
  request: any
}

// axios函数返回值类型, 继承于Promise的泛型接口，类型定义成AxiosResponse
export interface AxiosPromise extends Promise<AxiosResponse> {}
