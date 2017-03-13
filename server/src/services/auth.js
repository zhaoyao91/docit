/**
 * Now we use symmetric algorithm to encode the token, so we can't parse the token in client.
 * In the future we may consider to replace it with asymmetric algorithm, if there is any valuable use case.
 */

import jwt from 'jsonwebtoken';

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
     * @error see https://github.com/auth0/node-jsonwebtoken#errors--codes
     */
    async parseToken(token) {
      return await new Promise((resolve, reject) => {
        jwt.verify(token, secret, {
          algorithms: [algorithm],
          maxAge: validDuration,
        }, (err, payload) => {
          if (err) reject(err);
          else resolve(payload.userId);
        })
      })
    }
  }
}