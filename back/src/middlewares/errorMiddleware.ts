import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  return res.status(500).json({ status: false, message: err.message });
};

export { errorMiddleware };
