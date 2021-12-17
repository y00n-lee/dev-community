import { Request, Response } from "express";

const errorMiddleware = (err: Error, _: Request, res: Response) => {
  return res.status(500).json({ status: false, message: err.message });
};

export { errorMiddleware };
