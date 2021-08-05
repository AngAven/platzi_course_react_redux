import axios from 'axios'
import { TRAER_TODOS, CARGANDO, ERROR} from '../types/usuariostypes'

export const traerTodos = () => async (dispatch) =>{
  dispatch({
    type: CARGANDO
  })

  try{
    const usuarios = await axios.get('https://jsonplaceholder.typicode.com/users')

    dispatch({
      type: TRAER_TODOS,
      payload: usuarios.data,
    })

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Algo salió mal, intente mas tarde',
    })
  }
}
