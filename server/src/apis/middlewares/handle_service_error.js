import {pick} from 'lodash';

export default function () {
  return async function handleServiceError(ctx, next) {
    try {
      await next();
    }
    catch (err) {
      if (err.name === 'ServiceError') {
        ctx.status = 403;
        ctx.body = pick(err, 'name', 'code', 'message', 'detail');
      }
      else throw err;
    }
  }
}