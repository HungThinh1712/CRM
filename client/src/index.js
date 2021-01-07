import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import store from './configStore'
import { Provider } from 'react-redux'
import { Route, Switch , BrowserRouter as Router} from "react-router-dom";

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
  document.getElementById('root')
)
