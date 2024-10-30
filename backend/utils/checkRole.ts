import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import config from './config';

interface JwtPayload {
  userId: string;
  role: string;
}

// Middleware to check for required role
export const checkRole = (requiredRole: string) => {
  return async (req: Request, res: Response, next: NextFunction) => {
      // Assume JWT token is in the Authorization header
      const token = req.headers.authorization?.split(' ')[1];
      if (!token) return res.status(403).json({ message: 'Access denied.' });

      // Verify the token
      const decoded = jwt.verify(token, config.SECRET!) as JwtPayload;
      
      // Check the user's role
      if (decoded.role !== requiredRole) {
        return res.status(403).json({ message: 'Access denied: insufficient permissions.' });
      }      
      next();

  };
};
