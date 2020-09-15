//import request from 'lib/frontend/request/request'
import Store from '../store/store'

class CirculoStore extends Store {
  constructor () {
    super()
  }
  
  name () {
    return 'circulo'
  }
}

export default new CirculoStore()
