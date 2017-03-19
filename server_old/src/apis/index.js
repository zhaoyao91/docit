import Koa from 'koa';
import koaBody from 'koa-body';
import cors from 'kcors';

import routerList from './router_list';
import handleValidationErrorMiddleware from './middlewares/handle_validation_error';
import authenticateMiddleware from './middlewares/authenticate';
import forbidUnauthenticatedMiddleware from './middlewares/forbid_unauthenticated';
import populateUserMiddleware from './middlewares/populate_user';
import handleServiceErrorMiddleware from './middlewares/handle_service_error'
import errorStatusMapMiddleware from './middlewares/error_status_map';

export default function (context) {
  const {services} = context;

  const apis = new Koa();

  // add global middlewares
  apis.use(cors());
  apis.use(koaBody());
  apis.use(handleValidationErrorMiddleware());
  apis.use(handleServiceErrorMiddleware());

  // initialize common middlewares for routers to use
  const middlewares = {
    authenticate: authenticateMiddleware(services.Auth),
    forbidUnauthenticated: forbidUnauthenticatedMiddleware(),
    populateUser: populateUserMiddleware(services.User),
    errorStatusMap: errorStatusMapMiddleware
  };

  addRouters(apis, routerList, {
    ...context,
    middlewares,
  });

  return apis;
}

function addRouters(apis, routerBuilders, context) {
  const routers = routerBuilders.map(buildRouter => buildRouter(context));
  routers.forEach(router => {
    apis.use(router.routes());
    apis.use(router.allowedMethods());
  });
}