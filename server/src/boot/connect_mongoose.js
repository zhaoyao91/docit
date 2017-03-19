import mongoose from 'mongoose'

export default async () => {
  // plugin Promise implementation, see http://mongoosejs.com/docs/promises.html
  mongoose.Promise = global.Promise;

  return await mongoose.createConnection('mongodb://127.0.0.1:27017/docit')
}