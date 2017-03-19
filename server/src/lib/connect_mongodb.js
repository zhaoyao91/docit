import { MongoClient } from 'mongodb'

export default async (url) => {
  return await MongoClient.connect(url)
}