import React from 'react'
import { render } from 'react-dom'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import App from './components/App'
import rootReducer from './reducers'

import {ConnectedRouter} from "react-router-redux";
import {Route, Switch} from "react-router-dom";

import "assets/vendors/style";
import "styles/flexile.less";

const store = createStore(rootReducer)

render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root')
)
