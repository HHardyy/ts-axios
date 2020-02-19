import axios from './axios'
export * from './types' // 向外暴露所有类型定义,否则 catch不到AxiosError定义的interface
export default axios
