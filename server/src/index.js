import path from 'path'

import connectMongodb from './lib/connect_mongodb'
import createCollections from './lib/create_collections'
import createServices from './lib/create_services'

async function boot () {
  const mongodb = await connectMongodb('mongodb://127.0.0.1:27017/docit')
  const collections = await createCollections(mongodb, path.resolve(__dirname, './collections'))
  const services = await createServices(collections, path.resolve(__dirname, './services'))
}

boot().catch(err => {
  console.error(err)
  process.exit(1)
})