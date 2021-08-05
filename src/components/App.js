import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Menu from './Menu'
import Usuarios from './usuarios/Index'

const Tareas = () => <div>Tareas</div>

const App = (props) => (
  <BrowserRouter>
    <Menu/>
    <Route exact path={'/'} component={Usuarios} />
    <Route exact path={'/tareas'} component={Tareas} />
  </BrowserRouter>
)

export default App
