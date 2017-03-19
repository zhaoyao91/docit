import { ObjectId } from 'mongodb'

export default function ({collections, services}) {
  const {Users} = collections
  const {Password: PasswordService} = services

  return {
    async createUser(email, password) {
      // check if the user is duplicate
      {
        const user = await Users.findOne({email})
        if (user) {
          throw new Error('duplicate user')
        }
      }

      // hash password
      const encryptOptions = PasswordService.getEncryptOptions()
      const hash = await PasswordService.hashPassword(password, encryptOptions)

      // make user
      const now = new Date()
      const user = {
        email,
        password: {
          hash,
          encryptOptions,
        },
        createdAt: now,
        updatedAt: now,
      }

      // insert user
      const result = await Users.insertOne(user)

      return {
        _id: result.insertedId,
        ...user
      }
    },

    async findUserById(id) {
      return await Users.findOne({_id: ObjectId(id)})
    }
  }
}
