import axios from 'axios'
import { TRAER_TODAS, CARGANDO, ERROR} from '../types/tareasTypes'

export const traerTodas = () => async (dispatch) =>{
  dispatch({
    type: CARGANDO
  })

  try{
    const tareas = await axios.get('https://jsonplaceholder.typicode.com/todos')

    dispatch({
        type: TRAER_TODAS,
      payload: tareas.data,
    })

  } catch (error) {
    dispatch({
      type: ERROR,
      payload: 'Información de tareas nodisponible',
    })
  }
}
