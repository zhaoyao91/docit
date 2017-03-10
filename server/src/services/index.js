import {camelCase, capitalize, chain} from 'lodash';

import {readModuleMapInDir} from '../utils/file';
import {allForObject} from '../utils/promise';

export default async function (context) {
  const serviceBuilderMap = await readModuleMapInDir(__dirname, false);

  const servicePromises = chain(serviceBuilderMap)
    .mapKeys((_, key) => capitalize(camelCase(key)))
    .mapValues((buildService, key) => buildService(context))
    .value();

  return await allForObject(servicePromises);
}