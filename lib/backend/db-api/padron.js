const debug = require('debug')
const log = debug('democracyos:db-api:text')

const Padron = require('lib/backend/models').Padron

exports.isInPadron = (email) => {
  log('Checking if %s is in padron.', email)

  return Padron
    .find({email: email})
    .count('name')
    .then(c => {
      if (c && c > 0){
        log('%s is in padron.', email)
        return true
      }else{
        log('%s is not in padron.', email)
        return false
      }
    })
    .catch(err => {
      if (err)
        log('Found error in padron %j', err)
    })
}
