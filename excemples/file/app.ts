import axios from '../../src/index'
import "nprogress/nprogress.css"
import NProgress from 'nprogress'

const instance = axios.create()

function calculatePercentage(loaded: number, total: number) {
  return Math.floor(loaded * 1.0) / total
}

function loadProgressBar(){
  const setupStartProgress = () => {
    instance.interceptors.request.use(config => {
      NProgress.start()
      return config
    })
  }
  const setupUpdateProgress = () => {
    const update = (e:ProgressEvent) => {
      console.log(e)
      NProgress.set(calculatePercentage(e.loaded, e.total))
    }
    instance.defaults.onDownloadProgress = update
    instance.defaults.onUploadProgress = update
  }
  const setupStopProgress = () => {
    instance.interceptors.response.use(response => {
      NProgress.done()
      return response
    }, error => {
      NProgress.done()
      return Promise.reject(error)
    })
  }

  setupStartProgress()
  setupUpdateProgress()
  setupStopProgress()
}
loadProgressBar()

const downloadEL = document.getElementById('download')
downloadEL!.addEventListener('click', e => {
  instance.get('https://img.mukewang.com/5cc01a7b0001a33718720632.jpg')
})
const uploadEL = document.getElementById('upload')
uploadEL!.addEventListener('click', e => {
  const data = new FormData()
  const fileEL = document.getElementById('file') as HTMLInputElement
  if(fileEL.files) {
    data.append('file', fileEL.files[0])

    instance.post('/file/upload', data)
  }
})
