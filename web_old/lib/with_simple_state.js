import {constant, camelCase} from 'lodash';
import {compose, withState, withHandlers} from 'recompose';

export default function (stateName, defaultValue) {
  const updaterName = camelCase(`update ${stateName}`);
  const setFuncName = camelCase(`set ${stateName}`);
  const resetFuncName = camelCase(`reset ${stateName}`);

  return compose(
    withState(stateName, updaterName, defaultValue),
    withHandlers({
      [setFuncName]: (props) => (newValue) => props[updaterName](constant(newValue)),
      [resetFuncName]: (props) => () => props[updaterName](constant(defaultValue))
    })
  )
}