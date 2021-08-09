import React, {Component} from 'react'
import {Redirect} from 'react-router-dom'

//Redux
import {connect} from 'react-redux'
import * as tareasActions from '../../actions/tareasActions'

//Componentes
import Fatal from '../general/Fatal'
import Spinner from '../general/Spinner'

class Guardar extends Component {
  cambioUsuarioId = e => {
    this.props.cambioUsuarioID(e.target.value)
  }

  cambioTitulo = e => {
    this.props.cambioTitulo(e.target.value)
  }

  guardar = () => {
    const {usuario_id, titulo, agregar} = this.props
    const nuevaTarea = {
      userId: usuario_id,
      title: titulo,
      completed: false,
    }

    agregar(nuevaTarea)
  }

  deshabilitar = () => {
    const {titulo, usuario_id, cargando} = this.props
    if (cargando) return true
    if (!usuario_id || !titulo) return true
    return false
  }

  mostrarAccion = () => {
    const {error, cargando} = this.props

    if (cargando) return <Spinner/>
    if (error) return <Fatal mensaje={error}/>
  }

  render(){
    return (
      <div>
        {
          (this.props.regresar)
            ? <Redirect to={'/tareas'}/>
            : ''
        }
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
        <button
          onClick={this.guardar}
          disabled={this.deshabilitar()}
        >
          Guardar</button>

        {this.mostrarAccion()}
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(
  mapStateToProps,
  tareasActions,
)(Guardar)
