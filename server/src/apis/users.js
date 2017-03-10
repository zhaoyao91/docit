import Router from 'koa-router';

export default function ({services}) {
  const {User} = services;
  const router = new Router();

  /**
   * create a new user with email and password
   * @param email
   * @param password
   * @return user - {_id, email}
   * @error {status: 403, error: 'duplicate user'}
   *
   * todo check params
   */
  router.post('/users', async function (ctx) {
    try {
      const {email, password} = ctx.request.body;
      const user = await User.createUser({email, password});
      ctx.body = {user};
    }
    catch (err) {
      if (err.message === 'duplicate user') {
        ctx.status = 403;
        ctx.body = {error: err.message};
      }
      else {
        throw err
      }
    }
  });

  return router;
}