import React from 'react'
import {Link} from 'react-router-dom'

// Redux
import {connect} from 'react-redux'

const Tabla = props => {
  const ponerFilas = () => props.usuarios.map((usuario, key) => (
      <tr key={usuario.id}>
        <td>{ usuario.name }</td>
        <td>{ usuario.email }</td>
        <td>{ usuario.website }</td>
        <td>
          <Link to={`/publicaciones/${key}`}>
            <div className="eye-solid icon"></div>
          </Link>
        </td>
      </tr>
    ))

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
      { ponerFilas() }
      </tbody>
    </table>
  )
}

const mapStateToProps = (reducers) => {
  return reducers.usuariosReducer
}

export default connect(mapStateToProps)(Tabla)
