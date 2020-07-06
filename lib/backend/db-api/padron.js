const debug = require('debug')
const log = debug('democracyos:db-api:text')

const Padron = require('lib/backend/models').Padron

exports.isInPadron = (email) => {
  log('Checking if %s is in padron.', email)

  return Padron
    .find({email: email})
    .count('name')
    .then(c => c && c > 0)
    .catch(err => {
      if (err)
        log('Found error in padron %j', err)
    })
}
