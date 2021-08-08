import axios from 'axios'
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionestypes'


export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try{
    const publicaciones = await axios.get('https://jsonplaceholder.typicode.com/posts')
    dispatch({
      type: TRAER_TODOS,
      payload: publicaciones.data
    })
  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal, intente mas tarde',
    })
  }
}

export const traerPorUsuario = (key) => async (dispatch, getState) => {
  const {usuarios} = getState().usuariosReducer
  const usuario_id = usuarios[key].id

  dispatch({
    type: CARGANDO
  })

  const publicaciones = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)

  dispatch({
    type: TRAER_TODOS,
    payload: publicaciones.data
  })
}
