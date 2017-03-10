import buildModels from './models';
import buildServices from './services';
import buildAPIs from './apis';
import settings from './settings';

async function boot() {
  // build server
  const models = await buildModels({settings});
  const services = await buildServices({models});
  const apis = await buildAPIs({services});

  // start server
  const port = 3000;
  apis.listen(port, () => {
    console.log(`server started at port ${port}`);
  });
}

boot().catch(err => {
  console.error(err);
  process.exit(1);
});