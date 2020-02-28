import axios from '../../src/index'

axios.post('/auth/post', { a: 1 }, {
  auth: {
    username: 'hardy',
    password: '12345'
  }
}).then(res => {
  console.log('auth:====', res)
})
