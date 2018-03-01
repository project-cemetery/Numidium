import * as React from 'react'
import * as ReactDOM from 'react-dom'

import { BrowserRouter as Router, Route } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunk from 'redux-thunk'

import App from 'components/App'
import reducers from 'reducers'
import rest from 'util/rest'


const store = createStore(
    reducers,
    applyMiddleware(thunk.withExtraArgument(rest)),
)

ReactDOM.render(
    <Provider store={store}>
        <Router>
            <Route path='/' exact component={App} />
        </Router>
    </Provider>,
    document.getElementById('app')
)
