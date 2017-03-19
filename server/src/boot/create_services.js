import { reduce, snakeCase } from 'lodash/fp'
import path from 'path'

export default async ({collections}) => {
  const servicesDir = path.resolve(__dirname, '../services')
  const serviceList = require(servicesDir).default
  return reduce((services, serviceName) => {
    const serviceFilename = snakeCase(serviceName)
    const buildService = require(path.join(servicesDir, serviceFilename)).default
    const service = buildService({collections, services})
    return {
      ...services,
      [serviceName]: service
    }
  }, {})(serviceList)
}