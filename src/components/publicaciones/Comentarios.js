import React from 'react'

//Redux
import {connect} from 'react-redux'

//Componentes
import Spinner from '../general/Spinner'
import Fatal from '../general/Fatal'

const Comentarios = props => {
  if (props.error_comentarios){
    return <Fatal mensaje={props.error_comentarios}/>
  }
  if (props.cargando_comentarios && !props.comentarios.length){
    return <Spinner/>
  }

  const ponerComentarios = () => {
    return (
      props.comentarios.map(comentario => (
        <li key={comentario.id}>
          <b><u>{comentario.email}</u></b>
          <br/>
          <p>{comentario.body}</p>
        </li>
      ))
    )
  }
  return (
    <ul>
      { ponerComentarios()}
    </ul>
  )
}

const mapStateToProps = ({publicacionesReducer}) => publicacionesReducer

export default connect(mapStateToProps)(Comentarios)
