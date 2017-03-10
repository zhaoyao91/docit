import mongoose from 'mongoose';
import {chain, camelCase, capitalize} from 'lodash';

import {readModuleMapInDir} from '../utils/file';

export default async function ({settings}) {
  // plugin Promise implementation, see http://mongoosejs.com/docs/promises.html
  mongoose.Promise = global.Promise;

  const schemaMap = await readModuleMapInDir(__dirname, false);

  const defaultMongodbConnection = mongoose.createConnection();

  const models = chain(schemaMap)
    .mapKeys((_, key) => capitalize(camelCase(key)))
    .mapValues((schema, key) => defaultMongodbConnection.model(key, schema))
    .value();

  await defaultMongodbConnection.open(settings.mongodbUrl);

  return models;
}