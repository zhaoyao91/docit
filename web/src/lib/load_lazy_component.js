import {buildSingletonModule, loadModule, loadAppModule} from '../core';

export default buildSingletonModule(async function () {
  const [
    React
  ] = await Promise.all([
    loadModule(require('bundle-loader!react'))
  ]);

  const DefaultLoading = () => (
    <div>Loading...</div>
  );

  return function loadLazyComponent(load, loading = () => <DefaultLoading/>) {
    class LazyLoad extends React.Component {
      state = {
        mod: null
      };

      componentWillMount() {
        loadAppModule(load).then(mod => {
          this.setState({
            mod: mod.default ? mod.default : mod
          })
        });
      }

      render() {
        const {mod: Mod} = this.state;
        return Mod ? <Mod {...this.props}/> : loading();
      }
    }

    return LazyLoad;
  }
})
