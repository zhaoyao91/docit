import fetch from 'isomorphic-fetch';
import joinUrl from 'url-join';
import {isObject} from 'lodash';

import settings from '../lib/settings';

const {serverUrl} = settings;

export default {
  users: {
    async createUser(email, password) {
      return await post('/users', {email, password});
    }
  }
}

async function post(path, requestBody) {
  const response = await fetch(joinUrl(serverUrl, path), {
    method: 'POST',
    headers: {'Content-Type': 'application/json'},
    body: JSON.stringify(requestBody)
  });
  const responseBody = await response.json();
  if (response.status >= 200 && response.status < 300) return responseBody;
  else throw {
    ...(isObject(responseBody) ? responseBody : {message: responseBody}),
    status: response.status
  }
}
