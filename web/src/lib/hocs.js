import { compose, get, cond, isFunction, isString, identity, camelCase, mapValues } from 'lodash/fp'
import { withState, withHandlers } from 'recompose'

/**
 * @param handlerName
 * @param getUpdaterFromProps
 * @param getValueFromEvent # default to return e.target.value
 * @returns HOC
 */
export const withInputChangeHandler = (handlerName, getUpdaterFromProps, getValueFromEvent = get('target.value')) => (
  withHandlers({
    [handlerName]: (props) => e => getUpdaterFromProps(props)(getValueFromEvent(e))
  })
)
/**
 * @param stateName
 * @param updaterName
 * @param initialValue: any | (props) => any
 * @param handlerName
 * @param getValueFromEvent # default to return e.target.value
 * @returns HOC
 */
export const withInputState = (stateName, updaterName, initialValue, handlerName, getValueFromEvent) => (
  compose(
    withState(stateName, updaterName, initialValue),
    withInputChangeHandler(handlerName, get(updaterName), getValueFromEvent),
  )
)

/**
 * compose component with input state and default updater and onChangeHandler
 * the name of updater is camel case of `set${stateName}`
 * the name of onChangeHandler is camel case of `on${stateName}Change`
 * @param stateName
 * @param initialValue: any | (props) => any
 * @param getValueFromEvent # default to return e.target.value
 * @returns HOC
 */
export const withSimpleInputState = (stateName, initialValue, getValueFromEvent) => (
  withInputState(stateName, camelCase(`set ${stateName}`), initialValue, camelCase(`on ${stateName} change`), getValueFromEvent)
)

/**
 * compose with form submit handlers which do not need to handle e.preventDefault()
 * @param handlers: {(handlerName, handler(props))}
 */
export const withFormSubmitHandlers = (handlers) => (
  withHandlers(mapValues(handler => props => e => {
    e.preventDefault()
    return handler(props)
  })(handlers))
)
