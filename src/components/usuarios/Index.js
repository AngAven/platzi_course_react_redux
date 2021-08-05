import React, { Component } from 'react';

// Redux
import { connect } from 'react-redux'
import * as usuariosActions from '../../actions/usuariosActions'

class Usuarios extends Component {
  componentDidMount(){
    console.log(this.props.usuarios.data)
    this.props.traerTodos()
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
      <div>
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
      </div>
    );
  }
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps, usuariosActions)(Usuarios);
