import axios from '../../src/index'

interface ResponseData<T=any>{
  code: number
  result: T
  message: string
}
interface User {
  name: string
  age: number
}
function getUser<T>(){
  return axios<ResponseData<T>>('/extend/user')
}
async function test(){
  const user = await getUser<User>()
  if(user){
    console.log(user.data.result.name, user.data.result.age)
  }
}
test()
// ---------------------

axios({
  url: '/extend/post',
  method: 'post',
  data: {a: 1, b: 2}
}).then(res=> {
  console.log('axios{} api:',res)
})
axios.request({
  url: '/extend/post',
  method: 'post',
  data: {
    msg: 'hardy'
  }
}).then(res=> {
  console.log('request api', res)
})

function getData(){
  return new Promise((resolve, reject) => {
    let res = axios.post('/extend/post', { post: 'post' })
    resolve(res)
  })
}

async function _getdata(){
  let data = await getData()
  console.log('这是data：', data)
}

_getdata()

axios.get('/extend/get').then(res=> {console.log('get: ', res)})
axios.options('/extend/options').then(res=> {console.log('options: ', res)})
axios.head('/extend/head').then(res=> {console.log('head: ', res)})
axios.delete('/extend/delete').then(res=> {console.log('delete: ', res)})

axios.post('/extend/post', { post: 'post' }).then(res=> {console.log('post: ', res)})
axios.put('/extend/put', { post: 'put' }).then(res=> {console.log('put: ', res)})
axios.patch('/extend/patch', { post: 'patch' }).then(res=> {console.log('patch: ', res)})

