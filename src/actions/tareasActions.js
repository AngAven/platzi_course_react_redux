import axios from 'axios'
import { TRAER_TODAS, CARGANDO, ERROR} from '../types/tareasTypes'

export const traerTodas = () => async (dispatch) =>{
  dispatch({
    type: CARGANDO
  })

  try{
    const respuesta = await axios.get('https://jsonplaceholder.typicode.com/todos')
    const tareas = {}

    respuesta.data.map(tarea => {
      tareas[tarea.userId] = {
        ...tareas[tarea.userId],
        [tarea.id]: {
          ...tarea
        }
      }
    })

    dispatch({
        type: TRAER_TODAS,
      payload: tareas,
    })

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Información de tareas nodisponible',
    })
  }
}

export const cambioUsuarioID = (usuarioID) => (dispatch) => {
  dispatch({
    type: 'cambio_usuario_id',
    payload: usuarioID
  })
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: 'cambio_titulo',
    payload: titulo
  })
}

export const agregar = tarea => async dispatch => {
  dispatch({
    type: CARGANDO
  })

  try{
    const respuesta = await axios.post('https://jsonplaceholder.typicode.com/todos', tarea)

    dispatch({
      type: 'agregada',

    })
  } catch (error) {
    console.log(error)
    dispatch({
      type: ERROR,
      payload: 'Intente mas tarde'
    })
  }
}
