import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from 'components/App'
import reducers from 'reducers'


const store = createStore(
    reducers,
    applyMiddleware(thunk),
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path='/' component={App} />
        </Router>
    </Provider>,
    document.getElementById('app')
)
