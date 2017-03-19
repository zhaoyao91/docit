import { graphiqlExpress } from 'graphql-server-express'

export default function () {
  return graphiqlExpress({endpointURL: '/graphql'})
}