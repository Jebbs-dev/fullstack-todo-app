import { NextFunction, Request, Response } from "express";
import { User } from "../schemas/mongoose/user";
import { ExtendedRequest } from "../../types";

export const resolveUserAuth = async (req: ExtendedRequest, res: Response, next: NextFunction) =>{
  const { user: authenticatedUser } = req;

  try {
    const user = await User.findById((authenticatedUser as { _id: string })._id);

    if(!user){
      throw new Error("User not found");
    }
    
  } catch (error) {
    console.log(error);
    res.status(401).send({ error: "User not authenticated" });
  }

  req.userId = (authenticatedUser as { _id: string })._id;
  next();
}