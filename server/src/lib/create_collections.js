import fs from 'fs'
import path from 'path'
import { compose, mapKeys, mapValues, camelCase, upperFirst, curry } from 'lodash/fp'

export default async (mongodb, collectionsDir) => {
  const filenames = await readFilenamesInDir(collectionsDir)
  return compose(
    mapValues(compose(
      createCollection(mongodb),
      buildCollectionNameFromFileName,
    )),
    mapKeys.convert({cap: false})(buildCollectionNameFromFileName),
  )(filenames)
}

const readFilenamesInDir = async (dir) => new Promise((resolve, reject) => fs.readdir(dir, (err, filenames) => {
  if (err) reject(err)
  else resolve(filenames)
}))

const buildCollectionNameFromFileName = compose(
  upperFirst,
  camelCase,
  filename => path.basename(filename, '.js'),
)

const createCollection = curry((db, name) => db.collection(name))