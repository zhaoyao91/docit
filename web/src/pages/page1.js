import {buildSingletonModule, loadModule, loadAppModule} from '../core';

export default buildSingletonModule(async function () {
  const [
    React,
    Hello,
  ] = await Promise.all([
    loadModule(require('bundle-loader!react')),
    loadAppModule(require('bundle-loader!../views/hello')),
  ]);

  return () => (
    <div>
      <h1>Page 1</h1>
      <Hello/>
    </div>
  );
});