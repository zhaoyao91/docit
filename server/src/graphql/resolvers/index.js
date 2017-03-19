import IDScalar from './id'
import DateScalar from './date'

export default function ({collections, services}) {
  const {Users} = collections

  return {
    Query: {
      findUserById(obj, args, ctx, info) {
        // todo
      }
    },

    Mutation: {
      async createUser(obj, args, ctx, info) {
        const {email, password} = args
        const user = {
          email,
          password,
          createdAt: new Date(),
          updatedAt: new Date(),
        }
        await Users.insertOne(user)
        return user
      }
    },

    User: {
      id: user => user._id
    },

    ID: IDScalar,
    Date: DateScalar,
  }
}