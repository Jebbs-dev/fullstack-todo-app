import { Request } from "express";

declare namespace Express {  
  interface ExtendedRequest extends Request {
    findUserIndex: number;
    parsedId: number;
  }
}

export interface ExtendedRequest extends Request {
  findUserIndex?: number;
  parsedId?: number;
}

export interface UserType {
  id: number;
  name: string;
  email: string;
  password: string;
}