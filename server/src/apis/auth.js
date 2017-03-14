import Router from 'koa-router';
import validator, {object, string} from 'koa-context-validator';

export default function ({services, middlewares}) {
  const {
    Auth: AuthService,
    User: UserService,
    Password: PasswordService,
  } = services;

  const router = new Router();

  // todo add api to grant auth token

  /**
   * grant an auth token by checking email and password
   * @param body.email
   * @param body.password
   *
   * @return body.token
   *
   * @error 403 {name: 'ServiceError', code: 'no-user'}
   * @error 403 {name: 'ServiceError', code: 'no-password'}
   * @error 403 {name: 'ServiceError', code: 'wrong-password'}
   */
  router.post(
    '/auth/token',
    validator({
      body: object().keys({
        email: string().email().required(),
        password: string().required(),
      })
    }),
    async function (ctx) {
      const {email, password} = ctx.request.body;

      const user = await UserService.findUserByEmail(email);
      UserService.checkUserExists(user);

      await PasswordService.checkPassword(user._id, password);

      const token = await AuthService.createToken(user._id);

      ctx.body = {token};
    }
  );

  return router;
}