import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'

// Componentes
import Sppiner from '../general/Sppiner'
import Fatal from '../general/Fatal'

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
    return (
      <table className={"table"}>
        <thead>
        <tr>
          <th>Nombre</th>
          <th>Email</th>
          <th>Link</th>
        </tr>
        </thead>
        <tbody>
        { this.ponerFilas() }
        </tbody>
      </table>
    )
  }

  ponerFilas = () => (
    this.props.usuarios.map(usuario => (
      <tr key={usuario.id}>
        <td>
          { usuario.name }
        </td>
        <td>
          { usuario.email }
        </td>
        <td>
          { usuario.website }
        </td>
      </tr>
    ))
  )

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
