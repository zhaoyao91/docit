import Koa from 'koa';
import koaBody from 'koa-body';

import routerList from './router_list';

export default function (context) {
  const apis = new Koa();

  apis.use(koaBody());

  addRouters(apis, routerList, context);

  return apis;
}

function addRouters(apis, routerBuilders, context) {
  const routers = routerBuilders.map(buildRouter => buildRouter(context));
  routers.forEach(router => {
    apis.use(router.routes());
    apis.use(router.allowedMethods());
  });
}