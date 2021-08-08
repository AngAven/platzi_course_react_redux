import React, {Component} from 'react'

//Redux
import {connect} from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'
import {traerPorUsuario} from '../../actions/publicacionesActions'

import Spinner from '../general/Sppiner'
import Fatal from '../general/Fatal'
import Sppiner from '../general/Sppiner'

const {traerTodos: usuariosTraerTodos} = usuariosActions
const {traerPorUsuario: publicacionesTraerPorUsuario} = publicacionesActions

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
      return <Sppiner/>
    }

    const nombre_de_usuario = usuariosReducer.usuarios[key].name

    return <h1>Publicaciones de {nombre_de_usuario} </h1>
  }

  render(){
    console.log(this.props)
    return (
      <div>
        { this.ponerUsuario() }
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
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)
