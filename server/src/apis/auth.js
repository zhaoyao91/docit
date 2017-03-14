import Router from 'koa-router';
import validator, {object, string} from 'koa-context-validator';

export default function ({services, middlewares}) {
  const {
    Auth: AuthService,
    User: UserService,
    Password: PasswordService,
  } = services;

  const {errorStatusMap} = middlewares;

  const router = new Router();

  /**
   * grant an auth token by checking email and password
   * @return body.token
   */
  router.post(
    '/auth/token',
    validator({
      body: object().keys({
        email: string().email().required(),
        password: string().required(),
      })
    }),
    errorStatusMap(
      [403, {name: 'ServiceError', code: 'user-not-exists'}],
      [403, {name: 'ServiceError', code: 'no-password'}],
      [403, {name: 'ServiceError', code: 'wrong-password'}],
    ),
    async function (ctx) {
      const {email, password} = ctx.request.body;

      const user = await UserService.findUserByEmail(email);
      UserService.checkUserExists(user);

      await PasswordService.checkPassword(user._id, password);

      const token = await AuthService.createToken(user._id);

      ctx.body = {token};
    }
  );

  /**
   * refresh auth token
   * @return body.token
   */
  router.post(
    '/auth/token/refresh',
    validator({
      body: object().keys({
        token: string().required()
      })
    }),
    errorStatusMap(
      [403, {name: 'ServiceError', code: 'token-expired'}],
      [403, {name: 'ServiceError', code: 'invalid-token'}],
    ),
    async function (ctx) {
      const {token} = ctx.request.body;

      const userId = await AuthService.parseToken(token);
      const newToken = await AuthService.createToken(userId);

      ctx.body = {token: newToken}
    }
  );

  return router;
}