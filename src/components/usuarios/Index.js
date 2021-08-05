import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'

// Componentes
import Sppiner from '../general/Sppiner'
import Fatal from '../general/Fatal'
import Tabla from './Tabla'

class Usuarios extends Component {
  componentDidMount(){
    this.props.traerTodos()
  }

  ponerContenido = () => {
    if (this.props.cargando){
      return <Sppiner/>
    }
    if (this.props.error){
      return <Fatal mensaje={this.props.error}/>
    }
    return <Tabla usuarios={this.props.usuarios}/>
  }

  render(){
    return (
      <>
        { this.ponerContenido() }
      </>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps, usuariosActions)(Usuarios);
