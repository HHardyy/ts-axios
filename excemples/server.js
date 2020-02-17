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

router.get('/simple/get', function(req,res){
  res.json({
    msg: 'hello word'
  })
})

app.use(router)
const port = process.env.PORT || 8080
module.exports = app.listen(port, ()=>{
  console.log('server listening on http://localhost:'+port,'ctrl+c to stop')
})
