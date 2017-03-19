import path from 'path'

import connectMongoose from './boot/connect_mongoose'
import createModels from './boot/create_models'

async function boot () {
  const mongoose = await connectMongoose()
  const models = await createModels(mongoose, path.resolve(__dirname, './models'))
}

boot().catch(err => {
  console.error(err)
  process.exit(1)
})