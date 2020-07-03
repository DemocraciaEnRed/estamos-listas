var express = require('express')
var app = module.exports = express()

app.get('/get-password', require('lib/frontend/site/layout'))
