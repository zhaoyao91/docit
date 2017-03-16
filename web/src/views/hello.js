import {buildSingletonModule, loadModule, loadAppModule} from '../core';

export default buildSingletonModule(async function () {
  const [
    React,
    moment,
  ] = await Promise.all([
    loadModule(require('bundle-loader!react')),
    loadModule(require('bundle-loader!moment')),
  ]);

  return () => (
    <h1>Hello World {moment().toString()}</h1>
  );
});