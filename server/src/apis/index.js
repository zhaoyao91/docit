import Koa from 'koa';
import koaBody from 'koa-body';

import {readModulesInDir} from '../utils/file';

export default async function (context) {
  const apis = new Koa();

  apis.use(koaBody());

  const routerBuilders = await readModulesInDir(__dirname, false);
  const routers = await Promise.all(routerBuilders.map(buildMap => buildMap(context)));

  routers.forEach(router => {
    apis.use(router.routes());
    apis.use(router.allowedMethods());
  });

  return apis;
}