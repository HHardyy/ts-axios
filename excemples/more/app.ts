import axios from '../../src/index'

document.cookie = 'a=b';

// 跨域鉴权
const instance = axios.create({
  xsrfCookieName: 'XSRF-TOKEN-D',
  xsrfHeaderName: 'X-XSRF-TOKEN-D'
})
instance.get('/more/get').then(res => {
  console.log(res, ':res');
})


// 跨域请求

axios.get('/more/get').then(res => {
  console.log(res)
})

axios.post('http://127.0.0.1:8088/more/server2', {}, {
  withCredentials: true
}).then(res => {
  console.log(res)
})
