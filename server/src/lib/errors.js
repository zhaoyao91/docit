export class AppError extends Error {
  constructor (code, description, details) {
    const message = do {
      if (code && description) {
        `${code}: ${description}`
      } else if (code) {
        code
      } else if (description) {
        description
      } else {
        undefined
      }
    }
    super(message)
    this.name = 'AppError'
    this.code = code
    this.description = description
    this.details = details
  }
}

export class ServiceError extends AppError {
  constructor (code, description, detail) {
    super(code, description, detail)
    this.name = 'ServiceError'
  }
}

export class APIError extends AppError {
  constructor (code, description, detail) {
    super(code, description, detail)
    this.name = 'APIError'
  }
}

export class APILogicError extends APIError {
  constructor (code, description, detail) {
    super(code, description, detail)
    this.name = 'APILogicError'
  }
}

export class APIArgsError extends APIError {
  constructor (code, description, detail) {
    super(code, description, detail)
    this.name = 'APIArgsError'
  }
}