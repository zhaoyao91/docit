import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import IndexPage from './pages/index'
import SignupPage from './pages/signup'

export default () => (
  <Router>
    <div>
      <Route exact path="/" component={IndexPage}/>
      <Route exact path="/signup" component={SignupPage}/>
    </div>
  </Router>
)