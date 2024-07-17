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

interface ExtendedSession extends SessionData {
  visited?: boolean;
  user?: UserType;
}

export interface UserType {
  id: string;
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