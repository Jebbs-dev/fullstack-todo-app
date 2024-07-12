import { NextFunction, Response } from "express";
import { ExtendedRequest } from "../../types";
import { users } from "../utils/constants";

export const resolveIndexByUserId = (req: ExtendedRequest, res: Response, next: NextFunction) => {
  const { params: { id } } = req;
  
  const parsedId = parseInt(id);
  if (isNaN(parsedId)) {
    return res.sendStatus(400);
  }
  
  const findUserIndex = users.findIndex((user) => user.id === parsedId);

  if (req.findUserIndex === -1) {
    return res.status(404).send({ message: "User not found" });
  }

  req.parsedId = parsedId;
  req.findUserIndex = findUserIndex
  next();
}

