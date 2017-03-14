/**
 * Now we use symmetric algorithm to encode the token, so we can't parse the token in client.
 * In the future we may consider to replace it with asymmetric algorithm, if there is any valuable use case.
 */

import jwt from 'jsonwebtoken';

import wrapError from './lib/wrap_errro';

const algorithm = 'HS256';

export default function ({settings}) {
  const {secret, validDuration} = settings.jwt;

  return {
    /**
     * create an auth token
     * @param userId
     * @returns token
     */
    async createToken(userId) {
      return await new Promise((resolve, reject) => {
        jwt.sign({userId}, secret, {
          algorithm: algorithm,
          expiresIn: validDuration,
        }, (err, token) => {
          if (err) reject(err);
          else resolve(token);
        })
      })
    },

    /**
     * parse an auth token
     * @param token

     * @returns userId
     *
     * @error {name: 'ServiceError', code: 'TokenExpiredError'}
     * @error {name: 'ServiceError', code: 'JsonWebTokenError'}
     */
    async parseToken(token) {
      return await new Promise((resolve, reject) => {
        jwt.verify(token, secret, {
          algorithms: [algorithm],
          maxAge: validDuration,
        }, (err, payload) => {
          if (err) {
            if (err.name === 'TokenExpiredError') {
              err = wrapError(err, 'expiredAt');
            }
            else if (err.name === 'JsonWebTokenError') {
              err = wrapError(err);
            }
            reject(err);
          }
          else resolve(payload.userId);
        })
      })
    }
  }
}