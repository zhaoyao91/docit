import {pick, isEmpty} from 'lodash';

import ServiceError from './service_error';

export default function wrapError(err, name = err.name, detailKeys) {
  return new ServiceError(name, err.message, !isEmpty(detailKeys) ? pick(err, ...detailKeys) : undefined);
}