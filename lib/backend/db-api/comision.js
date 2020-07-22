const debug = require('debug')
const log = debug('democracyos:db-api:text')

const Comision = require('lib/backend/models').Comision

exports.all = function all (fn) {
  log('Looking for all comisiones.')

  return Comision.find()
    .catch(err => log('Found error in comisiones %j', err))
    .then(objs => {
      if (!objs || !objs.length)
        log('No comisiones found')
      else
        log('Delivering comisiones %j', objs.map(o => o.name))
      return objs
    })
}
