import {find, isMatch} from 'lodash';

/**
 * map status code by error matching
 * @param statusMaps - array of [status, errorPattern]
 */
export default function (...statusMaps) {
  return async function (ctx, next) {
    try {
      await next();
    }
    catch (err) {
      const matchedMap = find(statusMaps, ([status, pattern]) => isMatch(err, pattern));
      if (matchedMap) {
        const [status, pattern] = matchedMap;
        err.status = err.status || status;
      }
      else {
        console.warn('some error was thrown without any status mapping', err);
      }
      throw err;
    }
  }
}