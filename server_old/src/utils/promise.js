import {toPairs, unzip, zipObject} from 'lodash';

/**
 * Promise.all for object
 * @param object
 * @returns promise
 */
export async function allForObject(object) {
  const [keys, values] = unzip(toPairs(object));
  const allValues = await Promise.all(values);
  return zipObject(keys, allValues);
}
