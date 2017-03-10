import fs from 'fs';
import path from 'path';
import {chain, map} from 'lodash';

/**
 * get fullpath filenames directly in given dir
 * @param dirname
 * @returns {Promise} filenames
 */
export async function readFilesInDir(dirname) {
  return new Promise((resolve, reject) => {
    fs.readdir(dirname, (err, filenames) => {
      if (err) {
        reject(err);
      }
      else {
        resolve(filenames.map(filename => path.join(dirname, filename)));
      }
    });
  })
}

/**
 * filter out js files
 * @param filenames
 * @returns {[String]} filenames
 */
export function findJsFiles(filenames) {
  return filenames.filter(filename => path.extname(filename) === '.js');
}

/**
 * read modules as map directly in given dir
 * @param dirname
 * @param [withIndex] should the index file be included
 * @returns {Promise} moduleMap
 */
export async function readModuleMapInDir(dirname, withIndex = true) {
  const filenames = await readFilesInDir(dirname);
  const jsFiles = withIndex ? findJsFiles(filenames) : findJsFiles(filenames).filter(x => path.basename(x) != 'index.js');
  return chain(jsFiles)
    .mapKeys(filename => path.basename(filename, '.js'))
    .mapValues(filename => require(filename).default)
    .value();
}

export async function readModulesInDir(dirname, withIndex) {
  const moduleMap = await readModuleMapInDir(dirname, withIndex);
  return map(moduleMap);
}