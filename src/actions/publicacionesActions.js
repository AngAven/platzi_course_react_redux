import axios from 'axios'
import { TRAER_TODOS, CARGANDO, ERROR } from '../types/publicacionestypes'


export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO
  })

  try{
    const publicaciones = axios.get('https://jsonplaceholder.typicode.com/posts')
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
