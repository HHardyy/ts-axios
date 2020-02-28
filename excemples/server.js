const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const atob = require('atob');
const multipart = require('connect-multiparty');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');
const path = require('path');

// 启动服务2
require('./server2');

const app = express();
const compiler = webpack(WebpackConfig)

app.use(webpackDevMiddleWare(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true,
    chunks: false
  }
}))

app.use(webpackHotMiddleWare(compiler))
app.use(express.static(__dirname, {
  setHeaders(res) {
    res.cookie('XSRF-TOKEN-D', '1234abc')
  }
}))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser())

app.use(multipart({
  uploadDir: path.resolve(__dirname, 'upload-file')
}))

const router = express.Router()

// paramsSerializer
router.get('/paramsSerializer/get', (req, res) => {
  res.json('hello paramsSerializer')
})

// validatestatus
router.get('/validatestatus/304', (req, res) => {
  res.status(304)
  res.json('hello 304 code')
})

// auth
router.post('/auth/post', (req, res) => {
  const auth = req.headers.authorization
  console.log(auth, '===========');
  const [type, credentials] = auth.split(' ');
  console.log(auth.split(' '), ':===auth.split(\' \')')
  console.log(credentials, '===========');
  console.log(atob(credentials))
  const [username, password] = atob(credentials).split(':')
  if ( type === 'Basic' && username === 'hardy' && password === '12345' ) {
    res.json(req.body)
  }else{
    res.status(401)
    res.end('Un Authorization')
  }
})

// file
router.post('/file/upload', (req, res) => {
  console.log(req.body, req.files)
  res.end('upload success');
})

// more
router.get('/more/get', (req, res) => {
  res.json(req.cookies);
})

// cancel
router.get('/cancel/get', (req, res) => {
  setTimeout(() => {
    res.json('hello')
  }, 1000)
})
router.post('/cancel/post', (req, res) => {
  setTimeout(()=>{
    res.json(req.body)
  },1000)
})

// config
router.post('/config/post', (req, res) => {
  res.json(req.body)
})

// interceptor
router.get('/interceptor/get', (req, res) => {
  res.end('hello hardy ')
})

// extend
router.get('/extend/user',(req,res) => {
  res.json({
    code: 1001,
    result: {
      name: 'hardyName',
      age: 18
    },
    message: 'user请求成功'
  })
  res.end();
})

// -------------------------
router.post('/extend/post',(req,res)=>{
  res.json(req.body)
})
router.put('/extend/put',(req,res)=>{
  res.json(req.body)
})
router.patch('/extend/patch',(req,res)=>{
  res.json(req.body)
})

router.get('/extend/get',(req,res)=>{
  res.json(req.query)
})
router.options('/extend/options',(req,res)=>{
  res.json(req.query)
  res.end()
})
router.head('/extend/head',(req,res)=>{
  res.json(req.query)
  res.end()
})
router.delete('/extend/delete',(req,res)=>{
  res.json(req.query)
  res.end()
})


// error
router.get('/error/timeout', (req,res) => {
  setTimeout(() => {
    res.json({
      msg: 'hello word this is timeout api'
    })
  }, 3000)
})

router.get('/error/get', (req, res) => {
  if (Math.random()>0.5) {
    res.json({
      msg: 'hello world'
    })
  }else{
    res.status(500)
    res.end()
  }
})

// get
router.get('/simple/get', function(req,res){
  res.json({
    msg: 'hello word'
  })
})
router.get('/base/get', (req,res) => {
  res.json(req.query)
})

// post
router.post('/base/post', (req, res) => {
  res.json(req.body);
})
router.post('/base/buffer', (req, res) => {
  let msg = [];
  req.on('data', (chunk) => {
    if (chunk) {
      msg.push(chunk);
    }
  })
  req.on('end', () => {
    let buf = Buffer.concat(msg);
    res.json(buf.toJSON())
  })
})


app.use(router)
const port = process.env.PORT || 8080
module.exports = app.listen(port, ()=>{
  console.log('server listening on http://localhost:'+port,'ctrl+c to stop')
})
