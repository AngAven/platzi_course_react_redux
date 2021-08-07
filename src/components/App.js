import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Menu from './Menu'
import Usuarios from './usuarios/Index'
import Publicaciones from './publicaciones'

const Tareas = () => <div>Tareas</div>

const App = (props) => (
  <BrowserRouter>
    <Menu/>
    <div className={'margin'}>
      <Route exact path={'/'} component={Usuarios} />
      <Route exact path={'/tareas'} component={Tareas} />
      <Route exact path={'/publicaciones/:key'} component={Publicaciones} />
    </div>
  </BrowserRouter>
)

export default App
