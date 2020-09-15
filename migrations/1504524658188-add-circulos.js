const Circulo = require('lib/backend/models').Circulo
const dbReady = require('lib/backend/models').ready

let circulos = ['Alas Lalinde',
  'Ana Fabricia Córdoba',
  'Anakaona',
  'Artemisa',
  'Aura López',
  'Bachué',
  'Beatriz Restrepo Gallegos - Aide Easman',
  'Betsabe Espinal',
  'Brigitte Baptiste',
  'Cacica Agrazaba',
  'Cecilia Cardinal de Martínez',
  'Clarisas',
  'Dabeiba',
  'Débora Arango',
  'Domitila Barrios de Chungara',
  'Elena Vargas Tisnés',
  'Esperanza',
  'Felicita Campos',
  'Francia Márquez',
  'Huitaca',
  'Juana Julia Guzmán',
  'Las Sufraguistas',
  'Magdalena León Gómez',
  'Marcela Zuluaga Toro',
  'Margarita López Arboleda',
  'María Cano',
  'María Teresa Uribe',
  'Marielle Franco-GAI',
  'Marta Vélez SiempreViva',
  'Matilde Espinosa',
  'Policarpa Salavarrieta "Las Polas"',
  'Yemayá',
  'Teresita Gómez',
  'Andrea Echeverri',
  'Rosita Turizo']

/**
 * Make any changes you need to make to the database here
 */

exports.up = function up (done) {
  dbReady()
    .then(() => circulos.map(c => { return { name: c } }))
    .then((theCirculos) => Circulo.insertMany(theCirculos))
    .then(function () {
      console.log(`Added circulos.`)
      done()
    })
    .catch(function (err) {
      console.log('Added circulos failed at ', err)
      done(err)
    })
}

/**
 * Make any changes that UNDO the up function side effects here (if possible)
 */
exports.down = function down (done) {
  done()
}
