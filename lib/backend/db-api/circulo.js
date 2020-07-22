const debug = require('debug')
const log = debug('democracyos:db-api:text')

const Circulo = require('lib/backend/models').Circulo

exports.all = function all (fn) {
  log('Looking for all circulos.')

  return Circulo.find()
    .catch(err => log('Found error in circulos %j', err))
    .then(objs => {
      if (!objs || !objs.length)
        log('No circulos found')
      else
        log('Delivering circulos %j', objs.map(o => o.name))
      return objs
    })
}
