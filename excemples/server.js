const express = require('express');
const bodyParser = require('body-parser');
const webpack = require('webpack');
const webpackDevMiddleWare = require('webpack-dev-middleware');
const webpackHotMiddleWare = require('webpack-hot-middleware');
const WebpackConfig = require('./webpack.config');

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
app.use(express.static(__dirname))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

const router = express.Router()


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
