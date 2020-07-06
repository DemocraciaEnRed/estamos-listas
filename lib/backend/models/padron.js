const mongoose = require('mongoose')
const Schema = mongoose.Schema

const PadronSchema = new Schema({
  email: { type: String, required: true, minlength: 1, maxlength: 100, unique: true },
})

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

PadronSchema.set('toObject', { getters: true })
PadronSchema.set('toJSON', { getters: true })
/**
 * Expose Model
 */

module.exports = function initialize (conn) {
  return conn.model('Padron', PadronSchema, 'padrones')
}
