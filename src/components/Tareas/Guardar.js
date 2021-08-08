import React, {Component} from 'react'

//Redux
import {connect} from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'

class Guardar extends Component {
  cambioUsuarioId = e => {
    this.props.cambioUsuarioID(e.target.value)
  }

  cambioTitulo = e => {
    this.props.cambioTitulo(e.target.value)
  }

  render(){
    return (
      <div>
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          value={this.props.usuario_id}
          onChange={this.cambioUsuarioId}
        />
        <br/>
        <br/>
        Título
        <input
          type="text"
          value={this.props.titulo}
          onChange={this.cambioTitulo}
        />
        <br/>
        <br/>
        <button>Guardar</button>
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(
  mapStateToProps,
  tareasActions,
)(Guardar)
