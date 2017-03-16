import {buildSingletonModule, loadModule, loadAppModule} from '../core';

export default buildSingletonModule(async function() {
  return [
    ['/page1', require('bundle-loader?lazy!./page1')],
  ];
})