import {buildSingletonModule, loadModule, loadAppModule} from './core';

export default buildSingletonModule(async function () {
  const [
    ReactRouterDOM,
    ReactDOM,
    React,
    loadLazyComponent,
    pages
  ] = await Promise.all([
    loadModule(require('bundle-loader!react-router-dom')),
    loadModule(require('bundle-loader!react-dom')),
    loadModule(require('bundle-loader!react')),
    loadAppModule(require('bundle-loader!./lib/load_lazy_component')),
    loadAppModule(require('bundle-loader!./pages'))
  ]);

  const {BrowserRouter: Router, Route, Link} = ReactRouterDOM;

  const App = () => (
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

  return function mountApp() {
    const container = document.createElement('div');
    container.dataset.reactcontainer = "";
    document.body.appendChild(container);
    ReactDOM.render(<App/>, container);
  }
});



