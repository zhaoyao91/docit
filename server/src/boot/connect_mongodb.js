import { MongoClient } from 'mongodb'

export default async () => {
  const url = 'mongodb://127.0.0.1:27017/docit'
  return await MongoClient.connect(url)
}