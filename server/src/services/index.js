import {forEach} from 'lodash';

import serviceList from './service_list';

export default function (context) {
  const services = {};
  forEach(serviceList, (buildService, key) => {
    services[key] = buildService({
      ...context,
      ...services,
    });
  });
  return services;
}