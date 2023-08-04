import { Request, Response, NextFunction } from "express";

export class CustomError extends Error {
  code: number;

  constructor(message: string, statusCode: number) {
    super(message);
    this.message = message;
    this.code = statusCode;
  }
}

export const errorHandler = (
  error: Error | CustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (error instanceof CustomError) {
    return res.status((error as any).code).json({ error: error.message });
  }

  return res.status(500).json({ error: `${error.toString()}` });
};

export const notFound = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({ error: "Route does not exist" });
};
