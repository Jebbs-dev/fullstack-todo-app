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

export interface TaskType {
  id: number;
  title: string;
  description: string;
  status: "completed" | "pending" | "in progress";
}