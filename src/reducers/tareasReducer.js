import {
  TRAER_TODAS,
  CAMBIO_USUARIO_ID,
  CARGANDO,
  ERROR,
  CAMBIO_TITULO,
  GUARDAR,
  ACTUALIZAR,
} from '../types/tareasTypes'

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: '',
  usuario_id: '',
  titulo: '',
  regresar: false,
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type){
    case TRAER_TODAS:
      return {
        ...state,
        tareas: action.payload,
        cargando: false,
        regresar: false,
        error: null,
      }
    case CARGANDO:
      return {
        ...state,
        cargando: true
      }
    case ERROR:
      return {
        ...state,
        error: action.payload,
        cargando: false
      }
    case CAMBIO_USUARIO_ID:
      return {
        ...state,
        usuario_id: action.payload
      }
    case CAMBIO_TITULO:
      return {
        ...state,
        titulo: action.payload
      }
    case GUARDAR:
      return {
        ...state,
        tareas: {},
        cargando: false,
        regresar: true,
        error: null,
        usuario_id: '',
        titulo: '',
      }
    case ACTUALIZAR:
      return {
        ...state,
        tareas: action.payload,
      }
    default:
      return state
  }
}
