import React, {Component} from 'react'

//Redux
import {connect} from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'
import {traerPorUsuario} from '../../actions/publicacionesActions'

// Components
import Fatal from '../general/Fatal'
import Spinner from '../general/Spinner'
import Comentarios from './Comentarios'

const {traerTodos: usuariosTraerTodos} = usuariosActions
const {
  traerPorUsuario: publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios,
} = publicacionesActions

class Publicaciones extends Component {

  async componentDidMount(){
    const {
      usuariosTraerTodos,
      publicacionesTraerPorUsuario,
      match: { params: { key } }
    } = this.props

    if (!this.props.usuariosReducer.usuarios.length){
      await usuariosTraerTodos()
    }
    if (this.props.usuariosReducer.error){
      return
    }
    if (!('publicaciones_key' in this.props.usuariosReducer.usuarios[key])){
      publicacionesTraerPorUsuario(key)
    }
  }

  ponerUsuario = () => {
    const {
      usuariosReducer,
      match: { params: { key } }
    } = this.props

    if (usuariosReducer.error){
      return <Fatal mensaje={usuariosReducer.error}/>
    }
    if (!usuariosReducer.usuarios.length || usuariosReducer.cargando){
      return <Spinner/>
    }

    const nombre_de_usuario = usuariosReducer.usuarios[key].name

    return <h1>Publicaciones de {nombre_de_usuario} </h1>
  }

  ponerPublicaciones = () => {
    const {
      usuariosReducer,
      usuariosReducer: {usuarios},
      publicacionesReducer,
      publicacionesReducer: {publicaciones},
      match: { params: { key } },
    } =  this.props

    if (!usuarios.length){
      return
    }
    if (usuariosReducer.error){
      return
    }
    if (publicacionesReducer.cargando){
      return <Spinner/>
    }
    if (publicacionesReducer.error){
      return <Fatal mensaje={publicacionesReducer.error}/>
    }
    if (!publicaciones.length){
      return
    }
    if (!('publicaciones_key' in usuarios[key])){
      return
    }

    const {publicaciones_key} = usuarios[key]

    return this.mostrarInfo(publicaciones[publicaciones_key], publicaciones_key)
  }

  mostrarInfo = (publicaciones, publicacion_key) => (
    publicaciones.map((publicacion, comentario_key) => (
      <div
        className={'pub_titulo'}
        key={publicacion.id}
        onClick={
          () => this.mostrarComentarios(publicacion_key, comentario_key, publicacion.comentarios)
        }
      >
        <h2>{publicacion.title}</h2>
        <p>{publicacion.body}</p>
        {
          (publicacion.abierto)
            ? <Comentarios comentarios={publicacion.comentarios}/>
            : ''
        }
      </div>
    ))
  )

  mostrarComentarios = (publicacion_key, comentario_key, comentarios) => {
    this.props.abrirCerrar(publicacion_key, comentario_key)
    if (!comentarios.lenght){
      this.props.traerComentarios(publicacion_key, comentario_key)
    }
  }

  render(){
    console.log(this.props)
    return (
      <div>
        { this.ponerUsuario() }
        { this.ponerPublicaciones() }
      </div>
    )
  }
}

const mapStateToProps = ({publicacionesReducer, usuariosReducer}) => {
  return {
    usuariosReducer,
    publicacionesReducer,
  }
}

const mapDispatchToProps = {
  usuariosTraerTodos,
  publicacionesTraerPorUsuario,
  abrirCerrar,
  traerComentarios,
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)
