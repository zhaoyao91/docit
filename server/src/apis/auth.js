import Router from 'koa-router';
import validator, {object, string} from 'koa-context-validator';

export default function ({services, middlewares}) {
  const {Auth: AuthService} = services;

  const router = new Router();

  // todo add api to grant auth token

  return router;
}