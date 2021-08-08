import {
  CARGANDO,
  ERROR,
  ACTUALIZAR,
  COMENTARIOS_CARGANDO,
  COMENTARIOS_ERROR,
  COMENTARIOS_ACTUALIZAR,
} from '../types/publicacionestypes'
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
    const nuevas = publicacionesDelUsuario.data.map(publicacion => ({
        ...publicacion,
        comentarios: [],
        abierto: false
    }))

    const publicaciones_actualizadas = [
      ...publicaciones,
      nuevas,
    ]

    dispatch({
      type: ACTUALIZAR,
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

export const abrirCerrar = (publicacion_key, comentario_key) => (dispatch, getState) => {
  const {publicaciones} = getState().publicacionesReducer
  const seleccionada = publicaciones[publicacion_key][comentario_key]
  const actualizada = {
    ...seleccionada,
    abierto: !seleccionada.abierto
  }
  const publicaciones_actualizadas = [...publicaciones]

  publicaciones_actualizadas[publicacion_key] = [
    ...publicaciones[publicacion_key]

  ]
  publicaciones_actualizadas[publicacion_key][comentario_key] = actualizada

  dispatch({
    type: ACTUALIZAR,
    payload: publicaciones_actualizadas
  })
}

export const traerComentarios = (publicacion_key, comentario_key) => async (dispatch, getState) => {
  try{
    dispatch({
      type: COMENTARIOS_CARGANDO
    })

    const {publicaciones} = getState().publicacionesReducer
    const seleccionada = publicaciones[publicacion_key][comentario_key]
    const respuesta = await axios.get(`https://jsonplaceholder.typicode.com/comments?postId=${seleccionada.id}`)
    const actualizada = {
      ...seleccionada,
      comentarios: respuesta.data
    }
    const publicaciones_actualizadas = [...publicaciones]

    publicaciones_actualizadas[publicacion_key] = [
      ...publicaciones[publicacion_key]

    ]
    publicaciones_actualizadas[publicacion_key][comentario_key] = actualizada

    dispatch({
      type: COMENTARIOS_ACTUALIZAR,
      payload: publicaciones_actualizadas,
    })

  } catch (error) {
    dispatch({
      type: COMENTARIOS_ERROR,
      payload: 'Comentarios no disponibles',
    })
  }
}
