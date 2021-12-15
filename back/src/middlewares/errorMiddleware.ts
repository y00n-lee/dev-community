import { Request, Response } from "express";

const errorMiddleware = (error: Error, _: Request, res: Response) => {
  res.status(500).send(error.message);
};

export { errorMiddleware };
