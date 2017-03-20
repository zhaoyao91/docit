import { addErrorLoggingToSchema } from 'graphql-tools'

export default function ({schema}) {
  addErrorLoggingToSchema(schema, {
    log(err) {
      console.error(err)
    }
  })
}