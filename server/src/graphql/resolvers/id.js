import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'

export default new GraphQLScalarType({
  name: 'ID',
  description: 'ID custom scalar type',
  serialize(value) {
    return value // value sent to the client
  },
  parseValue(value) {
    return value // value from the client
  },
  parseLiteral(ast) {
    if (ast.kind === Kind.STRING) {
      return ast.value // ast value is always in string format
    }
    return null
  },
})