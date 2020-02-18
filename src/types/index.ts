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

// axios参数类型接口定义
export interface AxiosRequestConfig {
  url: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
}

// axios返回类型接口定义
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
