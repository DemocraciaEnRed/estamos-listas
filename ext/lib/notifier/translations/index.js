const translations = require('democracyos-notifier/lib/translations')
const config = require('lib/config')
const {protocol, host} = config
const homeUrl = `${protocol}://${host}`

const t = translations.t

const overrides = {
  'templates.email.greeting': 'Hola {userName},',
  'templates.email.signature': `${config.organizationName} - ${config.bajadaPlataforma}`,

  'templates.welcome-email.subject': 'Bienvenida/o a ' + config.organizationName,
  'templates.welcome-email.body': `Iniciaste el proceso de registro para participar en <strong>${config.organizationName}</strong>.<br><br> <button style="background-color:#641873;border:0;color: white;padding: 10px;font-size: 15px;border-radius:2px" href=\"{validateUrl}\">Confirma tu registro</button>.`,
  'templates.welcome-email.ps': 'En caso de no haberte registrado, por favor ignora este correo.  ',

  'templates.comment-reply.subject': `¡Contestaron tu comentario en ${config.organizationName}!`,
  'templates.comment-reply.body': 'Tienes una nueva respuesta a tu comentario.',
  'templates.comment-reply.body2': 'Por favor <a href=\"{url}\">cliquea aquí</a> para verla.',

  'templates.topic-published.subject': 'Nuevo tema publicado',
  'templates.topic-published.body': 'Un nuevo tema fue publicado:',
  'templates.topic-published.body2': 'Por favor <a href=\"{url}\">cliquea aquí</a> para verlo.'
}

Object.assign(t.es, overrides)
Object.assign(t.en, overrides)
