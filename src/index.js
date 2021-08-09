import React from 'react';
import ReactDOM from 'react-dom';
//Redux
import {createStore, applyMiddleware, compose} from 'redux'
import {Provider} from 'react-redux'
import reduxThunk from 'redux-thunk'
import reducers from './reducers/index'

import './css/index.css';
import './css/iconos.css';
import App from './components/App';
// import reportWebVitals from './reportWebVitals';

// Ver Redux en web dev tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__

const store = createStore(
  reducers, // reducers
  {}, // estado inicial
  compose(
    applyMiddleware(reduxThunk), // funciones async
    composeEnhancers()), // devtools
)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals(console.log);
