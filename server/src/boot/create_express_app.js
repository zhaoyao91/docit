import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'

export default function ({graphqlMiddleware, graphiqlMiddleware}) {
  const app = express()
  app.use(cors())
  app.use('/graphql', bodyParser.json(), graphqlMiddleware)
  app.use('/graphiql', graphiqlMiddleware)
  return app
}