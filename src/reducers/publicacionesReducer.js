import {
  ACTUALIZAR,
  CARGANDO,
  ERROR,
  COMENTARIOS_CARGANDO,
  COMENTARIOS_ERROR,
  COMENTARIOS_ACTUALIZAR
} from '../types/publicacionestypes'

const INITIAL_STATE = {
  error: '',
  error_comentarios: '',
  cargando: false,
  cargando_comentarios: false,
  publicaciones: [],
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case ACTUALIZAR:
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
    case COMENTARIOS_ACTUALIZAR:
      return {
        ...state,
        publicaciones: action.payload,
        cargando_comentarios: false,
        error_comentarios: null
      }
    case COMENTARIOS_CARGANDO:
      return {
        ...state,
        cargando_comentarios: true,
        error_comentarios: null
      }
    case COMENTARIOS_ERROR:
      return {
        ...state,
        cargando_comentarios: false,
        error_comentarios: action.payload,
      }
    default:
      return state
  }
}
