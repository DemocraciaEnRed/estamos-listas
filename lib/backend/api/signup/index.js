/**
 * Module dependencies.
 */

var express = require('express')
var config = require('lib/config')
var api = require('lib/backend/db-api')
var jwt = require('lib/backend/jwt')
var l10n = require('lib/backend/l10n')
var utils = require('lib/backend/utils')
const ObjectID = require('mongoose').Types.ObjectId
var staff = utils.staff

var setDefaultForum = require('lib/backend/middlewares/forum-middlewares').setDefaultForum
var initPrivileges = require('lib/backend/middlewares/user').initPrivileges
var canCreate = require('lib/backend/middlewares/user').canCreate
var canManage = require('lib/backend/middlewares/user').canManage
var signup = require('./lib/signup')

const log = require('debug')('democracyos:api:signup')

/**
 * Exports Application
 */

var app = module.exports = express()

/**
 * Define routes for SignUp module
 */

app.post('/signup',
(req, res, next) => {
  if (config.allowPublicSignUp)
    next()
  else // solo lxs del staff pueden registrar usus si no está permitido al público
    staff(req, res, next)
},
function (req, res) {
  var meta = {
    ip: req.ip,
    ips: req.ips,
    host: req.get('host'),
    origin: req.get('origin'),
    referer: req.get('referer'),
    ua: req.get('user-agent')
  }
  if(req.body.circulo != ''){
    req.body.extra = {}
    req.body.extra.circulo = ObjectID(req.body.circulo)
  }
  delete req.body.circulo
  var profile = req.body
  profile.locale = config.enforceLocale ? config.locale : l10n.requestLocale(req)

  signup.doSignUp(profile, meta, function (err) {
    if (err) return res.status(400).json({ error: err.message })
    return res.status(200).send()
  })
})

/**
* Populate permissions after setup
*/

function addPrivileges (req, res, next) {
  return jwt.signin(api.user.expose.confidential(req.user), req, res)
}

app.post('/signup/validate', function (req, res, next) {
  signup.emailValidate(req.body, function (err, user) {
    if (err) return res.status(200).json({ error: err.message })
    req.user = user

    Promise.all([
      api.padron.isInPadron(user.email),
      // promiseamos esta función que usa sistema viejo de callbacks...
      new Promise((res, rej) => {
        api.forum.findOneByName(config.privateForum, (err, forum) => {
          if (err){
            log('Found error: ', err)
            res.status(500).send(err)
            rej(err)
          }else
            res(forum)
        })
      })
    ]).then(results => {
      const [isInPadron, privateForum] = results

      if (!isInPadron)
        return next()

      api.forum.grantPermission(privateForum._id, user.id, "participant")
        .then(() => next())
        .catch((err) => {
          log('Found error: ', err)
          res.status(500).send(err)
        })
    })
  })
}, initPrivileges, canCreate, setDefaultForum, canManage, addPrivileges)

app.post('/signup/resend-validation-email', function (req, res) {
  var meta = {
    ip: req.ip,
    ips: req.ips,
    host: req.get('host'),
    origin: req.get('origin'),
    referer: req.get('referer'),
    ua: req.get('user-agent')
  }

  signup.resendValidationEmail(req.body, meta, function (err) {
    if (err) return res.status(200).json({ error: err.message })
    return res.status(200).send()
  })
})
