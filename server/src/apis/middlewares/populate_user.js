import {get} from 'lodash'

export default function (UserService) {
  return async function (ctx, next) {
    const userId = get(ctx.state.user, '_id');

    if (userId) {
      const user = await UserService.getUser(userId);
      if (user) {
        ctx.state.user = user;
      }
      else {
        console.warn(`cannot find user ${userId}`);
      }
    }

    await next();
  }
}