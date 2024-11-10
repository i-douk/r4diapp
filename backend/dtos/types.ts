import { Request } from "express";

export interface JWTRequest extends Request {
    decodedToken: {
     role: string;
     id: number; 
}
}
