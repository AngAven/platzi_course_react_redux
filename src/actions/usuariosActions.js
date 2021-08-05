import axios from 'axios'

export const traerTodos = () => async (dispatch) =>{
  const usuarios = await axios.get('https://jsonplaceholder.typicode.com/users')

  dispatch({
    type: 'traer_usuarios',
    payload: usuarios.data
  })
}
