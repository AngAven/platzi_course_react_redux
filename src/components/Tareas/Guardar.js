import React, {Component} from 'react'
import {connect} from 'react-redux'

class Guardar extends Component {
  render(){
    return (
      <div>
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input type="number"/>
        <br/>
        <br/>
        Título
        <input type="text"/>
        <br/>
        <br/>
        <button>Guardar</button>
      </div>
    )
  }
}

function mapStateToProps(state){
  return {}
}

export default connect(
  mapStateToProps,
)(Guardar)
