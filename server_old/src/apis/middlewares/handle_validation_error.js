import {pick} from 'lodash';

export default function () {
  return async function handleValidationError(ctx, next) {
    try {
      await next();
    }
    catch (err) {
      if (err.name === 'ValidationError') {
        ctx.status = err.status || 400;
        ctx.body = pick(err, 'name', 'message');
      }
      else throw err;
    }
  }
}