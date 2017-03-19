import React from 'react'
import ReactDOM from 'react-dom'

export default function mountApp (App) {
  const container = document.createElement('div')
  container.dataset.reactcontainer = ''
  document.body.appendChild(container)
  ReactDOM.render(<App/>, container)
}
