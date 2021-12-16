import { Request, Response } from "express";

const errorMiddleware = (err: Error, _: Request, res: Response) => {
  res.status(500).send(err);
};

export { errorMiddleware };
