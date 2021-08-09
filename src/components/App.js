import React from 'react'
import { BrowserRouter, Route } from 'react-router-dom'

import Menu from './Menu'
import Usuarios from './usuarios/Index'
import Publicaciones from './publicaciones'
import Tareas from './Tareas'
import TareasGuardar from './Tareas/Guardar'
import Guardar from './Tareas/Guardar'

const App = (props) => (
  <BrowserRouter>
    <Menu/>
    <div className={'margin'}>
      <Route exact path={'/'} component={Usuarios} />
      <Route exact path={'/tareas'} component={Tareas} />
      <Route exact path={'/tareas/guardar'} component={TareasGuardar} />
      <Route exact path={'/tareas/guardar/:usuario_id/:tareaID'} component={Guardar} />
      <Route exact path={'/publicaciones/:key'} component={Publicaciones} />
    </div>
  </BrowserRouter>
)

export default App
