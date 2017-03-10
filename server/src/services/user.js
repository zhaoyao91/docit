import bcrypt from 'bcryptjs';
import {pick} from 'lodash';

const saltLength = 10;

export default function ({models}) {
  const {User} = models;

  return {
    /**
     * create a new user
     * @param email
     * @param password
     * @returns user
     */
    async createUser({email, password}) {
      const duplicateUser = await User
        .findOne({email})
        .select({_id: 1})
        .exec();

      if (duplicateUser) throw new Error('duplicate user');

      const hashedPassword = await hashPassword(password);

      const newUser = await User.create({email, password: hashedPassword});

      const publicFields = ['_id', 'email'];
      return pick(newUser.toObject(), publicFields);
    },

    findUser({id}) {

    },

    checkPassword({id, password}) {

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