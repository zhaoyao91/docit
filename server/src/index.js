import connectMongodb from './boot/connect_mongodb'
import createCollections from './boot/create_collections'
import createServices from './boot/create_services'
import createExecutableSchema from './boot/create_executable_schema'
import createGraphqlMiddleware from './boot/create_graphql_middleware'
import createGraphiqlMiddleware from './boot/create_graphiql_middleware'
import createExpressApp from './boot/create_express_app'
import startApp from './boot/start_app'

async function boot () {
  const mongodb = await connectMongodb()
  const collections = await createCollections({mongodb})
  const services = await createServices({collections})
  const executableSchema = await createExecutableSchema({collections, services})
  const graphqlMiddleware = await createGraphqlMiddleware({schema: executableSchema, services, collections})
  const graphiqlMiddleware = await createGraphiqlMiddleware()
  const app = await createExpressApp({graphqlMiddleware, graphiqlMiddleware})

  startApp({app})
}

boot().catch(err => {
  console.error(err)
  process.exit(1)
})