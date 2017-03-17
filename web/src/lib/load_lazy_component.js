import React from 'react'

const DefaultLoading = () => (
  <div>Loading...</div>
)

export default function loadLazyComponent (load, loading = () => <DefaultLoading/>) {
  class LazyLoad extends React.Component {
    state = {
      mod: null
    }

    componentWillMount () {
      load(mod => {
        this.setState({
          mod: mod.default ? mod.default : mod
        })
      })
    }

    render () {
      const {mod: Mod} = this.state
      return Mod ? <Mod {...this.props}/> : loading()
    }
  }

  return LazyLoad
}