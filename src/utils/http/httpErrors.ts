import httpStatusCodes from "./httpStatusCodes";

interface BaseError {
  message: string;
  status: number;
  name: string;
  error?: any;
}

class BaseError extends Error {
  constructor(message, status, name) {
    super(name);

    Object.setPrototypeOf(this, new.target.prototype);
    this.name = name;
    this.message = message;
    this.status = status; //check this
    Error.captureStackTrace(this);
  }
}

class Api400Error extends BaseError {
  constructor(message) {
    super(message, httpStatusCodes.BAD_REQUEST, "Bad Request");
  }
}

class Api401Error extends BaseError {
  constructor(message) {
    super(message, httpStatusCodes.UNAUTHORIZED, "Unauthorized");
  }
}

class Api403Error extends BaseError {
  constructor(message) {
    super(message, httpStatusCodes.FORBIDDEN, "Forbidden");
  }
}

class Api404Error extends BaseError {
  constructor(message) {
    super(message, httpStatusCodes.NOT_FOUND, "Not found");
  }
}

class Api409Error extends BaseError {
  constructor(message) {
    super(message, httpStatusCodes.CONFLICT, "Conflict");
  }
}

class Api500Error extends BaseError {
  constructor(message) {
    super(message, httpStatusCodes.INTERNAL_SERVER, "Internal Server Error");
  }
}

export type ApiErrors =
  | Api400Error
  | Api401Error
  | Api403Error
  | Api404Error
  | Api409Error
  | Api500Error;

export {
  Api400Error,
  Api401Error,
  Api403Error,
  Api404Error,
  Api409Error,
  Api500Error,
};
