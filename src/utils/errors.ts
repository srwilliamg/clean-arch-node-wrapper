export class CustomError extends Error {
  code: number;
  message: string;

  constructor(code: number, message: string) {
    super();
    this.code = code;
    this.message = message;
  }
}

export class ErrorNotFound extends CustomError {
  constructor(message: string) {
    super(404, message);
  }
}

export class ErrorForbidden extends CustomError {
  constructor(message: string) {
    super(403, message);
  }
}

export class ErrorUnauthorized extends CustomError {
  constructor(message: string) {
    super(401, message);
  }
}

export class ErrorBadRequest extends CustomError {
  constructor(message: string) {
    super(400, message);
  }
}
