import { CustomError } from "./errorHandlers";

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message, 400);
    this.name = "BadRequestError";
  }
}

export class UnAuthorizedError extends CustomError {
  constructor(message: string) {
    super(message, 401);
    this.name = "UnAuthorizedError";
  }
}

export class ForbiddenError extends CustomError {
  constructor(message: string) {
    super(message, 403);

    this.name = "ForbiddenError";
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message, 404);
    this.name = "NotFoundError";
  }
}
