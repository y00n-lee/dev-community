import { ErrorRequestHandler } from "express";

const errorMiddleware: ErrorRequestHandler = (err, _, res, __) => {
  if (
    err.name === "AlreadyJoin" ||
    err.name === "Bad" ||
    err.name === "NoTitleContent" ||
    err.name === "NoMember"
  )
    return res.status(401).json({ status: false, message: err.message });

  if (err.name === "noAuth") return res.json({ status: false, message: err.message });

  return res.status(500).json({ status: false, message: err.message });
};

export { errorMiddleware };
