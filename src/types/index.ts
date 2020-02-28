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
 * axios方法的接口配置说明
 * auther Hardy
 * date 2020.02.18
 * url：请求地址
 * method：请求方式
 * data：（post）请求参数
 * params：(get)请求参数
 * headers：请求头
 * responseType：返回值类型
 * timeout：超时
 * transformRequest： 请求转换(请求之前可以对数据进行操作)
 * transformResponse： 响应转换(响应之前可以对数据进行操作)
 * cancelToken：取消本次请求
 * withCredentials：是否允许请求跨域（同域情况下会默认携带当前域的cookie，但是在跨域的情况下默认不会携带当前域下的cookie，所以需要携带的话，只需要配置withCredentials为true即可）
 * xsrfCookieName：防止XSRF攻击的cookie Name
 * xsrfHeaderName：防止XSRF攻击的请求头配置
 * onDownloadProgress：下载时的配置，可以拿到下载的进度等
 * onUploadProgress：上传时的配置，可以拿到上传进度等
 * auth：http授权
 * validateStatus：自定义合法状态码
 * paramsSerializer：自定义参数序列化
 * */
export interface AxiosRequestConfig {
  url?: string
  method?: Method
  data?: any
  params?: any
  headers?: any
  responseType?: XMLHttpRequestResponseType
  timeout?: number
  transformRequest?: AxiosTransformer | AxiosTransformer[]
  transformResponse?: AxiosTransformer | AxiosTransformer[]
  cancelToken?: CancelToken
  withCredentials?: boolean
  xsrfCookieName?: string
  xsrfHeaderName?: string
  onDownloadProgress?: (e: ProgressEvent) => void
  onUploadProgress?: (e: ProgressEvent) => void
  auth?: AxiosBasicCredentials
  validateStatus?: (status: number) => boolean
  paramsSerializer?: (params: any) => string

  [propsName: string]: any
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
export interface AxiosResponse<T = any> {
  data: T
  status: number
  statusText: string
  config: AxiosRequestConfig
  headers: any
  request: any
}

// axios函数返回值类型, 继承于Promise的泛型接口，类型定义成AxiosResponse
export interface AxiosPromise<T = any> extends Promise<AxiosResponse<T>> {}

// Axios错误接口
export interface AxiosEror extends Error {
  isAxiosError: boolean
  config: AxiosRequestConfig
  code?: string | null
  request?: any
  response?: AxiosResponse
}

// Axios类的接口
export interface Axios {
  defaults: AxiosRequestConfig
  interceptors: {
    request: AxiosInterceptorManager<AxiosRequestConfig>
    response: AxiosInterceptorManager<AxiosResponse>
  }
  request<T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  get<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  delete<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  head<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  options<T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
  post<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  put<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
  patch<T = any>(url: string, data?: any, config?: AxiosRequestConfig): AxiosPromise<T>
}

// 混合类型接口
export interface AxiosInstance extends Axios {
  <T = any>(config: AxiosRequestConfig): AxiosPromise<T>
  <T = any>(url: string, config?: AxiosRequestConfig): AxiosPromise<T>
}

// axios.create接口
export interface AxiosStatic extends AxiosInstance {
  create(config?: AxiosRequestConfig): AxiosInstance

  CancelToken: CancelTokenStatic
  Cancel: CancelStatic
  isCancel: (value: any) => boolean
}

// 拦截器的接口定义
export interface AxiosInterceptorManager<T> {
  use(resolve: ResolvedFn<T>, reject?: RejectedFn<T>): number
  eject(id: number): void
}

// 拦截器的请求和响应是不同类型，所以定义成泛型（请求是AxiosRequestConfig, 响应是AxiosResponse）
export interface ResolvedFn<T> {
  (val: T): T | Promise<T>
}
export interface RejectedFn<T> {
  (error: any): any
}

// 请求发起之前，请求响应之前可以对数据处理的两个方法的接口定义
export interface AxiosTransformer {
  (data: any, headers?: any): any
}

// 取消请求
export interface CancelToken {
  promise: Promise<Cancel>
  reason?: Cancel // 是promise的resolve的参数类型

  throwIfRequested(): void
}

// 取消请求的函数定义
export interface Canceler {
  (message?: string): void
}

// 传给CancelToken的构造函数参数类型
export interface CancelExecutor {
  (cancel: Canceler): void
}

export interface CancelTokenSource {
  token: CancelToken
  cancel: Canceler
}

export interface CancelTokenStatic {
  new (executor: CancelExecutor): CancelToken

  source(): CancelTokenSource
}

export interface Cancel {
  message?: string
}

export interface CancelStatic {
  new (message?: string): Cancel
}

export interface AxiosBasicCredentials {
  username: string
  password: string
}
