import axios from '../../src/index'
import qs from 'qs'
axios.get('/paramsSerializer/get', {
  params: new URLSearchParams('a=1&c=d')
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})

axios.get('/paramsSerializer/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
})


const instance = axios.create({
  paramsSerializer(params) {
    return qs.stringify(params, {
      arrayFormat: 'brackets'
    })
  }
})

instance.get('/paramsSerializer/get', {
  params: {
    a: 1,
    b: 2,
    c: ['a', 'b', 'c']
  }
}).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
