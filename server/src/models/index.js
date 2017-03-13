import mongoose from 'mongoose';
import {mapValues} from 'lodash';

import schemaList from './schema_list';

export default async function ({settings}) {
  // plugin Promise implementation, see http://mongoosejs.com/docs/promises.html
  mongoose.Promise = global.Promise;

  const defaultMongodbConnection = mongoose.createConnection();

  const models = buildModelsFromSchemas(defaultMongodbConnection, schemaList);

  await defaultMongodbConnection.open(settings.mongodbUrl);

  return models;
}

function buildModelsFromSchemas(connection, schemas) {
  return mapValues(schemas, (schema, key) => {
    return connection.model(key, schema);
  })
}