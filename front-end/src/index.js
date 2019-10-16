import React from 'react'
import { render } from 'react-dom'
import thunk from 'redux-thunk'
import { Provider } from 'react-redux'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import index from './redux/reducers'
import initialState from './redux/reducers/initialstate'
import { App } from './components'
import { createStore, applyMiddleware } from 'redux'

const store = createStore(index, initialState, applyMiddleware(thunk))

render(
  <BrowserRouter>
    <Provider store={store}>
      <Switch>
        <Route path="/" component={App} />
      </Switch>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
)
