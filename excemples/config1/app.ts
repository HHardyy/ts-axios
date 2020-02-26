import axios, { AxiosTransformer } from '../../src/index'
import qs from 'qs'

axios.defaults.headers.common['test2'] = 123;

// test add headers
axios({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  }),
  headers: {
    test: 321
  }
}).then(res => {
  console.log(res.data)
})




// test add transformRequest && transformResponse
axios({
  transformRequest: [(
    function(data){
      // return qs.stringify(data)
      return data
    }
  ),
    ...(axios.defaults.transformRequest as AxiosTransformer [])],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {
    if (typeof data === 'object') {
      data.a = 2
    }
    return data
  }],
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 1
  })
}).then(res => {
  console.log(res.data)
})


// test add axios.create

const instance = axios.create({
  transformRequest: [(
    function(data){
      // return qs.stringify(data)
      return data
    }
  ),
    ...(axios.defaults.transformRequest as AxiosTransformer [])],
  transformResponse: [
    ...(axios.defaults.transformResponse as AxiosTransformer[]),
    function(data) {
      if (typeof data === 'object') {
        data.a = 2
      }
      return data
    }]
})

instance({
  url: '/config/post',
  method: 'post',
  data: qs.stringify({
    a: 6
  })
})
