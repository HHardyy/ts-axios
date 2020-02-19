import axios from '../../src/index'

axios({
  method: 'get',
  url: '/error/get1'
}).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err)
})

axios({
  method: 'get',
  url: '/error/get'
}).then(res=>{
  console.log(res)
}).catch(err=>{
  console.log(err)
})

setTimeout(()=>{
  axios({
    method: 'get',
    url: '/error/get'
  }).then(res=>{
    console.log(res)
  }).catch(err=>{
    console.log(err)
  })
},5000)

axios({
  method: 'get',
  url: '/error/timeout',
  timeout: 4000
}).then(res=>{
  console.log(res)
}).catch(e=>{
  console.log(e,'==========================')
})
