import axios, { Canceler } from '../../src/index'

const CancelToken = axios.CancelToken
const source = CancelToken.source()

axios.get('/cancel/get', {
  cancelToken: source.token
}).catch(function(e){
  if (axios.isCancel(e)) {
    console.log('get Request canceled', e.message)
  }
})

setTimeout(()=>{
  source.cancel('Operation canceled by the user')
  axios.post('/cancel/post', {a: 9}, {
    cancelToken: source.token
  }).catch(function(e) {
    if (axios.isCancel(e)) {
      console.log('post Request canceled', e.message)
    }
  })
},100)

let cancel: Canceler
axios.get('/cancel/get', {
  cancelToken: new CancelToken(c=> {
    cancel = c
  })
}).catch(function(e){
  if (axios.isCancel(e)) {
    console.log('Request canceled')
  }
})

setTimeout(()=> {
  cancel()
}, 200)
