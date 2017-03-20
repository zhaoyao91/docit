import { curry } from 'lodash/fp'

/**
 * wrap a function with a proxy function to be called before
 * @param proxyFunc({args, changeArgs}) # to be called before the target function
 * - changeArgs(...newArgs) # if called, the new args will be passed to target function
 * @param targetFunc
 * @returns wrapped function
 */
export const proxyBefore = curry((proxyFunc, targetFunc) => (...args) => {
  proxyFunc({args, changeArgs: (...newArgs) => args = newArgs})
  return targetFunc(...args)
})

/**
 * wrap a function with a proxy function to be called after
 * @param proxyFunc({args, result, changeResult}) # to be called after the target function
 * - changeResult(newResult) # if called, the wrapper function will return the new result instead of the original one
 * @param targetFunc
 * @returns wrapped function
 */
export const proxyAfter = curry((proxyFunc, targetFunc) => (...args) => {
  let result = targetFunc(...args)
  proxyFunc({args, result, changeResult: (newResult) => result = newResult})
  return result
})

/**
 * wrap a function to be effective only when the cond return true
 * if cond return false, call the wrapped function will not trigger the inner function
 * @param cond(...args) => Boolean
 * @param func(...args)
 */
export const effectiveIf = curry((cond, func) => (...args) => {
  if (cond(...args)) {
    func(...args)
  }
})