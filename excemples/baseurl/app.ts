import axios from '../../src/index'

const instance = axios.create({
  baseURL: 'https://hhardyy.com/img/'
})
instance.get('avatar.jpg')
instance.get('https://hhardyy.com/img/avatar.jpg')
