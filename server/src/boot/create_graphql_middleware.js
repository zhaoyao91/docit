import { graphqlExpress } from 'graphql-server-express'

export default function ({schema}) {
  const options = request => ({
      schema: schema,
      debug: false,
    }
  )
  return graphqlExpress(options)
}