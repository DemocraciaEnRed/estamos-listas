const fs = require('fs')
const path = require('path')
const notifierTemplates = require('democracyos-notifier/lib/templates')
const notifierConfig = require('democracyos-notifier/lib/config')
const translations = require('democracyos-notifier/lib/translations')
const pug = require('pug')
const config = require('lib/config')
const notifier = require('democracyos-notifier')
const log = require('debug')('democracyos:ext:notifier')

require('./translations')

const t = translations.t

notifierConfig.set({
  availableLocales: ['es']
})

t.en = t.es

const templates = {}

;[
  // 'comment-reply',
  // 'reset-password',
  // 'topic-published',
  // 'welcome-email'
].forEach(function (name) {
  var filePath = path.join(__dirname, './templates/' + name + '.pug')

  fs.readFile(filePath, { encoding: 'utf-8' }, function (err, template) {
    if (err) throw err
    templates[name] = pug.compile(template)
  })
})

const originalPug = notifierTemplates.pug

function _pug (opts, vars, callback) {
  if (typeof opts === 'string') {
    return _pug({ name: opts }, vars, callback)
  }

  if (config.enforceLocale) {
    opts.lang = config.locale
  }

  if (!templates[opts.name]) {
    return originalPug(opts, vars, callback)
  }

  const content = replaceVars(templates[opts.name]({ t: t }), vars)

  callback(null, content)
}

function replaceVars (template, vars) {
  if (!vars) return template

  var res = template

  if (res) {
    vars.forEach(function (v) {
      res = res.replace(v.name, v.content)
    })
  }

  return res
}

notifierTemplates.pug = _pug

/////// ESTO DE ABAJO ES POR SI QUEREMOS OVERRIDEAR/PISAR LOS MAILS
/////// POR DEFECTO DEL SISTEMA
// Wait until the notifier is initialized
/*const interval = setInterval(function () {
  if (!notifier.mailer) return
  clearInterval(interval)
  notifier.init().then(() => {
    ;[
      require('./jobs/forgot-password')
    ].forEach((job) => job(notifier))
    log('Ext notifier email jobs loaded')
  }).catch((err) => {
    console.error('Error loading ext/lib/notifier: ', err)
  })
}, 200)*/
