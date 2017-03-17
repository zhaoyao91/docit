import React from 'react'
import ReactDOM from 'react-dom'
import Routes from './routes'

export default () => (
  <div>
    <Routes/>
  </div>
)

export function mountApp (App) {
  const container = document.createElement('div')
  container.dataset.reactcontainer = ''
  document.body.appendChild(container)
  ReactDOM.render(<App/>, container)
}
