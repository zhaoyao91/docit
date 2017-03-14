export default function (AuthService) {
  return async function (ctx, next) {
    const authHeader = ctx.request.headers['authorization'];

    if (authHeader) {
      const [type, token] = authHeader.split(' ');

      if (type === 'Bearer') {
        let userId = null;
        try {
          userId = await AuthService.parseToken(token);
        }
        catch (err) {
          // if the token is invalid, just treat the user as unauthenticated and do not block the subsequent process
          if (err.name === 'ServiceError' && (err.code === 'TokenExpiredError' || err.code === 'JsonWebTokenError')) {
            console.warn('failed to parse auth token', {
              name: err.name,
              message: err.message,
              token,
            });
          }
          else {
            throw err;
          }
        }
        if (userId) {
          ctx.state.user = {
            _id: userId
          }
        }
      }
    }

    await next();
  }
}