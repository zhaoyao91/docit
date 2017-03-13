import bcrypt from 'bcryptjs';

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
        throw new Error(`failed to set password for user ${userId}`);
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
