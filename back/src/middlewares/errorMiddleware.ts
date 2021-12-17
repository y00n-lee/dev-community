import { Request, Response } from "express";

const errorMiddleware = (req: Request, res: Response) => {
  res.status(500).send("접근할 수 없습니다.");
};

export { errorMiddleware };
