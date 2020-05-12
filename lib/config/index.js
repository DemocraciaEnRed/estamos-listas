var crypto = require('crypto')
var path = require('path')
var log = require('debug')('democracyos:config')
var democracyosConfig = require('democracyos-config')
var normalizeEmail = require('lib/backend/normalize-email/normalize-email')

var env = process.env
var environment = env.NODE_ENV || 'development'

var config = democracyosConfig({
  path: path.join(__dirname, '..', '..', 'config')
})

var defaultToken = 'Generate a secret token and paste it here.'
if (!config.jwtSecret || config.jwtSecret === defaultToken) {
  log('WARNING: Set the config jwtSecret to be able to keep user sessions on restart.')
  var token = crypto.randomBytes(32).toString('hex')
  config.jwtSecret = token
}

config.env = environment

config.staff = config.staff.map(function (email) {
  return normalizeEmail(email, {
    allowEmailAliases: config.allowEmailAliases
  })
})

config.mongoUrl = env.MONGO_URL || env.MONGODB_URI || config.mongoUrl

if (!env.NOTIFICATIONS_MAILER_SERVICE) {
  if (env.SENDGRID_USERNAME && env.SENDGRID_PASSWORD) {
    config.notifications = {
      mailer: {
        service: 'sendgrid',
        auth: {
          user: env.SENDGRID_USERNAME,
          pass: env.SENDGRID_PASSWORD
        },
        name: config.notifications.mailer.name,
        email: config.notifications.mailer.email
      }
    }
  }
}

// las configuraciones que se exponen al front son las que están en el array "client"
// dentro de la configuración; para el back todas son accesibles
module.exports = config
