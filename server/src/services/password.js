import bcrypt from 'bcryptjs'

import {ServiceError} from '../lib/errors'

export default function () {
  return {
    getEncryptOptions() {
      return {
        algorithm: 'bcrypt',
        round: 10
      }
    },

    async hashPassword(password, encryptOptions) {
      const {algorithm, round} = encryptOptions
      if (algorithm !== 'bcrypt') throw new ServiceError('Password.invalid-algorithm')
      if (round !== 10) throw new ServiceError('Password.invalid-round')

      return await hashPassword(password, round)
    },

    async comparePassword(password, hash, encryptOptions) {
      const {algorithm} = encryptOptions
      if (algorithm !== 'bcrypt') throw new ServiceError('Password.invalid-algorithm')

      return await comparePassword(password, hash)
    },
  }
}

async function hashPassword (password, round) {
  return new Promise((resolve, reject) => {
    bcrypt.hash(password, round, (err, hash) => {
      if (err) reject(err)
      else resolve(hash)
    })
  })
}

async function comparePassword (password, hash) {
  return new Promise((resolve, reject) => {
    bcrypt.compare(password, hash, (err, hash) => {
      if (err) reject(err)
      else resolve(hash)
    })
  })
}