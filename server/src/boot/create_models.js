import fs from 'fs'
import path from 'path'
import { mapKeys, mapValues, compose, upperFirst, camelCase, curry, __, partial } from 'lodash/fp'

export default async (mongoose, schemasDir) => {
  return new Promise((resolve, reject) => {
    fs.readdir(schemasDir, (err, filenames) => {
      if (err) {
        reject(err)
      }
      else {
        resolve(compose(
          mapValues(filename => buildModel(mongoose, loadSchema(schemasDir, filename), getModelNameByFileName(filename))),
          mapKeys.convert({cap: false})(getModelNameByFileName),
        )(filenames))
      }
    })
  })
}

const getModelNameByFileName = compose(
  upperFirst,
  camelCase,
  filename => path.basename(filename, '.js'),
)

const loadSchema = curry((dir, filename) => require(path.join(dir, filename)).default)

const buildModel = curry((mongoose, schema, name) => mongoose.model(name, schema))
