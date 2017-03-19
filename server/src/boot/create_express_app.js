import express from 'express'
import bodyParser from 'body-parser'

export default function ({graphqlMiddleware, graphiqlMiddleware}) {
  const app = express()
  app.use('/graphql', bodyParser.json(), graphqlMiddleware)
  app.use('/graphiql', graphiqlMiddleware)
  return app
}