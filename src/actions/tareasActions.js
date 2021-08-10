import axios from 'axios'
import {
  TRAER_TODAS,
  CAMBIO_USUARIO_ID,
  CARGANDO, ERROR,
  CAMBIO_TITULO,
  ACTUALIZAR,
  GUARDAR,
  LIMPIAR,
} from '../types/tareasTypes'

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
    type: CAMBIO_USUARIO_ID,
    payload: usuarioID
  })
}

export const cambioTitulo = (titulo) => (dispatch) => {
  dispatch({
    type: CAMBIO_TITULO,
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
      type: GUARDAR,

    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Intente mas tarde'
    })
  }
}

export const editar = tarea_editada => async dispatch => {
  dispatch({
    type: CARGANDO
  })

  try{
    const respuesta = await axios.put(`https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`, tarea_editada)

    dispatch({
      type: GUARDAR,

    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Intente mas tarde'
    })
  }
}

export const cambioCheck = (usuario_id,tareaID) => (dispatch, getState) => {
  const {tareas} = getState().tareasReducer
  const seleccionada = tareas[usuario_id][tareaID]
  const actualizadas = {
    ...tareas
  }

  actualizadas[usuario_id] = {
    ...tareas[usuario_id]
  }
  actualizadas[usuario_id][tareaID] = {
    ...tareas[usuario_id][tareaID],
    completed: !seleccionada.completed,
  }

  dispatch({
    type: ACTUALIZAR,
    payload: actualizadas,
  })
}

export const eliminar = tareaID => async dispatch => {
  dispatch({
    type: CARGANDO,
  })

  try{
    const respuesta = await axios.delete((`https://jsonplaceholder.typicode.com/todos/${tareaID}`))
    dispatch({
      type: TRAER_TODAS,
      payload: {}
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Servicio no disponible',
    })
  }
}

export const limpiarForma = () => dispatch => {
  dispatch({
    type: LIMPIAR,
  })
}
