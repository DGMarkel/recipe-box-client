import React from 'react';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { createStore, applyMiddleware, compose } from 'redux'
import { BrowserRouter } from 'react-router-dom'
import PrelimReducer from './reducers/PrelimReducer'
import './index.css';
import App from './App';

import { loadState, saveState } from './modules/LocalStorage'

const persistedState = loadState()

const store = createStore(
  PrelimReducer,
  persistedState,
  compose(
    applyMiddleware(thunk),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  )
)

store.subscribe(()=>{
  saveState(store.getState())
})

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root'));
