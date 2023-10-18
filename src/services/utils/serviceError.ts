import internalErrors from "./internalErrors";

/**
 * Create a new ServiceError
 * @class
 */

interface BaseError {
  error: string;
  message: string;
  internalError: number;
  status?: number;
}

class BaseError extends Error {
  constructor(message: string, error: string) {
    super(error);

    Object.setPrototypeOf(this, new.target.prototype);
    this.message = message || error;
    this.error = error;
  }
}
class ServiceError extends BaseError {
  /**
   * Create a new ServiceError
   * @constructs ServiceError
   * @param {string} error - Internal error codeName
   * @param   {string} message - Message to show in ServiceError
   */
  constructor(error, message) {
    super(error, message);
    const { code, name } = internalErrors[error];

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name || "Generic service error";
    this.message = message;
    this.internalError = code || 0; //check this
    Error.captureStackTrace(this, this.constructor);
  }
}

export default ServiceError;
