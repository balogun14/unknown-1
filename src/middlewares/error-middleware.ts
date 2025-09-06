export class HttpError extends Error {
  public statusCode: number;
  public success: boolean = false;

  constructor(status: number, message: string) {
    super(message);
    this.statusCode = status;
  }
}

export class BadRequest extends HttpError {
  constructor(message: string) {
    super(400, message);
  }
}

export class ResourceNotFound extends HttpError {
  constructor(message: string) {
    super(404, message);
  }
}

export class Unauthorized extends HttpError {
  constructor(message: string) {
    super(401, message);
  }
}

export class Forbidden extends HttpError {
  constructor(message: string) {
    super(403, message);
  }
}

export class Conflict extends HttpError {
  constructor(message: string) {
    super(409, message);
  }
}

export class InvalidInput extends HttpError {
  constructor(message: string) {
    super(422, message);
  }
}

export class ServerError extends HttpError {
  constructor(message: string) {
    super(500, message);
  }
}
