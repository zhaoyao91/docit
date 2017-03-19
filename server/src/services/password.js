import bcrypt from 'bcryptjs'

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
      if (algorithm !== 'bcrypt') throw new PasswordServiceError('invalid algorithm')
      if (round !== 10) throw new PasswordServiceError('invalid round')

      return await hashPassword(password, round)
    },

    async comparePassword(password, hash, encryptOptions) {
      const {algorithm} = encryptOptions
      if (algorithm !== 'bcrypt') throw new PasswordServiceError('invalid algorithm')

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

class PasswordServiceError extends Error {
  constructor (message) {
    super(message)
    this.name = 'PasswordServiceError'
  }
}