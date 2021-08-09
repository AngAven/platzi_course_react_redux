import React, {Component} from 'react'

// Redux
import {connect} from 'react-redux'
import * as tareasActions  from '../../actions/tareasActions'
import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'
import {Link} from 'react-router-dom'

class Tareas extends Component {
  componentDidMount(){
    if (!Object.keys(this.props.tareas).length){
      this.props.traerTodas()
    }
  }

  mostrarContenido = () => {
    const {tareas, cargando, error} = this.props

    if (cargando) return <Spinner/>
    if (error) return <Fatal mensaje={error}/>

    return Object.keys(tareas).map(usuario_id => {
      return(
        <div key={usuario_id}>
          <h2>Usurio {usuario_id}</h2>
          <div className={"contenedor_tareas"}>{this.ponerTareas(usuario_id)}</div>
        </div>
      )
    })
  }

  ponerTareas = usuario_id => {
    const {tareas} = this.props
    const por_usuario = {
      ...tareas[usuario_id]
    }

    return Object.keys(por_usuario).map(tareaID => {
      return(
        <div key={tareaID}>
          <input type="checkbox" defaultChecked={por_usuario[tareaID].completed} key={tareaID}/>
          { por_usuario[tareaID].title }
          <button className={'m_left'}>
            <Link to={`/tareas/guardar/${usuario_id}/${tareaID}` }>
              Editar
            </Link>
          </button>
          <button className={'m_left'}>Eliminar</button>
        </div>
      )
    })
  }

  render(){
    return (
      <div>
        <button>
          <Link to={'/tareas/guardar'}>Agregar</Link>
        </button>
        { this.mostrarContenido() }
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas)
