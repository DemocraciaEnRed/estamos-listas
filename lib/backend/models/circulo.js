const mongoose = require('mongoose')
const Schema = mongoose.Schema

const CirculoSchema = new Schema({
  name: { type: String, required: true, minlength: 1, maxlength: 100 },
})

CirculoSchema.statics.findByName = function (name, cb) {
  return this.findOne({ name: name }).exec(cb)
}

/**
 * Make Schema `.toObject()` and
 * `.toJSON()` parse getters for
 * proper JSON API response
 */

CirculoSchema.set('toObject', { getters: true })
CirculoSchema.set('toJSON', { getters: true })
/**
 * Expose Model
 */

module.exports = function initialize (conn) {
  return conn.model('Circulo', CirculoSchema, 'circulos')
}
