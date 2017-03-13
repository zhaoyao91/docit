export default function () {
  return async function (ctx, next) {
    try {
      await next();
    }
    catch (err) {
      if (err.name === 'ValidationError') {
        ctx.status = 400;
        ctx.body = {
          error: err.message
        }
      }
      else throw err;
    }
  }
}