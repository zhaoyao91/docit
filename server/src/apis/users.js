import Router from 'koa-router';
import {pick} from 'lodash';
import validator, {object, string} from 'koa-context-validator';

export default function ({services, middlewares}) {
  const {User: UserService, Password: PasswordService} = services;

  const {errorStatusMap} = middlewares;

  const router = new Router();

  /**
   * create a new user with email and password
   * @return body.user - {_id, email}
   */
  router.post(
    '/users',
    errorStatusMap(
      [403, {name: 'ServiceError', code: 'user-already-exists'}]
    ),
    validator({
      body: object().keys({
        email: string().email().required(),
        password: string().required(),
      })
    }),
    async function (ctx) {
      const {email, password} = ctx.request.body;

      {
        const user = await UserService.findUserByEmail(email);
        await UserService.checkUserNotExists(user);
      }

      const user = await UserService.createUser(email);
      await PasswordService.setPassword(user._id, password);

      ctx.body = {
        user: pick(user, '_id', 'email')
      };
    }
  );

  return router;
}