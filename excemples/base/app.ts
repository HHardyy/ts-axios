import axios from '../../src'

// post
axios({
  method: 'post',
  url: '/base/post',
  headers: {
    'content-type': 'application/json;charset=utf-8',
    'Accept': 'application/json,text/plain,*/*'
  },
  responseType: 'json',
  data: {
    a: 1,
    b: 2
  }
}).then(res=>{
  console.log(res)
})

const paramsString = 'q=URLUtils.searchParams&topic=api';
const searchParams = new URLSearchParams(paramsString);

axios({
  method: 'post',
  url: '/base/post',
  data: searchParams,
}).then(res=>{
  console.log(res)
})

axios({
  method: 'post',
  url: '/base/post',
  data: {
    a: 1,
    b: 2
  }
}).then(res=>{
  console.log(res)
})

const arr = new Int32Array([21, 31]);
axios({
  method: 'post',
  url: '/base/buffer',
  data: arr
}).then(res=>{
  console.log(res)
})


// get
axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: ['bar', 'baz']
  }
}).then(res=>{
  console.log(res)
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: {
      bar: 'baz'
    }
  }
}).then(res=>{
  console.log(res)
})

const date = new Date();
axios({
  method: 'get',
  url: '/base/get',
  params: {
    date
  }
}).then(res=>{
  console.log(res)
})

axios({
  method: 'get',
  url: '/base/get',
  params: {
    foo: '@:$,'
  }
}).then(res=>{
  console.log(res)
})

axios({
  method:'get',
  url: '/base/get',
  params: {
    foo: 'bar',
    baz: null
  }
}).then(res=>{
  console.log(res)
})

axios({
  method: 'get',
  url: '/base/get#hash',
  params: {
    foo: 'baz'
  }
}).then(res=>{
  console.log(res)
})
