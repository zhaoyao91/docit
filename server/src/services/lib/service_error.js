export default class ServiceError extends Error {
  constructor(code, message, detail) {
    super();
    this.name = 'ServiceError';
    this.code = code;
    this.message = message;
    this.detail = detail;
  }
}