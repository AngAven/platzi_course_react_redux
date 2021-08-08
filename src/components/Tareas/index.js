import React, {Component} from 'react'

// Redux
import {connect} from 'react-redux'
import * as tareasActions  from '../../actions/tareasActions'

class Tareas extends Component {
  componentDidMount(){
    this.props.traerTodas()
  }

  render(){
    console.log(this.props)
    return (
      <div>
        Tareas hola
      </div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps, tareasActions)(Tareas)
