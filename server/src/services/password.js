import bcrypt from 'bcryptjs';

import ServiceError from './lib/service_error';

const saltLength = 10;

export default function ({models}) {
  const {Password} = models;

  return {
    /**
     * set password for a user
     * @param userId
     * @param password
     */
    async setPassword(userId, password) {
      const hash = await hashPassword(password);
      const result = await Password.update({userId}, {$set: {hash}}, {upsert: true});
      if (!result.ok) {
        console.warn('failed to set password');
      }
    },

    /**
     * check if the password of specified user is right
     * @param userId
     * @param password
     *
     * @error {name: 'ServiceError', code: 'no-password'}
     * @error {name: 'ServiceError', code: 'wrong-password'}
     */
    async checkPassword(userId, password) {
      const passwordData = await Password.findOne({userId});
      if (!passwordData) {
        throw new ServiceError('no-password', 'this user does not have any password set yet');
      }
      const matched = await comparePassword(password, passwordData.hash);
      if (!matched) {
        throw new ServiceError('wrong-password');
      }
    }
  };
}

async function hashPassword(password) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, saltLength, (err, hashedPassword) => {
      if (err) reject(err);
      else resolve(hashedPassword);
    })
  })
}

async function comparePassword(password, hashedPassword) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hashedPassword, (err, matched) => {
      if (err) reject(err);
      else resolve(matched);
    })
  })
}
