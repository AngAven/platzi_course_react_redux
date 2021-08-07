import React, {Component} from 'react'

//Redux
import {connect} from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'
import * as publicacionesActions from '../../actions/publicacionesActions'

const {traerTodos: usuariosTraerTodos} = usuariosActions
const {traerTodos: publicacionesTraerTodos} = publicacionesActions

class Publicaciones extends Component {

  componentDidMount(){
    if (!this.props.usuariosReducer.usuarios.length){
      this.props.usuariosTraerTodos()
      // this.props.publicacionesTraerTodos()
    }
  }

  render(){
    console.log(this.props)
    return (
      <div>
        <h1>Publicaciones de {'$nombre'}</h1>
        { this.props.match.params.key }
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
  publicacionesTraerTodos,
}

export default connect(mapStateToProps, mapDispatchToProps)(Publicaciones)
