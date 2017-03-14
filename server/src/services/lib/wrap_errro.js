import {pick} from 'lodash';

import ServiceError from './service_error';

export default function wrapError(err, ...detailKeys) {
  return new ServiceError(err.name, err.message, detailKeys ? pick(err, ...detailKeys) : undefined);
}