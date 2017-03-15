import _ from 'lodash';
import moment from 'moment';

function component() {
  const element = document.createElement('div');

  /* lodash is required for the next line to work */
  element.innerHTML = _.join(['!Hello', 'webpack', moment()], ' ');

  return element;
}

document.body.appendChild(component());