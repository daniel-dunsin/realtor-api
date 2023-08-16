import { NextFunction, Request, Response } from "express";

export const setCache = (req: Request, res: Response, next: NextFunction) => {
  if (req.method === "GET") {
    res.set("Cache-Control", "public, max-age=60000");
    // .set("content-type", "application/json");
  } else {
    res.set("Cache-Control", "no-store");
  }

  next();
};
