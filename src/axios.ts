import { AxiosInstance, AxiosRequestConfig } from './types'
import Axios from './core/Axios'
import { extend } from './helper/util'
import defaults from './defaults'

function createInstance(config: AxiosRequestConfig): AxiosInstance {
  const context = new Axios(config)
  const instance = Axios.prototype.request.bind(context) // request内部this需要绑定上下文
  extend(instance, context)
  return instance as AxiosInstance // 类型断言
}
const axios = createInstance(defaults)
export default axios
