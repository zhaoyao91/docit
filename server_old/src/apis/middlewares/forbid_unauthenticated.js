export default function () {
  return async function (ctx, next) {
    if (ctx.state.user) await next();
    else {
      ctx.status = 401;
      ctx.body = 'you are not authenticated to access this api'
    }
  }
}