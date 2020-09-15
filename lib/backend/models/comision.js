const mongoose = require('mongoose')
const Schema = mongoose.Schema

const ComisionSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 100 },
})

ComisionSchema.statics.findByName = function (name, cb) {
  return this.findOne({ name: name }).exec(cb)
}

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

ComisionSchema.set('toObject', { getters: true })
ComisionSchema.set('toJSON', { getters: true })
/**
 * Expose Model
 */

module.exports = function initialize (conn) {
  return conn.model('Comision', ComisionSchema, 'comisiones')
}
