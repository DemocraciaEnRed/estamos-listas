var express = require('express')
var log = require('debug')('democracyos:api:comision')
var accepts = require('lib/backend/accepts')
var api = require('lib/backend/db-api')
var utils = require('lib/backend/utils')
var restrict = utils.restrict
var _handleError = utils._handleError
var pluck = utils.pluck

var app = module.exports = express()

/**
 * Limit request to json format only
 */

app.use(accepts('application/json'))

app.get('/comision/all', function (req, res, next) {
  log('Searching all comisiones')
  api.comision.all()
    .then(objs => {
      log('Delivering comisiones %j', pluck(objs, 'name'))
      res.status(200).json(objs)
    })
    .catch(err => _handleError(err, req, res))
})
