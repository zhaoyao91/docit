import React from 'react'
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom'

import Page1 from './pages/page1'

export default () => (
  <Router>
    <div>
      <Route path="/page1" component={Page1}/>
    </div>
  </Router>
)