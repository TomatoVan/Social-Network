import React from 'react'

import { render } from 'react-dom'
import './index.css'
import { Provider } from 'react-redux'
import { HashRouter } from 'react-router-dom'

import { App } from './app/App'
import { store } from './app/store'

render(
  <HashRouter>
    <Provider store={store}>
      <App />
    </Provider>
  </HashRouter>,
  document.getElementById('root')
)
