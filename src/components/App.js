import React, { Component } from 'react';
import axios from 'axios'

class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      usuarios: []
    }
  }

  async componentDidMount(){
    console.log('Componenete montado => componentDidMount()')
    const usuarios = await axios.get('https://jsonplaceholder.typicode.com/users')
    this.setState({
      usuarios: usuarios.data
    })
  }

  ponerFilas = () => (
    this.state.usuarios.map(usuario => (
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
      <div className={"margin"}>
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

export default App;
