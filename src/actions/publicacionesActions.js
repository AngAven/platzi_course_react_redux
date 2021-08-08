import { TRAER_POR_USUARIO, CARGANDO, ERROR } from '../types/publicacionestypes'
import axios from 'axios'
import * as usuariosTypes from '../types/usuariostypes'

const {TRAER_TODOS: USUARIOS_TRAER_TODOS} = usuariosTypes

export const traerPorUsuario = (key) => async (dispatch, getState) => {
  dispatch({
    type: CARGANDO
  })

  const {usuarios} = getState().usuariosReducer
  const {publicaciones} = getState().publicacionesReducer
  const usuario_id = usuarios[key].id

  try{
    const publicacionesDelUsuario = await axios.get(`https://jsonplaceholder.typicode.com/posts?userId=${usuario_id}`)
    const publicaciones_actualizadas = [
      ...publicaciones,
      publicacionesDelUsuario.data,
    ]

    dispatch({
      type: TRAER_POR_USUARIO,
      payload: publicaciones_actualizadas
    })

    const publicaciones_key = publicaciones_actualizadas.length - 1
    const usuarios_actualizados = [...usuarios, ]

    usuarios_actualizados[key] = {
      ...usuarios[key],
      publicaciones_key,
    }

    dispatch({
      type: USUARIOS_TRAER_TODOS,
      payload: usuarios_actualizados
    })

  } catch (error) {
    console.log(error.message)
    dispatch({
      type: ERROR,
      payload: 'Publicaciones no disponibles'
    })
  }

}
