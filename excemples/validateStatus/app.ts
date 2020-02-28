import axios from '../../src/index'

axios.get('/validatestatus/304').then( res=> { console.log(res) }).catch(err => { console.log(err) });

axios.get('/validatestatus/304',{
  validateStatus(status) {
    return status >= 200 && status < 400
  }
}).then(res => { console.log (res)} ).catch(err => { console.log(err) })
