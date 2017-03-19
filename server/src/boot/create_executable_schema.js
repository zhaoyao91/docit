import { makeExecutableSchema } from 'graphql-tools'

import schema from '../graphql/schema'
import buildResolvers from '../graphql/resolvers'

export default function (context) {
  return makeExecutableSchema({
    typeDefs: schema,
    resolvers: buildResolvers(context),
  })
}