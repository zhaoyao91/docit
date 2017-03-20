import IDScalar from './scarlars/id'
import DateScalar from './scarlars/date'

export default function ({services}) {
  const {Users: UsersService} = services

  return {
    Query: {
      async findUserById(obj, args, ctx, info) {
        const {id} = args
        return await UsersService.findUserById(id)
      }
    },

    Mutation: {
      async createUser(obj, args, ctx, info) {
        const {email, password} = args
        return await UsersService.createUser(email, password)
      }
    },

    User: {
      id: user => user._id
    },

    ID: IDScalar,
    Date: DateScalar,
  }
}