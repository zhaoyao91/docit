import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  Route,
  Link
} from 'react-router-dom';

import loadLazyComponent from './lib/load_lazy_component';
import pages from './pages';

export default () => (
  <Router>
    <div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/page1">Page 1</Link></li>
      </ul>

      {
        pages.map(([path, load]) => {
          return <Route key={path} path={path} component={loadLazyComponent(load)}/>
        })
      }
    </div>
  </Router>
);

export function mountApp(App) {
  const container = document.createElement('div');
  container.dataset.reactcontainer = "";
  document.body.appendChild(container);
  ReactDOM.render(<App/>, container);
}
