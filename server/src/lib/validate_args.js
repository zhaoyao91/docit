import joi from 'joi'

import { APIArgsError } from './errors'

export default function validateArgs (args, schema) {
  const {error} = joi.validate(args, schema)
  if (error) {
    console.log(error.details);
    throw new APIArgsError('invalid-args', error.message, error.details)
  }
}