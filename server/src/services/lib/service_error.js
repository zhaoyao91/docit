export default class ServiceError extends Error {
  constructor(code, message, detail) {
    super();
    this.name = 'ServiceError';
    if (code !== undefined) this.code = code;
    if (message !== undefined) this.message = message;
    if (detail !== undefined) this.detail = detail;
  }
}