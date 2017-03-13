import Router from 'koa-router';
import {pick} from 'lodash';
import validator, {object, string} from 'koa-context-validator';

export default function ({services}) {
  const {User: UserService, Password: PasswordService} = services;

  const router = new Router();

  /**
   * create a new user with email and password
   * @param email
   * @param password
   * @return user - {_id, email}
   * @error {status: 403, error: 'duplicate user'}
   */
  router.post(
    '/users',
    validator({
      body: object().keys({
        email: string().email().required(),
        password: string().required(),
      })
    }),
    async function (ctx) {
      try {
        const {email, password} = ctx.request.body;

        const user = await UserService.createUser({email});
        await PasswordService.setPassword({userId: user._id, password});

        ctx.body = {
          user: pick(user, '_id', 'email')
        };
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
    }
  );

  return router;
}