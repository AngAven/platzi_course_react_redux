import axios from 'axios'
import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionestypes'


// export const traerTodos = () => async (dispatch) => {
//   dispatch({
//     type: CARGANDO
//   })
//
//   try{
//     const publicaciones = await axios.get('https://jsonplaceholder.typicode.com/posts')
//     dispatch({
//       type: TRAER_POR_USUARIO,
//       payload: publicaciones.data
//     })
//   } catch (error) {
//     dispatch({
//       type: ERROR,
//       payload: 'Algo salió mal, intente mas tarde',
//     })
//   }
// }

export const traerPorUsuario = (key) => async (dispatch, getState) => {
  const {usuarios} = getState().usuariosReducer
  const {publicaciones} = getState().publicacionesReducer
  const usuario_id = usuarios[key].id
  const publicacionesDelusuario = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
  const publicaciones_actualizadas = [
    ...publicaciones,
    publicacionesDelusuario.data,
  ]

  dispatch({
    type: CARGANDO
  })

  dispatch({
    type: TRAER_POR_USUARIO,
    payload: publicaciones_actualizadas
  })
}
