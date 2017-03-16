export function buildSingletonModule(buildModule) {
  let result = null;
  return async function getModule() {
    if (!result) result = await buildModule();
    return result;
  }
}

export async function loadModule(load) {
  return new Promise((resolve) => {
    load(module => resolve(module.default ? module.default : module))
  })
}

export async function loadAppModule(load) {
  const module = await loadModule(load);
  return await module();
}