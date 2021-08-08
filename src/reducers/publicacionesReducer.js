import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionestypes'

const INITIAL_STATE = {
  error: '',
  cargando: false,
  publicaciones: []
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case TRAER_POR_USUARIO:
      return {
        ...state,
        publicaciones: action.payload,
        cargando: false,
        error: null
      }
    case CARGANDO:
      return {
        ...state,
        cargando: true
      }
    case ERROR:
      return {
        ...state,
        cargando: false,
        error: action.payload,
      }
    default:
      return state
  }
}
