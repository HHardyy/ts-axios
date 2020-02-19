import { AxiosInstance } from './types'
import Axios from './core/Axios'
import { extend } from './helper/util'

function createInstance(): AxiosInstance {
  const context = new Axios()
  const instance = Axios.prototype.request.bind(context) // request内部this需要绑定上下文
  extend(instance, context)
  return instance as AxiosInstance // 类型断言
}
const axios = createInstance()
export default axios
